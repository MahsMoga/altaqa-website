import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import CoreExpertise from '../components/CoreExpertise'
import BrandCapability from '../components/BrandCapability'
import Services from '../components/Services'
import ProcessFlow from '../components/ProcessFlow'
import WhyChooseUs from '../components/WhyChooseUs'
import Mission from '../components/Mission'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const META = {
  title: 'Al Taqa Technical General Contracting LLC | Building Automation & BMS Abu Dhabi',
  description:
    'Premier provider of Building Management Systems, automation, and energy management solutions in Abu Dhabi. 20+ years of expertise across Johnson Controls, Schneider Electric, Honeywell, and Tridium platforms.',
  keywords:
    'BMS Abu Dhabi, Building Management System UAE, Building Automation Abu Dhabi, Energy Management, Johnson Controls, Schneider Electric EcoStruxure, Honeywell Alerton, Tridium Niagara, Smart Metering, HVAC Controls',
  url: 'https://www.altaqa-technical.ae',
}

export default function HomePage() {
  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>{META.title}</title>
        <meta name="description" content={META.description} />
        <meta name="keywords" content={META.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={META.url} />
        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:locale" content="en_AE" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META.title} />
        <meta name="twitter:description" content={META.description} />

        {/* Structured Data: LocalBusiness */}
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
        <Hero />
        <About />
        <CoreExpertise />
        <BrandCapability />
        <Services />
        <ProcessFlow />
        <WhyChooseUs />
        <Mission />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
