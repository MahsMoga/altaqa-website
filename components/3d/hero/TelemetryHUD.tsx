/**
 * Enterprise telemetry HUD — matches reference image card style.
 *
 * Cards use glassmorphism with:
 *  - Dark navy base
 *  - Subtle border with left colour accent
 *  - System label + live value + unit
 *  - Inline sparkline SVG chart
 *  - Status indicator dot
 *
 * Positioned to float around the building naturally.
 * Slow gentle float animation — executive, not playful.
 */

// Deterministic sparkline path (same every render — no hydration issues)
function sparklinePath(
  width: number,
  height: number,
  values: number[]
): string {
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width
    const y = height - v * height
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return `M ${pts.join(' L ')}`
}

// Deterministic sparkline data per card
const SPARKLINES = {
  bms:    [0.8, 0.9, 0.85, 0.92, 0.88, 0.95, 0.90, 0.93],
  energy: [0.5, 0.6, 0.55, 0.7, 0.65, 0.72, 0.68, 0.74],
  hvac:   [0.6, 0.55, 0.65, 0.58, 0.62, 0.57, 0.63, 0.60],
  water:  [0.4, 0.5, 0.45, 0.55, 0.48, 0.52, 0.50, 0.53],
}

interface CardProps {
  system:    string
  value:     string
  unit?:     string
  color:     string
  statusDot?: boolean
  spark?:    number[]
  width?:    number
}

function HUDCard({ system, value, unit, color, statusDot, spark, width = 148 }: CardProps) {
  return (
    <div style={{
      background:          'rgba(3, 9, 22, 0.78)',
      backdropFilter:      'blur(14px)',
      WebkitBackdropFilter:'blur(14px)',
      border:              `1px solid ${color}22`,
      borderTop:           `1px solid ${color}40`,
      borderLeft:          `2px solid ${color}`,
      borderRadius:        '8px',
      padding:             '9px 12px 8px',
      width:               `${width}px`,
      boxShadow:           `0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)`,
      fontFamily:          'var(--font-dm-sans), system-ui, sans-serif',
      userSelect:          'none',
    }}>
      {/* System label row */}
      <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'5px' }}>
        {statusDot && (
          <span style={{
            width:'5px', height:'5px', borderRadius:'50%',
            background: color,
            flexShrink: 0,
            animation:  'hud-pulse 2.2s ease-in-out infinite',
          }}/>
        )}
        <span style={{
          color:         `${color}cc`,
          fontSize:      '9px',
          fontWeight:    700,
          textTransform: 'uppercase',
          letterSpacing: '0.13em',
        }}>
          {system}
        </span>
      </div>

      {/* Value row */}
      <div style={{ display:'flex', alignItems:'baseline', gap:'3px', marginBottom: spark ? '6px' : '0' }}>
        <span style={{
          color:      '#ffffff',
          fontSize:   '18px',
          fontWeight: 700,
          fontFamily: 'var(--font-sora), system-ui, sans-serif',
          lineHeight: 1,
        }}>
          {value}
        </span>
        {unit && (
          <span style={{ color:`${color}99`, fontSize:'10px', fontWeight:500 }}>
            {unit}
          </span>
        )}
      </div>

      {/* Sparkline */}
      {spark && (
        <svg width={width - 24} height={22} style={{ display:'block', overflow:'visible' }}>
          {/* Area fill */}
          <path
            d={`${sparklinePath(width - 24, 18, spark)} V 22 H 0 Z`}
            fill={`${color}18`}
          />
          {/* Line */}
          <path
            d={sparklinePath(width - 24, 18, spark)}
            fill="none"
            stroke={color}
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Last point dot */}
          <circle
            cx={((width - 24)).toFixed(1)}
            cy={(22 - (spark[spark.length - 1] * 18)).toFixed(1)}
            r="2.5"
            fill={color}
          />
        </svg>
      )}
    </div>
  )
}

export function TelemetryHUD() {
  return (
    <>
      <style>{`
        @keyframes hud-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(0.8); }
        }
        @keyframes hud-fa { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-7px); } }
        @keyframes hud-fb { 0%,100% { transform:translateY(0); } 50% { transform:translateY( 6px); } }
        @keyframes hud-fc { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
        @keyframes hud-fd { 0%,100% { transform:translateY(0); } 50% { transform:translateY( 5px); } }
      `}</style>

      {/* ── BMS Status — top-left ─────────────────────────── */}
      <div style={{ position:'absolute', top:'16%', left:'3%',
                    animation:'hud-fa 5.5s ease-in-out infinite', opacity:0.96 }}>
        <HUDCard
          system="BMS Status"
          value="Online"
          color="#10b981"
          statusDot
          spark={SPARKLINES.bms}
          width={154}
        />
      </div>

      {/* ── Energy Load — top-right ───────────────────────── */}
      <div style={{ position:'absolute', top:'20%', right:'3%',
                    animation:'hud-fb 6.5s ease-in-out 0.8s infinite', opacity:0.94 }}>
        <HUDCard
          system="Energy Load"
          value="94.2"
          unit="kW"
          color="#2F80ED"
          spark={SPARKLINES.energy}
          width={152}
        />
      </div>

      {/* ── HVAC Temp — mid-left ─────────────────────────── */}
      <div style={{ position:'absolute', top:'48%', left:'3%',
                    animation:'hud-fc 7s ease-in-out 1.8s infinite', opacity:0.90 }}>
        <HUDCard
          system="HVAC Temp"
          value="22.4"
          unit="°C"
          color="#14b8a6"
          statusDot
          spark={SPARKLINES.hvac}
          width={148}
        />
      </div>

      {/* ── Water Flow — mid-right ────────────────────────── */}
      <div style={{ position:'absolute', top:'52%', right:'3%',
                    animation:'hud-fd 6s ease-in-out 1.2s infinite', opacity:0.88 }}>
        <HUDCard
          system="Water Flow"
          value="2.4"
          unit="m³/h"
          color="#38bdf8"
          spark={SPARKLINES.water}
          width={144}
        />
      </div>

      {/* ── Monitoring — lower-left ───────────────────────── */}
      <div style={{ position:'absolute', bottom:'22%', left:'5%',
                    animation:'hud-fa 5s ease-in-out 0.5s infinite', opacity:0.84 }}>
        <HUDCard
          system="Monitoring"
          value="24/7"
          color="#2F80ED"
          statusDot
          width={130}
        />
      </div>

      {/* ── Subtle SVG connector lines ────────────────────── */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                    pointerEvents:'none', overflow:'visible' }} aria-hidden="true">
        <line x1="18%" y1="21%" x2="35%" y2="40%"
              stroke="#2F80ED" strokeWidth="0.7" strokeOpacity="0.20" strokeDasharray="5 7"/>
        <line x1="82%" y1="25%" x2="65%" y2="40%"
              stroke="#2F80ED" strokeWidth="0.7" strokeOpacity="0.18" strokeDasharray="5 7"/>
        <line x1="18%" y1="53%" x2="34%" y2="52%"
              stroke="#14b8a6" strokeWidth="0.7" strokeOpacity="0.16" strokeDasharray="5 7"/>
        <line x1="82%" y1="57%" x2="66%" y2="55%"
              stroke="#38bdf8" strokeWidth="0.7" strokeOpacity="0.15" strokeDasharray="5 7"/>
      </svg>
    </>
  )
}
