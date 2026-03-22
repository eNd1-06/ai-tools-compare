import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, categories, getToolBySlug } from "@/data/tools";
import { toolFaqs } from "@/data/faqs";
import { toolAlternatives } from "@/data/alternatives";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name}の料金・機能・評判 | AIツール比較`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const freePlan = tool.plans.find((p) => p.price === 0);
  const paidPlans = tool.plans.filter((p) => p.price !== 0);
  const faqs = toolFaqs[tool.slug] ?? [];
  const alternativeSlugs = toolAlternatives[tool.slug] ?? [];
  const alternativeTools = alternativeSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← ツール一覧に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{tool.name}</h1>
              <div className="flex flex-wrap gap-2">
                {tool.categories.map((cat) => {
                  const catData = categories.find((c) => c.slug === cat);
                  return (
                    <span key={cat} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {catData?.name}
                    </span>
                  );
                })}
              </div>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              公式サイトへ →
            </a>
          </div>
          <p className="text-gray-600">{tool.description}</p>
        </div>

        {/* 基本情報 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">基本情報</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{tool.hasFree ? "✅" : "❌"}</div>
              <div className="text-xs text-gray-500">無料プラン</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{tool.japaneseSupport ? "✅" : "❌"}</div>
              <div className="text-xs text-gray-500">日本語対応</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{tool.hasAPI ? "✅" : "❌"}</div>
              <div className="text-xs text-gray-500">API提供</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-1">
                {tool.targetUser.includes("personal") && tool.targetUser.includes("business")
                  ? "個人・法人"
                  : tool.targetUser.includes("business")
                  ? "法人向け"
                  : "個人向け"}
              </div>
              <div className="text-xs text-gray-500">対象ユーザー</div>
            </div>
          </div>
        </div>

        {/* 料金プラン */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">料金プラン</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tool.plans.map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-lg p-4 ${
                  plan.price === 0
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="font-medium text-gray-900 mb-1">{plan.name}</div>
                <div className="text-xl font-bold text-gray-900">
                  {plan.price === 0
                    ? "無料"
                    : plan.price === null
                    ? "要問い合わせ"
                    : `$${plan.price}`}
                  {plan.price !== null && plan.price > 0 && (
                    <span className="text-sm font-normal text-gray-500">
                      /{plan.billingCycle === "monthly" ? "月" : "年"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {tool.hasFree && tool.freeLimit && (
            <p className="text-sm text-gray-500 mt-3">
              ※ 無料プランの制限: {tool.freeLimit}
            </p>
          )}
        </div>

        {/* こんな人におすすめ */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">こんな人におすすめ</h2>
          <ul className="space-y-2">
            {tool.recommendedFor.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 日本語対応スコア */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">日本語対応スコア</h2>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl ${star <= tool.japaneseScore ? "text-yellow-400" : "text-gray-200"}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {tool.japaneseScore === 5 && "完全対応（UI・出力ともに高品質）"}
              {tool.japaneseScore === 4 && "ほぼ対応（日本語出力は良好）"}
              {tool.japaneseScore === 3 && "部分対応（日本語は使えるが品質にムラあり）"}
              {tool.japaneseScore === 2 && "限定的（基本的に英語UI）"}
              {tool.japaneseScore === 1 && "非対応"}
            </span>
          </div>
        </div>

        {/* 代替ツール */}
        {alternativeTools.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">{tool.name}の代替ツール</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {alternativeTools.map((alt) => {
                if (!alt) return null;
                return (
                  <Link
                    key={alt.slug}
                    href={`/tools/${alt.slug}`}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm">{alt.name}</div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{alt.description}</p>
                    </div>
                    {alt.hasFree && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full shrink-0">
                        無料あり
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">よくある質問</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <p className="font-medium text-gray-900 text-sm mb-1">Q. {faq.q}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">A. {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* タグ */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">関連キーワード</h2>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
