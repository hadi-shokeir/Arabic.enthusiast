import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
   Button — primary, ghost, and danger variants.
   Can render as <button> or Next.js <Link> (pass href prop).
   Loading state shows a spinner and disables the button.
───────────────────────────────────────────────────────────────────────────── */

type Variant = 'primary' | 'ghost' | 'danger' | 'subtle'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant
  size?:     Size
  href?:     string
  loading?:  boolean
  children:  ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'btn-primary',
  ghost:   'btn-ghost',
  danger:  '',
  subtle:  '',
}

const dangerStyle: React.CSSProperties = {
  background:    'var(--danger)',
  color:         '#ffffff',
  border:        'none',
  padding:       '14px 36px',
  cursor:        'pointer',
  fontFamily:    'var(--font-body)',
  fontSize:      '0.8rem',
  fontWeight:    700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  display:       'inline-flex',
  alignItems:    'center',
  gap:           8,
  transition:    'opacity 0.2s ease',
}

const subtleStyle: React.CSSProperties = {
  background:    'transparent',
  color:         'var(--text3)',
  border:        'none',
  padding:       '10px 16px',
  cursor:        'pointer',
  fontFamily:    'var(--font-body)',
  fontSize:      '0.8rem',
  fontWeight:    500,
  letterSpacing: '0.05em',
  display:       'inline-flex',
  alignItems:    'center',
  gap:           6,
  transition:    'color 0.2s ease',
}

const sizeOverride: Record<Size, React.CSSProperties> = {
  sm: { padding: '8px 20px',  fontSize: '0.72rem' },
  md: {},
  lg: { padding: '16px 44px', fontSize: '0.88rem' },
}

function Spinner() {
  return (
    <svg
      width="14" height="14"
      viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round"
      style={{ animation: 'spin 0.7s linear infinite', flexShrink: 0 }}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

export default function Button({
  variant  = 'primary',
  size     = 'md',
  href,
  loading  = false,
  children,
  fullWidth = false,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const baseClass = variantStyles[variant]
  const extraStyle: React.CSSProperties = {
    ...(variant === 'danger'  ? dangerStyle  : {}),
    ...(variant === 'subtle'  ? subtleStyle  : {}),
    ...sizeOverride[size],
    ...(fullWidth ? { width: '100%', justifyContent: 'center' } : {}),
    ...(loading || disabled ? { opacity: 0.6, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
    ...style,
  }

  const content = (
    <>
      {loading && <Spinner />}
      {children}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={baseClass} style={extraStyle}>
        {content}
      </Link>
    )
  }

  return (
    <button
      {...rest}
      className={baseClass}
      style={extraStyle}
      disabled={loading || disabled}
    >
      {content}
    </button>
  )
}
