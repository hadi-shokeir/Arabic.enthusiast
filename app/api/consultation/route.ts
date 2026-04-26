import { NextResponse }     from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { ConsultationPayload } from '@/types'

export async function POST(request: Request) {
  try {
    const body: ConsultationPayload = await request.json()

    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from('consultations').insert({
      name:           body.name.trim(),
      email:          body.email.trim().toLowerCase(),
      whatsapp:       body.whatsapp?.trim()  ?? null,
      goals:          body.goals?.trim()     ?? null,
      preferred_time: body.preferred_time    ?? null,
      status:         'requested',
    })

    if (error) {
      console.error('Consultation insert error:', error)
      return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
