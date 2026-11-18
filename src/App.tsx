export default function App() {
  return (
    <main className="min-h-dvh bg-bg p-6 text-text">
      <h1 className="text-2xl font-semibold">AI Hairstyle Try-On</h1>
      <p className="mt-2 text-sm text-text-muted">
        Phase 1 scaffold. Camera, tracking, and rendering are not implemented yet.
      </p>
      <div className="mt-6 rounded-lg border border-border bg-surface p-4 shadow-panel">
        <p className="text-xs text-text-muted">Design tokens</p>
        <p className="mt-1 text-base">surface · border · radius-lg · shadow-panel</p>
      </div>
    </main>
  );
}
