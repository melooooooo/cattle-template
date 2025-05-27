"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { Play, Gamepad2, Award, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function HowToPlayPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

        {/* How to Play Title */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-green-800">How to Play Crazy Cattle 3D</h1>
          <p className="text-center text-green-700 mt-2">
            Master the basics and become the last sheep standing!
          </p>
        </div>
      </div>

      {/* How to Play Content */}
      <div className="w-full light-green-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-md border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                <div className="bg-green-500 p-2 rounded-full">
                  <Play className="h-4 w-4 text-white" />
                </div>
                Game Objective
              </h3>
              <p className="text-gray-700">
                Control your sheep and survive until you're the last one remaining
                <br />
                Knock other sheep off the map by ramming into them
                <br />
                Watch out for fences and edges - touching them means elimination!
                <br />
                Win trophies by completing each level
              </p>
            </Card>
            <Card className="bg-white shadow-md border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                <div className="bg-green-500 p-2 rounded-full">
                  <Gamepad2 className="h-4 w-4 text-white" />
                </div>
                Controls
              </h3>
              <p className="text-gray-700">
                WASD/Arrow Keys: Move your sheep
                <br />
                Mouse: Control camera direction
                <br />
                Space: Jump/Ram into other sheep
                <br />
                Shift: Sprint for faster movement
              </p>
            </Card>
            <Card className="bg-white shadow-md border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                <div className="bg-green-500 p-2 rounded-full">
                  <Award className="h-4 w-4 text-white" />
                </div>
                Game Mechanics
              </h3>
              <p className="text-gray-700">
                Your sheep will explode if knocked over by another sheep
                <br />
                Information about eliminated sheep appears at the top of the screen
                <br />
                Remaining sheep count is shown in the bottom left corner
                <br />
                The game is all about physics - use momentum to your advantage!
              </p>
            </Card>
            <Card className="bg-white shadow-md border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                <div className="bg-green-500 p-2 rounded-full">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                Hints
              </h3>
              <p className="text-gray-700">
                There are three unique maps to unlock by progressing through the game
                <br />
                Each map has different scenery and varying sheep counts
                <br />
                Earn trophies for each map you complete, displayed in the bottom right
                <br />
                Adapt your strategy for each unique map layout
              </p>
            </Card>
          </div>
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md">
            <p className="text-green-800 text-sm">
              <strong>Pro Tip:</strong> The chaotic physics are intentional! Learn to control your momentum and use it
              to your advantage. Sometimes letting other sheep eliminate each other is the best strategy for victory.
            </p>
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