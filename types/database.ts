/* ─────────────────────────────────────────────────────────────────────────────
   Supabase Database Types
   Hand-written to match the schema.sql.
   In production you can replace this with `supabase gen types typescript`.
───────────────────────────────────────────────────────────────────────────── */

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:                   string
          full_name:            string
          role:                 'student' | 'tutor'
          enrolled_courses:     string[]
          enrolment_status:     'pending' | 'active' | 'inactive'
          whatsapp:             string | null
          goals:                string | null
          target_audience:      'quranic' | 'levantine' | 'msa_professional' | 'hawza' | null
          notes_from_tutor:     string | null
          gamification_enabled: boolean
          created_at:           string
        }
        Insert: {
          id:                   string
          full_name:            string
          role?:                'student' | 'tutor'
          enrolled_courses?:    string[]
          enrolment_status?:    'pending' | 'active' | 'inactive'
          whatsapp?:            string | null
          goals?:               string | null
          target_audience?:     'quranic' | 'levantine' | 'msa_professional' | 'hawza' | null
          notes_from_tutor?:    string | null
          gamification_enabled?: boolean
          created_at?:          string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }

      user_progress: {
        Row: {
          id:                 string
          user_id:            string
          course_id:          string
          completed_lessons:  string[]
          quiz_scores:        Record<string, number>
          time_spent_minutes: number
          last_accessed:      string
          updated_at:         string
        }
        Insert: {
          id?:                string
          user_id:            string
          course_id:          string
          completed_lessons?: string[]
          quiz_scores?:       Record<string, number>
          time_spent_minutes?: number
          last_accessed?:     string
          updated_at?:        string
        }
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>
      }

      lesson_events: {
        Row: {
          id:                 string
          user_id:            string
          course_id:          string
          lesson_id:          string
          completed_at:       string
          quiz_score:         number | null
          time_spent_minutes: number | null
          marked_by_tutor:    boolean
        }
        Insert: {
          id?:                string
          user_id:            string
          course_id:          string
          lesson_id:          string
          completed_at?:      string
          quiz_score?:        number | null
          time_spent_minutes?: number | null
          marked_by_tutor?:   boolean
        }
        Update: Partial<Database['public']['Tables']['lesson_events']['Insert']>
      }

      practice_events: {
        Row: {
          id:               string
          user_id:          string
          exercise_type:    string
          vocab_id:         string | null
          lesson_id:        string | null
          correct:          boolean | null
          difficulty:       'again' | 'hard' | 'good' | 'easy' | null
          duration_seconds: number | null
          created_at:       string
        }
        Insert: {
          id?:              string
          user_id:          string
          exercise_type:    string
          vocab_id?:        string | null
          lesson_id?:       string | null
          correct?:         boolean | null
          difficulty?:      'again' | 'hard' | 'good' | 'easy' | null
          duration_seconds?: number | null
          created_at?:      string
        }
        Update: Partial<Database['public']['Tables']['practice_events']['Insert']>
      }

      srs_cards: {
        Row: {
          id:            string
          user_id:       string
          vocab_id:      string
          ease_factor:   number
          interval_days: number
          repetitions:   number
          next_review:   string
          last_review:   string | null
          created_at:    string
        }
        Insert: {
          id?:           string
          user_id:       string
          vocab_id:      string
          ease_factor?:  number
          interval_days?: number
          repetitions?:  number
          next_review?:  string
          last_review?:  string | null
          created_at?:   string
        }
        Update: Partial<Database['public']['Tables']['srs_cards']['Insert']>
      }

      weak_spots: {
        Row: {
          id:         string
          user_id:    string
          vocab_id:   string | null
          lesson_id:  string | null
          miss_count: number
          resolved:   boolean
          flagged_at: string
        }
        Insert: {
          id?:        string
          user_id:    string
          vocab_id?:  string | null
          lesson_id?: string | null
          miss_count?: number
          resolved?:  boolean
          flagged_at?: string
        }
        Update: Partial<Database['public']['Tables']['weak_spots']['Insert']>
      }

      tutor_notes: {
        Row: {
          id:         string
          student_id: string
          content:    string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?:        string
          student_id: string
          content:    string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['tutor_notes']['Insert']>
      }

      enrolment_requests: {
        Row: {
          id:         string
          user_id:    string
          course_id:  string
          message:    string | null
          status:     'pending' | 'approved' | 'rejected'
          created_at: string
        }
        Insert: {
          id?:        string
          user_id:    string
          course_id:  string
          message?:   string | null
          status?:    'pending' | 'approved' | 'rejected'
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['enrolment_requests']['Insert']>
      }

      consultations: {
        Row: {
          id:             string
          name:           string
          email:          string
          whatsapp:       string | null
          goals:          string | null
          preferred_time: string | null
          status:         'requested' | 'scheduled' | 'completed' | 'cancelled'
          created_at:     string
        }
        Insert: {
          id?:            string
          name:           string
          email:          string
          whatsapp?:      string | null
          goals?:         string | null
          preferred_time?: string | null
          status?:        'requested' | 'scheduled' | 'completed' | 'cancelled'
          created_at?:    string
        }
        Update: Partial<Database['public']['Tables']['consultations']['Insert']>
      }

      lead_captures: {
        Row: {
          id:          string
          email:       string
          resource_id: string
          source:      string | null
          created_at:  string
        }
        Insert: {
          id?:         string
          email:       string
          resource_id: string
          source?:     string | null
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['lead_captures']['Insert']>
      }

      streaks: {
        Row: {
          user_id:          string
          current_streak:   number
          longest_streak:   number
          last_active_date: string | null
          total_xp:         number
          current_level:    number
        }
        Insert: {
          user_id:          string
          current_streak?:  number
          longest_streak?:  number
          last_active_date?: string | null
          total_xp?:        number
          current_level?:   number
        }
        Update: Partial<Database['public']['Tables']['streaks']['Insert']>
      }
    }

    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
