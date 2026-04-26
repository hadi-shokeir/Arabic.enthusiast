import { NextResponse }    from 'next/server'
import { createClient }    from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/progress
   Body: { course_id, lesson_id, quiz_score?, time_spent_minutes? }

   Marks a lesson as complete for the authenticated student:
   1. Logs a lesson_event row
   2. Upserts user_progress (adds lesson to completed_lessons, updates score)
   3. Awards XP to streaks table
───────────────────────────────────────────────────────────────────────────── */

const XP_PER_LESSON = 50
const XP_BONUS_PERFECT = 25  // extra XP for 100% quiz score

export async function POST(request: Request) {
  // Auth check using the user's session cookie
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let body: { course_id: string; lesson_id: string; quiz_score?: number; time_spent_minutes?: number }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { course_id, lesson_id, quiz_score, time_spent_minutes } = body
  if (!course_id || !lesson_id) {
    return NextResponse.json({ error: 'course_id and lesson_id are required' }, { status: 400 })
  }

  const admin = createAdminClient()
  const xpEarned = XP_PER_LESSON + (quiz_score === 100 ? XP_BONUS_PERFECT : 0)
  const today = new Date().toISOString().split('T')[0]

  // 1. Log lesson event
  await admin.from('lesson_events').insert({
    user_id:            user.id,
    course_id,
    lesson_id,
    quiz_score:         quiz_score ?? null,
    time_spent_minutes: time_spent_minutes ?? null,
  })

  // 2. Fetch existing progress for this course
  const { data: existing } = await admin
    .from('user_progress')
    .select('completed_lessons, quiz_scores, time_spent_minutes')
    .eq('user_id', user.id)
    .eq('course_id', course_id)
    .single()

  const completedLessons: string[] = existing?.completed_lessons ?? []
  const quizScores: Record<string, number> = existing?.quiz_scores ?? {}
  const timeSpent: number = existing?.time_spent_minutes ?? 0

  // Only add to completed if not already there
  if (!completedLessons.includes(lesson_id)) {
    completedLessons.push(lesson_id)
  }
  if (quiz_score !== undefined) {
    quizScores[lesson_id] = quiz_score
  }

  // 3. Upsert user_progress
  await admin.from('user_progress').upsert({
    user_id:            user.id,
    course_id,
    completed_lessons:  completedLessons,
    quiz_scores:        quizScores,
    time_spent_minutes: timeSpent + (time_spent_minutes ?? 0),
    last_accessed:      new Date().toISOString(),
    updated_at:         new Date().toISOString(),
  }, { onConflict: 'user_id,course_id' })

  // 4. Update streak + XP
  const { data: streak } = await admin
    .from('streaks')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (streak) {
    const lastActive = streak.last_active_date
    const newStreak  = lastActive === today
      ? streak.current_streak                          // already active today
      : lastActive === getPrevDay(today)
        ? streak.current_streak + 1                    // consecutive day
        : 1                                            // streak broken

    await admin.from('streaks').update({
      current_streak:   newStreak,
      longest_streak:   Math.max(newStreak, streak.longest_streak),
      last_active_date: today,
      total_xp:         streak.total_xp + xpEarned,
      current_level:    Math.floor((streak.total_xp + xpEarned) / 500) + 1,
    }).eq('user_id', user.id)
  } else {
    // First activity — create streak row
    await admin.from('streaks').insert({
      user_id:          user.id,
      current_streak:   1,
      longest_streak:   1,
      last_active_date: today,
      total_xp:         xpEarned,
      current_level:    1,
    })
  }

  return NextResponse.json({ ok: true, xp_earned: xpEarned })
}

function getPrevDay(isoDate: string): string {
  const d = new Date(isoDate)
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}
