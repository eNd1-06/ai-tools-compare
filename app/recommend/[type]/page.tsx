import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { recommendTypes } from "@/data/recommend";
import { tools } from "@/data/tools";

const BASE_URL = "https://ai-tools-compare-ten.vercel.app";

type Props = { params: Promise<{ type: string }> };

export async function generateStaticParams() {
  return recommendTypes.map((r) => ({ type: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const rec = recommendTypes.find((r) => r.slug === type);
  if (!rec) return {};
  const url = `${BASE_URL}/recommend/${type}`;
  const title = `${rec.name}向けAIツールおすすめ${rec.tools.length}選【2026年】`;
  return {
    title,
    description: rec.description,
    openGraph: { type: "article", url, title, description: rec.description, locale: "ja_JP", siteName: "AIツール比較サイト" },
    twitter: { card: "summary", title, description: rec.description },
    alternates: { canonical: url },
  };
}

export default async function RecommendTypePage({ params }: Props) {
  const { type } = await params;
  const rec = recommendTypes.find((r) => r.slug === type);
  if (!rec) notFound();

  const recTools = rec.tools
    .map((s) => tools.find((t) => t.slug === s))
    .filter(Boolean) as (typeof tools)[number][];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-blue-200 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">ホーム</Link>
            <span>›</span>
            <Link href="/recommend" className="hover:text-white">用途別おすすめ</Link>
            <span>›</span>
            <span className="text-white">{rec.name}向け</span>
          </nav>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="text-4xl mb-3">{rec.icon}</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {rec.name}向けAIツールおすすめ{rec.tools.length}選【2026年】
          </h1>
          <p className="text-blue-100">{rec.description}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* おすすめツール一覧 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">おすすめツール一覧</h2>
          <div className="space-y-4">
            {recTools.map((tool, i) => {
              const reasonData = rec.reasons.find((r) => r.slug === tool.slug);
              const minPaid = tool.plans
                .filter((p) => p.price !== null && p.price > 0)
                .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
              const price = tool.hasFree && !minPaid
                ? "無料"
                : !minPaid
                ? "要問い合わせ"
                : `${minPaid.currency === "JPY" ? "¥" : "$"}${minPaid.price?.toLocaleString()}/月〜`;

              return (
                <div key={tool.slug} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                        {tool.hasFree && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">無料あり</span>}
                        {tool.japaneseSupport && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">日本語対応</span>}
                        <span className="text-sm font-semibold text-blue-600 ml-auto">{price}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{tool.description}</p>
                      {reasonData && (
                        <p className="text-sm text-gray-700 bg-blue-50 rounded-lg px-3 py-2">
                          <span className="font-medium text-blue-700">おすすめ理由：</span>{reasonData.reason}
                        </p>
                      )}
                      <Link href={`/tools/${tool.slug}`} className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                        詳細・料金を見る →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 選び方のコツ */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">選び方のコツ</h2>
          <ul className="space-y-3">
            {rec.tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700">
                <span className="text-blue-500 font-bold flex-shrink-0">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* 他の用途を見る */}
        <section>
          <h2 className="font-semibold text-gray-900 mb-4">他の用途向けおすすめ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recommendTypes.filter((r) => r.slug !== rec.slug).map((r) => (
              <Link
                key={r.slug}
                href={`/recommend/${r.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <div className="text-2xl mb-1">{r.icon}</div>
                <p className="text-sm font-medium text-gray-700">{r.name}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
