import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const LAST_UPDATED = '1 July 2025'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Al Taqa Technical</title>
        <meta name="description" content="Terms and Conditions for Al Taqa Technical General Contracting LLC — governing use of our website and services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.altaqauae.com/terms" />
      </Head>

      <Navbar />

      <main className="bg-white min-h-screen">
        {/* Hero band */}
        <div className="bg-navy pt-32 pb-16">
          <div className="container-narrow">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Legal</p>
            <h1 className="font-display text-white text-3xl lg:text-4xl font-bold leading-tight">
              Terms & Conditions
            </h1>
            <p className="text-white/50 text-sm mt-3">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-narrow py-16 max-w-3xl">
          <div className="prose prose-slate max-w-none space-y-10 text-sm leading-relaxed text-slate-600">

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">1. Introduction</h2>
              <p>
                These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the website located at{' '}
                <a href="https://www.altaqauae.com" className="text-accent hover:underline">www.altaqauae.com</a>{' '}
                and any services provided by Al Taqa Technical General Contracting LLC
                (&ldquo;Al Taqa Technical&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a company registered in Abu Dhabi,
                United Arab Emirates.
              </p>
              <p className="mt-3">
                By accessing our website or engaging our services, you agree to be bound by these Terms.
                If you do not agree, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">2. Services</h2>
              <p>
                Al Taqa Technical provides building management systems (BMS) design, installation,
                commissioning, maintenance, energy management, smart metering, and related automation
                services. The specific scope, deliverables, timelines, and commercial terms of any
                engagement are governed by the written proposal, purchase order, or service agreement
                executed between Al Taqa Technical and the client.
              </p>
              <p className="mt-3">
                Nothing on this website constitutes a binding offer or contract. All enquiries submitted
                via our contact form or WhatsApp are treated as expressions of interest only, pending
                a formal written agreement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">3. Website Use</h2>
              <p>You agree to use this website only for lawful purposes and in a manner that does not:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Infringe the rights of any third party.</li>
                <li>Transmit any unsolicited or unauthorised advertising or promotional material.</li>
                <li>Attempt to gain unauthorised access to any part of the website or its related systems.</li>
                <li>Introduce any viruses, malicious code, or harmful material.</li>
                <li>Reproduce, duplicate, or resell any part of this website without our prior written consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">4. Intellectual Property</h2>
              <p>
                All content on this website — including text, graphics, logos, icons, images, and software
                — is the property of Al Taqa Technical General Contracting LLC or its content suppliers
                and is protected by applicable UAE intellectual property laws.
              </p>
              <p className="mt-3">
                You may view, download, and print pages from the website for personal, non-commercial use,
                provided you do not modify the content and retain all copyright and proprietary notices.
                Any other use requires our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">5. Disclaimer of Warranties</h2>
              <p>
                This website and its content are provided &ldquo;as is&rdquo; without any warranties, express or
                implied, including but not limited to warranties of merchantability, fitness for a
                particular purpose, or non-infringement. We do not warrant that the website will be
                uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
              <p className="mt-3">
                Technical information, product specifications, and service descriptions on this website
                are provided for general guidance only and may be updated without notice. Always confirm
                current specifications with our engineering team before making procurement or design decisions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by UAE law, Al Taqa Technical shall not be liable for
                any direct, indirect, incidental, special, consequential, or punitive damages arising
                from your use of, or inability to use, this website or its content.
              </p>
              <p className="mt-3">
                Our total liability in relation to any service engagement shall be limited to the value
                of the specific contract or purchase order under which the claim arises, as set out in
                the governing service agreement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites for your convenience. These links
                do not constitute an endorsement of those websites or their content. We are not responsible
                for the content, privacy practices, or availability of any linked third-party sites.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">8. Privacy</h2>
              <p>
                Your use of this website is also governed by our{' '}
                <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a>,
                which is incorporated into these Terms by reference. Please review it carefully.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">9. Governing Law & Jurisdiction</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the United Arab
                Emirates and, where applicable, the laws of the Emirate of Abu Dhabi. Any disputes
                arising from or in connection with these Terms or our services shall be subject to the
                exclusive jurisdiction of the courts of Abu Dhabi, UAE.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">10. Changes to These Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. The &ldquo;Last updated&rdquo; date at the
                top of this page will be revised accordingly. Continued use of the website after any
                changes constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">11. Contact</h2>
              <p>For any questions regarding these Terms, please contact:</p>
              <div className="mt-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="font-semibold text-navy">Al Taqa Technical General Contracting LLC</p>
                <p>Office 1306, Lamar Tower, Roof Floor, Al Nahyan Camp, Abu Dhabi, UAE</p>
                <p className="mt-1">
                  Email:{' '}
                  <a href="mailto:info@altaqauae.com" className="text-accent hover:underline">info@altaqauae.com</a>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
