import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Terms of Service - ClickOrSkip',
  description: 'Terms of service for ClickOrSkip.online - rules and guidelines for using our travel destination finder.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] py-16">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#6366f1] hover:text-[#8b5cf6] mb-8 transition-colors"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-[#a1a1aa] mb-6">
            <strong>Last Updated:</strong> February 12, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-[#a1a1aa] mb-4">
              By accessing and using ClickOrSkip (clickorskip.online), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="text-[#a1a1aa] mb-4">
              ClickOrSkip is a travel destination discovery platform that helps users find travel destinations based on their preferences. We provide:
            </p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>An AI-powered travel quiz/chat to match you with destinations</li>
              <li>Links to third-party booking services for flights, hotels, and activities</li>
              <li>Travel deals and recommendations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. Affiliate Disclosure</h2>
            <p className="text-[#a1a1aa] mb-4">
              <strong>Important:</strong> ClickOrSkip is a participant in affiliate marketing programs. This means we may earn a commission when you click on links to third-party websites and make a purchase. This does not affect the price you pay.
            </p>
            <p className="text-[#a1a1aa] mb-4">
              Our recommendations are based on our matching algorithm and editorial judgment. We strive to provide valuable, honest recommendations regardless of affiliate relationships.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. Third-Party Services</h2>
            <p className="text-[#a1a1aa] mb-4">
              Our website contains links to third-party websites and services (such as airlines, hotels, and booking platforms). We are not responsible for:
            </p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>The content, accuracy, or availability of third-party websites</li>
              <li>Transactions you complete on third-party websites</li>
              <li>The privacy practices of third-party websites</li>
              <li>Any damages or losses from using third-party services</li>
            </ul>
            <p className="text-[#a1a1aa] mt-4">
              All bookings are made directly with the respective travel providers, and you are subject to their terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">5. Accuracy of Information</h2>
            <p className="text-[#a1a1aa] mb-4">
              While we strive to provide accurate and up-to-date information:
            </p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>Prices, availability, and deals may change without notice</li>
              <li>Travel information may become outdated</li>
              <li>We do not guarantee the accuracy of AI-generated recommendations</li>
            </ul>
            <p className="text-[#a1a1aa] mt-4">
              Always verify important travel details directly with service providers before booking.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">6. User Conduct</h2>
            <p className="text-[#a1a1aa] mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Scrape or collect data from our website without permission</li>
              <li>Use automated systems to access the service excessively</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">7. Intellectual Property</h2>
            <p className="text-[#a1a1aa] mb-4">
              All content on ClickOrSkip, including text, graphics, logos, and software, is our property or the property of our licensors and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-[#a1a1aa] mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
            </p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>The service will be uninterrupted or error-free</li>
              <li>Results obtained will be accurate or reliable</li>
              <li>Any particular travel outcomes will be achieved</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p className="text-[#a1a1aa] mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLICKORSKIP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>Lost profits or revenue</li>
              <li>Travel disruptions or cancellations</li>
              <li>Issues with third-party bookings</li>
              <li>Data loss</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">10. Indemnification</h2>
            <p className="text-[#a1a1aa] mb-4">
              You agree to indemnify and hold harmless ClickOrSkip from any claims, damages, or expenses arising from your use of the service or violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">11. Changes to Terms</h2>
            <p className="text-[#a1a1aa] mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">12. Governing Law</h2>
            <p className="text-[#a1a1aa] mb-4">
              These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">13. Contact</h2>
            <p className="text-[#a1a1aa] mb-4">
              For questions about these Terms of Service, contact us at:
            </p>
            <p className="text-[#a1a1aa]">
              Email: legal@clickorskip.online<br />
              Website: clickorskip.online
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
