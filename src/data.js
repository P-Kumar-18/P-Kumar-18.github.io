// Central content for the portfolio. Edit here to make it yours.

export const profile = {
  handle: "PRIYANSH KUMAR",
  role: "Developer, currently focused on Siagnos",
  location: "India",
  tagline: "Developer who builds interesting things. Right now that's Siagnos.",
  blurb:
    "BCA student building Siagnos, an AI-powered recommendation engine for fanfiction, trained on a dataset I scraped and cleaned myself. Also into local LLM experimentation and taking old hardware apart to see how it works.",
}

// Rotating "save-file readout" status lines for the Home hero.
export const statusLines = [
  "STATUS: BCA student, graduating 2027",
  "CURRENTLY: building Siagnos",
  "STACK: python / flask / nlp",
  "READING: too much AO3, no regrets",
  "SIDE QUEST: Pokémon ROM hacking",
  "LAST SAVE: cleaning a 7k-row fic dataset",
]

export const stats = [
  { label: "PROJECTS", value: 4, max: 10 },
  { label: "CERTS", value: 3, max: 5 },
  { label: "COFFEE", value: 999, max: 999 },
]

export const projects = [
  {
    id: "siagnos",
    name: "SIAGNOS",
    year: "2026",
    role: "Solo Build",
    summary: "AI-powered fanfiction recommendation engine built on a custom-scraped AO3 dataset.",
    tech: ["Python", "NLP", "Content-Based Filtering", "Flask", "Pandas"],
    stats: [
      { label: "SCOPE", value: 7 },
      { label: "DATA", value: 7 },
      { label: "POLISH", value: 5 },
    ],
    problem:
      "AO3's tag search surfaces fics by label, not by actual reading taste — good recommendations get buried under manual curation.",
    approach:
      "Built a custom scraper for AO3 structural metadata (confirmed permitted — not story text), collected roughly 7,000 rows of MHA fic data, and applied NLP-based content filtering to model taste beyond surface tags.",
    outcome:
      "Core recommendation pipeline runs on the initial dataset. Still active — the internship submission (Opsis) is a scoped-down version kept in a separate repo to keep this one clean.",
    links: [{ label: "GITHUB", href: "https://github.com/P-Kumar-18/Siagnos" }],
  },
  {
    id: "argeia",
    name: "ARGEIA",
    year: "2026",
    role: "Solo Build",
    summary: "Behavior-aware procrastination tracker, built as a CS50x final project.",
    tech: ["Python", "Flask", "SQLite"],
    stats: [
      { label: "TESTS", value: 9 },
      { label: "SCOPE", value: 6 },
      { label: "POLISH", value: 7 },
    ],
    problem: "Most productivity trackers log time spent, not the behavior patterns behind procrastination.",
    approach:
      "Built a 5-layer pipeline in Flask with SQLite state reconstruction and CSRF protection, covered by 98 unit and integration tests.",
    outcome: "Completed and submitted as the CS50x final project.",
    links: [{ label: "GITHUB", href: "https://github.com/P-Kumar-18/Argeia" }],
  },
  {
    id: "file-safe",
    name: "MULTIUSER FILE SAFE",
    year: "2025",
    role: "Solo Build",
    summary: "A full-stack secure file storage system with bcrypt auth and isolated per-user folders.",
    tech: ["Node.js", "Express", "bcrypt", "Multer"],
    stats: [
      { label: "SECURITY", value: 7 },
      { label: "SCOPE", value: 6 },
      { label: "POLISH", value: 7 },
    ],
    problem: "Needed a real, working authentication and file-storage system — not another to-do app.",
    approach:
      "Built session-based auth with bcrypt password hashing, Multer for uploads, and a private, isolated folder per user.",
    outcome: "Deployed live and still running.",
    links: [{ label: "LIVE", href: "https://multiuser-file-safe.onrender.com" }],
  },
  {
    id: "echosort",
    name: "ECHOSORT",
    year: "2025",
    role: "Solo Build",
    summary: "A desktop tool that auto-organizes photos into date-based folders.",
    tech: ["Python", "Tkinter", "Pillow", "PyInstaller"],
    stats: [
      { label: "USABILITY", value: 7 },
      { label: "SCOPE", value: 5 },
      { label: "POLISH", value: 6 },
    ],
    problem: "Sorting a photo dump by date by hand is slow and easy to mess up.",
    approach:
      "Built a clean Tkinter GUI over a date-sorting engine, with log generation, packaged as a standalone .exe via PyInstaller.",
    outcome: "First versioned release on GitHub, packaged and usable outside a dev environment.",
    links: [{ label: "GITHUB", href: "https://github.com/P-Kumar-18/EchoSort" }],
  },
]

export const contactEmail = "priyansh18116@gmail.com"

export const socials = [
  { label: "GITHUB", handle: "P-Kumar-18", href: "https://github.com/P-Kumar-18" },
  { label: "LINKEDIN", handle: "priyanshkumar18", href: "https://linkedin.com/in/priyanshkumar18" },
  { label: "EMAIL", handle: contactEmail, href: `mailto:${contactEmail}` },
]
