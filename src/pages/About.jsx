import { useState } from "react"
import { profile } from "../data.js"
import { PressButton, Panel, SectionLabel, StatBadge } from "../components/ui.jsx"

const TIMELINE = [
  { year: "MID 24", text: "First lines of Python." },
  { year: "EARLY 25", text: "HTML, CSS, JS — static pages, a to-do list." },
  { year: "MID 25", text: "Node/Express — image gallery, mood poll tracker." },
  { year: "LATE 25", text: "Multiuser File Safe — bcrypt auth, deployed live." },
  { year: "LATE 25", text: "EchoSort — packaged Python desktop tool." },
  { year: "EARLY 26", text: "Argeia v1 shipped — 5-layer engine, 98 tests." },
  { year: "NOW", text: "Building Siagnos — an AI taste engine for fanfiction, in progress." },
  { year: "ALSO", text: "Opsis — internship build, scoped down from Siagnos." },
]

const DRIVES = ["Plain, honest writing", "Recommendation systems", "Local LLMs", "Fandom communities", "Actually finishing things"]

export default function About() {
  const [pets, setPets] = useState(0)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <SectionLabel>CHARACTER</SectionLabel>
      <h1 className="mt-3 font-pixel text-2xl text-foreground sm:text-3xl">ABOUT</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-start">
        {/* Character panel */}
        <Panel tint="surface" className="p-5">
          <div className="font-pixel text-xs uppercase text-background">PROFILE</div>
          <dl className="mt-4 grid gap-2 font-mono text-sm text-background">
            <Row k="NAME" v={profile.handle} />
            <Row k="CLASS" v={profile.role} />
            <Row k="BASE" v={profile.location} />
            <Row k="ALIGN" v="Pragmatic / Good" />
          </dl>

          <div className="mt-5 border-t-2 border-background/40 pt-4">
            <div className="font-pixel text-[10px] uppercase text-background">DRIVES</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {DRIVES.map((d) => (
                <StatBadge key={d}>{d}</StatBadge>
              ))}
            </div>
          </div>

          {/* Hidden interactive element: click the mascot to "pet" it */}
          <div className="mt-6 flex items-center justify-between border-t-2 border-background/40 pt-4">
            <button
              className="btn-press grid h-12 w-12 place-items-center border-2 border-foreground bg-background font-pixel text-lg text-foreground"
              onClick={() => setPets((p) => p + 1)}
              aria-label="Pet the mascot"
              title="hey, click me"
            >
              {pets === 0 ? "·◡·" : pets < 5 ? "^◡^" : "★◡★"}
            </button>
            <span className="font-mono text-[11px] text-background">
              {pets === 0
                ? "// psst, click the little guy"
                : pets < 5
                  ? `pet count: ${pets}`
                  : `MAX AFFECTION (${pets})`}
            </span>
          </div>
        </Panel>

        {/* Narrative + timeline */}
        <div className="grid gap-8">
          <section>
            <div className="font-pixel text-xs uppercase text-teal">BACKSTORY</div>
            <div className="mt-3 grid gap-3 font-mono text-sm leading-relaxed text-foreground text-pretty">
              <p>
                I&apos;m a BCA student building Siagnos — a recommendation engine for fanfiction,
                trained on a dataset I scraped and cleaned myself. It started because AO3&apos;s tag
                search wasn&apos;t finding what I actually wanted to read.
              </p>
              <p>
                Most of what I ship lives in Python: NLP, content-based filtering, the occasional
                Flask backend. I also mess with local LLMs and take apart old hardware to see how
                it&apos;s wired.
              </p>
              <p>
                Outside of code, I read a lot of fanfiction and play fan-made Pokémon ROM hacks.
                This site borrows some of that aesthetic on purpose.
              </p>
            </div>
          </section>

          <section>
            <div className="font-pixel text-xs uppercase text-teal">TIMELINE</div>
            <ol className="mt-3 grid gap-2">
              {TIMELINE.map((t, i) => (
                <li key={i} className="grid grid-cols-[6rem_1fr] gap-3 border-2 border-foreground bg-background p-3">
                  <span className="overflow-hidden whitespace-nowrap border-r-2 border-foreground pr-2 font-pixel text-[10px] text-accent">
                    {t.year}
                  </span>
                  <span className="font-mono text-xs leading-relaxed text-foreground text-pretty">{t.text}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="flex flex-wrap gap-3">
            <PressButton to="/projects" variant="solid">
              ▶ SEE THE WORK
            </PressButton>
            <PressButton to="/contact" variant="teal">
              SAY HELLO
            </PressButton>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-background/30 pb-1">
      <dt className="text-background/70">{k}</dt>
      <dd className="font-bold">{v}</dd>
    </div>
  )
}
