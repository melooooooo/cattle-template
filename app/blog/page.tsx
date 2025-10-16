"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

        {/* Blog Title */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-green-800">The Tooth Fae Field Notes</h1>
          <p className="text-center text-green-700 mt-2">
            Dispatches, strategies, and lore updates from the Queen’s favorite collectors.
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="w-full white-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Post 1 */}
            <Card className="bg-white shadow-lg border border-green-200 p-6">
              <div className="mb-4">
                <div className="text-green-600 text-sm mb-2">March 12, 2025</div>
                <h2 className="text-xl font-bold text-green-800 mb-3">Meter Management 101: Reading Lucidity, Pain, and Fear</h2>
                <p className="text-gray-700 mb-4">
                  Break down the three extraction meters, learn why Lucidity is the true fail state, and drill smarter with timing patterns straight from veteran fae.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/blog/meter-management-101">Read More</Link>
                </Button>
              </div>
            </Card>

            {/* Blog Post 2 */}
            <Card className="bg-white shadow-lg border border-green-200 p-6">
              <div className="mb-4">
                <div className="text-green-600 text-sm mb-2">March 5, 2025</div>
                <h2 className="text-xl font-bold text-green-800 mb-3">Rare Traits Field Report: How to Secure Unearthly Teeth</h2>
                <p className="text-gray-700 mb-4">
                  From Vampires to Eldritch children, this dossier maps every rare trait combo to the tooth it unlocks—and the safe way to take it.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/blog/rare-traits-field-report">Read More</Link>
                </Button>
              </div>
            </Card>

            {/* Blog Post 3 */}
            <Card className="bg-white shadow-lg border border-green-200 p-6">
              <div className="mb-4">
                <div className="text-green-600 text-sm mb-2">February 28, 2025</div>
                <h2 className="text-xl font-bold text-green-800 mb-3">Rookie Heist Checklist: Tools, Targets, and Common Mistakes</h2>
                <p className="text-gray-700 mb-4">
                  A practical pre-mission checklist covering trait scouting, loadout choices, and the fatal errors that wake donors every single time.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/blog/rookie-heist-checklist">Read More</Link>
                </Button>
              </div>
            </Card>


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