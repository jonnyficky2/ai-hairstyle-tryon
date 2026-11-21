export function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight text-text">
          AI Hairstyle Try-On
        </h1>
        <span className="rounded-full bg-surface-raised px-2.5 py-0.5 text-xs text-text-muted">
          MVP Skeleton
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-text-muted">
        <button
          type="button"
          className="hover:text-text transition-colors"
          onClick={() => alert("Privacy notice: All processing happens locally in your browser. No video or images are uploaded.")}
        >
          Privacy
        </button>
      </div>
    </header>
  );
}
