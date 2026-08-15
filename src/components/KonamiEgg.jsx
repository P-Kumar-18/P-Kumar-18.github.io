import { useEffect, useState } from "react"
import { useGame } from "../GameContext.jsx"
import { PressButton } from "./ui.jsx"

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

// Listens for the Konami code (and accepts typing "gg" as a keyboard-free fallback).
export default function KonamiEgg() {
  const { setEggUnlocked } = useGame()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let progress = 0
    let ggBuffer = ""

    function trigger() {
      setEggUnlocked(true)
      setOpen(true)
    }

    function onKey(e) {
      const rawKey = e.key
      const normalizedKey = rawKey.toLowerCase()

      // Konami sequence — compare case-insensitively so ArrowUp vs arrowup doesn't break it
      if (normalizedKey === CODE[progress].toLowerCase()) {
        progress += 1
        if (progress === CODE.length) {
          progress = 0
          trigger()
        }
      } else {
        progress = normalizedKey === CODE[0].toLowerCase() ? 1 : 0
      }

      // "gg" fallback for folks without arrow keys handy
      if (rawKey.length === 1) {
        ggBuffer = (ggBuffer + normalizedKey).slice(-2)
        if (ggBuffer === "gg") trigger()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [setEggUnlocked])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Secret unlocked"
      onClick={() => setOpen(false)}
    >
      <div
        className="page-enter panel w-full max-w-sm border-2 border-foreground bg-background p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-pixel text-lg text-teal">CHEAT ENABLED</div>
        <p className="mt-4 font-mono text-sm leading-relaxed text-foreground">
          You entered the code. Extra life granted, though this portfolio has no bosses — just
          projects. Thanks for poking around.
        </p>
        <div className="my-5 flex items-center justify-center gap-1" aria-hidden>
          {["▲", "▲", "▼", "▼", "◀", "▶", "◀", "▶", "B", "A"].map((c, i) => (
            <span
              key={i}
              className="stat-reveal grid h-6 w-6 place-items-center border border-foreground bg-accent font-mono text-[10px] font-bold"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {c}
            </span>
          ))}
        </div>
        <PressButton variant="teal" onClick={() => setOpen(false)}>
          CONTINUE
        </PressButton>
      </div>
    </div>
  )
}
