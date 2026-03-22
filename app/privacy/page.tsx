import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | AIツール比較サイト",
  description: "AIツール比較サイトのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← ツール一覧に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">プライバシーポリシー</h1>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">個人情報の取り扱いについて</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            本サイト（AIツール比較サイト）は、ユーザーの個人情報を収集・販売することはありません。
            お問い合わせ等でご提供いただいた情報は、返信目的のみに使用します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Cookieの使用について</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            本サイトでは、アクセス解析のためにGoogle Analyticsを使用しています。
            Google AnalyticsはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
            収集されるデータはGoogleのプライバシーポリシーに基づいて管理されます。
            ブラウザの設定によりCookieを無効にすることができます。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">広告について</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            本サイトはGoogle AdSenseを利用した広告を掲載する場合があります。
            Google AdSenseはCookieを使用してユーザーの興味に合わせた広告を表示します。
            詳細はGoogleの広告に関するポリシーをご参照ください。
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            また、本サイトはアフィリエイトプログラム（A8.net等）に参加しており、
            紹介リンクを通じて商品・サービスが購入された場合に報酬を受け取ることがあります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">外部リンクについて</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            本サイトには外部サイトへのリンクが含まれています。
            リンク先のサイトにおける個人情報の取り扱いについては、各サイトのプライバシーポリシーをご確認ください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">免責事項</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            本サイトの情報は可能な限り正確を期していますが、内容の正確性・完全性を保証するものではありません。
            本サイトの情報を利用したことによる損害について、運営者は一切の責任を負いません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">プライバシーポリシーの変更</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            本ポリシーは必要に応じて改訂することがあります。
            変更後のポリシーは本ページに掲載した時点で効力を生じます。
          </p>
        </section>

        <p className="text-xs text-gray-400">制定日：2026年3月22日</p>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-3xl mx-auto px-4 py-6 flex gap-6 text-sm text-gray-500">
          <Link href="/about" className="hover:text-gray-700">このサイトについて</Link>
          <Link href="/privacy" className="hover:text-gray-700">プライバシーポリシー</Link>
        </div>
      </footer>
    </div>
  );
}
