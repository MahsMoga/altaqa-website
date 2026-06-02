/**
 * Enterprise telemetry HUD — pure CSS positioned over the 3D canvas.
 *
 * Labels are anchored to approximate building positions.
 * Each label represents a real monitored system — purposeful, not decorative.
 * Animation is calm and executive: slow float only, no flashing.
 */

interface LabelProps {
  system:  string
  value:   string
  unit?:   string
  status?: 'online' | 'active' | 'monitoring'
  color?:  string
}

function DataCard({ system, value, unit, status, color = '#2F80ED' }: LabelProps) {
  const statusColor = status === 'online' ? '#10b981' : color

  return (
    <div
      style={{
        background:     'rgba(4, 12, 28, 0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border:         `1px solid ${color}28`,
        borderLeft:     `2px solid ${color}`,
        borderRadius:   '7px',
        padding:        '7px 12px',
        fontFamily:     'var(--font-dm-sans), system-ui, sans-serif',
        userSelect:     'none',
        minWidth:       '98px',
        boxShadow:      `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
    >
      {/* System label */}
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '5px',
        marginBottom:  '4px',
      }}>
        {status && (
          <span style={{
            width:        '5px',
            height:       '5px',
            borderRadius: '50%',
            background:   statusColor,
            flexShrink:   0,
            animation:    status === 'online' ? 'hud-blink 2.5s ease-in-out infinite' : 'none',
          }} />
        )}
        <span style={{
          color:          `${color}bb`,
          fontSize:       '8px',
          fontWeight:     700,
          textTransform:  'uppercase',
          letterSpacing:  '0.11em',
        }}>
          {system}
        </span>
      </div>

      {/* Value */}
      <div style={{
        display:    'flex',
        alignItems: 'baseline',
        gap:        '3px',
      }}>
        <span style={{
          color:      '#ffffff',
          fontSize:   '15px',
          fontWeight: 700,
          fontFamily: 'var(--font-sora), system-ui, sans-serif',
          lineHeight:  1,
        }}>
          {value}
        </span>
        {unit && (
          <span style={{ color: `${color}99`, fontSize: '10px', fontWeight: 500 }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

export function TelemetryHUD() {
  return (
    <>
      <style>{`
        @keyframes hud-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes hud-float-a {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes hud-float-b {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
        @keyframes hud-float-c {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>

      {/* Top-left: BMS status */}
      <div style={{
        position:  'absolute',
        top:       '18%',
        left:      '4%',
        animation: 'hud-float-a 5s ease-in-out infinite',
        opacity:   0.95,
      }}>
        <DataCard
          system="BMS"
          value="Active"
          status="online"
          color="#10b981"
        />
      </div>

      {/* Top-right: Energy */}
      <div style={{
        position:  'absolute',
        top:       '24%',
        right:     '4%',
        animation: 'hud-float-b 6s ease-in-out 0.8s infinite',
        opacity:   0.92,
      }}>
        <DataCard
          system="Energy Load"
          value="94.2"
          unit="kW"
          color="#2F80ED"
        />
      </div>

      {/* Mid-left: HVAC */}
      <div style={{
        position:  'absolute',
        top:       '50%',
        left:      '4%',
        animation: 'hud-float-a 7s ease-in-out 2s infinite',
        opacity:   0.88,
      }}>
        <DataCard
          system="HVAC"
          value="22.4"
          unit="°C"
          status="active"
          color="#14b8a6"
        />
      </div>

      {/* Mid-right: Water */}
      <div style={{
        position:  'absolute',
        top:       '55%',
        right:     '4%',
        animation: 'hud-float-c 5.5s ease-in-out 1.2s infinite',
        opacity:   0.88,
      }}>
        <DataCard
          system="Water Flow"
          value="2.4"
          unit="m³/h"
          color="#38bdf8"
        />
      </div>

      {/* Lower-left: Monitoring */}
      <div style={{
        position:  'absolute',
        bottom:    '24%',
        left:      '6%',
        animation: 'hud-float-b 6.5s ease-in-out 0.4s infinite',
        opacity:   0.82,
      }}>
        <DataCard
          system="Monitoring"
          value="24/7"
          status="online"
          color="#2F80ED"
        />
      </div>

      {/* Subtle connector lines from cards toward building centre */}
      <svg
        style={{
          position:     'absolute',
          inset:        0,
          width:        '100%',
          height:       '100%',
          pointerEvents:'none',
          overflow:     'visible',
        }}
        aria-hidden="true"
      >
        <line x1="20%" y1="22%" x2="38%" y2="42%" stroke="#2F80ED" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="4 6"/>
        <line x1="80%" y1="29%" x2="62%" y2="42%" stroke="#2F80ED" strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="4 6"/>
        <line x1="20%" y1="54%" x2="38%" y2="54%" stroke="#14b8a6" strokeWidth="0.6" strokeOpacity="0.15" strokeDasharray="4 6"/>
        <line x1="80%" y1="59%" x2="62%" y2="56%" stroke="#38bdf8" strokeWidth="0.6" strokeOpacity="0.15" strokeDasharray="4 6"/>
      </svg>
    </>
  )
}
