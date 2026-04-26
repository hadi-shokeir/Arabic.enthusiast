import type { Testimonial } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   Placeholder testimonials — Hadi to replace with real student quotes.
   Structure is ready; only the content needs updating.
───────────────────────────────────────────────────────────────────────────── */

export const testimonials: Testimonial[] = [
  {
    id:           'testimonial-1',
    quote:        "I've tried apps and YouTube videos for years without making real progress. After three months with Hadi, I can finally read Al-Fatiha word for word and understand what I'm saying in prayer. The structure he teaches is completely different — it actually sticks.",
    student_name: 'Fatima A.',
    goal_context: 'Quranic learner',
    location:     'London, UK',
    level_before: 'Zero Arabic',
    level_after:  'Reading Al-Fatiha and short Quranic surahs with understanding',
    course_id:    'quranic-arabic',
  },
  {
    id:           'testimonial-2',
    quote:        "My grandparents are Lebanese and I grew up hearing the dialect but never speaking it properly. Hadi taught me in a way that respected what I already knew and filled in the gaps. Now I can actually hold a conversation with my family.",
    student_name: 'Karim M.',
    goal_context: 'Heritage speaker',
    location:     'Dearborn, US',
    level_before: 'Passive listener only',
    level_after:  'Comfortable conversation with family in Lebanese',
    course_id:    'levantine-dialect',
  },
  {
    id:           'testimonial-3',
    quote:        "As a linguist studying SLA, I was sceptical that private lessons would offer anything an academic course couldn't. I was wrong. Hadi's combination of classical training and applied linguistics made the Arabic script and grammar click in a way I hadn't experienced before.",
    student_name: 'Dr. Sarah L.',
    goal_context: 'Academic & professional',
    location:     'Toronto, Canada',
    level_before: 'Familiar with linguistic theory, zero Arabic',
    level_after:  'Reading Classical Arabic texts with dictionary support',
    course_id:    'arabic-foundations',
  },
]
