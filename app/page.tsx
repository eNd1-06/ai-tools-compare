"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, categories, type Category } from "@/data/tools";

type SortOption = "default" | "japanese" | "price";

function formatPrice(tool: (typeof tools)[0]) {
  const minPaidPlan = tool.plans
    .filter((p) => p.price !== null && p.price > 0)
    .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];

  if (tool.hasFree && !minPaidPlan) return "無料";
  if (!minPaidPlan) return "要問い合わせ";
  const symbol = minPaidPlan.currency === "JPY" ? "¥" : "$";
  return `${symbol}${minPaidPlan.price?.toLocaleString()}/月〜`;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [japaneseOnly, setJapaneseOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let result = tools.filter((tool) => {
      if (selectedCategory !== "all" && !tool.categories.includes(selectedCategory)) return false;
      if (freeOnly && !tool.hasFree) return false;
      if (japaneseOnly && !tool.japaneseSupport) return false;
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
        const aFree = a.hasFree ? 0 : (a.plans.find((p) => p.price && p.price > 0)?.price ?? 99999);
        const bFree = b.hasFree ? 0 : (b.plans.find((p) => p.price && p.price > 0)?.price ?? 99999);
        return aFree - bFree;
      });
    }

    return result;
  }, [selectedCategory, freeOnly, japaneseOnly, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">AIツール比較サイト</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {tools.length}件のAIツールを用途・価格・機能で比較できます
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 検索・フィルター */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 space-y-3">
          {/* 検索ボックス */}
          <input
            type="text"
            placeholder="ツール名・機能・キーワードで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-4 items-center">
            {/* カテゴリ */}
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
                  {cat.name}
                </button>
              ))}
            </div>

            {/* チェックボックス・並び替え */}
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">並び順：デフォルト</option>
                <option value="japanese">日本語対応スコア順</option>
                <option value="price">価格が安い順</option>
              </select>
            </div>
          </div>
        </div>

        {/* ツール一覧 */}
        <p className="text-sm text-gray-500 mb-4">{filtered.length}件</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-semibold text-gray-900">{tool.name}</h2>
                <div className="flex gap-1 flex-shrink-0 ml-2">
                  {tool.hasFree && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      無料あり
                    </span>
                  )}
                  {tool.japaneseSupport && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      日本語
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{tool.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {tool.categories.map((cat) => {
                    const catData = categories.find((c) => c.slug === cat);
                    return (
                      <span
                        key={cat}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {catData?.name}
                      </span>
                    );
                  })}
                </div>
                <span className="text-sm font-medium text-gray-700 flex-shrink-0 ml-2">
                  {formatPrice(tool)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">該当するツールが見つかりませんでした</p>
            <p className="text-sm mt-1">検索条件を変えて試してみてください</p>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6 text-sm text-gray-500">
          <Link href="/about" className="hover:text-gray-700">このサイトについて</Link>
          <Link href="/privacy" className="hover:text-gray-700">プライバシーポリシー</Link>
          <span>© {new Date().getFullYear()} AIツール比較サイト</span>
        </div>
      </footer>
    </div>
  );
}
