"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { BarChart, Shield, Sparkles, Gamepad2, Users, Play } from "lucide-react";

export default function FeaturesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 整个页面使用grassland-section类 */}
      <div className="w-full grassland-section min-h-screen">
        {/* Use the Navigation component */}
        <Navigation />

        {/* Features Title */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-slate-100">The Tooth Fae Feature Spotlight</h1>
          <p className="text-center text-neutral-300 mt-2">
            Study the systems that turn every tooth extraction into a tense, story-driven heist.
          </p>
        </div>

        {/* Features Content */}
        <div className="w-full py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <BarChart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Twin-Phase Heists</h3>
                  <p className="text-gray-700 text-sm">
                    Scout homes on the town map, study traits, then dive into a tense extraction scene where every click can wake the donor or win a priceless tooth.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Meter Management Mastery</h3>
                  <p className="text-gray-700 text-sm">
                    Balance Lucidity, Pain, and Fear in real time—push too hard with the drill and the mortal wakes; hesitate and the tooth slips away forever.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Signature Toolkit</h3>
                  <p className="text-gray-700 text-sm">
                    Juggle Fairy Dust, Hooks, Syringes, Drills, and Forceps in short loops—“drill a bit, dust a bit” is the golden rule for surviving elite targets.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Gamepad2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Trait-Driven Encounters</h3>
                  <p className="text-gray-700 text-sm">
                    Heavy Sleepers, Tough mortals, Vampires, and Eldritch beings each demand a bespoke rhythm, turning every house call into a fresh puzzle.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Collection Endgame</h3>
                  <p className="text-gray-700 text-sm">
                    Hunt the 16 “Perfect Lovelies” teeth—from Sparkling child molars to the uneartly Key tooth—and complete the cabinet for the true ending.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Play className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">High Replay Value</h3>
                  <p className="text-gray-700 text-sm">
                    Randomized traits, rare donor locations, and multi-tooth runs keep every session unpredictable and perfect for theorycrafting.
                  </p>
                </div>
              </div>
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
      </div>
    </main>
  );
} 