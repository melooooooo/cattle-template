"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { BarChart, Shield, Sparkles, Gamepad2, Users, Play } from "lucide-react";

export default function FeaturesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

        {/* Features Title */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-white">Crazy Cattle 3D Features</h1>
          <p className="text-center text-green-100 mt-2">
            Discover what makes Crazy Cattle 3D the most entertaining sheep combat simulation!
          </p>
        </div>
      </div>

      {/* Features Content */}
      <div className="w-full medium-green-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                <BarChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Rage-Inducing Physics</h3>
                <p className="text-gray-700 text-sm">
                  Our intentionally chaotic physics engine will have you screaming at your screen and coming back for more!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Battle Royale Mayhem</h3>
                <p className="text-gray-700 text-sm">
                  Fight with up to 100 other sheep in a physics-driven battle to be the last one standing.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Addictive Frustration</h3>
                <p className="text-gray-700 text-sm">
                  The perfect balance of challenge and fun, creating that 'just one more game' feeling.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                <Gamepad2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Customizable Sheep</h3>
                <p className="text-gray-700 text-sm">
                  Unlock hundreds of accessories and outfits to make your rage-filled sheep uniquely yours.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Competitive Multiplayer</h3>
                <p className="text-gray-700 text-sm">
                  Cross-platform play lets you rage with friends on any device across all global servers.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
              <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                <Play className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">Free-to-Play</h3>
                <p className="text-gray-700 text-sm">
                  No pay-to-win mechanics, just pure skill-based (and luck-based) sheep combat.
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
    </main>
  );
} 