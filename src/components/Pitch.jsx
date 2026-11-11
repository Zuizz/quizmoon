import { useEffect, useState } from 'react';

// SVG Cricket Stumps component
function Stumps({ x, y, scale = 1, scattered = false }) {
  if (scattered) {
    return (
      <g>
        {/* Stump 1 - flying left */}
        <g transform={`translate(${x - 15}, ${y - 30}) rotate(-45)`} style={{ animation: 'stumpFly1 0.6s ease-out forwards' }}>
          <rect x="-2" y="-20" width="4" height="20" fill="#f5deb3" rx="1"/>
          <rect x="-5" y="-22" width="10" height="3" fill="#d4a855" rx="1"/>
        </g>
        {/* Stump 2 - flying up */}
        <g transform={`translate(${x}, ${y - 20}) rotate(10)`} style={{ animation: 'stumpFly2 0.6s ease-out forwards' }}>
          <rect x="-2" y="-20" width="4" height="20" fill="#f5deb3" rx="1"/>
          <rect x="-5" y="-22" width="10" height="3" fill="#d4a855" rx="1"/>
        </g>
        {/* Stump 3 - flying right */}
        <g transform={`translate(${x + 15}, ${y - 25}) rotate(30)`} style={{ animation: 'stumpFly3 0.6s ease-out forwards' }}>
          <rect x="-2" y="-20" width="4" height="20" fill="#f5deb3" rx="1"/>
          <rect x="-5" y="-22" width="10" height="3" fill="#d4a855" rx="1"/>
        </g>
      </g>
    );
  }
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Three stumps */}
      <rect x="-10" y="-28" width="4" height="28" fill="#f5deb3" rx="1"/>
      <rect x="-3" y="-28" width="4" height="28" fill="#f5deb3" rx="1"/>
      <rect x="4" y="-28" width="4" height="28" fill="#f5deb3" rx="1"/>
      {/* Two bails */}
      <rect x="-11" y="-30" width="11" height="3" fill="#d4a855" rx="1"/>
      <rect x="-2" y="-30" width="11" height="3" fill="#d4a855" rx="1"/>
    </g>
  );
}

// Bowler SVG figure
function Bowler({ phase, animProgress }) {
  // animProgress: 0 -> 1 during bowler run-up
  // Start from x = 90, run up to crease at x = 200
  const x = 90 + animProgress * 110;
  // Bowling arm rotation completes a windmill action
  const armAngle = phase === 'bowling' ? -60 + animProgress * 260 : -20;
  // Has the ball been released? (at around 70% of run-up)
  const ballHeld = phase === 'bowling' ? animProgress < 0.65 : false;
  const legCycle = Math.sin(animProgress * Math.PI * 8);
  
  return (
    <g transform={`translate(${x}, 305)`}>
      {/* Body */}
      <ellipse cx="0" cy="-35" rx="10" ry="20" fill="#1e40af"/>
      {/* Head */}
      <circle cx="0" cy="-60" r="12" fill="#fbbf24"/>
      {/* Cap/Helmet */}
      <path d="M -12 -65 Q 0 -76 12 -65" fill="#1e40af" stroke="#374151" strokeWidth="1"/>
      <rect x="2" y="-68" width="14" height="4" rx="2" fill="#1e40af"/>
      
      {/* Bowling arm */}
      <g transform={`rotate(${armAngle}, 6, -45)`}>
        <line x1="6" y1="-45" x2="20" y2="-15" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round"/>
        {/* Hand holding ball prior to release */}
        {ballHeld && <circle cx="20" cy="-15" r="7" fill="#c0392b"/>}
      </g>
      
      {/* Non-bowling arm */}
      <line x1="-6" y1="-45" x2="-18" y2={-30 - legCycle * 10} stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
      
      {/* Legs - animated running stride */}
      <line x1="-4" y1="-15" x2={-8 + legCycle * 14} y2={10 - Math.abs(legCycle) * 4} stroke="#ffffff" strokeWidth="5" strokeLinecap="round"/>
      <line x1="4" y1="-15" x2={8 - legCycle * 14} y2={10 - Math.abs(legCycle) * 4} stroke="#ffffff" strokeWidth="5" strokeLinecap="round"/>
    </g>
  );
}

// Batsman SVG figure
function Batsman({ result, swinging, phase }) {
  // Batting stance angle vs shot swing angle
  let batAngle = 25; // ready stance facing the bowler
  if (swinging) {
    batAngle = result === 'out' ? 10 : -70;
  }
  
  return (
    <g transform="translate(485, 300)">
      {/* Shadow */}
      <ellipse cx="0" cy="14" rx="18" ry="6" fill="rgba(0,0,0,0.3)"/>
      {/* Body */}
      <ellipse cx="0" cy="-35" rx="11" ry="20" fill="#dc2626"/>
      {/* Head */}
      <circle cx="0" cy="-60" r="12" fill="#fbbf24"/>
      {/* Helmet with grill */}
      <path d="M -12 -64 Q 0 -78 12 -64" fill="#dc2626" stroke="#374151" strokeWidth="1"/>
      <path d="M -10 -58 L 10 -58" stroke="#cbd5e1" strokeWidth="2"/>
      <path d="M -8 -54 L 8 -54" stroke="#cbd5e1" strokeWidth="1.5"/>
      <rect x="-14" y="-66" width="10" height="4" rx="1" fill="#dc2626"/>

      {/* Bat arm and Cricket Bat */}
      <g transform={`rotate(${batAngle}, -6, -42)`}>
        <line x1="-6" y1="-42" x2="-8" y2="2" stroke="#fbbf24" strokeWidth="4.5" strokeLinecap="round"/>
        {/* Bat handle */}
        <line x1="-8" y1="2" x2="-9" y2="10" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round"/>
        {/* Bat blade */}
        <rect x="-15" y="10" width="12" height="42" rx="3" fill="#d4a855"/>
        <rect x="-13" y="14" width="8" height="34" rx="2" fill="#c8893a"/>
      </g>

      {/* Front arm */}
      <line x1="8" y1="-42" x2="16" y2="-20" stroke="#fbbf24" strokeWidth="4.5" strokeLinecap="round"/>

      {/* Batting pads / Legs in solid stance */}
      <rect x="-10" y="-14" width="8" height="26" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
      <rect x="2" y="-14" width="8" height="26" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
    </g>
  );
}

// Cricket Ball SVG
function Ball({ cx, cy, visible }) {
  if (!visible) return null;
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <circle r="10" fill="#c0392b"/>
      <path d="M -10 0 Q 0 -4 10 0" fill="none" stroke="#f8d7da" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M -10 0 Q 0 4 10 0" fill="none" stroke="#f8d7da" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Seam details */}
      <line x1="-3" y1="-5" x2="-1" y2="-9" stroke="#f8d7da" strokeWidth="1"/>
      <line x1="3" y1="-5" x2="1" y2="-9" stroke="#f8d7da" strokeWidth="1"/>
    </g>
  );
}

export default function Pitch({ phase, scoreResult }) {
  const [bowlProgress, setBowlProgress] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 180, y: 300 });
  const [ballVisible, setBallVisible] = useState(false);
  const [hitBallPos, setHitBallPos] = useState({ x: 540, y: 290 });
  const [hitBallVisible, setHitBallVisible] = useState(false);
  const [swinging, setSwinging] = useState(false);
  const [stumpsScattered, setStumpsScattered] = useState(false);

  // Reset on phase change
  useEffect(() => {
    setBowlProgress(0);
    setBallVisible(false);
    setHitBallVisible(false);
    setSwinging(false);
    setStumpsScattered(false);
  }, [phase]);

  // BOWLING phase animation
  useEffect(() => {
    if (phase !== 'BOWLING') return;
    let start = null;
    const duration = 2800;
    
    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      
      setBowlProgress(progress);
      
      // Bowler runs in from 0 -> 0.65; ball is released at 0.65 and travels to batsman till 1.0
      if (progress >= 0.65) {
        setBallVisible(true);
        const ballFlight = (progress - 0.65) / 0.35; // 0 to 1
        const startX = 200; // Release point near bowling crease
        const endX = 475;   // Batsman crease / stumps
        const x = startX + (endX - startX) * ballFlight;
        
        // Natural cricket bounce:
        // First half (0 to 0.55): travels down and bounces on pitch around y=310
        // Second half (0.55 to 1.0): rises off pitch up to batsman waist height ~ y=275
        let y;
        if (ballFlight < 0.55) {
          const t = ballFlight / 0.55;
          // Downward arc to pitch bounce point
          y = 265 + (312 - 265) * Math.sin(t * (Math.PI / 2));
        } else {
          const t = (ballFlight - 0.55) / 0.45;
          // Bounce up toward batsman
          y = 312 - 38 * Math.sin(t * (Math.PI * 0.7));
        }
        setBallPos({ x, y });
      } else {
        setBallVisible(false);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // HITTING phase animation
  useEffect(() => {
    if (phase !== 'HITTING') return;
    setHitBallVisible(true);
    setHitBallPos({ x: 540, y: 290 });
    
    let swingTimer = setTimeout(() => setSwinging(true), 100);
    
    let start = null;
    const duration = 2000;
    
    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      
      if (scoreResult === 'six') {
        // High arc over boundary
        const x = 540 + progress * 400;
        const y = 290 - Math.sin(progress * Math.PI) * 250;
        setHitBallPos({ x, y });
      } else if (scoreResult === 'four') {
        // Low ground shot
        const x = 540 + progress * 450;
        const y = 310 + Math.sin(progress * Math.PI * 2) * 20;
        setHitBallPos({ x, y });
      } else {
        // Out / dot - ball hits stumps
        if (progress > 0.3) setStumpsScattered(true);
        setHitBallVisible(false);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const raf = requestAnimationFrame(animate);
    return () => {
      clearTimeout(swingTimer);
      cancelAnimationFrame(raf);
    };
  }, [phase, scoreResult]);

  return (
    <div className="pitch-scene">
      <svg
        viewBox="0 0 700 420"
        style={{ width: '100%', height: '100%', maxHeight: '100vh' }}
        aria-hidden="true"
      >
        <defs>
          {/* Stadium gradient */}
          <radialGradient id="stadiumBg" cx="50%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#1a3a1a"/>
            <stop offset="60%" stopColor="#0d2010"/>
            <stop offset="100%" stopColor="#050d05"/>
          </radialGradient>
          {/* Pitch gradient */}
          <linearGradient id="pitchGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B6914"/>
            <stop offset="50%" stopColor="#C8A951"/>
            <stop offset="100%" stopColor="#8B6914"/>
          </linearGradient>
          {/* Grass gradient */}
          <radialGradient id="grassGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#2d5a27"/>
            <stop offset="100%" stopColor="#1a3a15"/>
          </radialGradient>
          {/* Floodlight glow */}
          <radialGradient id="floodGlow" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,220,0.15)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>

        {/* Stadium background */}
        <rect width="700" height="420" fill="url(#stadiumBg)"/>
        
        {/* Floodlight glow from top */}
        <rect width="700" height="420" fill="url(#floodGlow)"/>
        
        {/* Crowd silhouette */}
        <g opacity="0.6">
          {Array.from({ length: 35 }, (_, i) => {
            const x = i * 20 + 5;
            const h = 25 + Math.sin(i * 2.3) * 8 + Math.cos(i * 1.7) * 6;
            return (
              <g key={i}>
                <ellipse cx={x} cy={40 - h/2} rx="8" ry={h/2} fill="#1a2a1a"/>
                <circle cx={x} cy={40 - h - 5} r="6" fill="#2a3a2a"/>
              </g>
            );
          })}
        </g>
        
        {/* Mowed grass stripes */}
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="0" y={80 + i * 42} width="700" height="21"
            fill={i % 2 === 0 ? '#2d5a27' : '#264e21'} opacity="0.8"/>
        ))}
        
        {/* Oval boundary */}
        <ellipse cx="350" cy="300" rx="320" ry="180" fill="none"
          stroke="#ffffff" strokeWidth="2" strokeDasharray="8,6" opacity="0.4"/>
        
        {/* Cricket pitch (rectangle in center) */}
        <rect x="200" y="250" width="300" height="100" rx="4"
          fill="url(#pitchGrad)" opacity="0.95"/>
        
        {/* Pitch crease lines */}
        <line x1="200" y1="270" x2="500" y2="270" stroke="white" strokeWidth="2" opacity="0.8"/>
        <line x1="200" y1="330" x2="500" y2="330" stroke="white" strokeWidth="2" opacity="0.8"/>
        
        {/* Popping crease */}
        <line x1="230" y1="250" x2="230" y2="350" stroke="white" strokeWidth="1.5" opacity="0.6"/>
        <line x1="470" y1="250" x2="470" y2="350" stroke="white" strokeWidth="1.5" opacity="0.6"/>

        {/* Floodlight poles */}
        <g opacity="0.7">
          <rect x="30" y="20" width="6" height="80" fill="#374151"/>
          <rect x="20" y="20" width="26" height="6" fill="#6b7280"/>
          {[22, 30, 38, 46].map(lx => (
            <ellipse key={lx} cx={lx} cy={22} rx="3" ry="2" fill="#fffde7" opacity="0.9"/>
          ))}
        </g>
        <g opacity="0.7">
          <rect x="664" y="20" width="6" height="80" fill="#374151"/>
          <rect x="654" y="20" width="26" height="6" fill="#6b7280"/>
          {[656, 664, 672, 680].map(lx => (
            <ellipse key={lx} cx={lx} cy={22} rx="3" ry="2" fill="#fffde7" opacity="0.9"/>
          ))}
        </g>

        {/* Stumps at bowler's end (left) */}
        <Stumps x={230} y={300} scale={0.9}/>
        
        {/* Stumps at batsman's end (right) */}
        <Stumps x={470} y={300} scale={0.9} scattered={stumpsScattered && scoreResult === 'out'}/>

        {/* Bowler */}
        {(phase === 'BOWLING' || phase === 'QUESTION' || phase === 'REVEAL') && (
          <Bowler phase={phase === 'BOWLING' ? 'bowling' : 'idle'} animProgress={bowlProgress}/>
        )}

        {/* Bowling ball traveling */}
        {phase === 'BOWLING' && (
          <Ball cx={ballPos.x} cy={ballPos.y} visible={ballVisible}/>
        )}

        {/* Batsman - always on strike at the crease */}
        <Batsman result={scoreResult} swinging={swinging} phase={phase}/>
        
        {/* Hit ball */}
        {phase === 'HITTING' && (
          <Ball cx={hitBallPos.x} cy={hitBallPos.y} visible={hitBallVisible}/>
        )}

        {/* Stump scatter keyframes are injected via style tag */}
        <style>{`
          @keyframes stumpFly1 {
            0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
            100% { transform: translate(-40px,-60px) rotate(-120deg); opacity: 0; }
          }
          @keyframes stumpFly2 {
            0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
            100% { transform: translate(0,-80px) rotate(60deg); opacity: 0; }
          }
          @keyframes stumpFly3 {
            0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
            100% { transform: translate(40px,-50px) rotate(90deg); opacity: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
}
