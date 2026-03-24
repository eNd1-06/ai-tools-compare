export type RecommendType = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  tools: string[];
  reasons: { slug: string; reason: string }[];
  tips: string[];
};

export const recommendTypes: RecommendType[] = [
  {
    slug: "writer",
    name: "ライター・ブロガー",
    description: "ブログ記事・コピー・SNS投稿など文章を書く人向けのAIツールを厳選しました。",
    icon: "✍️",
    tools: ["chatgpt", "claude", "catchy", "transcope", "sakubun", "grammarly"],
    reasons: [
      { slug: "chatgpt", reason: "汎用性が高く、記事執筆・アイデア出し・リライトに幅広く使える" },
      { slug: "claude", reason: "長文処理が得意で、品質の高い日本語文章を生成できる" },
      { slug: "catchy", reason: "キャッチコピー・広告文の生成に特化した日本語ツール" },
      { slug: "transcope", reason: "SEO記事の自動生成に強い日本語特化ライティングツール" },
      { slug: "sakubun", reason: "ブログ・SNS投稿など日本語コンテンツ生成に便利" },
      { slug: "grammarly", reason: "英語ライティングの文法・スタイル改善に最適" },
    ],
    tips: [
      "まずChatGPTかClaudeで試して、物足りなければ日本語特化ツールへ移行するのがコスパ最良",
      "SEO記事を大量生成するならTranscopeかCatchyが効率的",
      "英語コンテンツも書く場合はGrammarlyを組み合わせるとクオリティが上がる",
    ],
  },
  {
    slug: "engineer",
    name: "エンジニア・開発者",
    description: "コード補完・バグ修正・コードレビューなど開発作業を効率化するAIツールを紹介します。",
    icon: "💻",
    tools: ["github-copilot", "cursor", "windsurf", "replit-ai", "devin", "chatgpt"],
    reasons: [
      { slug: "github-copilot", reason: "VS Code・GitHub連携が便利でコスパが高い。最初の1本におすすめ" },
      { slug: "cursor", reason: "コードベース全体を理解したAI補完が強力。本格的な開発向け" },
      { slug: "windsurf", reason: "無料プランが充実。コスト重視エンジニアに向いている" },
      { slug: "replit-ai", reason: "ブラウザでコーディング・実行できる。環境構築不要で手軽" },
      { slug: "devin", reason: "自律的にタスクを実行するAIエンジニア。複雑なタスクの自動化向け" },
      { slug: "chatgpt", reason: "コードの説明・デバッグ・設計相談など汎用的に使える" },
    ],
    tips: [
      "エディタに導入するならGitHub CopilotかCursorから始めるのがおすすめ",
      "Replit AIはブラウザだけで動くので、サブPCや外出先での開発に便利",
      "Devinはコスト高めだが、繰り返し発生する定型タスクの自動化には大きな効果がある",
    ],
  },
  {
    slug: "creator",
    name: "クリエイター・デザイナー",
    description: "画像・動画・音声生成など、クリエイティブ制作を支援するAIツールを紹介します。",
    icon: "🎨",
    tools: ["midjourney", "dall-e", "stable-diffusion", "ideogram", "leonardo-ai", "sora", "luma-ai", "synthesia"],
    reasons: [
      { slug: "midjourney", reason: "アート・イラストの品質が業界最高水準。プロクリエイター向け" },
      { slug: "dall-e", reason: "ChatGPT経由で手軽に使える。日本語プロンプトに対応" },
      { slug: "stable-diffusion", reason: "オープンソースで自由度が高い。カスタムモデルで独自スタイルを実現" },
      { slug: "ideogram", reason: "テキスト入り画像の生成が得意。バナー・サムネイル制作に便利" },
      { slug: "leonardo-ai", reason: "ゲーム・アニメ系のビジュアル生成に強い" },
      { slug: "sora", reason: "OpenAIの動画生成AI。高品質な動画コンテンツを生成できる" },
    ],
    tips: [
      "静止画はMidjourneyが品質トップだが、手軽さならDALL-E 3がおすすめ",
      "商用利用する場合は各ツールの利用規約を必ず確認すること",
      "Stable Diffusionは学習コストがあるが、一度使いこなせると最もコスパが高い",
    ],
  },
  {
    slug: "business",
    name: "ビジネス・マーケター",
    description: "会議の文字起こし・プレゼン作成・マーケティング自動化など、ビジネス業務を効率化するAIツールを紹介します。",
    icon: "💼",
    tools: ["chatgpt", "claude", "notta", "fireflies-ai", "gamma", "tome", "catchy"],
    reasons: [
      { slug: "chatgpt", reason: "メール・報告書・企画書の作成に幅広く活用できる" },
      { slug: "claude", reason: "長文の契約書・レポート要約に強い。安全性への配慮も高い" },
      { slug: "notta", reason: "会議・インタビューの文字起こしが高精度。日本語対応も優秀" },
      { slug: "fireflies-ai", reason: "Zoom・Teams会議を自動録音・要約。議事録作成が不要になる" },
      { slug: "gamma", reason: "テキストを入力するだけでプレゼン資料を自動生成できる" },
      { slug: "tome", reason: "AIが資料構成から作成まで担当するプレゼン特化ツール" },
    ],
    tips: [
      "会議の多い職種はNottaかFireflies AIで議事録作成を自動化すると大幅に時間節約できる",
      "プレゼン作成はGammaかTomeで叩き台を作り、細かい調整は手作業するのが効率的",
      "ChatGPTはMicrosoft 365 Copilotと連携すると既存ツールとの統合がスムーズ",
    ],
  },
];
