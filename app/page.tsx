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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thetoothfae.com';
  
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
              src="https://html.itch.zone/html/15168109/index.html"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="The Tooth Fae Game"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm text-gray-200">
            <div>Click to start your magical tooth collection adventure!</div>
            <Button variant="ghost" size="sm" className="text-gray-200 flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              Fullscreen
            </Button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="w-full max-w-6xl mx-auto mb-8">
          <div className="social-buttons">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fthetoothfae.com%2F" target="_blank" rel="noopener noreferrer" className="social-button facebook">
              <div className="flex justify-center items-center gap-2">
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
              </div>
            </a>
            <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fthetoothfae.com%2F&text=Learn%20the%20secrets%20of%20The%20Tooth%20Fae%20%E2%80%94%20the%20grim%20fairy%20heist%20adventure!" target="_blank" rel="noopener noreferrer" className="social-button twitter">
              <div className="flex justify-center items-center gap-2">
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">Twitter</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fthetoothfae.com%2F" target="_blank" rel="noopener noreferrer" className="social-button linkedin">
              <div className="flex justify-center items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </div>
            </a>
            <a href="https://api.whatsapp.com/send?text=Join%20me%20in%20The%20Tooth%20Fae%20%E2%80%94%20a%20dark%20fantasy%20tooth%20heist!%20https%3A%2F%2Fthetoothfae.com%2F" target="_blank" rel="noopener noreferrer" className="social-button whatsapp">
              <div className="flex justify-center items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </div>
            </a>
            <a href="https://www.reddit.com/submit?url=https%3A%2F%2Fthetoothfae.com%2F&title=The%20Tooth%20Fae%20%E2%80%94%20The%20Ultimate%20Tooth%20Collection%20Guide" target="_blank" rel="noopener noreferrer" className="social-button reddit">
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
            <h1 className="text-3xl font-bold mb-6 text-center text-slate-100">Welcome to The Tooth Fae</h1>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <p className="mb-4 text-neutral-200">
                  Slip through darkened hallways as the Queen’s favored collector. Every home is a heist, every tooth a whispered
                  relic waiting to be freed from mortal gums.
                </p>
                <p className="mb-6 text-neutral-200">
                  The Tooth Fae blends stealth horror with tense resource management. Map donor traits, throttle Lucidity, Pain, and
                  Fear, and feed the Queen’s cabinet with pristine trophies before the household stirs.
                </p>
                <div className="flex gap-4">
                  <Button asChild className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg">
                    <a href="/play">PLAY NOW</a>
                  </Button>
                  <Button asChild className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg">
                    <a href="/download" onClick={(e) => scrollToSection(e, "download")}>DOWNLOAD THE TOOTH FAE</a>
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src="https://www.youtube.com/embed/GmfED4NCbSc"
                    className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                    title="The Tooth Fae"
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
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">Field Briefing: Surviving the Heist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-md border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                  Primary Directive
                </h3>
                <p className="text-gray-700">
                  Harvest 16 unique teeth to complete the Queen’s "Perfect Lovelies" cabinet.
                  <br />
                  Target donors whose traits align with rare drops—Sparkling, Gemini, Watcher, Key, and more.
                  <br />
                  Enter silently, extract quickly, and vanish before Lucidity peaks or shock kills the donor.
                  <br />
                  Failures leave cracked trophies and earn the Queen’s ire. Planning is survival.
                </p>
              </Card>
              <Card className="bg-white shadow-md border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Gamepad2 className="h-4 w-4 text-white" />
                  </div>
                  Controls
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li><span className="font-semibold">Glide Forward:</span> W</li>
                  <li><span className="font-semibold">Drift Back:</span> S</li>
                  <li><span className="font-semibold">Strafe Left / Right:</span> A / D</li>
                  <li><span className="font-semibold">Creep (Silent Step):</span> C or Left Ctrl</li>
                  <li><span className="font-semibold">Interact / Extract:</span> E or Left Mouse Click</li>
                  <li><span className="font-semibold">Survey the Room:</span> Mouse movement</li>
                </ul>
              </Card>
              <Card className="bg-white shadow-md border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  Meter Management
                </h3>
                <p className="text-gray-700">
                  Lucidity is the alarm—dust after every loud action to keep it low.
                  <br />
                  Pain feeds failure. Pulse the drill and inject anesthetic around the 75% mark.
                  <br />
                  Fear accelerates Lucidity. Never let it surge unchecked.
                  <br />
                  Repeat the mantra: “Drill a bit, dust a bit.” Greed wakes the room.
                </p>
              </Card>
              <Card className="bg-white shadow-md border-gray-200 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  Trait Intel
                </h3>
                <p className="text-gray-700">
                  Heavy Sleepers forgive longer drills; Night Owls wake if you hesitate.
                  <br />
                  Tough donors demand extra anesthetic. Fragile or Brittle teeth shatter under pressure.
                  <br />
                  Vampires, Eldritch, and Ancient households warp the meters—enter stocked with Dust.
                  <br />
                  Log every rare pull so the Queen trusts your progress through the collection.
                </p>
              </Card>
            </div>
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md">
              <p className="text-green-800 text-sm">
                <strong>Field Note:</strong> Keep the rhythm tight—two seconds of drilling, dust, reassess. Let the meters dictate
                your pace, not impatience. The only loud noise should be the latch closing as you disappear.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Discover the Magic - White */}
      <div className="w-full white-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">Why the Queen Sends You</h2>
            <p className="text-xl text-center text-gray-600 mb-10 px-4">
              Every corridor, every meter, every tooth—master them, and the Queen keeps your wings. Fail, and she sends another.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-green-50 shadow-md border-green-200 p-4 flex flex-col items-center text-center">
                <div className="bg-green-600 p-3 rounded-full mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Night Houses</h3>
                <p className="text-gray-700">
                  Each neighborhood reshapes itself nightly—creaking boards, whispering vents, wandering pets. Learn their patterns or lose your mark.
                </p>
              </Card>
              <Card className="bg-green-50 shadow-md border-green-200 p-4 flex flex-col items-center text-center">
                <div className="bg-green-600 p-3 rounded-full mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Donor Profiles</h3>
                <p className="text-gray-700">
                  Trait combos matter: Insomniac teens thrash at faint sounds, Eldritch children warp the UI, and Vampires open their eyes the moment you hesitate.
                </p>
              </Card>
              <Card className="bg-green-50 shadow-md border-green-200 p-4 flex flex-col items-center text-center">
                <div className="bg-green-600 p-3 rounded-full mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Clean Exits</h3>
                <p className="text-gray-700">
                  Banish every trace of your visit—snuff the candles, slow the breathing, and leave only an empty pillowcase behind.
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
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">Systems That Keep You Alive</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <BarChart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Meter-Oriented Stealth</h3>
                  <p className="text-gray-700 text-sm">
                    Balance Lucidity, Pain, and Fear in real time. Push too far with the drill and the donor jerks awake; hesitate and your trophy rots.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Living Floorplans</h3>
                  <p className="text-gray-700 text-sm">
                    Houses breathe, creak, and retaliate. Memorize escape routes, crawling pets, and creaky boards before committing to an extraction.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Relentless Progression</h3>
                  <p className="text-gray-700 text-sm">
                    Each successful pull unlocks new intel, rare donor spawns, and harder heists. The Queen always hungers for rarer teeth.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Gamepad2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Loadout Tuning</h3>
                  <p className="text-gray-700 text-sm">
                    Swap Dust potency, drill bit temper, and anesthetic dosage to suit your target. Preparation is the quiet difference between art and failure.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">Trait Codex</h3>
                  <p className="text-gray-700 text-sm">
                    Maintain dossiers on Heavy Sleepers, Tough mortals, Insomniacs, Vampires, Ancients, and Eldritch children. Each changes the rhythm of extraction.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md">
                <div className="bg-green-600 p-2 rounded-full shrink-0 mt-1">
                  <Play className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-1">No Grind, Just Precision</h3>
                  <p className="text-gray-700 text-sm">
                    No paywalls, no gacha—only your mastery over the meters determines success. Practice, adapt, and bring home intact trophies.
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
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">Download the Field Training Build</h2>
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
              Training zips mirror live builds but ship with placeholder binaries. Review the included readme for trait drills and
              meter practice scenarios before stepping into a real neighborhood.
            </p>
          </section>
        </div>
      </div>

      {/* FAQ - White */}
      <div className="w-full white-section py-12">
        <div className="max-w-6xl mx-auto px-4">
          <section id="faq">
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">Frequently Asked Nightmares</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-green-200">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    Is The Tooth Fae meant for kids?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    Not this briefing. The Tooth Fae leans into stealth horror—managing pain, fear, and the risk of waking donors. Expect tense
                    scenarios, sudden failures, and unnerving lore rather than bedtime stories.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    Do I need to stay online during a heist?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    The sole operative campaign and training contracts run offline. Connect only to pull down updates, share cabinet data, or
                    submit leaderboard runs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    What hardware keeps the build stable?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    Windows 10/macOS 10.14/Ubuntu 18.04, an i3/Ryzen 3 class CPU, 4GB RAM, and any GPU with 1GB VRAM are enough. SSD storage
                    shortens nightly load times. The browser build mirrors these requirements.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    Are there monetization traps?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    None. The Queen rewards precision, not wallets. Optional vanity wings and cabinet dioramas exist, but the extraction loop
                    remains untouched.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-green-200">
                  <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 bg-green-50">
                    How often are new heists added?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-4 py-3">
                    Expect quarterly drops featuring new donor archetypes, tooth variants, and lore events. Hotfixes roll out as meter
                    exploits or trait bugs surface.
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
                    <a href="https://thetoothfae.com" onClick={(e) => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'})}} className="text-neutral-800 hover:text-green-600">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="https://thetoothfae.com/#features" onClick={(e) => scrollToSection(e, "features")} className="text-neutral-800 hover:text-green-600">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="https://thetoothfae.com/#download" onClick={(e) => scrollToSection(e, "download")} className="text-neutral-800 hover:text-green-600">
                      Download
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">RESOURCES</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://thetoothfae.com/#how-to-play" onClick={(e) => scrollToSection(e, "how-to-play")} className="text-neutral-800 hover:text-green-600">
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="https://thetoothfae.com/#faq" onClick={(e) => scrollToSection(e, "faq")} className="text-neutral-800 hover:text-green-600">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="https://thetoothfae.com/blog" className="text-neutral-800 hover:text-green-600">
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
                    <a href="https://thetoothfae.com/#comments" 
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
                <p className="text-sm mb-4">Stay updated with the latest strategy notes and patch news for The Tooth Fae.</p>
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
              <p>© 2025 The Tooth Fae. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
