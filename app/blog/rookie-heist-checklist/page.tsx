"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import {
  ClipboardCheck,
  MapPin,
  Wand2,
  Syringe,
  Drill,
  Feather,
  AlertTriangle,
  Moon,
  Footprints,
  Eye,
  Timer,
  Shield,
  Undo2,
} from "lucide-react";

export default function RookieHeistChecklist() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full grassland-section">
        <Navigation />
        <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4">
          <div className="text-green-100 text-sm mb-2">February 28, 2025 • Training Dispatch</div>
          <h1 className="text-4xl font-bold text-center text-green-50 mb-4">
            Rookie Heist Checklist: Tools, Targets, and Common Mistakes
          </h1>
          <p className="text-center text-green-100 text-lg">
            A mission briefing for new Tooth Fae agents—what to inspect before you knock, how to run the extraction
            loop, and the fast ways rookies blow a perfect pull.
          </p>
        </div>
      </div>

      <div className="w-full white-section py-12">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-lg max-w-none">
            <p className="text-gray-700">
              The Queen hands rookies a satchel and a smile, but survival depends on preparation. This checklist distills
              the essentials from veteran field notes so you can leave your first night with more than a cracked molar.
            </p>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 p-2 rounded-full">
                  <ClipboardCheck className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Pre-Mission Prep</h2>
              </div>
              <ul className="list-disc ml-6 space-y-3 text-gray-700">
                <li>
                  <strong>Scout the Map:</strong> Hover each house for age group and traits. Circle Fragile children or
                  Eldritch anomalies—they define the night’s priority targets.
                </li>
                <li>
                  <strong>Check Your Loadout:</strong> Carry at least one extra syringe beyond the default; Tough and
                  multi-tooth runs demand it.
                </li>
                <li>
                  <strong>Review Trait Intel:</strong> Memorize how Heavy Sleepers, Night Owls, and Vampires alter meter
                  behavior so you are not improvising mid-extraction.
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-sky-500 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Toolkit Quick Reference</h2>
              </div>
              <ul className="list-none space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-rose-400 p-1.5 rounded-full mt-1">
                    <Feather className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Fairy Dust:</strong> De-escalation in a pinch. Tap it after every noisy action to keep Fear
                    and Lucidity manageable.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 p-1.5 rounded-full mt-1">
                    <Wand2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Hook:</strong> Mandatory opener. Expect a Lucidity bump—dust immediately afterward to settle
                    the donor.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-lime-500 p-1.5 rounded-full mt-1">
                    <Syringe className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Anesthetic:</strong> Reserve for Pain spikes around 75% or any time you plan a second tooth in
                    the same visit.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-500 p-1.5 rounded-full mt-1">
                    <Drill className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Dental Drill:</strong> Rapid progress and rapid danger. Pulse it for one to two seconds, then
                    reassess gauges before continuing.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-500 p-2 rounded-full">
                  <Moon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">On-Site Extraction Loop</h2>
              </div>
              <ol className="list-decimal ml-6 space-y-3 text-gray-700">
                <li>Enter silently, Hook the mouth, dust to reset Fear.</li>
                <li>Drill in short bursts while monitoring Lucidity and Pain.</li>
                <li>When Pain climbs, pause and inject anesthetic before continuing.</li>
                <li>Dust one final time, then pull with Forceps only when the tooth rocks freely.</li>
              </ol>
              <p className="text-gray-700">
                Repeatability matters—stick to the loop until it becomes muscle memory.
              </p>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-500 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Common Rookie Mistakes</h2>
              </div>
              <ul className="list-none space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-rose-500 p-1.5 rounded-full mt-1">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Tunnel Vision:</strong> Staring at the tooth instead of the meters guarantees a wake-up. Glance
                    at gauges after every action.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-teal-500 p-1.5 rounded-full mt-1">
                    <Timer className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Greedy Drilling:</strong> Holding the trigger to “finish faster” only maxes Pain and Fear. Pulse,
                    pause, dust.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-slate-600 p-1.5 rounded-full mt-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Ignoring Traits:</strong> Treating an Insomniac like a Heavy Sleeper ends poorly. Adjust cadence to
                    match the trait card you saw outside.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-500 p-1.5 rounded-full mt-1">
                    <Undo2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Retrying Immediately:</strong> Blowing a heist fills the house with suspicion. Rotate to another
                    street before returning.
                  </div>
                </li>
              </ul>
            </section>

            <p className="text-gray-700 mt-10">
              Keep this checklist nearby until the routine becomes rote. Finish your night by logging teeth in the “My
              Perfect Lovelies” cabinet and reviewing which traits you still need. Discipline—not luck—creates legends.
            </p>
          </article>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/blog">Back to Field Notes</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link href="/play">Practice Online</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
