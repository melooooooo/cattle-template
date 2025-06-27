'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from 'next/link'
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
import Head from 'next/head';
import { defaultSeoConfig } from '@/lib/seo-config';

export default function Home() {
  // 用于规范URL的基础URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crazycattle3dx.com';
  
  const [downloadStatus, setDownloadStatus] = useState<{[key: string]: boolean}>({});
  const [comments, setComments] = useState<any[]>([]);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest', 'oldest', 'likes'
  const [voteStatus, setVoteStatus] = useState<{[key: string]: boolean}>({});

  // 添加滚动到指定区域的函数
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch comments
  const fetchComments = async (currentSortOrder = sortOrder) => {
    try {
      console.log('获取评论列表，排序方式:', currentSortOrder);
      const response = await fetch(`/api/comments?sortBy=${currentSortOrder}`);
      if (response.ok) {
        const data = await response.json();
        console.log('获取到评论:', data.length, '条');
        setComments(data);
      } else {
        console.error('获取评论失败:', response.statusText);
      }
    } catch (error) {
      console.error('获取评论时发生错误:', error);
    }
  };

  // Handle sort order change
  const handleSortChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };

  // Load comments on page load and when sortOrder changes
  useEffect(() => {
    fetchComments(sortOrder);
  }, [sortOrder]);

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentForm(prev => ({
      ...prev,
      agreeToTerms: e.target.checked
    }));
  };

  // Submit comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!commentForm.name || !commentForm.email || !commentForm.content) {
      setErrorMessage('Please fill in all required fields');
      setSubmitSuccess(false);
      return;
    }

    if (!commentForm.agreeToTerms) {
      setErrorMessage('Please agree to the terms and conditions');
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: commentForm.name,
          email: commentForm.email,
          content: commentForm.content
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit comment');
      }

      // Get latest comments
      await fetchComments();
      
      // Reset form
      setCommentForm({
        name: '',
        email: '',
        content: '',
        agreeToTerms: false
      });
      
      setSubmitSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitSuccess(null), 3000);
      
    } catch (error) {
      console.error('Failed to submit comment:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit comment. Please try again later.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle like/dislike
  const handleVote = async (id: string | number, action: 'like' | 'dislike') => {
    // 将ID统一转为字符串，确保一致的比较
    const stringId = String(id);
    
    // 阻止重复点击
    const voteKey = `${stringId}-${action}`;
    if (voteStatus[voteKey]) {
      return;
    }
    
    // 设置加载状态
    setVoteStatus(prev => ({ ...prev, [voteKey]: true }));
    
    try {
      console.log(`尝试${action === 'like' ? '点赞' : '踩'} 评论ID: ${stringId}`);
      
      // 乐观更新UI - 立即更新点赞数，让用户感觉更快
      setComments(prevComments => 
        prevComments.map(comment => 
          String(comment.id) === stringId
            ? { 
                ...comment, 
                [action === 'like' ? 'likes' : 'dislikes']: (comment[action === 'like' ? 'likes' : 'dislikes'] || 0) + 1 
              }
            : comment
        )
      );
      
      // 发送请求到后端
      const response = await fetch('/api/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: stringId, action }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('点赞/踩操作成功:', data);
        
        // 用服务器返回的实际数据更新UI
        if (data.comment) {
          setComments(prevComments => 
            prevComments.map(comment => 
              String(comment.id) === String(data.comment.id) || String(comment.id) === stringId
                ? { 
                    ...comment, 
                    likes: data.comment.likes,
                    dislikes: data.comment.dislikes
                  }
                : comment
            )
          );
        }
      } else {
        console.error('点赞/踩操作失败:', data.error || response.statusText);
        // 恢复UI显示的点赞数
        setComments(prevComments => 
          prevComments.map(comment => 
            String(comment.id) === stringId
              ? { 
                  ...comment, 
                  [action === 'like' ? 'likes' : 'dislikes']: (comment[action === 'like' ? 'likes' : 'dislikes'] || 1) - 1 
                }
              : comment
          )
        );
        
        // 使用更友好的错误提示
        if (data.error === '找不到该评论') {
          alert('无法为此评论点赞，该评论可能已被删除');
        } else {
          alert(`操作失败: ${data.error || '请稍后再试'}`);
        }
      }
    } catch (error) {
      console.error('处理点赞/踩时发生错误:', error);
      // 恢复UI显示的点赞数
      setComments(prevComments => 
        prevComments.map(comment => 
          String(comment.id) === stringId
            ? { 
                ...comment, 
                [action === 'like' ? 'likes' : 'dislikes']: (comment[action === 'like' ? 'likes' : 'dislikes'] || 1) - 1 
              }
            : comment
        )
      );
      alert('操作失败，请稍后再试');
    } finally {
      // 清除加载状态
      setTimeout(() => {
        setVoteStatus(prev => ({ ...prev, [voteKey]: false }));
      }, 500); // 短暂延迟，防止用户快速多次点击
    }
  };

  const handleDownload = async (platform: string) => {
    const apiUrl = `/api/download?platform=${platform}`;
    
    if (downloadStatus[platform]) {
      return; // Prevent repeated clicks
    }

    setDownloadStatus(prev => ({ ...prev, [platform]: true }));
    
    try {
      // First get download link from API
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Server error (${response.status}), please try again later`);
      }
      
      const data = await response.json();
      
      // Create download link
      const link = document.createElement('a');
      link.href = data.url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert(error instanceof Error ? error.message : 'Download failed, please try again later');
    } finally {
      setDownloadStatus(prev => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Top Grassland Section */}
      <div className="w-full grassland-section">
        {/* Use the Navigation component */}
        <Navigation />

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
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcrazycattle3dx.com%2F" target="_blank" rel="noopener noreferrer" className="social-button facebook">
              <div className="flex justify-center items-center gap-2">
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
              </div>
            </a>
            <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fcrazycattle3dx.com%2F&text=Check%20out%20Crazy%20Cattle%203D%20-%20the%20most%20entertaining%20sheep%20combat%20simulation!" target="_blank" rel="noopener noreferrer" className="social-button twitter">
              <div className="flex justify-center items-center gap-2">
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">Twitter</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fcrazycattle3dx.com%2F" target="_blank" rel="noopener noreferrer" className="social-button linkedin">
              <div className="flex justify-center items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </div>
            </a>
            <a href="https://api.whatsapp.com/send?text=Check%20out%20Crazy%20Cattle%203D%20-%20the%20most%20entertaining%20sheep%20combat%20simulation!%20https%3A%2F%2Fcrazycattle3dx.com%2F" target="_blank" rel="noopener noreferrer" className="social-button whatsapp">
              <div className="flex justify-center items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </div>
            </a>
            <a href="https://www.reddit.com/submit?url=https%3A%2F%2Fcrazycattle3dx.com%2F&title=Crazy%20Cattle%203D" target="_blank" rel="noopener noreferrer" className="social-button reddit">
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
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Crazy Cattle 3D</h1>
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
                    <a href="https://crazycattle3dx.com/play">PLAY NOW</a>
                  </Button>
                  <Button asChild className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg">
                    <a href="https://crazycattle3dx.com/download" onClick={(e) => scrollToSection(e, "download")}>DOWNLOAD CRAZY CATTLE 3D</a>
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
              <Button 
                className="bg-white text-green-700 hover:bg-gray-100 h-auto py-4 flex flex-col items-center relative"
                onClick={() => handleDownload('windows')}
                disabled={downloadStatus['windows']}
              >
                {downloadStatus['windows'] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
                  </div>
                ) : (
                  <>
                    <Download className="h-6 w-6 mb-2" />
                    <span className="text-lg font-semibold">Windows</span>
                  </>
                )}
              </Button>
              <Button 
                className="bg-white text-green-700 hover:bg-gray-100 h-auto py-4 flex flex-col items-center relative"
                onClick={() => handleDownload('macos')}
                disabled={downloadStatus['macos']}
              >
                {downloadStatus['macos'] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
                  </div>
                ) : (
                  <>
                    <Download className="h-6 w-6 mb-2" />
                    <span className="text-lg font-semibold">macOS</span>
                  </>
                )}
              </Button>
              <Button 
                className="bg-white text-green-700 hover:bg-gray-100 h-auto py-4 flex flex-col items-center relative"
                onClick={() => handleDownload('linux')}
                disabled={downloadStatus['linux']}
              >
                {downloadStatus['linux'] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
                  </div>
                ) : (
                  <>
                    <Download className="h-6 w-6 mb-2" />
                    <span className="text-lg font-semibold">Linux</span>
                  </>
                )}
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
          <section id="comments">
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-green-800">Comments ({comments.length})</h3>
                    <div className="text-sm flex items-center">
                      <span className="text-green-600 mr-2">Sort by:</span>
                      <select 
                        value={sortOrder} 
                        onChange={(e) => handleSortChange(e.target.value)} 
                        className="p-1 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="likes">Most Liked</option>
                      </select>
                    </div>
                  </div>
              
              {comments.length === 0 ? (
                <div className="text-center py-8 text-green-600">
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                <>
                                    {/* Comments list */}
                  {comments.map((comment) => (
                    <div key={comment.id} className="mb-6 pb-6 border-b border-green-200">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-green-800">{comment.name}</span>
                            <span className="text-green-500 text-sm">{comment.date}</span>
                          </div>
                          <p className="text-green-700 mb-3">{comment.content}</p>
                          <div className="flex items-center gap-5">
                            <button className="flex items-center gap-1 text-green-600 hover:text-green-700">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                              </svg>
                              <span>Reply</span>
                            </button>
                            <div className="flex items-center gap-3">
                              <button 
                                className={`flex items-center gap-1 text-green-600 hover:text-green-800 transition-all ${voteStatus[`${comment.id}-like`] ? 'opacity-50' : ''}`}
                                onClick={() => !voteStatus[`${comment.id}-like`] && handleVote(comment.id, 'like')}
                                disabled={voteStatus[`${comment.id}-like`]}
                              >
                                <svg 
                                  className={`w-5 h-5 transition-transform duration-200 ${voteStatus[`${comment.id}-like`] ? 'scale-110' : 'scale-100'}`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                                </svg>
                                <span>{comment.likes || 0}</span>
                              </button>
                              <button 
                                className={`flex items-center gap-1 text-green-600 hover:text-red-600 transition-all ${voteStatus[`${comment.id}-dislike`] ? 'opacity-50' : ''}`}
                                onClick={() => !voteStatus[`${comment.id}-dislike`] && handleVote(comment.id, 'dislike')}
                                disabled={voteStatus[`${comment.id}-dislike`]}
                              >
                                <svg 
                                  className={`w-5 h-5 transition-transform duration-200 ${voteStatus[`${comment.id}-dislike`] ? 'scale-110' : 'scale-100'}`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2"></path>
                                </svg>
                                <span>{comment.dislikes || 0}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              
              {comments.length > 0 && (
                <button className="w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors">
                  Load more comments
                </button>
              )}
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mt-8">
                {submitSuccess === true && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Comment submitted successfully!
                  </div>
                )}
                
                {submitSuccess === false && errorMessage && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {errorMessage}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input 
                    type="text" 
                    name="name"
                    value={commentForm.name}
                    onChange={handleInputChange}
                    placeholder="Name" 
                    className="w-full px-4 py-2 bg-green-50 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-green-400"
                  />
                  <input 
                    type="email" 
                    name="email"
                    value={commentForm.email}
                    onChange={handleInputChange}
                    placeholder="Email" 
                    className="w-full px-4 py-2 bg-green-50 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-green-400"
                  />
                </div>
                <textarea 
                  name="content"
                  value={commentForm.content}
                  onChange={handleInputChange}
                  placeholder="Comment content" 
                  rows={5} 
                  className="w-full px-4 py-2 bg-green-50 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 mb-4 placeholder-green-400"
                ></textarea>
                <div className="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={commentForm.agreeToTerms}
                    onChange={handleCheckboxChange}
                    className="mr-2 accent-green-600"
                  />
                  <label htmlFor="terms" className="text-sm text-green-700">
                    I have read and agree to the terms and conditions.
                  </label>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>

      {/* Footer - Dark Green */}
      <div className="w-full dark-green-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <footer className="w-full rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-3">QUICK LINKS</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://crazycattle3dx.com" onClick={(e) => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'})}} className="text-neutral-800 hover:text-green-600">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="https://crazycattle3dx.com/features" onClick={(e) => scrollToSection(e, "features")} className="text-neutral-800 hover:text-green-600">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="https://crazycattle3dx.com/download" onClick={(e) => scrollToSection(e, "download")} className="text-neutral-800 hover:text-green-600">
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">RESOURCES</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://crazycattle3dx.com/how-to-play" onClick={(e) => scrollToSection(e, "how-to-play")} className="text-neutral-800 hover:text-green-600">
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="https://crazycattle3dx.com/faq" onClick={(e) => scrollToSection(e, "faq")} className="text-neutral-800 hover:text-green-600">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="https://crazycattle3dx.com/blog" className="text-neutral-800 hover:text-green-600">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">LEGAL</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/terms" className="text-neutral-800 hover:text-green-600">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-neutral-800 hover:text-green-600">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <a href="https://crazycattle3dx.com/comments" 
                      onClick={(e) => {
                        e.preventDefault();
                        const commentsSection = document.getElementById("comments");
                        if (commentsSection) {
                          commentsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }} 
                      className="text-neutral-800 hover:text-green-600">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">CONNECT</h3>
                <p className="text-sm mb-4">Stay updated with the latest news and updates about Crazy Cattle 3D.</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Your email"
                    className="bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.3)] text-neutral-800 placeholder:text-neutral-500 text-sm h-9"
                  />
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 h-9 text-neutral-800">
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
