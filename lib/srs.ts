/* ─────────────────────────────────────────────────────────────────────────────
   SM-2 Spaced Repetition Algorithm
   Quality scale:
     0 = Again  (complete failure)
     3 = Hard   (correct but very difficult)
     4 = Good   (correct with some hesitation)
     5 = Easy   (perfect recall)
───────────────────────────────────────────────────────────────────────────── */

export type SRSQuality = 0 | 3 | 4 | 5

export interface SRSCard {
  ease_factor:   number   // starts at 2.5, min 1.3
  interval_days: number   // days until next review
  repetitions:   number   // consecutive correct reviews
}

export interface SRSResult extends SRSCard {
  next_review: string   // ISO date string
}

export function applyReview(card: SRSCard, quality: SRSQuality): SRSResult {
  let { ease_factor, interval_days, repetitions } = card

  if (quality < 3) {
    // Failed — reset to start
    repetitions   = 0
    interval_days = 1
  } else {
    // Passed
    if (repetitions === 0) {
      interval_days = 1
    } else if (repetitions === 1) {
      interval_days = 6
    } else {
      interval_days = Math.round(interval_days * ease_factor)
    }
    repetitions++
  }

  // Update ease factor (SM-2 formula)
  ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  ease_factor = Math.max(1.3, Math.round(ease_factor * 100) / 100)

  const next = new Date()
  next.setDate(next.getDate() + interval_days)
  const next_review = next.toISOString().split('T')[0]

  return { ease_factor, interval_days, repetitions, next_review }
}

// Maps difficulty button label → quality number
export const QUALITY_MAP: Record<string, SRSQuality> = {
  again: 0,
  hard:  3,
  good:  4,
  easy:  5,
}
