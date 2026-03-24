"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { tools, categories } from "@/data/tools";

function formatPrice(tool: (typeof tools)[0]) {
  const minPaidPlan = tool.plans
    .filter((p) => p.price !== null && p.price > 0)
    .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
  if (tool.hasFree && !minPaidPlan) return "無料";
  if (!minPaidPlan) return "要問い合わせ";
  const symbol = minPaidPlan.currency === "JPY" ? "¥" : "$";
  return `${symbol}${minPaidPlan.price?.toLocaleString()}/月〜`;
}

function CompareContent() {
  const searchParams = useSearchParams();
  const slugs = (searchParams.get("tools") ?? "").split(",").filter(Boolean).slice(0, 3);
  const selected = slugs.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as (typeof tools)[number][];

  if (selected.length < 2) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">比較するには2件以上のツールを選んでください</p>
        <Link href="/" className="text-blue-600 hover:underline">← ツール一覧に戻る</Link>
      </div>
    );
  }

  const rows: { label: string; render: (tool: (typeof tools)[number]) => React.ReactNode }[] = [
    {
      label: "カテゴリ",
      render: (t) => (
        <div className="flex flex-wrap gap-1">
          {t.categories.map((c) => {
            const cat = categories.find((x) => x.slug === c);
            return <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{cat?.name}</span>;
          })}
        </div>
      ),
    },
    {
      label: "無料プラン",
      render: (t) => (
        <span className={t.hasFree ? "text-green-600 font-medium" : "text-gray-400"}>
          {t.hasFree ? "✓ あり" : "✗ なし"}
        </span>
      ),
    },
    {
      label: "無料プランの制限",
      render: (t) => <span className="text-sm text-gray-600">{t.freeLimit ?? "—"}</span>,
    },
    {
      label: "最安料金",
      render: (t) => <span className="font-semibold text-blue-600">{formatPrice(t)}</span>,
    },
    {
      label: "日本語対応",
      render: (t) => (
        <span className={t.japaneseSupport ? "text-blue-600 font-medium" : "text-gray-400"}>
          {t.japaneseSupport ? "✓ 対応" : "✗ 非対応"}
        </span>
      ),
    },
    {
      label: "日本語スコア",
      render: (t) => (
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={`text-base ${s <= t.japaneseScore ? "text-yellow-400" : "text-gray-200"}`}>★</span>
          ))}
        </div>
      ),
    },
    {
      label: "API提供",
      render: (t) => (
        <span className={t.hasAPI ? "text-green-600 font-medium" : "text-gray-400"}>
          {t.hasAPI ? "✓ あり" : "✗ なし"}
        </span>
      ),
    },
    {
      label: "対象ユーザー",
      render: (t) => (
        <span className="text-sm text-gray-700">
          {t.targetUser.includes("personal") && t.targetUser.includes("business")
            ? "個人・法人"
            : t.targetUser.includes("business")
            ? "法人向け"
            : "個人向け"}
        </span>
      ),
    },
    {
      label: "こんな人におすすめ",
      render: (t) => (
        <ul className="text-sm text-gray-600 space-y-1">
          {t.recommendedFor.map((r) => (
            <li key={r} className="flex gap-1"><span className="text-green-500 flex-shrink-0">✓</span>{r}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "料金プラン詳細",
      render: (t) => (
        <ul className="text-sm text-gray-600 space-y-1">
          {t.plans.map((p) => (
            <li key={p.name}>
              <span className="font-medium">{p.name}：</span>
              {p.price === 0 ? "無料" : p.price === null ? "要問い合わせ" : `${p.currency === "JPY" ? "¥" : "$"}${p.price?.toLocaleString()}/${p.billingCycle === "monthly" ? "月" : "年"}`}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div style={{ minWidth: `${200 + selected.length * 220}px` }}>
        {/* ツール名ヘッダー */}
        <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
          <div />
          {selected.map((tool) => (
            <div key={tool.slug} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <h2 className="font-bold text-gray-900 mb-1">{tool.name}</h2>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">{tool.description}</p>
              <a
                href={tool.affiliateUrl ?? tool.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                公式サイトへ →
              </a>
            </div>
          ))}
        </div>

        {/* 比較テーブル */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid gap-4 p-4 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}
            >
              <div className="text-sm font-medium text-gray-500 self-start pt-0.5">{row.label}</div>
              {selected.map((tool) => (
                <div key={tool.slug}>{row.render(tool)}</div>
              ))}
            </div>
          ))}
        </div>

        {/* 下部CTA */}
        <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
          <div />
          {selected.map((tool) => (
            <a
              key={tool.slug}
              href={tool.affiliateUrl ?? tool.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="block text-center bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              {tool.name}を試す →
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CompareToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:underline">← ツール一覧に戻る</Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">AIツール比較</h1>
        <Suspense fallback={<div className="text-gray-400 text-center py-20">読み込み中...</div>}>
          <CompareContent />
        </Suspense>
      </main>
    </div>
  );
}
