import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react"
import adinaPhotoAbout from "@/imports/ChatGPT_Image_Aug_3__2026__03_31_22_PM.png"
import projectThumb1 from "@/imports/image-7.png"
import projectThumb2 from "@/imports/image-8.png"
import projectThumb4 from "@/imports/image-7.png"
import projectThumb5 from "@/imports/image-9.png"
import projectThumb6 from "@/imports/image-8.png"
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import {
  Home, Briefcase, Layers, Archive, Mail,
  ArrowRight, ExternalLink, Globe, Zap,
  Users, CheckCircle, Coins, Bot, LayoutGrid,
  ArrowUpRight, ChevronRight,
} from "lucide-react"
import SunwayCase from "./components/SunwayCase"
import GegiCase from "./components/GegiCase"
import TngCase from "./components/TngCase"
import ProArcheryCase from "./components/ProArcheryCase"
import ElectionCase from "./components/ElectionCase"
import AnleneCase from "./components/AnleneCase"
import BijakWangCase from "./components/BijakWangCase"

// ─── Design tokens ────────────────────────────────────────────────────────────
const N = "#19244E"   // Oiler Navy
const C = "#DB3E8C"   // Deep Cerise
const W = "#ffffff"
const S = "#F9FAFB"   // Slate off-white
const HAIR = `rgba(25,36,78,0.10)` // hairline border

// ─── Types ────────────────────────────────────────────────────────────────────
type StatusKey = "LIVE" | "LIVE INTERNAL" | "PRODUCTION" | "PROTOTYPE" | "ON HOLD" | "ARCHIVED"

interface Project {
  id: number; name: string; client: string; year: number
  market: string; status: StatusKey; category: string; scope: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED = [
  {
    num: "01", name: "Gamified CI Evaluation Campaign", client: "GEGI Singapore",
    location: "SG", year: "2026", tags: ["Gamified Evaluation", "Singlish Persona", "Campaign"],
    headline: "A rapid-sprint interactive campaign tool combining scroll-based gamified evaluation, localized Singlish persona mechanics, and AEM integration.",
    metrics: [{ val: "2wk", sub: "Sprint Execution" }, { val: "7Q", sub: "Question Matrix" }, { val: "4", sub: "Persona Tiers" }],
    projectId: "gegi",
    thumb: projectThumb1,
  },
  {
    num: "02", name: "Seamless Micro-Insurance Integration", client: "Touch 'n Go × GEGM",
    location: "MY", year: "2024", tags: ["PWA / SSO", "eKYC Data Mapping", "B2C / FinTech"],
    headline: "An embedded Progressive Web Application (PWA) architecture built inside Malaysia's leading e-wallet ecosystem, integrating native SSO and eKYC.",
    metrics: [{ val: "V5", sub: "Production Release" }, { val: "3mo", sub: "Timeline" }, { val: "RM0", sub: "PTV Checkout" }],
    projectId: "tng",
    thumb: projectThumb2,
  },
  {
    num: "03", name: "Digital Transformation & AI Retail", client: "Pro Archery Jakarta",
    location: "ID", year: "2025", tags: ["AI Prompt-to-Code", "E-Commerce", "Admin POS"],
    headline: "An end-to-end digital ecosystem scaling a physical archery retailer into an Asia-wide e-commerce platform featuring AI-accelerated prototyping.",
    metrics: [{ val: "24h", sub: "POC Delivery" }, { val: "4", sub: "Portals Built" }, { val: "0", sub: "Figma Wireframes" }],
    projectId: "archery",
    thumb: projectThumb4,
  },
  {
    num: "04", name: "National Quick Count & Monitoring", client: "Indonesian Political Party",
    location: "ID", year: "2024", tags: ["Public Sector", "Civic Tech", "Real-Time CMS"],
    headline: "An end-to-end multi-level election monitoring system for Indonesia's 2024 Presidential Election, tracking vote tabulation across 38 provinces in real-time.",
    metrics: [{ val: "820K+", sub: "TPS Polling Stations" }, { val: "38", sub: "Provinces Tracked" }, { val: "48h", sub: "Critical Window" }],
    projectId: "election",
    thumb: projectThumb5,
  },
  {
    num: "05", name: "Medical Diagnostics & Field Sales Revamp", client: "Fonterra × Anlene",
    location: "ID", year: "2023", tags: ["Health Tech", "Field Sales Enablement", "Diagnostic Matrix"],
    headline: "Translating clinical diagnostic data from GE Achilles bone scanners and Omron devices into personalized health passports and automated WhatsApp PDF delivery.",
    metrics: [{ val: "3mo", sub: "Delivery Sprint" }, { val: "2", sub: "Medical Devices" }, { val: "4-tier", sub: "Health Matrix" }],
    projectId: "anlene",
    thumb: projectThumb6,
  },
  {
    num: "06", name: "100K-Player Live Tournament Platform", client: "mySalam Malaysia × myKawan",
    location: "MY", year: "2025", tags: ["Gamification", "Multiplayer", "Gemini AI Audio"],
    headline: "A Kahoot-inspired live multiplayer tournament platform built for mySalam Malaysia's #BijakWang Challenge, supporting 100,000 concurrent players.",
    metrics: [{ val: "100K", sub: "Live Players" }, { val: "3-Player", sub: "Squad Teams" }, { val: "Gemini", sub: "AI Audio Engine" }],
    projectId: "bijakwang",
    thumb: projectThumb1,
  },
]

const PROJECTS: Project[] = [
  { id: 1,  name: "Grab Data Pipeline",    client: "Grab",                             market: "Indonesia",           year: 2025, status: "LIVE INTERNAL", category: "Enterprise B2B / FinTech",    scope: "Tri-party data exchange flow & middleware logic mapping across Grab, insurance, and FTI." },
  { id: 2,  name: "OCBC Insurance",        client: "Great Eastern Indonesia (GEGI) × OCBC", market: "Indonesia",      year: 2026, status: "LIVE",          category: "Banking & InsurTech",         scope: "End-to-end insurance acquisition flow built with a custom standalone banking UI Kit from scratch." },
  { id: 3,  name: "myKawan AI Engine",     client: "myKawan",                          market: "Malaysia",            year: 2025, status: "PRODUCTION",    category: "AI / Marketing Automation",   scope: "Internal AI-powered CMS tool for automated marketing copy, articles, images, and media generation." },
  { id: 4,  name: "Teman E-Commerce",      client: "Teman",                            market: "Indonesia",           year: 2025, status: "PROTOTYPE",     category: "AI & Retail E-Commerce",      scope: "AI-driven product recommendation engine and personalized purchase flow integration." },
  { id: 5,  name: "Samaloop",              client: "Samaloop",                         market: "Indonesia",           year: 2025, status: "LIVE",          category: "EdTech & Marketplace",        scope: "Corporate website and public speaking coach directory booking platform." },
  { id: 6,  name: "Family Moo",            client: "Fonterra Indonesia",               market: "Indonesia",           year: 2024, status: "LIVE",          category: "FMCG & Loyalty Portal",       scope: "Customer loyalty management and points redemption portal for Fonterra's consumer ecosystem." },
  { id: 7,  name: "Telescope Indonesia",   client: "Telescope Indonesia",              market: "Indonesia",           year: 2024, status: "LIVE",          category: "B2B Industrial Catalog",      scope: "Digital product catalog and technical specification showcase for specialized equipment." },
  { id: 8,  name: "YAMET Center",          client: "YAMET Child Development",          market: "Indonesia",           year: 2022, status: "LIVE",          category: "Healthcare Portal",           scope: "Corporate website and service directory for child development clinics across Indonesia." },
  { id: 9,  name: "KCIC × Jasindo",        client: "Kereta Cepat Indonesia China",     market: "Indonesia",           year: 2026, status: "ON HOLD",       category: "Public Transit InsurTech",    scope: "Integrated passenger travel insurance purchasing flow with Jasindo." },
  { id: 10, name: "Ada Polisi",            client: "Internal Public Sector",           market: "Indonesia",           year: 2022, status: "ARCHIVED",      category: "Public Sector Mobile App",    scope: "Internal mobile system for law enforcement data entry and reporting." },
  { id: 11, name: "GE × Shopee Insurance", client: "Great Eastern Malaysia × Shopee",  market: "Malaysia",            year: 2026, status: "LIVE",          category: "InsurTech & E-Commerce",      scope: "Insurance product integration and purchase flow embedded within Shopee Malaysia's ecosystem." },
  { id: 12, name: "Haruuz Internal System",client: "Mikrosayang",                      market: "Malaysia",            year: 2026, status: "PRODUCTION",    category: "Internal System",             scope: "Internal management system for Mikrosayang's operational workflows and data tracking." },
]


// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }) },
      { rootMargin: "-45% 0px -55% 0px" }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [ids])
  return active
}


// ─── Mono Tag ─────────────────────────────────────────────────────────────────
function MonoTag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className="font-sans text-[10px] font-semibold tracking-wider uppercase"
      style={{ color: accent ? C : `${N}CC` }}
    >
      {children}
    </span>
  )
}

// ─── Hairline ─────────────────────────────────────────────────────────────────
function Hairline({ className = "" }: { className?: string }) {
  return <div className={`w-full h-px ${className}`} style={{ backgroundColor: HAIR }} />
}

// ─── Floating Dock ─────────────────────────────────────────────────────────────
const DOCK = [
  { id: "home", label: "Home", Icon: Home },
  { id: "work", label: "Work", Icon: Briefcase },
  { id: "process", label: "Process", Icon: Layers },
  { id: "archive", label: "Archive", Icon: Archive },
  { id: "contact", label: "Contact", Icon: Mail },
]

function FloatingDock({ activeSection }: { activeSection: string }) {
  const [lastY, setLastY] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY
      if (Math.abs(delta) > 6) {
        setVisible(delta < 0 || currentY < 80)
        setLastY(currentY)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [lastY])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: visible ? 0 : 80, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0"
      style={{
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(18px)",
        border: `1px solid ${HAIR}`,
        borderRadius: "6px",
        boxShadow: `0 4px 24px ${N}12`,
      }}
    >
      {DOCK.map((entry, i) => {
        const isActive = activeSection === entry.id
        return (
          <button
            key={entry.id}
            onClick={() => scrollTo(entry.id)}
            aria-label={entry.label}
            className="relative flex flex-col items-center gap-1.5 px-5 py-3 transition-colors duration-150 focus:outline-none"
            style={{
              borderRight: i < DOCK.length - 1 ? `1px solid ${HAIR}` : "none",
              color: isActive ? N : `${N}BB`,
            }}
          >
            <entry.Icon size={13} strokeWidth={isActive ? 2.2 : 1.6} />
            <span className="font-sans text-[8px] font-semibold tracking-widest uppercase">
              {entry.label}
            </span>
            {isActive && (
              <motion.span
                layoutId="dock-active"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px]"
                style={{ backgroundColor: C }}
              />
            )}
          </button>
        )
      })}
    </motion.nav>
  )
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [tick, setTick] = useState(0)
  const LANGS = ["EN", "ID", "KO"]
  const HELLOS = ["Hello.", "Halo.", "안녕하세요."]

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % LANGS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: W }}
    >
      {/* Top nav bar */}
      <div
        className="flex items-center justify-between px-8 lg:px-16 py-6"
        style={{ borderBottom: `1px solid rgba(25, 36, 78, 0.05)` }}
      >
        <span className="font-sans text-[11px] font-semibold tracking-[0.15em]" style={{ color: N }}>
          AFG<span style={{ color: C }}> ·</span> PORTFOLIO 2026
        </span>
        <div className="flex items-center gap-4">
          <span className="font-sans text-[10px] font-semibold tracking-wider text-[#19244E]/60 uppercase">SG / MY / ID</span>
          <a
            href="/resume-adina-fayza-gayo.pdf"
            download
            className="flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-widest uppercase px-4 py-2.5 transition-all duration-150"
            style={{ border: `1px solid ${HAIR}`, color: `${N}DD`, borderRadius: "6px" }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = N
              ;(e.currentTarget as HTMLElement).style.color = N
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = HAIR
              ;(e.currentTarget as HTMLElement).style.color = `${N}DD`
            }}
          >
            <ExternalLink size={10} />
            Resume
          </a>
          <a
            href="mailto:adina.gayo@design.id"
            className="font-sans text-[10px] font-semibold tracking-widest uppercase px-4 py-2.5 transition-all duration-150"
            style={{ border: `1px solid ${N}`, color: N, borderRadius: "6px" }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = N
              ;(e.currentTarget as HTMLElement).style.color = W
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = "transparent"
              ;(e.currentTarget as HTMLElement).style.color = N
            }}
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* Main hero grid */}
      <div className="flex-1 grid lg:grid-cols-[1.1fr_0.9fr] relative">
        {/* Left: editorial text column */}
        <div className="flex flex-col justify-between px-8 lg:px-20 py-20 lg:py-24">
          {/* ID tag */}
          <div>
            <div className="mb-12 lg:mb-16">
              <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-[#19244E]/60">
                [AFG-2026 // SENIOR STRATEGIC DESIGNER]
              </span>
            </div>

            {/* Big editorial headline */}
            <h1
              className="font-display font-light leading-[0.95] mb-8"
              style={{ fontSize: "clamp(3.2rem, 6.5vw, 6.2rem)", color: N, letterSpacing: "-0.02em" }}
            >
              Enterprise<br />
              <em className="font-normal not-italic" style={{ color: C }}>Product</em><br />
              <span className="font-light">Design.</span>
            </h1>

            <p
              className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase mb-6"
              style={{ color: C }}
            >
              Specializing in Enterprise Systems, Multi-Brand Architecture & API-Driven Workflows.
            </p>
            <p
              className="text-base leading-relaxed max-w-[460px] mb-12"
              style={{ color: `${N}CC`, fontWeight: 400, lineHeight: 1.8 }}
            >
              Strategic Product Designer with an M.MT background, specializing in Enterprise B2B and multi-brand platforms. I design cross-border fintech systems and AI-accelerated workflows operating at regional scale across Singapore, Malaysia, and Indonesia.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-85 cursor-pointer"
                style={{ backgroundColor: N, borderRadius: "6px" }}
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Selected Work <ArrowRight size={14} />
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors duration-150 cursor-pointer"
                style={{ border: `1px solid ${HAIR}`, color: N, borderRadius: "6px" }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail size={14} /> Get In Touch
              </button>
            </div>
          </div>


        </div>

        {/* Right: photo + cycling greeting */}
        <div
          className="relative flex flex-col justify-between overflow-hidden py-10"
          style={{ backgroundColor: "rgba(25, 36, 78, 0.015)" }}
        >
          {/* Greeting ticker — top strip */}
          <div className="flex flex-col items-center flex-shrink-0 mb-4">
            <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-[#19244E]/5">
              <span className="font-sans text-[9px] font-semibold tracking-widest text-[#19244E]/60 uppercase">[{LANGS[tick]}]</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={tick}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display text-sm font-light text-[#19244E]"
                >
                  {HELLOS[tick]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Photo */}
          <div className="flex-1 flex items-center justify-center px-8 py-4">
            <div
              className="relative overflow-hidden w-full aspect-[3/4]"
              style={{ 
                maxWidth: "380px", 
                borderRadius: "16px",
                boxShadow: "0 20px 40px -15px rgba(25, 36, 78, 0.15)"
              }}
            >
              <ImageWithFallback
                src={adinaPhotoAbout}
                alt="Adina Fayza Gayo — Senior Product Designer"
                className="absolute inset-0 w-full h-full object-cover object-top animate-fade-in"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-6"
                style={{ background: `linear-gradient(to top, rgba(25,36,78,0.92) 0%, rgba(25,36,78,0.4) 60%, transparent 100%)` }}
              >
                <p className="font-display font-medium text-lg text-white mb-0.5" style={{ letterSpacing: "-0.01em" }}>
                  Adina Fayza Gayo
                </p>
                <span className="font-sans text-[10px] font-semibold tracking-widest uppercase text-white/70">
                  Senior Product Designer
                </span>
              </div>
            </div>
          </div>

          {/* Credential strip */}
          <div className="flex items-center justify-center gap-2 px-8 py-6 flex-shrink-0 flex-wrap">
            {["Enterprise B2B", "Multi-Brand Arch.", "AI-Accelerated", "Cross-Border"].map((tag) => (
              <span
                key={tag}
                className="font-sans text-[9px] font-semibold tracking-wider uppercase px-3 py-1.5 bg-white border border-[#19244E]/5 text-[#19244E]/70 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FEATURED WORK ─────────────────────────────────────────────────────────────
function FeaturedWorkSection({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const activeProject = FEATURED[activeIndex]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section id="work" className="relative transition-all duration-300" style={{ backgroundColor: "#19244E" }}>
      {/* Header */}
      <div
        className="px-8 lg:px-16 py-10 flex items-center gap-6"
        style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}
      >
        <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-white/60">[03 // SELECTED WORK]</span>
        <div className="flex-1 h-px bg-white/10" />
        <span className="font-sans text-[10px] font-semibold tracking-[0.15em] text-white/60">ENTERPRISE · B2B · REGIONAL</span>
      </div>

      {/* Section intro */}
      <div className="px-8 lg:px-16 py-16 lg:py-20" style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}>
        <h2
          className="font-display font-light leading-tight text-white"
          style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)", letterSpacing: "-0.02em", maxWidth: "680px" }}
        >
          Projects that<br />
          define{" "}
          <em className="font-normal" style={{ color: C }}>how I think.</em>
        </h2>
      </div>

      {/* Showcase container */}
      <div className="px-8 lg:px-16">
        {/* Desktop Showcase */}
        <div className="hidden lg:grid lg:grid-cols-[300px_1fr_320px] gap-10 py-16 min-h-[580px]">
          {/* Left Column: Project Selector */}
          <div className="flex flex-col gap-6 justify-center pr-6 border-r border-white/10">
            {FEATURED.map((project, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={project.projectId}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className="group text-left transition-all duration-300 focus:outline-none"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="font-sans text-[10px] tracking-wider transition-colors duration-300 pt-1"
                      style={{ color: isActive ? C : "rgba(255, 255, 255, 0.3)" }}
                    >
                      [{project.num}]
                    </span>
                    <span
                      className="text-base font-semibold transition-all duration-300"
                      style={{
                        color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
                        transform: isActive ? "translateX(4px)" : "translateX(0px)",
                      }}
                    >
                      {project.name}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Center Column: Figma Canvas */}
          <div
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringCanvas(true)}
            onMouseLeave={() => setIsHoveringCanvas(false)}
            className="relative flex items-center justify-center p-12 overflow-hidden rounded-2xl bg-[#111936] border border-white/5 cursor-crosshair select-none h-full min-h-[480px]"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Figma frame label */}
            <div className="absolute top-4 left-4 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[8px] font-sans tracking-wider text-white/50">
              # Frame // {activeProject.projectId.toUpperCase()} // Zoom 100%
            </div>

            {/* Canvas Dimensions tag */}
            <div className="absolute bottom-4 right-4 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[8px] font-sans tracking-wider text-white/50">
              W: 1280 px  H: 880 px  X: 240 px  Y: 120 px
            </div>

            {/* Active Figma Frame Card */}
            <motion.div
              key={activeProject.projectId}
              initial={{ scale: 0.98, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => onOpenProject(activeProject.projectId)}
              className="relative w-full aspect-[16/11] max-w-[420px] rounded-xl border border-white/10 shadow-2xl bg-[#1c2446] p-4 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative flex-1 rounded-lg overflow-hidden border border-white/5 bg-[#19244E]/40 flex items-center justify-center">
                <ImageWithFallback
                  src={activeProject.thumb}
                  alt={`${activeProject.name} — mockup`}
                  className="w-full h-full object-cover object-center rounded-lg group-hover:scale-[1.01] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#19244E]/30" />
              </div>

              {/* Frame footer bar */}
              <div className="mt-3 flex items-center justify-between">
                <span className="font-sans text-[9px] text-white/60 tracking-wider">
                  {activeProject.num} · {activeProject.location} · {activeProject.year}
                </span>
                <span className="font-sans text-[8px] text-white/30 tracking-widest uppercase">
                  Click to open
                </span>
              </div>

              {/* Hover visual highlight */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#DB3E8C]/40 pointer-events-none transition-all duration-300" />
            </motion.div>

            {/* Custom Figma cursor follower */}
            <AnimatePresence>
              {isHoveringCanvas && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute pointer-events-none z-30"
                  style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: "translate(-2px, -2px)",
                  }}
                >
                  {/* Custom mouse cursor shape */}
                  <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0V18.1186L4.76807 13.3506L10.2606 18.8431L13.1119 15.9918L7.65306 10.533H13.1119L0 0Z" fill={C} />
                  </svg>
                  {/* User badge label */}
                  <div
                    className="ml-4 -mt-1 px-1.5 py-0.5 rounded text-[8px] font-sans font-semibold text-white shadow-md"
                    style={{ backgroundColor: C }}
                  >
                    Adina
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Project Specs */}
          <div className="flex flex-col justify-center pl-6 border-l border-white/10 min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.projectId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between h-full py-4"
              >
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-6">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[7px] font-semibold tracking-widest uppercase px-1.5 py-0.5 bg-white/10 text-white/70 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="font-sans text-[9px] font-semibold tracking-wider text-white/50 uppercase block mb-1">
                    CLIENT: {activeProject.client}
                  </span>
                  <h3 className="font-display font-semibold mb-4 leading-snug text-white" style={{ fontSize: "1.6rem", letterSpacing: "-0.01em" }}>
                    {activeProject.name}
                  </h3>
                  <p className="text-[12px] leading-relaxed mb-6 font-sans text-white/70">
                    {activeProject.headline}
                  </p>
                </div>

                {/* Metrics/Stats */}
                <div>
                  <div className="flex flex-col gap-4 mb-6">
                    {activeProject.metrics.map((m) => (
                      <div key={m.sub} className="flex items-baseline justify-between border-b border-white/5 pb-2">
                        <span className="font-sans text-[9px] font-semibold tracking-widest text-white/40 uppercase">{m.sub}</span>
                        <span className="font-display font-medium text-white text-base" style={{ color: C }}>
                          {m.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenProject(activeProject.projectId)}
                    className="group flex items-center justify-between w-full px-4 py-2.5 rounded border border-white/10 hover:border-white/30 text-white bg-white/5 transition-all duration-200"
                  >
                    <span className="font-sans text-[9px] font-semibold tracking-widest uppercase text-white/80 group-hover:text-white">
                      Open Case Study
                    </span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Showcase */}
        <div className="block lg:hidden space-y-12 py-12">
          {FEATURED.map((project) => (
            <div
              key={project.projectId}
              onClick={() => onOpenProject(project.projectId)}
              className="group relative rounded-2xl bg-[#111936] border border-white/5 p-5 cursor-pointer shadow-lg"
            >
              {/* Figma frame label */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-[8px] text-white/40 tracking-wider">
                  # Frame: {project.projectId.toUpperCase()}
                </span>
                <span className="font-sans text-[8px] text-white/40 tracking-wider">
                  [{project.num}]
                </span>
              </div>

              {/* Image Frame */}
              <div className="relative aspect-[16/11] rounded-xl border border-white/10 bg-[#1c2446] overflow-hidden mb-4 p-2 flex items-center justify-center">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={project.thumb}
                    alt={project.name}
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#19244E]/30" />
                </div>
              </div>

              {/* Metadata */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[7px] font-semibold tracking-widest uppercase px-2 py-0.5 bg-white/5 text-white/60 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="font-sans text-[8px] font-semibold text-white/40 uppercase mb-0.5">
                  {project.client}
                </p>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {project.name}
                </h3>
                <p className="text-xs leading-relaxed text-white/70 mb-4">
                  {project.headline}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                  {project.metrics.map((m) => (
                    <div key={m.sub} className="text-center">
                      <span className="font-display text-sm font-semibold block text-white" style={{ color: C }}>{m.val}</span>
                      <span className="font-sans text-[7px] text-white/40 uppercase tracking-wider">{m.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── HOW I WORK ─────────────────────────────────────────────────────────────────
const PHASES = [
  {
    num: "01", phase: "Strategic Alignment",
    sub: "Logic Deep-Dive & Business Research",
    desc: "Every engagement begins with stakeholder mapping, BRS analysis, and user research synthesis. Every pixel is anchored to a measurable business objective — not aesthetic preference.",
    tools: ["Google Docs", "Stakeholder Maps", "Excel", "BRS Docs", "Design Thinking"],
    Icon: Users,
  },
  {
    num: "02", phase: "AI-Assisted Rapid Prototyping",
    sub: "Logic Exploration & High-Fidelity Sprint",
    desc: "Using Claude AI, Gemini, and Figma Make I prototype at a pace traditional workflows cannot match. A complete design system component takes minutes, not days.",
    tools: ["Claude AI", "Gemini", "Figma Make", "VS Code", "Antigravity"],
    Icon: Zap,
  },
  {
    num: "03", phase: "Structured Handoff",
    sub: "Technical Bridge & Developer Documentation",
    desc: "I close the designer-developer gap with annotated specs, design tokens, and production-ready assets. Developers ship from my handoffs with zero clarification rounds.",
    tools: ["Figma", "Design Tokens", "Storybook", "Code Specs", "Zeroheight"],
    Icon: CheckCircle,
  },
]

function WorkflowSection() {
  const { ref, inView } = useInView()

  return (
    <section id="process" style={{ backgroundColor: N, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      {/* Header */}
      <div
        className="px-8 lg:px-16 py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
      >
        <span className="font-sans text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
          [04 // SYSTEM LOGIC]
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        <span className="font-sans text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
          3-PHASE ENGINE
        </span>
      </div>

      {/* Section headline */}
      <div
        ref={ref}
        className="px-8 lg:px-16 py-8 lg:py-12"
        style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
      >
        <h2
          className="font-display font-light leading-tight text-white"
          style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)", letterSpacing: "-0.02em" }}
        >
          A three-phase engine<br />
          <em className="font-normal" style={{ color: C }}>built for enterprise pace.</em>
        </h2>
      </div>

      {/* Phase cards — 3-column grid */}
      <div className="px-8 lg:px-16 py-10 lg:py-14 grid lg:grid-cols-3 gap-8">
        {PHASES.map((phase, i) => {
          const Icon = phase.Icon
          return (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-sans text-xs font-semibold tracking-widest text-[#DB3E8C]">
                    [{phase.num}]
                  </span>
                  <Icon size={16} className="text-white/40" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1.5">{phase.phase}</h3>
                <p className="font-sans text-[10px] tracking-widest text-white/40 uppercase mb-4">
                  {phase.sub}
                </p>
                <p className="text-sm leading-relaxed text-white/60 mb-6 font-sans">
                  {phase.desc}
                </p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/5">
                <p className="font-sans text-[8px] font-semibold tracking-widest uppercase text-white/25 mb-3">
                  [Tools & Artifacts]
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {phase.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-sans text-[9px] font-medium px-2.5 py-1 bg-white/5 text-white/50 border border-white/5 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

// ─── PROJECT ARCHIVE ───────────────────────────────────────────────────────────
const STATUS_COLOR: Record<string, string> = {
  "LIVE":          "#22c55e",
  "LIVE INTERNAL": "#3b82f6",
  "PRODUCTION":    "#10b981",
  "PROTOTYPE":     "#f59e0b",
  "ON HOLD":       "#f97316",
  "ARCHIVED":      "rgba(25,36,78,0.30)",
}

const CATEGORIES = [
  { id: "all",      label: "All",                filter: (_: Project) => true },
  { id: "fintech",  label: "FinTech & InsurTech", filter: (p: Project) => p.category.includes("FinTech") || p.category.includes("InsurTech") },
  { id: "ai",       label: "AI-Powered",          filter: (p: Project) => p.category.includes("AI") },
  { id: "live",     label: "Live / Production",   filter: (p: Project) => ["LIVE", "LIVE INTERNAL", "PRODUCTION"].includes(p.status) },
]

function ProjectArchiveSection() {
  const [activeCat, setActiveCat] = useState("all")
  const { ref, inView } = useInView()
  const activeDef = CATEGORIES.find((c) => c.id === activeCat)!
  const filtered = PROJECTS.filter(activeDef.filter)

  return (
    <section id="archive" style={{ backgroundColor: S, borderTop: `1px solid ${HAIR}` }}>
      {/* Header */}
      <div
        ref={ref}
        className="px-8 lg:px-16 py-10 flex items-center gap-6"
        style={{ borderBottom: `1px solid rgba(25, 36, 78, 0.05)` }}
      >
        <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-[#19244E]/60">[05 // DATA INDEX]</span>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(25, 36, 78, 0.05)" }} />
        <span className="font-sans text-[10px] font-semibold tracking-[0.15em] text-[#19244E]/60">PROJECT ARCHIVE</span>
      </div>

      {/* Count + filter row */}
      <div
        className="px-8 lg:px-16 py-8 flex flex-col lg:flex-row lg:items-center gap-6 justify-between"
        style={{ borderBottom: `1px solid rgba(25, 36, 78, 0.05)` }}
      >
        <div className="flex items-baseline gap-3">
          <span
            className="font-display font-light text-5xl"
            style={{ color: N, letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            {filtered.length}
          </span>
          <span className="font-sans text-[10px] font-semibold tracking-widest text-[#19244E]/60 uppercase">
            of {PROJECTS.length} projects
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className="flex items-center gap-1.5 px-5 py-2.5 font-sans text-[10px] font-semibold tracking-widest uppercase transition-all duration-150 focus:outline-none rounded-full cursor-pointer"
                style={{
                  backgroundColor: isActive ? N : W,
                  color: isActive ? W : `${N}DD`,
                  border: `1px solid ${isActive ? N : "rgba(25, 36, 78, 0.08)"}`,
                  boxShadow: isActive ? "0 4px 12px -2px rgba(25, 36, 78, 0.12)" : "none"
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Index table — list view */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCat}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Table header */}
          <div
            className="hidden lg:grid px-8 lg:px-16 py-4"
            style={{
              gridTemplateColumns: "50px 1.2fr 1fr 140px 60px 140px 1.5fr",
              borderBottom: `1px solid rgba(25, 36, 78, 0.05)`,
            }}
          >
            {["#", "Project", "Client / System", "Market", "Year", "Status", "Category & Scope"].map((col) => (
              <span key={col} className="font-sans text-[9px] font-semibold tracking-[0.15em] uppercase" style={{ color: `${N}65` }}>
                {col}
              </span>
            ))}
          </div>

          {/* Table rows */}
          <div className="pb-24 lg:pb-16">
            {filtered.map((project, i) => {
              const statusColor = STATUS_COLOR[project.status] ?? `${N}80`
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: Math.min(i * 0.025, 0.4), duration: 0.3 }}
                  className="group"
                  style={{ borderBottom: `1px solid rgba(25, 36, 78, 0.04)` }}
                >
                  {/* Desktop row */}
                  <div
                    className="hidden lg:grid items-start px-8 lg:px-16 py-6 transition-all duration-150 hover:bg-white"
                    style={{ gridTemplateColumns: "50px 1.2fr 1fr 140px 60px 140px 1.5fr", cursor: "default" }}
                  >
                    <span className="font-sans text-xs pt-0.5" style={{ color: `${N}50` }}>
                      {String(project.id).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold pr-4 text-[#19244E]">{project.name}</p>
                    <p className="text-xs pr-3 text-[#19244E]/80">{project.client}</p>
                    <span className="font-sans text-[10px] font-semibold text-[#19244E]/70">
                      [{project.market}]
                    </span>
                    <span className="font-sans text-xs text-[#19244E]/60">{project.year}</span>
                    
                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: statusColor }}></span>
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: statusColor }}></span>
                      </span>
                      <span className="font-sans text-[9px] font-bold tracking-widest uppercase" style={{ color: statusColor }}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="pl-2">
                      <span
                        className="font-sans text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 inline-block mb-2 bg-[#19244E]/5 text-[#19244E]/80 rounded"
                      >
                        {project.category}
                      </span>
                      <p className="text-xs leading-relaxed text-[#19244E]/70">{project.scope}</p>
                    </div>
                  </div>

                  {/* Mobile row */}
                  <div className="lg:hidden px-6 py-6 transition-colors duration-150 hover:bg-white">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-sans text-[10px]" style={{ color: `${N}50` }}>{String(project.id).padStart(2, "0")}</span>
                          <span className="font-sans text-[9px] font-semibold" style={{ color: `${N}70` }}>[{project.market}]</span>
                          <span className="font-sans text-[10px]" style={{ color: `${N}60` }}>{project.year}</span>
                        </div>
                        <p className="text-sm font-semibold mb-0.5 text-[#19244E]">{project.name}</p>
                        <p className="text-xs text-[#19244E]/80">{project.client}</p>
                      </div>
                      
                      <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                        <span className="font-sans text-[9px] font-semibold uppercase tracking-wider" style={{ color: statusColor }}>{project.status}</span>
                      </div>
                    </div>
                    <span
                      className="font-sans text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 inline-block mb-2 bg-[#19244E]/5 text-[#19244E]/80 rounded"
                    >
                      {project.category}
                    </span>
                    <p className="text-xs leading-relaxed text-[#19244E]/70">{project.scope}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView()
  return (
    <section
      id="contact"
      style={{ backgroundColor: W, borderTop: `1px solid ${HAIR}` }}
    >
      {/* Header */}
      <div
        className="px-8 lg:px-16 py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid ${HAIR}` }}
      >
        <MonoTag>[06 // CONTACT]</MonoTag>
        <div className="flex-1 h-px" style={{ backgroundColor: HAIR }} />
        <MonoTag>OPEN TO SENIOR IC & LEAD ROLES</MonoTag>
      </div>

      <div ref={ref} className="grid lg:grid-cols-[1fr_1px_480px]" style={{ minHeight: "480px" }}>
        {/* Left: headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col justify-center px-8 lg:px-16 py-16"
          style={{ borderRight: `1px solid ${HAIR}` }}
        >
          <MonoTag>[REGION: SG / MY / REMOTE-FIRST]</MonoTag>
          <h2
            className="font-display font-light leading-[0.9] my-8"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", color: N, letterSpacing: "-0.025em" }}
          >
            Ready to build<br />something<br />
            <em className="font-normal" style={{ color: C }}>significant?</em>
          </h2>
          <p className="text-sm leading-relaxed mb-10 max-w-[380px]" style={{ color: `${N}EE`, lineHeight: 1.8 }}>
            I'm open to senior IC and lead roles in Singapore, Malaysia, and remote-first regional opportunities. Happy to talk about your design challenges first.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:adinagayo@gmail.com"
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-85"
              style={{ backgroundColor: N, borderRadius: "4px" }}
            >
              <Mail size={14} /> Say Hello <ArrowRight size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/adinafayzagayo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-150 hover:bg-[#19244E]/5"
              style={{ border: `1px solid ${HAIR}`, color: N, borderRadius: "4px" }}
            >
              <ExternalLink size={14} /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Vertical divider */}
        <div className="hidden lg:block" style={{ backgroundColor: HAIR }} />

        {/* Right: contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="flex flex-col justify-center"
          style={{ backgroundColor: S }}
        >
          {[
            { label: "Email", value: "adinagayo@gmail.com", sub: "Primary contact", href: "mailto:adinagayo@gmail.com" },
            { label: "Location", value: "Jakarta, Indonesia", sub: "Open for relocation" },
            { label: "Availability", value: "Open to new opportunities", sub: "" },
            { label: "LinkedIn", value: "/in/adinafayzagayo", sub: "Portfolio & recommendations", href: "https://www.linkedin.com/in/adinafayzagayo/" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="px-10 py-8"
              style={{ borderBottom: i < 3 ? `1px solid ${HAIR}` : "none" }}
            >
              <MonoTag>[{item.label.toUpperCase()}]</MonoTag>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.label === "LinkedIn" ? "_blank" : undefined}
                  rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="block text-base font-medium mt-2 mb-0.5 hover:opacity-75 transition-opacity"
                  style={{ color: N }}
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-base font-medium mt-2 mb-0.5" style={{ color: N }}>{item.value}</p>
              )}
              {item.sub && <p className="text-xs" style={{ color: `${N}AA` }}>{item.sub}</p>}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="px-8 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: W }}
    >
      <MonoTag>© 2026 ADINA FAYZA GAYO · STRATEGIC PRODUCT DESIGNER</MonoTag>
      <MonoTag>M.MT · ITS SURABAYA · SG / MY / ID</MonoTag>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "sunway-case" | "gegi-case" | "tng-case" | "archery-case" | "election-case" | "anlene-case" | "bijakwang-case">("home")
  const activeSection = useScrollSpy(["home", "work", "process", "archive", "contact"])

  if (currentView === "bijakwang-case") {
    return (
      <BijakWangCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
        onNext={() => { setCurrentView("gegi-case"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { setCurrentView("anlene-case"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "anlene-case") {
    return (
      <AnleneCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
        onNext={() => { setCurrentView("bijakwang-case"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { setCurrentView("election-case"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "election-case") {
    return (
      <ElectionCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
        onNext={() => { setCurrentView("anlene-case"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { setCurrentView("archery-case"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "archery-case") {
    return (
      <ProArcheryCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
        onNext={() => { setCurrentView("election-case"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { setCurrentView("tng-case"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "tng-case") {
    return (
      <TngCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
        onNext={() => { setCurrentView("archery-case"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { setCurrentView("gegi-case"); window.scrollTo({ top: 0 }) }}
      />
    )
  }

  if (currentView === "gegi-case") {
    return (
      <GegiCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
        onNext={() => { setCurrentView("tng-case"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { setCurrentView("bijakwang-case"); window.scrollTo({ top: 0 }) }}
      />
    )
  }

  if (currentView === "sunway-case") {
    return (
      <SunwayCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
      />
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: S }}>
      <HeroSection />
      <FeaturedWorkSection onOpenProject={(id) => {
        if (id === "gegi") setCurrentView("gegi-case")
        if (id === "tng") setCurrentView("tng-case")
        if (id === "archery") setCurrentView("archery-case")
        if (id === "election") setCurrentView("election-case")
        if (id === "anlene") setCurrentView("anlene-case")
        if (id === "bijakwang") setCurrentView("bijakwang-case")
      }} />
      <WorkflowSection />
      <ProjectArchiveSection />
      <ContactSection />
      <Footer />
      <FloatingDock activeSection={activeSection} />
    </div>
  )
}
