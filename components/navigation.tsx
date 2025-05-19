"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="w-full sticky top-0 z-50 grassland-overlay">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3">
        <div className="w-full md:w-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-purple-400">CRAZY</span> <span className="text-green-400">CATTLE</span>{" "}
              <span className="text-yellow-500">3D</span>
            </span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 md:gap-6 mt-4 md:mt-0 text-sm md:text-base`}
        >
          <a href="#play" className="text-green-400 hover:text-green-300 font-medium">
            Play
          </a>
          {/* <a href="#poland-map" className="text-white hover:text-gray-300">
            Poland Map
          </a> */}
          <a href="#how-to-play" className="text-white hover:text-gray-300">
            How to Play
          </a>
          <a href="#features" className="text-white hover:text-gray-300">
            Features
          </a>
          {/* <a href="#about" className="text-white hover:text-gray-300">
            About
          </a> */}
          {/* <a href="#guide" className="text-white hover:text-gray-300">
            Guide
          </a> */}
          <a href="#download" className="text-white hover:text-gray-300">
            Download
          </a>
          <a href="#reviews" className="text-white hover:text-gray-300">
            Reviews
          </a>
          <a href="#faq" className="text-white hover:text-gray-300">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  )
}
