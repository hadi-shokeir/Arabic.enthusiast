// ─── Pricing Page ─────────────────────────────────────────────────────────────

function PricingPage({ setPage }) {
  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(201,146,42,0.05) 0%, transparent 70%)',
      }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: 'linear-gradient(#c9922a 1px, transparent 1px), linear-gradient(90deg, #c9922a 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div style={{ maxWidth: 600, padding: '0 40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ fontFamily: 'Amiri, serif', fontSize: '3rem', color: 'rgba(201,146,42,0.5)', marginBottom: 12, textShadow: '0 0 30px rgba(201,146,42,0.3)' }}>قريباً</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, justifyContent: 'center' }}>
            <span style={{ display: 'block', width: 28, height: 1, background: '#c9922a' }}></span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9922a' }}>Pricing</span>
            <span style={{ display: 'block', width: 28, height: 1, background: '#c9922a' }}></span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#f5f0e8', fontWeight: 600, lineHeight: 1.2, marginBottom: 20 }}>
            Pricing coming<br /><em style={{ color: '#c9922a' }}>soon</em>
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.45)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 44 }}>
            Details are being finalised. In the meantime, reach out directly — Hadi will be happy to discuss options based on your goals and availability.
          </p>
          <button onClick={() => { setPage('about'); window.scrollTo(0,0); }} style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
            padding: '16px 44px', background: '#c9922a', color: '#0a0805',
            border: 'none', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = '#e5b04a'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.target.style.background = '#c9922a'; e.target.style.transform = 'none'; }}
          >Get in Touch →</button>
        </Reveal>
      </div>
    </div>
  );
}

window.PricingPage = PricingPage;
