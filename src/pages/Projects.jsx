import { useState } from "react"
import { projects } from "../data.js"
import { PressButton, StatBadge, SectionLabel, StatBar } from "../components/ui.jsx"

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)
  const panelId = `proj-${project.id}`

  return (
    <article className="panel border-2 border-foreground bg-background">
      {/* Card header — always visible */}
      <button
        className="btn-press flex w-full items-center justify-between gap-4 border-b-2 border-foreground bg-surface px-4 py-3 text-left text-background"
        style={{ boxShadow: "none" }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-base tracking-tight text-background">{project.name}</span>
            <span className="border border-background/50 px-1 font-mono text-[10px] text-background/80">
              {project.year}
            </span>
          </div>
          <p className="mt-1 truncate font-mono text-xs text-background/90">{project.summary}</p>
        </div>
        <span
          className="grid h-8 w-8 shrink-0 place-items-center border-2 border-foreground bg-accent font-pixel text-sm text-foreground transition-transform"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
          aria-hidden
        >
          +
        </span>
      </button>

      {/* Quick stats row — always visible */}
      <div className="grid gap-2 border-b-2 border-foreground px-4 py-3 sm:grid-cols-3">
        {project.stats.map((s) => (
          <StatBar key={s.label} label={s.label} value={s.value} max={10} />
        ))}
      </div>

      {/* Expanded stat sheet */}
      {open && (
        <div id={panelId} className="grid gap-5 px-4 py-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <StatBadge key={t}>{t}</StatBadge>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field n="01" label="PROBLEM" delay={0} text={project.problem} />
            <Field n="02" label="APPROACH" delay={60} text={project.approach} />
            <Field n="03" label="OUTCOME" delay={120} text={project.outcome} />
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t-2 border-foreground pt-4">
            <span className="mr-1 font-mono text-[10px] uppercase text-muted">ROLE: {project.role}</span>
            {project.links.map((l) => (
              <PressButton key={l.label} href={l.href} variant="teal" className="text-[10px]">
                {l.label} ↗
              </PressButton>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

function Field({ n, label, text, delay }) {
  return (
    <div className="stat-reveal border-2 border-foreground bg-surface/20 p-3" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-1.5">
        <span className="font-pixel text-[10px] text-accent">{n}</span>
        <span className="font-pixel text-[10px] uppercase text-teal">{label}</span>
      </div>
      <p className="mt-2 font-mono text-xs leading-relaxed text-foreground text-pretty">{text}</p>
    </div>
  )
}

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <SectionLabel>QUEST LOG</SectionLabel>
      <h1 className="mt-3 font-pixel text-2xl text-foreground sm:text-3xl">PROJECTS</h1>
      <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-foreground text-pretty">
        Select an entry to open its stat sheet — problem, approach, and outcome, the way it actually
        went. No filler.
      </p>

      <div className="mt-8 grid gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
