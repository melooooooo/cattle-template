"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  // 根据窗口尺寸在移动端关闭导航抽屉
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = `/#${sectionId}`
    }
  }

  const renderNavLink = (
    href: string,
    sectionId: string,
    label: string,
    emphasize: boolean = false,
    isPage: boolean = false
  ) => {
    const isCurrentPage =
      pathname === `/${sectionId}` ||
      (pathname === "/play" && sectionId === "play") ||
      (pathname === "/how-to-play" && sectionId === "how-to-play") ||
      (pathname === "/features" && sectionId === "features") ||
      (pathname === "/download" && sectionId === "download") ||
      (pathname === "/comments" && sectionId === "comments") ||
      (pathname === "/faq" && sectionId === "faq") ||
      (pathname === "/blog" && sectionId === "blog") ||
      (pathname.startsWith("/blog/") && sectionId === "blog")

    const baseClasses =
      "group relative flex items-center px-3 py-2 text-xs md:text-sm tracking-[0.32em] uppercase transition-colors duration-200"
    const activeClasses = isCurrentPage ? "text-rose-300" : emphasize ? "text-rose-200" : "text-slate-200"
    const hoverClasses = "hover:text-rose-300"

    const Highlight = ({ active }: { active: boolean }) => (
      <span
        className={`pointer-events-none absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-transparent via-rose-400/75 to-transparent transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-80"
        }`}
      />
    )

    const renderAnchor = (props: React.HTMLProps<HTMLAnchorElement>) => (
      <a {...props} className={`${baseClasses} ${activeClasses} ${hoverClasses}`}>
        <span className="relative z-10">{label}</span>
        <Highlight active={isCurrentPage} />
      </a>
    )

    if (isPage) {
      return (
        <Link href={`/${sectionId}`} className={`${baseClasses} ${activeClasses} ${hoverClasses}`}>
          <span className="relative z-10">{label}</span>
          <Highlight active={isCurrentPage} />
        </Link>
      )
    }

    if (isHomePage) {
      return renderAnchor({
        href,
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, sectionId),
      })
    }

    if (isCurrentPage) {
      return (
        <span className={`${baseClasses} text-rose-300 cursor-default`}>
          <span className="relative z-10">{label}</span>
          <Highlight active />
        </span>
      )
    }

    return renderAnchor({ href })
  }

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="relative isolate border-b border-[rgba(122,52,99,0.35)] bg-gradient-to-r from-[#090918]/95 via-[#120a1b]/92 to-[#090918]/95 backdrop-blur-md shadow-[0_16px_42px_-24px_rgba(140,67,170,0.6)]">
        <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle_at_top,_rgba(148,64,158,0.18),_transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
          <div className="w-full md:w-auto flex items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-[rgba(128,43,107,0.35)] backdrop-blur">
                <span className="absolute inset-0 rounded-full border border-rose-500/40 shadow-[0_0_18px_rgba(237,120,198,0.25)]" />
                <span className="text-rose-300 text-lg font-semibold tracking-[0.4em]">TF</span>
              </span>
              <Link href="/" className="text-2xl font-bold text-slate-100 tracking-[0.4em] uppercase">
                Tooth <span className="text-violet-200">Fae</span>
              </Link>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden text-slate-200" onClick={toggleMenu} aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <nav
            className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto items-center gap-3 md:gap-5 mt-4 md:mt-0`}
          >
            {renderNavLink("https://thetoothfae.com/play", "play", "Play", true)}
            {renderNavLink("https://thetoothfae.com/how-to-play", "how-to-play", "How to Play")}
            {renderNavLink("https://thetoothfae.com/features", "features", "Features")}
            {renderNavLink("https://thetoothfae.com/download", "download", "Download")}
            {renderNavLink("https://thetoothfae.com/comments", "comments", "Comments")}
            {renderNavLink("https://thetoothfae.com/faq", "faq", "FAQ")}
            {renderNavLink("https://thetoothfae.com/blog", "blog", "Blog", false, true)}

            <Button
              asChild
              className="mt-4 md:mt-0 bg-rose-500/80 hover:bg-rose-500 text-white tracking-[0.32em] uppercase px-5 py-2 shadow-[0_10px_25px_-18px_rgba(239,147,219,0.9)]"
            >
              <Link href="/download">Get Build</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
