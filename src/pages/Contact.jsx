import { useState } from "react"
import { socials, contactEmail } from "../data.js"
import { PressButton, Panel, SectionLabel } from "../components/ui.jsx"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgpgzan"

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
  const [status, setStatus] = useState("idle") // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      })

      if (res.ok) {
        setStatus("sent")
        setForm({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
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
            <span className="font-mono text-[10px] text-muted">
              {status === "sent" ? "◉ SENT" : status === "sending" ? "○ SENDING…" : status === "error" ? "✕ FAILED" : "○ DRAFT"}
            </span>
          </div>

          <form className="grid gap-4" onSubmit={onSubmit}>
            <Field label="YOUR NAME">
              <input
                name="name"
                className={inputClass}
                value={form.name}
                onChange={update("name")}
                placeholder="player one"
                required
              />
            </Field>
            <Field label="EMAIL">
              <input
                name="email"
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
                name="message"
                className={inputClass + " min-h-32 resize-y"}
                value={form.message}
                onChange={update("message")}
                placeholder="what's on your mind?"
                required
              />
            </Field>

            <div className="flex items-center gap-3">
              <PressButton type="submit" variant="solid" disabled={status === "sending"}>
                {status === "sending" ? "SENDING…" : "▶ SEND"}
              </PressButton>
              {status === "sent" && (
                <span className="stat-reveal font-mono text-xs text-teal">got it — talk soon.</span>
              )}
              {status === "error" && (
                <span className="stat-reveal font-mono text-xs text-red-600">
                  something broke — email me directly instead.
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
