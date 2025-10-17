"use client"

import { Home as HomeIcon, Gamepad2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isGames = pathname?.startsWith("/games")

  const pillBase =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] text-slate-100/90 ring-1 ring-[rgba(122,52,99,0.35)] bg-[#14141f] hover:text-white hover:ring-rose-400/60 hover:bg-[#171723] transition"
  const pillActive = "text-white ring-rose-400/60 bg-[#171723] shadow-[0_10px_25px_-18px_rgba(239,147,219,0.9)]"

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Dark Glass Top Bar */}
      <div className="relative isolate border-b border-[rgba(122,52,99,0.35)] bg-gradient-to-r from-[#090918]/95 via-[#120a1b]/92 to-[#090918]/95 backdrop-blur-md shadow-[0_16px_42px_-24px_rgba(140,67,170,0.6)]">
        <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_top,_rgba(148,64,158,0.18),_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-4 group select-none">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-rose-400/40 bg-[radial-gradient(ellipse_at_center,_rgba(239,147,219,0.20),_transparent_60%)] shadow-[0_0_24px_rgba(239,147,219,0.18)]">
              <span className="absolute inset-0 rounded-full border border-white/10" />
              <span className="text-[13px] font-semibold tracking-[0.22em] text-rose-200">TF</span>
            </span>
            <span className="text-2xl md:text-3xl font-extrabold uppercase leading-none tracking-[0.14em] bg-gradient-to-r from-indigo-100 via-fuchsia-100 to-rose-100 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(233,200,255,0.25)]">
              The Tooth Fae
            </span>
          </Link>

          {/* Primary items */}
          <nav className="flex items-center gap-2">
            <Link href="/" className={`${pillBase} ${isHome ? pillActive : ""}`}>
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/games" className={`${pillBase} ${isGames ? pillActive : ""}`}>
              <Gamepad2 className="h-4 w-4" />
              <span>All Games</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Breadcrumb Bar (dark to match site) */}
      <div className="w-full border-b border-[rgba(122,52,99,0.35)] bg-[#0b0d16]">
        <div className="max-w-7xl mx-auto px-4 py-2.5 text-sm text-slate-200/90 flex items-center gap-2">
          <Link href="/" className="hover:text-rose-200">Home</Link>
          <span className="text-slate-500">›</span>
          <span className="text-slate-100/95 font-medium">{isGames ? "All Games" : "The Tooth Fae"}</span>
        </div>
      </div>
    </header>
  )
}
