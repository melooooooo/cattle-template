"use client";

import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import Navigation from "@/components/navigation";
import Link from "next/link";

export default function PlayPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

        {/* Game Title */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-white">Play Crazy Cattle 3D</h1>
          <p className="text-center text-green-100 mt-2">
            Control your sheep and be the last one standing in this chaotic battle arena!
          </p>
        </div>

        {/* Game Iframe */}
        <div className="w-full max-w-6xl mx-auto p-4 game-container rounded-md my-2">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://crazy-cattle3d.org/game/crazycattle3d/"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="Crazy Cattle 3D Game"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-200">
            <div>Controls: WASD to move | Mouse to aim | Space for special ability</div>
            <Button variant="ghost" size="sm" className="text-gray-200 flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              Fullscreen
            </Button>
          </div>
        </div>

        {/* Game Instructions */}
        <div className="w-full max-w-6xl mx-auto p-4 my-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Game Instructions</h2>
          <ul className="list-disc list-inside text-green-100 space-y-2">
            <li>Use WASD or arrow keys to move your sheep</li>
            <li>Move your mouse to control camera direction</li>
            <li>Press Space to ram into other sheep</li>
            <li>Hold Shift to sprint for faster movement</li>
            <li>Avoid edges and fences - touching them means elimination</li>
            <li>Be the last sheep standing to win!</li>
          </ul>
          
          <div className="flex gap-4 justify-center mt-8">
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild className="bg-green-700 hover:bg-green-800 text-white">
              <Link href="/download">Download Full Game</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 