'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from 'next/link'
import { Play, Download, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import Navigation from "@/components/navigation"
import Head from 'next/head';
import { defaultSeoConfig } from '@/lib/seo-config';

export default function Home() {
  // Determine base URL for canonical links
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thetoothfae.com';
  
  const [downloadStatus, setDownloadStatus] = useState<{[key: string]: boolean}>({});
  const [comments, setComments] = useState<any[]>([]);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest', 'oldest', 'likes'
  const [voteStatus, setVoteStatus] = useState<{[key: string]: boolean}>({});
  const [replyingTo, setReplyingTo] = useState<{id: string, name: string} | null>(null);

  // Scroll helper for in-page navigation
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
      console.log('Fetching comments with order:', currentSortOrder);
      const response = await fetch(`/api/comments?sortBy=${currentSortOrder}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched comments:', data.length);
        setComments(data);
      } else {
        console.error('Failed to fetch comments:', response.statusText);
      }
    } catch (error) {
      console.error('Error while fetching comments:', error);
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

  // Handle reply to comment
  const handleReply = (commentId: string, commentName: string) => {
    setReplyingTo({ id: commentId, name: commentName });
    // Scroll to comment form
    const commentsSection = document.getElementById('comments');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Pre-fill content with mention
    setCommentForm(prev => ({
      ...prev,
      content: `@${commentName} `
    }));
  };

  // Cancel reply
  const cancelReply = () => {
    setReplyingTo(null);
    setCommentForm(prev => ({
      ...prev,
      content: ''
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

      // Reset form and reply state
      setCommentForm({
        name: '',
        email: '',
        content: ''
      });
      setReplyingTo(null);

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
    // Normalize IDs to strings for consistent comparison
    const stringId = String(id);
    
    // Prevent duplicate clicks
    const voteKey = `${stringId}-${action}`;
    if (voteStatus[voteKey]) {
      return;
    }
    
    // Set loading state
    setVoteStatus(prev => ({ ...prev, [voteKey]: true }));
    
    try {
      console.log(`Attempting ${action === 'like' ? 'like' : 'dislike'} on comment ID: ${stringId}`);
      
      // Optimistic UI update for faster feedback
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
      
      // Send request to backend
      const response = await fetch('/api/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: stringId, action }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Vote operation succeeded:', data);
        
        // Update UI with server response
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
        console.error('Vote operation failed:', data.error || response.statusText);
        // Revert optimistic update
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
        
        // Provide user-friendly error alerts
        if (data.error === 'Comment not found') {
          alert('Unable to like this comment; it may have been removed.');
        } else {
          alert(`Operation failed: ${data.error || 'Please try again later'}`);
        }
      }
    } catch (error) {
      console.error('Error while handling vote:', error);
      // Revert optimistic update
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
      alert('Operation failed, please try again later');
    } finally {
      // Clear loading state
      setTimeout(() => {
        setVoteStatus(prev => ({ ...prev, [voteKey]: false }));
      }, 500); // Short delay to prevent rapid repeat clicks
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

        {/* Play CTA (center button, keep original area size) */}
        <div id="play" className="w-full max-w-6xl mx-auto p-4 game-container rounded-md my-2">
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] shadow-[0_24px_60px_-24px_rgba(147,72,166,0.6)]">
            {/* Maintain 16:9 area */}
            <div className="w-full" style={{ paddingTop: '56.25%' }} />
            {/* Background screenshot */}
            <img src="/images/warpdoor/0-Animation-18.webp" alt="The Tooth Fae screenshot" className="absolute inset-0 h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1018]/40 to-[#0f1018]" />
            {/* Glow */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl shadow-[0_0_120px_20px_rgba(147,72,166,0.35)]" />
            {/* Centered CTA */}
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="https://html.itch.zone/html/15168109/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-fuchsia-500/90 to-violet-500/90 px-7 py-4 text-white font-semibold text-lg shadow-[0_28px_60px_-22px_rgba(239,147,219,0.85)] hover:from-fuchsia-500 hover:to-violet-500 transition"
              >
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
                  <Play className="h-5 w-5" />
                </span>
                <span>Play Game</span>
              </a>
            </div>
          </div>
        </div>

        {/* Title + subtitle and tags */}
        <div className="w-full max-w-6xl mx-auto px-4 mb-8">
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-100 via-fuchsia-100 to-rose-100 bg-clip-text text-transparent">The Tooth Fae</h1>
          <p className="mt-2 text-lg text-neutral-300">Don't let her take your teeth.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Stealth Horror', 'Tooth Collection', 'Eldritch Encounters'].map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full border border-[rgba(122,52,99,0.35)] bg-[#14141f] px-3 py-1 text-xs text-slate-100">{tag}</span>
            ))}
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

      {/* Game Content Sub‑Navigation */}
      <div className="w-full py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex flex-wrap items-center gap-2 rounded-xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-2 shadow-[0_10px_24px_-18px_rgba(147,72,166,0.6)]">
            <a href="#play" onClick={(e) => scrollToSection(e as any, 'play')} className="px-3 py-2 text-xs md:text-sm text-slate-100 rounded-lg bg-[#14141f] border border-[rgba(122,52,99,0.35)] hover:border-rose-400/60">Play</a>
            <a href="#guide" onClick={(e) => scrollToSection(e as any, 'guide')} className="px-3 py-2 text-xs md:text-sm text-slate-100 rounded-lg bg-[#14141f] border border-[rgba(122,52,99,0.35)] hover:border-rose-400/60">Guide</a>
            
            <a href="#download" onClick={(e) => scrollToSection(e as any, 'download')} className="px-3 py-2 text-xs md:text-sm text-slate-100 rounded-lg bg-[#14141f] border border-[rgba(122,52,99,0.35)] hover:border-rose-400/60">Download</a>
            <a href="#faq" onClick={(e) => scrollToSection(e as any, 'faq')} className="px-3 py-2 text-xs md:text-sm text-slate-100 rounded-lg bg-[#14141f] border border-[rgba(122,52,99,0.35)] hover:border-rose-400/60">FAQ</a>
            <a href="/blog" className="px-3 py-2 text-xs md:text-sm text-slate-100 rounded-lg bg-[#14141f] border border-[rgba(122,52,99,0.35)] hover:border-rose-400/60">Blog</a>
            <a href="#comments" onClick={(e) => scrollToSection(e as any, 'comments')} className="px-3 py-2 text-xs md:text-sm text-slate-100 rounded-lg bg-[#14141f] border border-[rgba(122,52,99,0.35)] hover:border-rose-400/60">Comments</a>
          </nav>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-10 lg:flex-row">
          <div className="lg:w-[65%] space-y-10">
            <section id="guide" className="rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-6 shadow-[0_18px_36px_-24px_rgba(147,72,166,0.6)]">
              <h2 className="text-2xl font-semibold tracking-[0.28em] uppercase text-slate-100 mb-4">Core Gameplay Guide</h2>
              <div className="space-y-6 text-neutral-300 text-sm leading-relaxed">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100 mb-2">Getting Started</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">Welcome to the grim, enchanting world of The Tooth Fae. Forget the quarters under the pillow; your job is far more hands-on. You are a collector, an agent of the Queen, tasked with harvesting teeth from sleeping mortals. Your objective is simple: fill the Queen's “Perfect Lovelies” cabinet with all 16 unique teeth.</p>
                </div>
                

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100 mb-2">Interface &amp; Meters</h3>
                  <p>Lucidity (wake-up risk), Pain (shock), and Fear (accelerates Lucidity) are your vital gauges. The tool tray carries:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="font-semibold text-rose-200">Fairy Dust</span> – suppresses Lucidity and Fear, your primary stabilizer.</li>
                    <li><span className="font-semibold text-rose-200">Hook</span> – opens the mouth and starts every job, raising Lucidity slightly.</li>
                    <li><span className="font-semibold text-rose-200">Anesthetic Syringe</span> – drop Pain spikes before long drills or multi-tooth runs.</li>
                    <li><span className="font-semibold text-rose-200">Dental Drill</span> – loosens the prize but stresses all meters; pulse it.</li>
                    <li><span className="font-semibold text-rose-200">Forceps</span> – finish once the tooth is loose and meters are stable.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100 mb-2">All Secrets and Endings: The Perfect Collection</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    The "ending" of The Tooth Fae is achieving 100% completion of your tooth collection. Once you've acquired all 16 unique teeth, your collection is complete. There is no final cutscene; the "My Perfect Lovelies" collection screen filled with your trophies is the ultimate reward.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100 mb-2">Trait Counterplay</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="font-semibold text-rose-200">Heavy Sleeper</span> – generous Lucidity window; ideal for practicing longer drill cycles.</li>
                    <li><span className="font-semibold text-rose-200">Tough</span> – Pain skyrockets; alternate dust and anesthetic around the 70–80% mark.</li>
                    <li><span className="font-semibold text-rose-200">Night Owl / Insomniac</span> – Lucidity starts high. Tap the drill, dust immediately, never linger.</li>
                    <li><span className="font-semibold text-rose-200">Fragile / Brittle</span> – teeth shatter easily; keep drill bursts ultra short.</li>
                    <li><span className="font-semibold text-rose-200">Vampire / Ancient / Eldritch</span> – unique mechanics, from ultra-fast Lucidity to UI distortion. Enter stocked with dust and a spare syringe.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100 mb-2">The 16 Unique Teeth &amp; How to Get Them</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-neutral-200 border border-[rgba(122,52,99,0.35)] bg-[#14141f]">
                      <thead className="bg-[rgba(147,53,120,0.35)] text-slate-100 uppercase tracking-[0.18em]">
                        <tr>
                          <th className="px-3 py-2 font-semibold">Tooth Name</th>
                          <th className="px-3 py-2 font-semibold">Type</th>
                          <th className="px-3 py-2 font-semibold">How to Obtain</th>
                          <th className="px-3 py-2 font-semibold">In-Game Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Cracked</td>
                          <td className="px-3 py-2">Worthless</td>
                          <td className="px-3 py-2">Fail an extraction on a "Fragile" or normal tooth by applying too much stress.</td>
                          <td className="px-3 py-2">"Fractured and ruined."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Dirty</td>
                          <td className="px-3 py-2">Worthless</td>
                          <td className="px-3 py-2">From a homeowner with the "Doesn't Brush" trait.</td>
                          <td className="px-3 py-2">"Looks filthy for our touches."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Decayed</td>
                          <td className="px-3 py-2">Worthless</td>
                          <td className="px-3 py-2">Found randomly, very easy to extract.</td>
                          <td className="px-3 py-2">"Rotten to the core."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Wooden</td>
                          <td className="px-3 py-2">Worthless</td>
                          <td className="px-3 py-2">Found on an "Ancient" homeowner.</td>
                          <td className="px-3 py-2">"A poor imitation."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Adult</td>
                          <td className="px-3 py-2">Common</td>
                          <td className="px-3 py-2">From any adult homeowner.</td>
                          <td className="px-3 py-2">"So many in the wild, hardly notable."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Baby</td>
                          <td className="px-3 py-2">Common</td>
                          <td className="px-3 py-2">From any child homeowner.</td>
                          <td className="px-3 py-2">"Full of naivety and distant dreams."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Crowned</td>
                          <td className="px-3 py-2">Common</td>
                          <td className="px-3 py-2">A tooth with a dental crown, found randomly.</td>
                          <td className="px-3 py-2">"Crudely repaired by clumsy hands."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Aged</td>
                          <td className="px-3 py-2">Common</td>
                          <td className="px-3 py-2">From any elder homeowner.</td>
                          <td className="px-3 py-2">"Wise but not wisdom."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Sparkling</td>
                          <td className="px-3 py-2">Rare</td>
                          <td className="px-3 py-2">From a child with the "Fragile" trait.</td>
                          <td className="px-3 py-2">"A delight for our hands. So smooth, so lovely."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Glass</td>
                          <td className="px-3 py-2">Rare</td>
                          <td className="px-3 py-2">From a teen with the "Brittle" trait.</td>
                          <td className="px-3 py-2">"What manner of mortal gnaws with such a thing?"</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Silver</td>
                          <td className="px-3 py-2">Rare</td>
                          <td className="px-3 py-2">Found randomly in donors' mouths.</td>
                          <td className="px-3 py-2">"Don't let the fools know it's iron, not silver. To ward off our embrace?"</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Gold</td>
                          <td className="px-3 py-2">Rare</td>
                          <td className="px-3 py-2">Found randomly in donors' mouths.</td>
                          <td className="px-3 py-2">"Ostentatious, just like their race that covers our lands."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Sharp</td>
                          <td className="px-3 py-2">Unearthly</td>
                          <td className="px-3 py-2">From a homeowner with the "Vampire" trait.</td>
                          <td className="px-3 py-2">"Do not let the others know you have such a dangerous keepsake."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Gemini</td>
                          <td className="px-3 py-2">Unearthly</td>
                          <td className="px-3 py-2">From an adult with both "Fragile" and "Brittle" traits.</td>
                          <td className="px-3 py-2">"Twinned and tangled, tied tenderly twixt."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Watcher</td>
                          <td className="px-3 py-2">Unearthly</td>
                          <td className="px-3 py-2">From an "Ancient" homeowner; these teeth have faces.</td>
                          <td className="px-3 py-2">"Unearthly Watcher Tooth."</td>
                        </tr>
                        <tr className="border-t border-[rgba(122,52,99,0.35)]">
                          <td className="px-3 py-2">Key</td>
                          <td className="px-3 py-2">Unearthly</td>
                          <td className="px-3 py-2">From a child with the "Eldritch" trait.</td>
                          <td className="px-3 py-2">"We shouldn't have this."</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            

            <section id="download" className="rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0f1018] p-6 shadow-[0_18px_36px_-24px_rgba(147,72,166,0.6)]">
              <h2 className="text-2xl font-semibold tracking-[0.28em] uppercase text-slate-100 mb-4">Download Training Builds</h2>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                The build bundles placeholder executables, meter drill scripts, and the latest trait intel—perfect for rehearsing night runs offline.
              </p>
              <div className="space-y-3">
                {['windows', 'macos', 'linux'].map((platform) => {
                  const labels = {
                    windows: {
                      title: 'Windows',
                      desc: 'Includes Lucidity/Pain/Fear drill scripts',
                    },
                    macos: {
                      title: 'macOS',
                      desc: 'Native support for Intel and Apple Silicon',
                    },
                    linux: {
                      title: 'Linux',
                      desc: 'Ships with CLI logging and replay tools',
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
                    Is this game meant for kids?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-300 leading-relaxed px-4">
                    The Tooth Fae leans into stealth horror—perfect for players who crave tense pacing and resource pressure. Be ready to stay calm long past midnight.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="rounded-lg bg-[#14141f] px-4 py-3 text-slate-100 hover:text-rose-200">
                    Can I practice offline?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-300 leading-relaxed px-4">
                    The core campaign and training contracts are fully offline; you only need a connection for updates or leaderboard submissions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="rounded-lg bg-[#14141f] px-4 py-3 text-slate-100 hover:text-rose-200">
                    What hardware do I need?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-300 leading-relaxed px-4">
                    Windows 10 / macOS 10.14 / Ubuntu 18.04, an i3 or Ryzen 3-class CPU, 4GB RAM, and a 1GB VRAM GPU are enough. An SSD shortens load times.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="rounded-lg bg-[#14141f] px-4 py-3 text-slate-100 hover:text-rose-200">
                    Are there monetization traps?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-neutral-300 leading-relaxed px-4">
                    No. Only optional decorative wings and cabinet themes—core progression is entirely skill-based.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <aside id="comments" className="lg:w-[35%]">
            <div className="lg:sticky lg:top-28">
              <div className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-[rgba(122,52,99,0.35)] bg-[#0b0d16] p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-100">Field Reports ({comments.length})</h3>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span>Sort</span>
                    <select
                      value={sortOrder}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="rounded border border-[rgba(122,52,99,0.35)] bg-[#14141f] px-2 py-1 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                    >
                      <option value="latest">Latest</option>
                      <option value="oldest">Oldest</option>
                      <option value="likes">Most Liked</option>
                    </select>
                  </div>
                </div>

                {comments.length === 0 ? (
                  <div className="py-10 text-center text-neutral-400">No reports yet—share your latest night raid.</div>
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
                              <button
                                className="flex items-center gap-1 hover:text-slate-200"
                                onClick={() => handleReply(comment.id, comment.name)}
                              >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                                </svg>
                                <span>Reply</span>
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
                    Load More
                  </button>
                )}

                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  {replyingTo && (
                    <div className="rounded-md border border-rose-400/40 bg-[#1a0f16] px-4 py-3 text-sm text-rose-200 flex items-center justify-between">
                      <span>Replying to <strong>@{replyingTo.name}</strong></span>
                      <button
                        type="button"
                        onClick={cancelReply}
                        className="text-rose-300 hover:text-rose-100"
                      >
                        ✕ Cancel
                      </button>
                    </div>
                  )}

                  {submitSuccess === true && (
                    <div className="rounded-md border border-emerald-400/40 bg-[#13211d] px-4 py-3 text-sm text-emerald-200">
                      Comment submitted successfully!
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-rose-500/80 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit Comment'}
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
            <div className="border-t border-[rgba(255,255,255,0.2)] pt-6 text-center text-sm">
              <p>© 2025 The Tooth Fae. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
