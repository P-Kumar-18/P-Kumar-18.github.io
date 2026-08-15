import { useState } from "react"
import { NavLink } from "react-router-dom"
import { cx } from "./ui.jsx"

const LINKS = [
  { to: "/", label: "HOME", end: true },
  { to: "/projects", label: "PROJECTS" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
]

function itemClass({ isActive }) {
  return cx(
    "btn-press border-2 border-foreground px-3 py-1.5 font-pixel text-[10px] uppercase tracking-wide",
    isActive ? "bg-accent text-foreground" : "bg-surface text-background",
  )
}

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-20 border-b-2 border-foreground bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="group flex items-center gap-2" aria-label="Home">
          <span className="grid h-7 w-7 place-items-center border-2 border-foreground bg-teal overflow-hidden">
            <img
              src="/media/logoPK.png"
              alt=""
              className="h-full w-full object-contain"
              aria-hidden="true"
            />
          </span>

          <span className="font-pixel text-sm tracking-tight">
            DEV<span className="text-accent">://</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-2 sm:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={itemClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="btn-press border-2 border-foreground bg-surface px-3 py-1.5 font-pixel text-[10px] text-background sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="page-enter grid gap-2 border-t-2 border-foreground bg-background px-4 py-3 sm:hidden"
          aria-label="Mobile"
        >
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={itemClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
