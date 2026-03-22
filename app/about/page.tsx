import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "このサイトについて | AIツール比較サイト",
  description: "AIツール比較サイトの運営方針・掲載基準・免責事項についてご説明します。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← ツール一覧に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        <section>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">このサイトについて</h1>
          <p className="text-gray-600 leading-relaxed">
            このサイトは、ChatGPT・Claude・Geminiをはじめとする{tools.length}件以上のAIツールを、
            料金・日本語対応・用途・機能の観点から比較・紹介しています。
            AIツールを初めて使う方から、特定の用途に合ったツールを探している方まで、
            自分に合った選択ができるよう情報をまとめています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">掲載基準</h2>
          <ul className="space-y-2 text-gray-600 text-sm leading-relaxed">
            <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">•</span>実際にサービスが提供されているAIツールであること</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">•</span>公式サイトで料金・機能が確認できること</li>
            <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">•</span>個人または法人が業務・制作活動に活用できるツールであること</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">情報の正確性について</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            掲載している料金・機能・プラン情報は、各ツールの公式サイトをもとに作成していますが、
            サービスの変更により最新情報と異なる場合があります。
            最新の情報は各ツールの公式サイトをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">広告・アフィリエイトについて</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            本サイトは、アフィリエイトプログラムに参加しており、
            一部のリンクを経由して申し込みや購入が行われた場合に報酬を受け取ることがあります。
            ただし、掲載内容や評価はこれに影響されず、独自の基準で作成しています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">免責事項</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            本サイトの情報を利用したことによって生じた損害について、運営者は一切の責任を負いません。
            ツールの利用にあたっては、各サービスの利用規約をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">お問い合わせ</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            掲載内容の誤りや追加リクエストは、各ページ下部の情報をもとにご連絡ください。
            掲載ツールの追加・修正依頼も受け付けています。
          </p>
        </section>
      </main>
    </div>
  );
}
