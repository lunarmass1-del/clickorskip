import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy - ClickOrSkip',
  description: 'Privacy policy for ClickOrSkip.online - how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] py-16">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#6366f1] hover:text-[#8b5cf6] mb-8 transition-colors"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-[#a1a1aa] mb-6">
            <strong>Last Updated:</strong> February 12, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="text-[#a1a1aa] mb-4">
              ClickOrSkip ("we," "our," or "us") operates clickorskip.online. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <p className="text-[#a1a1aa] mb-4">We may collect information in the following ways:</p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li><strong>Automatically Collected:</strong> IP address, browser type, device information, pages visited, and time spent on pages through cookies and analytics.</li>
              <li><strong>Voluntarily Provided:</strong> Email address if you subscribe to our newsletter or contact us.</li>
              <li><strong>Quiz/Chat Data:</strong> Your travel preferences from our quiz are stored locally in your browser (sessionStorage) and are not transmitted to our servers.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-[#a1a1aa] mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>Provide and improve our services</li>
              <li>Send you travel deals and updates (if subscribed)</li>
              <li>Analyze website usage and optimize user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. Affiliate Partnerships & Third Parties</h2>
            <p className="text-[#a1a1aa] mb-4">
              ClickOrSkip participates in affiliate marketing programs. When you click on certain links on our site, you may be redirected to third-party websites (such as airline booking sites, hotel platforms, or travel services). These third parties have their own privacy policies.
            </p>
            <p className="text-[#a1a1aa] mb-4">
              We may receive a commission when you make a purchase through our affiliate links. This does not affect the price you pay.
            </p>
            <p className="text-[#a1a1aa] mb-4">Our affiliate partners include:</p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>Aviasales (flight bookings)</li>
              <li>AirHelp (flight compensation)</li>
              <li>Localrent (car rentals)</li>
              <li>GetTransfer (airport transfers)</li>
              <li>Klook (tours and activities)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">5. Cookies</h2>
            <p className="text-[#a1a1aa] mb-4">
              We use cookies and similar tracking technologies to enhance your experience. These include:
            </p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site.</li>
              <li><strong>Affiliate Cookies:</strong> Track referrals to our partner sites.</li>
            </ul>
            <p className="text-[#a1a1aa] mt-4">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">6. Data Security</h2>
            <p className="text-[#a1a1aa] mb-4">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights (GDPR/CCPA)</h2>
            <p className="text-[#a1a1aa] mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 text-[#a1a1aa] space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
            <p className="text-[#a1a1aa] mt-4">
              To exercise these rights, contact us at privacy@clickorskip.online
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">8. Children's Privacy</h2>
            <p className="text-[#a1a1aa] mb-4">
              Our service is not directed to individuals under 16. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-[#a1a1aa] mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">10. Contact Us</h2>
            <p className="text-[#a1a1aa] mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-[#a1a1aa]">
              Email: privacy@clickorskip.online<br />
              Website: clickorskip.online
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
