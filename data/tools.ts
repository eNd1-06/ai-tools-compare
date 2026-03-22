export type Category =
  | "text"
  | "image"
  | "video"
  | "voice"
  | "coding"
  | "automation"
  | "other";

export type PricingPlan = {
  name: string;
  price: number | null; // null = 要問い合わせ
  currency: "JPY" | "USD";
  billingCycle: "monthly" | "yearly" | "one-time";
};

export type AITool = {
  slug: string;
  name: string;
  description: string;
  categories: Category[];
  hasFree: boolean;
  freeLimit: string | null; // 無料プランの制限説明
  plans: PricingPlan[];
  japaneseSupport: boolean;
  hasAPI: boolean;
  targetUser: ("personal" | "business")[];
  url: string;
  logoUrl: string | null;
  tags: string[]; // 検索・フィルタ用
};

export const categories: { slug: Category; name: string }[] = [
  { slug: "text", name: "テキスト生成" },
  { slug: "image", name: "画像生成" },
  { slug: "video", name: "動画生成" },
  { slug: "voice", name: "音声生成" },
  { slug: "coding", name: "コーディング" },
  { slug: "automation", name: "自動化・ワークフロー" },
  { slug: "other", name: "その他" },
];

export const tools: AITool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    description: "OpenAIが開発した世界最大規模のAIチャットツール。文章生成・要約・翻訳・プログラミング支援など幅広い用途に対応。",
    categories: ["text", "coding"],
    hasFree: true,
    freeLimit: "GPT-4oへのアクセス制限あり、メッセージ数制限あり",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Plus", price: 20, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 200, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://chat.openai.com",
    logoUrl: null,
    tags: ["OpenAI", "GPT-4", "チャット", "文章生成", "コーディング"],
  },
  {
    slug: "claude",
    name: "Claude",
    description: "Anthropicが開発したAIアシスタント。長文の読み込みや分析、安全性の高さが特徴。",
    categories: ["text", "coding"],
    hasFree: true,
    freeLimit: "メッセージ数制限あり、Claude 3.5 Sonnetまで",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 20, currency: "USD", billingCycle: "monthly" },
      { name: "Max", price: 100, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://claude.ai",
    logoUrl: null,
    tags: ["Anthropic", "チャット", "文章生成", "長文", "安全性"],
  },
  {
    slug: "gemini",
    name: "Gemini",
    description: "Googleが開発したAIアシスタント。Google検索・GmailなどGoogleサービスとの連携が強み。",
    categories: ["text", "image", "coding"],
    hasFree: true,
    freeLimit: "Gemini 1.5 Flashまで",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Advanced", price: 19.99, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://gemini.google.com",
    logoUrl: null,
    tags: ["Google", "チャット", "文章生成", "Google連携"],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    description: "リアルタイム検索と回答生成を組み合わせたAI検索エンジン。出典を明示しながら最新情報を提供。",
    categories: ["text"],
    hasFree: true,
    freeLimit: "Pro検索の回数制限あり",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 20, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://www.perplexity.ai",
    logoUrl: null,
    tags: ["検索", "リサーチ", "最新情報", "出典"],
  },
  {
    slug: "copilot",
    name: "Microsoft Copilot",
    description: "MicrosoftのAIアシスタント。Word・Excel・TeamsなどMicrosoft 365との深い統合が特徴。",
    categories: ["text", "coding"],
    hasFree: true,
    freeLimit: "基本機能のみ",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 20, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: false,
    targetUser: ["personal", "business"],
    url: "https://copilot.microsoft.com",
    logoUrl: null,
    tags: ["Microsoft", "Office", "Word", "Excel", "Teams"],
  },
  {
    slug: "grok",
    name: "Grok",
    description: "xAIが開発したAIアシスタント。X（Twitter）のリアルタイムデータへのアクセスが特徴。",
    categories: ["text"],
    hasFree: true,
    freeLimit: "メッセージ数制限あり",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "X Premium+", price: 16, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["personal"],
    url: "https://grok.x.ai",
    logoUrl: null,
    tags: ["xAI", "X", "Twitter", "リアルタイム"],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    description: "高品質な画像生成AIの代名詞。アート・イラスト・デザインなど幅広いスタイルの画像を生成できる。",
    categories: ["image"],
    hasFree: false,
    freeLimit: null,
    plans: [
      { name: "Basic", price: 10, currency: "USD", billingCycle: "monthly" },
      { name: "Standard", price: 30, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 60, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: false,
    hasAPI: false,
    targetUser: ["personal", "business"],
    url: "https://www.midjourney.com",
    logoUrl: null,
    tags: ["画像生成", "アート", "イラスト", "デザイン", "Discord"],
  },
  {
    slug: "stable-diffusion",
    name: "Stable Diffusion",
    description: "オープンソースの画像生成AI。ローカルで動かせるため無料で無制限に使用可能。カスタマイズ性が高い。",
    categories: ["image"],
    hasFree: true,
    freeLimit: "ローカル実行は完全無料・無制限",
    plans: [
      { name: "無料（ローカル）", price: 0, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: false,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://stability.ai",
    logoUrl: null,
    tags: ["画像生成", "オープンソース", "ローカル", "無料", "カスタマイズ"],
  },
  {
    slug: "runway",
    name: "Runway",
    description: "動画生成・編集AIのリーダー。テキストや画像から高品質な動画を生成できる。クリエイター向け。",
    categories: ["video", "image"],
    hasFree: true,
    freeLimit: "125クレジット（消費後は有料）",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Standard", price: 15, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 35, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: false,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://runwayml.com",
    logoUrl: null,
    tags: ["動画生成", "動画編集", "クリエイター", "映像制作"],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    description: "高品質な音声合成・クローニングAI。自然なナレーション・キャラクターボイス・多言語対応が強み。",
    categories: ["voice"],
    hasFree: true,
    freeLimit: "月10,000文字まで",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Starter", price: 5, currency: "USD", billingCycle: "monthly" },
      { name: "Creator", price: 22, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://elevenlabs.io",
    logoUrl: null,
    tags: ["音声合成", "ナレーション", "ボイスクローン", "多言語"],
  },
  {
    slug: "cursor",
    name: "Cursor",
    description: "AIを中心に設計されたコードエディタ。コードの補完・生成・デバッグをAIがサポート。VS Codeベース。",
    categories: ["coding"],
    hasFree: true,
    freeLimit: "2週間のProトライアル後、基本機能のみ",
    plans: [
      { name: "Hobby", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 20, currency: "USD", billingCycle: "monthly" },
      { name: "Business", price: 40, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: false,
    targetUser: ["personal", "business"],
    url: "https://cursor.sh",
    logoUrl: null,
    tags: ["コーディング", "エディタ", "IDE", "開発", "VS Code"],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    description: "GitHubとOpenAIが共同開発したAIコーディングアシスタント。VS Code等の主要IDEに対応。",
    categories: ["coding"],
    hasFree: true,
    freeLimit: "月2,000回のコード補完、50回のチャットまで",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 10, currency: "USD", billingCycle: "monthly" },
      { name: "Business", price: 19, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: false,
    targetUser: ["personal", "business"],
    url: "https://github.com/features/copilot",
    logoUrl: null,
    tags: ["コーディング", "GitHub", "補完", "VS Code", "開発"],
  },
  {
    slug: "dify",
    name: "Dify",
    description: "AIアプリ・ワークフローを簡単に構築できるプラットフォーム。ノーコード/ローコードでAIを活用できる。",
    categories: ["automation"],
    hasFree: true,
    freeLimit: "200メッセージ/日",
    plans: [
      { name: "Sandbox", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Professional", price: 59, currency: "USD", billingCycle: "monthly" },
      { name: "Team", price: 159, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://dify.ai",
    logoUrl: null,
    tags: ["ワークフロー", "ノーコード", "自動化", "AIアプリ開発"],
  },
  {
    slug: "make",
    name: "Make（旧Integromat）",
    description: "AIを含む1000以上のアプリを繋げる自動化プラットフォーム。視覚的なフローでワークフローを構築。",
    categories: ["automation"],
    hasFree: true,
    freeLimit: "月1,000オペレーション",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Core", price: 9, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 16, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: false,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://www.make.com",
    logoUrl: null,
    tags: ["自動化", "ワークフロー", "連携", "ノーコード", "Zapier代替"],
  },
  {
    slug: "jasper",
    name: "Jasper",
    description: "マーケティング・ビジネス向けに特化したAIライティングツール。ブログ・広告・SNS投稿の生成に強い。",
    categories: ["text"],
    hasFree: false,
    freeLimit: null,
    plans: [
      { name: "Creator", price: 49, currency: "USD", billingCycle: "monthly" },
      { name: "Pro", price: 69, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["business"],
    url: "https://www.jasper.ai",
    logoUrl: null,
    tags: ["ライティング", "マーケティング", "コピーライティング", "ブログ", "広告"],
  },
  {
    slug: "heygen",
    name: "HeyGen",
    description: "AIアバターを使った動画生成ツール。テキストを入力するだけでリアルなアバターが動画を作成。",
    categories: ["video", "voice"],
    hasFree: true,
    freeLimit: "月1クレジット（動画1分相当）",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Creator", price: 29, currency: "USD", billingCycle: "monthly" },
      { name: "Business", price: 89, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://www.heygen.com",
    logoUrl: null,
    tags: ["動画生成", "アバター", "プレゼン", "多言語", "翻訳動画"],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    description: "NotionにビルトインされたAI機能。文章の要約・翻訳・改善・Q&Aをドキュメント内で直接実行できる。",
    categories: ["text", "automation"],
    hasFree: false,
    freeLimit: null,
    plans: [
      { name: "AI アドオン", price: 10, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: false,
    targetUser: ["personal", "business"],
    url: "https://www.notion.so/product/ai",
    logoUrl: null,
    tags: ["Notion", "ドキュメント", "要約", "翻訳", "ライティング"],
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    description: "セールスやマーケティングのコピーに特化したAIライティングツール。GTM（市場投入）ワークフローに強い。",
    categories: ["text"],
    hasFree: true,
    freeLimit: "月2,000ワードまで",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Starter", price: 36, currency: "USD", billingCycle: "monthly" },
      { name: "Advanced", price: 186, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: true,
    hasAPI: true,
    targetUser: ["business"],
    url: "https://www.copy.ai",
    logoUrl: null,
    tags: ["コピーライティング", "セールス", "マーケティング", "メール"],
  },
  {
    slug: "zapier-ai",
    name: "Zapier",
    description: "7,000以上のアプリを繋げる自動化プラットフォーム。AIを組み込んだワークフロー（Zap）を簡単に構築。",
    categories: ["automation"],
    hasFree: true,
    freeLimit: "月100タスク、5つのZapまで",
    plans: [
      { name: "Free", price: 0, currency: "USD", billingCycle: "monthly" },
      { name: "Starter", price: 19.99, currency: "USD", billingCycle: "monthly" },
      { name: "Professional", price: 49, currency: "USD", billingCycle: "monthly" },
    ],
    japaneseSupport: false,
    hasAPI: true,
    targetUser: ["personal", "business"],
    url: "https://zapier.com",
    logoUrl: null,
    tags: ["自動化", "ワークフロー", "連携", "ノーコード"],
  },
];

export function getToolBySlug(slug: string): AITool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: Category): AITool[] {
  return tools.filter((t) => t.categories.includes(category));
}
