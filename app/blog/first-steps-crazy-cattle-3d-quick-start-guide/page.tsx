"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { 
  Gamepad2, 
  Trophy, 
  Zap, 
  Users, 
  Shield, 
  Target, 
  Sparkles,
  Play,
  Award,
  BarChart,
  Crown,
  Star,
  MapPin,
  Rocket,
  Eye,
  MousePointer,
  Keyboard,
  Flag
} from "lucide-react";

export default function FirstStepsCrazyCattle3DQuickStartGuide() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

        {/* Blog Title */}
        <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4">
          <div className="text-green-600 text-sm mb-2">January 16, 2025</div>
          <h1 className="text-4xl font-bold text-center text-green-800 mb-4">
            Your First Steps into Crazy Cattle 3D: A Quick Start Guide
          </h1>
          <p className="text-center text-green-700 text-lg">
            Ready to dive into the chaotic yet incredibly fun world of Crazy Cattle 3D? This guide will get you started!
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="w-full white-section py-12">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Ready to dive into the chaotic yet incredibly fun world of Crazy Cattle 3D? If you've been curious about this unique battle royale game and are wondering how to get started, you've come to the right place. This quick start guide will walk you through your first steps into Crazy Cattle 3D, covering everything from basic controls to essential strategies, ensuring you're ready to become the last sheep standing.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-600 p-2 rounded-full">
                <Flag className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-0">
                Welcome to the Arena: What is Crazy Cattle 3D?
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              For newcomers, Crazy Cattle 3D might seem unconventional, and that's precisely its charm! Unlike traditional shooters or fantasy-themed battle royales, here you embody an explosive sheep, battling it out in a vibrant, physics-driven arena. The core objective is simple: be the last one left by knocking other sheep off the map. It's a game that's easy to pick up but surprisingly challenging to master, making it perfect for anyone looking for a quick start in a fresh, competitive environment.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              The beauty of Crazy Cattle 3D lies in its commitment to pure skill. There are no pay-to-win mechanics, meaning your triumphs are solely a result of your growing expertise and quick thinking. This fair play environment is a huge draw for players in 2025 who are seeking genuine competition.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-600 p-2 rounded-full">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-0">
                Mastering the Basics: Your First Steps to Becoming a Pro
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              To truly excel in Crazy Cattle 3D, understanding the fundamental mechanics and controls is crucial. This section of our quick start guide will get you up to speed fast.
            </p>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-600 p-2 rounded-full">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-0">
                Essential Controls for Dominating the Flock:
              </h3>
            </div>
            <ul className="list-none pl-0 text-gray-700 leading-relaxed mb-6 space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-blue-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Keyboard className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Movement is Key:</strong> Use the WASD keys or Arrow Keys to navigate your sheep across the map. Smooth movement and quick directional changes are vital for both offense and defense.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-purple-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <MousePointer className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Camera Control:</strong> Your mouse dictates your camera view. Keep it fluid, constantly surveying your surroundings to spot incoming threats or opportunities to ram an unsuspecting opponent.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-yellow-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Jump and Ram:</strong> The Spacebar is your go-to for jumping. More importantly, it's how you initiate a ram! Timing your ram is critical. A well-timed jump and charge can send opponents flying.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Sprint for Speed:</strong> Hold Shift to sprint. This is perfect for closing distances quickly, escaping dangerous situations, or building momentum for a powerful ram.
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-600 p-2 rounded-full">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-0">
                Understanding Core Gameplay:
              </h3>
            </div>
            <ul className="list-none pl-0 text-gray-700 leading-relaxed mb-6 space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-gold-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Objective: Last Sheep Standing:</strong> Like any battle royale, your primary goal is survival. Outmaneuver, outwit, and out-ram every other sheep until you're the sole survivor.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <BarChart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Physics Over Finesse:</strong> Crazy Cattle 3D runs on a revolutionary physics engine. This means your interactions with other sheep and the environment are governed by realistic (and often hilarious) physics. Learn to use momentum to your advantage – a small bump at high speed can be devastating.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-red-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Explosive Eliminations:</strong> If you get knocked over by another sheep, you explode! Keep an eye on the top of the screen where eliminated sheep are announced, and the bottom left for the current sheep count.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Environmental Awareness:</strong> Each of the three unique maps presents different challenges. Some might have more edges to fall off, while others have obstacles to navigate. Use the terrain to your advantage – funnel opponents into tight spots or utilize ledges for surprise attacks.
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-600 p-2 rounded-full">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-0">
                Initial Strategies for Success:
              </h3>
            </div>
            <ul className="list-none pl-0 text-gray-700 leading-relaxed mb-6 space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-purple-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Stay Mobile:</strong> A moving target is harder to hit. Don't stand still for too long, especially early in a match.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-orange-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Observe and React:</strong> Watch other sheep. Who's aggressive? Who's trying to avoid confrontation? Use their movements to predict their next move.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-pink-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Timing Your Rams:</strong> Don't just blindly charge. Wait for your opponent to be off-balance, near an edge, or exposed. A well-timed sprint and ram can be incredibly effective.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-teal-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Learn from Explosions:</strong> When you (or others) get eliminated, try to understand why. Was it a misstep? A well-executed ram from an opponent? Learning from these moments will accelerate your mastery.
                </div>
              </li>
            </ul>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-600 p-2 rounded-full">
                <Award className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-0">
                Taking Your Game Further: Beyond the Basics
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Once you've got your first steps into Crazy Cattle 3D down, you'll naturally want to refine your skills. The game's skill-based advancement means every match is an opportunity to improve.
            </p>

            <ul className="list-none pl-0 text-gray-700 leading-relaxed mb-6 space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-blue-600 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Unlock New Maps:</strong> As you play and earn trophies, you'll unlock new environments. Each map offers distinct challenges, pushing you to adapt your strategies.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-pink-600 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Customize Your Sheep:</strong> While cosmetic, personalizing your sheep with hundreds of accessories and outfits is a fun way to express yourself and stand out in the herd.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-600 p-1.5 rounded-full mt-1 flex-shrink-0">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <strong>Engage in Competitive Multiplayer:</strong> Crazy Cattle 3D offers cross-platform play across global servers. This means you can consistently find opponents and test your evolving skills against players worldwide, contributing to a truly dynamic and competitive experience.
                </div>
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              If you're looking for a game that offers straightforward controls, deep physics-based gameplay, and a pure skill-based environment, then your journey into Crazy Cattle 3D starts now. It's a thrilling, sometimes frustrating, but always rewarding experience that promises endless hours of chaotic fun.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-600 p-2 rounded-full">
                  <Play className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-green-800 mb-0">Ready to Start Your Sheep Adventure?</h4>
              </div>
              <p className="text-green-700 mb-4">
                Now that you know the basics, it's time to jump into the arena and start your journey to becoming the ultimate sheep champion. Remember, every master was once a beginner!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/download">Download Now</Link>
                </Button>
                <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Link href="/play">Play Online</Link>
                </Button>
              </div>
            </div>
          </article>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-gray-200">
            <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Link href="/blog">← Back to Blog</Link>
            </Button>
            <div className="flex gap-3">
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