import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Navigation from "@/components/navigation";

export const dynamic = "force-static";

async function readGameContent(slug: string) {
  const ROOT = process.cwd();
  const filePath = path.join(ROOT, "data/games/content", `${slug}.json`);
  try {
    const raw = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default async function GameDetailPage(props: { params: { slug: string } }) {
  const { slug } = props.params;
  const data = await readGameContent(slug);
  if (!data) return notFound();

  const title: string = data.title || slug;
  const description: string = data.description || "";
  const image: string | undefined = data.image;
  const html: string = data.content?.html || "";
  const tags: string[] = Array.isArray(data.tags) ? data.tags : [];

  return (
    <main className="flex min-h-screen flex-col bg-[#0d1117] text-slate-100">
      <div className="w-full relative">
        <Navigation />
      </div>

      <div className="w-full py-8">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 space-y-6">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-slate-400">Clicker Game</p>
            <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
            {description && (
              <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {tags.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="rounded border border-slate-700/60 bg-slate-800/40 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </header>

          {image && (
            <div className="overflow-hidden rounded-lg border border-slate-700/60 bg-[#0d1117]">
              <img
                src={image}
                alt={title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <article className="prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
            <div className="game-content">
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </article>

          <footer className="pt-4 text-xs text-slate-500">
            <p>
              Source: <a className="text-slate-300 hover:underline" href={data.href} target="_blank" rel="noreferrer noopener">{data.href}</a>
            </p>
            {data.fetchedAt && <p>Fetched at: {data.fetchedAt}</p>}
          </footer>
        </div>
      </div>
    </main>
  );
}

