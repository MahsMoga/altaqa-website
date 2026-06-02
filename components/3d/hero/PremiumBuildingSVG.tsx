/**
 * PremiumBuildingSVG — hand-crafted SVG smart building illustration.
 *
 * Draws a modern Abu Dhabi glass office tower in 3/4 perspective.
 * Pure SVG + CSS — no Three.js, no GLB, no external files.
 * Works on every device, loads instantly, looks premium.
 *
 * Techniques used:
 *  - Precise perspective geometry (recession dx=78 dy=52)
 *  - Deterministic mixed warm + cool window lighting (90% lit, 10% dark)
 *  - SVG feGaussianBlur glow filter on edge lines
 *  - CSS keyframe animations: scan line, edge data packets, window flicker
 *  - Multi-stop gradients for glass reflection and depth
 *  - City silhouette background with atmospheric depth
 */

// ─── Perspective helpers ──────────────────────────────────────────────────────
const RX = 78   // right-side recession: pixels right
const RY = 52   // right-side recession: pixels down

// ─── Deterministic window colour ─────────────────────────────────────────────
function winColor(row: number, col: number): string {
  const n1 = Math.abs(Math.sin(row * 17.3 + col * 11.7 + 1.0)) % 1
  const n2 = Math.abs(Math.sin(row * 5.1  + col *  7.9 + 2.5)) % 1
  if (n1 < 0.09) return 'rgba(4,12,28,0.95)'                        // dark
  if (n1 > 0.65) return `rgba(255,210,105,${(0.5 + n2*0.35).toFixed(2)})` // warm amber
  return `rgba(120,175,255,${(0.48 + n2*0.38).toFixed(2)})`        // cool blue
}

// Side-face window colour (shadowed right side)
function sideWinColor(row: number, col: number): string {
  const n1 = Math.abs(Math.sin(row * 13.1 + col * 9.7 + 3.2)) % 1
  const n2 = Math.abs(Math.sin(row * 6.3  + col * 14.1 + 1.8)) % 1
  if (n1 < 0.12) return 'rgba(2,8,20,0.95)'
  if (n1 > 0.68) return `rgba(200,165,80,${(0.3 + n2*0.25).toFixed(2)})`
  return `rgba(80,130,200,${(0.28 + n2*0.28).toFixed(2)})`
}

// ─── Building geometry ────────────────────────────────────────────────────────
// Front face
const FL = 125   // front left x
const FR = 420   // front right x
const FT = 60    // front top y
const FB = 600   // front bottom y
const FW = FR - FL   // 295
const FH = FB - FT   // 540

// Right side face
const SR = FL + RX    // side right x = 203  (actually FR+RX)
const ST = FT + RY    // side top y
const SB = FB + RY    // side bottom y
// Polygon: (FR,FT) → (FR+RX,FT+RY) → (FR+RX,FB+RY) → (FR,FB)
const sidePoints = `${FR},${FT} ${FR+RX},${FT+RY} ${FR+RX},${FB+RY} ${FR},${FB}`

// Top face
// (FL,FT) → (FR,FT) → (FR+RX,FT+RY) → (FL+RX,FT+RY)
const topPoints = `${FL},${FT} ${FR},${FT} ${FR+RX},${FT+RY} ${FL+RX},${FT+RY}`

// Crown (top 2 floors narrower — architectural setback)
const CL = FL + 20, CR = FR - 20
const CT = FT - 55  // crown starts 55px above main tower
const crownFront = `${CL},${CT} ${CR},${CT} ${CR},${FT} ${CL},${FT}`
const crownSide  = `${CR},${CT} ${CR+RX},${CT+RY} ${CR+RX},${FT+RY} ${CR},${FT}`
const crownTop   = `${CL},${CT} ${CR},${CT} ${CR+RX},${CT+RY} ${CL+RX},${CT+RY}`

// Podium (base, wider than tower)
const PL = FL - 22, PR = FR + 22
const PT = FB       // podium top = tower bottom
const PB = FB + 58  // podium bottom
const podiumFront = `${PL},${PT} ${PR},${PT} ${PR},${PB} ${PL},${PB}`
const podiumSide  = `${PR},${PT} ${PR+RX},${PT+RY} ${PR+RX},${PB+RY} ${PR},${PB}`
const podiumTop   = `${PL},${PT} ${PR},${PT} ${PR+RX},${PT+RY} ${PL+RX},${PT+RY}`

// ─── Window grids ──────────────────────────────────────────────────────────────
// Front face: 6 cols × 10 rows
const F_COLS = 6, F_ROWS = 10
const F_COL_W = FW / F_COLS    // 49.2
const F_ROW_H = FH / F_ROWS    // 54
const F_PX = 7, F_PY = 5       // padding per window cell

// Side face: 2 cols × 10 rows (visible in perspective)
const S_COLS = 2, S_ROWS = 10
const S_COL_W = RX / S_COLS    // 39
const S_ROW_H = FH / S_ROWS    // 54 (same height as front)

// Crown windows: 5 cols × 2 rows
const C_COLS = 5, C_ROWS = 2
const C_COL_W = (CR - CL) / C_COLS
const C_ROW_H = 55 / C_ROWS    // 27.5

export default function PremiumBuildingSVG() {
  return (
    <>
      <style>{`
        @keyframes scanUp {
          0%   { transform: translateY(${FB}px); opacity: 0; }
          5%   { opacity: 0.55; }
          90%  { opacity: 0.55; }
          100% { transform: translateY(${FT - 60}px); opacity: 0; }
        }
        @keyframes packetUp {
          0%   { transform: translateY(0);         opacity: 0; }
          5%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-${FH + 60}px); opacity: 0; }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.55; }
          50%     { opacity: 0.85; }
        }
        @keyframes beaconBlink {
          0%,48%,52%,100% { opacity: 1; }
          50%             { opacity: 0.2; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-8px); }
        }
        .building-group { animation: floatY 7s ease-in-out infinite; }
        .edge-glow      { animation: glowPulse 3s ease-in-out infinite; }
        .beacon         { animation: beaconBlink 2.5s ease-in-out infinite; }
        .scan-line      { animation: scanUp 6s linear infinite; }
        .pkt-left-1     { animation: packetUp 4.0s linear 0.0s infinite; }
        .pkt-left-2     { animation: packetUp 4.0s linear 1.3s infinite; }
        .pkt-left-3     { animation: packetUp 4.0s linear 2.7s infinite; }
        .pkt-right-1    { animation: packetUp 4.5s linear 0.6s infinite; }
        .pkt-right-2    { animation: packetUp 4.5s linear 2.1s infinite; }
        .pkt-right-3    { animation: packetUp 4.5s linear 3.4s infinite; }
        .pkt-center-1   { animation: packetUp 5.0s linear 1.0s infinite; }
        .pkt-center-2   { animation: packetUp 5.0s linear 3.5s infinite; }
      `}</style>

      <svg
        viewBox="0 0 600 760"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          {/* Sky gradient */}
          <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#0d2040" stopOpacity="0.9" />
            <stop offset="60%"  stopColor="#040c18" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020810" stopOpacity="1" />
          </radialGradient>

          {/* Front face glass gradient — subtle reflection */}
          <linearGradient id="frontGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#091828" />
            <stop offset="30%"  stopColor="#0d2540" />
            <stop offset="55%"  stopColor="#122e4f" />
            <stop offset="75%"  stopColor="#0c2138" />
            <stop offset="100%" stopColor="#071828" />
          </linearGradient>

          {/* Reflection highlight (bright strip) */}
          <linearGradient id="reflectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1a4a7a" stopOpacity="0" />
            <stop offset="35%"  stopColor="#2a6ab0" stopOpacity="0.10" />
            <stop offset="48%"  stopColor="#4a90d9" stopOpacity="0.18" />
            <stop offset="62%"  stopColor="#2a6ab0" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1a4a7a" stopOpacity="0" />
          </linearGradient>

          {/* Right side face — darker, shadowed */}
          <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#071525" />
            <stop offset="100%" stopColor="#040e1a" />
          </linearGradient>

          {/* Top face */}
          <linearGradient id="topGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#1a3a5c" />
            <stop offset="100%" stopColor="#0a1f35" />
          </linearGradient>

          {/* Crown gradient */}
          <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#8cafc4" />
            <stop offset="50%"  stopColor="#b0c8d8" />
            <stop offset="100%" stopColor="#7a9cb0" />
          </linearGradient>

          {/* Podium gradient */}
          <linearGradient id="podiumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#0c1e30" />
            <stop offset="100%" stopColor="#060e18" />
          </linearGradient>

          {/* Glow filter for edge lines */}
          <filter id="edgeGlow" x="-200%" y="-10%" width="500%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Strong glow for beacon */}
          <filter id="beaconGlow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Scan line gradient */}
          <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#2F80ED" stopOpacity="0" />
            <stop offset="40%"  stopColor="#2F80ED" stopOpacity="0.5" />
            <stop offset="50%"  stopColor="#5ba3f5" stopOpacity="0.7" />
            <stop offset="60%"  stopColor="#2F80ED" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2F80ED" stopOpacity="0" />
          </linearGradient>

          {/* Ground glow */}
          <radialGradient id="groundGlow" cx="50%" cy="0%" r="70%">
            <stop offset="0%"   stopColor="#1a3a70" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0a1830" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Sky background ─────────────────────────────────────── */}
        <rect x="0" y="0" width="600" height="760" fill="url(#skyGrad)" />

        {/* ── Distant city silhouette ────────────────────────────── */}
        <g opacity="0.55">
          {/* Far left buildings */}
          <rect x="-10" y="380" width="65" height="290" fill="#050d18" />
          <rect x="40"  y="340" width="50" height="330" fill="#060f1c" />
          <rect x="70"  y="410" width="45" height="260" fill="#050d18" />
          <rect x="95"  y="300" width="30" height="370" fill="#06101e" />
          {/* Far right buildings */}
          <rect x="430" y="360" width="60" height="310" fill="#050d18" />
          <rect x="480" y="300" width="50" height="370" fill="#06101e" />
          <rect x="520" y="380" width="65" height="290" fill="#050d18" />
          <rect x="555" y="320" width="50" height="350" fill="#060f1c" />
          {/* Distant tiny towers */}
          <rect x="15"  y="420" width="25" height="250" fill="#040c16" />
          <rect x="540" y="410" width="28" height="260" fill="#040c16" />
        </g>

        {/* Faint window lights on bg buildings */}
        <g opacity="0.25" fill="#2a4a8a">
          {[60,120,180,240,300].map(y => (
            <rect key={`bl-${y}`} x="50" y={y} width="10" height="8" />
          ))}
          {[80,150,220,290].map(y => (
            <rect key={`br-${y}`} x="498" y={y} width="10" height="8" />
          ))}
        </g>

        {/* ── Floating building group ─────────────────────────────── */}
        <g className="building-group">

          {/* ── Podium ─────────────────────────────────────────────── */}
          <polygon points={podiumTop}   fill="url(#topGrad)" opacity="0.9" />
          <polygon points={podiumSide}  fill="url(#sideGrad)" opacity="0.95" />
          <polygon points={podiumFront} fill="url(#podiumGrad)" />
          {/* Podium top ledge highlight */}
          <line x1={PL} y1={PT} x2={PR} y2={PT}
            stroke="#2F80ED" strokeWidth="1.5" opacity="0.4" />

          {/* ── Main tower — top face ──────────────────────────────── */}
          <polygon points={topPoints} fill="url(#topGrad)" opacity="0.85" />

          {/* ── Main tower — right side face ──────────────────────── */}
          <polygon points={sidePoints} fill="url(#sideGrad)" />

          {/* Side windows */}
          {Array.from({ length: S_ROWS }, (_, r) =>
            Array.from({ length: S_COLS }, (_, c) => {
              // Side windows are in perspective — we clip to the side polygon
              const wx = FR + c * S_COL_W + 8
              const wy = FT + r * S_ROW_H + F_PY
              // Shift for perspective: as we go right, add RX/S_COLS * c
              const px = wx + (RY / FH) * (wy - FT) * (c / S_COLS)
              return (
                <rect
                  key={`sw-${r}-${c}`}
                  x={wx} y={wy}
                  width={S_COL_W - 12} height={S_ROW_H - F_PY * 2}
                  fill={sideWinColor(r, c)}
                  opacity="0.75"
                />
              )
            })
          )}

          {/* ── Main tower — front face ────────────────────────────── */}
          <rect x={FL} y={FT} width={FW} height={FH} fill="url(#frontGrad)" />

          {/* Floor separator lines */}
          {Array.from({ length: F_ROWS + 1 }, (_, i) => (
            <line
              key={`fl-${i}`}
              x1={FL} y1={FT + i * F_ROW_H}
              x2={FR} y2={FT + i * F_ROW_H}
              stroke="#1a3a5c" strokeWidth={i === 0 || i === F_ROWS ? 2.5 : 1.5}
              opacity="0.6"
            />
          ))}

          {/* Vertical mullion divisions */}
          {Array.from({ length: F_COLS + 1 }, (_, i) => (
            <line
              key={`fm-${i}`}
              x1={FL + i * F_COL_W} y1={FT}
              x2={FL + i * F_COL_W} y2={FB}
              stroke="#1a3a5c" strokeWidth={i === 0 || i === F_COLS ? 2 : 0.8}
              opacity="0.5"
            />
          ))}

          {/* Window panes — the heart of the visual */}
          {Array.from({ length: F_ROWS }, (_, r) =>
            Array.from({ length: F_COLS }, (_, c) => (
              <rect
                key={`fw-${r}-${c}`}
                x={FL + c * F_COL_W + F_PX}
                y={FT + r * F_ROW_H + F_PY}
                width={F_COL_W - F_PX * 2}
                height={F_ROW_H - F_PY * 2}
                fill={winColor(r, c)}
                rx="1"
              />
            ))
          )}

          {/* Glass reflection overlay on front face */}
          <rect x={FL} y={FT} width={FW} height={FH} fill="url(#reflectGrad)" />

          {/* ── Crown section ──────────────────────────────────────── */}
          <polygon points={crownTop}   fill="url(#topGrad)" opacity="0.9" />
          <polygon points={crownSide}  fill="url(#sideGrad)" opacity="0.9" />
          <polygon points={crownFront} fill="url(#crownGrad)" />

          {/* Crown windows */}
          {Array.from({ length: C_ROWS }, (_, r) =>
            Array.from({ length: C_COLS }, (_, c) => (
              <rect
                key={`cw-${r}-${c}`}
                x={CL + c * C_COL_W + 6}
                y={CT + r * C_ROW_H + 4}
                width={C_COL_W - 12}
                height={C_ROW_H - 8}
                fill={winColor(r + 20, c)}
                rx="1"
              />
            ))
          )}

          {/* Crown separator line */}
          <line x1={CL} y1={CT + C_ROWS * C_ROW_H}
            x2={CR} y2={CT + C_ROWS * C_ROW_H}
            stroke="#3a6a9a" strokeWidth="2" opacity="0.7" />

          {/* Crown horizontal ledges */}
          <line x1={CL - 5} y1={CT} x2={CR + 5} y2={CT}
            stroke="#9ab8cc" strokeWidth="2.5" opacity="0.8" />
          <line x1={FL} y1={FT} x2={FR} y2={FT}
            stroke="#9ab8cc" strokeWidth="2" opacity="0.6" />

          {/* ── Spire ─────────────────────────────────────────────── */}
          <line
            x1={(CL + CR) / 2} y1={CT}
            x2={(CL + CR) / 2} y2={CT - 55}
            stroke="#9ab8cc" strokeWidth="2.5" strokeLinecap="round"
          />
          {/* Beacon */}
          <circle
            cx={(CL + CR) / 2} cy={CT - 57}
            r="4.5"
            fill="#4fa8ff"
            filter="url(#beaconGlow)"
            className="beacon"
          />

          {/* ── Edge glow lines — BRIGHT BLUE ─────────────────────── */}
          {/* Left edge */}
          <line x1={FL} y1={CT - 5} x2={FL} y2={FB}
            stroke="#2F80ED" strokeWidth="2.5"
            filter="url(#edgeGlow)" className="edge-glow" />
          {/* Right edge of front face */}
          <line x1={FR} y1={FT - 5} x2={FR} y2={FB}
            stroke="#2F80ED" strokeWidth="2.5"
            filter="url(#edgeGlow)" className="edge-glow" />
          {/* Far right edge (side face) */}
          <line x1={FR + RX} y1={FT + RY} x2={FR + RX} y2={FB + RY}
            stroke="#2F80ED" strokeWidth="2"
            filter="url(#edgeGlow)" className="edge-glow"
            style={{ animationDelay: '0.8s' }} />
          {/* Crown left edge */}
          <line x1={CL} y1={CT - 5} x2={CL} y2={FT}
            stroke="#5ba3f5" strokeWidth="2"
            filter="url(#edgeGlow)" className="edge-glow" />
          {/* Crown right edge */}
          <line x1={CR} y1={CT - 5} x2={CR} y2={FT}
            stroke="#5ba3f5" strokeWidth="2"
            filter="url(#edgeGlow)" className="edge-glow"
            style={{ animationDelay: '0.4s' }} />

          {/* Top crown glow frame */}
          <line x1={CL} y1={CT} x2={CR} y2={CT}
            stroke="#5ba3f5" strokeWidth="1.8"
            filter="url(#edgeGlow)" opacity="0.7" />
          <line x1={FL} y1={FT} x2={FR} y2={FT}
            stroke="#2F80ED" strokeWidth="1.8"
            filter="url(#edgeGlow)" opacity="0.6" />

          {/* ── Scan line (sweeps up building face) ───────────────── */}
          <rect
            x={FL} y={-20} width={FW} height={40}
            fill="url(#scanGrad)"
            className="scan-line"
          />

          {/* ── Data packets on edges ─────────────────────────────── */}
          {/* Left edge packets */}
          {['pkt-left-1','pkt-left-2','pkt-left-3'].map((cls, i) => (
            <g key={cls} className={cls}
              style={{ transformOrigin: `${FL}px ${FB}px` }}>
              <circle cx={FL} cy={FB} r="4.5" fill="#2F80ED"
                filter="url(#edgeGlow)" />
              <circle cx={FL} cy={FB + 12} r="2.5" fill="#2F80ED" opacity="0.45" />
            </g>
          ))}
          {/* Right edge packets */}
          {['pkt-right-1','pkt-right-2','pkt-right-3'].map((cls) => (
            <g key={cls} className={cls}
              style={{ transformOrigin: `${FR}px ${FB}px` }}>
              <circle cx={FR} cy={FB} r="4.5" fill="#5ba3f5"
                filter="url(#edgeGlow)" />
              <circle cx={FR} cy={FB + 12} r="2.5" fill="#5ba3f5" opacity="0.45" />
            </g>
          ))}
          {/* Centre facade packet */}
          {['pkt-center-1','pkt-center-2'].map((cls) => (
            <g key={cls} className={cls}
              style={{ transformOrigin: `${(FL+FR)/2}px ${FB}px` }}>
              <circle cx={(FL+FR)/2} cy={FB} r="3.5" fill="#2F80ED"
                filter="url(#edgeGlow)" />
            </g>
          ))}

        </g>{/* end floating group */}

        {/* ── Ground glow ────────────────────────────────────────── */}
        <ellipse
          cx={FR - FW / 2 + RX / 2}
          cy={FB + RY + 58}
          rx="180" ry="30"
          fill="url(#groundGlow)"
        />

        {/* Ground line */}
        <line x1="0" y1={FB + RY + 60} x2="600" y2={FB + RY + 60}
          stroke="#1a3a5c" strokeWidth="1" opacity="0.3" />

      </svg>
    </>
  )
}
