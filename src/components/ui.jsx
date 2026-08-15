import { Link } from "react-router-dom"

function cx(...parts) {
  return parts.filter(Boolean).join(" ")
}

// Tactile pressable button. Renders as <button>, <a>, or router <Link>.
export function PressButton({ as = "button", to, href, variant = "solid", className, children, ...rest }) {
  const base =
    "btn-press inline-flex items-center justify-center gap-2 border-2 border-foreground px-4 py-2 font-mono text-sm font-bold uppercase tracking-wide select-none"
  const variants = {
    solid: "bg-accent text-foreground",
    teal: "bg-teal text-background",
    surface: "bg-surface text-background",
    ghost: "bg-background text-foreground",
  }
  const cls = cx(base, variants[variant], className)

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}

// Retro "stat" badge used for tech tags.
export function StatBadge({ children, className }) {
  return (
    <span
      className={cx(
        "inline-flex items-center border-2 border-foreground bg-background px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  )
}

// Blocky raised panel container.
export function Panel({ className, children, tint = "surface", ...rest }) {
  const tints = {
    surface: "bg-surface text-background",
    background: "bg-background text-foreground",
  }
  return (
    <div className={cx("panel border-2 border-foreground", tints[tint], className)} {...rest}>
      {children}
    </div>
  )
}

// Section label in the pixel font.
export function SectionLabel({ children, className }) {
  return (
    <div className={cx("flex items-center gap-2 font-pixel text-xs uppercase text-teal", className)}>
      <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
      {children}
    </div>
  )
}

// A small stat meter bar (segmented).
export function StatBar({ value, max = 10, label }) {
  const filled = Math.round((value / max) * 10)
  return (
    <div className="flex items-center gap-2">
      {label && <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wide">{label}</span>}
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={cx("h-3 w-2 border border-foreground", i < filled ? "bg-accent" : "bg-background/40")}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] tabular-nums">{value}/{max}</span>
    </div>
  )
}

export { cx }
