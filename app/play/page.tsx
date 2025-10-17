"use client";

import { useEffect } from "react";
import Navigation from "@/components/navigation";

const GAME_URL = "https://html.itch.zone/html/15168109/index.html";

export default function PlayPage() {
  useEffect(() => {
    // 直接跳转到外部页面，避免 iframe 跨域限制
    window.location.replace(GAME_URL);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full grassland-section">
        <Navigation />
        <div className="w-full max-w-6xl mx-auto px-4 pt-10 pb-12">
          <div className="rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-6 text-center shadow-[0_18px_36px_-24px_rgba(147,72,166,0.6)]">
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Opening The Tooth Fae…</h1>
            <p className="text-sm text-neutral-300 mb-4">If nothing happens, click the button below.</p>
            <a
              href={GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500/90 to-violet-500/90 px-4 py-2 text-white font-semibold hover:from-fuchsia-500 hover:to-violet-500"
            >
              Open Game</a>
          </div>
        </div>
      </div>
    </main>
  );
}
