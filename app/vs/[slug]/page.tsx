import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, getToolBySlug, categories, type AITool } from "@/data/tools";
import { vsPairs, parseVsSlug, getVsSlug, getRelatedVsPairs } from "@/data/vs-pairs";
import { AdSlot } from "@/components/AdSlot";

type Props = { params: Promise<{ slug: string }> };

const BASE_URL = "https://ai-tools-compare-ten.vercel.app";

export async function generateStaticParams() {
  return vsPairs.map((p) => ({ slug: getVsSlug(p.slugA, p.slugB) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseVsSlug(slug);
  if (!parsed) return {};
  const toolA = getToolBySlug(parsed.slugA);
  const toolB = getToolBySlug(parsed.slugB);
  if (!toolA || !toolB) return {};
  const title = `${toolA.name} vs ${toolB.name}：どちらがおすすめ？【2026年最新比較】`;
  const description = `${toolA.name}と${toolB.name}を料金・機能・日本語対応で徹底比較。あなたに合ったAIツールがわかります。`;
  const url = `${BASE_URL}/vs/${slug}`;
  return {
    title,
    description,
    openGraph: { type: "article", locale: "ja_JP", url, siteName: "AIツール比較サイト", title, description },
    twitter: { card: "summary", title, description },
    alternates: { canonical: url },
  };
}

function getMinPrice(tool: AITool): { price: number; currency: string } | null {
  const paid = tool.plans.filter((p) => p.price !== null && p.price > 0);
  if (paid.length === 0) return null;
  const min = paid.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
  return { price: min.price as number, currency: min.currency };
}

function formatPrice(tool: AITool): string {
  if (tool.hasFree && tool.plans.filter((p) => p.price !== null && p.price > 0).length === 0) return "完全無料";
  const min = getMinPrice(tool);
  if (!min) return tool.hasFree ? "無料〜" : "要問い合わせ";
  const symbol = min.currency === "JPY" ? "¥" : "$";
  return tool.hasFree ? `無料〜${symbol}${min.price.toLocaleString()}/月` : `${symbol}${min.price.toLocaleString()}/月〜`;
}

function generateConclusion(toolA: AITool, toolB: AITool): string {
  const parts: string[] = [];

  if (toolA.hasFree && !toolB.hasFree) {
    parts.push(`まず無料で試したいなら${toolA.name}が最適です。`);
  } else if (!toolA.hasFree && toolB.hasFree) {
    parts.push(`まず無料で試したいなら${toolB.name}が最適です。`);
  }

  const minA = getMinPrice(toolA);
  const minB = getMinPrice(toolB);
  if (minA && minB && minA.currency === minB.currency) {
    if (minA.price < minB.price) {
      parts.push(`コスパ重視なら${toolA.name}、予算に余裕があり多機能を求めるなら${toolB.name}がおすすめです。`);
    } else if (minB.price < minA.price) {
      parts.push(`コスパ重視なら${toolB.name}、予算に余裕があり多機能を求めるなら${toolA.name}がおすすめです。`);
    }
  }

  if (toolA.japaneseScore > toolB.japaneseScore) {
    parts.push(`日本語での使い心地は${toolA.name}が優れています（★${toolA.japaneseScore} vs ★${toolB.japaneseScore}）。`);
  } else if (toolB.japaneseScore > toolA.japaneseScore) {
    parts.push(`日本語での使い心地は${toolB.name}が優れています（★${toolB.japaneseScore} vs ★${toolA.japaneseScore}）。`);
  }

  if (toolA.hasAPI && !toolB.hasAPI) {
    parts.push(`開発者やAPI連携が必要な場合は${toolA.name}一択です。`);
  } else if (!toolA.hasAPI && toolB.hasAPI) {
    parts.push(`開発者やAPI連携が必要な場合は${toolB.name}一択です。`);
  }

  if (parts.length === 0) {
    parts.push(`${toolA.name}と${toolB.name}はどちらも優れたツールです。用途と予算に合わせて選んでください。`);
  }

  return parts.join(" ");
}

export default async function VsPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseVsSlug(slug);
  if (!parsed) notFound();

  const toolA = getToolBySlug(parsed.slugA);
  const toolB = getToolBySlug(parsed.slugB);
  if (!toolA || !toolB) notFound();

  const conclusion = generateConclusion(toolA, toolB);

  const relatedA = getRelatedVsPairs(toolA.slug).filter((p) => getVsSlug(p.slugA, p.slugB) !== slug);
  const relatedB = getRelatedVsPairs(toolB.slug).filter((p) => getVsSlug(p.slugA, p.slugB) !== slug);
  const related = [...relatedA, ...relatedB].filter(
    (p, i, arr) => arr.findIndex((q) => getVsSlug(q.slugA, q.slugB) === getVsSlug(p.slugA, p.slugB)) === i
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "AIツール比較", item: `${BASE_URL}/vs` },
      { "@type": "ListItem", position: 3, name: `${toolA.name} vs ${toolB.name}`, item: `${BASE_URL}/vs/${slug}` },
    ],
  };

  const stars = (score: number) => "★".repeat(score) + "☆".repeat(5 - score);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>›</span>
            <Link href="/vs" className="hover:text-blue-600">AIツール比較</Link>
            <span>›</span>
            <span className="text-gray-800">{toolA.name} vs {toolB.name}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* H1 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {toolA.name} vs {toolB.name}：どちらがおすすめ？【2026年最新】
          </h1>
          <p className="text-sm text-gray-500">
            {toolA.name}と{toolB.name}を料金・機能・日本語対応で徹底比較。あなたに合った一択がわかります。
          </p>
        </div>

        {/* 結論（最初に答えを出す） */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-2 text-lg">結論</h2>
          <p className="text-gray-700 leading-relaxed">{conclusion}</p>
        </div>

        {/* 上部CTA（横並び） */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <a
            href={toolA.affiliateUrl ?? toolA.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="block text-center bg-blue-600 text-white px-4 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            {toolA.name}を試す →
          </a>
          <a
            href={toolB.affiliateUrl ?? toolB.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="block text-center bg-indigo-600 text-white px-4 py-3.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {toolB.name}を試す →
          </a>
        </div>

        {/* 総合比較表 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">総合比較表</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 text-gray-500 font-normal">項目</th>
                  <th className="text-center py-2 px-4 font-semibold text-gray-900">{toolA.name}</th>
                  <th className="text-center py-2 px-4 font-semibold text-gray-900">{toolB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 pr-4 text-gray-600">無料プラン</td>
                  <td className="py-3 px-4 text-center">{toolA.hasFree ? "✅ あり" : "❌ なし"}</td>
                  <td className="py-3 px-4 text-center">{toolB.hasFree ? "✅ あり" : "❌ なし"}</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">料金</td>
                  <td className="py-3 px-4 text-center font-medium">{formatPrice(toolA)}</td>
                  <td className="py-3 px-4 text-center font-medium">{formatPrice(toolB)}</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">日本語対応</td>
                  <td className="py-3 px-4 text-center text-yellow-500">{stars(toolA.japaneseScore)}</td>
                  <td className="py-3 px-4 text-center text-yellow-500">{stars(toolB.japaneseScore)}</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">API提供</td>
                  <td className="py-3 px-4 text-center">{toolA.hasAPI ? "✅" : "❌"}</td>
                  <td className="py-3 px-4 text-center">{toolB.hasAPI ? "✅" : "❌"}</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">対象ユーザー</td>
                  <td className="py-3 px-4 text-center text-xs">
                    {toolA.targetUser.includes("personal") && toolA.targetUser.includes("business") ? "個人・法人" : toolA.targetUser.includes("business") ? "法人向け" : "個人向け"}
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    {toolB.targetUser.includes("personal") && toolB.targetUser.includes("business") ? "個人・法人" : toolB.targetUser.includes("business") ? "法人向け" : "個人向け"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 料金プラン比較 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">料金プラン比較</h2>
          <div className="grid grid-cols-2 gap-6">
            {[toolA, toolB].map((tool) => (
              <div key={tool.slug}>
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">{tool.name}</h3>
                <div className="space-y-2">
                  {tool.plans.map((plan) => (
                    <div key={plan.name} className={`border rounded-lg p-3 ${plan.price === 0 ? "border-green-200 bg-green-50" : "border-gray-200"}`}>
                      <div className="font-medium text-gray-900 text-sm">{plan.name}</div>
                      <div className="text-base font-bold text-gray-900">
                        {plan.price === 0 ? "無料" : plan.price === null ? "要問い合わせ" : `${plan.currency === "JPY" ? "¥" : "$"}${plan.price.toLocaleString()}`}
                        {plan.price !== null && plan.price > 0 && (
                          <span className="text-xs font-normal text-gray-500">/{plan.billingCycle === "monthly" ? "月" : "年"}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* メリット・デメリット比較 */}
        {(toolA.pros || toolA.cons || toolB.pros || toolB.cons) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-4 text-lg">メリット・デメリット比較</h2>
            <div className="grid grid-cols-2 gap-6">
              {[toolA, toolB].map((tool) => (
                <div key={tool.slug}>
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">{tool.name}</h3>
                  {tool.pros && tool.pros.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-green-700 mb-1">メリット</p>
                      <ul className="space-y-1">
                        {tool.pros.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                            <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tool.cons && tool.cons.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-red-600 mb-1">デメリット</p>
                      <ul className="space-y-1">
                        {tool.cons.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                            <span className="text-red-400 font-bold mt-0.5 shrink-0">✗</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* こんな人におすすめ */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[toolA, toolB].map((tool, idx) => (
            <div key={tool.slug} className={`rounded-xl border p-5 ${idx === 0 ? "bg-blue-50 border-blue-200" : "bg-indigo-50 border-indigo-200"}`}>
              <h2 className="font-bold text-gray-900 mb-3 text-sm">こんな人には{tool.name}</h2>
              <ul className="space-y-1.5">
                {tool.recommendedFor.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-gray-700">
                    <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 個別ページへのリンク */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">各ツールの詳細情報</h2>
          <div className="grid grid-cols-2 gap-4">
            {[toolA, toolB].map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="font-semibold text-gray-900 text-sm mb-1">{tool.name}</div>
                <p className="text-xs text-gray-500 line-clamp-2">{tool.description}</p>
                <span className="text-xs text-blue-600 mt-2 inline-block">詳細・料金を見る →</span>
              </Link>
            ))}
          </div>
        </div>

        <AdSlot slot="auto" />

        {/* 関連比較ページ */}
        {related.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-4 text-lg">関連比較</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((pair) => {
                const tA = tools.find((t) => t.slug === pair.slugA);
                const tB = tools.find((t) => t.slug === pair.slugB);
                if (!tA || !tB) return null;
                return (
                  <Link
                    key={getVsSlug(pair.slugA, pair.slugB)}
                    href={`/vs/${getVsSlug(pair.slugA, pair.slugB)}`}
                    className="flex items-center gap-2 p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors text-sm"
                  >
                    <span className="font-medium text-gray-900">{tA.name} vs {tB.name}</span>
                    <span className="text-blue-500 ml-auto">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* 下部CTA */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-gray-700 font-medium mb-1">他のAIツールも比較する</p>
          <p className="text-sm text-gray-500 mb-4">100以上のAIツールを料金・機能で徹底比較</p>
          <Link
            href="/vs"
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-900 transition-colors"
          >
            比較一覧を見る →
          </Link>
        </div>

      </main>
    </div>
  );
}
