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
      { label: 'Smart Water Meter Datasheet', type: 'Datasheet' },
      { label: 'ISO 4064 Compliance Certificate', type: 'Certificate' },
      { label: 'Installation & User Manual', type: 'Manual' },
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
    image: '/images/products/smart-shutoff-valves.jpg',
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
      { label: 'Smart Shutoff Valve Datasheet', type: 'Datasheet' },
      { label: 'Pressure Rating Certificate', type: 'Certificate' },
      { label: 'Installation & Wiring Manual', type: 'Manual' },
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
      { label: 'M-Bus Gateway Datasheet', type: 'Datasheet' },
      { label: 'CE / RoHS Compliance Certificate', type: 'Certificate' },
      { label: 'Configuration & User Manual', type: 'Manual' },
    ],
  },
  {
    slug: 'lorawan-sensors',
    name: 'LoRaWAN Sensors',
    tagline: 'Wireless sensors for smart building and utility monitoring.',
    overview:
      'Long-range, low-power wireless sensors that monitor temperature, occupancy, environmental conditions, and utility consumption — enabling scalable smart-building and smart-utility deployments without complex cabling.',
    metaTitle: 'LoRaWAN Sensors | Wireless Smart Building Monitoring | Al Taqa Technical',
    metaDescription:
      'Long-range, low-power LoRaWAN sensors for temperature, occupancy, and utility monitoring — enabling scalable, cable-free smart building and smart utility deployments across the UAE.',
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
      { title: 'Multi-Year Battery Life', desc: 'Ultra-low power design enables years of operation on a single battery.' },
      { title: 'Long-Range Connectivity', desc: 'Communicates over kilometres without dense gateway infrastructure.' },
      { title: 'Flexible Sensor Variants', desc: 'Available for temperature & humidity, occupancy, leak detection, and more.' },
      { title: 'Plug-and-Play Deployment', desc: 'Simple onboarding to any LoRaWAN network server with minimal configuration.' },
    ],
    specs: [
      { label: 'Wireless Standard', value: 'LoRaWAN 1.0.x (Class A)' },
      { label: 'Frequency Band', value: '868 / 915 MHz (region-dependent)' },
      { label: 'Range', value: 'Up to 5 km (line-of-sight)' },
      { label: 'Battery Life', value: 'Up to 8 years (typical reporting interval)' },
      { label: 'Sensor Types', value: 'Temperature, humidity, occupancy, leak, contact' },
      { label: 'Mounting', value: 'Wall, ceiling, or DIN-rail' },
      { label: 'Operating Temperature', value: '-20°C to 60°C' },
      { label: 'Protection Rating', value: 'IP65' },
    ],
    applications: ['Commercial Buildings', 'Hospitality', 'Industrial Facilities', 'Utilities'],
    protocols: ['LoRaWAN', 'MQTT'],
    downloads: [
      { label: 'LoRaWAN Sensor Datasheet', type: 'Datasheet' },
      { label: 'CE / FCC Certificate', type: 'Certificate' },
      { label: 'Quick-Start & User Manual', type: 'Manual' },
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
      { label: 'PLC & Control System Datasheet', type: 'Datasheet' },
      { label: 'CE / UL Compliance Certificate', type: 'Certificate' },
      { label: 'Programming & User Manual', type: 'Manual' },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
