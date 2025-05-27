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
            Everything you need to know about Crazy Cattle 3D
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
                  Is Crazy Cattle 3D suitable for beginners?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  Yes, Crazy Cattle 3D is designed to be accessible for players of all skill levels. The game includes
                  a comprehensive tutorial system and gradually introduces new mechanics as you progress.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  Can I play Crazy Cattle 3D offline?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  Yes, the single-player campaign and most game modes can be played completely offline. Only the
                  multiplayer features and leaderboard submissions require an internet connection.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  What is the minimum hardware requirement for running Crazy Cattle 3D?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  Crazy Cattle 3D is optimized to run on a wide range of hardware. Minimum requirements include:
                  Windows 10/macOS 10.14/Ubuntu 18.04, Intel Core i3 or equivalent, 4GB RAM, and any DirectX 11
                  compatible graphics card with 1GB VRAM.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  Are there in-app purchases in Crazy Cattle 3D?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  The core game experience is completely free to play. Optional in-app purchases are available for
                  cosmetic items, additional level packs, and premium sheep customizations that do not affect gameplay
                  balance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-green-200">
                <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                  How often does Crazy Cattle 3D receive updates?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-4 py-3">
                  The development team releases major content updates quarterly, with smaller patches and bug fixes
                  deployed monthly. Seasonal events are also introduced throughout the year to keep the gameplay fresh
                  and engaging.
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