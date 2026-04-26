import { NextResponse }     from 'next/server'
import { createClient }     from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { applyReview, QUALITY_MAP, type SRSQuality } from '@/lib/srs'
import { vocab } from '@/data/vocab'

/* ─────────────────────────────────────────────────────────────────────────────
   GET  /api/flashcards        — returns due cards for the authenticated user
   POST /api/flashcards        — records a review result and updates the card
───────────────────────────────────────────────────────────────────────────── */

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const today = new Date().toISOString().split('T')[0]
  const admin = createAdminClient()

  // Get all cards due today or earlier
  const { data: dueCards } = await admin
    .from('srs_cards')
    .select('*')
    .eq('user_id', user.id)
    .lte('next_review', today)
    .order('next_review', { ascending: true })
    .limit(30)

  // Enrich with vocab data
  const enriched = (dueCards ?? []).map((card: {
    id: string; vocab_id: string; ease_factor: number;
    interval_days: number; repetitions: number; next_review: string
  }) => {
    const entry = vocab.find(v => v.id === card.vocab_id)
    return { ...card, vocab: entry ?? null }
  }).filter(c => c.vocab !== null)

  return NextResponse.json({ cards: enriched, total_due: enriched.length })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  let body: { vocab_id: string; difficulty: string; duration_seconds?: number }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { vocab_id, difficulty, duration_seconds } = body
  if (!vocab_id || !difficulty) {
    return NextResponse.json({ error: 'vocab_id and difficulty are required' }, { status: 400 })
  }

  const quality = QUALITY_MAP[difficulty] as SRSQuality | undefined
  if (quality === undefined) {
    return NextResponse.json({ error: 'difficulty must be: again, hard, good, or easy' }, { status: 400 })
  }

  const admin  = createAdminClient()
  const today  = new Date().toISOString().split('T')[0]

  // Fetch existing card (if any)
  const { data: existing } = await admin
    .from('srs_cards')
    .select('*')
    .eq('user_id', user.id)
    .eq('vocab_id', vocab_id)
    .single()

  const cardState = existing ?? { ease_factor: 2.5, interval_days: 1, repetitions: 0 }
  const result    = applyReview(cardState, quality)

  // Upsert the card
  await admin.from('srs_cards').upsert({
    user_id:       user.id,
    vocab_id,
    ease_factor:   result.ease_factor,
    interval_days: result.interval_days,
    repetitions:   result.repetitions,
    next_review:   result.next_review,
    last_review:   today,
  }, { onConflict: 'user_id,vocab_id' })

  // Log practice event
  await admin.from('practice_events').insert({
    user_id:          user.id,
    exercise_type:    'flashcard',
    vocab_id,
    correct:          quality >= 3,
    difficulty,
    duration_seconds: duration_seconds ?? null,
  })

  // If wrong, flag as weak spot
  if (quality === 0) {
    const { data: ws } = await admin
      .from('weak_spots')
      .select('id, miss_count')
      .eq('user_id', user.id)
      .eq('vocab_id', vocab_id)
      .single()

    if (ws) {
      await admin.from('weak_spots').update({ miss_count: ws.miss_count + 1, resolved: false })
        .eq('id', ws.id)
    } else {
      await admin.from('weak_spots').insert({ user_id: user.id, vocab_id, miss_count: 1 })
    }
  }

  // Update streak XP (5 XP per flashcard)
  const { data: streak } = await admin.from('streaks').select('*').eq('user_id', user.id).single()
  if (streak) {
    const lastActive  = streak.last_active_date
    const newStreak   = lastActive === today ? streak.current_streak
      : lastActive === getPrevDay(today) ? streak.current_streak + 1
      : 1
    await admin.from('streaks').update({
      current_streak:   newStreak,
      longest_streak:   Math.max(newStreak, streak.longest_streak),
      last_active_date: today,
      total_xp:         streak.total_xp + 5,
      current_level:    Math.floor((streak.total_xp + 5) / 500) + 1,
    }).eq('user_id', user.id)
  }

  return NextResponse.json({ ok: true, next_review: result.next_review, interval_days: result.interval_days })
}

function getPrevDay(isoDate: string): string {
  const d = new Date(isoDate)
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}
