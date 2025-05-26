"use client";

import Navigation from "@/components/navigation";

export default function ReviewsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Player Reviews</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-700 text-lg">No reviews yet. Be the first to leave a comment!</p>
        </div>
      </div>
    </main>
  );
} 