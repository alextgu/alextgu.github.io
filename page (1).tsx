'use client';

import { useState, useEffect, useRef } from 'react';

const sections = ['home', 'about', 'work', 'contact'] as const;
type Section = typeof sections[number];

const CONTENT: Record<Section, string> = {
  home: "Hi. I'm Alex. I make websites.",
  about: "I'm a developer. I like making things.",
  work: "I made some stuff. Project one. Project two. Project three.",
  contact: "Email me. hello@alex.dev",
};

// 32 phases of pure psychological warfare
const TIMINGS = [
  400,  // 1  SCREEN SHAKE starts
  300,  // 2  GLITCH stripes flash in
  200,  // 3  glitch hold
  300,  // 4  LENS FLARE sweeps left→right
  400,  // 5  lens flare holds centre
  300,  // 6  lens flare sweeps out
  250,  // 7  RAINBOW SWEEP across screen
  200,  // 8  rainbow hold
  300,  // 9  VORTEX SPIRAL starts spinning
  500,  // 10 vortex intensifies
  300,  // 11 vortex holds full
  200,  // 12 PIXELATION grid smashes in
  300,  // 13 pixels hold
  200,  // 14 ILLUMINATI TRIANGLE flash
  150,  // 15 white flash
  150,  // 16 black flash ← SWAP CONTENT HERE
  150,  // 17 white flash
  200,  // 18 black flash
  250,  // 19 HITMARKER × slams in centre
  300,  // 20 hitmarker holds
  300,  // 21 BARN DOOR left slams in
  300,  // 22 BARN DOOR right slams in
  400,  // 23 barn hold (darkness)
  300,  // 24 LASER BEAMS fire (red + blue)
  400,  // 25 lasers hold
  300,  // 26 STAR WIPE spins in
  400,  // 27 star wipe holds
  300,  // 28 BARN DOORS open
  300,  // 29 FLIP PANELS fold away
  200,  // 30 screen shake settle
  500,  // 31 TEXT SLIDES IN
  800,  // 32 done
];

export default function Home() {
  const [active, setActive] = useState<Section>('home');
  const [next, setNext] = useState<Section>('home');
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0 });
  const shakeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = (section: Section) => {
    if (phaseRef.current > 0 || section === active) return;
    setNext(section);
    setPhase(1);
    phaseRef.current = 1;
  };

  // Screen shake loop during phase 1 and phase 30
  useEffect(() => {
    const shouldShake = phase === 1 || phase === 30;
    if (shouldShake) {
      shakeRef.current = setInterval(() => {
        setShakeOffset({
          x: (Math.random() - 0.5) * 18,
          y: (Math.random() - 0.5) * 18,
        });
      }, 40);
    } else {
      if (shakeRef.current) clearInterval(shakeRef.current);
      setShakeOffset({ x: 0, y: 0 });
    }
    return () => { if (shakeRef.current) clearInterval(shakeRef.current); };
  }, [phase]);

  useEffect(() => {
    if (phase === 0) return;
    if (phase === 16) setActive(next);
    if (phase > TIMINGS.length) {
      setPhase(0);
      phaseRef.current = 0;
      return;
    }
    const t = setTimeout(() => {
      const np = phase + 1;
      setPhase(np);
      phaseRef.current = np;
    }, TIMINGS[phase - 1]);
    return () => clearTimeout(t);
  }, [phase, next]);

  const p = phase;
  const on = p > 0;

  // ── GLITCH STRIPES (phase 2-3) ──────────────────────────────────────────────
  const showGlitch = p === 2 || p === 3;

  // ── LENS FLARE (phase 4-6) ──────────────────────────────────────────────────
  const showLensFlare = p >= 4 && p <= 6;
  const lensX = p === 4 ? '-10%' : p === 5 ? '50%' : '110%';

  // ── RAINBOW SWEEP (phase 7-8) ───────────────────────────────────────────────
  const showRainbow = p === 7 || p === 8;
  const rainbowX = p === 7 ? '-100%' : '0%';

  // ── VORTEX (phase 9-11) ─────────────────────────────────────────────────────
  const showVortex = p >= 9 && p <= 11;
  const vortexScale = p === 9 ? 0.3 : p === 10 ? 1.2 : 1;
  const vortexOpacity = p === 11 ? 1 : 0.85;

  // ── PIXEL GRID (phase 12-13) ────────────────────────────────────────────────
  const showPixels = p === 12 || p === 13;

  // ── ILLUMINATI TRIANGLE (phase 14) ─────────────────────────────────────────
  const showIlluminati = p === 14;

  // ── FLASH SEQUENCE (phase 15-18) ────────────────────────────────────────────
  const flashBg =
    p === 15 || p === 17 ? '#fff' :
    p === 16 || p === 18 ? '#000' : null;

  // ── HITMARKER (phase 19-20) ─────────────────────────────────────────────────
  const showHitmarker = p === 19 || p === 20;

  // ── BARN DOORS (phase 21-23, open at 28) ────────────────────────────────────
  const barnLeftClosed = p >= 21 && p <= 27;
  const barnRightClosed = p >= 22 && p <= 27;

  // ── LASERS (phase 24-25) ────────────────────────────────────────────────────
  const showLasers = p >= 24 && p <= 25;

  // ── STAR WIPE (phase 26-27) ─────────────────────────────────────────────────
  const showStar = p >= 26 && p <= 27;
  const starScale = p === 26 ? 0 : 1;

  // ── FLIP PANELS (phase 28-29) ────────────────────────────────────────────────
  const showFlip = p >= 28 && p <= 29;
  const flipAngle = p === 29 ? '0deg' : '-90deg';

  // ── TEXT SLIDE (phase 31) ────────────────────────────────────────────────────
  const textX = p === 0 ? '0%' : p < 31 ? '-120%' : '0%';
  const textOpacity = p === 0 ? 1 : p < 31 ? 0 : 1;

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      background: '#fff',
      minHeight: '100vh',
      color: '#000',
      overflow: 'hidden',
      position: 'relative',
      transform: on ? `translate(${shakeOffset.x}px, ${shakeOffset.y}px)` : 'none',
    }}>

      {/* ── GLITCH STRIPES ── */}
      {showGlitch && Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{
          position: 'fixed',
          top: `${(i / 12) * 100}%`,
          left: 0, right: 0,
          height: `${100 / 12}%`,
          background: i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#ffff00',
          opacity: Math.random() > 0.4 ? 0.6 : 0,
          transform: `translateX(${(Math.random() - 0.5) * 80}px)`,
          zIndex: 200,
          mixBlendMode: 'multiply',
        }} />
      ))}

      {/* ── LENS FLARE ── */}
      {showLensFlare && (
        <div style={{
          position: 'fixed', top: '50%', left: lensX,
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,200,0.95) 0%, rgba(255,200,0,0.6) 20%, rgba(255,100,0,0.3) 40%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 210,
          pointerEvents: 'none',
          boxShadow: '0 0 200px 100px rgba(255,220,0,0.4)',
          transition: 'left 0.3s ease-in-out',
        }}>
          {/* lens rings */}
          {[80, 140, 200, 260].map((size, i) => (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: size, height: size * 0.3,
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.3)',
              transform: 'translate(-50%, -50%)',
              opacity: 0.5,
            }} />
          ))}
        </div>
      )}

      {/* ── RAINBOW SWEEP ── */}
      {showRainbow && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8b00ff)',
          opacity: 0.55,
          transform: `translateX(${rainbowX})`,
          transition: 'transform 0.25s linear',
          zIndex: 190,
          mixBlendMode: 'multiply',
        }} />
      )}

      {/* ── VORTEX SPIRAL ── */}
      {showVortex && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: `translate(-50%, -50%) scale(${vortexScale})`,
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          width: '200vmax', height: '200vmax',
          zIndex: 195,
          opacity: vortexOpacity,
          animation: 'spin 0.6s linear infinite',
        }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '50%', height: '4px',
              transformOrigin: '0 50%',
              transform: `rotate(${i * 22.5}deg)`,
              background: `hsl(${i * 22}, 100%, 50%)`,
              opacity: 0.8,
            }} />
          ))}
        </div>
      )}

      {/* ── PIXEL GRID ── */}
      {showPixels && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 205, display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gridTemplateRows: 'repeat(12, 1fr)' }}>
          {Array.from({ length: 240 }).map((_, i) => (
            <div key={i} style={{
              background: `hsl(${Math.random() * 360}, 80%, 40%)`,
              opacity: Math.random() > 0.3 ? 1 : 0,
            }} />
          ))}
        </div>
      )}

      {/* ── ILLUMINATI TRIANGLE ── */}
      {showIlluminati && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 215,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)',
        }}>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              width: 0, height: 0,
              borderLeft: '120px solid transparent',
              borderRight: '120px solid transparent',
              borderBottom: '200px solid #ffcc00',
              filter: 'drop-shadow(0 0 40px #ffcc00)',
              animation: 'pulse 0.3s infinite',
            }} />
            <div style={{
              position: 'absolute', top: '60%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '60px',
            }}>👁️</div>
            <div style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem', fontFamily: 'Arial', letterSpacing: '0.4em' }}>
              ILLUMINATI CONFIRMED
            </div>
          </div>
        </div>
      )}

      {/* ── FLASH ── */}
      {flashBg && <div style={{ position: 'fixed', inset: 0, background: flashBg, zIndex: 220 }} />}

      {/* ── HITMARKER ── */}
      {showHitmarker && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 225, pointerEvents: 'none',
          animation: p === 19 ? 'hitmarker 0.3s ease-out' : 'none',
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <line x1="20" y1="20" x2="35" y2="35" stroke="#ff4400" strokeWidth="5" strokeLinecap="round"/>
            <line x1="60" y1="20" x2="45" y2="35" stroke="#ff4400" strokeWidth="5" strokeLinecap="round"/>
            <line x1="20" y1="60" x2="35" y2="45" stroke="#ff4400" strokeWidth="5" strokeLinecap="round"/>
            <line x1="60" y1="60" x2="45" y2="45" stroke="#ff4400" strokeWidth="5" strokeLinecap="round"/>
          </svg>
          <div style={{ color: '#ff4400', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', marginTop: '-8px', textShadow: '0 0 10px #ff4400' }}>
            +100
          </div>
        </div>
      )}

      {/* ── BARN DOOR LEFT ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '50%', height: '100%',
        background: '#000',
        transform: barnLeftClosed ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 150,
      }} />

      {/* ── BARN DOOR RIGHT ── */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: '50%', height: '100%',
        background: '#000',
        transform: barnRightClosed ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 150,
      }} />

      {/* ── LASERS ── */}
      {showLasers && (
        <>
          <div style={{
            position: 'fixed', top: '35%', left: 0, right: 0, height: '5px',
            background: 'linear-gradient(90deg, transparent, #ff0000, #ff8800, #ffffff, #ff8800, #ff0000, transparent)',
            boxShadow: '0 0 20px 8px #ff2200, 0 0 60px 20px #ff110044',
            zIndex: 160,
          }} />
          <div style={{
            position: 'fixed', top: '60%', left: 0, right: 0, height: '5px',
            background: 'linear-gradient(90deg, transparent, #0044ff, #00ccff, #ffffff, #00ccff, #0044ff, transparent)',
            boxShadow: '0 0 20px 8px #0066ff, 0 0 60px 20px #0088ff44',
            zIndex: 160,
          }} />
          <div style={{
            position: 'fixed', top: 0, left: '48%', bottom: 0, width: '4px',
            background: 'linear-gradient(180deg, transparent, #00ff88, #ffffff, #00ff88, transparent)',
            boxShadow: '0 0 20px 8px #00ff44, 0 0 60px 20px #00ff4444',
            zIndex: 160,
          }} />
        </>
      )}

      {/* ── STAR WIPE ── */}
      {showStar && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: `translate(-50%,-50%) scale(${starScale}) rotate(${p === 26 ? 0 : 180}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 170,
          pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 200 200" width="300vmax" height="300vmax">
            <polygon points="100,10 115,70 170,40 130,85 190,100 130,115 170,160 115,130 100,190 85,130 30,160 70,115 10,100 70,85 30,40 85,70"
              fill="black" />
          </svg>
        </div>
      )}

      {/* ── FLIP PANELS ── */}
      {showFlip && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 155, perspective: '800px' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
            background: '#000',
            transformOrigin: 'top center',
            transform: `rotateX(${flipAngle})`,
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            background: '#000',
            transformOrigin: 'bottom center',
            transform: `rotateX(${p === 29 ? '0deg' : '90deg'})`,
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>
      )}

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes hitmarker { 0% { transform: translate(-50%,-50%) scale(3); opacity:0; } 100% { transform: translate(-50%,-50%) scale(1); opacity:1; } }
        @keyframes pulse { 0%,100% { filter: drop-shadow(0 0 20px #ffcc00); } 50% { filter: drop-shadow(0 0 60px #ffcc00) brightness(1.5); } }
      `}</style>

      {/* ── PAGE ── */}
      <nav style={{ display: 'flex', gap: '2rem', padding: '2rem', position: 'relative', zIndex: 10 }}>
        {sections.map(s => (
          <button key={s} onClick={() => navigate(s)} style={{
            background: 'none', border: 'none',
            fontFamily: 'Arial, sans-serif',
            fontSize: '1.5rem', fontWeight: 'bold',
            cursor: 'pointer', color: '#000', padding: 0,
          }}>
            {s}
          </button>
        ))}
      </nav>

      <main style={{ padding: '2rem', overflow: 'hidden' }}>
        <p style={{
          fontSize: '3rem', fontWeight: 'bold', margin: 0,
          transform: `translateX(${textX})`,
          opacity: textOpacity,
          transition: p === 31
            ? 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease'
            : 'none',
        }}>
          {CONTENT[active]}
        </p>
      </main>

      {on && (
        <div style={{
          position: 'fixed', bottom: '1rem', right: '1rem',
          fontSize: '0.65rem', fontFamily: 'Arial', fontWeight: 'bold',
          color: (p === 15 || p === 17) ? '#000' : '#bbb',
          zIndex: 999,
        }}>
          phase {p}/{TIMINGS.length}
        </div>
      )}
    </div>
  );
}
