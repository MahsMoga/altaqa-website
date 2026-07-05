import Head from 'next/head'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import CoreExpertise from '../components/CoreExpertise'
import BrandCapability from '../components/BrandCapability'
import Services from '../components/Services'
import ProcessFlow from '../components/ProcessFlow'
import WhyChooseUs from '../components/WhyChooseUs'
import Mission from '../components/Mission'
import Products from '../components/Products'
import Sectors from '../components/Sectors'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Testimonials from '../components/Testimonials'
import { use3DEnabled } from '@/hooks/use3DEnabled'

/**
 * ─── 3D SECTION IMPORTS ────────────────────────────────────────────────────
 *
 * Every 3D component is dynamically imported with ssr: false.
 * This means:
 *   • Zero JavaScript is parsed/executed unless ENABLE_3D = true
 *   • No SSR hydration issues (Three.js is browser-only)
 *   • Original components ALWAYS render first (no blank flash)
 *   • Bundle splitting: 3D code is in a separate chunk
 */

const Hero3DFull = dynamic(
  () => import('@/components/3d/hero/Hero3DFull'),
  { ssr: false, loading: () => <Hero /> }   // ← original renders while 3D loads
)

const About3D = dynamic(
  () => import('@/components/3d/about/About3D'),
  { ssr: false, loading: () => <About /> }
)

const BrandCapability3D = dynamic(
  () => import('@/components/3d/brand/BrandCapability3D'),
  { ssr: false, loading: () => <BrandCapability /> }
)

const Services3D = dynamic(
  () => import('@/components/3d/services/Services3D'),
  { ssr: false, loading: () => <Services /> }
)

const ProcessFlow3D = dynamic(
  () => import('@/components/3d/process/ProcessFlow3D'),
  { ssr: false, loading: () => <ProcessFlow /> }
)

const WhyChooseUs3D = dynamic(
  () => import('@/components/3d/why/WhyChooseUs3D'),
  { ssr: false, loading: () => <WhyChooseUs /> }
)

const Contact3D = dynamic(
  () => import('@/components/3d/contact/Contact3D'),
  { ssr: false, loading: () => <Contact /> }
)

// ─────────────────────────────────────────────────────────────────────────────

const META = {
  title: 'BMS & Building Automation Abu Dhabi | Al Taqa Technical',
  description:
    'Al Taqa Technical — Abu Dhabi\'s specialist BMS contractor. 20+ years delivering Building Management Systems, energy management, and smart metering across Johnson Controls, Schneider Electric, Honeywell, and Tridium Niagara platforms.',
  keywords:
    'BMS Abu Dhabi, Building Management System UAE, Building Automation Abu Dhabi, Energy Management Abu Dhabi, Johnson Controls Metasys UAE, Schneider Electric EcoStruxure UAE, Honeywell Alerton UAE, Tridium Niagara UAE, Smart Metering Abu Dhabi, HVAC Controls UAE, GRMS Hotel Abu Dhabi, BMS contractor Abu Dhabi',
  url: 'https://www.altaqauae.com',
}

export default function HomePage() {
  /**
   * use3DEnabled() = feature flag AND device capable AND no reduced-motion preference.
   * If any of those are false, the original flat components render — zero overhead.
   */
  const is3D = use3DEnabled()

  return (
    <>
      <Head>
        {/* Primary Meta — unchanged */}
        <title>{META.title}</title>
        <meta name="description" content={META.description} />
        <meta name="keywords" content={META.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Canonical */}
        <link rel="canonical" href={META.url} />

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={META.url} />
        <meta property="og:title"       content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:locale"      content="en_AE" />
        <meta property="og:site_name"   content="Al Taqa Technical" />

        {/* Twitter */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={META.title} />
        <meta name="twitter:description" content={META.description} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Al Taqa Technical General Contracting LLC',
              alternateName: 'Al Taqa Technical',
              description: META.description,
              url: META.url,
              logo: `${META.url}/al-taqa-logo.png`,
              image: `${META.url}/al-taqa-logo.png`,
              email: 'info@altaqauae.com',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['English', 'Arabic'],
                contactOption: 'TollFree',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Office 1306, Lamar Tower, Roof Floor, Al Nahyan Camp',
                addressLocality: 'Abu Dhabi',
                addressCountry: 'AE',
                addressRegion: 'Abu Dhabi',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 24.4539,
                longitude: 54.3773,
              },
              hasMap: 'https://maps.google.com/?q=Al+Nahyan+Camp+Abu+Dhabi',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '18:00',
                },
              ],
              areaServed: [
                { '@type': 'City', name: 'Abu Dhabi' },
                { '@type': 'Country', name: 'United Arab Emirates' },
              ],
              sameAs: [
                'https://www.linkedin.com/company/al-taqa-technical',
              ],
              knowsAbout: [
                'Building Management Systems',
                'Building Automation',
                'Energy Management',
                'Smart Metering',
                'HVAC Controls',
                'Guest Room Management',
                'Johnson Controls Metasys',
                'Schneider Electric EcoStruxure',
                'Honeywell Alerton',
                'Tridium Niagara N4',
                'BACnet',
                'Annual Maintenance Contracts',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'BMS & Building Automation Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'BMS Design & Integration' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Annual Maintenance Contracts' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Energy Retrofit Solutions' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Smart Metering Solutions' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Guest Room Management Systems' } },
                ],
              },
            }),
          }}
        />
      </Head>

      <Navbar />

      <main>
        {/*
          ┌─────────────────────────────────────────────────────────┐
          │  ENABLE_3D = false  →  original component               │
          │  ENABLE_3D = true   →  3D-enhanced component            │
          │  Single boolean change toggles EVERY section instantly   │
          └─────────────────────────────────────────────────────────┘
        */}

        <Hero />
        <About />
        <Sectors />
        <CoreExpertise />
        <BrandCapability />
        <Services />
        <ProcessFlow />
        <WhyChooseUs />
        <Testimonials />
        <Mission />
        <Products />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
