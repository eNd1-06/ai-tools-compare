import Link from "next/link";
import type { Metadata } from "next";
import { recommendTypes } from "@/data/recommend";

export const metadata: Metadata = {
  title: "用途別AIツールおすすめ【2026年】ライター・エンジニア・ビジネス・クリエイター向け",
  description: "ライター・エンジニア・クリエイター・ビジネスパーソン向けにAIツールを厳選紹介。あなたの目的に合った最適なAIツールが見つかります。無料ツールも多数掲載。",
};

export default function RecommendPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500 flex items-center gap-1">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>›</span>
            <span className="text-gray-800">用途別おすすめ</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">用途別AIツールおすすめ</h1>
        <p className="text-gray-500 mb-8">あなたの用途に合ったAIツールを見つけましょう</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendTypes.map((type) => (
            <Link
              key={type.slug}
              href={`/recommend/${type.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="text-3xl mb-3">{type.icon}</div>
              <h2 className="font-semibold text-gray-900 mb-1">{type.name}向け</h2>
              <p className="text-sm text-gray-500">{type.description}</p>
              <p className="text-xs text-blue-600 mt-3">{type.tools.length}件のツールを紹介 →</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
