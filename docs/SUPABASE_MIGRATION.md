# Supabase Migration Guide

## 📊 Overview

This document describes the migration of clicker games data from local JSON files to Supabase database.

## ✅ Migration Status

- **Date**: 2025-11-16
- **Status**: ✅ Completed
- **Games Migrated**: 33 games
- **Table Name**: `clicker_games`

## 🗄️ Database Schema

### Table: `clicker_games`

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT | Primary key (auto-increment) |
| `created_at` | TIMESTAMPTZ | Record creation timestamp |
| `title` | TEXT | Game title |
| `slug` | TEXT | URL-friendly slug (unique) |
| `href` | TEXT | Original source URL |
| `description` | TEXT | Game description |
| `image_path` | TEXT | Relative or absolute image path |
| `full_image_url` | TEXT | Generated full image URL |
| `tags` | TEXT[] | Array of game tags/genres |
| `content_path` | TEXT | Path to detailed content JSON |
| `fetched_at` | TIMESTAMPTZ | When the game was scraped |
| `is_available` | BOOLEAN | Availability status |
| `last_checked_at` | TIMESTAMPTZ | Last availability check |
| `availability_note` | TEXT | Availability notes |
| `detailed_content` | JSONB | Full game content (optional) |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### Indexes

- Primary key on `id`
- Unique index on `slug`
- GIN index on `tags` for efficient tag filtering

## 🔧 Configuration

### Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ujlgurqaunmcxtugyhgc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Client

The Supabase client is configured in `lib/supabase.ts` with helper functions:

- `getAllClickerGames()` - Fetch all games
- `getClickerGameBySlug(slug)` - Fetch single game by slug
- `getClickerGamesByTag(tag)` - Filter games by tag
- `searchClickerGames(query)` - Search games by title/description
- `getAllClickerGameTags()` - Get all unique tags

## 📝 Usage Examples

### 1. Fetch All Games (Server Component)

```typescript
import { getAllClickerGames } from '@/lib/supabase';

export default async function GamesPage() {
  const games = await getAllClickerGames();
  
  return (
    <div>
      {games.map(game => (
        <div key={game.id}>
          <h2>{game.title}</h2>
          <p>{game.description}</p>
          <img src={game.full_image_url} alt={game.title} />
        </div>
      ))}
    </div>
  );
}
```

### 2. Search Games (Client Component)

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function SearchGames() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      const url = query 
        ? `/api/clicker-games?search=${encodeURIComponent(query)}`
        : '/api/clicker-games';
      
      const res = await fetch(url);
      const data = await res.json();
      setGames(data.data);
    };

    fetchGames();
  }, [query]);

  return (
    <div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search games..."
      />
      {/* Render games */}
    </div>
  );
}
```

### 3. Filter by Tag

```typescript
import { getClickerGamesByTag } from '@/lib/supabase';

export default async function IdleGamesPage() {
  const games = await getClickerGamesByTag('IDLE');
  
  return (
    <div>
      <h1>Idle Games</h1>
      {/* Render games */}
    </div>
  );
}
```

### 4. Get Single Game

```typescript
import { getClickerGameBySlug } from '@/lib/supabase';

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getClickerGameBySlug(params.slug);
  
  if (!game) {
    return <div>Game not found</div>;
  }
  
  return (
    <div>
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <div>Tags: {game.tags?.join(', ')}</div>
    </div>
  );
}
```

## 🔄 Migration vs JSON

### Before (JSON-based)

```typescript
import scraped from "@/data/games/clicker.json";

export default function GamesPage() {
  const games = scraped;
  // ...
}
```

### After (Supabase-based)

```typescript
import { getAllClickerGames } from '@/lib/supabase';

export default async function GamesPage() {
  const games = await getAllClickerGames();
  // ...
}
```

## 🎯 Benefits

1. **Dynamic Updates**: Add/edit games without redeploying
2. **Better Performance**: Database queries with indexes
3. **Advanced Filtering**: Tag-based filtering, full-text search
4. **Scalability**: Can handle thousands of games
5. **User Features**: Can add favorites, ratings, comments
6. **Analytics**: Track game views, popularity

## 🚀 Next Steps

### Recommended Enhancements

1. **Add RLS (Row Level Security)**
   ```sql
   ALTER TABLE clicker_games ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Public read access" ON clicker_games
     FOR SELECT USING (true);
   ```

2. **Add User Favorites Table**
   ```sql
   CREATE TABLE user_game_favorites (
     user_id TEXT NOT NULL,
     game_id BIGINT NOT NULL REFERENCES clicker_games(id),
     created_at TIMESTAMPTZ DEFAULT now(),
     PRIMARY KEY (user_id, game_id)
   );
   ```

3. **Add Game Analytics**
   ```sql
   CREATE TABLE game_views (
     id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
     game_id BIGINT NOT NULL REFERENCES clicker_games(id),
     viewed_at TIMESTAMPTZ DEFAULT now(),
     user_id TEXT,
     ip_address TEXT
   );
   ```

4. **Update Existing Pages**
   - Modify `app/games/page.tsx` to use Supabase
   - Create dynamic routes for individual games
   - Add tag filtering UI
   - Implement search functionality

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## 🐛 Troubleshooting

### Issue: "Failed to fetch games"

**Solution**: Check that environment variables are set correctly:
```bash
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Issue: "No games returned"

**Solution**: Verify data in Supabase:
```sql
SELECT COUNT(*) FROM clicker_games;
```

### Issue: "CORS errors"

**Solution**: Ensure you're using the correct Supabase URL and anon key. The anon key should be public and safe to use in client-side code.

