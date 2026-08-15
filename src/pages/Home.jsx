import { useEffect, useState } from "react"
import { profile, statusLines, stats } from "../data.js"
import { PressButton, Panel, SectionLabel, StatBar } from "../components/ui.jsx"

// Typewriter that cycles through the save-file status lines.
function StatusReadout() {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState("")

  useEffect(() => {
    const full = statusLines[index]
    let char = 0
    let holdTimer

    const typeTimer = setInterval(() => {
      char += 1
      setTyped(full.slice(0, char))
      if (char >= full.length) {
        clearInterval(typeTimer)
        holdTimer = setTimeout(() => {
          setIndex((i) => (i + 1) % statusLines.length)
        }, 1800)
      }
    }, 45)

    return () => {
      clearInterval(typeTimer)
      clearTimeout(holdTimer)
    }
  }, [index])

  return (
    <div className="flex items-center gap-2 border-2 border-foreground bg-foreground px-3 py-2 font-mono text-sm text-background">
      <span className="text-accent">{">"}</span>
      <span className="truncate">{typed}</span>
      <span className="caret text-accent">_</span>
    </div>
  )
}

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
        {/* Hero */}
        <section>
          <SectionLabel>TITLE SCREEN</SectionLabel>

          <h1 className="mt-4 font-pixel text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            {profile.handle}
          </h1>
          <p className="mt-2 font-mono text-base font-bold uppercase tracking-wide text-teal">
            {profile.role} // {profile.location}
          </p>

          <p className="mt-5 max-w-xl font-mono text-base leading-relaxed text-foreground text-pretty">
            {profile.tagline}
          </p>

          <div className="mt-5 max-w-xl">
            <StatusReadout />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <PressButton to="/projects" variant="solid">
              ▶ VIEW PROJECTS
            </PressButton>
            <PressButton to="/contact" variant="teal">
              GET IN TOUCH
            </PressButton>
          </div>

          <p className="mt-6 font-mono text-xs text-muted">
            hint: try the classic cheat code. up up down down…
          </p>
        </section>

        {/* Save-file card */}
        <aside>
          <Panel tint="surface" className="p-5">
            <div className="flex items-center justify-between border-b-2 border-background/40 pb-2">
              <span className="font-pixel text-xs uppercase text-background">SAVE FILE 01</span>
              <span className="font-mono text-[10px] text-background/80">◉ ACTIVE</span>
            </div>

            <p className="mt-4 font-mono text-sm leading-relaxed text-background">{profile.blurb}</p>

            <div className="mt-5 grid gap-2 border-t-2 border-background/40 pt-4">
              {stats.map((s) => (
                <StatBar key={s.label} label={s.label} value={s.value} max={s.max} />
              ))}
            </div>
          </Panel>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {["/projects", "/about", "/contact"].map((to, i) => (
              <PressButton key={to} to={to} variant="ghost" className="justify-center text-[10px]">
                {["QUESTS", "STORY", "COMMS"][i]}
              </PressButton>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
