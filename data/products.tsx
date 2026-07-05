import { ReactNode } from 'react'

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductDownload {
  label: string
  type: 'Datasheet' | 'Certificate' | 'Manual'
  /** Path inside /public — when set, clicking the card triggers a real download */
  file?: string
}

export interface ProductVariant {
  name: string
  image?: string
  overview: string
  specs: ProductSpec[]
  downloads: ProductDownload[]
}

export interface Product {
  slug: string
  name: string
  /** One-line description shown on the homepage card */
  tagline: string
  /** Short overview shown in the detail page hero */
  overview: string
  metaTitle: string
  metaDescription: string
  /** Path to product image inside /public — e.g. /images/products/btu-meters.jpg */
  image?: string
  /** Tailwind classes — mirrors the colour system used in components/Services.tsx */
  strip: string
  color: string
  iconBg: string
  icon: ReactNode
  features: { title: string; desc: string }[]
  specs: ProductSpec[]
  applications: string[]
  protocols: string[]
  downloads: ProductDownload[]
  variants?: ProductVariant[]
}

export const products: Product[] = [
  {
    slug: 'btu-meters',
    name: 'BTU Meters',
    tagline: 'Static ultrasonic heat and cold meter with integrated M-Bus interface.',
    overview:
      'The QUNDIS Q heat 5.5 US is a static ultrasonic heat and cold meter with an all-metal flow sensor, integrated M-Bus interface, and two pulse inputs — designed for central heating and cooling circuits in commercial and district energy applications.',
    metaTitle: 'BTU Meters — QUNDIS Q heat 5.5 US | Al Taqa Technical',
    metaDescription:
      'QUNDIS Q heat 5.5 US static ultrasonic BTU meter with M-Bus interface, Pt1000 temperature sensors, and accuracy class 2/3. Ideal for district cooling, sub-metering, and energy billing in Abu Dhabi and the UAE.',
    image: '/images/products/btu-meters.jpg',
    strip: 'bg-blue-500',
    color: 'bg-blue-50/80 border-blue-100',
    iconBg: 'bg-blue-100',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="13" y="5" width="6" height="16" rx="3" stroke="#2F80ED" strokeWidth="1.5"/>
        <circle cx="16" cy="24" r="4" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M16 21v-9" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    features: [
      { title: 'Contamination-Resistant Ultrasonic Measurement', desc: 'All-metal flow sensor with static ultrasonic technology — no moving parts, high dynamic range, detects even the smallest flow rates reliably.' },
      { title: 'Integrated M-Bus & Dual Pulse Inputs', desc: 'Built-in M-Bus interface plus two pulse inputs for seamless integration into Q M-Bus systems; supports up to 96 readouts per day (every 15 minutes).' },
      { title: 'Flexible Installation', desc: 'Any installation position including overhead; no inflow or outflow zones required; switchable return/supply flow without exchanging temperature sensors.' },
      { title: 'Compact & Detachable Calculator Unit', desc: 'Detachable calculator unit suits tight and difficult-to-access installation situations; user-friendly parameter setting via IR interface, Q app, Q tool, or device buttons.' },
    ],
    specs: [
      { label: 'Meter Type', value: 'Static ultrasonic heat and cold meter' },
      { label: 'Model', value: 'QUNDIS Q heat 5.5 US M-Bus / Impuls-IN' },
      { label: 'Measuring Accuracy Class', value: 'Class 2 or Class 3 (depending on flow sensor nominal diameter)' },
      { label: 'Nominal Flow Rate (Qp)', value: '0.6 / 1.5 / 2.5 / 3.5 / 6.0 / 10.0 m³/h' },
      { label: 'Nominal Diameter (DN)', value: 'DN15 / DN20 / DN25 / DN40' },
      { label: 'Temperature Range', value: '5°C – 90°C (flow sensor); 0°C – 105°C (calculator unit)' },
      { label: 'Temperature Difference Range', value: '3 K – 70 K; start of metering at 0.2 K' },
      { label: 'Temperature Sensor', value: 'Pt1000 per EN 60751, Type DS' },
      { label: 'Max. Operating Pressure', value: '16 bar (PN16)' },
      { label: 'Communication', value: 'M-Bus (300 / 2400 baud) + 2 pulse inputs (Class IB, EN 1434-2)' },
      { label: 'Power Supply', value: 'Lithium battery CR17450E-R, 3.0 V — 7 years (optional 10 years)' },
      { label: 'Display', value: '8-digit LCD with pictograms; kWh / MWh / MJ / GJ selectable' },
      { label: 'Protection Rating', value: 'IP65 (calculator unit & flow sensor, EN 60529)' },
      { label: 'Standards & Compliance', value: 'MID 2014/32/EU, RoHS 2011/65/EU, EMC 2014/30/EU; EN 301 489-1/-3' },
      { label: 'Cable Length (calculator – flow sensor)', value: '80 cm standard' },
    ],
    applications: ['District Cooling', 'Commercial Buildings', 'Utilities', 'Industrial Facilities'],
    protocols: ['M-Bus'],
    downloads: [
      { label: 'QUNDIS Q heat 5.5 US Datasheet', type: 'Datasheet', file: '/downloads/btu-meters/QUNDIS_datasheet_Q_heat_5.5_US_M-Bus_08-2025.pdf' },
      { label: 'EU Declaration of Conformity (MID / RoHS / EMC)', type: 'Certificate' },
      { label: 'Installation & User Manual', type: 'Manual' },
    ],
    variants: [
      {
        name: 'QUNDIS Q heat 5.5 US — Integrated BTU Meter',
        image: '/images/products/btu-meters.jpg',
        overview:
          'The QUNDIS Q heat 5.5 US is a static ultrasonic heat and cold meter with an all-metal flow sensor and integrated M-Bus interface. Designed for central heating and cooling circuits in commercial and district energy applications, it combines flow sensing and calculator in one compact unit.',
        specs: [
          { label: 'Meter Type', value: 'Static ultrasonic heat and cold meter' },
          { label: 'Model', value: 'QUNDIS Q heat 5.5 US M-Bus / Impuls-IN' },
          { label: 'Measuring Accuracy', value: 'Class 2 or Class 3 (per nominal diameter)' },
          { label: 'Nominal Flow Rate (Qp)', value: '0.6 / 1.5 / 2.5 / 3.5 / 6.0 / 10.0 m³/h' },
          { label: 'Nominal Diameter (DN)', value: 'DN15 / DN20 / DN25 / DN40' },
          { label: 'Temperature Range', value: '5°C – 90°C (flow); 0°C – 105°C (calculator)' },
          { label: 'Temperature Difference', value: '3 K – 70 K; starts at 0.2 K' },
          { label: 'Temperature Sensor', value: 'Pt1000 per EN 60751, Type DS' },
          { label: 'Max. Operating Pressure', value: '16 bar (PN16)' },
          { label: 'Communication', value: 'M-Bus (300 / 2400 baud) + 2 pulse inputs' },
          { label: 'Battery Life', value: '7 years standard (optional 10 years)' },
          { label: 'Display', value: '8-digit LCD; kWh / MWh / MJ / GJ selectable' },
          { label: 'Protection Rating', value: 'IP65 (EN 60529)' },
          { label: 'Standards', value: 'MID 2014/32/EU, RoHS 2011/65/EU, EMC 2014/30/EU' },
          { label: 'Cable Length', value: '80 cm (calculator to flow sensor)' },
        ],
        downloads: [
          { label: 'Q heat 5.5 US Datasheet', type: 'Datasheet', file: '/downloads/btu-meters/QUNDIS_datasheet_Q_heat_5.5_US_M-Bus_08-2025.pdf' },
          { label: 'EU Declaration of Conformity', type: 'Certificate' },
          { label: 'Installation & User Manual', type: 'Manual' },
        ],
      },
      {
        name: 'QUNDIS Q heat Split — Series 473 Ultrasonic Flow Sensor',
        image: '/images/products/btu-meters-split.jpg',
        overview:
          'The QUNDIS Series 473 is a MID-compliant ultrasonic flow sensor in all-metal brass design, covering nominal flow rates from 0.6 to 100 m³/h. It operates as the flow-sensing component of a split heat meter system, paired with a separate QUNDIS R20/R21 calculator unit. Its high dynamic range (up to 1:250), any-position installation, and wide temperature capability (up to 150 °C) make it ideal for large commercial, district heating, and industrial energy metering installations.',
        specs: [
          { label: 'Model', value: 'QUNDIS Series 473 Ultrasonic Volume Measuring Part' },
          { label: 'Approval', value: 'MID (DE-07-MI004-PTB022), EN 1434 Class 2' },
          { label: 'Nominal Flow Rate (Qp)', value: '0.6 – 100 m³/h' },
          { label: 'Nominal Diameter (DN)', value: 'DN15 / DN20 / DN25 / DN32 / DN40 / DN50 / DN65 / DN80 / DN100' },
          { label: 'Dynamic Range', value: 'Up to 1:250' },
          { label: 'Temperature Range (Heat)', value: '5°C – 130°C (DN15–DN25); up to 150°C (DN32 and above)' },
          { label: 'Temperature Range (Cold)', value: '5°C – 50°C' },
          { label: 'Ambient Temperature', value: '5°C – 55°C' },
          { label: 'Max. Operating Pressure', value: '16 bar (thread); 25 bar (flange)' },
          { label: 'Flow Sensor Body Material', value: 'Brass' },
          { label: 'Power Supply', value: 'External 3.0 V – 5.5 V DC (via calculator unit)' },
          { label: 'Output', value: 'Open Collector pulse output (high-resolution test pulse or communication)' },
          { label: 'Pulse Cable Length', value: '2.4 m' },
          { label: 'Installation Position', value: 'Any (including overhead)' },
          { label: 'Protection Rating', value: 'IP54' },
          { label: 'Standards', value: 'EN 1434, MID 2014/32/EU, AGFW 510, VDI 2035; EN 301 489-1/-3' },
          { label: 'Compatible Calculator Units', value: 'QUNDIS R20 / R21 (walk-by or AMR via radio add-on module)' },
        ],
        downloads: [
          { label: 'Q heat Split Series 473 Datasheet', type: 'Datasheet', file: '/downloads/btu-meters/QUNDIS_data_sheet_Q_heat_split_EN.pdf' },
          { label: 'MID Declaration of Conformity', type: 'Certificate' },
          { label: 'Installation Manual', type: 'Manual' },
        ],
      },
    ],
  },
  {
    slug: 'smart-water-meters',
    name: 'Smart Water Meters',
    tagline: 'Advanced water monitoring and consumption tracking.',
    overview:
      'Intelligent water meters that deliver real-time consumption data, enabling accurate tenant billing, leak detection, and conservation programmes across residential, commercial, and utility-scale deployments.',
    metaTitle: 'Smart Water Meters | Real-Time Consumption Monitoring | Al Taqa Technical',
    metaDescription:
      'Smart water meters with real-time monitoring, remote reading, and leak alerts — built for accurate tenant billing and water conservation across commercial and utility applications in the UAE.',
    image: '/images/products/smart-water-meters.jpg',
    strip: 'bg-cyan-500',
    color: 'bg-cyan-50/80 border-cyan-100',
    iconBg: 'bg-cyan-100',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 5c4 5.5 7 9.6 7 13a7 7 0 11-14 0c0-3.4 3-7.5 7-13z" stroke="#2F80ED" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12.5 19.5a3.5 3.5 0 003.5 3.5" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    features: [
      { title: 'Remote Meter Reading', desc: 'Wireless data collection eliminates manual readings and reduces operational overhead.' },
      { title: 'Real-Time Leak Alerts', desc: 'Continuous monitoring flags abnormal consumption patterns and potential leaks instantly.' },
      { title: 'High Measurement Accuracy', desc: 'Volumetric or ultrasonic measurement technology ensures dependable billing data.' },
      { title: 'Tamper & Reverse-Flow Detection', desc: 'Built-in diagnostics safeguard revenue and data integrity.' },
    ],
    specs: [
      { label: 'Measurement Technology', value: 'Ultrasonic / Volumetric (multi-jet)' },
      { label: 'Accuracy Class', value: 'Class 2 (ISO 4064)' },
      { label: 'Nominal Diameter (DN)', value: 'DN15 – DN50' },
      { label: 'Flow Range (Q3/Q1)', value: 'Ratio R≥160' },
      { label: 'Power Supply', value: 'Integrated battery (up to 10 years)' },
      { label: 'Communication', value: 'M-Bus / LoRaWAN / Modbus RTU' },
      { label: 'Display', value: 'LCD with consumption & alarm indicators' },
      { label: 'Protection Rating', value: 'IP68 (submersible)' },
    ],
    applications: ['Commercial Buildings', 'Hospitality', 'Utilities', 'Industrial Facilities'],
    protocols: ['M-Bus', 'LoRaWAN', 'Modbus RTU'],
    downloads: [
      { label: 'Electrosonic 3Q Datasheet', type: 'Datasheet', file: '/downloads/smart-water-meters/schedatecnica-electosonic-en-v1.pdf' },
      { label: 'E-bulk 3Q Datasheet', type: 'Datasheet', file: '/downloads/smart-water-meters/schedatecnica-e-bulk-en-v14.pdf' },
      { label: 'ISO 4064 Compliance Certificate', type: 'Certificate' },
      { label: 'Installation & User Manual', type: 'Manual' },
    ],
    variants: [
      {
        name: 'Electrosonic 3Q — Ultrasonic Smart Water Meter',
        image: '/images/products/smart-water-meters.jpg',
        overview:
          'The Electrosonic 3Q is a static ultrasonic water meter designed for accurate cold and hot water measurement in residential and commercial applications. With no moving parts, it offers long-term reliability, tamper detection, and integrated communication for remote reading.',
        specs: [
          { label: 'Technology', value: 'Static ultrasonic (no moving parts)' },
          { label: 'Accuracy Class', value: 'Class 2 (ISO 4064 / MID)' },
          { label: 'Nominal Diameter', value: 'DN15 / DN20 / DN25' },
          { label: 'Flow Range (Q3/Q1)', value: 'R≥160' },
          { label: 'Operating Temperature', value: 'Cold: 0.1°C – 30°C; Hot: up to 90°C' },
          { label: 'Max. Operating Pressure', value: '16 bar (PN16)' },
          { label: 'Communication', value: 'M-Bus / LoRaWAN (optional)' },
          { label: 'Battery Life', value: 'Up to 12 years' },
          { label: 'Display', value: 'LCD with flow rate, consumption & alarm indicators' },
          { label: 'Protection Rating', value: 'IP68 (submersible)' },
          { label: 'Standards', value: 'ISO 4064, MID 2014/32/EU, WRAS (optional)' },
          { label: 'Installation', value: 'Horizontal or vertical; any orientation' },
        ],
        downloads: [
          { label: 'Electrosonic 3Q Datasheet', type: 'Datasheet', file: '/downloads/smart-water-meters/schedatecnica-electosonic-en-v1.pdf' },
          { label: 'ISO 4064 / MID Certificate', type: 'Certificate' },
          { label: 'Installation Manual', type: 'Manual' },
        ],
      },
      {
        name: 'E-bulk 3Q — Volumetric Bulk Water Meter',
        image: '/images/products/smart-water-meters-ebulk.jpg',
        overview:
          'The E-bulk 3Q is a multi-jet volumetric water meter built for bulk metering in commercial, industrial, and district water networks. Its robust mechanical design delivers Class 2 accuracy across a wide flow range with optional pulse or M-Bus output for AMR/AMI integration.',
        specs: [
          { label: 'Technology', value: 'Volumetric multi-jet (wet-type register)' },
          { label: 'Accuracy Class', value: 'Class 2 (ISO 4064 / MID)' },
          { label: 'Nominal Diameter', value: 'DN15 / DN20 / DN25 / DN32 / DN40 / DN50' },
          { label: 'Flow Range (Q3/Q1)', value: 'R≥80' },
          { label: 'Operating Temperature', value: 'Cold water: 0.1°C – 30°C' },
          { label: 'Max. Operating Pressure', value: '16 bar (PN16)' },
          { label: 'Communication', value: 'Pulse output (reed switch); M-Bus optional' },
          { label: 'Display', value: 'Roller-drum mechanical register (odometer style)' },
          { label: 'Protection Rating', value: 'IP68 (submersible)' },
          { label: 'Standards', value: 'ISO 4064, MID 2014/32/EU' },
          { label: 'Installation', value: 'Horizontal (preferred); vertical supported' },
          { label: 'Body Material', value: 'Polymer composite / brass (DN40–DN50)' },
        ],
        downloads: [
          { label: 'E-bulk 3Q Datasheet', type: 'Datasheet', file: '/downloads/smart-water-meters/schedatecnica-e-bulk-en-v14.pdf' },
          { label: 'ISO 4064 / MID Certificate', type: 'Certificate' },
          { label: 'Installation Manual', type: 'Manual' },
        ],
      },
    ],
  },
  {
    slug: 'smart-shutoff-valves',
    name: 'Smart Shutoff Valves',
    tagline: 'Intelligent water control and leak prevention systems.',
    overview:
      'Automated shutoff valves that pair with metering and leak-detection systems to isolate supply instantly when an anomaly is detected — protecting assets, reducing water loss, and minimising emergency response times.',
    metaTitle: 'Smart Shutoff Valves | Automated Leak Prevention | Al Taqa Technical',
    metaDescription:
      'Intelligent, remotely-controlled shutoff valves that isolate water supply automatically on leak detection — reducing damage, water loss, and emergency response times for commercial and residential properties.',
    image: '/images/products/smart-shutoff-valve-dn40.jpg',
    strip: 'bg-indigo-500',
    color: 'bg-indigo-50/80 border-indigo-100',
    iconBg: 'bg-indigo-100',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="9" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M16 11v5l3.5 3.5" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 16H2M30 16h-3M16 5V2M16 30v-3" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    features: [
      { title: 'Automatic Leak Response', desc: 'Instantly shuts off supply when paired sensors detect abnormal flow or moisture.' },
      { title: 'Remote Open / Close Control', desc: 'Operate valves on demand from a central management platform or mobile app.' },
      { title: 'Fail-Safe Operation', desc: 'Defaults to a safe position during power loss or communication failure.' },
      { title: 'Seamless System Integration', desc: 'Works alongside existing meters, BMS, and leak-detection sensors.' },
    ],
    specs: [
      { label: 'Valve Type', value: 'Motorised ball valve' },
      { label: 'Nominal Diameter (DN)', value: 'DN15 – DN100' },
      { label: 'Actuation Time', value: '< 5 seconds (full stroke)' },
      { label: 'Power Supply', value: '12–24V DC / Battery-backed' },
      { label: 'Communication', value: 'Modbus RTU / LoRaWAN / Wired contact' },
      { label: 'Operating Pressure', value: 'Up to 16 bar (PN16)' },
      { label: 'Body Material', value: 'Brass / Stainless steel' },
      { label: 'Protection Rating', value: 'IP65' },
    ],
    applications: ['Commercial Buildings', 'Hospitality', 'Industrial Facilities', 'Utilities'],
    protocols: ['Modbus RTU', 'LoRaWAN'],
    downloads: [
      { label: 'Wired M-Bus Shutoff Valve up to DN40 Datasheet', type: 'Datasheet', file: '/downloads/smart-shutoff-valves/Basiox Controls  Wired M-Bus Shutoff Valve upto DN 40 with flow rates.pdf' },
      { label: 'Wired M-Bus Shutoff Valve DN50 & Above Datasheet', type: 'Datasheet', file: '/downloads/smart-shutoff-valves/Basiox Controls  Wired M-Bus Shutoff Valve DN50 and above..pdf' },
      { label: 'LoRaWAN Shutoff Valve 230V Datasheet', type: 'Datasheet', file: '/downloads/smart-shutoff-valves/Basiox Controls  Wired M-Bus, LoRaWAN Shutoff Valve -230v, 50hz..pdf' },
      { label: 'Installation & Wiring Manual', type: 'Manual' },
    ],
    variants: [
      {
        name: 'Wired M-Bus Shutoff Valve — DN15 to DN40',
        image: '/images/products/smart-shutoff-valve-dn40.jpg',
        overview:
          'Motorised ball valve with integrated M-Bus communication for remote open/close control and status monitoring. Designed for residential and light-commercial applications up to DN40. Pairs with M-Bus gateways and head-end software for automated leak response and tenant billing. DN100 size available on request.',
        specs: [
          { label: 'Valve Type', value: 'Motorised ball valve' },
          { label: 'Nominal Diameter', value: 'DN15 / DN20 / DN25 / DN32 / DN40 (DN100 on request)' },
          { label: 'Communication', value: 'Wired M-Bus (EN 13757)' },
          { label: 'Actuation', value: 'Electric motor, full stroke < 5 seconds' },
          { label: 'Power Supply', value: '24V DC (via M-Bus bus power)' },
          { label: 'Operating Pressure', value: 'Up to 16 bar (PN16)' },
          { label: 'Body Material', value: 'Brass' },
          { label: 'Protection Rating', value: 'IP65' },
          { label: 'Fail-Safe Position', value: 'Holds last position on power loss' },
          { label: 'Mounting', value: 'Inline; horizontal or vertical' },
        ],
        downloads: [
          { label: 'Wired M-Bus Valve up to DN40 Datasheet', type: 'Datasheet', file: '/downloads/smart-shutoff-valves/Basiox Controls  Wired M-Bus Shutoff Valve upto DN 40 with flow rates.pdf' },
          { label: 'Installation & Wiring Manual', type: 'Manual' },
        ],
      },
      {
        name: 'Wired M-Bus Shutoff Valve — DN50 and Above',
        image: '/images/products/smart-shutoff-valve-dn50.jpg',
        overview:
          'Heavy-duty motorised ball valve with M-Bus interface for large-diameter pipework from DN50 upward. Built for commercial, industrial, and district cooling applications where high flow rates and robust construction are required. DN100 size available — price on request.',
        specs: [
          { label: 'Valve Type', value: 'Motorised ball valve (heavy duty)' },
          { label: 'Nominal Diameter', value: 'DN50 / DN65 / DN80 / DN100 (price on request)' },
          { label: 'Communication', value: 'Wired M-Bus (EN 13757)' },
          { label: 'Actuation', value: 'Electric motor, full stroke < 10 seconds' },
          { label: 'Power Supply', value: '24V DC / 230V AC (model dependent)' },
          { label: 'Operating Pressure', value: 'Up to 16 bar (PN16)' },
          { label: 'Body Material', value: 'Brass / Stainless steel' },
          { label: 'Protection Rating', value: 'IP65' },
          { label: 'Fail-Safe Position', value: 'Configurable (normally open / normally closed)' },
          { label: 'Mounting', value: 'Inline; flanged or threaded connection' },
        ],
        downloads: [
          { label: 'Wired M-Bus Valve DN50 & Above Datasheet', type: 'Datasheet', file: '/downloads/smart-shutoff-valves/Basiox Controls  Wired M-Bus Shutoff Valve DN50 and above..pdf' },
          { label: 'Installation & Wiring Manual', type: 'Manual' },
        ],
      },
      {
        name: 'LoRaWAN Shutoff Valve — DN15 to DN80 (230V / 50Hz)',
        image: '/images/products/smart-shutoff-valve-lorawan.jpg',
        overview:
          'Wireless motorised shutoff valve with integrated LoRaWAN connectivity for long-range, battery-free remote control without M-Bus cabling. Powered at 230V / 50Hz, it covers DN15 to DN80 and integrates with any LoRaWAN network server for automated leak isolation and facility management. DN100 available on request.',
        specs: [
          { label: 'Valve Type', value: 'Motorised ball valve' },
          { label: 'Nominal Diameter', value: 'DN15 / DN20 / DN25 / DN32 / DN40 / DN50 / DN65 / DN80 (DN100 on request)' },
          { label: 'Communication', value: 'LoRaWAN Class A/C (EU868 / AS923)' },
          { label: 'Actuation', value: 'Electric motor, full stroke < 10 seconds' },
          { label: 'Power Supply', value: '230V AC / 50Hz' },
          { label: 'Operating Pressure', value: 'Up to 16 bar (PN16)' },
          { label: 'Body Material', value: 'Brass / Stainless steel' },
          { label: 'Protection Rating', value: 'IP65' },
          { label: 'Fail-Safe Position', value: 'Configurable (normally open / normally closed)' },
          { label: 'LoRaWAN Range', value: 'Up to 5 km line-of-sight; gateway dependent' },
        ],
        downloads: [
          { label: 'LoRaWAN Shutoff Valve Datasheet', type: 'Datasheet', file: '/downloads/smart-shutoff-valves/Basiox Controls  Wired M-Bus, LoRaWAN Shutoff Valve -230v, 50hz..pdf' },
          { label: 'Installation & Wiring Manual', type: 'Manual' },
        ],
      },
    ],
  },
  {
    slug: 'mbus-gateways',
    name: 'M-Bus Gateways',
    tagline: 'Reliable M-Bus communication and data collection devices.',
    overview:
      'Robust M-Bus gateways that aggregate readings from large meter networks and forward them to head-end and BMS platforms — purpose-built for utility billing, sub-metering, and energy-management projects at any scale.',
    metaTitle: 'M-Bus Gateways | Meter Data Collection Devices | Al Taqa Technical',
    metaDescription:
      'Reliable M-Bus gateways for collecting and forwarding meter data from large networks to head-end and BMS platforms — supporting Modbus TCP/IP, MQTT, and BACnet integration.',
    image: '/images/products/mbus-gateways.jpg',
    strip: 'bg-emerald-500',
    color: 'bg-emerald-50/80 border-emerald-100',
    iconBg: 'bg-emerald-100',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="11" width="20" height="12" rx="2.5" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M11 11V8.5A2.5 2.5 0 0113.5 6h5A2.5 2.5 0 0121 8.5V11" stroke="#2F80ED" strokeWidth="1.5"/>
        <circle cx="11" cy="17" r="1.4" fill="#2F80ED"/>
        <circle cx="16" cy="17" r="1.4" fill="#2F80ED"/>
        <circle cx="21" cy="17" r="1.4" fill="#2F80ED"/>
      </svg>
    ),
    features: [
      { title: 'Large-Scale Meter Aggregation', desc: 'Collects data from up to hundreds of wired M-Bus meters on a single network.' },
      { title: 'Protocol Conversion', desc: 'Translates M-Bus data into Modbus TCP/IP, MQTT, or BACnet for seamless BMS integration.' },
      { title: 'Scheduled & On-Demand Polling', desc: 'Configurable read intervals balance data freshness with network load.' },
      { title: 'Secure Cloud Connectivity', desc: 'Encrypted data transmission to head-end systems and cloud billing platforms.' },
    ],
    specs: [
      { label: 'Connected Devices', value: 'Up to 250 M-Bus slaves per gateway' },
      { label: 'Input Interface', value: 'Wired M-Bus (EN 13757-2/-3)' },
      { label: 'Output Protocols', value: 'Modbus TCP/IP, MQTT, BACnet/IP' },
      { label: 'Network Connectivity', value: 'Ethernet / Wi-Fi / Cellular (4G)' },
      { label: 'Power Supply', value: '100–240V AC or 24V DC' },
      { label: 'Data Logging', value: 'Onboard storage with buffered upload' },
      { label: 'Mounting', value: 'DIN-rail enclosure' },
      { label: 'Protection Rating', value: 'IP30 (panel-mounted)' },
    ],
    applications: ['Commercial Buildings', 'District Cooling', 'Utilities', 'Industrial Facilities'],
    protocols: ['M-Bus', 'Modbus TCP/IP', 'MQTT', 'BACnet'],
    downloads: [
      { label: 'Basiox M-Bus 250 Converter Datasheet', type: 'Datasheet', file: '/downloads/mbus-gateways/Basiox_MBus250_Converter_Datasheet.pdf' },
      { label: 'CE / RoHS Compliance Certificate', type: 'Certificate' },
      { label: 'Configuration & User Manual', type: 'Manual' },
    ],
  },
  {
    slug: 'lorawan-sensors',
    name: 'Air Quality & Gas Sensors',
    tagline: 'Real-time monitoring of CO₂, NO₂, TVOC, PM10 and other gases.',
    overview:
      'Precision air quality and gas sensors that continuously measure CO₂, NO₂, TVOC, PM10, and other pollutants — providing actionable data for occupant health, regulatory compliance, and ventilation control across commercial, industrial, and utility environments.',
    metaTitle: 'Air Quality & Gas Sensors | CO₂, NO₂, TVOC, PM10 Monitoring | Al Taqa Technical',
    metaDescription:
      'Real-time air quality and gas sensors measuring CO₂, NO₂, TVOC, PM10, and more — enabling occupant health monitoring, regulatory compliance, and smart ventilation control across commercial and industrial facilities in the UAE.',
    image: '/images/products/lorawan-sensors.jpg',
    strip: 'bg-violet-500',
    color: 'bg-violet-50/80 border-violet-100',
    iconBg: 'bg-violet-100',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="20" r="2.5" fill="#2F80ED"/>
        <path d="M11.5 16a6.5 6.5 0 019 0M8 12.5a11 11 0 0116 0" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    features: [
      { title: 'Multi-Gas Detection', desc: 'Simultaneous measurement of CO₂, NO₂, TVOC, PM10, PM2.5, O₃, and more in a single device.' },
      { title: 'Real-Time Alerts & Reporting', desc: 'Instant threshold alerts and continuous data logging for regulatory compliance and occupant safety.' },
      { title: 'Smart Ventilation Integration', desc: 'Feeds directly into BMS and HVAC systems to trigger demand-controlled ventilation automatically.' },
      { title: 'Wireless & Easy to Deploy', desc: 'Battery-powered with long-range wireless connectivity — no cabling required for rapid site-wide deployment.' },
    ],
    specs: [
      { label: 'Measured Parameters', value: 'CO₂, NO₂, TVOC, PM10, PM2.5, O₃, Temperature, Humidity (model dependent)' },
      { label: 'CO₂ Range', value: '400 – 5000 ppm (NDIR sensor)' },
      { label: 'PM Sensor', value: 'Laser particle counter (PM1.0 / PM2.5 / PM10)' },
      { label: 'Wireless Standard', value: 'LoRaWAN 1.0.x (Class A)' },
      { label: 'Frequency Band', value: '868 / 915 MHz (region-dependent)' },
      { label: 'Battery Life', value: 'Up to 5 years (typical reporting interval)' },
      { label: 'Mounting', value: 'Wall or ceiling mount' },
      { label: 'Operating Temperature', value: '0°C to 50°C' },
      { label: 'Protection Rating', value: 'IP30 (indoor) / IP65 (outdoor models)' },
    ],
    applications: ['Commercial Buildings', 'Hospitality', 'Industrial Facilities', 'Utilities'],
    protocols: ['LoRaWAN', 'MQTT'],
    downloads: [
      { label: 'CE / FCC Certificate', type: 'Certificate' },
      { label: 'Quick-Start & User Manual', type: 'Manual' },
    ],
    variants: [
      // ── Combo / Multi-gas ──────────────────────────────────────────────
      { name: 'Advanced IoT Sensor — PM10, CO, NO2', image: '/images/products/aq-sensor.jpg',
        overview: 'Wireless IoT sensor measuring PM10 particulate matter, carbon monoxide (CO), and nitrogen dioxide (NO2) simultaneously. Designed for urban air quality monitoring, car parks, and industrial perimeter sensing.',
        specs: [{ label: 'Parameters', value: 'PM10, CO, NO2' }, { label: 'Communication', value: 'LoRaWAN' }, { label: 'Enclosure', value: 'Standard indoor/outdoor' }],
        downloads: [{ label: 'PM10-CO-NO2 IoT Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Advaned IOT sensor- PM10-CO-NO2.pdf' }] },

      { name: 'CO2 Standalone Sensor with Buzzer Alarm', image: '/images/products/aq-sensor.jpg',
        overview: 'Self-contained CO2 sensor with built-in buzzer alarm for immediate audible alert when CO2 levels exceed safe thresholds. Ideal for offices, classrooms, and meeting rooms.',
        specs: [{ label: 'Parameters', value: 'CO2' }, { label: 'Alert', value: 'Buzzer alarm on threshold breach' }, { label: 'Enclosure', value: 'Standard indoor' }],
        downloads: [{ label: 'CO2 Standalone Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox CO2 Standalone with Buzzer alarm..pdf' }] },

      { name: 'Combo Sensor — CH3SH, CO, CH4, NO2, O2 (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Five-gas weatherproof sensor monitoring methyl mercaptan (CH3SH), CO, methane (CH4), NO2, and oxygen (O2) — suited for sewage treatment plants, waste facilities, and outdoor industrial environments.',
        specs: [{ label: 'Parameters', value: 'CH3SH, CO, CH4, NO2, O2' }, { label: 'Enclosure', value: 'Weatherproof IP65' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'CH3SH-CO-CH4-NO2-O2 Combo Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combined CH3SH, CO, CH4, NO2, O2 Sensor (Weatherproof).pdf' }] },

      { name: 'IAQ Combo Sensor 1', image: '/images/products/aq-sensor.jpg',
        overview: 'Indoor air quality combo sensor measuring key parameters for occupant comfort and health monitoring in commercial buildings, schools, and healthcare facilities.',
        specs: [{ label: 'Parameters', value: 'CO2, TVOC, Temperature, Humidity' }, { label: 'Enclosure', value: 'Standard indoor' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'IAQ Combo Sensor 1 Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor - IAQ Sensor 1.pdf' }] },

      { name: 'IAQ Combo Sensor 2', image: '/images/products/aq-sensor.jpg',
        overview: 'Advanced indoor air quality combo sensor with an expanded parameter set for comprehensive environmental monitoring and smart ventilation control integration.',
        specs: [{ label: 'Parameters', value: 'CO2, TVOC, PM2.5, Temperature, Humidity' }, { label: 'Enclosure', value: 'Standard indoor' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'IAQ Combo Sensor 2 Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor - IAQ Sensor 2.pdf' }] },

      { name: 'Combo Sensor — PM10 & NO2', image: '/images/products/aq-sensor.jpg',
        overview: 'Dual-parameter sensor monitoring PM10 particulate matter and nitrogen dioxide — ideal for roadside, car park, and urban outdoor air quality monitoring stations.',
        specs: [{ label: 'Parameters', value: 'PM10, NO2' }, { label: 'Enclosure', value: 'Standard' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'PM10-NO2 Combo Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor - PM10 - NO2.pdf' }] },

      { name: 'Combo Sensor — PM2.5 & NO2', image: '/images/products/aq-sensor.jpg',
        overview: 'Dual-parameter sensor monitoring fine particulate matter (PM2.5) and nitrogen dioxide — designed for indoor and near-road environments where fine particle exposure is a health concern.',
        specs: [{ label: 'Parameters', value: 'PM2.5, NO2' }, { label: 'Enclosure', value: 'Standard' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'PM2.5-NO2 Combo Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor - PM2.5 - NO2.pdf' }] },

      { name: 'Combo Sensor — CO & NO2 (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof dual-gas sensor for CO and NO2 monitoring in outdoor, semi-covered, or harsh environments such as tunnels, loading bays, and plant rooms.',
        specs: [{ label: 'Parameters', value: 'CO, NO2' }, { label: 'Enclosure', value: 'Weatherproof IP65' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'CO-NO2 Combo Weatherproof Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor- CO & NO2 (Weatherproof).pdf' }] },

      { name: 'Combo Sensor — CO & NO2 (Indoor)', image: '/images/products/aq-sensor.jpg',
        overview: 'Compact indoor dual-gas sensor monitoring carbon monoxide and nitrogen dioxide for car parks, workshops, and enclosed commercial spaces.',
        specs: [{ label: 'Parameters', value: 'CO, NO2' }, { label: 'Enclosure', value: 'Standard indoor' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'CO-NO2 Combo Indoor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor- CO & NO2 .pdf' }] },

      { name: 'Combo PM Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Dedicated particulate matter combo sensor covering PM1.0, PM2.5, and PM10 size fractions for comprehensive dust and aerosol monitoring.',
        specs: [{ label: 'Parameters', value: 'PM1.0, PM2.5, PM10' }, { label: 'Sensor', value: 'Laser particle counter' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'Combo PM Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor-PM Sensor.pdf' }] },

      { name: 'Combo Sensor — PM10, CO & NO2', image: '/images/products/aq-sensor.jpg',
        overview: 'Three-parameter sensor combining PM10, CO, and NO2 measurement for comprehensive outdoor and semi-outdoor air quality assessments at a single monitoring point.',
        specs: [{ label: 'Parameters', value: 'PM10, CO, NO2' }, { label: 'Enclosure', value: 'Standard' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'PM10-CO-NO2 Combo Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor-PM10-CO- NO2..pdf' }] },

      { name: 'Combo Sensor — PM2.5, CO & NO2', image: '/images/products/aq-sensor.jpg',
        overview: 'Three-parameter sensor measuring fine particles (PM2.5), carbon monoxide, and nitrogen dioxide for indoor and outdoor environments with combustion or traffic emission sources.',
        specs: [{ label: 'Parameters', value: 'PM2.5, CO, NO2' }, { label: 'Enclosure', value: 'Standard' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'PM2.5-CO-NO2 Combo Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Combo Sensor-PM2.5-CO- NO2.pdf' }] },

      // ── Single gas — standard ──────────────────────────────────────────
      { name: 'Supreme Combo Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Premium all-in-one air quality sensor covering a wide range of gases and environmental parameters in a single elegant enclosure for demanding commercial and industrial applications.',
        specs: [{ label: 'Parameters', value: 'CO2, CO, NO2, TVOC, PM2.5, Temp, Humidity' }, { label: 'Enclosure', value: 'Premium indoor' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'Supreme Combo Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls - Supreme Combo Sensor.pdf' }] },

      { name: 'Supreme Industrial IAQ Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Heavy-duty industrial indoor air quality sensor built for factory floors, warehouses, and plant rooms — measuring critical gases with high accuracy and durability.',
        specs: [{ label: 'Parameters', value: 'CO2, CO, NO2, O2, TVOC, PM, Temp, Humidity' }, { label: 'Enclosure', value: 'Industrial grade' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'Supreme Industrial IAQ Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls - Supreme Industrial IAQ Sensor.pdf' }] },

      { name: 'Supreme Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Top-of-range single-unit sensor combining multiple gas measurements with a sleek form factor — the definitive choice for premium commercial IAQ monitoring installations.',
        specs: [{ label: 'Parameters', value: 'CO2, TVOC, PM2.5, Temp, Humidity' }, { label: 'Enclosure', value: 'Premium indoor' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'Supreme Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls - Supreme Sensor.pdf' }] },

      { name: 'Chlorine (Cl2) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Dedicated chlorine gas sensor for monitoring Cl2 in water treatment plants, swimming pool facilities, and chemical processing environments.',
        specs: [{ label: 'Parameters', value: 'Cl2 (Chlorine)' }, { label: 'Enclosure', value: 'Standard' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'Cl2 Chlorine Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls C12 (Chlorine) Sensor.pdf' }] },

      { name: 'CH3SH (Methyl Mercaptan) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Highly sensitive methyl mercaptan sensor for odour monitoring and leak detection at sewage treatment facilities, landfills, and petrochemical sites.',
        specs: [{ label: 'Parameters', value: 'CH3SH (Methyl Mercaptan)' }, { label: 'Enclosure', value: 'Standard indoor' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'CH3SH Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- CH3SH Sensor.pdf' }] },

      { name: 'CH3SH (Methyl Mercaptan) Sensor (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof methyl mercaptan sensor for outdoor odour monitoring at sewage plants, landfills, and outdoor industrial perimeters.',
        specs: [{ label: 'Parameters', value: 'CH3SH (Methyl Mercaptan)' }, { label: 'Enclosure', value: 'Weatherproof IP65' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'CH3SH Weatherproof Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls-CH3SH Sensor (Weatherproof).pdf' }] },

      { name: 'CH4 (Methane) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Catalytic or infrared methane sensor for gas leak detection in utility rooms, plant rooms, and areas where natural gas or biogas is present.',
        specs: [{ label: 'Parameters', value: 'CH4 (Methane / Natural Gas)' }, { label: 'Enclosure', value: 'Standard indoor' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'CH4 Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- CH4 Sensor.pdf' }] },

      { name: 'CH4 (Methane) Sensor (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof methane sensor for outdoor gas leak detection around pipelines, compressor stations, and outdoor plant areas.',
        specs: [{ label: 'Parameters', value: 'CH4 (Methane / Natural Gas)' }, { label: 'Enclosure', value: 'Weatherproof IP65' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'CH4 Weatherproof Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- CH4 Sensor (Weatherproof).pdf' }] },

      { name: 'CO (Carbon Monoxide) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Electrochemical CO sensor for indoor air quality and safety monitoring in car parks, boiler rooms, and enclosed commercial spaces.',
        specs: [{ label: 'Parameters', value: 'CO (Carbon Monoxide)' }, { label: 'Enclosure', value: 'Standard indoor' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'CO Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- CO Sensor.pdf' }] },

      { name: 'CO (Carbon Monoxide) Sensor (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof CO sensor for outdoor and semi-outdoor monitoring in loading docks, tunnels, car park ramps, and outdoor industrial sites.',
        specs: [{ label: 'Parameters', value: 'CO (Carbon Monoxide)' }, { label: 'Enclosure', value: 'Weatherproof IP65' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'CO Weatherproof Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Control- CO Sensor (Weatherproof).pdf' }] },

      { name: 'CO2 (Carbon Dioxide) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'NDIR CO2 sensor for indoor air quality monitoring, demand-controlled ventilation, and occupancy management in offices, schools, and retail spaces.',
        specs: [{ label: 'Parameters', value: 'CO2 (Carbon Dioxide)' }, { label: 'Technology', value: 'NDIR (Non-Dispersive Infrared)' }, { label: 'Enclosure', value: 'Standard indoor' }],
        downloads: [{ label: 'CO2 Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- CO2 Sensor.pdf' }] },

      { name: 'CO2 (Carbon Dioxide) Sensor (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof NDIR CO2 sensor for outdoor, greenhouse, and semi-covered environments requiring continuous carbon dioxide measurement.',
        specs: [{ label: 'Parameters', value: 'CO2 (Carbon Dioxide)' }, { label: 'Technology', value: 'NDIR' }, { label: 'Enclosure', value: 'Weatherproof IP65' }],
        downloads: [{ label: 'CO2 Weatherproof Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- CO2 Sensor (Weatherproof).pdf' }] },

      { name: 'Compact Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Ultra-compact multi-parameter air quality sensor designed for space-constrained installations where a discreet, unobtrusive form factor is required.',
        specs: [{ label: 'Parameters', value: 'CO2, Temperature, Humidity' }, { label: 'Enclosure', value: 'Compact indoor' }, { label: 'Communication', value: 'LoRaWAN / Modbus' }],
        downloads: [{ label: 'Compact Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- Compact Sensor.pdf' }] },

      { name: 'H2 (Hydrogen) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Catalytic hydrogen sensor for leak detection in battery rooms, fuel cell installations, and hydrogen storage and distribution facilities.',
        specs: [{ label: 'Parameters', value: 'H2 (Hydrogen)' }, { label: 'Enclosure', value: 'Standard indoor' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'H2 Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- H2 Sensor.pdf' }] },

      { name: 'H2 (Hydrogen) Sensor (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof hydrogen sensor for outdoor hydrogen detection at refuelling stations, solar battery banks, and outdoor hydrogen storage areas.',
        specs: [{ label: 'Parameters', value: 'H2 (Hydrogen)' }, { label: 'Enclosure', value: 'Weatherproof IP65' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'H2 Weatherproof Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls - H2 Sensor (Weatherproof).pdf' }] },

      { name: 'H2 (Hydrogen) Sensor — ATEX Enclosure', image: '/images/products/aq-sensor-atex.jpg',
        overview: 'ATEX-certified hydrogen sensor for use in hazardous area Zone 1/Zone 2 environments such as petrochemical plants, offshore facilities, and explosive atmospheres.',
        specs: [{ label: 'Parameters', value: 'H2 (Hydrogen)' }, { label: 'Enclosure', value: 'ATEX certified (Zone 1/2)' }, { label: 'Communication', value: 'Modbus RTU' }],
        downloads: [{ label: 'H2 ATEX Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- H2 Sensor (ATEX Enclosure).pdf' }] },

      { name: 'H2 (Hydrogen) Sensor — ATEX Enclosure (Updated)', image: '/images/products/aq-sensor-atex.jpg',
        overview: 'Updated ATEX-certified hydrogen sensor with enhanced sensitivity and connectivity — the current-generation solution for hazardous area hydrogen safety monitoring.',
        specs: [{ label: 'Parameters', value: 'H2 (Hydrogen)' }, { label: 'Enclosure', value: 'ATEX certified (Zone 1/2) — updated' }, { label: 'Communication', value: 'Modbus RTU' }],
        downloads: [{ label: 'H2 ATEX Sensor (Updated) Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- Hydrogen Sensor (H2) (ATEX Enclosure) Updated.pdf' }] },

      { name: 'H2S (Hydrogen Sulphide) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Electrochemical H2S sensor for monitoring hydrogen sulphide in sewage treatment plants, oil & gas facilities, and confined spaces requiring continuous safety monitoring.',
        specs: [{ label: 'Parameters', value: 'H2S (Hydrogen Sulphide)' }, { label: 'Technology', value: 'Electrochemical' }, { label: 'Enclosure', value: 'Ex-rated enclosure' }],
        downloads: [{ label: 'H2S Sensor (Ex Enclosure) Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- H2S Sensor (Ex Enclosure).pdf' }] },

      { name: 'H2S (Hydrogen Sulphide) Sensor — ATEX Enclosure', image: '/images/products/aq-sensor-atex.jpg',
        overview: 'ATEX-certified H2S sensor for hazardous area Zone 1/Zone 2 deployments in oil & gas, chemical processing, and sewage environments with explosive atmosphere risk.',
        specs: [{ label: 'Parameters', value: 'H2S (Hydrogen Sulphide)' }, { label: 'Enclosure', value: 'ATEX certified (Zone 1/2)' }, { label: 'Communication', value: 'Modbus RTU' }],
        downloads: [{ label: 'H2S ATEX Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- H2S Sensor (Atex Enclosure).pdf' }] },

      { name: 'LPG Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Catalytic LPG sensor for leak detection in commercial kitchens, retail LPG storage areas, and residential and hospitality environments using bottled gas.',
        specs: [{ label: 'Parameters', value: 'LPG (Propane / Butane)' }, { label: 'Enclosure', value: 'Standard indoor' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'LPG Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- LPG Sensor.pdf' }] },

      { name: 'NH3 (Ammonia) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Electrochemical ammonia sensor for industrial refrigeration plant rooms, fertiliser storage, and agricultural facilities requiring continuous NH3 monitoring.',
        specs: [{ label: 'Parameters', value: 'NH3 (Ammonia)' }, { label: 'Technology', value: 'Electrochemical' }, { label: 'Enclosure', value: 'Standard indoor' }],
        downloads: [{ label: 'NH3 Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- NH3 Sensor.pdf' }] },

      { name: 'NH3 (Ammonia) Sensor (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof ammonia sensor for outdoor monitoring at refrigeration plant perimeters, wastewater treatment sites, and agricultural outdoor environments.',
        specs: [{ label: 'Parameters', value: 'NH3 (Ammonia)' }, { label: 'Technology', value: 'Electrochemical' }, { label: 'Enclosure', value: 'Weatherproof IP65' }],
        downloads: [{ label: 'NH3 Weatherproof Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- NH3 Sensor (Weatherproof).pdf' }] },

      { name: 'NO2 (Nitrogen Dioxide) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Electrochemical NO2 sensor for urban air quality monitoring, roadside sensing, and indoor environments affected by combustion or traffic emissions.',
        specs: [{ label: 'Parameters', value: 'NO2 (Nitrogen Dioxide)' }, { label: 'Technology', value: 'Electrochemical' }, { label: 'Enclosure', value: 'Standard indoor/outdoor' }],
        downloads: [{ label: 'NO2 Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- NO2 Sensor.pdf' }] },

      { name: 'NO2 (Nitrogen Dioxide) Sensor (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof NO2 sensor for outdoor roadside, industrial perimeter, and urban ambient air quality monitoring stations.',
        specs: [{ label: 'Parameters', value: 'NO2 (Nitrogen Dioxide)' }, { label: 'Technology', value: 'Electrochemical' }, { label: 'Enclosure', value: 'Weatherproof IP65' }],
        downloads: [{ label: 'NO2 Weatherproof Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- NO2 Sensor (Weatherproof).pdf' }] },

      { name: 'O2 (Oxygen) Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Electrochemical oxygen sensor for confined space safety monitoring, ensuring O2 levels remain in the safe range for personnel in enclosed industrial environments.',
        specs: [{ label: 'Parameters', value: 'O2 (Oxygen — 0–25% vol)' }, { label: 'Technology', value: 'Electrochemical' }, { label: 'Enclosure', value: 'Standard indoor' }],
        downloads: [{ label: 'O2 Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- O2 Sensor.pdf' }] },

      { name: 'O2 (Oxygen) Sensor (Weatherproof)', image: '/images/products/aq-sensor.jpg',
        overview: 'Weatherproof oxygen sensor for outdoor confined space safety monitoring and perimeter oxygen level sensing in industrial and utilities environments.',
        specs: [{ label: 'Parameters', value: 'O2 (Oxygen — 0–25% vol)' }, { label: 'Technology', value: 'Electrochemical' }, { label: 'Enclosure', value: 'Weatherproof IP65' }],
        downloads: [{ label: 'O2 Weatherproof Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- O2 Sensor (Weatherproof).pdf' }] },

      { name: 'T & RH Sensor — ATEX Enclosure', image: '/images/products/aq-sensor-atex.jpg',
        overview: 'ATEX-certified temperature and relative humidity sensor for hazardous area environmental monitoring in Zone 1/Zone 2 classified locations in oil & gas and chemical facilities.',
        specs: [{ label: 'Parameters', value: 'Temperature, Relative Humidity' }, { label: 'Enclosure', value: 'ATEX certified (Zone 1/2)' }, { label: 'Communication', value: 'Modbus RTU' }],
        downloads: [{ label: 'T & RH ATEX Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox Controls- T & RH Sensor (ATEX Enclosure) Updated.pdf' }] },

      { name: 'VRI / MRI Sensor', image: '/images/products/aq-sensor.jpg',
        overview: 'Versatile VRI/MRI multi-range sensor for specialised gas detection applications requiring configurable measurement ranges and flexible installation options.',
        specs: [{ label: 'Parameters', value: 'Configurable (VRI/MRI range)' }, { label: 'Enclosure', value: 'Standard' }, { label: 'Communication', value: 'Modbus RTU / LoRaWAN' }],
        downloads: [{ label: 'VRI / MRI Sensor Datasheet', type: 'Datasheet', file: '/downloads/Air Quality & Gas Sensors/Basiox_VRI_MRI_Datasheet.pdf' }] },
    ],
  },
  {
    slug: 'plc-control-systems',
    name: 'PLC & Control Systems',
    tagline: 'Industrial automation and control solutions.',
    overview:
      'Industrial-grade PLC and control system solutions engineered for demanding automation environments — delivering reliable process control, system integration, and centralised monitoring across facilities.',
    metaTitle: 'PLC & Control Systems | Industrial Automation Solutions | Al Taqa Technical',
    metaDescription:
      'Industrial-grade PLC and control system solutions for reliable process automation, system integration, and centralised monitoring across commercial and industrial facilities in the UAE.',
    image: '/images/products/plc-control-systems.jpg',
    strip: 'bg-amber-500',
    color: 'bg-amber-50/80 border-amber-100',
    iconBg: 'bg-amber-100',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="10" y="10" width="12" height="12" rx="2" stroke="#2F80ED" strokeWidth="1.5"/>
        <path d="M16 6v4M16 22v4M6 16h4M22 16h4M8.5 8.5l2.5 2.5M21 21l2.5 2.5M8.5 23.5L11 21M21 11l2.5-2.5"
              stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    features: [
      { title: 'Scalable Automation Architecture', desc: 'Modular I/O and controller options scale from single-process to plant-wide deployments.' },
      { title: 'Open-Protocol Integration', desc: 'Communicates seamlessly with BMS, SCADA, and third-party devices.' },
      { title: 'Robust Industrial Design', desc: 'Engineered for continuous operation in demanding facility environments.' },
      { title: 'Centralised Monitoring & Control', desc: 'Unified visibility and control across distributed control points.' },
    ],
    specs: [
      { label: 'Controller Type', value: 'Modular PLC with expandable I/O' },
      { label: 'I/O Capacity', value: 'Up to 512 points per controller' },
      { label: 'Communication', value: 'Modbus RTU / Modbus TCP/IP / BACnet / MQTT' },
      { label: 'Programming Standard', value: 'IEC 61131-3' },
      { label: 'Power Supply', value: '24V DC / 100–240V AC' },
      { label: 'Operating Temperature', value: '-10°C to 60°C' },
      { label: 'Mounting', value: 'DIN-rail / Panel-mounted enclosure' },
      { label: 'Protection Rating', value: 'IP20 (panel) / IP65 (enclosure option)' },
    ],
    applications: ['Industrial Facilities', 'Commercial Buildings', 'District Cooling', 'Utilities'],
    protocols: ['Modbus RTU', 'Modbus TCP/IP', 'BACnet', 'MQTT'],
    downloads: [
      { label: 'smarty7 PLC (S7) Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC.pdf' },
      { label: 'smarty7 PLC-HV Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC-HV.pdf' },
      { label: 'smarty7 PLC-RL Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC-RL.pdf' },
      { label: 'smarty7 PLC-XA Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC-XA.pdf' },
      { label: 'smarty7 PLC-XD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC-XD.pdf' },
      { label: 'drive.web dw230-050 Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw230-050.pdf' },
      { label: 'drive.web dw230-070 Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw230-070.pdf' },
      { label: 'drive.web dw250-DM-S7PD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw250-DM-S7PD.pdf' },
      { label: 'drive.web dw250-DM-HVPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw250-DM-HVPD.pdf' },
      { label: 'drive.web dw250-DM-RLPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw250-DM-RLPD.pdf' },
      { label: 'drive.web dw254-DM-S7PD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw254-DM-S7PD.pdf' },
      { label: 'drive.web dw254-DM-HVPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw254-DM-HVPD.pdf' },
      { label: 'drive.web dw254-DM-XAPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw254-DM-XAPD.pdf' },
      { label: 'drive.web dw254-DM-XDPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw254-DM-XDPD.pdf' },
      { label: 'drive.web dw259-DM-S7PD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw259-DM-S7PD.pdf' },
      { label: 'drive.web dw259-DM-HVPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw259-DM-HVPD.pdf' },
      { label: 'drive.web dw259-DM-XDPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw259-DM-XDPD.pdf' },
      { label: 'drive.web dw260-070 Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw260-070.pdf' },
      { label: 'CE / UL Compliance Certificate', type: 'Certificate' },
      { label: 'Programming & User Manual', type: 'Manual' },
    ],
    variants: [
      {
        name: 'smarty7 PLC — S7 (Standard)',
        image: '/images/products/plc-s7.jpg',
        overview:
          'The smarty7 PLC S7 is a compact, high-performance programmable logic controller based on the Siemens S7 instruction set, making it compatible with existing S7 programming tools and networks. Ideal for HVAC, building automation, and industrial process control.',
        specs: [
          { label: 'Model', value: 'smarty7 PLC (S7-compatible)' },
          { label: 'Programming', value: 'IEC 61131-3; Siemens S7 instruction set compatible' },
          { label: 'I/O', value: 'Configurable digital & analog I/O modules' },
          { label: 'Communication', value: 'Modbus RTU, Modbus TCP/IP, BACnet, M-Bus' },
          { label: 'Power Supply', value: '24V DC' },
          { label: 'Operating Temperature', value: '-10°C to 60°C' },
          { label: 'Mounting', value: 'DIN-rail' },
          { label: 'Protection Rating', value: 'IP20' },
        ],
        downloads: [
          { label: 'smarty7 PLC-S7 Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC.pdf' },
        ],
      },
      {
        name: 'smarty7 PLC-HV — High Voltage',
        image: '/images/products/plc-hv.jpg',
        overview:
          'The smarty7 PLC-HV extends the smarty7 platform with high-voltage I/O support, enabling direct connection to mains-voltage sensors and actuators without additional signal conditioning — simplifying panel wiring for large-scale HVAC and industrial applications.',
        specs: [
          { label: 'Model', value: 'smarty7 PLC-HV (High Voltage variant)' },
          { label: 'Programming', value: 'IEC 61131-3; S7-compatible' },
          { label: 'I/O Voltage', value: 'Up to 230V AC digital inputs' },
          { label: 'Communication', value: 'Modbus RTU, Modbus TCP/IP, BACnet' },
          { label: 'Power Supply', value: '24V DC' },
          { label: 'Operating Temperature', value: '-10°C to 60°C' },
          { label: 'Mounting', value: 'DIN-rail' },
          { label: 'Protection Rating', value: 'IP20' },
        ],
        downloads: [
          { label: 'smarty7 PLC-HV Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC-HV.pdf' },
        ],
      },
      {
        name: 'smarty7 PLC-RL — Relay Output',
        image: '/images/products/plc-rl.jpg',
        overview:
          'The smarty7 PLC-RL features integrated relay outputs for direct switching of loads up to 10A — eliminating external relay modules for pumps, fans, and motorised dampers in building automation and mechanical plant rooms.',
        specs: [
          { label: 'Model', value: 'smarty7 PLC-RL (Relay Output variant)' },
          { label: 'Programming', value: 'IEC 61131-3; S7-compatible' },
          { label: 'Relay Outputs', value: 'Integrated relay contacts, up to 10A / 250V AC' },
          { label: 'Communication', value: 'Modbus RTU, Modbus TCP/IP, BACnet' },
          { label: 'Power Supply', value: '24V DC' },
          { label: 'Operating Temperature', value: '-10°C to 60°C' },
          { label: 'Mounting', value: 'DIN-rail' },
          { label: 'Protection Rating', value: 'IP20' },
        ],
        downloads: [
          { label: 'smarty7 PLC-RL Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC-RL.pdf' },
        ],
      },
      {
        name: 'smarty7 PLC-XA — Extended Analog',
        image: '/images/products/plc-xa.jpg',
        overview:
          'The smarty7 PLC-XA provides an expanded analog I/O configuration for applications requiring high channel counts — suitable for multi-zone temperature control, pressure monitoring, and energy metering integration in large commercial buildings.',
        specs: [
          { label: 'Model', value: 'smarty7 PLC-XA (Extended Analog variant)' },
          { label: 'Programming', value: 'IEC 61131-3; S7-compatible' },
          { label: 'Analog I/O', value: 'Expanded analog inputs & outputs (0–10V / 4–20mA)' },
          { label: 'Communication', value: 'Modbus RTU, Modbus TCP/IP, BACnet' },
          { label: 'Power Supply', value: '24V DC' },
          { label: 'Operating Temperature', value: '-10°C to 60°C' },
          { label: 'Mounting', value: 'DIN-rail' },
          { label: 'Protection Rating', value: 'IP20' },
        ],
        downloads: [
          { label: 'smarty7 PLC-XA Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC-XA.pdf' },
        ],
      },
      {
        name: 'smarty7 PLC-XD — Extended Digital',
        image: '/images/products/plc-xd.jpg',
        overview:
          'The smarty7 PLC-XD maximises digital I/O density for applications with high point counts — ideal for large-scale BMS panels, district cooling plant rooms, and industrial facilities requiring control of many discrete devices from a single controller.',
        specs: [
          { label: 'Model', value: 'smarty7 PLC-XD (Extended Digital variant)' },
          { label: 'Programming', value: 'IEC 61131-3; S7-compatible' },
          { label: 'Digital I/O', value: 'High-density digital inputs & outputs' },
          { label: 'Communication', value: 'Modbus RTU, Modbus TCP/IP, BACnet' },
          { label: 'Power Supply', value: '24V DC' },
          { label: 'Operating Temperature', value: '-10°C to 60°C' },
          { label: 'Mounting', value: 'DIN-rail' },
          { label: 'Protection Rating', value: 'IP20' },
        ],
        downloads: [
          { label: 'smarty7 PLC-XD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/smarty7 PLC-XD.pdf' },
        ],
      },

      // drive.web series
      {
        name: 'drive.web dw230-050',
        image: '/images/products/dw230-050.jpg',
        overview: 'drive.web dw230-050 — compact drive-mounted web server for variable frequency drives. Provides Ethernet connectivity, built-in web interface, and protocol conversion for BAS/BMS integration.',
        specs: [
          { label: 'Model', value: 'dw230-050' },
          { label: 'Form Factor', value: 'Drive-mounted module' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Interface', value: 'Built-in web server' },
          { label: 'Power Supply', value: 'Powered from host drive' },
        ],
        downloads: [
          { label: 'dw230-050 Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw230-050.pdf' },
        ],
      },
      {
        name: 'drive.web dw230-070',
        image: '/images/products/dw230-070.jpg',
        overview: 'drive.web dw230-070 — enhanced drive-mounted web server with expanded I/O and protocol support for larger VFD networks and multi-drive coordination in HVAC and industrial applications.',
        specs: [
          { label: 'Model', value: 'dw230-070' },
          { label: 'Form Factor', value: 'Drive-mounted module' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP, MQTT' },
          { label: 'Interface', value: 'Built-in web server' },
          { label: 'Power Supply', value: 'Powered from host drive' },
        ],
        downloads: [
          { label: 'dw230-070 Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw230-070.pdf' },
        ],
      },
      {
        name: 'drive.web dw230-101',
        image: '/images/products/dw230-101.jpg',
        overview: 'drive.web dw230-101 — advanced drive-mounted web server module providing comprehensive drive monitoring, control, and integration for demanding automation environments.',
        specs: [
          { label: 'Model', value: 'dw230-101' },
          { label: 'Form Factor', value: 'Drive-mounted module' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Interface', value: 'Built-in web server' },
          { label: 'Power Supply', value: 'Powered from host drive' },
        ],
        downloads: [
          { label: 'dw230-101 Datasheet', type: 'Datasheet' },
        ],
      },
      {
        name: 'drive.web dw250-DM-S7PD',
        image: '/images/products/dw250-dm-s7pd.jpg',
        overview: 'drive.web dw250-DM-S7PD — DIN-rail mounted web server with S7 PLC interface, providing network connectivity and protocol translation for S7-compatible PLC installations.',
        specs: [
          { label: 'Model', value: 'dw250-DM-S7PD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'S7-compatible' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw250-DM-S7PD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw250-DM-S7PD.pdf' },
        ],
      },
      {
        name: 'drive.web dw250-DM-HVPD',
        image: '/images/products/dw250-dm-hvpd.jpg',
        overview: 'drive.web dw250-DM-HVPD — DIN-rail mounted web server with high-voltage PLC interface for HVAC and large-scale building automation systems.',
        specs: [
          { label: 'Model', value: 'dw250-DM-HVPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'High-voltage compatible' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw250-DM-HVPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw250-DM-HVPD.pdf' },
        ],
      },
      {
        name: 'drive.web dw250-DM-RLPD',
        image: '/images/products/dw250-dm-rlpd.jpg',
        overview: 'drive.web dw250-DM-RLPD — DIN-rail mounted web server with relay output PLC interface, enabling direct load switching alongside network communication.',
        specs: [
          { label: 'Model', value: 'dw250-DM-RLPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'Relay output compatible' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw250-DM-RLPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw250-DM-RLPD.pdf' },
        ],
      },
      {
        name: 'drive.web dw250-DM-XAPD',
        image: '/images/products/dw250-dm-xapd.jpg',
        overview: 'drive.web dw250-DM-XAPD — DIN-rail mounted web server with extended analog PLC interface for high-density analog I/O integration.',
        specs: [
          { label: 'Model', value: 'dw250-DM-XAPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'Extended analog I/O' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw250-DM-XAPD Datasheet', type: 'Datasheet' },
        ],
      },
      {
        name: 'drive.web dw250-DM-XDPD',
        image: '/images/products/dw250-dm-xdpd.jpg',
        overview: 'drive.web dw250-DM-XDPD — DIN-rail mounted web server with extended digital PLC interface for high point-count digital I/O applications.',
        specs: [
          { label: 'Model', value: 'dw250-DM-XDPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'Extended digital I/O' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw250-DM-XDPD Datasheet', type: 'Datasheet' },
        ],
      },
      {
        name: 'drive.web dw250-DS-S7PD',
        image: '/images/products/dw250-ds-s7pd.jpg',
        overview: 'drive.web dw250-DS-S7PD — desktop/standalone web server with S7 PLC interface, offering flexible mounting for control room and panel installations.',
        specs: [
          { label: 'Model', value: 'dw250-DS-S7PD' },
          { label: 'Form Factor', value: 'Desktop / standalone' },
          { label: 'PLC Interface', value: 'S7-compatible' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw250-DS-S7PD Datasheet', type: 'Datasheet' },
        ],
      },
      {
        name: 'drive.web dw254-DM-S7PD',
        image: '/images/products/dw254-dm-s7pd.jpg',
        overview: 'drive.web dw254-DM-S7PD — next-generation DIN-rail web server with enhanced S7 PLC interface, improved processing power, and expanded protocol support.',
        specs: [
          { label: 'Model', value: 'dw254-DM-S7PD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'S7-compatible (enhanced)' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP, MQTT' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw254-DM-S7PD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw254-DM-S7PD.pdf' },
        ],
      },
      {
        name: 'drive.web dw254-DM-HVPD',
        image: '/images/products/dw254-dm-hvpd.jpg',
        overview: 'drive.web dw254-DM-HVPD — enhanced DIN-rail web server with high-voltage PLC interface and improved BMS integration capabilities.',
        specs: [
          { label: 'Model', value: 'dw254-DM-HVPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'High-voltage (enhanced)' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP, MQTT' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw254-DM-HVPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw254-DM-HVPD.pdf' },
        ],
      },
      {
        name: 'drive.web dw254-DM-XAPD',
        image: '/images/products/dw254-dm-xapd.jpg',
        overview: 'drive.web dw254-DM-XAPD — enhanced DIN-rail web server with extended analog PLC interface for precision multi-channel analog signal integration.',
        specs: [
          { label: 'Model', value: 'dw254-DM-XAPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'Extended analog I/O (enhanced)' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP, MQTT' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw254-DM-XAPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw254-DM-XAPD.pdf' },
        ],
      },
      {
        name: 'drive.web dw254-DM-XDPD',
        image: '/images/products/dw254-dm-xdpd.jpg',
        overview: 'drive.web dw254-DM-XDPD — enhanced DIN-rail web server with extended digital PLC interface for large-scale digital I/O systems.',
        specs: [
          { label: 'Model', value: 'dw254-DM-XDPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'Extended digital I/O (enhanced)' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP, MQTT' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw254-DM-XDPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw254-DM-XDPD.pdf' },
        ],
      },
      {
        name: 'drive.web dw259-DM-S7PD',
        image: '/images/products/dw259-dm-s7pd.jpg',
        overview: 'drive.web dw259-DM-S7PD — premium DIN-rail web server with S7 PLC interface, offering the highest processing capability for complex multi-system integrations.',
        specs: [
          { label: 'Model', value: 'dw259-DM-S7PD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'S7-compatible (premium)' },
          { label: 'Connectivity', value: 'Dual Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP, MQTT, KNX' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw259-DM-S7PD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw259-DM-S7PD.pdf' },
        ],
      },
      {
        name: 'drive.web dw259-DM-HVPD',
        image: '/images/products/dw259-dm-hvpd.jpg',
        overview: 'drive.web dw259-DM-HVPD — premium DIN-rail web server with high-voltage PLC interface for the most demanding large-scale HVAC and industrial control applications.',
        specs: [
          { label: 'Model', value: 'dw259-DM-HVPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'High-voltage (premium)' },
          { label: 'Connectivity', value: 'Dual Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP, MQTT, KNX' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw259-DM-HVPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw259-DM-HVPD.pdf' },
        ],
      },
      {
        name: 'drive.web dw259-DM-XDPD',
        image: '/images/products/dw259-dm-xdpd.jpg',
        overview: 'drive.web dw259-DM-XDPD — premium DIN-rail web server with extended digital PLC interface, offering maximum point count and highest network throughput.',
        specs: [
          { label: 'Model', value: 'dw259-DM-XDPD' },
          { label: 'Form Factor', value: 'DIN-rail mounted' },
          { label: 'PLC Interface', value: 'Extended digital I/O (premium)' },
          { label: 'Connectivity', value: 'Dual Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP, MQTT, KNX' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw259-DM-XDPD Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw259-DM-XDPD.pdf' },
        ],
      },
      {
        name: 'drive.web dw260-070 — savvyPanel',
        image: '/images/products/dw260-070.jpg',
        overview: 'drive.web dw260-070 savvyPanel — touchscreen operator panel with integrated drive.web server, providing a local HMI alongside full network connectivity for on-site monitoring and control.',
        specs: [
          { label: 'Model', value: 'dw260-070 savvyPanel' },
          { label: 'Form Factor', value: 'Panel-mount touchscreen HMI' },
          { label: 'Display', value: '7" colour touchscreen' },
          { label: 'Connectivity', value: 'Ethernet (10/100 Mbps)' },
          { label: 'Protocols', value: 'BACnet/IP, Modbus TCP/IP' },
          { label: 'Power Supply', value: '24V DC' },
        ],
        downloads: [
          { label: 'dw260-070 savvyPanel Datasheet', type: 'Datasheet', file: '/downloads/PLC & Control Systems/drive.web Datasheet - dw260-070.pdf' },
        ],
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
