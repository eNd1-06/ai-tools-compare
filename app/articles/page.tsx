import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "AIツール比較記事一覧 | AIツール比較サイト",
  description: "ChatGPT vs Claude、無料AIツール特集、コーディングAI比較など、AIツールを深掘りする記事を掲載しています。",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500 flex items-center gap-1">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>›</span>
            <span className="text-gray-800">比較記事</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">AIツール比較記事</h1>
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <p className="text-xs text-gray-400 mb-1">{article.date.replace(/-/g, ".")}</p>
              <h2 className="font-semibold text-gray-900 mb-2 leading-snug">{article.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
