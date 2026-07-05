import React from 'react'

export interface ServiceFeature { title: string; desc: string }
export interface ServiceFaq     { q: string; a: string }

/** Serialisable subset — safe to pass through getStaticProps */
export interface ServiceData {
  slug: string
  name: string
  shortName: string
  tagline: string
  overview: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  color: string
  features: ServiceFeature[]
  deliverables: string[]
  sectors: string[]
  faqs: ServiceFaq[]
  relatedSlugs: string[]
}

/** Full service with React icon — used client-side only */
export interface Service extends ServiceData {
  icon: React.ReactNode
}

// ─── Icon definitions ──────────────────────────────────────────────────────
export const serviceIcons: Record<string, React.ReactNode> = {
  'bms-installation': (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="24" height="24" rx="4" stroke="#2F80ED" strokeWidth="1.5"/>
      <path d="M10 16h12M16 10v12" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="3" stroke="#2F80ED" strokeWidth="1.5"/>
    </svg>
  ),
  'energy-management': (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M6 24l5-8 4 4 5-10 6 14" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 28h24" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'annual-maintenance': (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke="#F59E0B" strokeWidth="1.5"/>
      <path d="M16 9v7l4 4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'guest-room-management': (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="8" width="20" height="16" rx="3" stroke="#8B5CF6" strokeWidth="1.5"/>
      <path d="M12 8V6M20 8V6" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="3" stroke="#8B5CF6" strokeWidth="1.5"/>
    </svg>
  ),
  'smart-metering': (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="8" y="4" width="16" height="24" rx="3" stroke="#06B6D4" strokeWidth="1.5"/>
      <circle cx="16" cy="22" r="3" stroke="#06B6D4" strokeWidth="1.5"/>
      <path d="M16 19v-8M12 10h8" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'automatic-control-systems': (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="8" width="24" height="16" rx="3" stroke="#EF4444" strokeWidth="1.5"/>
      <circle cx="10" cy="16" r="2.5" stroke="#EF4444" strokeWidth="1.5"/>
      <circle cx="22" cy="16" r="2.5" stroke="#EF4444" strokeWidth="1.5"/>
      <path d="M15 13v6M17 13v6" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
}

// ─── Serialisable service data ─────────────────────────────────────────────
export const servicesData: ServiceData[] = [
  {
    slug: 'bms-installation',
    name: 'BMS Design & Installation',
    shortName: 'BMS Installation',
    tagline: 'End-to-end Building Management System design, supply, and commissioning.',
    overview:
      'Al Taqa Technical delivers complete BMS solutions across Abu Dhabi and the UAE — from initial scope and engineering design through equipment supply, installation, programming, commissioning, and owner training. We are certified across all major platforms including Johnson Controls Metasys, Schneider Electric EcoStruxure, Honeywell, and Tridium Niagara, ensuring you get the right system for your facility rather than a single-vendor recommendation.',
    metaTitle: 'BMS Installation Abu Dhabi | Building Management System UAE | Al Taqa Technical',
    metaDescription: 'Expert BMS design and installation in Abu Dhabi, UAE. Certified for Johnson Controls, Schneider Electric, Honeywell & Tridium. End-to-end delivery — design, supply, install, commission. Free consultation.',
    keywords: ['BMS installation Abu Dhabi','building management system UAE','BMS contractor Abu Dhabi','BMS design UAE','building automation Abu Dhabi','HVAC BMS integration','Johnson Controls Metasys Abu Dhabi','Schneider EcoStruxure UAE'],
    color: '#2F80ED',
    features: [
      { title: 'Full System Design', desc: 'Point-of-delivery engineering drawings, I/O schedules, network architecture diagrams, and sequence of operations documentation.' },
      { title: 'Multi-Brand Certification', desc: 'Authorised to install and commission Johnson Controls Metasys, Schneider EcoStruxure, Honeywell Compass/Ascent, Tridium Niagara N4, Trend IQ, and Hager systems.' },
      { title: 'HVAC Integration', desc: 'Full integration of chillers, AHUs, FCUs, VAV boxes, boilers, cooling towers, and VFDs into a single supervisory layer.' },
      { title: 'Open Protocol Support', desc: 'BACnet IP/MSTP, Modbus RTU/TCP, LonWorks, KNX, and OPC-UA connectivity ensuring your BMS integrates with third-party systems.' },
      { title: 'Commissioning & Testing', desc: 'Point-by-point commissioning, functional testing, and performance verification against design intent before handover.' },
      { title: 'Owner Training', desc: 'Structured training programmes for facilities teams covering daily operation, alarm management, and basic troubleshooting.' },
    ],
    deliverables: ['Engineering design package (drawings, schedules, I/O list)','Equipment supply and installation','Controller programming and graphics development','Full functional commissioning report','As-built documentation','Operator training','Defects liability support'],
    sectors: ['Hotels & Hospitality','Commercial Offices','Industrial Facilities','Healthcare','Retail & Mixed-Use','Residential Towers'],
    faqs: [
      { q: 'How long does a BMS installation typically take?', a: 'Timeline depends on building size and complexity. A typical mid-size commercial building (50,000–100,000 ft²) takes 12–20 weeks from design sign-off to commissioning completion. We provide a detailed programme at tender stage.' },
      { q: 'Can you install a BMS in a building that already has one?', a: 'Yes. We specialise in BMS upgrades and migrations — replacing legacy controllers while keeping the building operational, and integrating existing subsystems where possible to protect prior investment.' },
      { q: 'Which BMS brand do you recommend?', a: 'We are vendor-neutral. We assess your facility, existing infrastructure, long-term support requirements, and budget — then recommend the platform that genuinely suits you best, not one we have a sales incentive for.' },
      { q: 'Do you handle both hardware and software?', a: 'Yes — we supply all controllers, sensors, actuators, and networking equipment, and we handle all programming, graphics, and integration work in-house.' },
    ],
    relatedSlugs: ['energy-management','annual-maintenance','automatic-control-systems'],
  },
  {
    slug: 'energy-management',
    name: 'Energy Management Solutions',
    shortName: 'Energy Management',
    tagline: 'Real-time monitoring, demand control, and measurable energy cost reduction.',
    overview:
      'Al Taqa Technical designs and deploys energy management systems that give facility managers real-time visibility of every kWh, litre, and BTU consumed across their building. By combining advanced metering infrastructure with BMS integration and analytical dashboards, we help clients in Abu Dhabi reduce energy expenditure by 15–30%, meet UAE sustainability targets, and build the data foundation for ESG reporting.',
    metaTitle: 'Energy Management Systems Abu Dhabi | Energy Audit UAE | Al Taqa Technical',
    metaDescription: 'Energy management solutions for commercial and industrial facilities in Abu Dhabi. Real-time monitoring, energy audits, demand control, and 15–30% cost reduction. UAE sustainability compliance.',
    keywords: ['energy management Abu Dhabi','energy management system UAE','energy audit Abu Dhabi','building energy monitoring UAE','energy saving solutions Abu Dhabi','net zero UAE buildings','energy efficiency contractor Abu Dhabi'],
    color: '#10B981',
    features: [
      { title: 'Energy Audits', desc: 'ASHRAE Level 1–2 energy audits identifying your top consumption drivers and quantifying saving opportunities with payback analysis.' },
      { title: 'Sub-Metering Infrastructure', desc: 'Electricity, water, BTU, and gas sub-meters at tenant, floor, and system level — giving you granular consumption data for billing and benchmarking.' },
      { title: 'Demand Management', desc: 'Peak demand limiting strategies and load-shedding sequences that reduce maximum demand charges on your utility tariff.' },
      { title: 'Analytics Dashboard', desc: 'Cloud-based or on-premise dashboards showing live consumption, trending, benchmarks, anomaly detection, and automated exception reports.' },
      { title: 'BMS Integration', desc: 'Energy data fed directly into your BMS or SCADA for a single-pane-of-glass view of building performance.' },
      { title: 'ESG & Compliance Reporting', desc: 'Automated monthly and annual energy reports aligned with UAE regulatory requirements and international ESG frameworks.' },
    ],
    deliverables: ['Energy audit report with prioritised recommendations','Sub-metering design and installation','Analytics platform configuration','Baseline and KPI establishment','Monthly energy reporting','Ongoing optimisation recommendations'],
    sectors: ['Commercial Offices','Hotels & Hospitality','Industrial Facilities','Healthcare','Government Buildings','District Cooling Customers'],
    faqs: [
      { q: 'How much can a BMS and energy management system actually save?', a: 'Based on published benchmarks and our project data, buildings without a BMS typically achieve 20–30% savings upon installation. Buildings upgrading from legacy systems see 10–15%. Use our free Energy Savings Calculator for an estimate specific to your facility.' },
      { q: 'Do you carry out energy audits independently of a full BMS project?', a: 'Yes. We offer standalone energy audits, which we recommend as the starting point for any major capex decision. The audit gives you an evidence base for whatever solution you choose — including other contractors.' },
      { q: 'Can the monitoring system integrate with our tenant billing software?', a: 'Yes. We install M-Bus and Modbus-compatible sub-meters that connect to most utility billing platforms, including our own and third-party software.' },
    ],
    relatedSlugs: ['bms-installation','smart-metering','annual-maintenance'],
  },
  {
    slug: 'annual-maintenance',
    name: 'Annual Maintenance Contracts',
    shortName: 'Annual Maintenance',
    tagline: 'Brand-agnostic BMS maintenance and 24/7 emergency support across the UAE.',
    overview:
      'Al Taqa Technical provides comprehensive Annual Maintenance Contracts (AMC) for BMS, building automation, and control systems across Abu Dhabi and the wider UAE. Our AMC service is fully brand-agnostic — we maintain systems installed by any contractor on any platform, eliminating the need to retain the original installer. Preventive maintenance schedules, 24/7 emergency response, and performance optimisation are included as standard.',
    metaTitle: 'BMS Annual Maintenance Contract Abu Dhabi | AMC UAE | Al Taqa Technical',
    metaDescription: 'BMS annual maintenance contracts in Abu Dhabi and UAE. Brand-agnostic support for Johnson Controls, Schneider, Honeywell, Tridium. 24/7 emergency response. Free AMC consultation.',
    keywords: ['BMS maintenance Abu Dhabi','annual maintenance contract UAE','AMC BMS Abu Dhabi','building automation maintenance UAE','Honeywell BMS maintenance Abu Dhabi','BMS support Abu Dhabi','24/7 BMS support UAE'],
    color: '#F59E0B',
    features: [
      { title: 'Preventive Maintenance Visits', desc: 'Scheduled quarterly or bi-annual on-site visits covering controller health checks, sensor calibration, actuator testing, and network verification.' },
      { title: '24/7 Emergency Response', desc: 'Round-the-clock call-out support with guaranteed response times for critical system failures affecting comfort, safety, or energy performance.' },
      { title: 'Software & Firmware Updates', desc: 'Regular software patches, firmware updates, and licence renewals to keep your BMS current and secure.' },
      { title: 'Trend Analysis & Reporting', desc: 'Monthly system health reports highlighting fault trends, recurring alarms, and recommendations to avoid future downtime.' },
      { title: 'Spare Parts Management', desc: 'Pre-agreed critical spare parts holding — controllers, I/O modules, sensors — to minimise repair turnaround time.' },
      { title: 'Brand-Agnostic Coverage', desc: 'We maintain all major BMS platforms regardless of who installed them. One contractor, one contract, total coverage.' },
    ],
    deliverables: ['Signed AMC with defined response time SLAs','Preventive maintenance schedule and visit reports','Monthly system health dashboard','Emergency call-out log and resolution records','Annual system performance review','Spare parts inventory report'],
    sectors: ['Hotels & Hospitality','Commercial Offices','Industrial Facilities','Healthcare','Government Buildings','Retail & Mixed-Use'],
    faqs: [
      { q: 'Can you maintain a BMS that another company installed?', a: 'Yes — this is one of our most common AMC engagements. We perform a system audit first to document the current configuration, then take over full maintenance responsibility.' },
      { q: 'What is your emergency response time?', a: 'Our standard AMC includes a 4-hour on-site response for critical faults and a 2-hour remote response for all other issues, 24 hours a day, 7 days a week.' },
      { q: 'Are spare parts included in the AMC price?', a: 'Standard consumables and small components are included. Major hardware (controllers, large actuators) are quoted separately unless a parts-inclusive contract is agreed upfront.' },
      { q: 'How is the AMC priced?', a: 'Pricing is based on system size (number of points), platform, site access requirements, and desired service level. Contact us for a free AMC scoping visit and quotation.' },
    ],
    relatedSlugs: ['bms-installation','energy-management','automatic-control-systems'],
  },
  {
    slug: 'guest-room-management',
    name: 'Guest Room Management Systems',
    shortName: 'GRMS',
    tagline: 'Intelligent room automation delivering guest comfort and significant energy savings for hotels.',
    overview:
      'Al Taqa Technical specialises in Guest Room Management Systems (GRMS) for hotels, resorts, and serviced apartments across the UAE. Our GRMS solutions integrate room climate control, lighting, curtains, DND/MUR signalling, and energy management into a single intelligent platform — improving the guest experience while typically reducing room energy consumption by 25–40% through occupancy-based automation.',
    metaTitle: 'Guest Room Management System GRMS Abu Dhabi | Hotel BMS UAE | Al Taqa Technical',
    metaDescription: 'Guest Room Management Systems (GRMS) for hotels in Abu Dhabi and UAE. Occupancy-based HVAC, lighting, and energy automation. Reduce room energy costs by 25–40%. Free hotel BMS consultation.',
    keywords: ['guest room management system UAE','GRMS Abu Dhabi','hotel BMS UAE','hotel room automation Abu Dhabi','hotel energy management UAE','hospitality building automation','DND MUR system hotel UAE'],
    color: '#8B5CF6',
    features: [
      { title: 'Occupancy-Based Automation', desc: 'PIR and door contact sensors detect occupancy state — automatically adjusting HVAC setpoints and lighting to save energy without impacting guest comfort.' },
      { title: 'Climate Control Integration', desc: 'Direct integration with FCUs, fan coil controllers, and thermostats. Guests control temperature from the in-room panel while the system enforces energy-efficient limits.' },
      { title: 'Lighting & Scene Control', desc: 'Welcome, sleep, wake-up, and DND scenes controllable from bedside panels, tablets, or mobile apps. Integrates with KNX, DALI, and 0-10V lighting systems.' },
      { title: 'DND / MUR Signalling', desc: 'Do Not Disturb and Make Up Room signals integrated with the front desk and housekeeping management systems.' },
      { title: 'Central Dashboard', desc: 'Engineering and front-office dashboards showing real-time room status, energy consumption per room, and maintenance alerts.' },
      { title: 'PMS Integration', desc: 'Connection to Opera PMS and other property management systems — rooms are automatically set to arrive or depart mode based on reservation status.' },
    ],
    deliverables: ['GRMS design and room-by-room point schedule','Equipment supply and installation','In-room panel and controller programming','PMS and BMS integration','Energy performance baseline and monitoring','Engineering and front desk training'],
    sectors: ['5-Star Hotels','4-Star Hotels','Hotel Apartments','Resorts','Serviced Residences'],
    faqs: [
      { q: 'Can GRMS be retrofitted into an existing hotel?', a: 'Yes. We have retrofitted GRMS into operating hotels with minimal guest disruption by working floor-by-floor during low-occupancy periods. Wireless options are available to reduce cabling requirements.' },
      { q: 'How much energy can a GRMS save per room?', a: 'Typically 25–40% of room HVAC and lighting energy. On a 300-room hotel, this can represent AED 300,000–600,000 per year in savings depending on current energy costs.' },
      { q: 'Which GRMS platforms do you work with?', a: 'We work with Honeywell INNCOM, Schneider Electric, and custom open-protocol GRMS platforms. We recommend the best fit for your property size, brand standard, and budget.' },
    ],
    relatedSlugs: ['bms-installation','energy-management','annual-maintenance'],
  },
  {
    slug: 'smart-metering',
    name: 'Smart Metering Solutions',
    shortName: 'Smart Metering',
    tagline: 'BTU, water, electricity, and gas sub-metering for commercial and industrial facilities.',
    overview:
      'Al Taqa Technical designs, supplies, and installs advanced smart metering infrastructure for commercial buildings, industrial facilities, and multi-tenant developments across Abu Dhabi and the UAE. Our solutions cover thermal energy (BTU), water, electricity, and gas — providing the granular data needed for tenant billing, sustainability reporting, and operational cost reduction.',
    metaTitle: 'Smart Metering Solutions Abu Dhabi | BTU Meters UAE | Utility Sub-Metering | Al Taqa Technical',
    metaDescription: 'Smart metering and sub-metering solutions in Abu Dhabi, UAE. BTU meters, water meters, M-Bus gateways, and tenant billing systems. DEWA-compatible metering for commercial and industrial facilities.',
    keywords: ['smart metering Abu Dhabi','BTU meter UAE','sub-metering system Abu Dhabi','utility metering UAE','tenant billing system Abu Dhabi','M-Bus gateway UAE','district cooling metering','water sub-metering Abu Dhabi'],
    color: '#06B6D4',
    features: [
      { title: 'BTU / Thermal Energy Metering', desc: 'Static ultrasonic BTU meters for district cooling and chilled water circuits — measuring supply/return temperatures and flow rate to calculate actual thermal energy consumption.' },
      { title: 'Water Sub-Metering', desc: 'Pulse and M-Bus water meters for domestic cold water, irrigation, and cooling tower makeup — enabling leak detection and tenant allocation.' },
      { title: 'Electricity Sub-Metering', desc: 'Three-phase and single-phase energy meters at distribution board level for tenant, floor, and equipment sub-billing.' },
      { title: 'M-Bus & LoRaWAN Networks', desc: 'Wired M-Bus or wireless LoRaWAN meter reading networks — collecting all meter data automatically into a central data management system.' },
      { title: 'Tenant Billing Integration', desc: 'Meter data exported to billing software for automated utility invoicing, cost recovery, and dispute resolution.' },
      { title: 'Leak & Anomaly Detection', desc: 'Automated alerts when consumption deviates from expected patterns — detecting leaks, faulty equipment, or billing anomalies early.' },
    ],
    deliverables: ['Metering design and point schedule','Equipment supply and installation','M-Bus or LoRaWAN network commissioning','Data management system configuration','Billing software integration','Commissioning test results and calibration records'],
    sectors: ['Multi-Tenant Commercial','District Cooling Customers','Industrial Facilities','Hotels','Government Buildings','Free Zone Developments'],
    faqs: [
      { q: 'Are your BTU meters approved for district cooling billing in Abu Dhabi?', a: 'Yes. We supply QUNDIS and equivalent meters that meet the accuracy and communication requirements of district cooling operators in the UAE. Contact us to confirm compatibility with your specific operator.' },
      { q: 'Can meters be read remotely?', a: 'Yes. All our metering installations include an M-Bus or LoRaWAN gateway that collects readings automatically at configurable intervals (typically every 15–60 minutes) and transmits them to a central server.' },
      { q: 'Can you integrate with an existing building management system?', a: 'Yes. Meter data can be fed into any BACnet, Modbus, or OPC-UA compatible BMS, giving facility managers a unified view of both operational and utility data.' },
    ],
    relatedSlugs: ['energy-management','bms-installation','annual-maintenance'],
  },
  {
    slug: 'automatic-control-systems',
    name: 'Automatic Control Systems',
    shortName: 'Control Systems',
    tagline: 'PLC, SCADA, and field controller solutions for industrial and building applications.',
    overview:
      'Al Taqa Technical designs, programs, and commissions automatic control systems — from simple DDC controllers for building HVAC applications to complex PLC-based control panels for industrial processes and critical plant rooms. Our in-house panel fabrication, programming, and commissioning capability covers a wide range of applications across Abu Dhabi and the UAE.',
    metaTitle: 'Automatic Control Systems Abu Dhabi | PLC SCADA UAE | DDC Controllers | Al Taqa Technical',
    metaDescription: 'Automatic control systems, PLC panels, and SCADA solutions in Abu Dhabi, UAE. DDC controllers for HVAC, chiller plant, and industrial automation. In-house design, fabrication, and commissioning.',
    keywords: ['automatic control systems Abu Dhabi','PLC systems UAE','SCADA Abu Dhabi','DDC controller UAE','chiller plant control Abu Dhabi','industrial automation UAE','control panel fabrication Abu Dhabi','HVAC controls UAE'],
    color: '#EF4444',
    features: [
      { title: 'DDC Controller Programming', desc: 'Programming and commissioning of Direct Digital Controllers for HVAC plant — AHUs, FCUs, chillers, cooling towers, boilers, and variable speed drives.' },
      { title: 'PLC Control Panels', desc: 'In-house design, fabrication, and programming of PLC panels for industrial process control, pump and fan duty/standby automation, and critical utility plant.' },
      { title: 'SCADA Systems', desc: 'SCADA design and implementation for real-time monitoring and supervisory control of distributed plant and process equipment.' },
      { title: 'Chiller Plant Optimisation', desc: 'Advanced sequencing and reset strategies for chiller plants reducing energy consumption by 10–20% while maintaining system reliability.' },
      { title: 'Commissioning & Functional Testing', desc: 'Rigorous loop checking, functional acceptance testing, and performance verification against design specifications before handover.' },
      { title: 'System Integration', desc: 'Connecting control systems to BMS, SCADA, energy management, and fire and life safety systems via open communication protocols.' },
    ],
    deliverables: ['Control system design and schematics','Panel fabrication and testing','Controller programming and configuration','On-site commissioning and loop checking','Functional acceptance test reports','As-built drawings and O&M documentation'],
    sectors: ['Chiller Plant Rooms','Industrial Facilities','Data Centres','Commercial Buildings','Healthcare','Utilities & Infrastructure'],
    faqs: [
      { q: 'Do you fabricate control panels in-house?', a: 'Yes. We have in-house panel fabrication capability for DDC, PLC, and MCC panels, allowing us to control quality, lead times, and testing before panels leave our workshop.' },
      { q: 'Can you upgrade an existing PLC system without replacing the hardware?', a: 'Often yes — we can reprogram existing PLCs, upgrade software to current versions, and add network connectivity to legacy systems, extending their life at significantly lower cost than full replacement.' },
      { q: 'What PLC brands do you work with?', a: 'We work with Siemens S7 and S1200/1500 series, Allen-Bradley/Rockwell, Schneider Modicon, and various DDC brands including JCI, Honeywell, Trend, and Distech Controls.' },
    ],
    relatedSlugs: ['bms-installation','energy-management','annual-maintenance'],
  },
]

export function getServiceDataBySlug(slug: string): ServiceData | undefined {
  return servicesData.find(s => s.slug === slug)
}
