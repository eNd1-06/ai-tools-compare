#!/usr/bin/env node
/**
 * 記事自動生成スクリプト
 * RSSフィードからAIニュースを収集し、Claude APIで記事を自動生成する
 *
 * 使い方:
 *   node scripts/generate-article.mjs
 *
 * 環境変数:
 *   ANTHROPIC_API_KEY (必須)
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ---- RSS ソース ----
const RSS_FEEDS = [
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://venturebeat.com/ai/feed/",
  "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
];

// ---- RSS 取得・パース ----
async function fetchRssItems(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RSS reader)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = [];
    const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/g) || [];
    for (const block of itemBlocks.slice(0, 10)) {
      const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
        block.match(/<title>(.*?)<\/title>/))?.[1]?.trim();
      const desc = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
        block.match(/<description>(.*?)<\/description>/))?.[1]
        ?.replace(/<[^>]+>/g, "")
        .trim()
        .slice(0, 200);
      if (title) items.push({ title, desc: desc || "" });
    }
    return items;
  } catch {
    return [];
  }
}

async function collectRssItems() {
  console.log("RSSフィードを取得中...");
  const results = await Promise.all(RSS_FEEDS.map(fetchRssItems));
  const all = results.flat();
  console.log(`  ${all.length}件のニュースを取得しました`);
  return all;
}

// ---- 既存記事のスラッグ・タイトル取得 ----
function getExistingArticles() {
  const content = readFileSync(join(ROOT, "data", "articles.ts"), "utf-8");
  const slugs = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const titles = [...content.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
  return { slugs, titles };
}

// ---- Claude で記事生成 ----
async function generateArticle(rssItems, existing) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const newsText = rssItems
    .map((item, i) => `${i + 1}. ${item.title}\n   ${item.desc}`)
    .join("\n");

  const existingTitles = existing.titles.slice(-10).join("\n");

  const prompt = `以下は最新のAI関連ニュースです:

${newsText}

---
すでに書いた記事タイトル（重複不可）:
${existingTitles}

---
上記のニュースを参考に、日本人向けAIツール比較サイトの記事として最適なトピックを1つ選び、
日本語の記事を生成してください。

以下のJSON形式のみで返してください（説明文不要）:

{
  "slug": "url-safe-slug-in-english",
  "title": "記事タイトル（60文字以内、【2026年】を含める）",
  "description": "記事説明（100〜120文字、SEOを意識）",
  "date": "${new Date().toISOString().slice(0, 10)}",
  "tools": ["tool-slug1", "tool-slug2"],
  "sections": [
    { "heading": "見出し（20文字以内）", "body": "本文（150〜250文字、具体的な数字や比較を含む）" }
  ]
}

ルール:
- sectionsは5〜7個、最後は「まとめ」で締める
- toolsはサイトに登録済みのAIツールslug（英数字・ハイフン）
- 既存タイトルと重複しないトピックを選ぶ
- JSONのみ返す`;

  console.log("Claude APIで記事を生成中...");

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2500,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/(\{[\s\S]*\})/);
  if (!match) throw new Error("JSONが見つかりませんでした:\n" + text);

  return JSON.parse(match[1]);
}

// ---- articles.ts に追記 ----
function appendToArticlesTs(article) {
  const path = join(ROOT, "data", "articles.ts");
  const content = readFileSync(path, "utf-8");

  if (content.includes(`slug: "${article.slug}"`)) {
    throw new Error(`スラッグ "${article.slug}" はすでに存在します`);
  }

  const sections = article.sections
    .map(
      (s) =>
        `      {\n        heading: ${JSON.stringify(s.heading)},\n        body: ${JSON.stringify(s.body)},\n      }`
    )
    .join(",\n");

  const tools = article.tools.map((t) => JSON.stringify(t)).join(", ");

  const entry = `  {
    slug: ${JSON.stringify(article.slug)},
    title: ${JSON.stringify(article.title)},
    description: ${JSON.stringify(article.description)},
    date: ${JSON.stringify(article.date)},
    tools: [${tools}],
    sections: [
${sections},
    ],
  },`;

  writeFileSync(path, content.replace(/\];\s*$/, `\n${entry}\n];`), "utf-8");
  console.log(`data/articles.ts に追加: ${article.slug}`);
}

// ---- sitemap.xml に追記 ----
function appendToSitemap(slug) {
  const path = join(ROOT, "public", "sitemap.xml");
  const content = readFileSync(path, "utf-8");
  const url = `https://ai-tools-compare.vercel.app/articles/${slug}`;

  if (content.includes(url)) {
    console.log("sitemap.xml: すでに存在します（スキップ）");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const entry = `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  writeFileSync(path, content.replace("</urlset>", `${entry}\n</urlset>`), "utf-8");
  console.log(`public/sitemap.xml に追加: /articles/${slug}`);
}

// ---- メイン ----
async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("エラー: ANTHROPIC_API_KEY が設定されていません");
    process.exit(1);
  }

  const rssItems = await collectRssItems();
  if (rssItems.length === 0) {
    console.error("エラー: RSSの取得に失敗しました");
    process.exit(1);
  }

  const existing = getExistingArticles();
  const article = await generateArticle(rssItems, existing);

  console.log("\n生成された記事:");
  console.log(`  slug:  ${article.slug}`);
  console.log(`  title: ${article.title}`);
  console.log(`  sections: ${article.sections.length}個`);

  appendToArticlesTs(article);
  appendToSitemap(article.slug);

  console.log(`\n完了: /articles/${article.slug}`);
}

main().catch((err) => {
  console.error("エラー:", err.message);
  process.exit(1);
});
