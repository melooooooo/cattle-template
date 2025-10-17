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


      {/* Main Content Layout */}
      <div className="w-full py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10 lg:flex-row">
          <div className="lg:w-[70%] space-y-10">
            <section className="rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-6 shadow-[0_18px_36px_-24px_rgba(147,72,166,0.6)]">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="lg:w-1/2 space-y-4">
                  <h2 className="text-2xl font-semibold tracking-[0.28em] uppercase text-slate-100">Briefing Room</h2>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Slip through darkened hallways as the Queen’s favored collector. Every house is a heist; every tooth is a whispered relic.
                    Study traits, plan the pull, and disappear before the mortals stir.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="bg-rose-500/80 hover:bg-rose-500 text-white tracking-[0.28em] uppercase px-5 py-2">
                      <a href="/play">立即开局</a>
                    </Button>
                    <Button
                      asChild
                      className="bg-transparent border border-rose-500/60 text-rose-200 hover:bg-rose-500/10 tracking-[0.28em] uppercase px-5 py-2"
                    >
                      <a href="/download" onClick={(e) => scrollToSection(e, 'download')}>下载训练包</a>
                    </Button>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div
                    className="relative w-full overflow-hidden rounded-xl border border-[rgba(122,52,99,0.35)] bg-[#14141f]"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/GmfED4NCbSc"
                      className="absolute top-0 left-0 h-full w-full border-0"
                      title="The Tooth Fae"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>

            <section id="how-to-play" className="rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-6 shadow-[0_18px_36px_-24px_rgba(147,72,166,0.6)]">
              <h2 className="text-2xl font-semibold tracking-[0.28em] uppercase text-slate-100 mb-4">Field Briefing</h2>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                管理三条仪表、挑选合适的目标并保持无声——这是成为女王心腹的唯一途径。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-[#14141f] border border-[rgba(122,52,99,0.35)] p-4 shadow-none">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)]">
                      <Play className="h-4 w-4 text-rose-200" />
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">Primary Directive</h3>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    采集 16 枚稀有 “Perfect Lovelies” 牙齿。根据特质挑选目标，快速下手并在 Lucidity 爆表前撤离。
                  </p>
                </Card>
                <Card className="bg-[#14141f] border border-[rgba(122,52,99,0.35)] p-4 shadow-none">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)]">
                      <Gamepad2 className="h-4 w-4 text-rose-200" />
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">Interface &amp; Meters</h3>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Lucidity 是警报、Pain 代表休克风险、Fear 会推动醒来速度。保持节奏：短促钻孔、立刻撒粉、疼痛 80% 前注射麻醉。
                  </p>
                </Card>
                <Card className="bg-[#14141f] border border-[rgba(122,52,99,0.35)] p-4 shadow-none">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)]">
                      <Award className="h-4 w-4 text-rose-200" />
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">Essential Toolkit</h3>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    钩子开口、尘粉镇定、麻醉压痛、短促钻孔配合镊子收尾。记住黄金法则：Drill a bit, Dust a bit。
                  </p>
                </Card>
                <Card className="bg-[#14141f] border border-[rgba(122,52,99,0.35)] p-4 shadow-none">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)]">
                      <Zap className="h-4 w-4 text-rose-200" />
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">Trait Intel</h3>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Heavy Sleeper 适合练手，Insomniac 必须点到即止，Vampire 与 Eldritch 会扭曲仪表——保持 Dust 随时待命。
                  </p>
                </Card>
              </div>
            </section>

            <section id="features" className="rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-6 shadow-[0_18px_36px_-24px_rgba(147,72,166,0.6)]">
              <h2 className="text-2xl font-semibold tracking-[0.28em] uppercase text-slate-100 mb-4">Systems That Keep You Alive</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)]">
                    <BarChart className="h-4 w-4 text-rose-200" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">Meter-Oriented Stealth</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">Lucidity、Pain、Fear 彼此牵制，任何贪心都会直接惊醒目标。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)]">
                    <Shield className="h-4 w-4 text-rose-200" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">Living Floorplans</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">记住地板的嘎吱声、宠物的巡逻路线以及窗缝的冷风，路线比工具更重要。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)]">
                    <Sparkles className="h-4 w-4 text-rose-200" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">Relentless Progression</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">每次完美拔牙都会解锁新的情报与目标，女王永远渴望更稀有的收藏品。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)]">
                    <Gamepad2 className="h-4 w-4 text-rose-200" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">Loadout Tuning</h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">调配尘粉浓度、钻头温度、麻醉剂量，提前为 Tough 或 Eldritch 场景拟定方案。</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="download" className="rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-6 shadow-[0_18px_36px_-24px_rgba(147,72,166,0.6)]">
              <h2 className="text-2xl font-semibold tracking-[0.28em] uppercase text-slate-100 mb-4">Download Training Builds</h2>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                训练包包含占位可执行文件、仪表练习脚本以及最新特质情报，适合离线预演夜巡流程。
              </p>
              <div className="space-y-3">
                {['windows', 'macos', 'linux'].map((platform) => {
                  const labels = {
                    windows: {
                      title: 'Windows',
                      desc: '含 Lucidity/Pain/Fear 练习脚本',
                    },
                    macos: {
                      title: 'macOS',
                      desc: '原生支持 Intel / Apple Silicon',
                    },
                    linux: {
                      title: 'Linux',
                      desc: '附带 CLI 日志与回放工具',
                    },
                  } as const
                  const info = labels[platform as keyof typeof labels]
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => handleDownload(platform)}
                      disabled={downloadStatus[platform]}
                      className="relative flex items-center justify-between rounded-xl border border-[rgba(122,52,99,0.35)] bg-[#14141f] px-4 py-3 text-left transition hover:border-rose-400/60 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <div>
                        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-100">{info.title}</p>
                        <p className="text-xs text-neutral-400">{info.desc}</p>
                      </div>
                      {downloadStatus[platform] ? (
                        <div className="h-5 w-5 animate-spin rounded-full border border-rose-400/40 border-t-transparent" />
                      ) : (
                        <Download className="h-5 w-5 text-rose-200" />
                      )}
                    </button>
                  )
                })}
              </div>
            </section>

            <section id="faq" className="rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-6 shadow-[0_18px_36px_-24px_rgba(147,72,166,0.6)]">
              <h2 className="text-2xl font-semibold tracking-[0.28em] uppercase text-slate-100 mb-4">Frequently Asked Nightmares</h2>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="rounded-lg bg-[#14141f] px-4 py-3 text-slate-100 hover:text-rose-200">
                    这款游戏适合小朋友吗？
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-300 leading-relaxed px-4">
                    The Tooth Fae 聚焦潜行与恐怖氛围，更适合喜欢紧张节奏与资源管理的玩家。准备好在深夜保持绝对冷静。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="rounded-lg bg-[#14141f] px-4 py-3 text-slate-100 hover:text-rose-200">
                    离线可以练习吗？
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-300 leading-relaxed px-4">
                    主线与训练合同完全离线可玩，联网只用于下载更新或上传排行榜成绩。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="rounded-lg bg-[#14141f] px-4 py-3 text-slate-100 hover:text-rose-200">
                    推荐的硬件配置？
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-300 leading-relaxed px-4">
                    Windows 10 / macOS 10.14 / Ubuntu 18.04，i3 或 Ryzen3 级别 CPU、4GB 内存以及 1GB 显存的 GPU 即可，SSD 能明显缩短关卡载入。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="rounded-lg bg-[#14141f] px-4 py-3 text-slate-100 hover:text-rose-200">
                    会不会有氪金要素？
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-300 leading-relaxed px-4">
                    没有。只有装饰性的翅膀或陈列柜主题，核心玩法完全依靠你的操作与判断。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <aside id="comments" className="lg:w-[30%]">
            <div className="lg:sticky lg:top-28">
              <div className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0b0d16] p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-100">玩家回响 ({comments.length})</h3>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span>排序</span>
                    <select
                      value={sortOrder}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="rounded border border-[rgba(122,52,99,0.35)] bg-[#14141f] px-2 py-1 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                    >
                      <option value="latest">最新</option>
                      <option value="oldest">最早</option>
                      <option value="likes">点赞最多</option>
                    </select>
                  </div>
                </div>

                {comments.length === 0 ? (
                  <div className="py-10 text-center text-neutral-400">暂时没有评论，抢先分享你的夜巡经历。</div>
                ) : (
                  <div className="space-y-5">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-b border-[rgba(122,52,99,0.25)] pb-5 last:border-0">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(147,53,120,0.45)] text-sm font-semibold text-slate-100">
                            {comment.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                              <span className="font-semibold text-slate-100">{comment.name}</span>
                              <span>{comment.date}</span>
                            </div>
                            <p className="text-sm text-neutral-200 leading-relaxed">{comment.content}</p>
                            <div className="flex items-center gap-4 text-xs text-neutral-400">
                              <button className="flex items-center gap-1 hover:text-slate-200">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                                </svg>
                                <span>回复</span>
                              </button>
                              <div className="flex items-center gap-3">
                                <button
                                  className={`flex items-center gap-1 text-rose-200 hover:text-rose-100 transition ${voteStatus[`${comment.id}-like`] ? 'opacity-50' : ''}`}
                                  onClick={() => !voteStatus[`${comment.id}-like`] && handleVote(comment.id, 'like')}
                                  disabled={voteStatus[`${comment.id}-like`]}
                                >
                                  <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${voteStatus[`${comment.id}-like`] ? 'scale-110' : 'scale-100'}`}
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
                                  className={`flex items-center gap-1 text-neutral-400 hover:text-rose-200 transition ${voteStatus[`${comment.id}-dislike`] ? 'opacity-50' : ''}`}
                                  onClick={() => !voteStatus[`${comment.id}-dislike`] && handleVote(comment.id, 'dislike')}
                                  disabled={voteStatus[`${comment.id}-dislike`]}
                                >
                                  <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${voteStatus[`${comment.id}-dislike`] ? 'scale-110' : 'scale-100'}`}
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
                  </div>
                )}

                {comments.length > 0 && (
                  <button
                    type="button"
                    className="w-full rounded-md bg-rose-500/80 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-rose-500"
                  >
                    加载更多
                  </button>
                )}

                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  {submitSuccess === true && (
                    <div className="rounded-md border border-emerald-400/40 bg-[#13211d] px-4 py-3 text-sm text-emerald-200">
                      评论提交成功！
                    </div>
                  )}

                  {submitSuccess === false && errorMessage && (
                    <div className="rounded-md border border-red-500/40 bg-[#2a1418] px-4 py-3 text-sm text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      value={commentForm.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full rounded-md border border-[rgba(122,52,99,0.35)] bg-[#14141f] px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                    />
                    <input
                      type="email"
                      name="email"
                      value={commentForm.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full rounded-md border border-[rgba(122,52,99,0.35)] bg-[#14141f] px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                    />
                  </div>
                  <textarea
                    name="content"
                    value={commentForm.content}
                    onChange={handleInputChange}
                    placeholder="Comment content"
                    rows={4}
                    className="w-full rounded-md border border-[rgba(122,52,99,0.35)] bg-[#14141f] px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                  ></textarea>
                  <label className="flex items-center gap-2 text-xs text-neutral-400">
                    <input
                      type="checkbox"
                      checked={commentForm.agreeToTerms}
                      onChange={handleCheckboxChange}
                      className="accent-rose-400"
                    />
                    我已阅读并同意条款。
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-rose-500/80 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? '提交中…' : '提交评论'}
                  </button>
                </form>
              </div>
            </div>
          </aside>
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
