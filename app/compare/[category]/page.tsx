import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, getToolsByCategory, type Category } from "@/data/tools";

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
  const freeTools = categoryTools.filter((t) => t.hasFree);
  const japaneseTools = categoryTools.filter((t) => t.japaneseSupport);
  const apiTools = categoryTools.filter((t) => t.hasAPI);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← ツール一覧に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {cat.name}AIツール比較【2026年最新】
        </h1>
        <p className="text-gray-500 mb-8">
          {categoryTools.length}件の{cat.name}AIツールを料金・機能・日本語対応で比較しています。
        </p>

        {/* サマリー */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{freeTools.length}</div>
            <div className="text-sm text-gray-500">無料プランあり</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{japaneseTools.length}</div>
            <div className="text-sm text-gray-500">日本語対応</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{apiTools.length}</div>
            <div className="text-sm text-gray-500">API提供あり</div>
          </div>
        </div>

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
                      {minPaid ? `$${minPaid.price}/月` : tool.hasFree ? "無料のみ" : "要問い合わせ"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 条件別おすすめ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">🆓 無料で使える</h2>
            <ul className="space-y-2">
              {freeTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-blue-600 hover:underline text-sm">
                    {tool.name}
                  </Link>
                  {tool.freeLimit && (
                    <p className="text-xs text-gray-400">{tool.freeLimit}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">🇯🇵 日本語対応</h2>
            <ul className="space-y-2">
              {japaneseTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-blue-600 hover:underline text-sm">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">🔧 API利用可能</h2>
            <ul className="space-y-2">
              {apiTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/tools/${tool.slug}`} className="text-blue-600 hover:underline text-sm">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
