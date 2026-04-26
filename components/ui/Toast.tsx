'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Toast — lightweight notification system.
   Wrap your layout (or portal layout) in <ToastProvider>.
   Call useToast() anywhere to show a notification.

   Usage:
     const { toast } = useToast()
     toast('Lesson completed!', 'success')
     toast('Something went wrong.', 'error')
     toast('Progress saved.', 'info')
───────────────────────────────────────────────────────────────────────────── */

type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id:      string
  message: string
  type:    ToastType
}

interface ToastCtx {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastCtx | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

/* ── Individual toast item ──────────────────────────────────────────────────── */
function ToastEl({ item, onRemove }: { item: ToastItem; onRemove: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Animate in
    const show = setTimeout(() => setVisible(true), 10)
    // Auto-dismiss
    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(onRemove, 300)
    }, 4000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [onRemove])

  const colours: Record<ToastType, { bg: string; border: string; icon: string }> = {
    success: { bg: 'rgba(74,122,90,0.12)',  border: 'rgba(74,122,90,0.4)',  icon: '✓' },
    error:   { bg: 'rgba(180,60,60,0.12)',  border: 'rgba(180,60,60,0.4)',  icon: '✕' },
    info:    { bg: 'rgba(201,146,42,0.10)', border: 'rgba(201,146,42,0.35)', icon: 'ℹ' },
  }
  const c = colours[item.type]

  return (
    <div
      role="alert"
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            12,
        background:     'var(--bg2)',
        border:         `1px solid ${c.border}`,
        borderLeft:     `3px solid ${c.border}`,
        borderRadius:   4,
        padding:        '12px 16px',
        boxShadow:      '0 4px 24px rgba(0,0,0,0.3)',
        opacity:        visible ? 1 : 0,
        transform:      visible ? 'translateX(0)' : 'translateX(20px)',
        transition:     'opacity 0.3s ease, transform 0.3s ease',
        cursor:         'pointer',
        minWidth:       260,
        maxWidth:       360,
      }}
      onClick={() => { setVisible(false); setTimeout(onRemove, 300) }}
    >
      <span
        style={{
          width:          22,
          height:         22,
          borderRadius:   '50%',
          background:     c.bg,
          border:         `1px solid ${c.border}`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '0.7rem',
          flexShrink:     0,
          color:          c.border,
        }}
      >
        {c.icon}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '0.82rem',
          color:      'var(--text)',
          lineHeight: 1.4,
        }}
      >
        {item.message}
      </span>
    </div>
  )
}

/* ── Provider ───────────────────────────────────────────────────────────────── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast stack — bottom right */}
      <div
        aria-live="polite"
        style={{
          position:      'fixed',
          bottom:        24,
          right:         24,
          zIndex:        9999,
          display:       'flex',
          flexDirection: 'column',
          gap:           10,
          pointerEvents: toasts.length ? 'auto' : 'none',
        }}
      >
        {toasts.map(t => (
          <ToastEl key={t.id} item={t} onRemove={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
