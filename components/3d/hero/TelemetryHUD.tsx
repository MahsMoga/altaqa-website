/**
 * Telemetry HUD overlay — pure CSS positioned over the 3D canvas.
 * Renders enterprise data labels anchored to approximate building positions.
 * Uses CSS animations only (no WebGL cost).
 */

interface LabelProps {
  label: string
  value: string
  color?: string
  blink?: boolean
}

function TelemetryLabel({ label, value, color = '#2F80ED', blink = false }: LabelProps) {
  return (
    <div
      style={{
        background: 'rgba(7, 21, 41, 0.82)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${color}40`,
        borderLeft: `2px solid ${color}`,
        borderRadius: '6px',
        padding: '6px 10px',
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
        userSelect: 'none',
        minWidth: '90px',
      }}
    >
      <div style={{
        color: `${color}cc`,
        fontSize: '8px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        marginBottom: '3px',
      }}>
        {label}
      </div>
      <div style={{
        color: '#ffffff',
        fontSize: '13px',
        fontWeight: 700,
        fontFamily: 'var(--font-sora), system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}>
        {value}
        {blink && (
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: color,
            animation: 'telemetry-blink 1.5s ease-in-out infinite',
          }} />
        )}
      </div>
    </div>
  )
}

export function TelemetryHUD() {
  return (
    <>
      <style>{`
        @keyframes telemetry-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes telemetry-float-a {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes telemetry-float-b {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(4px); }
        }
        .hud-label-a { animation: telemetry-float-a 4s ease-in-out infinite; }
        .hud-label-b { animation: telemetry-float-b 5s ease-in-out 1s infinite; }
        .hud-label-c { animation: telemetry-float-a 6s ease-in-out 2s infinite; }
        .hud-label-d { animation: telemetry-float-b 4.5s ease-in-out 0.5s infinite; }
      `}</style>

      {/* Top-left: BMS Status */}
      <div
        className="hud-label-a"
        style={{ position: 'absolute', top: '22%', left: '4%', opacity: 0.92 }}
      >
        <TelemetryLabel label="BMS Status" value="Online" color="#10b981" blink />
      </div>

      {/* Top-right: Energy load */}
      <div
        className="hud-label-b"
        style={{ position: 'absolute', top: '28%', right: '4%', opacity: 0.9 }}
      >
        <TelemetryLabel label="Energy Load" value="94.2 kW" color="#2F80ED" />
      </div>

      {/* Mid-left: HVAC */}
      <div
        className="hud-label-c"
        style={{ position: 'absolute', top: '52%', left: '4%', opacity: 0.85 }}
      >
        <TelemetryLabel label="HVAC Temp" value="22.4°C" color="#f59e0b" />
      </div>

      {/* Mid-right: Monitoring */}
      <div
        className="hud-label-d"
        style={{ position: 'absolute', top: '58%', right: '4%', opacity: 0.85 }}
      >
        <TelemetryLabel label="Monitoring" value="24 / 7" color="#2F80ED" blink />
      </div>

      {/* Bottom-left: Water flow */}
      <div
        className="hud-label-a"
        style={{ position: 'absolute', bottom: '22%', left: '6%', opacity: 0.8 }}
      >
        <TelemetryLabel label="Water Flow" value="2.4 m³/h" color="#38bdf8" />
      </div>

      {/* Connector dots — decorative lines from labels to building */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <line x1="22%" y1="26%" x2="40%" y2="45%" stroke="#2F80ED" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 4" />
        <line x1="78%" y1="33%" x2="60%" y2="45%" stroke="#2F80ED" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 4" />
        <line x1="22%" y1="56%" x2="40%" y2="55%" stroke="#2F80ED" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 4" />
        <line x1="78%" y1="62%" x2="60%" y2="58%" stroke="#2F80ED" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3 4" />
      </svg>
    </>
  )
}
