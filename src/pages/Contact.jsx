import { useState } from "react"
import { socials, contactEmail } from "../data.js"
import { PressButton, Panel, SectionLabel } from "../components/ui.jsx"

function Field({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="font-pixel text-[10px] uppercase text-teal">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  "w-full border-2 border-foreground bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted focus:bg-surface/10"

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    // Static site: no backend. Hand off to the user's mail client.
    const subject = encodeURIComponent(`Portfolio ping from ${form.name || "someone"}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <SectionLabel>COMMS</SectionLabel>
      <h1 className="mt-3 font-pixel text-2xl text-foreground sm:text-3xl">CONTACT</h1>
      <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-foreground text-pretty">
        Open to interesting work and good conversations. Drop a line — I read everything.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-start">
        {/* Form */}
        <Panel tint="background" className="p-5">
          <div className="mb-4 flex items-center justify-between border-b-2 border-foreground pb-2">
            <span className="font-pixel text-xs uppercase text-foreground">NEW MESSAGE</span>
            <span className="font-mono text-[10px] text-muted">{sent ? "◉ SENT" : "○ DRAFT"}</span>
          </div>

          <form className="grid gap-4" onSubmit={onSubmit}>
            <Field label="YOUR NAME">
              <input
                className={inputClass}
                value={form.name}
                onChange={update("name")}
                placeholder="player one"
                required
              />
            </Field>
            <Field label="EMAIL">
              <input
                className={inputClass}
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@domain.dev"
                required
              />
            </Field>
            <Field label="MESSAGE">
              <textarea
                className={inputClass + " min-h-32 resize-y"}
                value={form.message}
                onChange={update("message")}
                placeholder="what's on your mind?"
                required
              />
            </Field>

            <div className="flex items-center gap-3">
              <PressButton type="submit" variant="solid">
                ▶ SEND
              </PressButton>
              {sent && (
                <span className="stat-reveal font-mono text-xs text-teal">
                  opening your mail client…
                </span>
              )}
            </div>
          </form>
        </Panel>

        {/* Links */}
        <aside className="grid gap-3">
          <div className="font-pixel text-[10px] uppercase text-teal">DIRECT LINKS</div>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="btn-press flex items-center justify-between border-2 border-foreground bg-surface px-4 py-3 text-background"
            >
              <span className="font-pixel text-[10px] uppercase">{s.label}</span>
              <span className="font-mono text-xs">{s.handle}</span>
            </a>
          ))}
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
            No tracking, no autoresponders. Just me on the other end.
          </p>
        </aside>
      </div>
    </div>
  )
}
