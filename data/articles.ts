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
  {
    slug: "ai-transcription-tools-comparison",
    title: "AI文字起こしツール比較【2026年】Notta・Otter・CloveNote・Firefliesを徹底比較",
    description: "会議・インタビュー・授業の文字起こしに使えるAIツールを日本語精度・料金・機能で比較します。",
    date: "2026-03-21",
    tools: ["notta", "otter-ai", "clova-note", "fireflies-ai"],
    sections: [
      {
        heading: "AI文字起こしツールとは",
        body: "AI文字起こしツールは音声・動画データをテキストに自動変換するサービスです。会議の議事録作成、インタビュー記録、講義ノートなどに活用されています。",
      },
      {
        heading: "Notta",
        body: "日本語対応が最も充実したツールの一つ。リアルタイム文字起こしと翻訳機能を備え、Zoom・Teamsとも連携可能。無料プランは月120分まで利用できます。",
      },
      {
        heading: "Otter AI",
        body: "英語に特化した高精度ツール。Zoom・Google Meet・Microsoft Teamsと連携でき、会議の自動録音・要約が便利。英語がメインの方に向いています。",
      },
      {
        heading: "CLOVA Note",
        body: "NVERが提供する日本語特化の文字起こしサービス。日本語の精度が高く、無料で使える点が魅力です。",
      },
      {
        heading: "Fireflies AI",
        body: "会議の自動録音・文字起こし・要約をすべて自動化できるツール。主要オンライン会議ツールとの連携が充実しており、議事録作成の手間をゼロにできます。",
      },
      {
        heading: "選び方まとめ",
        body: "日本語会議の文字起こしにはNottaかCLOVA Note、英語会議ならOtter AI、議事録の完全自動化を求めるならFireflies AIがおすすめです。",
      },
    ],
  },
  {
    slug: "ai-presentation-tools-comparison",
    title: "AIプレゼン作成ツール比較【2026年】GammaとTomeどちらが使いやすい？",
    description: "テキストを入力するだけでスライドを自動生成するAIツールGammaとTomeを徹底比較します。",
    date: "2026-03-22",
    tools: ["gamma", "tome", "chatgpt"],
    sections: [
      {
        heading: "AIプレゼン作成ツールの登場",
        body: "従来のパワーポイント作成に数時間かかっていた作業が、AIツールを使えば数分で完了するようになりました。テーマを入力するだけでスライド構成・デザイン・テキストをすべて自動生成できます。",
      },
      {
        heading: "Gamma",
        body: "最も人気の高いAIプレゼンツール。日本語にも対応しており、テキスト入力だけで美しいスライドを生成できます。無料プランは400クレジット付き。デザインのクオリティが高く、ビジネス利用にも向いています。",
      },
      {
        heading: "Tome",
        body: "ストーリーテリング型のプレゼン作成に強いツール。AIが構成から内容まで提案してくれます。英語メインですが日本語も使用可能です。",
      },
      {
        heading: "ChatGPTとの組み合わせ",
        body: "ChatGPTでスライドの構成・内容テキストを生成し、GammaやTomeに貼り付けてデザイン化する方法も効果的です。コンテンツの質を高めたい場合に有効です。",
      },
      {
        heading: "まとめ",
        body: "日本語プレゼンならGammaが最もおすすめ。英語プレゼンやストーリー型の資料を作りたい場合はTomeも検討してみてください。",
      },
    ],
  },
  {
    slug: "ai-tools-for-beginners",
    title: "AIツール初心者ガイド【2026年】まず最初に使うべきAIツール5選",
    description: "AIツールをこれから始めたい方に向けて、最初に試すべきツールをわかりやすく解説します。",
    date: "2026-03-23",
    tools: ["chatgpt", "gemini", "bing-image-creator", "notta", "gamma"],
    sections: [
      {
        heading: "AIツールを始める前に",
        body: "AIツールは難しいと思われがちですが、多くのサービスは無料で始められ、専門知識も不要です。まずは気軽に試してみることが大切です。",
      },
      {
        heading: "1. ChatGPT - テキスト生成の入門",
        body: "AIといえばまずChatGPT。文章作成・翻訳・要約・質問回答など何でもできます。無料プランから始められるので、AIツールの第一歩として最適です。",
      },
      {
        heading: "2. Gemini - GoogleアカウントですぐStart",
        body: "Googleアカウントがあれば即利用可能。Gmail・Google ドキュメントとの連携が便利で、すでにGoogleを使っている方には特におすすめです。",
      },
      {
        heading: "3. Bing Image Creator - 無料で画像生成",
        body: "Microsoftアカウントで無料利用できる画像生成AI。DALL-E 3を使っており、日本語プロンプトにも対応。画像生成AIの入門に最適です。",
      },
      {
        heading: "4. Notta - 会議の文字起こし",
        body: "会議や音声を自動でテキスト化。無料プランは月120分まで利用可能で、議事録作成の時間を大幅に削減できます。",
      },
      {
        heading: "5. Gamma - プレゼン自動生成",
        body: "テーマを入力するだけでプレゼン資料が完成。デザインや構成を考える手間が省けます。無料プランでも十分試せます。",
      },
    ],
  },
  {
    slug: "ai-video-generation-comparison",
    title: "AI動画生成ツール比較【2026年】Sora・Luma AI・Synthesiaを比較",
    description: "テキストや画像から動画を生成できるAIツールを比較。料金・品質・用途別の使い分けを解説します。",
    date: "2026-03-24",
    tools: ["sora", "luma-ai", "synthesia"],
    sections: [
      {
        heading: "AI動画生成の現状",
        body: "2025〜2026年はAI動画生成の品質が急速に向上し、実用レベルになってきました。テキストを入力するだけで数秒〜数分の動画を自動生成できます。",
      },
      {
        heading: "Sora（OpenAI）",
        body: "OpenAIが開発した動画生成AI。高品質でリアルな映像を生成できます。ChatGPT Plusユーザーから順次提供されており、クリエイティブ用途での活用が進んでいます。",
      },
      {
        heading: "Luma AI",
        body: "テキストや画像から動画を生成できるツール。Dream Machineという機能でリアルな動画を生成可能。無料プランあり。",
      },
      {
        heading: "Synthesia",
        body: "AIアバターが話す「解説動画」の自動生成に特化。マーケティング動画・研修動画の制作コストを大幅に削減できます。法人利用に向いています。",
      },
      {
        heading: "用途別の選び方",
        body: "クリエイティブな映像表現にはSoraかLuma AI、ビジネス解説動画にはSynthesiaがおすすめです。いずれも急速に進化しているので、無料プランで試してから判断するのがベストです。",
      },
    ],
  },
  {
    slug: "ai-tools-cost-comparison",
    title: "AIツールの料金徹底比較【2026年】月額費用を抑えて使う方法",
    description: "主要AIツールの料金を一覧比較。無料プランの活用法と、コストを抑えながら効果的にAIを使う方法を解説します。",
    date: "2026-03-24",
    tools: ["chatgpt", "claude", "gemini", "midjourney", "github-copilot"],
    sections: [
      {
        heading: "AIツールの料金体系",
        body: "AIツールの料金体系は「完全無料」「フリーミアム（無料＋有料）」「有料のみ」の3種類に大別されます。多くのサービスは無料プランを提供しており、まず無料で試せます。",
      },
      {
        heading: "主要ツールの料金一覧",
        body: "ChatGPT Plus: $20/月、Claude Pro: $20/月、Gemini Advanced: $19.99/月、Midjourney: $10/月〜、GitHub Copilot: $10/月。いずれも無料プランがあります（Midjourneyを除く）。",
      },
      {
        heading: "無料プランでできること",
        body: "ChatGPT無料版はGPT-3.5相当の機能を無制限で利用可能（GPT-4は制限あり）。Claudeは無料プランで一定量のメッセージを送れます。Geminiは基本機能が無料。日常的な用途なら無料プランで十分なケースも多いです。",
      },
      {
        heading: "コストを抑えるコツ",
        body: "①複数ツールを使い分けて1つに課金しない ②無料プランの上限に達したら別ツールに切り替える ③年払いプランで月額を下げる ④APIを直接使うと従量課金で安く済む場合がある。",
      },
      {
        heading: "まとめ",
        body: "まず全ツールの無料プランを試し、最も使うツール1〜2本に絞って課金するのがコスパ最良です。ChatGPT PlusかClaude Proのどちらかを契約するだけで、日常のAI作業の大半は対応できます。",
      },
    ],
  },
];
