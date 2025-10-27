"use client";

import { useMemo, useState } from "react";
import Navigation from "@/components/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, Grid2x2, Flame, Star, Clock3, Heart, ArrowUpRight } from "lucide-react";
import scraped from "@/data/games/clicker.json";

type Game = {
  title: string;
  description: string;
  href: string; // internal route when slug is available
  image: string;
  tags?: string[];
  slug?: string;
};

const navItems = [
  { label: "Game List", icon: Grid2x2, active: true, accent: "from-slate-700/60 to-slate-600/50" },
  { label: "Popular Runs", icon: Flame, accent: "from-orange-600/40 to-red-600/40" },
  { label: "New Additions", icon: Star, accent: "from-blue-600/40 to-cyan-600/40" },
  { label: "Recently Played", icon: Clock3, badge: "1", accent: "from-emerald-600/40 to-teal-600/40" },
  { label: "My Favorites", icon: Heart, accent: "from-rose-600/40 to-pink-600/40" },
];

// 基础手工精选数据
const curated: Game[] = [
  {
    title: "The Tooth Fae",
    description: "Stealth horror heists, trait hunting, and an eldritch trophy cabinet.",
    href: "/",
    image: "/images/warpdoor/image.png",
    tags: ["Horror", "Stealth", "Indie"],
  },
];

// 通过 Playwright MCP 抓取得到的数据文件（已由脚本写入 data/games/clicker.json）
// 将其规范化为 Game，并避免重复
const scrapedGames: Game[] = (scraped as any[]).map((g) => {
  const slug = g.slug as string | undefined;
  const internalHref = slug ? `/games/${slug}` : (g.href as string);
  return {
    title: g.title as string,
    description: (g.description as string) || "",
    href: internalHref,
    image: g.image as string,
    tags: Array.isArray(g.tags) && g.tags.length ? (g.tags as string[]) : ["Clicker"],
    slug,
  };
});

const byTitle = new Set<string>();
const games: Game[] = [];
[...curated, ...scrapedGames].forEach((g) => {
  if (!byTitle.has(g.title)) {
    byTitle.add(g.title);
    games.push(g);
  }
});

export default function GamesIndexPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => g.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter((g) => {
      const matchQ = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
      const matchTag = !activeTag || (g.tags || []).includes(activeTag);
      return matchQ && matchTag;
    });
  }, [query, activeTag]);

  const isExternal = (href: string) => href.startsWith("http");

  return (
    <main className="flex min-h-screen flex-col bg-[#0d1117] text-slate-100">
      <div className="w-full relative">
        <Navigation />
      </div>

      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid gap-6 lg:grid-cols-[260px,1fr]">
          {/* Sidebar */}
          <aside className="rounded-lg border border-slate-700/50 bg-[#161b22] p-4 shadow-lg h-fit">
            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 block mb-2">Search</label>
                <div className="relative">
                  <Input
                    placeholder="Search games..."
                    aria-label="Search games"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-9 bg-[#0d1117] border-slate-700/60 text-slate-100 placeholder:text-slate-500 pl-9 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                  />
                  <Search aria-hidden className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Library</p>
                <nav className="space-y-0.5">
                  {navItems.map(({ label, icon: Icon, active, badge, accent }) => (
                    <button
                      key={label}
                      type="button"
                      className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left transition text-sm ${
                        active
                          ? `bg-gradient-to-r ${accent} border-slate-600 text-slate-100`
                          : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </span>
                      {badge && (
                        <span className="rounded-full bg-emerald-600/30 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-200">
                          {badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Categories</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveTag(null)}
                    className={`rounded-md border px-2.5 py-1 text-[10px] uppercase tracking-wider transition ${
                      activeTag === null
                        ? "border-slate-600 bg-slate-700/40 text-slate-100"
                        : "border-slate-700/60 bg-slate-800/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600"
                    }`}
                  >
                    All
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className={`rounded-md border px-2.5 py-1 text-[10px] uppercase tracking-wider transition ${
                        activeTag === tag
                          ? "border-slate-600 bg-slate-700/40 text-slate-100"
                          : "border-slate-700/60 bg-slate-800/30 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <section className="rounded-lg border border-slate-700/50 bg-[#161b22] p-5 shadow-lg">
            <header className="mb-6">
              <p className="text-xs uppercase tracking-wider text-slate-400">Collection</p>
              <h1 className="text-2xl font-bold mt-1 text-slate-100">Curated Game List</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Discover precision stealth experiences and curated seasonal drops.
              </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((game) => {
                const external = isExternal(game.href);
                return (
                  <div
                    key={game.title}
                    className="group relative overflow-hidden rounded-lg border border-slate-700/60 bg-[#0d1117] transition hover:border-slate-600 hover:shadow-xl"
                  >
                    <div className="relative">
                      {game.image ? (
                        <div className="overflow-hidden">
                          <img
                            src={game.image}
                            alt={game.title}
                            width={372}
                            height={128}
                            loading="lazy"
                            className="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="flex h-32 w-full items-center justify-center bg-slate-900/50 text-slate-600 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="p-3.5">
                      <h2 className="text-base font-semibold text-slate-100 mb-1.5 line-clamp-1 group-hover:text-white transition">
                        {game.title}
                      </h2>
                      <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">{game.description}</p>

                      {game.tags && game.tags.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          {game.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-slate-700/60 bg-slate-800/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-800">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-slate-500">
                          <span>Single</span>
                          <span>•</span>
                          <span>KB+M</span>
                        </div>
                        {external ? (
                          <a
                            href={game.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${game.title} in new tab`}
                            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition bg-slate-700/60 text-slate-200 hover:bg-slate-600 hover:text-white cursor-pointer no-underline"
                          >
                            Launch
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ) : (
                          <Link
                            href={game.href}
                            aria-label={`Open ${game.title}`}
                            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition bg-slate-700/60 text-slate-200 hover:bg-slate-600 hover:text-white cursor-pointer no-underline"
                          >
                            Launch
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Showing {filtered.length} of {games.length} games{activeTag ? ` in ${activeTag}` : ""}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
