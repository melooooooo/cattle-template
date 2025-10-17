'use client';

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />
      </div>

      {/* Privacy Content - White */}
      <div className="w-full white-section py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose prose-green max-w-none">
            <p className="mb-4">Last updated: October 17, 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. How We Treat Your Data</h2>
            <p>The Tooth Fae Collective (“we,” “our,” or “us”) respects the mortals who visit <a href="https://thetoothfae.online" className="text-green-600 hover:text-green-800">https://thetoothfae.online</a> and play The Tooth Fae (collectively, the “Services”). This Privacy Policy explains what information we collect, how we use it, and the choices you have. If you do not agree, please refrain from using the Services.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect information in three ways: directly from you, automatically through the Services, and from trusted partners. Examples include:</p>
            <ul className="list-disc ml-6 my-4">
              <li><strong>Account &amp; contact data:</strong> email address, display name, support requests, and preferences you share.</li>
              <li><strong>Gameplay telemetry:</strong> session timestamps, level completion, cabinet progress, trait combinations encountered, crash logs, and device identifiers (such as approximate location by IP, browser version, hardware specs).</li>
              <li><strong>Community interactions:</strong> comments, bug reports, or other content you submit, along with moderation notes.</li>
              <li><strong>Payment touchpoints:</strong> If we ever sell merch or premium content, transactions are processed by third-party processors; we receive limited billing confirmations, not your full card details.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Information</h2>
            <p>We rely on the data above to:</p>
            <ul className="list-disc ml-6 my-4">
              <li>Operate and maintain the Services, including matchmaking, leaderboards, and cabinet syncing.</li>
              <li>Balance traits, identify bugs, and analyze how players interact with mechanics.</li>
              <li>Respond to support tickets, community reports, and legal requests.</li>
              <li>Send essential communications such as patch notes, downtime notices, or security alerts. Promotional messages will always include an opt-out.</li>
              <li>Protect against fraud, cheating, or unauthorized access.</li>
              <li>Comply with legal obligations and enforce our Terms of Service.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Cookies & Analytics</h2>
            <p>We use cookies, local storage, and similar technologies to remember session preferences, keep you logged in, and understand aggregate traffic patterns. Analytics partners (for example, privacy-focused tools like Plausible or Simple Analytics) receive pseudonymized information such as page views, approximate location, and device type; they are contractually prohibited from combining this data with other datasets for profiling.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. When We Share Information</h2>
            <p>We do not sell your personal data. We share information only with:</p>
            <ul className="list-disc ml-6 my-4">
              <li>Service providers who help us host servers, send email, analyze crashes, or moderate community content. They access data solely to perform services on our behalf.</li>
              <li>Legal authorities, if required by law or to protect the rights, property, or safety of the Tooth Fae Collective, our players, or the public.</li>
              <li>Successors in the event we merge, sell, or transfer the Services. We will notify you before your data becomes subject to a different privacy policy.</li>
              <li>Others, when you explicitly direct us to share—such as linking a third-party account or participating in a co-marketed event.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Retention & Deletion</h2>
            <p>We retain personal data for as long as it supports active gameplay, community records, or legitimate business purposes. Telemetry is typically aggregated or anonymized within 18 months. You may request deletion of your personal data by emailing <a href="mailto:privacy@thetoothfae.online" className="text-green-600 hover:text-green-800">privacy@thetoothfae.online</a>; we will honor the request unless we must keep certain records for legal, security, or anti-fraud reasons.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Security</h2>
            <p>We employ industry-standard safeguards—encryption in transit, access controls, regular security reviews—to protect the data we collect. No system is perfectly secure, so we cannot promise absolute protection. Please use unique passwords and notify us immediately of any suspected account compromise.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Players Under 13</h2>
            <p>The Services are not directed to children under 13 (or the minimum age required by local law). We do not knowingly collect personal data from children. If we learn a child has provided personal information, we will delete it and may close the related account.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. International Players</h2>
            <p>Our servers are located in the United States. By using the Services you understand that your information may be transferred to, stored, and processed in the United States or other countries where we or our partners operate. When required, we use standard contractual clauses or similar safeguards for cross-border transfers.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Your Rights & Choices</h2>
            <p>Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing of your personal data. You can exercise these rights by contacting us. You may also opt out of promotional emails via the unsubscribe link and adjust cookie settings through your browser.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy to reflect new features, regulatory requirements, or feedback. When we make material changes we will post a notice on the Site or notify you by email before the changes take effect. Review this page regularly to stay informed.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact</h2>
            <p>If you have privacy questions, data requests, or would like to appeal a previous response, email <a href="mailto:privacy@thetoothfae.online" className="text-green-600 hover:text-green-800">privacy@thetoothfae.online</a>. We aim to respond within 30 days.</p>
          </div>

          <div className="mt-10">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 
