"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, categories, type Category } from "@/data/tools";

type SortOption = "default" | "japanese" | "price";

const categoryIcons: Record<string, string> = {
  text: "✍️",
  image: "🎨",
  video: "🎬",
  voice: "🎙️",
  coding: "💻",
  automation: "⚙️",
  other: "🔧",
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

const freeCount = tools.filter((t) => t.hasFree).length;
const japaneseCount = tools.filter((t) => t.japaneseSupport).length;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [japaneseOnly, setJapaneseOnly] = useState(false);
  const [apiOnly, setApiOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleCompare = (slug: string) => {
    setCompareList((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < 3
        ? [...prev, slug]
        : prev
    );
  };

  const filtered = useMemo(() => {
    let result = tools.filter((tool) => {
      if (selectedCategory !== "all" && !tool.categories.includes(selectedCategory)) return false;
      if (freeOnly && !tool.hasFree) return false;
      if (japaneseOnly && !tool.japaneseSupport) return false;
      if (apiOnly && !tool.hasAPI) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !tool.name.toLowerCase().includes(q) &&
          !tool.description.toLowerCase().includes(q) &&
          !tool.tags.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
    if (sortBy === "japanese") {
      result = [...result].sort((a, b) => b.japaneseScore - a.japaneseScore);
    } else if (sortBy === "price") {
      result = [...result].sort((a, b) => {
        const aPrice = a.hasFree ? 0 : (a.plans.find((p) => p.price && p.price > 0)?.price ?? 99999);
        const bPrice = b.hasFree ? 0 : (b.plans.find((p) => p.price && p.price > 0)?.price ?? 99999);
        return aPrice - bPrice;
      });
    }
    return result;
  }, [selectedCategory, freeOnly, japaneseOnly, apiOnly, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーション */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-6 text-sm">
          <Link href="/" className="font-bold text-blue-600">AIツール比較</Link>
          <Link href="/vs" className="text-gray-600 hover:text-blue-600 transition-colors">ツール比較</Link>
          <Link href="/articles" className="text-gray-600 hover:text-blue-600 transition-colors">記事</Link>
          <Link href="/ranking" className="text-gray-600 hover:text-blue-600 transition-colors">ランキング</Link>
          <Link href="/recommend" className="text-gray-600 hover:text-blue-600 transition-colors">おすすめ診断</Link>
        </div>
      </nav>

      {/* ヒーロー */}
      <header className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">AIツールを、賢く選ぼう</h1>
          <p className="text-blue-100 text-lg mb-8">
            料金・機能・日本語対応を徹底比較。あなたに最適なAIツールが見つかります。
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{tools.length}</div>
              <div className="text-blue-200 text-sm mt-0.5">掲載ツール数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{freeCount}</div>
              <div className="text-blue-200 text-sm mt-0.5">無料プランあり</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{japaneseCount}</div>
              <div className="text-blue-200 text-sm mt-0.5">日本語対応</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{categories.length}</div>
              <div className="text-blue-200 text-sm mt-0.5">カテゴリ</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 検索・フィルター */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 space-y-3">
          <input
            type="text"
            placeholder="ツール名・機能・キーワードで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                すべて
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {categoryIcons[cat.slug]} {cat.name}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 ml-auto items-center">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                  className="rounded"
                />
                無料プランあり
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={japaneseOnly}
                  onChange={(e) => setJapaneseOnly(e.target.checked)}
                  className="rounded"
                />
                日本語対応
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={apiOnly}
                  onChange={(e) => setApiOnly(e.target.checked)}
                  className="rounded"
                />
                API提供あり
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">並び順：デフォルト</option>
                <option value="japanese">日本語スコア順</option>
                <option value="price">価格が安い順</option>
              </select>
            </div>
          </div>
        </div>

        {/* ツール一覧 */}
        <p className="text-sm text-gray-500 mb-4">{filtered.length}件</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => {
            const inCompare = compareList.includes(tool.slug);
            return (
              <div key={tool.slug} className="flex flex-col">
                <Link
                  href={`/tools/${tool.slug}`}
                  className={`bg-white rounded-t-xl border border-b-0 p-5 hover:shadow-md transition-all flex-1 ${inCompare ? "border-blue-400" : "border-gray-200 hover:border-blue-200"}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-semibold text-gray-900 leading-tight">{tool.name}</h2>
                      {tool.isNew && (
                        <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded font-bold leading-none">NEW</span>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0 ml-2">
                      {tool.hasFree && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                          無料あり
                        </span>
                      )}
                      {tool.japaneseSupport && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                          日本語
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className={`text-sm ${s <= tool.japaneseScore ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                    ))}
                    <span className="text-xs text-gray-400 ml-1 self-center">日本語</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{tool.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {tool.categories.map((cat) => {
                        const catData = categories.find((c) => c.slug === cat);
                        return (
                          <span key={cat} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {categoryIcons[cat]} {catData?.name}
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-sm font-semibold text-blue-600 flex-shrink-0 ml-2">
                      {formatPrice(tool)}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => toggleCompare(tool.slug)}
                  disabled={!inCompare && compareList.length >= 3}
                  className={`rounded-b-xl border px-4 py-2 text-xs font-medium transition-colors ${
                    inCompare
                      ? "bg-blue-600 text-white border-blue-400"
                      : compareList.length >= 3
                      ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  }`}
                >
                  {inCompare ? "✓ 比較中（クリックで解除）" : "+ 比較に追加"}
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">該当するツールが見つかりませんでした</p>
            <p className="text-sm mt-1">検索条件を変えて試してみてください</p>
          </div>
        )}
      </main>

      {/* 比較スティッキーバー */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <span className="text-sm text-gray-500 flex-shrink-0">比較中：</span>
            <div className="flex gap-2 flex-1 flex-wrap">
              {compareList.map((slug) => {
                const t = tools.find((x) => x.slug === slug);
                return (
                  <span key={slug} className="flex items-center gap-1 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200">
                    {t?.name}
                    <button onClick={() => toggleCompare(slug)} className="text-blue-400 hover:text-blue-700 ml-0.5">×</button>
                  </span>
                );
              })}
              {compareList.length < 3 && (
                <span className="text-xs text-gray-400 self-center">（最大3件）</span>
              )}
            </div>
            <a
              href={`/compare-tools?tools=${compareList.join(",")}`}
              className={`flex-shrink-0 px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                compareList.length >= 2
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 pointer-events-none"
              }`}
            >
              比較する {compareList.length >= 2 ? "→" : `（あと${2 - compareList.length}件）`}
            </a>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
            <Link href="/ranking" className="hover:text-gray-700">ランキング</Link>
            <Link href="/articles" className="hover:text-gray-700">比較記事</Link>
            <Link href="/recommend" className="hover:text-gray-700">用途別おすすめ</Link>
            <Link href="/about" className="hover:text-gray-700">このサイトについて</Link>
            <Link href="/privacy" className="hover:text-gray-700">プライバシーポリシー</Link>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} AIツール比較サイト</p>
        </div>
      </footer>
    </div>
  );
}
