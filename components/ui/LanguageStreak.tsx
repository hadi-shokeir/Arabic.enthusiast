import type { Streak } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   LanguageStreak — compact streak + XP widget for the student portal nav.
   Shows the current streak count, level, and a tiny XP progress bar.
   Receives a Streak object from the portal layout (fetched server-side).

   Usage:
     <LanguageStreak streak={streakData} />
───────────────────────────────────────────────────────────────────────────── */

interface LanguageStreakProps {
  streak: Streak
  compact?: boolean   // hide XP bar and level label — for very small viewports
}

/* XP thresholds per level (starts at 0, doubles each tier) */
const XP_THRESHOLDS = [0, 100, 250, 500, 900, 1500, 2500, 4000, 6000, 10000]

function getLevelProgress(xp: number, level: number) {
  const floor = XP_THRESHOLDS[Math.min(level - 1, XP_THRESHOLDS.length - 1)] ?? 0
  const ceil  = XP_THRESHOLDS[Math.min(level,     XP_THRESHOLDS.length - 1)] ?? floor + 100
  const range = ceil - floor
  return Math.min(100, Math.round(((xp - floor) / range) * 100))
}

export default function LanguageStreak({ streak, compact = false }: LanguageStreakProps) {
  const progress = getLevelProgress(streak.total_xp, streak.current_level)

  return (
    <div
      style={{
        display:    'flex',
        alignItems: 'center',
        gap:        12,
      }}
    >
      {/* Fire + streak count */}
      <div
        style={{
          display:    'flex',
          alignItems: 'center',
          gap:        5,
        }}
      >
        <span
          aria-label="streak"
          style={{ fontSize: '1rem', lineHeight: 1 }}
        >
          🔥
        </span>
        <span
          style={{
            fontFamily:  'var(--font-body)',
            fontSize:    '0.88rem',
            fontWeight:  700,
            color:       streak.current_streak > 0 ? 'var(--gold)' : 'var(--text3)',
            letterSpacing: '0.02em',
          }}
        >
          {streak.current_streak}
        </span>
        {!compact && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   '0.7rem',
              color:      'var(--text3)',
            }}
          >
            {streak.current_streak === 1 ? 'day' : 'days'}
          </span>
        )}
      </div>

      {/* Level + XP bar */}
      {!compact && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 80 }}>
          <div
            style={{
              display:       'flex',
              alignItems:    'center',
              justifyContent:'space-between',
            }}
          >
            <span
              style={{
                fontFamily:  'var(--font-body)',
                fontSize:    '0.65rem',
                color:       'var(--text3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Lvl {streak.current_level}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize:   '0.62rem',
                color:      'var(--text3)',
              }}
            >
              {streak.total_xp} XP
            </span>
          </div>

          {/* XP progress bar */}
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Level ${streak.current_level} progress: ${progress}%`}
            />
          </div>
        </div>
      )}
    </div>
  )
}
