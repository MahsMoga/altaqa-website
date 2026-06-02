/**
 * PremiumBuildingSVG — premium glass tower illustration.
 *
 * Design principles:
 *  - Building body is PREDOMINANTLY DARK GLASS — not colourful
 *  - Windows are SMALL accent lights, not large panels
 *  - 60% windows off/dark, 25% cool blue, 15% warm amber (very subtle opacity)
 *  - Reflective glass look via multi-stop gradients
 *  - Proper skyscraper proportions: tall + narrow
 *  - Architectural setbacks, crown, spire
 *  - Subtle animations: scan, edge packets, float
 */

// ─── Geometry constants ───────────────────────────────────────────────────────
const FL = 158, FR = 420   // front face left / right
const FT =  42, FB = 615   // front face top  / bottom
const FW = FR - FL          // 262
const FH = FB - FT          // 573

// Perspective recession (3/4 view)
const RX = 62, RY = 42

// Crown (architectural setback above main tower)
const CL = FL + 22, CR = FR - 22
const CT = FT - 68            // crown starts 68px above tower

// Upper setback (mid-section narrowing)
const UL = FL + 10, UR = FR - 10
const UT = FT + 180           // setback transition at floor 7

// Podium
const PL = FL - 24, PR = FR + 24
const PB = FB + 52

// ─── Window grid ──────────────────────────────────────────────────────────────
const COLS = 8
const ROWS = 22
const CW   = FW / COLS       // 32.75
const RH   = FH / ROWS       // 26.04
const WW   = CW - 9          // window width  ≈ 23.75
const WH   = RH - 7          // window height ≈ 19.04

// Deterministic window state
function winState(r: number, c: number): 'off' | 'cool' | 'warm' {
  const v = Math.abs(Math.sin(r * 17.3 + c * 11.7 + 1.0)) % 1
  if (v < 0.56) return 'off'
  if (v < 0.82) return 'cool'
  return 'warm'
}

// Side face windows (2 cols × 22 rows)
function sideWinState(r: number, c: number): 'off' | 'cool' {
  const v = Math.abs(Math.sin(r * 13.1 + c * 9.7 + 3.2)) % 1
  return v < 0.60 ? 'off' : 'cool'
}

// Window colour — very subtle, glass impression
const WIN_COOL = 'rgba(130,180,255,0.38)'
const WIN_WARM = 'rgba(255,200,110,0.30)'
const WIN_OFF  = 'rgba(4,12,28,0.92)'
const SIDE_COOL = 'rgba(90,140,220,0.28)'
const SIDE_OFF  = 'rgba(3,9,20,0.95)'

export default function PremiumBuildingSVG() {
  // Precompute front windows
  const frontWindows = Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => {
      const state = winState(r, c)
      return {
        x: FL + c * CW + 4.5,
        y: FT + r * RH + 3.5,
        fill: state === 'cool' ? WIN_COOL : state === 'warm' ? WIN_WARM : WIN_OFF,
      }
    })
  ).flat()

  // Precompute side windows
  const sideWindows = Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: 2 }, (_, c) => ({
      x: FR + c * (RX / 2) + 4,
      y: FT + r * RH + 3.5,
      fill: sideWinState(r, c) === 'cool' ? SIDE_COOL : SIDE_OFF,
    }))
  ).flat()

  return (
    <>
      <style>{`
        @keyframes svgFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-9px); }
        }
        @keyframes svgScan {
          0%   { transform: translateY(${FB + 10}px); opacity:0; }
          4%   { opacity:0.6; }
          92%  { opacity:0.6; }
          100% { transform: translateY(${FT - 70}px); opacity:0; }
        }
        @keyframes svgPktUp {
          0%   { transform:translateY(0);              opacity:0; }
          5%   { opacity:1; }
          88%  { opacity:1; }
          100% { transform:translateY(-${FH + 75}px);  opacity:0; }
        }
        @keyframes svgGlow {
          0%,100% { opacity:0.55; }
          50%     { opacity:0.90; }
        }
        @keyframes svgBlink {
          0%,45%,55%,100% { opacity:1; }
          50%             { opacity:0.15; }
        }

        .bld-float { animation: svgFloat 8s ease-in-out infinite; }
        .bld-scan  { animation: svgScan  7s linear infinite; }
        .bld-glow  { animation: svgGlow  3s ease-in-out infinite; }
        .bld-beacon{ animation: svgBlink 2.8s ease-in-out infinite; }

        .pk0 { animation: svgPktUp 4.2s linear 0.0s infinite; }
        .pk1 { animation: svgPktUp 4.2s linear 1.4s infinite; }
        .pk2 { animation: svgPktUp 4.2s linear 2.8s infinite; }
        .pk3 { animation: svgPktUp 5.0s linear 0.7s infinite; }
        .pk4 { animation: svgPktUp 5.0s linear 2.5s infinite; }
        .pk5 { animation: svgPktUp 5.0s linear 4.0s infinite; }
        .pk6 { animation: svgPktUp 3.8s linear 1.9s infinite; }
      `}</style>

      <svg
        viewBox="0 0 600 760"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display:'block', overflow:'visible' }}
        aria-hidden="true"
      >
        <defs>
          {/* Night sky */}
          <radialGradient id="bg" cx="55%" cy="25%" r="75%">
            <stop offset="0%"  stopColor="#0d2244" stopOpacity="0.85"/>
            <stop offset="55%" stopColor="#040d1c" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#020810" />
          </radialGradient>

          {/* Front glass — reflective dark */}
          <linearGradient id="glassF" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#162a45"/>
            <stop offset="18%"  stopColor="#1a3555"/>   {/* left-side light hit */}
            <stop offset="32%"  stopColor="#112038"/>
            <stop offset="60%"  stopColor="#0c1a2e"/>
            <stop offset="82%"  stopColor="#091525"/>
            <stop offset="100%" stopColor="#061020"/>
          </linearGradient>

          {/* Glass highlight — thin reflective sheen */}
          <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"  stopColor="#3a7abf" stopOpacity="0.0"/>
            <stop offset="22%" stopColor="#4a9adf" stopOpacity="0.10"/>
            <stop offset="38%" stopColor="#60aff0" stopOpacity="0.16"/>
            <stop offset="52%" stopColor="#4a9adf" stopOpacity="0.07"/>
            <stop offset="100%" stopColor="#1a5aaa" stopOpacity="0.0"/>
          </linearGradient>

          {/* Side face — darker, shadowed */}
          <linearGradient id="glassS" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#081828"/>
            <stop offset="100%" stopColor="#040c18"/>
          </linearGradient>

          {/* Top face */}
          <linearGradient id="glassT" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#224466"/>
            <stop offset="100%" stopColor="#0e2035"/>
          </linearGradient>

          {/* Crown — metallic aluminium */}
          <linearGradient id="crown" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#8ab0c8"/>
            <stop offset="45%"  stopColor="#b8d0df"/>
            <stop offset="100%" stopColor="#7aa0b8"/>
          </linearGradient>

          {/* Podium — dark concrete */}
          <linearGradient id="podium" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#0e1e30"/>
            <stop offset="100%" stopColor="#060e18"/>
          </linearGradient>

          {/* Edge glow filter */}
          <filter id="glow" x="-250%" y="-5%" width="600%" height="110%">
            <feGaussianBlur stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Beacon glow */}
          <filter id="beacon" x="-400%" y="-400%" width="900%" height="900%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Scan line gradient */}
          <linearGradient id="scan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#2F80ED" stopOpacity="0"/>
            <stop offset="35%"  stopColor="#2F80ED" stopOpacity="0.55"/>
            <stop offset="50%"  stopColor="#60aaff" stopOpacity="0.75"/>
            <stop offset="65%"  stopColor="#2F80ED" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#2F80ED" stopOpacity="0"/>
          </linearGradient>

          {/* Ground reflection */}
          <radialGradient id="gndGlow" cx="50%" cy="0%" r="65%">
            <stop offset="0%"   stopColor="#1a3a70" stopOpacity="0.38"/>
            <stop offset="100%" stopColor="#0a1830" stopOpacity="0"/>
          </radialGradient>

          {/* Inner building glow (warm interior light seeping out) */}
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffa020" stopOpacity="0.06"/>
            <stop offset="100%" stopColor="#ffa020" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── Sky ──────────────────────────────────────────────────── */}
        <rect x="0" y="0" width="600" height="760" fill="url(#bg)"/>

        {/* ── City silhouette — dark, atmospheric ──────────────────── */}
        <g fill="#040c18" opacity="0.7">
          <rect x="-5"  y="430" width="70"  height="330"/>
          <rect x="50"  y="370" width="55"  height="390"/>
          <rect x="90"  y="450" width="48"  height="310"/>
          <rect x="88"  y="310" width="30"  height="490"/>
          <rect x="430" y="400" width="60"  height="360"/>
          <rect x="480" y="330" width="52"  height="430"/>
          <rect x="522" y="420" width="68"  height="340"/>
          <rect x="555" y="355" width="50"  height="405"/>
          <rect x="12"  y="460" width="22"  height="300"/>
          <rect x="542" y="445" width="25"  height="315"/>
        </g>
        {/* Distant buildings — faded */}
        <g fill="#050e1e" opacity="0.45">
          <rect x="25"  y="480" width="18" height="280"/>
          <rect x="560" y="465" width="20" height="295"/>
          <rect x="110" y="400" width="24" height="360"/>
          <rect x="458" y="415" width="20" height="345"/>
        </g>
        {/* Tiny window lights on bg buildings */}
        <g fill="#1e3a6a" opacity="0.5">
          {[310,360,420,480,540].map(y => <rect key={y} x="58" y={y} width="8" height="6"/>)}
          {[340,400,460,520].map(y   => <rect key={y} x="492" y={y} width="8" height="6"/>)}
          {[370,440,510].map(y       => <rect key={y} x="96"  y={y} width="6" height="5"/>)}
        </g>

        {/* ── Floating building ──────────────────────────────────────── */}
        <g className="bld-float">

          {/* ── Podium ─────────────────────────────────────────────── */}
          {/* Top face */}
          <polygon
            points={`${PL},${FB} ${PR},${FB} ${PR+RX},${FB+RY} ${PL+RX},${FB+RY}`}
            fill="url(#glassT)" opacity="0.85"
          />
          {/* Side face */}
          <polygon
            points={`${PR},${FB} ${PR+RX},${FB+RY} ${PR+RX},${PB+RY} ${PR},${PB}`}
            fill="url(#glassS)"
          />
          {/* Front face */}
          <rect x={PL} y={FB} width={PR-PL} height={PB-FB} fill="url(#podium)"/>
          {/* Podium top edge highlight */}
          <line x1={PL} y1={FB} x2={PR} y2={FB}
            stroke="#2a5a8a" strokeWidth="1.5" opacity="0.6"/>

          {/* ── Main tower — structural faces ──────────────────────── */}
          {/* Top face */}
          <polygon
            points={`${FL},${FT} ${FR},${FT} ${FR+RX},${FT+RY} ${FL+RX},${FT+RY}`}
            fill="url(#glassT)" opacity="0.9"
          />
          {/* Side face */}
          <polygon
            points={`${FR},${FT} ${FR+RX},${FT+RY} ${FR+RX},${FB+RY} ${FR},${FB}`}
            fill="url(#glassS)"
          />
          {/* Side face windows */}
          {sideWindows.map((w, i) => (
            <rect key={`sw${i}`} x={w.x} y={w.y}
              width={14} height={WH * 0.85} fill={w.fill} rx="0.5"/>
          ))}

          {/* ── Front glass curtain wall ───────────────────────────── */}
          <rect x={FL} y={FT} width={FW} height={FH} fill="url(#glassF)"/>

          {/* Warm interior glow (very subtle — suggests occupied building) */}
          <rect x={FL+20} y={FT+20} width={FW-40} height={FH-40}
            fill="url(#innerGlow)" opacity="0.8"/>

          {/* Curtain wall grid — horizontal floor lines */}
          {Array.from({ length: ROWS + 1 }, (_, i) => (
            <line key={`hl${i}`}
              x1={FL} y1={FT + i * RH}
              x2={FR} y2={FT + i * RH}
              stroke="#1a3050"
              strokeWidth={i === 0 || i === ROWS ? 2 : 0.8}
              opacity={i === 0 || i === ROWS ? 0.7 : 0.45}
            />
          ))}

          {/* Curtain wall grid — vertical mullion lines */}
          {Array.from({ length: COLS + 1 }, (_, i) => (
            <line key={`vl${i}`}
              x1={FL + i * CW} y1={FT}
              x2={FL + i * CW} y2={FB}
              stroke="#1a3050"
              strokeWidth={i === 0 || i === COLS ? 2 : 0.7}
              opacity={i === 0 || i === COLS ? 0.7 : 0.35}
            />
          ))}

          {/* Window panes — subtle and small, not dominant */}
          {frontWindows.map((w, i) => (
            <rect key={`fw${i}`}
              x={w.x} y={w.y}
              width={WW} height={WH}
              fill={w.fill}
              rx="0.5"
            />
          ))}

          {/* Reflective sheen overlay */}
          <rect x={FL} y={FT} width={FW} height={FH} fill="url(#sheen)"/>

          {/* ── Crown / top feature ─────────────────────────────────── */}
          {/* Crown top face */}
          <polygon
            points={`${CL},${CT} ${CR},${CT} ${CR+RX},${CT+RY} ${CL+RX},${CT+RY}`}
            fill="url(#glassT)" opacity="0.95"
          />
          {/* Crown side */}
          <polygon
            points={`${CR},${CT} ${CR+RX},${CT+RY} ${CR+RX},${FT+RY} ${CR},${FT}`}
            fill="url(#glassS)"
          />
          {/* Crown front */}
          <rect x={CL} y={CT} width={CR-CL} height={FT-CT} fill="url(#crown)"/>
          {/* Crown fin details */}
          {[CL+10, (CL+CR)/2-12, (CL+CR)/2+12, CR-10].map((x,i) => (
            <rect key={i} x={x} y={CT+2} width={8} height={FT-CT-4}
              fill="#c0d0dc" opacity="0.6"/>
          ))}
          {/* Transition ledge */}
          <line x1={CL-4} y1={FT} x2={CR+4} y2={FT}
            stroke="#8ab0c8" strokeWidth="3" opacity="0.9"/>
          <line x1={FL-2} y1={FT} x2={FR+2} y2={FT}
            stroke="#2F80ED" strokeWidth="1.5" opacity="0.5"/>

          {/* ── Spire ──────────────────────────────────────────────── */}
          <line
            x1={(CL+CR)/2} y1={CT}
            x2={(CL+CR)/2} y2={CT - 50}
            stroke="#9ab8cc" strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Beacon */}
          <circle
            cx={(CL+CR)/2} cy={CT - 53}
            r="5" fill="#4fa8ff"
            filter="url(#beacon)"
            className="bld-beacon"
          />

          {/* ── Edge glow lines ─────────────────────────────────────── */}
          <line x1={FL}    y1={CT-4}   x2={FL}    y2={FB}
            stroke="#2F80ED" strokeWidth="2.5"
            filter="url(#glow)" className="bld-glow"/>
          <line x1={FR}    y1={FT-4}   x2={FR}    y2={FB}
            stroke="#2F80ED" strokeWidth="2.5"
            filter="url(#glow)" className="bld-glow"
            style={{animationDelay:'0.9s'}}/>
          <line x1={FR+RX} y1={FT+RY} x2={FR+RX} y2={FB+RY}
            stroke="#2F80ED" strokeWidth="1.8"
            filter="url(#glow)" className="bld-glow"
            style={{animationDelay:'1.5s'}}/>
          <line x1={CL}    y1={CT-4}   x2={CL}    y2={FT}
            stroke="#5ba3f5" strokeWidth="2"
            filter="url(#glow)" className="bld-glow"
            style={{animationDelay:'0.4s'}}/>
          <line x1={CR}    y1={CT-4}   x2={CR}    y2={FT}
            stroke="#5ba3f5" strokeWidth="2"
            filter="url(#glow)" className="bld-glow"
            style={{animationDelay:'1.1s'}}/>

          {/* Top frame glow */}
          <line x1={CL} y1={CT} x2={CR} y2={CT}
            stroke="#5ba3f5" strokeWidth="1.8" filter="url(#glow)" opacity="0.7"/>
          <line x1={FL} y1={FT} x2={FR} y2={FT}
            stroke="#2F80ED" strokeWidth="1.5" filter="url(#glow)" opacity="0.55"/>

          {/* ── BMS scan line ────────────────────────────────────────── */}
          <rect
            x={FL} y={-28} width={FW} height={56}
            fill="url(#scan)"
            className="bld-scan"
          />

          {/* ── Edge data packets ────────────────────────────────────── */}
          {/* Left edge */}
          {['pk0','pk1','pk2'].map(cls => (
            <g key={cls} className={cls}
              style={{transformOrigin:`${FL}px ${FB}px`}}>
              <circle cx={FL} cy={FB}    r="4.5" fill="#2F80ED" filter="url(#glow)"/>
              <circle cx={FL} cy={FB+12} r="2.5" fill="#2F80ED" opacity="0.4"/>
            </g>
          ))}
          {/* Right edge */}
          {['pk3','pk4','pk5'].map(cls => (
            <g key={cls} className={cls}
              style={{transformOrigin:`${FR}px ${FB}px`}}>
              <circle cx={FR} cy={FB}    r="4.5" fill="#5ba3f5" filter="url(#glow)"/>
              <circle cx={FR} cy={FB+12} r="2.5" fill="#5ba3f5" opacity="0.4"/>
            </g>
          ))}
          {/* Centre */}
          <g className="pk6" style={{transformOrigin:`${(FL+FR)/2}px ${FB}px`}}>
            <circle cx={(FL+FR)/2} cy={FB} r="3.5" fill="#2F80ED" filter="url(#glow)"/>
          </g>

        </g>{/* end float group */}

        {/* ── Ground glow ──────────────────────────────────────────── */}
        <ellipse
          cx={FL + FW/2 + RX/2} cy={PB + RY + 12}
          rx="195" ry="28"
          fill="url(#gndGlow)"
        />

        {/* Ground line */}
        <line x1="0" y1={PB+RY+14} x2="600" y2={PB+RY+14}
          stroke="#1a3a5c" strokeWidth="1" opacity="0.25"/>

      </svg>
    </>
  )
}
