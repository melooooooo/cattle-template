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
          <h1 className="text-3xl font-bold text-center text-white">Play The Tooth Fae</h1>
          <p className="text-center text-green-100 mt-2">
            Embark on a magical tooth collection adventure as the enchanting Tooth Fae!
          </p>
        </div>

        {/* Game Iframe */}
        <div className="w-full max-w-6xl mx-auto p-4 game-container rounded-md my-2">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://html.itch.zone/html/15168109/index.html"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="The Tooth Fae Game"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-200">
            <div>Click to start your magical tooth collection adventure!</div>
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
            <li>Use arrow keys or WASD to move the Tooth Fae</li>
            <li>Click or interact with objects to collect teeth</li>
            <li>Press Space to jump and fly through dream worlds</li>
            <li>Avoid waking children or household pets</li>
            <li>Trade collected teeth for magical coins</li>
            <li>Complete levels to unlock new magical worlds!</li>
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