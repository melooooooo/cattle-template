/*
  Migrate clicker games data from local JSON to Supabase
  
  Usage:
    node scripts/migrate_to_supabase.mjs
  
  Prerequisites:
    - Supabase project configured
    - SUPABASE_URL and SUPABASE_ANON_KEY in environment variables
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'data/games/clicker.json');

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ujlgurqaunmcxtugyhgc.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_ANON_KEY) {
  console.error('❌ Error: SUPABASE_ANON_KEY environment variable is required');
  console.log('Please set it in your .env.local file or pass it as an environment variable');
  process.exit(1);
}

async function loadGamesData() {
  try {
    const raw = fs.readFileSync(JSON_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('❌ Error reading games data:', error.message);
    process.exit(1);
  }
}

async function insertGame(game) {
  const payload = {
    title: game.title,
    slug: game.slug,
    href: game.href,
    description: game.description || null,
    image_path: game.image || null,
    tags: game.tags || [],
    content_path: game.contentPath || null,
    fetched_at: game.fetchedAt || null,
    is_available: true,
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/clicker_games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to insert ${game.title}: ${error}`);
  }

  return await response.json();
}

async function checkExistingGames() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/clicker_games?select=slug`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    }
  });

  if (!response.ok) {
    throw new Error('Failed to check existing games');
  }

  const games = await response.json();
  return new Set(games.map(g => g.slug));
}

async function main() {
  console.log('🚀 Starting migration to Supabase...\n');

  // Load games data
  console.log('📖 Loading games data from JSON...');
  const games = await loadGamesData();
  console.log(`✅ Loaded ${games.length} games\n`);

  // Check existing games
  console.log('🔍 Checking for existing games in database...');
  const existingSlugs = await checkExistingGames();
  console.log(`📊 Found ${existingSlugs.size} existing games\n`);

  // Filter out duplicates
  const newGames = games.filter(g => !existingSlugs.has(g.slug));
  const skippedGames = games.filter(g => existingSlugs.has(g.slug));

  if (skippedGames.length > 0) {
    console.log(`⏭️  Skipping ${skippedGames.length} games that already exist:`);
    skippedGames.forEach(g => console.log(`   - ${g.title} (${g.slug})`));
    console.log();
  }

  if (newGames.length === 0) {
    console.log('✨ All games are already in the database. Nothing to migrate.');
    return;
  }

  console.log(`📥 Migrating ${newGames.length} new games...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const game of newGames) {
    try {
      await insertGame(game);
      successCount++;
      console.log(`✅ [${successCount}/${newGames.length}] ${game.title}`);
    } catch (error) {
      errorCount++;
      console.error(`❌ [${successCount + errorCount}/${newGames.length}] ${game.title}: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`Total games in JSON:     ${games.length}`);
  console.log(`Already in database:     ${skippedGames.length}`);
  console.log(`Successfully migrated:   ${successCount}`);
  console.log(`Failed:                  ${errorCount}`);
  console.log('='.repeat(60));

  if (errorCount === 0) {
    console.log('\n🎉 Migration completed successfully!');
  } else {
    console.log('\n⚠️  Migration completed with some errors. Please check the logs above.');
  }
}

main().catch(error => {
  console.error('\n💥 Fatal error:', error);
  process.exit(1);
});

