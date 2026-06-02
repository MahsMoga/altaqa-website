/**
 * SmartBuildingScene — replaces Three.js Canvas with the SVG building.
 *
 * Using the SVG approach because:
 *  - Three.js procedural geometry looked cartoonish
 *  - GLB loading requires an external file the project doesn't have
 *  - SVG: works immediately, looks premium, no dependencies, fast load
 *
 * Architecture is preserved — this wrapper is still called by Hero3DFull.tsx,
 * the feature flag / rollback system still works.
 */

import PremiumBuildingSVG from './PremiumBuildingSVG'
import { TelemetryHUD }   from './TelemetryHUD'

export function SmartBuildingScene() {
  return (
    <div
      style={{
        position:            'absolute',
        top:                 0,
        right:               0,
        width:               '58%',
        height:              '100%',
        pointerEvents:       'none',
        // Fade left edge so SVG blends into hero text area
        maskImage:           'linear-gradient(to right, transparent 0%, black 14%, black 100%)',
        WebkitMaskImage:     'linear-gradient(to right, transparent 0%, black 14%, black 100%)',
        overflow:            'hidden',
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* CSS telemetry HUD cards */}
      <TelemetryHUD />

      {/* Premium SVG building illustration */}
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
        <PremiumBuildingSVG />
      </div>
    </div>
  )
}
