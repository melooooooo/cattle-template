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
            Infiltrate silent bedrooms, balance Lucidity, Pain, and Fear, and deliver rare trophies to the Queen before anyone wakes.
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
          <h2 className="text-xl font-bold text-white mb-4">Taking Command: The Controls</h2>
          <p className="text-sm text-neutral-300 mb-4">
            Disclaimer: These bindings match the standard browser build on keyboard and mouse. Some versions may surface
            slight variations—check the in-game sheet before a live run.
          </p>
          <div className="overflow-hidden rounded-lg border border-green-200 bg-green-50">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {[
                { action: 'Glide Forward', input: 'W' },
                { action: 'Drift Back', input: 'S' },
                { action: 'Strafe Left', input: 'A' },
                { action: 'Strafe Right', input: 'D' },
                { action: 'Creep / Sneak', input: 'C or Left Ctrl' },
                { action: 'Interact / Extract', input: 'E or Left Mouse Click' },
                { action: 'Survey the Room', input: 'Mouse Movement' },
              ].map(entry => (
                <div
                  key={entry.action}
                  className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 border-b border-green-200/50 last:border-b-0"
                >
                  <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">{entry.action}</span>
                  <span className="text-sm text-green-500 md:text-right">{entry.input}</span>
                </div>
              ))}
            </div>
          </div>
          
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
