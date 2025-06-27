"use client";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

        {/* Blog Title */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-green-800">Crazy Cattle 3D Blog</h1>
          <p className="text-center text-green-700 mt-2">
            Latest news, updates and insights about Crazy Cattle 3D
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="w-full white-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Post 1 */}
            <Card className="bg-white shadow-lg border border-green-200 p-6">
              <div className="mb-4">
                <div className="text-green-600 text-sm mb-2">January 20, 2025</div>
                <h2 className="text-xl font-bold text-green-800 mb-3">What are the Best Free-to-Play Battle Royale Games in 2025?</h2>
                <p className="text-gray-700 mb-4">
                  Discover the evolving landscape of free-to-play battle royale games and why Crazy Cattle 3D stands out with its unique sheep-on-sheep combat mechanics.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/blog/best-free-battle-royale-games-2025">Read More</Link>
                </Button>
              </div>
            </Card>

            {/* Blog Post 2 */}
            <Card className="bg-white shadow-lg border border-green-200 p-6">
              <div className="mb-4">
                <div className="text-green-600 text-sm mb-2">January 18, 2025</div>
                <h2 className="text-xl font-bold text-green-800 mb-3">Looking for a Free Game That's Both Wild and Skillful? Try Crazy Cattle 3D!</h2>
                <p className="text-gray-700 mb-4">
                  Discover why Crazy Cattle 3D is the perfect blend of chaotic fun and competitive skill-based gameplay in the free-to-play battle royale market.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/blog/free-game-wild-skillful-crazy-cattle-3d">Read More</Link>
                </Button>
              </div>
            </Card>

            {/* Blog Post 3 */}
            <Card className="bg-white shadow-lg border border-green-200 p-6">
              <div className="mb-4">
                <div className="text-green-600 text-sm mb-2">January 16, 2025</div>
                <h2 className="text-xl font-bold text-green-800 mb-3">Your First Steps into Crazy Cattle 3D: A Quick Start Guide</h2>
                <p className="text-gray-700 mb-4">
                  Ready to dive into the chaotic yet incredibly fun world of Crazy Cattle 3D? This comprehensive guide covers everything from basic controls to essential strategies.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/blog/first-steps-crazy-cattle-3d-quick-start-guide">Read More</Link>
                </Button>
              </div>
            </Card>


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