"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CompareButton({ slug, name }: { slug: string; name: string }) {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("compareList");
      if (stored) setCompareList(JSON.parse(stored));
    } catch {}
  }, []);

  const isAdded = compareList.includes(slug);
  const isFull = !isAdded && compareList.length >= 3;

  const toggle = () => {
    const next = isAdded
      ? compareList.filter((s) => s !== slug)
      : compareList.length < 3
      ? [...compareList, slug]
      : compareList;
    setCompareList(next);
    try {
      localStorage.setItem("compareList", JSON.stringify(next));
    } catch {}
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={toggle}
        disabled={isFull}
        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
          isAdded
            ? "bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100"
            : isFull
            ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-blue-300"
        }`}
      >
        {isAdded ? "✓ 比較リストに追加済み（クリックで解除）" : isFull ? "比較リストが満杯（最大3件）" : `+ ${name}を比較リストに追加`}
      </button>
      {compareList.length >= 2 && (
        <Link
          href={`/compare-tools?tools=${compareList.join(",")}`}
          className="flex-shrink-0 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          比較する →
        </Link>
      )}
    </div>
  );
}
