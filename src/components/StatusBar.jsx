import { useGame } from "../GameContext.jsx"

// Persistent console status bar pinned to the bottom.
// The HP bar fills with scroll progress; zone + explore % react to navigation.
export default function StatusBar() {
  const { scrollPct, zone, label, visitedCount, totalPages, eggUnlocked } = useGame()

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-foreground bg-surface text-background">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-1.5">
        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="font-pixel text-[9px] uppercase text-background/80">ZONE</span>
          <span className="border border-foreground bg-background px-1.5 py-0.5 font-mono text-[10px] font-bold text-foreground">
            {zone}
          </span>
        </div>

        {/* HP / scroll bar */}
        <div className="flex flex-1 items-center gap-2">
          <span className="font-pixel text-[9px] uppercase text-background/80">HP</span>
          <div className="relative h-3 flex-1 overflow-hidden border-2 border-foreground bg-background">
            <div
              className="h-full bg-accent transition-[width] duration-150 ease-out"
              style={{ width: `${scrollPct}%` }}
            />
            <div className="pointer-events-none absolute inset-0 flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="h-full flex-1 border-r border-foreground/20" />
              ))}
            </div>
          </div>
          <span className="w-9 shrink-0 text-right font-mono text-[10px] tabular-nums">{scrollPct}%</span>
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          <span className="font-pixel text-[9px] uppercase text-background/80">MAP</span>
          <span className="font-mono text-[10px] tabular-nums">
            {visitedCount}/{totalPages}
          </span>
        </div>

        {eggUnlocked && (
          <span className="egg-flash border border-foreground bg-accent px-1.5 py-0.5 font-pixel text-[9px] text-foreground">
            ★
          </span>
        )}

        <span className="hidden font-pixel text-[9px] uppercase text-background/70 lg:inline">{label}</span>
      </div>
    </div>
  )
}
