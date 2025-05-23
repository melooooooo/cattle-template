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
            <p className="mb-4">Last updated: June 15, 2023</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>Crazy Cattle Studios ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this Privacy Policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website <a href="https://crazy-cattle3d.org" className="text-green-600 hover:text-green-800">https://crazy-cattle3d.org</a> (the "Site") or play our game Crazy Cattle 3D (the "Game") and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our Site and Game, including information:</p>
            <ul className="list-disc ml-6 my-4">
              <li>By which you may be personally identified, such as name, email address, or any other identifier by which you may be contacted online or offline ("personal information");</li>
              <li>About your internet connection, the equipment you use to access our Site or Game and usage details;</li>
              <li>Non-personal information such as game statistics, scores, and achievements.</li>
            </ul>
            <p>We collect this information:</p>
            <ul className="list-disc ml-6 my-4">
              <li>Directly from you when you provide it to us.</li>
              <li>Automatically as you navigate through the Site or play the Game.</li>
              <li>From third parties, for example, our business partners.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
            <ul className="list-disc ml-6 my-4">
              <li>To present our Site and Game and its contents to you.</li>
              <li>To provide you with information, products, or services that you request from us.</li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
              <li>To notify you about changes to our Site or Game.</li>
              <li>To improve our Site and Game.</li>
              <li>In any other way we may describe when you provide the information.</li>
              <li>For any other purpose with your consent.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Disclosure of Your Information</h2>
            <p>We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy:</p>
            <ul className="list-disc ml-6 my-4">
              <li>To our subsidiaries and affiliates.</li>
              <li>To contractors, service providers, and other third parties we use to support our business.</li>
              <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Crazy Cattle Studios' assets.</li>
              <li>To fulfill the purpose for which you provide it.</li>
              <li>For any other purpose disclosed by us when you provide the information.</li>
              <li>With your consent.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. Unfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Site or Game. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Site or Game.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Children Under the Age of 13</h2>
            <p>Our Site and Game are not intended for children under 13 years of age. No one under age 13 may provide any information to or on the Site or Game. We do not knowingly collect personal information from children under 13. If you are under 13, do not use or provide any information on this Site or through the Game. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to Our Privacy Policy</h2>
            <p>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Site home page. The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our Site and this privacy policy to check for any changes.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Information</h2>
            <p>To ask questions or comment about this privacy policy and our privacy practices, contact us at: <a href="mailto:privacy@crazy-cattle3d.org" className="text-green-600 hover:text-green-800">privacy@crazy-cattle3d.org</a></p>
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