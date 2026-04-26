-- ══════════════════════════════════════════════════════════════════════════════
-- Arabic Enthusiast — Full Database Schema
-- Paste this entire file into:
--   Supabase Dashboard → SQL Editor → New query → Run
--
-- Safe to run on an existing project — uses IF NOT EXISTS throughout.
-- Old tables (profiles v1, tutor_data) are left intact if they exist.
-- ══════════════════════════════════════════════════════════════════════════════

-- ── Extensions ─────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ══════════════════════════════════════════════════════════════════════════════
-- 1. PROFILES
--    One row per auth.users row. Auto-created by trigger on sign-up.
-- ══════════════════════════════════════════════════════════════════════════════

-- Drop old v1 profiles table if it has the old structure (no full_name column)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'profiles'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'full_name'
  ) THEN
    DROP TABLE public.profiles CASCADE;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.profiles (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name             TEXT NOT NULL DEFAULT '',
  role                  TEXT NOT NULL DEFAULT 'student'
                          CHECK (role IN ('student', 'tutor')),
  enrolled_courses      TEXT[]    NOT NULL DEFAULT '{}',
  enrolment_status      TEXT      NOT NULL DEFAULT 'pending'
                          CHECK (enrolment_status IN ('pending', 'active', 'inactive')),
  whatsapp              TEXT,
  goals                 TEXT,
  target_audience       TEXT
                          CHECK (target_audience IN ('quranic', 'levantine', 'msa_professional', 'hawza')),
  notes_from_tutor      TEXT,
  gamification_enabled  BOOLEAN   NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- ── Auto-create profile on sign-up ────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ══════════════════════════════════════════════════════════════════════════════
-- 2. USER PROGRESS
--    One row per (user, course). Tracks completed lessons + quiz scores.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.user_progress (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id           TEXT        NOT NULL,
  completed_lessons   TEXT[]      NOT NULL DEFAULT '{}',
  quiz_scores         JSONB       NOT NULL DEFAULT '{}',
  time_spent_minutes  INTEGER     NOT NULL DEFAULT 0,
  last_accessed       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, course_id)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "progress_select_own" ON public.user_progress;
CREATE POLICY "progress_select_own"
  ON public.user_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "progress_insert_own" ON public.user_progress;
CREATE POLICY "progress_insert_own"
  ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "progress_update_own" ON public.user_progress;
CREATE POLICY "progress_update_own"
  ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);


-- ══════════════════════════════════════════════════════════════════════════════
-- 3. LESSON EVENTS
--    Append-only log. One row every time a lesson is completed.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.lesson_events (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id           TEXT        NOT NULL,
  lesson_id           TEXT        NOT NULL,
  completed_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  quiz_score          SMALLINT    CHECK (quiz_score BETWEEN 0 AND 100),
  time_spent_minutes  SMALLINT,
  marked_by_tutor     BOOLEAN     NOT NULL DEFAULT false
);

ALTER TABLE public.lesson_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "lesson_events_select_own" ON public.lesson_events;
CREATE POLICY "lesson_events_select_own"
  ON public.lesson_events FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "lesson_events_insert_own" ON public.lesson_events;
CREATE POLICY "lesson_events_insert_own"
  ON public.lesson_events FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_lesson_events_user ON public.lesson_events(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_events_completed ON public.lesson_events(completed_at DESC);


-- ══════════════════════════════════════════════════════════════════════════════
-- 4. PRACTICE EVENTS
--    Append-only log for all practice tool interactions.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.practice_events (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_type    TEXT        NOT NULL
                     CHECK (exercise_type IN (
                       'flashcard','cloze','sentence_builder',
                       'tracing','root_hunt','harakat_dash'
                     )),
  vocab_id         TEXT,
  lesson_id        TEXT,
  correct          BOOLEAN,
  difficulty       TEXT        CHECK (difficulty IN ('again','hard','good','easy')),
  duration_seconds SMALLINT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.practice_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "practice_events_select_own" ON public.practice_events;
CREATE POLICY "practice_events_select_own"
  ON public.practice_events FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "practice_events_insert_own" ON public.practice_events;
CREATE POLICY "practice_events_insert_own"
  ON public.practice_events FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_practice_events_user ON public.practice_events(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_events_created ON public.practice_events(created_at DESC);


-- ══════════════════════════════════════════════════════════════════════════════
-- 5. SRS CARDS (Spaced Repetition System — SM-2 algorithm)
--    One row per (user, vocab word). Updated after every flashcard review.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.srs_cards (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vocab_id      TEXT        NOT NULL,
  ease_factor   NUMERIC(4,2) NOT NULL DEFAULT 2.5,
  interval_days INTEGER     NOT NULL DEFAULT 1,
  repetitions   INTEGER     NOT NULL DEFAULT 0,
  next_review   DATE        NOT NULL DEFAULT CURRENT_DATE,
  last_review   DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, vocab_id)
);

ALTER TABLE public.srs_cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "srs_cards_select_own" ON public.srs_cards;
CREATE POLICY "srs_cards_select_own"
  ON public.srs_cards FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "srs_cards_insert_own" ON public.srs_cards;
CREATE POLICY "srs_cards_insert_own"
  ON public.srs_cards FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "srs_cards_update_own" ON public.srs_cards;
CREATE POLICY "srs_cards_update_own"
  ON public.srs_cards FOR UPDATE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_srs_cards_user ON public.srs_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_srs_cards_due  ON public.srs_cards(next_review);


-- ══════════════════════════════════════════════════════════════════════════════
-- 6. WEAK SPOTS
--    Words or lessons where the student keeps making mistakes.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.weak_spots (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vocab_id   TEXT,
  lesson_id  TEXT,
  miss_count INTEGER     NOT NULL DEFAULT 1,
  resolved   BOOLEAN     NOT NULL DEFAULT false,
  flagged_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.weak_spots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weak_spots_select_own" ON public.weak_spots;
CREATE POLICY "weak_spots_select_own"
  ON public.weak_spots FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "weak_spots_all_own" ON public.weak_spots;
CREATE POLICY "weak_spots_all_own"
  ON public.weak_spots FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_weak_spots_user ON public.weak_spots(user_id);


-- ══════════════════════════════════════════════════════════════════════════════
-- 7. TUTOR NOTES
--    Private notes Hadi writes about a student. Only tutor (service_role) writes.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.tutor_notes (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.tutor_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tutor_notes_select_own_student" ON public.tutor_notes;
CREATE POLICY "tutor_notes_select_own_student"
  ON public.tutor_notes FOR SELECT
  USING (auth.uid() = student_id);

CREATE INDEX IF NOT EXISTS idx_tutor_notes_student ON public.tutor_notes(student_id);


-- ══════════════════════════════════════════════════════════════════════════════
-- 8. ENROLMENT REQUESTS
--    Student clicks "Enrol" → row is created → Hadi approves/rejects.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.enrolment_requests (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id  TEXT        NOT NULL,
  message    TEXT,
  status     TEXT        NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.enrolment_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "enrol_requests_select_own" ON public.enrolment_requests;
CREATE POLICY "enrol_requests_select_own"
  ON public.enrolment_requests FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "enrol_requests_insert_own" ON public.enrolment_requests;
CREATE POLICY "enrol_requests_insert_own"
  ON public.enrolment_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_enrol_requests_user   ON public.enrolment_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_enrol_requests_status ON public.enrolment_requests(status);


-- ══════════════════════════════════════════════════════════════════════════════
-- 9. CONSULTATIONS
--    Leads from the /consultation booking form. No auth required.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.consultations (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  whatsapp       TEXT,
  goals          TEXT,
  preferred_time TEXT,
  status         TEXT        NOT NULL DEFAULT 'requested'
                   CHECK (status IN ('requested', 'scheduled', 'completed', 'cancelled')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "consultations_insert_anon" ON public.consultations;
CREATE POLICY "consultations_insert_anon"
  ON public.consultations FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_consultations_status  ON public.consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created ON public.consultations(created_at DESC);


-- ══════════════════════════════════════════════════════════════════════════════
-- 10. LEAD CAPTURES
--     Resource download requests. No auth required.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.lead_captures (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT        NOT NULL,
  resource_id TEXT        NOT NULL,
  source      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.lead_captures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "lead_captures_insert_anon" ON public.lead_captures;
CREATE POLICY "lead_captures_insert_anon"
  ON public.lead_captures FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_lead_captures_email ON public.lead_captures(email);


-- ══════════════════════════════════════════════════════════════════════════════
-- 11. STREAKS
--     One row per user. Updated whenever the student does any practice.
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.streaks (
  user_id          UUID    PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak   INTEGER NOT NULL DEFAULT 0,
  longest_streak   INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE,
  total_xp         INTEGER NOT NULL DEFAULT 0,
  current_level    INTEGER NOT NULL DEFAULT 1
);

ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "streaks_select_own" ON public.streaks;
CREATE POLICY "streaks_select_own"
  ON public.streaks FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "streaks_upsert_own" ON public.streaks;
CREATE POLICY "streaks_upsert_own"
  ON public.streaks FOR ALL USING (auth.uid() = user_id);


-- ── Auto-create streak row on profile creation ─────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.streaks (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_profile();


-- ══════════════════════════════════════════════════════════════════════════════
-- Done!
-- After running this, go to Supabase → Authentication → Settings and:
--   1. Set Site URL to your Vercel URL (or http://localhost:3000 for dev)
--   2. Add redirect URLs: https://your-app.vercel.app/**, http://localhost:3000/**
-- ══════════════════════════════════════════════════════════════════════════════
