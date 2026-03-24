export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tools: string[];
  sections: { heading: string; body: string }[];
};

export const articles: Article[] = [
  {
    slug: "chatgpt-vs-claude-vs-gemini",
    title: "ChatGPT vs Claude vs Gemini 徹底比較【2026年】料金・日本語・使い勝手",
    description: "3大AIチャットツールを料金・日本語対応・得意分野で徹底比較。どれを選ぶべきかわかります。",
    date: "2026-03-01",
    tools: ["chatgpt", "claude", "gemini"],
    sections: [
      {
        heading: "3つのAIチャットツールの概要",
        body: "ChatGPT（OpenAI）、Claude（Anthropic）、Gemini（Google）は現在最も利用されているAIチャットツールです。それぞれ異なる強みを持っており、用途によって最適な選択肢が変わります。",
      },
      {
        heading: "料金比較",
        body: "3つのサービスはいずれも無料プランを提供しています。有料プランはChatGPT Plusが$20/月、Claude Proが$20/月、Gemini Advancedが$19.99/月（Google One AI プレミアム）とほぼ同価格帯です。",
      },
      {
        heading: "日本語対応の比較",
        body: "日本語の品質はどれも高水準ですが、Claude・Geminiは特に自然な日本語出力が評価されています。ChatGPTはプラグインや機能の豊富さが強みで、Gemini はGoogle検索との連携が便利です。",
      },
      {
        heading: "得意分野の違い",
        body: "ChatGPTはコード生成・プラグイン連携が得意。Claudeは長文処理・文章要約・安全性重視の用途に強い。GeminiはGoogle WorkspaceやYouTube連携など、Googleサービスとの統合が強みです。",
      },
      {
        heading: "結論：どれを選ぶべき？",
        body: "汎用的に使いたい方はChatGPT、長文や文章品質重視ならClaude、Googleユーザーや検索連携が必要ならGeminiがおすすめです。無料プランからそれぞれ試してみるのが最善です。",
      },
    ],
  },
  {
    slug: "free-ai-tools-2026",
    title: "無料で使えるAIツール15選【2026年最新】テキスト・画像・コーディング",
    description: "完全無料または無料プランで使えるAIツールをカテゴリ別に紹介。コスト0円でAIを活用する方法をまとめました。",
    date: "2026-03-05",
    tools: ["chatgpt", "claude", "gemini", "bing-image-creator", "replit-ai"],
    sections: [
      {
        heading: "無料AIツールの選び方",
        body: "無料プランにはメッセージ数・生成枚数・機能制限があることがほとんどです。用途に合わせて複数のツールを使い分けることで、コストをかけずにAIを活用できます。",
      },
      {
        heading: "無料テキスト生成AIツール",
        body: "ChatGPT（GPT-3.5相当）、Claude（制限あり）、Gemini（基本無料）は文章生成・要約・翻訳に使えます。Copilot（Microsoft）も無料で利用可能です。",
      },
      {
        heading: "無料画像生成AIツール",
        body: "Bing Image Creator（DALL-E 3を無料で利用可能）、Adobe Firefly（無料クレジットあり）、Ideogram（無料プランあり）が代表的です。",
      },
      {
        heading: "無料コーディングAIツール",
        body: "Replit AI（無料プランあり）、GitHub Copilot（学生無料）、Cursor（無料枠あり）などが利用できます。まずはReplit AIかGitHub Copilotから試すのがおすすめです。",
      },
      {
        heading: "まとめ",
        body: "テキスト生成にはChatGPTかGemini、画像生成にはBing Image Creator、コーディングにはReplit AIをまず試してみてください。いずれも無料で始められます。",
      },
    ],
  },
  {
    slug: "ai-writing-tools-comparison",
    title: "AIライティングツール比較【2026年】ブログ・コピー・SEO記事に最適なのは？",
    description: "ライター・ブロガー向けのAIライティングツールを比較。日本語品質・料金・機能の違いを解説します。",
    date: "2026-03-10",
    tools: ["chatgpt", "claude", "catchy", "transcope", "sakubun"],
    sections: [
      {
        heading: "AIライティングツールの種類",
        body: "AIライティングツールは大きく「汎用AIチャット（ChatGPT・Claudeなど）」と「ライティング特化ツール（Catchy・Transcope・作文くんなど）」に分かれます。",
      },
      {
        heading: "日本語特化ツールの強み",
        body: "Catchy・Transcope・作文くんは日本語SEOに特化しており、キャッチコピーやブログ記事の構成を自動生成する機能があります。日本語コンテンツを大量生成したい場合に適しています。",
      },
      {
        heading: "汎用AIの使い方",
        body: "ChatGPTやClaudeは指示（プロンプト）次第でライティング特化ツールと同等以上のアウトプットが可能です。柔軟性が高く、記事執筆・添削・リライトなど幅広い用途に対応できます。",
      },
      {
        heading: "料金の比較",
        body: "ChatGPT・Claudeは$20/月前後。Catchy・Transcopeは月額3,000〜10,000円程度の日本円プランが多く、日本のユーザーにとって分かりやすい料金体系です。",
      },
      {
        heading: "おすすめの選び方",
        body: "まずChatGPTかClaudeを試して限界を感じたら日本語特化ツールへ移行するのがコスパ最良です。SEO記事を大量生成したい場合はTranscopeかCatchyが向いています。",
      },
    ],
  },
  {
    slug: "ai-coding-tools-comparison",
    title: "AIコーディングツール比較【2026年】GitHub Copilot・Cursor・Devinどれが最強？",
    description: "エンジニア向けAIコーディングツールを機能・料金・使い勝手で比較。初心者からプロまで最適な選択肢を紹介します。",
    date: "2026-03-15",
    tools: ["github-copilot", "cursor", "windsurf", "replit-ai", "devin"],
    sections: [
      {
        heading: "AIコーディングツールの現在",
        body: "2026年現在、AIコーディングツールはエンジニアの作業効率を大きく変えています。コード補完から自律的なタスク実行まで、ツールの能力に大きな差があります。",
      },
      {
        heading: "GitHub Copilot",
        body: "GitHubとVS Codeに統合されており、既存のワークフローにすぐ導入できます。月$10から使えるコスパの良さが魅力。個人開発者から企業まで最も広く使われています。",
      },
      {
        heading: "Cursor",
        body: "VS Codeベースのエディタに強力なAI機能を統合。コードベース全体を理解した上での補完・リファクタリングが得意です。チャット機能でコードについて質問できる点も便利です。",
      },
      {
        heading: "Windsurf",
        body: "Codeiumが開発するAIエディタ。無料プランが充実しており、コスト重視のエンジニアに向いています。",
      },
      {
        heading: "Devin（自律型AI）",
        body: "自律的にタスクを実行する「AIソフトウェアエンジニア」。単純な補完ではなく、要件を渡すと自分でコードを書き・テストし・デプロイまで行います。料金は高めですが能力は段違いです。",
      },
      {
        heading: "選び方まとめ",
        body: "コスパ重視ならGitHub Copilot、エディタ体験を重視するならCursor、無料で使いたいならWindsurf、複雑なタスクを自動化したいならDevinがおすすめです。",
      },
    ],
  },
  {
    slug: "ai-image-generation-comparison",
    title: "AI画像生成ツール比較【2026年】Midjourney・DALL-E・Stable Diffusion・Ideogram",
    description: "主要AI画像生成ツールを品質・料金・日本語対応で比較。クリエイター・デザイナー向けの選び方ガイドです。",
    date: "2026-03-20",
    tools: ["midjourney", "dall-e", "stable-diffusion", "ideogram", "leonardo-ai"],
    sections: [
      {
        heading: "AI画像生成ツールの選び方",
        body: "AI画像生成ツールは「生成品質」「プロンプトの書きやすさ」「料金」「利用規約（商用利用可否）」で選ぶのが基本です。",
      },
      {
        heading: "Midjourney",
        body: "クオリティの高さで業界トップ評価。アート・イラスト・コンセプトアートに特に強い。Discord経由での利用が必要で、無料プランなし（$10/月〜）。",
      },
      {
        heading: "DALL-E 3（ChatGPT経由）",
        body: "OpenAIが開発。ChatGPT Plus経由で使える手軽さが魅力。日本語プロンプトにも対応しており、指示通りの画像生成が得意です。",
      },
      {
        heading: "Stable Diffusion",
        body: "オープンソースで自分のPCでも動作可能。カスタマイズ性が高く、特定スタイルのモデルを追加できます。技術的な知識が必要ですが、最もコスパが高いです。",
      },
      {
        heading: "Ideogram",
        body: "テキスト入りの画像生成が得意で、バナーやサムネイル制作に便利。無料プランあり。",
      },
      {
        heading: "まとめ",
        body: "最高品質を求めるならMidjourney、手軽さならDALL-E 3、コスパ・カスタマイズ性ならStable Diffusion、テキスト入り画像ならIdeogramがおすすめです。",
      },
    ],
  },
];
