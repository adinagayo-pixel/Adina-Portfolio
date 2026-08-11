import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react"
import adinaPhotoAbout from "@/imports/ChatGPT_Image_Aug_3__2026__03_31_22_PM.png"
import projectThumb1 from "@/imports/image-7.png"
import projectThumb2 from "@/imports/image-8.png"
import projectThumb3 from "@/imports/image-9.png"
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
import ProjectDetail from "./components/ProjectDetail"
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
    num: "01", name: "Insurance Agent Portal", client: "Grab Financial Group",
    location: "SG", year: "2024", tags: ["Cross-Border", "Enterprise"],
    headline: "Rebuilding trust at scale for 12,000+ insurance agents across SEA.",
    metrics: [{ val: "12K", sub: "Agents Served" }, { val: "45%", sub: "Faster Onboarding" }, { val: "Live", sub: "In Production" }],
    projectId: "grab",
    thumb: projectThumb1,
  },
  {
    num: "02", name: "Multi-Brand Architecture", client: "Touch 'n Go × GEGM",
    location: "MY", year: "2024", tags: ["Multi-Brand", "B2B"],
    headline: "One component base. Three distinct brand identities. Zero visual leakage.",
    metrics: [{ val: "3", sub: "Brand Identities" }, { val: "60%", sub: "Dev Velocity ↑" }, { val: "Tokens", sub: "Token-based" }],
    projectId: "tng",
    thumb: projectThumb2,
  },
  {
    num: "03", name: "AI-Accelerated Workflow", client: "M.MT Thesis — ITS Surabaya",
    location: "ID", year: "2024", tags: ["AI-Assisted", "Research"],
    headline: "A documented methodology that cut delivery cycles by 70% across three enterprise products.",
    metrics: [{ val: "70%", sub: "Faster Delivery" }, { val: "3", sub: "Product Cycles" }, { val: "M.MT", sub: "Published" }],
    projectId: "ai",
    thumb: projectThumb3,
  },
  {
    num: "04", name: "B2C E-Commerce & Admin POS", client: "Pro Archery × Jakarta",
    location: "ID", year: "2025", tags: ["AI-Assisted", "E-Commerce"],
    headline: "24-hour POC delivery using AI-first prompt-to-code — 4 portals, zero wireframes.",
    metrics: [{ val: "24h", sub: "POC Delivery" }, { val: "4", sub: "Portals Built" }, { val: "AI", sub: "First Workflow" }],
    projectId: "archery",
    thumb: projectThumb4,
  },
  {
    num: "05", name: "National Election Monitoring System", client: "Indonesian Political Party",
    location: "ID", year: "2024", tags: ["Public Sector", "Civic Tech"],
    headline: "820,000+ TPS polling stations. 38 provinces. One 48-hour critical window.",
    metrics: [{ val: "820K+", sub: "TPS Data Points" }, { val: "38", sub: "Provinces" }, { val: "Solo", sub: "1-Person Team" }],
    projectId: "election",
    thumb: projectThumb5,
  },
  {
    num: "06", name: "Anlene Health Passport", client: "Fonterra Indonesia × Anlene",
    location: "ID", year: "2023", tags: ["Health Tech", "Field Sales"],
    headline: "Clinical diagnostics → instant PDF health passport, delivered via WhatsApp at the event booth.",
    metrics: [{ val: "2", sub: "Medical Devices" }, { val: "4-tier", sub: "Health Matrix" }, { val: "3mo", sub: "Sprint Delivery" }],
    projectId: "anlene",
    thumb: projectThumb6,
  },
  {
    num: "07", name: "#BijakWang Challenge", client: "mySalam Malaysia × myKawan",
    location: "MY", year: "2025", tags: ["Gamification", "Civic Tech"],
    headline: "100,000 concurrent players. Kahoot-style scoring. Gemini AI audio. Financial literacy at national scale.",
    metrics: [{ val: "100K", sub: "Live Players" }, { val: "3-Player", sub: "Squad Teams" }, { val: "AI", sub: "Audio Engine" }],
    projectId: "bijakwang",
    thumb: projectThumb1,
  },
]

const PROJECTS: Project[] = [
  { id: 1,  name: "Grab Data Pipeline",    client: "Grab × GEGM × FTI",           market: "Regional (SG/MY/ID)", year: 2025, status: "LIVE INTERNAL", category: "Enterprise B2B / FinTech",    scope: "Tri-party data exchange flow & middleware logic mapping across Grab, insurance, and FTI." },
  { id: 2,  name: "OCBC Insurance",        client: "OCBC Bank × GEGM",             market: "Regional (SG/MY)",    year: 2026, status: "LIVE",          category: "Banking & InsurTech",         scope: "End-to-end insurance acquisition flow built with a custom standalone banking UI Kit from scratch." },
  { id: 3,  name: "myKawan AI Engine",     client: "myKawan Internal System",      market: "Malaysia",            year: 2025, status: "PRODUCTION",    category: "AI / Marketing Automation",   scope: "Internal AI-powered CMS tool for automated marketing copy, articles, images, and media generation." },
  { id: 4,  name: "Teman E-Commerce",      client: "Teman Retail System",          market: "Indonesia",           year: 2025, status: "PROTOTYPE",     category: "AI & Retail E-Commerce",      scope: "AI-driven product recommendation engine and personalized purchase flow integration." },
  { id: 5,  name: "Samaloop",              client: "Samaloop",                     market: "Indonesia",           year: 2025, status: "LIVE",          category: "EdTech & Marketplace",        scope: "Corporate website and public speaking coach directory booking platform." },
  { id: 6,  name: "Family Moo",            client: "Fonterra Indonesia",           market: "Indonesia",           year: 2024, status: "LIVE",          category: "FMCG & Loyalty Portal",       scope: "Customer loyalty management and points redemption portal for Fonterra's consumer ecosystem." },
  { id: 7,  name: "Telescope Indonesia",   client: "Telescope Indonesia",          market: "Indonesia",           year: 2024, status: "LIVE",          category: "B2B Industrial Catalog",      scope: "Digital product catalog and technical specification showcase for specialized equipment." },
  { id: 8,  name: "YAMET Center",          client: "YAMET Child Development",      market: "Indonesia",           year: 2022, status: "LIVE",          category: "Healthcare Portal",           scope: "Corporate website and service directory for child development clinics across Indonesia." },
  { id: 9,  name: "KCIC × Jasindo",        client: "Kereta Cepat Indonesia China", market: "Indonesia",           year: 2026, status: "ON HOLD",       category: "Public Transit InsurTech",    scope: "Integrated passenger travel insurance purchasing flow with Jasindo." },
  { id: 10, name: "Ada Polisi",            client: "Internal Public Sector",       market: "Indonesia",           year: 2022, status: "ARCHIVED",      category: "Public Sector Mobile App",    scope: "Internal mobile system for law enforcement data entry and reporting." },
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
      className="font-mono text-[10px] font-semibold tracking-wider uppercase"
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
            <span className="font-mono text-[8px] font-semibold tracking-widest uppercase">
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
        className="flex items-center justify-between px-8 lg:px-16 py-5"
        style={{ borderBottom: `1px solid ${HAIR}` }}
      >
        <span className="font-mono text-[11px] font-semibold tracking-widest" style={{ color: N }}>
          AFG<span style={{ color: C }}> ·</span> PORTFOLIO 2026
        </span>
        <div className="flex items-center gap-3">
          <MonoTag>SG / MY / ID</MonoTag>
          <a
            href="/resume-adina-fayza-gayo.pdf"
            download
            className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase px-4 py-2 transition-colors duration-150"
            style={{ border: `1px solid ${HAIR}`, color: `${N}DD`, borderRadius: "4px" }}
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
            className="font-mono text-[10px] font-semibold tracking-widest uppercase px-4 py-2 transition-colors duration-150"
            style={{ border: `1px solid ${N}`, color: N, borderRadius: "4px" }}
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
      <div className="flex-1 grid lg:grid-cols-[1fr_1px_480px] relative">
        {/* Left: editorial text column */}
        <div className="flex flex-col justify-between px-8 lg:px-16 py-14 lg:py-20">
          {/* ID tag */}
          <div>
            <div className="mb-10 lg:mb-16">
              <MonoTag>[AFG-2026 // SENIOR STRATEGIC DESIGNER]</MonoTag>
            </div>

            {/* Big editorial headline */}
            <h1
              className="font-display font-light leading-[0.92] mb-8"
              style={{ fontSize: "clamp(3.2rem, 6.5vw, 6rem)", color: N, letterSpacing: "-0.02em" }}
            >
              Enterprise<br />
              <em className="font-normal not-italic" style={{ color: C }}>Product</em><br />
              <span className="font-light">Design.</span>
            </h1>

            <p
              className="font-mono text-[10px] font-semibold tracking-widest uppercase mb-4"
              style={{ color: C }}
            >
              Specializing in Enterprise Systems, Multi-Brand Architecture & API-Driven Workflows.
            </p>
            <p
              className="text-base leading-relaxed max-w-[420px] mb-10"
              style={{ color: `${N}DD`, fontWeight: 400, lineHeight: 1.75 }}
            >
              Strategic Product Designer with an M.MT background, specializing in Enterprise B2B and multi-brand platforms. I design cross-border fintech systems and AI-accelerated workflows operating at regional scale across Singapore, Malaysia, and Indonesia.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-85"
                style={{ backgroundColor: N, borderRadius: "4px" }}
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Work <ArrowRight size={14} />
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-150"
                style={{ border: `1px solid ${HAIR}`, color: N, borderRadius: "4px" }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail size={14} /> Get In Touch
              </button>
            </div>
          </div>

          {/* Bottom status row */}
          <div
            className="mt-16 pt-5 flex items-center gap-6 flex-wrap"
            style={{ borderTop: `1px solid ${HAIR}` }}
          >
            {[
              { label: "Based in", val: "Surabaya, ID" },
              { label: "Open to", val: "SG · MY · Remote" },
              { label: "Available", val: "Q3 2026" },
            ].map(({ label, val }) => (
              <div key={label}>
                <MonoTag>{label}</MonoTag>
                <p className="text-sm font-medium mt-0.5" style={{ color: N }}>{val}</p>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }} />
              <MonoTag accent>Open to opportunities</MonoTag>
            </div>
          </div>
        </div>

        {/* Vertical hairline divider */}
        <div className="hidden lg:block" style={{ backgroundColor: HAIR }} />

        {/* Right: photo + cycling greeting */}
        <div
          className="relative flex flex-col overflow-hidden"
          style={{ backgroundColor: S, borderLeft: `1px solid ${HAIR}` }}
        >
          {/* Greeting ticker — top strip */}
          <div
            className="flex items-center justify-between px-8 py-4 flex-shrink-0"
            style={{ borderBottom: `1px solid ${HAIR}` }}
          >
            <MonoTag>[{LANGS[tick]}]</MonoTag>
            <AnimatePresence mode="wait">
              <motion.span
                key={tick}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-display text-lg font-light"
                style={{ color: N, letterSpacing: "-0.01em" }}
              >
                {HELLOS[tick]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Photo */}
          <div className="flex-1 flex items-center justify-center px-8 py-8">
            <div
              className="relative overflow-hidden w-full"
              style={{ maxWidth: "210px", aspectRatio: "3/4", borderRadius: "4px", border: `1px solid ${HAIR}` }}
            >
              <ImageWithFallback
                src={adinaPhotoAbout}
                alt="Adina Fayza Gayo — Senior Product Designer"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-4"
                style={{ background: `linear-gradient(to top, ${N}EE 0%, transparent 100%)` }}
              >
                <p className="font-display font-light text-base text-white mb-0.5" style={{ letterSpacing: "-0.01em" }}>
                  Adina Fayza Gayo
                </p>
                <MonoTag>Senior Product Designer</MonoTag>
              </div>
            </div>
          </div>

          {/* Credential strip */}
          <div
            className="flex items-center gap-4 px-8 py-4 flex-shrink-0 flex-wrap"
            style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: W }}
          >
            {["Enterprise B2B", "Multi-Brand Arch.", "AI-Accelerated", "Cross-Border"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] font-semibold tracking-wider uppercase"
                style={{ color: `${N}BB` }}
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
  const { ref, inView } = useInView(0.06)

  return (
    <section id="work" style={{ backgroundColor: W, borderTop: `1px solid ${HAIR}` }}>
      {/* Header */}
      <div
        ref={ref}
        className="px-8 lg:px-16 py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid ${HAIR}` }}
      >
        <MonoTag>[03 // SELECTED WORK]</MonoTag>
        <div className="flex-1 h-px" style={{ backgroundColor: HAIR }} />
        <MonoTag>ENTERPRISE · B2B · REGIONAL</MonoTag>
      </div>

      {/* Section intro */}
      <div className="px-8 lg:px-16 py-12 lg:py-16" style={{ borderBottom: `1px solid ${HAIR}` }}>
        <h2
          className="font-display font-light leading-tight"
          style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)", color: N, letterSpacing: "-0.02em", maxWidth: "680px" }}
        >
          Three projects that<br />
          define{" "}
          <em className="font-normal" style={{ color: C }}>how I think.</em>
        </h2>
      </div>

      {/* Project rows */}
      {FEATURED.map((project, i) => (
        <motion.div
          key={project.num}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid lg:grid-cols-[560px_1px_1fr] group cursor-pointer"
          style={{ borderBottom: `1px solid ${HAIR}` }}
          onClick={() => onOpenProject(project.projectId)}
        >
          {/* Image side — always left */}
          <div
            className="relative overflow-hidden"
            style={{ minHeight: "360px", backgroundColor: S }}
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
            >
              <ImageWithFallback
                src={project.thumb}
                alt={`${project.name} — product mockup`}
                className="w-full h-full object-cover object-center"
                style={{ filter: "grayscale(8%)" }}
              />
            </motion.div>
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${N}CC 0%, transparent 65%)` }}
            />
            <span
              className="absolute top-8 left-8 font-display font-light select-none pointer-events-none"
              style={{ fontSize: "clamp(5rem, 8vw, 8rem)", color: "rgba(255,255,255,0.13)", lineHeight: 1, letterSpacing: "-0.04em" }}
            >
              {project.num}
            </span>
            <div
              className="absolute top-8 right-8 px-3 py-1.5"
              style={{ backgroundColor: "rgba(0,0,0,0.45)", borderRadius: "3px" }}
            >
              <MonoTag>[{project.location} · {project.year}]</MonoTag>
            </div>
          </div>

          {/* Hairline divider */}
          <div style={{ backgroundColor: HAIR }} />

          {/* Content side */}
          <div className="flex flex-col justify-between px-10 py-12">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1.5"
                    style={{ border: `1px solid ${HAIR}`, color: `${N}CC`, borderRadius: "3px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-mono text-[10px] font-medium tracking-widest uppercase mb-3" style={{ color: `${N}AA` }}>
                {project.client}
              </p>
              <h3
                className="font-display font-light mb-5 leading-tight"
                style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", color: N, letterSpacing: "-0.015em" }}
              >
                {project.name}
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: `${N}EE`, lineHeight: 1.75 }}>
                {project.headline}
              </p>
            </div>

            {/* Metrics row */}
            <div>
              <div className="flex flex-wrap gap-8 mb-8">
                {project.metrics.map((m) => (
                  <div key={m.sub}>
                    <p className="font-display font-light mb-0.5" style={{ fontSize: "1.5rem", color: N, letterSpacing: "-0.02em" }}>
                      {m.val}
                    </p>
                    <MonoTag>{m.sub}</MonoTag>
                  </div>
                ))}
              </div>
              <Hairline className="mb-6" />
              <div className="flex items-center justify-between">
                <MonoTag>View Case Study</MonoTag>
                <div
                  className="w-8 h-8 flex items-center justify-center transition-colors duration-200 group-hover:bg-[#19244E] group-hover:text-white"
                  style={{ border: `1px solid ${HAIR}`, borderRadius: "4px", color: N }}
                >
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
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
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="process" style={{ backgroundColor: N, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
      {/* Header */}
      <div
        className="px-8 lg:px-16 py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
      >
        <span className="font-mono text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
          [04 // SYSTEM LOGIC]
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        <span className="font-mono text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
          3-PHASE ENGINE
        </span>
      </div>

      {/* Section headline */}
      <div
        ref={ref}
        className="px-8 lg:px-16 py-12 lg:py-16"
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

      {/* Phase cards — vertical stack */}
      {PHASES.map((phase, i) => {
        const isOpen = expanded === phase.num
        const Icon = phase.Icon
        return (
          <motion.div
            key={phase.num}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
          >
            {/* Phase header — always visible, clickable */}
            <button
              className="w-full flex items-center gap-6 px-8 lg:px-16 py-8 text-left transition-colors duration-150 focus:outline-none"
              style={{
                backgroundColor: isOpen ? "rgba(219,62,140,0.06)" : "transparent",
              }}
              onClick={() => setExpanded(isOpen ? null : phase.num)}
            >
              <span
                className="font-mono text-[10px] font-semibold tracking-widest flex-shrink-0"
                style={{ color: isOpen ? C : "rgba(255,255,255,0.25)" }}
              >
                [{phase.num}]
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-white mb-0.5">{phase.phase}</p>
                <p className="font-mono text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {phase.sub}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <Icon size={14} style={{ color: isOpen ? C : "rgba(255,255,255,0.3)" }} />
                <ChevronRight
                  size={14}
                  style={{
                    color: isOpen ? C : "rgba(255,255,255,0.3)",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.25s",
                  }}
                />
              </div>
            </button>

            {/* Expandable detail */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="grid lg:grid-cols-[1fr_1px_360px] px-8 lg:px-16 pb-10"
                    style={{ paddingTop: "2px" }}
                  >
                    <div className="py-6">
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "520px" }}>
                        {phase.desc}
                      </p>
                    </div>
                    <div className="hidden lg:block mx-12" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                    <div className="py-6">
                      <p className="font-mono text-[9px] font-semibold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>
                        [TOOLS & ARTIFACTS]
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {phase.tools.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-[10px] font-medium px-3 py-1.5"
                            style={{
                              border: `1px solid rgba(219,62,140,0.25)`,
                              color: "rgba(255,255,255,0.55)",
                              borderRadius: "3px",
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
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
        className="px-8 lg:px-16 py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid ${HAIR}` }}
      >
        <MonoTag>[05 // DATA INDEX]</MonoTag>
        <div className="flex-1 h-px" style={{ backgroundColor: HAIR }} />
        <MonoTag>PROJECT ARCHIVE</MonoTag>
      </div>

      {/* Count + filter row */}
      <div
        className="px-8 lg:px-16 py-6 flex flex-col lg:flex-row lg:items-center gap-4 justify-between"
        style={{ borderBottom: `1px solid ${HAIR}` }}
      >
        <div className="flex items-baseline gap-3">
          <span
            className="font-display font-light"
            style={{ fontSize: "2.8rem", color: N, letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            {filtered.length}
          </span>
          <MonoTag>of {PROJECTS.length} projects</MonoTag>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className="flex items-center gap-1.5 px-4 py-2 font-mono text-[10px] font-semibold tracking-widest uppercase transition-all duration-150 focus:outline-none"
                style={{
                  backgroundColor: isActive ? N : W,
                  color: isActive ? W : `${N}DD`,
                  border: `1px solid ${isActive ? N : HAIR}`,
                  borderRadius: "3px",
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
            className="hidden lg:grid px-8 lg:px-16 py-3"
            style={{
              gridTemplateColumns: "40px 1fr 200px 130px 56px 130px 1fr",
              borderBottom: `1px solid ${HAIR}`,
              backgroundColor: W,
            }}
          >
            {["#", "Project", "Client / System", "Market", "Year", "Status", "Category & Scope"].map((col) => (
              <span key={col} className="font-mono text-[9px] font-semibold tracking-widest uppercase" style={{ color: `${N}80` }}>
                {col}
              </span>
            ))}
          </div>

          {/* Table rows */}
          <div className="pb-24 lg:pb-12">
            {filtered.map((project, i) => {
              const statusColor = STATUS_COLOR[project.status] ?? `${N}80`
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: Math.min(i * 0.025, 0.4), duration: 0.3 }}
                  className="group"
                  style={{ borderBottom: `1px solid ${HAIR}` }}
                >
                  {/* Desktop row */}
                  <div
                    className="hidden lg:grid items-start px-8 lg:px-16 py-4 transition-colors duration-100 hover:bg-white"
                    style={{ gridTemplateColumns: "40px 1fr 200px 130px 56px 130px 1fr", cursor: "default" }}
                  >
                    <span className="font-mono text-[10px] pt-0.5" style={{ color: `${N}DD` }}>
                      {String(project.id).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-medium pr-4" style={{ color: N }}>{project.name}</p>
                    <p className="text-xs pr-3" style={{ color: `${N}CC` }}>{project.client}</p>
                    <span className="font-mono text-[9px] font-semibold" style={{ color: `${N}AA` }}>
                      [{project.market}]
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: `${N}AA` }}>{project.year}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: statusColor }} />
                      <span className="font-mono text-[9px] font-semibold tracking-wider" style={{ color: statusColor }}>
                        {project.status}
                      </span>
                    </div>
                    <div className="pl-2">
                      <span
                        className="font-mono text-[8px] font-semibold tracking-widest uppercase px-2 py-0.5 inline-block mb-1.5"
                        style={{ border: `1px solid ${HAIR}`, color: `${N}AA`, borderRadius: "2px" }}
                      >
                        {project.category}
                      </span>
                      <p className="text-[11px] leading-snug" style={{ color: `${N}BB` }}>{project.scope}</p>
                    </div>
                  </div>

                  {/* Mobile row */}
                  <div className="lg:hidden px-6 py-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-[9px]" style={{ color: `${N}DD` }}>{String(project.id).padStart(2, "0")}</span>
                          <span className="font-mono text-[9px] font-semibold" style={{ color: `${N}AA` }}>[{project.market}]</span>
                          <span className="font-mono text-[9px]" style={{ color: `${N}99` }}>{project.year}</span>
                        </div>
                        <p className="text-sm font-medium mb-0.5" style={{ color: N }}>{project.name}</p>
                        <p className="text-xs" style={{ color: `${N}BB` }}>{project.client}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor }} />
                        <span className="font-mono text-[9px] font-semibold" style={{ color: statusColor }}>{project.status}</span>
                      </div>
                    </div>
                    <span
                      className="font-mono text-[8px] font-semibold tracking-widest uppercase px-2 py-0.5 inline-block mb-1"
                      style={{ border: `1px solid ${HAIR}`, color: `${N}AA`, borderRadius: "2px" }}
                    >
                      {project.category}
                    </span>
                    <p className="text-[11px] leading-snug" style={{ color: `${N}BB` }}>{project.scope}</p>
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
              href="mailto:adina.gayo@design.id"
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-85"
              style={{ backgroundColor: N, borderRadius: "4px" }}
            >
              <Mail size={14} /> Say Hello <ArrowRight size={14} />
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-150"
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
            { label: "Email", value: "adina.gayo@design.id", sub: "Primary contact" },
            { label: "Location", value: "Surabaya, Indonesia", sub: "Open to SG · MY relocation" },
            { label: "Availability", value: "Q3 2026", sub: "Open to new opportunities" },
            { label: "LinkedIn", value: "/in/adinagayo", sub: "Portfolio & recommendations" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="px-10 py-8"
              style={{ borderBottom: i < 3 ? `1px solid ${HAIR}` : "none" }}
            >
              <MonoTag>[{item.label.toUpperCase()}]</MonoTag>
              <p className="text-base font-medium mt-2 mb-0.5" style={{ color: N }}>{item.value}</p>
              <p className="text-xs" style={{ color: `${N}AA` }}>{item.sub}</p>
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
  const [currentView, setCurrentView] = useState<"home" | "project-detail" | "sunway-case" | "gegi-case" | "tng-case" | "archery-case" | "election-case" | "anlene-case" | "bijakwang-case">("home")
  const activeSection = useScrollSpy(["home", "work", "process", "archive", "contact"])

  if (currentView === "bijakwang-case") {
    return (
      <BijakWangCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "anlene-case") {
    return (
      <AnleneCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "election-case") {
    return (
      <ElectionCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "archery-case") {
    return (
      <ProArcheryCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "tng-case") {
    return (
      <TngCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
      />
    )
  }

  if (currentView === "gegi-case") {
    return (
      <GegiCase
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
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

  if (currentView === "project-detail") {
    return (
      <ProjectDetail
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
      />
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: S }}>
      <HeroSection />
      <FeaturedWorkSection onOpenProject={(id) => {
        if (id === "grab") setCurrentView("gegi-case")
        if (id === "tng") setCurrentView("tng-case")
        if (id === "ai") setCurrentView("project-detail")
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
