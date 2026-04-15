import Link from "next/link";
import type { Metadata } from "next";
import { tools, categories } from "@/data/tools";

export const metadata: Metadata = {
  title: "AIツールランキング【2026年最新】日本語対応TOP10・無料おすすめ・カテゴリ別",
  description: "日本語対応AIツールTOP10・無料で使えるAIツールTOP10・カテゴリ別ランキングを掲載。2026年最新版。用途に合ったAIツールが1分で見つかります。",
};

function formatPrice(tool: (typeof tools)[0]) {
  const minPaidPlan = tool.plans
    .filter((p) => p.price !== null && p.price > 0)
    .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
  if (tool.hasFree && !minPaidPlan) return "無料";
  if (!minPaidPlan) return "要問い合わせ";
  const symbol = minPaidPlan.currency === "JPY" ? "¥" : "$";
  return `${symbol}${minPaidPlan.price?.toLocaleString()}/月〜`;
}

const japaneseTop = [...tools]
  .sort((a, b) => b.japaneseScore - a.japaneseScore)
  .slice(0, 10);

const freeTop = tools.filter((t) => t.hasFree).slice(0, 10);

const categoryRankings = categories.map((cat) => ({
  cat,
  top: tools
    .filter((t) => t.categories.includes(cat.slug as never))
    .sort((a, b) => b.japaneseScore - a.japaneseScore)
    .slice(0, 5),
}));

function RankCard({
  tool,
  rank,
}: {
  tool: (typeof tools)[0];
  rank: number;
}) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          rank === 1
            ? "bg-yellow-400 text-white"
            : rank === 2
            ? "bg-gray-300 text-gray-700"
            : rank === 3
            ? "bg-amber-600 text-white"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-gray-900">{tool.name}</span>
          {tool.hasFree && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">無料あり</span>
          )}
          {tool.japaneseSupport && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">日本語</span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{tool.description}</p>
      </div>
      <div className="flex gap-0.5 flex-shrink-0">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className={`text-sm ${s <= tool.japaneseScore ? "text-yellow-400" : "text-gray-200"}`}>★</span>
        ))}
      </div>
      <span className="text-sm font-semibold text-blue-600 flex-shrink-0 w-24 text-right">
        {formatPrice(tool)}
      </span>
    </Link>
  );
}

export default function RankingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <nav className="text-sm text-blue-200 flex items-center gap-1">
            <Link href="/" className="hover:text-white">ホーム</Link>
            <span>›</span>
            <span className="text-white">AIツールランキング</span>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">AIツールランキング【2026年最新】</h1>
          <p className="text-blue-100">日本語対応・無料・カテゴリ別のランキングを掲載</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* 日本語対応ランキング */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">日本語対応AIツール TOP10</h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {japaneseTop.map((tool, i) => (
              <RankCard key={tool.slug} tool={tool} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* 無料プランあり */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">無料で使えるAIツール TOP10</h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {freeTop.map((tool, i) => (
              <RankCard key={tool.slug} tool={tool} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* カテゴリ別 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">カテゴリ別ランキング</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryRankings.map(({ cat, top }) => (
              top.length > 0 && (
                <div key={cat.slug} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{cat.name}ツール</h3>
                    <Link href={`/compare/${cat.slug}`} className="text-xs text-blue-600 hover:underline">
                      全件比較 →
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {top.map((tool, i) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-gray-700" : i === 2 ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-500"
                        }`}>{i + 1}</span>
                        <span className="flex-1 text-sm font-medium text-gray-900">{tool.name}</span>
                        {tool.hasFree && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">無料</span>}
                        <span className="text-xs font-semibold text-blue-600">{formatPrice(tool)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
