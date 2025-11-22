import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ujlgurqaunmcxtugyhgc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbGd1cnFhdW5tY3h0dWd5aGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxOTEwNTMsImV4cCI6MjA3NDc2NzA1M30.LURyMDDYbW2QBxYCTWgTCpGUhihIn1HmxzRiPwGJjl8';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for clicker_games table
export interface ClickerGame {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  href: string;
  description: string | null;
  image_path: string | null;
  full_image_url: string | null;
  tags: string[] | null;
  content_path: string | null;
  fetched_at: string | null;
  is_available: boolean | null;
  last_checked_at: string | null;
  availability_note: string | null;
  detailed_content: any | null;
  updated_at: string | null;
}

// Helper functions for clicker games

/**
 * Fetch all clicker games
 */
export async function getAllClickerGames(): Promise<ClickerGame[]> {
  const { data, error } = await supabase
    .from('clicker_games')
    .select('*')
    .eq('is_available', true)
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching clicker games:', error);
    return [];
  }

  return data || [];
}

/**
 * Fetch a single clicker game by slug
 */
export async function getClickerGameBySlug(slug: string): Promise<ClickerGame | null> {
  const { data, error } = await supabase
    .from('clicker_games')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching game with slug ${slug}:`, error);
    return null;
  }

  return data;
}

/**
 * Fetch clicker games by tag
 */
export async function getClickerGamesByTag(tag: string): Promise<ClickerGame[]> {
  const { data, error } = await supabase
    .from('clicker_games')
    .select('*')
    .contains('tags', [tag])
    .eq('is_available', true)
    .order('title', { ascending: true });

  if (error) {
    console.error(`Error fetching games with tag ${tag}:`, error);
    return [];
  }

  return data || [];
}

/**
 * Search clicker games by title or description
 */
export async function searchClickerGames(query: string): Promise<ClickerGame[]> {
  const { data, error } = await supabase
    .from('clicker_games')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .eq('is_available', true)
    .order('title', { ascending: true });

  if (error) {
    console.error(`Error searching games with query "${query}":`, error);
    return [];
  }

  return data || [];
}

/**
 * Get all unique tags from clicker games
 */
export async function getAllClickerGameTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from('clicker_games')
    .select('tags')
    .eq('is_available', true);

  if (error) {
    console.error('Error fetching game tags:', error);
    return [];
  }

  // Flatten and deduplicate tags
  const allTags = new Set<string>();
  data?.forEach(game => {
    game.tags?.forEach((tag: string) => allTags.add(tag));
  });

  return Array.from(allTags).sort();
}

