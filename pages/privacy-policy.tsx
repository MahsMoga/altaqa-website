import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const LAST_UPDATED = '1 July 2025'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Al Taqa Technical</title>
        <meta name="description" content="Privacy Policy for Al Taqa Technical General Contracting LLC — how we collect, use, and protect your personal data." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.altaqauae.com/privacy-policy" />
      </Head>

      <Navbar />

      <main className="bg-white min-h-screen">
        {/* Hero band */}
        <div className="bg-navy pt-32 pb-16">
          <div className="container-narrow">
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Legal</p>
            <h1 className="font-display text-white text-3xl lg:text-4xl font-bold leading-tight">
              Privacy Policy
            </h1>
            <p className="text-white/50 text-sm mt-3">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        {/* Content */}
        <div className="container-narrow py-16 max-w-3xl">
          <div className="prose prose-slate max-w-none space-y-10 text-sm leading-relaxed text-slate-600">

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">1. Who We Are</h2>
              <p>
                Al Taqa Technical General Contracting LLC (&ldquo;Al Taqa Technical&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
                is a building management systems and automation contractor registered and operating in Abu Dhabi,
                United Arab Emirates. Our registered office is at Office 1306, Lamar Tower, Roof Floor,
                Al Nahyan Camp, Abu Dhabi, UAE.
              </p>
              <p className="mt-3">
                We are committed to protecting the personal data of everyone who interacts with our website
                at <a href="https://www.altaqauae.com" className="text-accent hover:underline">www.altaqauae.com</a> and
                our business services, in accordance with the UAE Federal Decree-Law No. 45 of 2021 on
                the Protection of Personal Data (PDPL).
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">2. Information We Collect</h2>
              <p>We may collect the following categories of personal data:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-navy">Contact information</strong> — name, email address, company name, and any details you provide via our contact form or WhatsApp.</li>
                <li><strong className="text-navy">Technical data</strong> — IP address, browser type, pages visited, and time spent on our website, collected automatically via cookies and analytics tools.</li>
                <li><strong className="text-navy">Communication records</strong> — emails, WhatsApp messages, and enquiries you send to us.</li>
                <li><strong className="text-navy">Project information</strong> — details about your facility, existing BMS setup, or project requirements that you share with us for the purpose of receiving a quotation or service.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">3. How We Use Your Information</h2>
              <p>We use your personal data only for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>To respond to your enquiries and provide technical consultations.</li>
                <li>To prepare and deliver quotations, proposals, and service agreements.</li>
                <li>To perform contracted services and manage our client relationships.</li>
                <li>To send relevant service updates or technical information where you have consented.</li>
                <li>To improve our website and services based on aggregate usage analytics.</li>
                <li>To comply with applicable UAE laws, regulations, and legal obligations.</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or trade your personal data to third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">4. Legal Basis for Processing</h2>
              <p>We process your personal data on the following legal grounds:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong className="text-navy">Contractual necessity</strong> — to fulfil a contract or take steps at your request prior to entering a contract.</li>
                <li><strong className="text-navy">Legitimate interests</strong> — to respond to enquiries and improve our services.</li>
                <li><strong className="text-navy">Legal compliance</strong> — where processing is required by UAE law.</li>
                <li><strong className="text-navy">Consent</strong> — where you have explicitly agreed, for example to receive marketing communications.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">5. Data Sharing</h2>
              <p>
                We may share your data with trusted third-party service providers who assist in operating
                our website or conducting our business (for example, email hosting, cloud storage), subject
                to appropriate data processing agreements. These parties are contractually bound to keep
                your data confidential and use it only for the specific purpose we have engaged them for.
              </p>
              <p className="mt-3">
                We may disclose your data if required by UAE law, a court order, or a governmental or
                regulatory authority.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">6. Cookies</h2>
              <p>
                Our website uses essential cookies to ensure the site functions correctly. We may also use
                analytics cookies (such as Google Analytics) to understand how visitors use our website.
                You can control cookies through your browser settings. Disabling cookies may affect some
                functionality of the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">7. Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary to fulfil the purpose for which it
                was collected, or as required by UAE law. Enquiry data is typically retained for up to
                3 years. Client project data is retained for the duration of the contract and up to 7 years
                thereafter for legal and regulatory compliance.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">8. Your Rights</h2>
              <p>Under the UAE PDPL, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate or incomplete data.</li>
                <li>Request deletion of your data, subject to legal obligations.</li>
                <li>Object to or restrict processing of your data in certain circumstances.</li>
                <li>Withdraw consent at any time where processing is based on consent.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:info@altaqauae.com" className="text-accent hover:underline">info@altaqauae.com</a>.
                We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">9. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal data
                against unauthorised access, alteration, disclosure, or destruction. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top
                of this page reflects when the most recent changes were made. Continued use of our website
                after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-navy font-bold text-lg mb-3">11. Contact Us</h2>
              <p>For any privacy-related questions or to exercise your rights, please contact:</p>
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
