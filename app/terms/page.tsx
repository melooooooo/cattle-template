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
            <p className="mb-4">Last updated: October 17, 2025</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Overview</h2>
            <p>The Tooth Fae Collective (“we,” “us,” or “our”) operates the website <a href="https://thetoothfae.online" className="text-green-600 hover:text-green-800">https://thetoothfae.online</a> (the “Site”) and the stealth horror game The Tooth Fae (the “Game”). These Terms of Service (“Terms”) set the ground rules for visiting the Site, launching the Game, downloading any builds, or participating in community spaces we control. By entering our realm you accept these Terms; if you disagree, do not access or use the Site or Game.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Eligibility & Account Registration</h2>
            <p>You must be at least 13 years old (or older if your local laws require it) to play online, submit comments, or create an account. When you register you promise that the information you provide is accurate, that you will keep it updated, and that you will secure your login credentials. You are responsible for any activity that happens through your account—if a mortal wakes because your password leaked, that is on you. Alert us immediately at <a href="mailto:support@thetoothfae.online" className="text-green-600 hover:text-green-800">support@thetoothfae.online</a> if you suspect unauthorized access.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. License to Play & Virtual Goods</h2>
            <p>We grant you a limited, revocable, non-transferable license to access the Site and play the Game for personal, non-commercial entertainment. You may not resell the Game, distribute builds, or reverse engineer our tools. Any cosmetic items, cabinet trophies, or other in-game rewards have no monetary value, do not belong to you outside the Game, and may change or be removed as we rebalance the experience.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Acceptable Use & Community Conduct</h2>
            <p>When you interact with other collectors—whether through comments, future multiplayer experiments, or official social channels—you agree to:</p>
            <ul className="list-disc ml-6 my-4">
              <li>Stay within the law and respect the rights of others.</li>
              <li>Avoid harassment, hate speech, sexual content aimed at minors, or any conduct that would make a mortal (or fellow fae) feel unsafe.</li>
              <li>Refrain from posting or distributing cheats, exploits, or malware.</li>
              <li>Follow any additional rules posted in specific events, tournaments, or beta programs.</li>
            </ul>
            <p>We can investigate and take action—including content removal, account suspension, or banning—whenever we believe these guidelines are violated.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. User Content & Feedback</h2>
            <p>You may submit screenshots, strategy notes, fan art, or feedback (“User Content”). By doing so you grant us a worldwide, royalty-free, sublicensable license to host, display, adapt, and share that content to operate, promote, and improve the Game. You must own or have permission to use anything you upload. Do not post private information about yourself or others, and do not upload anything that infringes someone else’s rights.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Streaming & Fan Creations</h2>
            <p>We love seeing cabinet tours, speed-runs, and lore deep-dives. You may livestream or create fan works so long as they remain non-commercial or clearly transformative, include appropriate credit to The Tooth Fae, and comply with these Terms. We reserve the right to request removal of content that misrepresents the Game, spoils unreleased material, or uses our trademarks in a confusing way.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Third-Party Services</h2>
            <p>The Site may link to storefronts, analytics providers, or community platforms operated by others. Those services have their own policies and terms—you engage with them at your own risk. We are not responsible for third-party content, outages, or practices.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Suspension & Termination</h2>
            <p>We may suspend or terminate access to the Site or Game at any time if we believe you breached these Terms, compromised security, or harmed the community. You may also close your account by contacting us. Sections relating to ownership, disclaimers, liability, and dispute resolution will continue to apply after termination.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Disclaimers</h2>
            <p>The Site and Game are provided “as is” and “as available.” We do not warrant uninterrupted play, perfect balance, or total freedom from bugs, nightmares, or data loss. To the fullest extent permitted by law we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
            <p>Tooth Fae Collective and its affiliates will not be liable for indirect, incidental, punitive, or consequential damages arising from your access to or use of the Site or Game. Our aggregate liability to you for direct damages will never exceed the greater of (a) amounts you paid to us in the six months preceding the claim, or (b) fifty U.S. dollars (US$50).</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">11. Indemnification</h2>
            <p>You agree to indemnify and hold harmless the Tooth Fae Collective, its developers, partners, and employees from any claims, damages, liabilities, and expenses (including reasonable attorneys’ fees) arising out of your misuse of the Site or Game, your breach of these Terms, or your User Content.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">12. Governing Law & Dispute Resolution</h2>
            <p>These Terms are governed by the laws of the State of Washington, USA, without regard to conflict-of-laws provisions. Any dispute will be handled in the state or federal courts located in King County, Washington, unless a mutually-agreed alternative dispute process is required by applicable law. You waive any objection to jurisdiction or venue in those courts.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">13. Changes to These Terms</h2>
            <p>We may update these Terms to reflect new features, legal requirements, or balance changes. When we do, we will update the “Last updated” date above and, if the revisions are significant, provide additional notice through the Site or email. Continued use after the effective date constitutes acceptance.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">14. Contact</h2>
            <p>Questions about these Terms or the Queen’s cabinet? Reach us at <a href="mailto:support@thetoothfae.online" className="text-green-600 hover:text-green-800">support@thetoothfae.online</a>.</p>
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
