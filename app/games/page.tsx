"use client";

import Navigation from "@/components/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function GamesIndexPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full grassland-section">
        <Navigation />
        <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-slate-100">All Games</h1>
          <p className="text-neutral-300 mt-2">Explore titles in our collection.</p>
        </div>
      </div>

      <div className="w-full white-section py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white shadow-md border-gray-200 p-4">
            <h3 className="text-xl font-semibold text-green-800 mb-2">The Tooth Fae</h3>
            <p className="text-gray-700 mb-3">Unearthly stealth and the ultimate tooth collection.</p>
            <Link href="/" className="text-green-700 hover:underline">Go to game</Link>
          </Card>
        </div>
      </div>
    </main>
  );
}

