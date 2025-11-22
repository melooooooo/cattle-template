import { NextResponse } from 'next/server';
import { getAllClickerGames, searchClickerGames, getClickerGamesByTag } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/clicker-games
 * 
 * Query parameters:
 * - search: Search query for title/description
 * - tag: Filter by tag
 * 
 * Examples:
 * - /api/clicker-games
 * - /api/clicker-games?search=clicker
 * - /api/clicker-games?tag=IDLE
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search');
    const tag = searchParams.get('tag');

    let games;

    if (searchQuery) {
      games = await searchClickerGames(searchQuery);
    } else if (tag) {
      games = await getClickerGamesByTag(tag);
    } else {
      games = await getAllClickerGames();
    }

    return NextResponse.json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.error('Error in /api/clicker-games:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch clicker games',
      },
      { status: 500 }
    );
  }
}

