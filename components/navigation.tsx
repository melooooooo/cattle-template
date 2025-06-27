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
  const renderNavLink = (href: string, sectionId: string, label: string, className: string = "text-green-50 hover:text-white", isPage: boolean = false) => {
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
            <Link href="/" className="text-2xl font-bold">
              <span className="text-purple-400">CRAZY</span> <span className="text-green-400">CATTLE</span>{" "}
              <span className="text-yellow-500">3D</span>
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 md:gap-6 mt-4 md:mt-0 text-sm md:text-base`}
        >
          {renderNavLink("https://crazycattle3dx.com/play", "play", "Play", "text-green-200 hover:text-white font-medium")}
          {renderNavLink("https://crazycattle3dx.com/how-to-play", "how-to-play", "How to Play")}
          {renderNavLink("https://crazycattle3dx.com/features", "features", "Features")}
          {renderNavLink("https://crazycattle3dx.com/download", "download", "Download")}
          {renderNavLink("https://crazycattle3dx.com/comments", "comments", "Comments")}
          {renderNavLink("https://crazycattle3dx.com/faq", "faq", "FAQ")}
          {renderNavLink("https://crazycattle3dx.com/blog", "blog", "Blog", "text-green-50 hover:text-white", true)}
        </nav>
      </div>
    </header>
  )
}
