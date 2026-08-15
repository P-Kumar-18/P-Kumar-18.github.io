import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

const GameContext = createContext(null)

const PAGE_META = {
  "/": { zone: "HOME", label: "TITLE SCREEN" },
  "/projects": { zone: "PROJECTS", label: "QUEST LOG" },
  "/about": { zone: "ABOUT", label: "CHARACTER" },
  "/contact": { zone: "CONTACT", label: "COMMS" },
}

export function GameProvider({ children }) {
  const location = useLocation()
  const [scrollPct, setScrollPct] = useState(0)
  const [visited, setVisited] = useState(() => new Set(["/"]))
  const [eggUnlocked, setEggUnlocked] = useState(false)

  // Track scroll position -> drives the HP bar fill.
  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const pct = scrollable > 0 ? Math.min(100, Math.round((doc.scrollTop / scrollable) * 100)) : 0
      setScrollPct(pct)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [location.pathname])

  // Reset scroll + mark visited on navigation.
  useEffect(() => {
    window.scrollTo(0, 0)
    setScrollPct(0)
    setVisited((prev) => {
      const next = new Set(prev)
      next.add(location.pathname)
      return next
    })
  }, [location.pathname])

  const meta = PAGE_META[location.pathname] ?? { zone: "???", label: "UNKNOWN" }

  const value = useMemo(
    () => ({
      scrollPct,
      zone: meta.zone,
      label: meta.label,
      visitedCount: visited.size,
      totalPages: Object.keys(PAGE_META).length,
      eggUnlocked,
      setEggUnlocked,
    }),
    [scrollPct, meta.zone, meta.label, visited, eggUnlocked],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be used within GameProvider")
  return ctx
}
