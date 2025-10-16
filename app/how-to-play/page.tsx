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
          <h1 className="text-3xl font-bold text-center text-green-800">How to Play The Tooth Fae</h1>
          <p className="text-center text-green-700 mt-2">
            Learn the rhythms of tooth thievery and keep every mortal dreaming.
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
                Serve the Queen by collecting 16 unique “Perfect Lovelies” teeth across every age group.
                <br />
                Each night begins on the town map—study households, note their traits, and select the optimal mark.
                <br />
                During extraction, maintain control of Lucidity, Pain, and Fear; losing any meter means the job fails.
                <br />
                Secure rare teeth by targeting trait combinations like Fragile children or Eldritch dwellers.
              </p>
            </Card>
            <Card className="bg-white shadow-md border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                <div className="bg-green-500 p-2 rounded-full">
                  <Gamepad2 className="h-4 w-4 text-white" />
                </div>
                Interface & Meters
              </h3>
              <p className="text-gray-700">
                <strong>Lucidity (yellow):</strong> the wake-up meter. Keep it low with gentle timing and Fairy Dust.
                <br />
                <strong>Pain (red):</strong> rising pain risks lethal shock—stagger the drill and syringe to calm it.
                <br />
                <strong>Fear (purple):</strong> amplifies Lucidity growth; never let panic spiral out of control.
                <br />
                Master the rhythm: short drill bursts, dust to soothe, syringe only when pain nears 80%.
              </p>
            </Card>
            <Card className="bg-white shadow-md border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                <div className="bg-green-500 p-2 rounded-full">
                  <Award className="h-4 w-4 text-white" />
                </div>
                Essential Toolkit
              </h3>
              <p className="text-gray-700">
                <strong>Fairy Dust:</strong> the safest panic button—drops Lucidity and Fear instantly.
                <br />
                <strong>Hook:</strong> opens the mouth; expect a small Lucidity spike the moment you pry.
                <br />
                <strong>Anesthetic Syringe:</strong> resets pain, ideal for Tough donors or multi-tooth attempts.
                <br />
                <strong>Dental Drill & Forceps:</strong> loosen teeth carefully and extract only once meters are stable.
              </p>
            </Card>
            <Card className="bg-white shadow-md border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                <div className="bg-green-500 p-2 rounded-full">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                Trait Intelligence
              </h3>
              <p className="text-gray-700">
                Heavy Sleepers forgive greedy drilling—perfect for students of the craft.
                <br />
                Tough donors need constant dust + anesthetic cycles to survive long extractions.
                <br />
                Night Owls start half awake; tap the drill, dust immediately, and never linger.
                <br />
                Eldritch, Vampire, and Ancient abodes hide unearthly teeth—prepare for bespoke twists.
              </p>
            </Card>
          </div>
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md">
            <p className="text-green-800 text-sm">
              <strong>Field Note:</strong> The best Tooth Fae mantra is “drill a bit, dust a bit.” Push the drill only in
              short pulses, calm every spike with dust, and save your syringe for when pain threatens to end the run.
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