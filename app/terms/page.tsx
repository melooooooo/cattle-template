'use client';

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />
      </div>

      {/* Terms Content - White */}
      <div className="w-full white-section py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose prose-green max-w-none">
            <p className="mb-4">Last updated: June 15, 2023</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>Welcome to Crazy Cattle 3D! These Terms of Service ("Terms") govern your use of our website located at <a href="https://crazycattle3dx.com" className="text-green-600 hover:text-green-800">https://crazycattle3dx.com</a> (the "Site") and our online and downloadable game Crazy Cattle 3D (the "Game"), operated by Crazy Cattle Studios. By accessing the Site or using the Game, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Site or use the Game.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p>The Site and the Game, including all content, features, and functionality thereof, are owned by Crazy Cattle Studios and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
            <p>You are permitted to use the Site and Game for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site or Game, except as follows:</p>
            <ul className="list-disc ml-6 my-4">
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
              <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
              <li>If we provide social media features with certain content, you may take such actions as are enabled by such features.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Site or Game.</p>
            <p>You are responsible for safeguarding the password that you use to access the Site or Game and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Content</h2>
            <p>Our Site and Game may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Site or Game, including its legality, reliability, and appropriateness.</p>
            <p>By posting Content on or through the Site or Game, you represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Site or Game does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Prohibited Uses</h2>
            <p>You agree not to use the Site or Game:</p>
            <ul className="list-disc ml-6 my-4">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
              <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>In no event shall Crazy Cattle Studios, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site or Game; (ii) any conduct or content of any third party on the Site or Game; (iii) any content obtained from the Site or Game; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
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