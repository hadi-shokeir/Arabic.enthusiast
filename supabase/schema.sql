-- ══════════════════════════════════════════════════
-- Arabic Tutor Manager — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- ── Users & Roles ──
-- Supabase Auth handles user creation.
-- We store role info in a profiles table.

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('tutor', 'student')),
  display_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, role, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── App Data Store ──
-- For the current architecture (client-side state),
-- we store the full JSON blob per tutor.
-- This mirrors the IndexedDB approach but syncs to server.

CREATE TABLE IF NOT EXISTS tutor_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ── Row Level Security ──

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_data ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own, tutors can read all
CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tutor data: only the tutor who owns it
CREATE POLICY "Tutors manage own data" ON tutor_data
  FOR ALL USING (auth.uid() = user_id);

-- Students can read tutor data (for portal view)
-- In production, create a view that exposes only student-facing fields
CREATE POLICY "Students read tutor data" ON tutor_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'student'
    )
  );

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_tutor_data_user ON tutor_data(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- ══════════════════════════════════════════════════
-- OPTIONAL: Normalized tables for future scaling
-- Uncomment and use when migrating from JSON blob
-- ══════════════════════════════════════════════════

/*
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  type TEXT DEFAULT 'Lebanese',
  level TEXT DEFAULT 'Beginner',
  payment_plan TEXT DEFAULT 'Per Lesson',
  lesson_rate DECIMAL(10,2) DEFAULT 0,
  lessons_total INTEGER DEFAULT 0,
  lessons_taken INTEGER DEFAULT 0,
  free_total INTEGER DEFAULT 0,
  free_taken INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  start_date DATE DEFAULT CURRENT_DATE,
  goals TEXT,
  next_steps TEXT,
  homework_notes TEXT,
  skill_reading INTEGER DEFAULT 3,
  skill_writing INTEGER DEFAULT 3,
  skill_listening INTEGER DEFAULT 3,
  skill_speaking INTEGER DEFAULT 3,
  teacher_summary TEXT,
  teacher_strengths TEXT,
  teacher_improve TEXT,
  teacher_private_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES auth.users(id),
  student_id UUID REFERENCES students(id),
  date DATE NOT NULL,
  time TEXT,
  duration INTEGER DEFAULT 60,
  type TEXT,
  status TEXT DEFAULT 'Scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES auth.users(id),
  student_id UUID NOT NULL REFERENCES students(id),
  amount DECIMAL(10,2) NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  method TEXT DEFAULT 'Cash',
  status TEXT DEFAULT 'Pending',
  lessons_added INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
*/
