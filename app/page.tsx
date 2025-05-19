'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  Play,
  Download,
  Award,
  Zap,
  Shield,
  Gamepad2,
  Users,
  BarChart,
  Sparkles,
  Maximize,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react"
import Navigation from "@/components/navigation"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      console.log('Search query is empty');
      // Optionally, provide user feedback here, like an alert or a toast.
      return;
    }
    console.log('Search query:', searchQuery);
    // Navigate to the search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

        {/* Search Bar */}
        <div className="w-full max-w-6xl mx-auto p-4 flex items-center gap-2 search-container rounded-md my-2">
          <Input
            placeholder="Ask me anything about Crazy Cattle 3D"
            className="bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.3)] text-white placeholder:text-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Button 
            size="icon" 
            className="bg-green-500 hover:bg-green-600 rounded-full"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Game Iframe */}
        <div id="play" className="w-full max-w-6xl mx-auto p-4 game-container rounded-md my-2">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://crazy-cattle3d.org/game/crazycattle3d/"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="Crazy Cattle 3D Game"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-200">
            <div>Controls: WASD to move | Mouse to aim | Space for special ability</div>
            <Button variant="ghost" size="sm" className="text-gray-200 flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              Fullscreen
            </Button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="w-full max-w-6xl mx-auto mb-8">
          <div className="social-buttons">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcrazy-cattle3d.org%2F" target="_blank" rel="noopener noreferrer" className="social-button facebook">
              <div className="flex justify-center items-center gap-2">
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
              </div>
            </a>
            <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fcrazy-cattle3d.org%2F&text=Check%20out%20Crazy%20Cattle%203D%20-%20the%20most%20entertaining%20sheep%20combat%20simulation!" target="_blank" rel="noopener noreferrer" className="social-button twitter">
              <div className="flex justify-center items-center gap-2">
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">Twitter</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcrazy-cattle3d.org%2F" target="_blank" rel="noopener noreferrer" className="social-button linkedin">
              <div className="flex justify-center items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </div>
            </a>
            <a href="https://api.whatsapp.com/send?text=Check%20out%20Crazy%20Cattle%203D%20-%20the%20most%20entertaining%20sheep%20combat%20simulation!%20https%3A%2F%2Fcrazy-cattle3d.org%2F" target="_blank" rel="noopener noreferrer" className="social-button whatsapp">
              <div className="flex justify-center items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </div>
            </a>
            <a href="https://www.reddit.com/submit?url=https%3A%2F%2Fcrazy-cattle3d.org%2F&title=Crazy%20Cattle%203D" target="_blank" rel="noopener noreferrer" className="social-button reddit">
              <div className="flex justify-center items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Reddit</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Welcome Section - White */}
      <div className="w-full white-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Welcome Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Welcome to Crazy Cattle 3D</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <p className="mb-4">
                  A battle royale rage game about sheep; will you have what it takes to survive in Crazy Cattle 3D?
                </p>
                <p className="mb-6">
                  Crazy Cattle 3D combines physics with chaos, skill with strategy. Control your explosive sheep in
                  Crazy Cattle 3D across three unique environments. Master momentum, use terrain, and become the last
                  sheep standing in the chaotic world of Crazy Cattle 3D!
                </p>
                <div className="flex gap-4">
                  <Button asChild className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg">
                    <a href="#play">PLAY NOW</a>
                  </Button>
                  <Button asChild className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg">
                    <a href="#download">DOWNLOAD CRAZY CATTLE 3D</a>
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src="https://www.youtube.com/embed/qYF-efFnx9A"
                    className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                    title="CrazyCattle3D"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* How to Play - Light Green */}
      <div className="w-full light-green-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section id="how-to-play">
            <h2 className="text-3xl font-bold mb-6 text-center">How to Play Crazy Cattle 3D</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-md border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  Game Objective
                </h3>
                <p className="text-gray-700">
                  Control your sheep and survive until you're the last one remaining
                  <br />
                  Knock other sheep off the map by ramming into them
                  <br />
                  Watch out for fences and edges - touching them means elimination!
                  <br />
                  Win trophies by completing each level
                </p>
              </Card>
              <Card className="bg-white shadow-md border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Gamepad2 className="h-4 w-4 text-white" />
                  </div>
                  Controls
                </h3>
                <p className="text-gray-700">
                  WASD/Arrow Keys: Move your sheep
                  <br />
                  Mouse: Control camera direction
                  <br />
                  Space: Jump/Ram into other sheep
                  <br />
                  Shift: Sprint for faster movement
                </p>
              </Card>
              <Card className="bg-white shadow-md border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  Game Mechanics
                </h3>
                <p className="text-gray-700">
                  Your sheep will explode if knocked over by another sheep
                  <br />
                  Information about eliminated sheep appears at the top of the screen
                  <br />
                  Remaining sheep count is shown in the bottom left corner
                  <br />
                  The game is all about physics - use momentum to your advantage!
                </p>
              </Card>
              <Card className="bg-white shadow-md border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  Hints
                </h3>
                <p className="text-gray-700">
                  There are three unique maps to unlock by progressing through the game
                  <br />
                  Each map has different scenery and varying sheep counts
                  <br />
                  Earn trophies for each map you complete, displayed in the bottom right
                  <br />
                  Adapt your strategy for each unique map layout
                </p>
              </Card>
            </div>
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md">
              <p className="text-green-800 text-sm">
                <strong>Pro Tip:</strong> The chaotic physics are intentional! Learn to control your momentum and use it
                to your advantage. Sometimes letting other sheep eliminate each other is the best strategy for victory.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Discover the Magic - White */}
      <div className="w-full white-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center">Discover the Magic of Crazy Cattle 3D</h2>
            <p className="text-xl text-center text-gray-600 mb-10 px-4">
              Experience what makes Crazy Cattle 3D the most entertaining sheep combat simulation ever created!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-green-50 shadow-md border-green-200 p-4 flex flex-col items-center text-center">
                <div className="bg-green-600 p-3 rounded-full mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Revolutionary Physics</h3>
                <p className="text-gray-700">
                  Crazy Cattle 3D introduces a groundbreaking physics engine specifically designed for authentic sheep movement and explosive collisions.
                </p>
              </Card>
              <Card className="bg-green-50 shadow-md border-green-200 p-4 flex flex-col items-center text-center">
                <div className="bg-green-600 p-3 rounded-full mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Three Unique Environments</h3>
                <p className="text-gray-700">
                  Each location in Crazy Cattle 3D features distinctive terrain that fundamentally changes how you approach combat and survival.
                </p>
              </Card>
              <Card className="bg-green-50 shadow-md border-green-200 p-4 flex flex-col items-center text-center">
                <div className="bg-green-600 p-3 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Skill-Based Advancement</h3>
                <p className="text-gray-700">
                  Unlike many modern games, Crazy Cattle 3D focuses entirely on player skill rather than unlocks or upgrades.
                </p>
              </Card>
            </div>
          </section>
        </div>
      </div>

      {/* Features - Medium Green */}
      <div className="w-full medium-green-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section id="features">
            <h2 className="text-3xl font-bold mb-6 text-center">Crazy Cattle 3D Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <BarChart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Rage-Inducing Physics</h3>
                  <p className="text-gray-700 text-sm">
                    Our intentionally chaotic physics engine will have you screaming at your screen and coming back for more!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Battle Royale Mayhem</h3>
                  <p className="text-gray-700 text-sm">
                    Fight with up to 100 other sheep in a physics-driven battle to be the last one standing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Addictive Frustration</h3>
                  <p className="text-gray-700 text-sm">
                    The perfect balance of challenge and fun, creating that 'just one more game' feeling.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Gamepad2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Customizable Sheep</h3>
                  <p className="text-gray-700 text-sm">
                    Unlock hundreds of accessories and outfits to make your rage-filled sheep uniquely yours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Competitive Multiplayer</h3>
                  <p className="text-gray-700 text-sm">
                    Cross-platform play lets you rage with friends on any device across all global servers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Play className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Free-to-Play</h3>
                  <p className="text-gray-700 text-sm">
                    No pay-to-win mechanics, just pure skill-based (and luck-based) sheep combat.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Download Section - Dark Green */}
      <div className="w-full dark-green-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section id="download">
            <h2 className="text-3xl font-bold mb-6 text-center">Download the Complete Crazy Cattle 3D Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-white text-green-700 hover:bg-gray-100 h-auto py-4 flex flex-col items-center">
                <Download className="h-6 w-6 mb-2" />
                <span className="text-lg font-semibold">Windows</span>
              </Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100 h-auto py-4 flex flex-col items-center">
                <Download className="h-6 w-6 mb-2" />
                <span className="text-lg font-semibold">macOS</span>
              </Button>
              <Button className="bg-white text-green-700 hover:bg-gray-100 h-auto py-4 flex flex-col items-center">
                <Download className="h-6 w-6 mb-2" />
                <span className="text-lg font-semibold">Linux</span>
              </Button>
            </div>
            <p className="text-center text-green-100 text-sm mt-4">
              All files are scanned for viruses and malware. Please check your system requirements before downloading.
            </p>
          </section>
        </div>
      </div>

      {/* FAQ - White */}
      <div className="w-full white-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section id="faq">
            <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions About Crazy Cattle 3D</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-green-200">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    Is Crazy Cattle 3D suitable for beginners?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    Yes, Crazy Cattle 3D is designed to be accessible for players of all skill levels. The game includes
                    a comprehensive tutorial system and gradually introduces new mechanics as you progress.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    Can I play Crazy Cattle 3D offline?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    Yes, the single-player campaign and most game modes can be played completely offline. Only the
                    multiplayer features and leaderboard submissions require an internet connection.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    What is the minimum hardware requirement for running Crazy Cattle 3D?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    Crazy Cattle 3D is optimized to run on a wide range of hardware. Minimum requirements include:
                    Windows 10/macOS 10.14/Ubuntu 18.04, Intel Core i3 or equivalent, 4GB RAM, and any DirectX 11
                    compatible graphics card with 1GB VRAM.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    Are there in-app purchases in Crazy Cattle 3D?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    The core game experience is completely free to play. Optional in-app purchases are available for
                    cosmetic items, additional level packs, and premium sheep customizations that do not affect gameplay
                    balance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    How often does Crazy Cattle 3D receive updates?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    The development team releases major content updates quarterly, with smaller patches and bug fixes
                    deployed monthly. Seasonal events are also introduced throughout the year to keep the gameplay fresh
                    and engaging.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </div>
      </div>

      {/* Player Reactions - Light Green */}
      <div className="w-full light-green-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section id="reviews">
            <h2 className="text-3xl font-bold mb-6 text-center">Crazy Cattle 3D Player Reactions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-md border-green-200 p-4">
                <p className="text-green-600 mb-2 text-sm">★★★★★</p>
                <p className="text-gray-700 mb-4">
                  "I've been playing Crazy Cattle 3D for months now and I'm still discovering new secrets and
                  strategies. The developers have created an incredibly deep and engaging experience!"
                </p>
                <p className="text-green-700 font-semibold">- SheepHerder42</p>
              </Card>
              <Card className="bg-white shadow-md border-green-200 p-4">
                <p className="text-green-600 mb-2 text-sm">★★★★★</p>
                <p className="text-gray-700 mb-4">
                  "The physics in this game are incredible! The way the sheep move and interact with the environment
                  feels so realistic. Plus, the multiplayer mode is super fun with friends."
                </p>
                <p className="text-green-700 font-semibold">- FarmLife99</p>
              </Card>
              <Card className="bg-white shadow-md border-green-200 p-4">
                <p className="text-green-600 mb-2 text-sm">★★★★★</p>
                <p className="text-gray-700 mb-4">
                  "My kids and I play Crazy Cattle 3D together every weekend. It's educational, entertaining, and has
                  actually taught them a lot about farm animals and responsibility!"
                </p>
                <p className="text-green-700 font-semibold">- FamilyGamer2023</p>
              </Card>
            </div>
          </section>
        </div>
      </div>

      {/* Footer - Grassland */}
      <div className="w-full grassland-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <footer className="w-full text-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-white font-semibold mb-3">QUICK LINKS</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Download
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">RESOURCES</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Updates
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">LEGAL</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Cookies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Licenses
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-300">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">CONNECT</h3>
                <p className="text-sm mb-4">Stay updated with the latest news and updates about Crazy Cattle 3D.</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Your email"
                    className="bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.3)] text-white placeholder:text-gray-300 text-sm h-9"
                  />
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 h-9">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <div className="border-t border-[rgba(255,255,255,0.2)] pt-6 text-center text-sm">
              <p>© 2025 Crazy Cattle 3D. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
