import { Routes, Route, useLocation } from "react-router-dom"
import { GameProvider } from "./GameContext.jsx"
import NavBar from "./components/NavBar.jsx"
import StatusBar from "./components/StatusBar.jsx"
import KonamiEgg from "./components/KonamiEgg.jsx"
import Home from "./pages/Home.jsx"
import Projects from "./pages/Projects.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import NotFound from "./pages/NotFound.jsx"

export default function App() {
  const location = useLocation()

  return (
    <GameProvider>
      <div className="screen-texture flex min-h-dvh flex-col">
        <NavBar />

        {/* key on pathname so each navigation replays the screen-wipe */}
        <main key={location.pathname} className="page-enter relative z-10 flex-1 pb-16">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <StatusBar />
        <KonamiEgg />
      </div>
    </GameProvider>
  )
}
