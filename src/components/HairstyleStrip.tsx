import { useState } from "react";
import type { HairstyleCategory } from "../types";

interface HairstyleStripProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const MOCK_HAIRSTYLES = [
  { id: "short-1", name: "Classic Crop", category: "short" as HairstyleCategory },
  { id: "medium-1", name: "Layered Bob", category: "medium" as HairstyleCategory },
  { id: "long-1", name: "Flowing Waves", category: "long" as HairstyleCategory },
  { id: "curly-1", name: "Afro Curls", category: "curly" as HairstyleCategory },
  { id: "updo-1", name: "Chic Bun", category: "updo" as HairstyleCategory },
  { id: "bangs-1", name: "Curtain Bangs", category: "bangs" as HairstyleCategory },
];

const CATEGORIES: { id: HairstyleCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "short", label: "Short" },
  { id: "medium", label: "Medium" },
  { id: "long", label: "Long" },
  { id: "curly", label: "Curly" },
  { id: "updo", label: "Updo" },
  { id: "bangs", label: "Bangs" },
];

export function HairstyleStrip({ selectedId, onSelect }: HairstyleStripProps) {
  const [activeCategory, setActiveCategory] = useState<HairstyleCategory | "all">("all");

  const filtered = activeCategory === "all"
    ? MOCK_HAIRSTYLES
    : MOCK_HAIRSTYLES.filter((h) => h.category === activeCategory);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-accent text-accent-contrast"
                : "bg-surface text-text-muted hover:bg-surface-raised hover:text-text border border-border"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {filtered.map((style) => {
          const isSelected = selectedId === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelect(style.id)}
              className={`flex min-w-[110px] flex-col items-center gap-2 rounded-lg border p-3 transition-all ${
                isSelected
                  ? "border-accent bg-surface-raised ring-1 ring-accent"
                  : "border-border bg-surface hover:border-text-muted"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-bg text-xs text-text-muted">
                Preview
              </div>
              <span className="text-xs font-medium text-text truncate w-full text-center">
                {style.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
