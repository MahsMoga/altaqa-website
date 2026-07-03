import { ReactNode } from 'react'

export interface ProductSpec {
  label: string
  value: string
}

export interface ProductDownload {
  label: string
  type: 'Datasheet' | 'Certificate' | 'Manual'
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
}

export const products: Product[] = [
  {
    slug: 'btu-meters',
    name: 'BTU Meters',
    tagline: 'Accurate thermal energy measurement solutions.',
    overview:
      'High-precision BTU (thermal energy) meters that measure heating and cooling consumption with exceptional accuracy — purpose-built for district cooling networks, chilled-water billing, and energy-efficiency programmes.',
    metaTitle: 'BTU Meters | Thermal Energy Metering | Al Taqa Technical',
    metaDescription:
      'Precision BTU meters for accurate thermal energy measurement in heating and cooling systems. Ideal for district cooling, commercial buildings, and utility billing across Abu Dhabi and the UAE.',
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
      { title: 'Ultra-High Accuracy', desc: 'Class 2 precision sensors deliver dependable readings for fair, transparent billing.' },
      { title: 'Dual Temperature Sensing', desc: 'Matched-pair Pt500 sensors capture flow and return temperatures for precise energy calculation.' },
      { title: 'Long Battery Life', desc: 'Integrated lithium battery rated for up to 16 years of continuous operation.' },
      { title: 'Tamper Detection', desc: 'Built-in alarms flag reverse flow, sensor faults, and unauthorised interference.' },
    ],
    specs: [
      { label: 'Measurement Type', value: 'Thermal energy (heating / cooling)' },
      { label: 'Accuracy Class', value: 'Class 2 (EN 1434)' },
      { label: 'Temperature Range', value: '0°C – 105°C' },
      { label: 'Nominal Flow (Qp)', value: '0.6 – 15 m³/h' },
      { label: 'Power Supply', value: 'Integrated long-life lithium battery' },
      { label: 'Communication', value: 'M-Bus / Modbus RTU / LoRaWAN (optional)' },
      { label: 'Display', value: 'Multi-line LCD with backlight' },
      { label: 'Protection Rating', value: 'IP65' },
    ],
    applications: ['District Cooling', 'Commercial Buildings', 'Utilities', 'Industrial Facilities'],
    protocols: ['M-Bus', 'Modbus RTU', 'LoRaWAN'],
    downloads: [
      { label: 'BTU Meter Datasheet', type: 'Datasheet' },
      { label: 'MID / EN 1434 Certificate', type: 'Certificate' },
      { label: 'Installation & User Manual', type: 'Manual' },
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
