/*
  Scrape clicker games from https://blood-money.io/clicker.games
  - Crawl the listing page and extract cards (title, href, image, description, tags)
  - Visit each game page and extract richer content (structured blocks + raw HTML fallback)
  - Normalize to data/games/clicker.json
  - Write per-game content to data/games/content/{slug}.json
  - Do NOT download images here (handled by scripts/localize_clicker_assets.mjs)

  Notes:
  - Uses Playwright (Chromium). Ensure Playwright is installed: `pnpm dlx playwright install chromium`
  - This script is Node ESM. Run with: `node scripts/scrape_clicker_games.mjs`
  - Timestamp is fixed to the conversation-provided time to keep deterministic output.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'data/games/clicker.json');
const CONTENT_DIR = path.join(ROOT, 'data/games/content');

// Use the conversation-provided current time as the source of truth
const FIXED_NOW = '2025-10-25T13:02:52.411Z';

function slugFromHref(href) {
  try {
    const u = new URL(href);
    const segs = u.pathname.split('/').filter(Boolean);
    return segs[segs.length - 1] || 'game';
  } catch {
    const segs = (href || '').split('/').filter(Boolean);
    return segs[segs.length - 1] || 'game';
  }
}

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

function readExistingList() {
  try {
    const raw = fs.readFileSync(JSON_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function mergeByHref(oldItems, newItems) {
  const byHref = new Map();
  for (const it of oldItems) byHref.set(it.href, it);
  for (const it of newItems) byHref.set(it.href, { ...byHref.get(it.href), ...it });
  return Array.from(byHref.values());
}

async function scrapeList(page) {
  try {
    await page.goto('https://blood-money.io/clicker.games', { waitUntil: 'domcontentloaded', timeout: 15000 });
  } catch (e) {
    console.warn('List navigation timeout or error, continuing with whatever is loaded:', e.message);
  }
  await page.waitForTimeout(800);

  const EXCLUDED_SLUGS = new Set([
    'about-us', 'contact-us', 'privacy-policy', 'dmca', 'terms-of-service',
    'hot-games', 'new-games', 'top-popular', 'favorite-games',
    'action.games', 'adventure.games', 'casual.games', 'horror.games', 'puzzle.games', 'simulation.games',
  ]);

  const cards = await page.$$('[href]');
  const results = [];

  for (const card of cards) {
    try {
      let href = await card.getAttribute('href');
      if (!href) continue;

      // Normalize to absolute URL
      if (href.startsWith('/')) href = `https://blood-money.io${href}`;

      const slug = slugFromHref(href);
      const lower = href.toLowerCase();
      const isCategory = /\.games(\/?|#|\?|$)/.test(lower);
      if (EXCLUDED_SLUGS.has(slug) || isCategory) continue;
      if (slug.endsWith('.png') || slug.endsWith('.ico') || slug.endsWith('.css') || slug.endsWith('.js')) continue;

      const title = (await card.textContent())?.trim() || '';
      const imgEl = await card.$('img');
      const image = imgEl ? (await imgEl.getAttribute('src')) : '';

      // Keep only links that look like cards (have image or non-trivial title)
      if (title.length < 2 && !image) continue;

      results.push({ title, href, image, description: '', tags: [] });
    } catch {}
  }

  const seen = new Set();
  const deduped = [];
  for (const r of results) {
    if (seen.has(r.href)) continue;
    seen.add(r.href);
    deduped.push(r);
  }

  return deduped;
}

async function scrapeDetail(page, href) {
  await page.goto(href, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(500);

  // Determine if this looks like a playable game page
  const hasLaunchText = await page.locator('a,button', { hasText: 'Launch' }).first().count().catch(() => 0);
  const hasPlayText = await page.locator('a,button', { hasText: 'Play' }).first().count().catch(() => 0);
  const iframeCount = await page.locator('iframe').count().catch(() => 0);
  const playable = (hasLaunchText > 0) || (hasPlayText > 0) || (iframeCount > 0);

  if (!playable) {
    return { invalid: true };
  }

  // Basic fields
  const title = (await page.title()) || '';
  const metaDesc = await page.locator('meta[name="description"]').getAttribute('content').catch(() => null);
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content').catch(() => null);

  // Attempt to pull a primary heading and a paragraph lead
  const h1 = await page.locator('h1').first().textContent().catch(() => null);
  const leadP = await page.locator('p').first().textContent().catch(() => null);

  // Collect tags heuristically (badges/links with tag-like classes)
  const tagCandidates = await page.$$('a[href*="/tag/"], [class*="tag"], [class*="badge"], a[href*="tag="]');
  const tagTexts = [];
  for (const el of tagCandidates) {
    const t = (await el.textContent())?.trim();
    if (t && t.length <= 32) tagTexts.push(t.toUpperCase());
  }
  const tags = Array.from(new Set(tagTexts));

  // Extract a scoped, sanitized HTML for main content only
  const mainHtml = await page.evaluate(() => {
    function pickContentRoot() {
      const candidates = [
        document.querySelector('main article'),
        document.querySelector('main'),
        document.querySelector('article'),
        document.querySelector('[role="main"]'),
        document.querySelector('#content'),
        document.querySelector('.content'),
      ].filter(Boolean);
      return candidates[0] || document.body;
    }

    const root = pickContentRoot().cloneNode(true);

    const removeSel = [
      'script', 'style', 'link', 'noscript', 'meta',
      'header', 'footer', 'nav',
      '[role="banner"]', '[role="navigation"]', '[aria-modal="true"]',
      '.modal', '.overlay', '.drawer', '.sidebar', '.cookie', '.consent',
      '.breadcrumbs', '.site-header', '.site-footer', '.global-nav'
    ].join(',');
    root.querySelectorAll(removeSel).forEach((n) => n.remove());

    Array.from(root.querySelectorAll('*')).forEach((el) => {
      const cs = el.getAttribute('style') || '';
      if (/position\s*:\s*fixed/i.test(cs) || /position\s*:\s*sticky/i.test(cs)) {
        el.remove();
      }
    });

    Array.from(root.querySelectorAll('img, video, canvas, iframe, svg')).forEach((el) => {
      el.removeAttribute('width');
      el.removeAttribute('height');
      el.setAttribute('style', (el.getAttribute('style') || '').replace(/max-width:\s*[^;]+/gi, ''));
    });

    Array.from(root.querySelectorAll('ul,ol')).forEach((list) => {
      if (list.children.length > 200) list.remove();
    });

    return root.innerHTML;
  });

  return {
    title: (h1 && h1.trim()) || title,
    description: metaDesc || (leadP || '').trim(),
    image: ogImage || '',
    tags,
    content: {
      html: mainHtml || '',
      sections: []
    },
    fetchedAt: FIXED_NOW,
  };
}

async function main() {
  await ensureDir(CONTENT_DIR);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating and scraping list...');
  const existing = readExistingList();
  const list = await scrapeList(page);
  console.log(`List scraped: ${list.length} candidate items`);

  const enriched = [];
  for (const item of list) {
    const slug = slugFromHref(item.href);
    const detail = await scrapeDetail(page, item.href).catch(() => null);
    if (!detail || detail.invalid) {
      // Skip non-playable pages
      continue;
    }
    const merged = {
      title: detail?.title || item.title || slug,
      href: item.href,
      image: detail?.image || item.image || '',
      description: detail?.description || item.description || '',
      tags: (detail?.tags?.length ? detail.tags : item.tags) || [],
      slug,
      contentPath: `data/games/content/${slug}.json`,
      fetchedAt: FIXED_NOW,
    };

    // Write per-game content file
    const perGame = {
      slug,
      href: item.href,
      title: merged.title,
      description: merged.description,
      image: merged.image,
      tags: merged.tags,
      content: detail?.content || { html: '', sections: [] },
      fetchedAt: FIXED_NOW,
    };
    const outPath = path.join(CONTENT_DIR, `${slug}.json`);
    await fs.promises.writeFile(outPath, JSON.stringify(perGame, null, 2) + '\n', 'utf-8');

    enriched.push(merged);
  }

  // Do not merge with existing; replace to clean prior bad entries
  const finalList = enriched
    // keep only unique by href
    .filter((v, i, arr) => arr.findIndex(x => x.href === v.href) === i)
    // sort by title for stability
    .sort((a, b) => a.title.localeCompare(b.title));

  await fs.promises.writeFile(JSON_PATH, JSON.stringify(finalList, null, 2) + '\n', 'utf-8');

  await browser.close();
  console.log(`Scraped ${enriched.length} items. Updated list: ${JSON_PATH}. Content saved to ${CONTENT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

