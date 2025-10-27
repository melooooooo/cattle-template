/*
  Audit local game detail pages with Playwright
  - Reads data/games/clicker.json and probes /games/{slug}
  - Captures screenshots and basic layout diagnostics
  - Default base URL: http://localhost:3001

  Usage:
    node scripts/audit_game_pages.mjs [baseUrl] [limit]

  Notes:
  - Ensure dev server is running: `pnpm dev -- -p 3001`
  - Requires: `pnpm dlx playwright install chromium`
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const LIST_PATH = path.join(ROOT, 'data/games/clicker.json');
const OUT_DIR = path.join(ROOT, 'audits/screenshots');

function readList() {
  const raw = fs.readFileSync(LIST_PATH, 'utf-8');
  /** @type {Array<{slug?:string, href:string, contentPath?:string, title?:string}>} */
  const list = JSON.parse(raw);
  return list;
}

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

function pickSlugs(list, limit) {
  const slugs = [];
  for (const it of list) {
    if (it.slug && typeof it.slug === 'string') slugs.push(it.slug);
    if (slugs.length >= limit) break;
  }
  return slugs;
}

async function auditPage(page, urlFull) {
  const result = { url: urlFull, ok: false, notes: [], metrics: {} };
  try {
    const resp = await page.goto(urlFull, { waitUntil: 'domcontentloaded', timeout: 20000 });
    result.metrics.status = resp?.status();
    await page.waitForTimeout(600);

    // collect basic diagnostics from the page context
    const diag = await page.evaluate(() => {
      const main = document.querySelector('main');
      const article = document.querySelector('article');
      const contentHtml = article ? article.innerHTML : '';
      const imgs = Array.from(document.querySelectorAll('img'));
      const imgInfo = imgs.slice(0, 5).map((img) => ({
        src: img.getAttribute('src') || '',
        w: img.naturalWidth || img.clientWidth || 0,
        h: img.naturalHeight || img.clientHeight || 0,
        display: getComputedStyle(img).display,
      }));
      const overflowEls = Array.from(document.querySelectorAll('*')).filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width > window.innerWidth * 1.2 || rect.height > window.innerHeight * 3;
      }).length;
      const title = document.title;
      return {
        title,
        hasMain: !!main,
        hasArticle: !!article,
        contentLen: contentHtml.trim().length,
        imgCount: imgs.length,
        imgInfo,
        overflowEls,
        viewport: { w: window.innerWidth, h: window.innerHeight },
      };
    });

    result.metrics = { ...result.metrics, ...diag };
    if (!diag.hasArticle || diag.contentLen < 50) {
      result.notes.push('Article content missing or too short');
    }
    if (diag.imgCount > 0 && diag.imgInfo.every((i) => i.w === 0 || i.h === 0)) {
      result.notes.push('Images present but not rendering (0x0)');
    }
    if (diag.overflowEls > 10) {
      result.notes.push('Many overflowing elements detected');
    }
    result.ok = result.notes.length === 0;
  } catch (e) {
    result.notes.push(`Navigation or evaluation error: ${e.message}`);
  }
  return result;
}

async function main() {
  const baseUrl = process.argv[2] || 'http://localhost:3001';
  const limit = Number(process.argv[3] || '20');
  const list = readList();
  const slugs = pickSlugs(list, limit);
  if (slugs.length === 0) {
    console.error('No slugs found to audit.');
    process.exit(1);
  }
  await ensureDir(OUT_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  /** @type {Array<any>} */
  const report = [];
  for (const slug of slugs) {
    const urlFull = `${baseUrl}/games/${slug}`;
    const res = await auditPage(page, urlFull);
    const shotPath = path.join(OUT_DIR, `${slug}.png`);
    await page.screenshot({ path: shotPath, fullPage: true });
    report.push({ slug, ...res, screenshot: path.relative(ROOT, shotPath) });
    console.log(`[${res.ok ? 'OK' : 'ISSUE'}] ${slug} -> ${urlFull}${res.notes.length ? ' | ' + res.notes.join('; ') : ''}`);
  }

  await browser.close();
  const reportPath = path.join(ROOT, 'audits/report.json');
  await fs.promises.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2) + '\n', 'utf-8');
  console.log(`\nAudit complete. Screenshots: ${path.relative(ROOT, OUT_DIR)}  Report: ${path.relative(ROOT, reportPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

