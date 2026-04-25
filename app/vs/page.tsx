import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/data/tools";
import { vsPairs, getVsSlug } from "@/data/vs-pairs";

const BASE_URL = "https://ai-tools-compare-ten.vercel.app";

export const metadata: Metadata = {
  title: "AIツール比較一覧【2026年最新】人気ツールを徹底比較 | AIツール比較サイト",
  description: "CursorvsWindsurf、BoltvsLovableなど人気AIツールの比較ページ一覧。料金・機能・日本語対応を徹底比較してあなたに合ったツールを見つけましょう。",
  alternates: { canonical: `${BASE_URL}/vs` },
};

export default function VsIndexPage() {
  const pairs = vsPairs.map((pair) => {
    const toolA = tools.find((t) => t.slug === pair.slugA);
    const toolB = tools.find((t) => t.slug === pair.slugB);
    return { pair, toolA, toolB };
  }).filter((p): p is { pair: typeof p.pair; toolA: NonNullable<typeof p.toolA>; toolB: NonNullable<typeof p.toolB> } =>
    p.toolA != null && p.toolB != null
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500 flex items-center gap-1">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>›</span>
            <span className="text-gray-800">AIツール比較一覧</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AIツール比較一覧</h1>
          <p className="text-gray-500 text-sm">人気AIツール同士を料金・機能・日本語対応で徹底比較。あなたに合った一択がわかります。</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pairs.map(({ pair, toolA, toolB }) => {
            const slug = getVsSlug(pair.slugA, pair.slugB);
            return (
              <Link
                key={slug}
                href={`/vs/${slug}`}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900 text-sm">{toolA.name} vs {toolB.name}</span>
                  <span className="text-blue-500 text-sm">→</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {toolA.hasFree && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                      {toolA.name} 無料あり
                    </span>
                  )}
                  {toolB.hasFree && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                      {toolB.name} 無料あり
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-1">
                  {toolA.description.slice(0, 40)}… vs {toolB.description.slice(0, 40)}…
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-blue-600 hover:underline">← 全AIツール一覧に戻る</Link>
        </div>
      </main>
    </div>
  );
}
