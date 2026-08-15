import { PressButton, SectionLabel } from "../components/ui.jsx"

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-5xl place-items-center px-4 py-24 text-center">
      <SectionLabel>SIGNAL LOST</SectionLabel>
      <h1 className="mt-4 font-pixel text-4xl text-foreground sm:text-6xl">404</h1>
      <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-foreground text-pretty">
        This screen doesn&apos;t exist in the cartridge. Blow on it and try a different route.
      </p>
      <div className="mt-6">
        <PressButton to="/" variant="solid">
          ▶ BACK TO TITLE
        </PressButton>
      </div>
    </div>
  )
}
