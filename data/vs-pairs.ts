export type VsPair = {
  slugA: string;
  slugB: string;
};

export const vsPairs: VsPair[] = [
  { slugA: "cursor", slugB: "windsurf" },
  { slugA: "cursor", slugB: "replit-ai" },
  { slugA: "bolt", slugB: "lovable" },
  { slugA: "bolt", slugB: "v0" },
  { slugA: "lovable", slugB: "v0" },
  { slugA: "make", slugB: "n8n" },
  { slugA: "suno", slugB: "udio" },
  { slugA: "gamma", slugB: "tome" },
  { slugA: "notta", slugB: "otter-ai" },
  { slugA: "midjourney", slugB: "stable-diffusion" },
];

export function getVsSlug(slugA: string, slugB: string): string {
  return `${slugA}-vs-${slugB}`;
}

export function parseVsSlug(slug: string): { slugA: string; slugB: string } | null {
  const idx = slug.indexOf("-vs-");
  if (idx === -1) return null;
  return {
    slugA: slug.slice(0, idx),
    slugB: slug.slice(idx + 4),
  };
}

export function getRelatedVsPairs(slug: string): VsPair[] {
  return vsPairs.filter((p) => p.slugA === slug || p.slugB === slug);
}
