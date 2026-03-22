"use client";

import { useState } from "react";
import Link from "next/link";
import { tools, categories, type Category } from "@/data/tools";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [japaneseOnly, setJapaneseOnly] = useState(false);

  const filtered = tools.filter((tool) => {
    if (selectedCategory !== "all" && !tool.categories.includes(selectedCategory)) return false;
    if (freeOnly && !tool.hasFree) return false;
    if (japaneseOnly && !tool.japaneseSupport) return false;
    return true;
  });

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
        {/* フィルター */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
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

            {/* チェックボックスフィルター */}
            <div className="flex gap-4 ml-auto">
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
            </div>
          </div>
        </div>

        {/* ツール一覧 */}
        <p className="text-sm text-gray-500 mb-4">{filtered.length}件</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => {
            const minPrice = tool.plans
              .filter((p) => p.price !== null && p.price > 0)
              .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];

            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-semibold text-gray-900">{tool.name}</h2>
                  <div className="flex gap-1">
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
                  <span className="text-sm font-medium text-gray-700">
                    {tool.hasFree && minPrice === undefined
                      ? "無料"
                      : minPrice
                      ? `$${minPrice.price}/月〜`
                      : "要問い合わせ"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6 text-sm text-gray-500">
          <Link href="/about" className="hover:text-gray-700">このサイトについて</Link>
          <span>© {new Date().getFullYear()} AIツール比較サイト</span>
        </div>
      </footer>
    </div>
  );
}
