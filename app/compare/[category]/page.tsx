import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, getToolsByCategory, type Category } from "@/data/tools";
import { categoryDetails } from "@/data/category-details";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name}AIツール比較【2026年最新】料金・機能・無料プランを徹底比較`,
    description: `${cat.name}のAIツールを料金・機能・日本語対応で比較。無料プランあり・API対応など条件で絞り込めます。`,
  };
}

export default async function CategoryComparePage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const categoryTools = getToolsByCategory(category as Category);
  const detail = categoryDetails[category as Category];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <nav className="text-sm text-blue-200 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">ホーム</Link>
            <span>›</span>
            <span className="text-white">{cat.name}AIツール比較</span>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {cat.name}AIツール比較【2026年最新】
          </h1>
          <p className="text-blue-100">
            {categoryTools.length}件の{cat.name}AIツールを料金・機能・日本語対応で徹底比較
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* カテゴリ解説 */}
        {detail && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-line mb-6">
              {detail.intro}
            </div>
            <h2 className="font-semibold text-gray-900 mb-4">{cat.name}AIツールの選び方</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {detail.points.map((point, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="font-medium text-gray-900 text-sm mb-2">
                    {i + 1}. {point.title}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 活用シーン */}
        {detail && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
            <h2 className="font-semibold text-gray-900 mb-3">主な活用シーン</h2>
            <div className="flex flex-wrap gap-2">
              {detail.useCases.map((useCase) => (
                <span key={useCase} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  {useCase}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 比較表 */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">ツール名</th>
                <th className="text-center p-4 font-medium text-gray-600">無料プラン</th>
                <th className="text-center p-4 font-medium text-gray-600">日本語</th>
                <th className="text-center p-4 font-medium text-gray-600">API</th>
                <th className="text-right p-4 font-medium text-gray-600">最安値（有料）</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categoryTools.map((tool) => {
                const minPaid = tool.plans
                  .filter((p) => p.price !== null && p.price > 0)
                  .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
                return (
                  <tr key={tool.slug} className="hover:bg-gray-50">
                    <td className="p-4">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {tool.name}
                      </Link>
                      <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{tool.description}</p>
                    </td>
                    <td className="p-4 text-center">{tool.hasFree ? "✅" : "❌"}</td>
                    <td className="p-4 text-center">{tool.japaneseSupport ? "✅" : "❌"}</td>
                    <td className="p-4 text-center">{tool.hasAPI ? "✅" : "❌"}</td>
                    <td className="p-4 text-right text-gray-700">
                      {minPaid
                        ? `${minPaid.currency === "JPY" ? "¥" : "$"}${minPaid.price?.toLocaleString()}/月`
                        : tool.hasFree ? "無料のみ" : "要問い合わせ"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
