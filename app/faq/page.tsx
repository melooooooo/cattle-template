"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

        {/* FAQ Title */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-green-800">Frequently Asked Questions</h1>
          <p className="text-center text-green-700 mt-2">
            Everything recruits ask about mastering The Tooth Fae.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="w-full white-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-green-200">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  Is The Tooth Fae approachable for new players?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  Absolutely. Start with Heavy Sleeper households to learn the drill–dust rhythm at a relaxed pace, then
                  graduate to trickier traits once you’re comfortable juggling Lucidity, Pain, and Fear.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  Do I need to be online to practice extractions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  The campaign, training contracts, and cabinet management all run offline. Only leaderboard sync and
                  community challenge uploads require a connection.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  What hardware do I need to run the training build?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  The Tooth Fae runs on lightweight hardware: Windows 10/macOS 10.14/Ubuntu 18.04, an Intel Core i3 (or
                  equivalent), 4GB RAM, and any GPU with basic OpenGL support. SSD storage shortens load times during
                  rapid contract hopping.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  Are there microtransactions or paywalls?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  No pay-to-win hooks here. Optional cosmetics like wing patterns and cabinet dioramas support ongoing
                  updates, but every gameplay system and tooth in the collection is available from the start.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  How frequently does the team patch the game?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  Expect quarterly content drops with new donor archetypes and cabinet lore, plus monthly balance passes
                  that tweak trait behavior, tool cooldowns, and tooth spawn logic based on community data.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="flex gap-4 justify-center mt-8">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild className="bg-green-700 hover:bg-green-800 text-white">
              <Link href="/play">Play Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 