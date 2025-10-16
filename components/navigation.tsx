"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // 添加滚动到指定区域的函数
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // 如果找不到元素，则导航到主页相应部分
      window.location.href = `/#${sectionId}`
    }
  }

  // 创建导航链接的渲染函数
  const renderNavLink = (href: string, sectionId: string, label: string, className: string = "text-slate-200 hover:text-rose-300", isPage: boolean = false) => {
    // 当前页面是否已经是目标页面
    const isCurrentPage = pathname === `/${sectionId}` || 
                         (pathname === '/play' && sectionId === 'play') ||
                         (pathname === '/how-to-play' && sectionId === 'how-to-play') ||
                         (pathname === '/features' && sectionId === 'features') ||
                         (pathname === '/download' && sectionId === 'download') ||
                         (pathname === '/comments' && sectionId === 'comments') ||
                         (pathname === '/faq' && sectionId === 'faq') ||
                         (pathname === '/blog' && sectionId === 'blog') ||
                         (pathname.startsWith('/blog/') && sectionId === 'blog');
    
    // 如果是独立页面（如blog），直接使用链接导航
    if (isPage) {
      return (
        <Link href={`/${sectionId}`} className={`${className} ${isCurrentPage ? 'opacity-75' : ''}`}>
          {label}
        </Link>
      )
    }
    
    if (isHomePage) {
      // 在主页上使用滚动功能
      return (
        <a 
          href={href} 
          onClick={(e) => scrollToSection(e, sectionId)} 
          className={className}
        >
          {label}
        </a>
      )
    } else if (isCurrentPage) {
      // 如果已经在目标页面，点击时不做任何操作
      return (
        <span className={`${className} cursor-default opacity-75`}>
          {label}
        </span>
      )
    } else {
      // 在其他页面上直接使用href链接
      return (
        <a href={href} className={className}>
          {label}
        </a>
      )
    }
  }

  return (
    <header className="w-full sticky top-0 z-50 grassland-overlay">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
        <div className="w-full md:w-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-slate-100">
              <span className="text-rose-400">THE</span> <span className="text-violet-300">TOOTH</span>{" "}
              <span className="text-slate-200">FAE</span>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 md:gap-6 mt-4 md:mt-0 text-sm md:text-base`}
        >
          {renderNavLink("https://thetoothfae.com/play", "play", "Play", "text-rose-300 hover:text-white font-medium")}
          {renderNavLink("https://thetoothfae.com/how-to-play", "how-to-play", "How to Play", "text-slate-200 hover:text-white")}
          {renderNavLink("https://thetoothfae.com/features", "features", "Features", "text-slate-200 hover:text-white")}
          {renderNavLink("https://thetoothfae.com/download", "download", "Download", "text-slate-200 hover:text-white")}
          {renderNavLink("https://thetoothfae.com/comments", "comments", "Comments", "text-slate-200 hover:text-white")}
          {renderNavLink("https://thetoothfae.com/faq", "faq", "FAQ", "text-slate-200 hover:text-white")}
          {renderNavLink("https://thetoothfae.com/blog", "blog", "Blog", "text-slate-100 hover:text-rose-300", true)}
        </nav>
      </div>
    </header>
  )
}
