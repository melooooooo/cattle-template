"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import {
  Gauge,
  Activity,
  HeartPulse,
  Thermometer,
  Zap,
  Sparkles,
  Syringe,
  ShieldAlert,
  TimerReset,
} from "lucide-react";

export default function MeterManagement101() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero */}
      <div className="w-full grassland-section">
        <Navigation />
        <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4">
          <div className="text-green-100 text-sm mb-2">March 12, 2025 • Field Manual Update</div>
          <h1 className="text-4xl font-bold text-center text-green-50 mb-4">
            Meter Management 101: Reading Lucidity, Pain, and Fear
          </h1>
          <p className="text-center text-green-100 text-lg">
            Learn the heartbeat of every extraction—the three meters that decide whether your mark keeps dreaming or
            wakes clutching an empty mouth.
          </p>
        </div>
      </div>

      {/* Article */}
      <div className="w-full white-section py-12">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-lg max-w-none">
            <p className="leading-relaxed text-gray-700">
              In The Tooth Fae every successful pull hinges on your ability to read three overlapping meters. Lucidity,
              Pain, and Fear each track a different response in the sleeping donor, yet they feed into one another. Learn
              to hear their rhythm and you can pluck a gem from an Eldritch child; ignore them and you will wake even a
              Heavy Sleeper.
            </p>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 p-2 rounded-full">
                  <Gauge className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Meet the Three Meters</h2>
              </div>
              <ul className="list-none space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-500 p-1.5 rounded-full mt-1">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Lucidity (yellow)</strong> — Your fail state. When it tops out the donor wakes. Drilling,
                    tugging with the Hook, and letting Fear spiral all increase Lucidity. Fairy Dust is your safest
                    release valve.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-500 p-1.5 rounded-full mt-1">
                    <HeartPulse className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Pain (red)</strong> — Track their physical response. Too much pain causes lethal shock,
                    ending the run and yielding nothing but a cracked tooth. Short drill bursts and timely anesthetic
                    injections keep this meter at bay.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-violet-500 p-1.5 rounded-full mt-1">
                    <Thermometer className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Fear (purple)</strong> — The accelerant. Rising Fear causes Lucidity to climb faster. The
                    longer you linger without soothing with Dust, the quicker sleepers thrash toward consciousness.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">The Golden Loop: Drill a Bit, Dust a Bit</h2>
              </div>
              <p className="text-gray-700 mb-6">
                Veterans repeat the mantra for a reason. Every extraction should follow a deliberate cadence:
              </p>
              <ol className="list-decimal ml-6 space-y-3 text-gray-700">
                <li>Open with the Hook and immediately sprinkle Fairy Dust to settle Fear before you touch the drill.</li>
                <li>Drill in pulses of one to two seconds. Watch Lucidity and Pain climb, then release the trigger.</li>
                <li>Dust again. If Pain crests above roughly 75%, administer an anesthetic shot before resuming.</li>
                <li>Only reach for the Forceps when the tooth wiggles freely. An early pull risks cracking the prize.</li>
              </ol>
              <p className="text-gray-700">
                Staying disciplined keeps all three meters manageable, even against donors like the Tough or the Night
                Owl who punish greed with instant wake-ups.
              </p>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-600 p-2 rounded-full">
                  <Syringe className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Tool Synergy with the Meters</h2>
              </div>
              <ul className="list-none space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500 p-1.5 rounded-full mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Fairy Dust</strong> is your first responder. Smother Fear surges after every major action.
                    Even Heavy Sleepers need a dusting during long drills.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-500 p-1.5 rounded-full mt-1">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Dental Drill</strong> deals most of the work but spikes every meter. Pair each burst with a
                    pause to observe the gauges—never tunnel vision on the tooth icon.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-rose-500 p-1.5 rounded-full mt-1">
                    <Syringe className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Anesthetic</strong> buys you another drilling window. Use it when Pain drifts high or during
                    multi-tooth attempts so the donor survives the second pull.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-slate-500 p-1.5 rounded-full mt-1">
                    <ShieldAlert className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Forceps</strong> should be a victory lap. If Lucidity or Pain is already flashing, dust once
                    more before you tug. Composure matters more than speed.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 p-2 rounded-full">
                  <TimerReset className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-0">Trait-Based Meter Adjustments</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Traits rewrite how the meters behave. Plan your loop before you leap through the window:
              </p>
              <ul className="list-none space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-emerald-500 p-1.5 rounded-full mt-1">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Heavy Sleeper:</strong> Lucidity climbs slowly, giving you freedom to drill longer. Still,
                    dust after each burst to avoid nasty surprises.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-orange-500 p-1.5 rounded-full mt-1">
                    <ShieldAlert className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Tough:</strong> Expect Pain to spike; schedule anesthetic shots in advance and break the
                    drill into micro-cycles.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-indigo-500 p-1.5 rounded-full mt-1">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Night Owl / Insomniac:</strong> Lucidity starts halfway full. Treat them like ticking bombs:
                    quick drill tap, instant dust, repeat.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-black/70 p-1.5 rounded-full mt-1">
                    <Thermometer className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <strong>Eldritch & Vampire:</strong> Unusual baselines—some barely feel Pain but wake instantly,
                    others shrug off Fear but punish sloppy timing. Enter with Dust ready and plan an exit route.
                  </div>
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <p className="text-gray-700">
                Mastering meter flow turns The Tooth Fae from a frantic click-fest into a deliberate dance. Revisit the
                mantra whenever nerves spike: <em>drill a bit, dust a bit</em>. The Queen smiles on fae who keep their
                donors asleep.
              </p>
            </section>
          </article>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/blog">Back to Field Notes</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link href="/how-to-play">Study the Full How-To Guide</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
