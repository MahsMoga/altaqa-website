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
import Contact from '../components/Contact'
import Footer from '../components/Footer'
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
  title: 'Al Taqa Technical General Contracting LLC | Building Automation & BMS Abu Dhabi',
  description:
    'Premier provider of Building Management Systems, automation, and energy management solutions in Abu Dhabi. 20+ years of expertise across Johnson Controls, Schneider Electric, Honeywell, and Tridium platforms.',
  keywords:
    'BMS Abu Dhabi, Building Management System UAE, Building Automation Abu Dhabi, Energy Management, Johnson Controls, Schneider Electric EcoStruxure, Honeywell Alerton, Tridium Niagara, Smart Metering, HVAC Controls',
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

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={META.url} />
        <meta property="og:title"       content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:locale"      content="en_AE" />

        {/* Twitter */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={META.title} />
        <meta name="twitter:description" content={META.description} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Al Taqa Technical General Contracting LLC',
              description: META.description,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Abu Dhabi',
                addressCountry: 'AE',
              },
              url: META.url,
              areaServed: 'United Arab Emirates',
              knowsAbout: [
                'Building Management Systems',
                'Building Automation',
                'Energy Management',
                'Smart Metering',
                'HVAC Controls',
                'Guest Room Management',
              ],
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
        {is3D ? <About3D />            : <About />}
        <CoreExpertise />
        {is3D ? <BrandCapability3D />  : <BrandCapability />}
        {is3D ? <Services3D />         : <Services />}
        {is3D ? <ProcessFlow3D />      : <ProcessFlow />}
        {is3D ? <WhyChooseUs3D />      : <WhyChooseUs />}
        <Mission />
        <Products />
        {is3D ? <Contact3D />          : <Contact />}
      </main>

      <Footer />
    </>
  )
}
