import { ImageResponse } from "next/og";
import { getToolBySlug, tools } from "@/data/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return new ImageResponse(
      <div style={{ width: 1200, height: 630, background: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "white", fontSize: 48, fontWeight: "bold" }}>AIツール比較サイト</span>
      </div>,
      { width: 1200, height: 630 }
    );
  }

  const price = (() => {
    const minPaid = tool.plans.filter((p) => p.price !== null && p.price > 0).sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
    if (tool.hasFree && !minPaid) return "無料";
    if (!minPaid) return "要問い合わせ";
    return `${minPaid.currency === "JPY" ? "¥" : "$"}${minPaid.price?.toLocaleString()}/月〜`;
  })();

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%)",
        display: "flex",
        flexDirection: "column",
        padding: "60px 80px",
        fontFamily: "sans-serif",
      }}
    >
      {/* サイト名 */}
      <div style={{ color: "#93c5fd", fontSize: 24, marginBottom: 32 }}>AIツール比較サイト</div>

      {/* ツール名 */}
      <div style={{ color: "white", fontSize: 72, fontWeight: "bold", lineHeight: 1.1, marginBottom: 20 }}>
        {tool.name}
      </div>

      {/* 説明 */}
      <div style={{ color: "#bfdbfe", fontSize: 28, lineHeight: 1.5, marginBottom: 40, maxWidth: 900 }}>
        {tool.description.length > 60 ? tool.description.slice(0, 60) + "…" : tool.description}
      </div>

      {/* バッジ行 */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {tool.hasFree && (
          <div style={{ background: "#16a34a", color: "white", padding: "8px 20px", borderRadius: 24, fontSize: 22, fontWeight: "bold" }}>
            無料プランあり
          </div>
        )}
        {tool.japaneseSupport && (
          <div style={{ background: "#0891b2", color: "white", padding: "8px 20px", borderRadius: 24, fontSize: 22, fontWeight: "bold" }}>
            日本語対応
          </div>
        )}
        {tool.hasAPI && (
          <div style={{ background: "#7c3aed", color: "white", padding: "8px 20px", borderRadius: 24, fontSize: 22, fontWeight: "bold" }}>
            API提供
          </div>
        )}
        <div style={{ marginLeft: "auto", color: "#fde68a", fontSize: 36, fontWeight: "bold" }}>
          {price}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
