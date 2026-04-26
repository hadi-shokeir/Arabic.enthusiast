import BilingualLabel from '@/components/layout/BilingualLabel'

/* ─────────────────────────────────────────────────────────────────────────────
   Eyebrow — thin wrapper around <BilingualLabel eyebrow />.
   Renders: [line] ENGLISH TEXT  نص عربي
   Used above section headings, hero labels, and card headings.

   Usage:
     <Eyebrow en="What You Will Learn" ar="ما ستتعلمه" />
     <Eyebrow en="Courses" ar="الدورات" center gold />
───────────────────────────────────────────────────────────────────────────── */

interface EyebrowProps {
  en:        string
  ar:        string
  center?:   boolean
  gold?:     boolean
  className?: string
  style?:    React.CSSProperties
}

export default function Eyebrow({ en, ar, center, gold, className, style }: EyebrowProps) {
  return (
    <BilingualLabel
      en={en}
      ar={ar}
      eyebrow
      center={center}
      gold={gold}
      className={className}
      style={style}
    />
  )
}
