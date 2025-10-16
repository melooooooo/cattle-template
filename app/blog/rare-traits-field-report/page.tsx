"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import {
  Sparkles,
  Key,
  Skull,
  Target,
  Shield,
  Gem,
  MoonStar,
  Activity,
  BookMarked,
  ListChecks,
} from "lucide-react";

export default function RareTraitsFieldReport() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full grassland-section">
        <Navigation />
        <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4">
          <div className="text-green-100 text-sm mb-2">March 5, 2025 • Intelligence Briefing</div>
          <h1 className="text-4xl font-bold text-center text-green-50 mb-4">
            Rare Traits Field Report: How to Secure Unearthly Teeth
          </h1>
          <p className="text-center text-green-100 text-lg">
            Trait dossiers on Sparkling, Glass, Vampire, Eldritch, and other high-value targets—including the safest
            extraction plans for each.
          </p>
        </div>
      </div>

      <div className="w-full white-section py-12">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-lg max-w-none">
            <p className="text-gray-700">
              Any fae can snag a chipped molar from a careless adult. Only collectors who study traits bring the Queen
              true treasures. This briefing catalogs the rare donors who guard Unearthly teeth and outlines the sequence
              required to claim each without waking the household.
            </p>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-500 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Rare Trait Targets</h2>
              </div>
              <p className="text-gray-700 mb-4">
                These donors rarely appear on the map. When you spot the trait icons, prioritize the run and ensure your
                toolkit is stocked.
              </p>
              <ul className="list-none space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 p-1.5 rounded-full mt-1">
                    <Gem className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Sparkling Tooth — Child + Fragile:</strong> Open with Dust, then micro-drill in half-second
                    pulses. Fragile enamel shatters easily; stop the drill the second wobble appears.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-sky-500 p-1.5 rounded-full mt-1">
                    <MoonStar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Glass Tooth — Teen + Brittle:</strong> Pain climbs fast. Alternate between Dust and Syringe
                    to keep the donor stable; never exceed two drill pulses without a calm-down break.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-rose-500 p-1.5 rounded-full mt-1">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Gemini Tooth — Adult + Fragile + Brittle:</strong> Double traits mean double risk. Plan for
                    three drill cycles total and keep a second syringe ready in case Pain spikes unexpectedly.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-600 p-2 rounded-full">
                  <Skull className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Unearthly Residents</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Their homes rarely show on the map. Expect bespoke mechanics and meter behavior.
              </p>
              <ul className="list-none space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-red-500 p-1.5 rounded-full mt-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Sharp Tooth — Vampire:</strong> Fear starts low but Lucidity rockets after every drill tick.
                    Use the Hook, dust twice, then complete the extraction in one disciplined drill cycle.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-teal-500 p-1.5 rounded-full mt-1">
                    <Key className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Key Tooth — Eldritch Child:</strong> The room twists your UI; meter colors drift. Trust the
                    sound cues—when breathing quickens, dust immediately. Reward: a tooth the Queen forbids us to keep,
                    yet we do.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-slate-700 p-1.5 rounded-full mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Watcher Tooth — Ancient:</strong> Teeth with faces. Lucidity is sluggish but Fear never drops
                    below 30%. Keep Dust on cooldown and expect the Forceps to twitch in your hand.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-500 p-1.5 rounded-full mt-1">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Wooden Tooth — Ancient:</strong> Worthless but a warning sign. If you are seeing wooden
                    dentures, you are one map away from a Watcher—return prepared.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 p-2 rounded-full">
                  <BookMarked className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Preparation Checklist</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Before a rare-trait run, confirm the following or abort the mission:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-3">
                <li>Carry at least two anesthetic syringes; Eldritch donors often require back-to-back doses.</li>
                <li>Check your dust reserves—three casts minimum for Vampire or Insomniac encounters.</li>
                <li>Review trait intel in the Codex so you can react when meter behavior shifts unexpectedly.</li>
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-600 p-2 rounded-full">
                  <ListChecks className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Mission Debrief</h2>
              </div>
              <p className="text-gray-700">
                Rare traits reward patience. Secure the Sparkling, Glass, Gemini, Sharp, Watcher, and Key teeth and your
                cabinet nears completion. Remember: traits telegraph how the meters will betray you. Observe, plan, and
                you will walk away with a new curiosity for the Queen’s shelf.
              </p>
            </section>
          </article>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/blog">Back to Field Notes</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link href="/download">Download the Training Build</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
