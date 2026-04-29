import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { tools } from "@/data/tools";
import { AdSlot } from "@/components/AdSlot";
import { vsPairs, getVsSlug } from "@/data/vs-pairs";

const BASE_URL = "https://ai-tools-compare-ten.vercel.app";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  const url = `${BASE_URL}/articles/${slug}`;
  return {
    title: article.title,
    description: article.description,
    openGraph: { type: "article", url, title: article.title, description: article.description, locale: "ja_JP", siteName: "AIツール比較サイト" },
    twitter: { card: "summary", title: article.title, description: article.description },
    alternates: { canonical: url },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedTools = article.tools
    .map((s) => tools.find((t) => t.slug === s))
    .filter(Boolean) as (typeof tools)[number][];

  const relatedVs = vsPairs
    .filter((p) => article.tools.includes(p.slugA) && article.tools.includes(p.slugB))
    .map((p) => ({
      slug: getVsSlug(p.slugA, p.slugB),
      toolA: tools.find((t) => t.slug === p.slugA)!,
      toolB: tools.find((t) => t.slug === p.slugB)!,
    }))
    .filter((v) => v.toolA && v.toolB);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>›</span>
            <Link href="/articles" className="hover:text-blue-600">比較記事</Link>
            <span>›</span>
            <span className="text-gray-800 line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-xs text-gray-400 mb-2">{article.date.replace(/-/g, ".")}</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{article.title}</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">{article.description}</p>

        {/* 記事本文 */}
        <div className="space-y-6 mb-10">
          {article.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{section.heading}</h2>
              <p className="text-gray-600 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <AdSlot slot="auto" />

        {/* 関連ツール */}
        {relatedTools.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">この記事で紹介したツール</h2>
            <div className="space-y-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div>
                    <span className="font-medium text-gray-900 text-sm">{tool.name}</span>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{tool.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    {tool.hasFree && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">無料あり</span>
                    )}
                    <span className="text-xs text-blue-600">詳細 →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 関連比較ページ */}
        {relatedVs.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">ツールを徹底比較する</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedVs.map(({ slug, toolA, toolB }) => (
                <Link
                  key={slug}
                  href={`/vs/${slug}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm">{toolA.name} vs {toolB.name}</span>
                  <span className="text-xs text-blue-600 shrink-0">比較する →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
