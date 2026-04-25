# vsページ pSEO 設計書

## 決定事項

### URL構造
```
/compare/[slug-a]-vs-[slug-b]
例: /compare/cursor-vs-windsurf
```

### 結論セクションの生成方法
**ルールベース自動生成**（コードでデータから文章を組み立てる）
- 料金・日本語スコア・API有無・無料プランなどを比較して文章化
- 全ページ自動で完結、データが正確なので嘘をつかない

---

## 見出し構造（H1〜H3）

```
H1: [ツールA] vs [ツールB]：どちらがおすすめ？【2026年最新】

  H2: 結論・総合比較（最初に答えを出す）
  H2: 料金プラン比較
  H2: 機能・スペック比較
    H3: [ツールA]の特徴
    H3: [ツールB]の特徴
  H2: メリット・デメリット比較
    H3: [ツールA]のメリット・デメリット
    H3: [ツールB]のメリット・デメリット
  H2: こんな人には[ツールA]がおすすめ
  H2: こんな人には[ツールB]がおすすめ
  H2: よくある質問
  H2: 関連比較ページ
```

---

## 比較表の項目（データから自動生成）

| 項目 | ツールA | ツールB |
|---|---|---|
| 無料プラン | hasFree | hasFree |
| 最安料金 | plans[] | plans[] |
| 日本語対応 | japaneseScore ★ | japaneseScore ★ |
| API提供 | hasAPI | hasAPI |
| 対象ユーザー | targetUser | targetUser |
| カテゴリ | categories | categories |

---

## 内部リンク設計

- vsページ → 両ツールの個別ページ（`/tools/[slug]`）
- vsページ → 関連vsページ（同カテゴリの他の組み合わせ）
- ツール個別ページ → そのツールが関わるvsページ一覧
- `/compare` 一覧ページ → 全vsページへのリンク起点

---

## CTA設計

### 上部CTA（横並び2つ）
```
[ツールA]を試す →        [ツールB]を試す →
（affiliateUrl）          （affiliateUrl）
```

### 下部CTA
```
他のAIツールを比較する →（/compare 一覧ページへ）
```

---

## Tier 1ターゲット（最優先15ページ）

| 組み合わせ | 狙い目の理由 |
|---|---|
| cursor vs windsurf | コーディングAI2強・日本語競合は開発者ブログ止まり |
| cursor vs replit-ai | 同カテゴリ・専用ページが少ない |
| bolt vs lovable | AIアプリビルダー・日本語vsページがほぼない |
| bolt vs v0 | 同上 |
| lovable vs v0 | 同上 |
| make vs n8n | 日本語記事が英語に比べて圧倒的に少ない |
| suno vs udio | 音楽生成AI・日本語競合ほぼなし |
| gamma vs tome | プレゼンAI・専用比較ページが少ない |
| notta vs otter-ai | Clova Note消滅で比較需要が移行中 |
| midjourney vs stable-diffusion | 画像生成2強・まだ入り込める |

## Tier 2（Tier 1確認後に拡張）

- cursor vs github-copilot
- windsurf vs replit-ai
- elevenlabs vs murf-ai
- runway vs luma-ai
- catchy vs sakubun（日本語ライティングAI特化）
- make vs zapier-ai
- n8n vs zapier-ai

## 外したもの（理由）

- chatgpt vs claude → 大手メディアが支配、新サイトでは無理
- chatgpt vs gemini → 同上
- claude vs gemini → 同上
- notta vs clova-note → Clova Note 2025年7月末サービス終了済み

---

## 実装タスク

1. `/app/compare/[slug-a]-vs-[slug-b]/page.tsx` 作成
2. `/app/compare/page.tsx`（一覧ページ）作成
3. ツール個別ページ（`/tools/[slug]/page.tsx`）にvsページへのリンク追加
4. sitemap.xmlにvsページを追加
