'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Reveal — fade + slide-up animation when element enters the viewport.
   Uses IntersectionObserver (no Framer Motion dep for simple scroll reveals).
   For heavier animations (tracing, drag-drop) use framer-motion directly.
───────────────────────────────────────────────────────────────────────────── */

interface RevealProps {
  children:    ReactNode
  delay?:      number    // ms — for staggering siblings
  threshold?:  number    // 0-1, default 0.15
  once?:       boolean   // animate only once (default true)
  className?:  string
  style?:      React.CSSProperties
}

export default function Reveal({
  children,
  delay     = 0,
  threshold = 0.15,
  once      = true,
  className,
  style,
}: RevealProps) {
  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:         visible ? 1 : 0,
        transform:       visible ? 'translateY(0)' : 'translateY(20px)',
        transition:      `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange:      'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
