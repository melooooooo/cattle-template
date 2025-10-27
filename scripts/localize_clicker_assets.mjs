/*
  Localize clicker games assets:
  - Read data/games/clicker.json
  - For each item, download its image URL to public/assets/games/{slug}{ext}
  - Update item.image to /assets/games/{filename}
  - Add/refresh item.fetchedAt with constant timestamp provided by user context
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'data/games/clicker.json');
const OUT_DIR = path.join(ROOT, 'public/assets/games');

// Use the conversation-provided current time as the source of truth
const FIXED_NOW = '2025-10-25T12:56:06.073Z';

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

function slugFromHref(href) {
  try {
    const u = new URL(href);
    const segs = u.pathname.split('/').filter(Boolean);
    return segs[segs.length - 1] || 'game';
  } catch {
    // fallback: basic last segment
    const segs = (href || '').split('/').filter(Boolean);
    return segs[segs.length - 1] || 'game';
  }
}

function extFromUrl(urlStr) {
  try {
    const u = new URL(urlStr);
    const bn = path.basename(u.pathname);
    const ext = path.extname(bn) || '.jpg';
    return ext || '.jpg';
  } catch {
    const ext = path.extname(urlStr || '') || '.jpg';
    return ext || '.jpg';
  }
}

async function downloadTo(urlStr, destPath) {
  const res = await fetch(urlStr, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to download ${urlStr}: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(destPath, buf);
}

async function main() {
  const raw = await fs.promises.readFile(JSON_PATH, 'utf-8');
  /** @type {{title:string, href:string, image:string, description?:string, tags?:string[], fetchedAt?:string}[]} */
  const items = JSON.parse(raw);

  await ensureDir(OUT_DIR);

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const slug = slugFromHref(it.href);
    const ext = extFromUrl(it.image);
    const filename = `${slug}${ext}`;
    const outPath = path.join(OUT_DIR, filename);
    const outWebPath = `/assets/games/${filename}`;

    try {
      // Only download if file not present or zero size
      let need = true;
      try {
        const st = await fs.promises.stat(outPath);
        if (st.size > 0) need = false;
      } catch {}
      if (need) {
        await downloadTo(it.image, outPath);
      }
      // Update fields
      it.image = outWebPath;
      it.fetchedAt = FIXED_NOW;
    } catch (err) {
      // Keep remote image on failure but still set fetchedAt
      console.warn(`Warn: ${err.message}`);
      it.fetchedAt = FIXED_NOW;
    }
  }

  await fs.promises.writeFile(JSON_PATH, JSON.stringify(items, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${items.length} items and localized images to ${path.relative(ROOT, OUT_DIR)}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

