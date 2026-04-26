/* ─────────────────────────────────────────────────────────────────────────────
   Arabic Enthusiast — Shared TypeScript Types
   Mirrors the Supabase schema exactly. No `any` anywhere.
───────────────────────────────────────────────────────────────────────────── */

/* ── Auth & User ────────────────────────────────────────────────────────────── */

export type UserRole            = 'student' | 'tutor'
export type EnrolmentStatus     = 'pending' | 'active' | 'inactive'
export type TargetAudience      = 'quranic' | 'levantine' | 'msa_professional' | 'hawza'

export interface Profile {
  id:                  string
  full_name:           string
  role:                UserRole
  enrolled_courses:    string[]
  enrolment_status:    EnrolmentStatus
  whatsapp:            string | null
  goals:               string | null
  target_audience:     TargetAudience | null
  notes_from_tutor:    string | null
  gamification_enabled: boolean
  created_at:          string
}

/* ── Course Progress ─────────────────────────────────────────────────────────── */

export interface UserProgress {
  id:                  string
  user_id:             string
  course_id:           string
  completed_lessons:   string[]
  quiz_scores:         Record<string, number>  // { lesson_id: 0-100 }
  time_spent_minutes:  number
  last_accessed:       string
  updated_at:          string
}

/* ── Events ──────────────────────────────────────────────────────────────────── */

export interface LessonEvent {
  id:                  string
  user_id:             string
  course_id:           string
  lesson_id:           string
  completed_at:        string
  quiz_score:          number | null
  time_spent_minutes:  number | null
  marked_by_tutor:     boolean
}

export type ExerciseType =
  | 'flashcard'
  | 'cloze'
  | 'sentence_builder'
  | 'tracing'
  | 'root_hunt'
  | 'harakat_dash'

export type FlashcardDifficulty = 'again' | 'hard' | 'good' | 'easy'

export interface PracticeEvent {
  id:               string
  user_id:          string
  exercise_type:    ExerciseType
  vocab_id:         string | null
  lesson_id:        string | null
  correct:          boolean | null
  difficulty:       FlashcardDifficulty | null
  duration_seconds: number | null
  created_at:       string
}

/* ── SRS / Flashcards ────────────────────────────────────────────────────────── */

export interface SrsCard {
  id:           string
  user_id:      string
  vocab_id:     string
  ease_factor:  number   // SM-2 ease factor, starts at 2.5
  interval_days: number  // current interval
  repetitions:  number
  next_review:  string
  last_review:  string | null
  created_at:   string
}

/* ── Weak Spots ──────────────────────────────────────────────────────────────── */

export interface WeakSpot {
  id:         string
  user_id:    string
  vocab_id:   string | null
  lesson_id:  string | null
  miss_count: number
  resolved:   boolean
  flagged_at: string
}

/* ── Tutor Notes ─────────────────────────────────────────────────────────────── */

export interface TutorNote {
  id:         string
  student_id: string
  content:    string
  created_at: string
  updated_at: string
}

/* ── Enrolments ──────────────────────────────────────────────────────────────── */

export type EnrolmentRequestStatus = 'pending' | 'approved' | 'rejected'

export interface EnrolmentRequest {
  id:         string
  user_id:    string
  course_id:  string
  message:    string | null
  status:     EnrolmentRequestStatus
  created_at: string
  profile?:   Profile   // joined for tutor view
}

/* ── Consultations ───────────────────────────────────────────────────────────── */

export type ConsultationStatus = 'requested' | 'scheduled' | 'completed' | 'cancelled'

export interface Consultation {
  id:             string
  name:           string
  email:          string
  whatsapp:       string | null
  goals:          string | null
  preferred_time: string | null
  status:         ConsultationStatus
  created_at:     string
}

/* ── Lead Magnet ─────────────────────────────────────────────────────────────── */

export interface LeadCapture {
  id:          string
  email:       string
  resource_id: string
  source:      string | null
  created_at:  string
}

/* ── Streaks & Gamification ──────────────────────────────────────────────────── */

export interface Streak {
  user_id:          string
  current_streak:   number
  longest_streak:   number
  last_active_date: string | null
  total_xp:         number
  current_level:    number
}

/* ── Content / Data Layer ────────────────────────────────────────────────────── */

export type LetterGroup =
  | 'a' | 'b' | 'j' | 'd' | 'r' | 's' | 'sad' | 'ain' | 'f' | 'k' | 'l' | 'm' | 'n' | 'h' | 'w' | 'y'

export interface AlphabetLetter {
  ar:     string
  name:   string
  trans:  string
  group:  LetterGroup
  forms: {
    isolated: string
    initial:  string
    medial:   string
    final:    string
  }
  note:   string
  example: {
    word:    string
    meaning: string
    trans:   string
  }
}

export type CourseId      = 'arabic-foundations' | 'levantine-dialect' | 'quranic-arabic'
export type CourseLevel   = 'Beginner' | 'Intermediate' | 'Advanced'
export type CourseType    = 'Classical' | 'Levantine' | 'Quranic'
export type LessonType    = 'video+exercise' | 'video+quiz' | 'audio+exercise' | 'text+quiz'
export type SemanticCategory =
  | 'family' | 'body' | 'nature' | 'religion' | 'time' | 'numbers'
  | 'verbs_common' | 'adjectives' | 'pronouns' | 'prepositions' | 'greetings'
  | 'quranic_core' | 'hawza' | 'grammar_particles'

export interface Quiz {
  question:     string
  options:      string[]        // 4 options, Arabic script where appropriate
  answer:       string          // must match one of options exactly
  explanation:  string          // pedagogically accurate explanation from a teacher's perspective
}

export interface Lesson {
  id:           string
  title:        string
  arabic:       string
  duration:     number          // minutes
  type:         LessonType
  free:         boolean
  intro:        string          // paragraph shown in lesson content
  keyPoints:    string[]        // 4-6 bullet points specific to this lesson
  quiz:         Quiz
}

export interface Course {
  id:       CourseId
  level:    CourseLevel
  type:     CourseType
  title:    string
  arabic:   string
  subtitle: string
  desc:     string
  color:    string              // CSS color for accent stripe
  topics:   string[]
  featured: boolean
  lessons:  Lesson[]
}

export interface VocabEntry {
  id:                string       // unique slug e.g. "kitab-book"
  ar:                string       // Arabic with harakat
  transliteration:   string
  meaning:           string       // English
  root:              string       // trilateral root e.g. "ك-ت-ب"
  pattern:           string       // morphological pattern e.g. "فِعَال"
  lesson_id:         string | null
  course_id:         CourseId | null
  level:             CourseLevel
  semantic_category: SemanticCategory
  example_sentence?: string       // Arabic sentence
  example_translation?: string
}

export interface Testimonial {
  id:             string
  quote:          string
  student_name:   string          // first name + last initial e.g. "Sarah K."
  goal_context:   string          // e.g. "Quranic learner"
  location:       string          // e.g. "Heritage speaker, US"
  level_before:   string          // e.g. "Zero Arabic"
  level_after:    string          // e.g. "Reading simple Quranic verses"
  course_id:      CourseId | null
}

export interface Resource {
  id:          string            // slug e.g. "quranic-taster"
  title:       string
  arabic:      string
  description: string
  category:    'Beginner' | 'Intermediate' | 'Advanced' | 'Quranic' | 'Lebanese'
  file_size:   string            // e.g. "2.4 MB"
  is_lead_magnet: boolean
  preview_url: string | null
}

/* ── Dashboard / Analytics helpers ──────────────────────────────────────────── */

export interface SkillsRadarData {
  skill:    string
  score:    number    // 0-100
  fullMark: 100
}

export interface ProgressTimelinePoint {
  date:              string    // ISO date
  lessons_completed: number
  practice_sessions: number
}

export interface CourseProgressSummary {
  course:            Course
  progress:          UserProgress
  lessons_total:     number
  lessons_completed: number
  avg_quiz_score:    number
  next_lesson:       Lesson | null
}

export interface PracticeStatsSummary {
  flashcards_reviewed:   number
  sentences_built:       number
  cloze_answered:        number
  tracing_sessions:      number
  root_hunts:            number
  harakat_dashes:        number
}

/* ── API request / response shapes ──────────────────────────────────────────── */

export interface ContactFormPayload {
  name:     string
  email:    string
  interest: string
  message:  string
}

export interface LeadMagnetPayload {
  email:       string
  resource_id: string
  source?:     string
}

export interface ConsultationPayload {
  name:           string
  email:          string
  whatsapp?:      string
  goals?:         string
  preferred_time?: string
}

export interface ProgressUpdatePayload {
  course_id:         string
  lesson_id:         string
  quiz_score?:       number
  time_spent_minutes?: number
}
