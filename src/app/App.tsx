import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence, useScroll, useTransform } from "motion/react"
import adinaPhotoAbout from "@/imports/Foto At Work.png"
import adinaPhotoLife from "@/imports/Foto In Life.jpg"
import afgLogo from "@/imports/LOGO.png"
import gettyBgVideo from "@/imports/GettyImages-1152749158.mp4"
import projectThumb1 from "@/imports/image-7.png"
import projectThumb2 from "@/imports/image-8.png"
import projectThumb4 from "@/imports/image-7.png"
import projectThumb5 from "@/imports/image-9.png"
import projectThumb6 from "@/imports/image-8.png"
import mykawan1 from "@/imports/mykawan1.png"
import mykawan2 from "@/imports/mykawan2.png"
import mykawan3 from "@/imports/mykawan3.png"
import mykawan4 from "@/imports/mykawan4.png"
import mykawan5 from "@/imports/mykawan5.png"
import anlene0 from "@/imports/anlene.png"
import anlene1 from "@/imports/anlene1.png"
import anlene2 from "@/imports/anlene2.png"
import anlene3 from "@/imports/anlene3.png"
import anlene4 from "@/imports/anlene4.png"
import anlene5 from "@/imports/anlene5.png"
import ci1 from "@/imports/CI1.png"
import ci2 from "@/imports/CI2.png"
import ci3 from "@/imports/CI3.png"
import ci4 from "@/imports/CI4.png"
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import {
  Home, Briefcase, Layers, Archive, Mail,
  ArrowRight, ExternalLink, Globe, Zap,
  Users, CheckCircle, Coins, Bot, LayoutGrid,
  ArrowUpRight, ChevronRight, MousePointer2, Plus, Linkedin, Download,
} from "lucide-react"
import SunwayCase from "./components/SunwayCase"
import GegiCase from "./components/GegiCase"
import TngCase from "./components/TngCase"
import ProArcheryCase from "./components/ProArcheryCase"
import ElectionCase from "./components/ElectionCase"
import AnleneCase from "./components/AnleneCase"
import BijakWangCase from "./components/BijakWangCase"
import MyArcheryCase from "./components/MyArcheryCase"
import BackofficeCase from "./components/BackofficeCase"
import AboutMe from "./components/AboutMe"

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

const WHATSAPP_PHONE = "6289630441118";

export function getWhatsAppLink(projectName: string) {
  const message = `Halo Dina, saya lihat portfolio kamu dan tertarik dengan proyek ${projectName}. Boleh kita diskusi lebih lanjut?`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppLink() {
  const message = `Halo Dina, saya lihat portofolio kamu dan tertarik untuk berdiskusi lebih lanjut.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED = [
  {
    num: "01", name: "Seamless Micro-Insurance Integration", client: "Touch 'n Go × GEGM",
    location: "MY", year: "2024", tags: ["PWA / SSO", "eKYC Data Mapping", "B2C / FinTech"],
    role: "Lead Product Designer & Logic Architect",
    headline: "An embedded Progressive Web Application (PWA) architecture built inside Malaysia's leading e-wallet ecosystem, integrating native SSO and eKYC.",
    metrics: [{ val: "V5", sub: "1 Final Release" }, { val: "3mo", sub: "Timeline" }, { val: "RM0", sub: "PTV Checkout" }],
    projectId: "tng",
    thumb: projectThumb2,
    screens: [
      { src: projectThumb2, label: "01 · WALLET DASHBOARD" },
      { src: projectThumb1, label: "02 · EKYC DATA MAPPING" },
      { src: projectThumb5, label: "03 · POLICY CHECKOUT" },
    ],
  },
  {
    num: "02", name: "Gamified CI Evaluation Campaign", client: "GEGI Singapore",
    location: "SG", year: "2026", tags: ["Gamified Evaluation", "Singlish Persona", "Campaign"],
    role: "Sole Product Designer",
    headline: "A rapid-sprint interactive campaign tool combining scroll-based gamified evaluation, localized Singlish persona mechanics, and AEM integration.",
    metrics: [{ val: "2wk", sub: "Sprint Execution" }, { val: "7Q", sub: "Question Matrix" }, { val: "4", sub: "Persona Tiers" }],
    projectId: "gegi",
    thumb: ci1,
    screens: [
      { src: ci1, label: "01 · CAMPAIGN HERO" },
      { src: ci2, label: "02 · SINGLISH PERSONAS" },
      { src: ci3, label: "03 · EVALUATION MATRIX" },
      { src: ci4, label: "04 · AEM INTEGRATION" },
    ],
  },
  {
    num: "03", name: "100K-Player Live Tournament Platform", client: "mySalam × myKawan",
    location: "MY", year: "2025", tags: ["Live Tournament", "100K Concurrent", "Gamified Financial Literacy"],
    role: "Lead Product Designer",
    headline: "Architected a scalable digital tournament platform delivering real-time financial literacy quizzes to over 100,000 concurrent Malaysian youth players.",
    metrics: [{ val: "100K", sub: "Live Concurrents" }, { val: "5-sec", sub: "Quiz Round Engine" }, { val: "RM500K", sub: "ReSkills Rewards Pool" }],
    projectId: "bijakwang",
    thumb: mykawan1,
    screens: [
      { src: mykawan1, label: "01 · LOBBY & CHALLENGES" },
      { src: mykawan2, label: "02 · REGISTRATION & ONBOARDING" },
      { src: mykawan3, label: "03 · LIVE QUIZ INTERACTION" },
      { src: mykawan4, label: "04 · RESKILLS REWARDS" },
      { src: mykawan5, label: "05 · LEADERBOARD & RANKINGS" },
    ],
  },
  {
    num: "04", name: "National Quick Count & Monitoring", client: "Indonesian Political Party",
    location: "ID", year: "2024", tags: ["Public Sector", "Civic Tech", "Real-Time CMS"],
    role: "Lead UX & Systems Architect",
    headline: "An end-to-end multi-level election monitoring system for Indonesia's 2024 Presidential Election, tracking vote tabulation across 38 provinces in real-time.",
    metrics: [{ val: "820K+", sub: "TPS Polling Stations" }, { val: "38", sub: "Provinces Tracked" }, { val: "48h", sub: "Critical Window" }],
    projectId: "election",
    thumb: projectThumb5,
    screens: [
      { src: projectThumb5, label: "01 · REAL-TIME TABULATION" },
      { src: projectThumb1, label: "02 · PROVINCIAL MATRIX" },
      { src: projectThumb2, label: "03 · VERIFICATION CMS" },
    ],
  },
  {
    num: "05", name: "Multi-Tenant Enterprise Backoffice", client: "Regional SuperApps & FinTech",
    location: "SG/MY/ID", year: "2025", tags: ["White-Label Engine", "Design System Tokens", "Data Analytics"],
    role: "Solo Product Designer & System Logic Architect",
    headline: "Scaling B2B white-label operations and real-time analytical dashboards under lean constraints with a 1–3 hour deployment engine.",
    metrics: [{ val: "1–3h", sub: "Tenant Setup" }, { val: "Dual", sub: "Track Delivery" }, { val: "0", sub: "BE Query Timeouts" }],
    projectId: "backoffice",
    thumb: projectThumb5,
    screens: [
      { src: projectThumb5, label: "01 · DUAL-TRACK ARCHITECTURE" },
      { src: projectThumb2, label: "02 · MULTI-TENANT DASHBOARD" },
      { src: projectThumb1, label: "03 · ISOLATED FILTER ENGINE" },
    ],
  },
  {
    num: "06", name: "Medical Diagnostics & Field Sales Revamp", client: "Fonterra × Anlene",
    location: "ID", year: "2023", tags: ["Health Tech", "Field Sales Enablement", "Diagnostic Matrix"],
    role: "Sole Product Designer",
    headline: "Translating clinical diagnostic data from GE Achilles bone scanners and Omron devices into personalized health passports and automated WhatsApp PDF delivery.",
    metrics: [{ val: "3mo", sub: "Delivery Sprint" }, { val: "2", sub: "Medical Devices" }, { val: "4-tier", sub: "Health Matrix" }],
    projectId: "anlene",
    thumb: anlene0,
    screens: [
      { src: anlene0, label: "01 · HEALTH PASSPORT", fitContain: true },
      { src: anlene1, label: "02 · DIAGNOSTIC MATRIX", fitContain: true },
      { src: anlene2, label: "03 · BONE SCAN DATA", fitContain: true },
      { src: anlene3, label: "04 · FIELD SALES INTAKE", fitContain: true },
      { src: anlene4, label: "05 · CHECKOUT RESULTS", fitContain: true },
    ],
  },
  {
    num: "07", name: "Digital Transformation & AI Retail", client: "Pro Archery Jakarta",
    location: "ID", year: "2025", tags: ["AI Prompt-to-Code", "E-Commerce", "Admin POS"],
    role: "Sole System & UI Designer",
    headline: "An end-to-end digital ecosystem scaling a physical archery retailer into an Asia-wide e-commerce platform featuring AI-accelerated prototyping.",
    metrics: [{ val: "24h", sub: "POC Delivery" }, { val: "4", sub: "Portals Built" }, { val: "0", sub: "Figma Wireframes" }],
    projectId: "archery",
    thumb: projectThumb4,
    screens: [
      { src: projectThumb4, label: "01 · E-COMMERCE PORTAL" },
      { src: projectThumb2, label: "02 · POS ADMIN DASHBOARD" },
      { src: projectThumb1, label: "03 · AI PROMPT ARCHITECTURE" },
    ],
  },
  {
    num: "08", name: "National Archery Operating System", client: "PERPANI / MyArchery",
    location: "ID", year: "2023", tags: ["Sports Tech", "Field UX Research", "Tournament Engine"],
    role: "Lead UX Researcher & Product Designer",
    headline: "Designing Indonesia's centralized tournament operating system & real-time scoring platform for official PERPANI national championships.",
    metrics: [{ val: "2yr", sub: "Lifecycle Timeline" }, { val: "7+", sub: "Public Releases" }, { val: "100%", sub: "Manual Flow Automation" }],
    projectId: "myarchery",
    thumb: projectThumb4,
    screens: [
      { src: projectThumb4, label: "01 · SCORING KEYPAD" },
      { src: projectThumb2, label: "02 · ADMIN DASHBOARD" },
      { src: projectThumb1, label: "03 · LIVE SCOREBOARD" },
    ],
  },
]

const PROJECTS: Project[] = [
  // ── 2026 ──────────────────────────────────────────────────────────────────────
  { id: 1,  name: "OCBC Insurance",        client: "Great Eastern Indonesia (GEGI) × OCBC", market: "Indonesia", year: 2026, status: "LIVE",          category: "Banking & InsurTech",         scope: "End-to-end insurance acquisition flow built with a custom standalone banking UI Kit from scratch." },
  { id: 2,  name: "KCIC × Jasindo",        client: "Kereta Cepat Indonesia China",     market: "Indonesia",   year: 2026, status: "ON HOLD",       category: "Public Transit InsurTech",    scope: "Integrated passenger travel insurance purchasing flow with Jasindo." },
  { id: 3,  name: "GE × Shopee Insurance", client: "Great Eastern Malaysia × Shopee",  market: "Malaysia",    year: 2026, status: "LIVE",          category: "InsurTech & E-Commerce",      scope: "Insurance product integration and purchase flow embedded within Shopee Malaysia's ecosystem." },
  { id: 4,  name: "Haruuz Internal System",client: "Mikrosayang",                      market: "Malaysia",    year: 2026, status: "PRODUCTION",    category: "Internal System",             scope: "Internal management system for Mikrosayang's operational workflows and data tracking." },
  // ── 2025 ──────────────────────────────────────────────────────────────────────
  { id: 5,  name: "Grab Data Pipeline",    client: "Grab",                             market: "Indonesia",   year: 2025, status: "LIVE INTERNAL", category: "Enterprise B2B / FinTech",    scope: "Tri-party data exchange flow & middleware logic mapping across Grab, insurance, and FTI." },
  { id: 6,  name: "myKawan AI Engine",     client: "myKawan",                          market: "Malaysia",    year: 2025, status: "PRODUCTION",    category: "AI / Marketing Automation",   scope: "Internal AI-powered CMS tool for automated marketing copy, articles, images, and media generation." },
  { id: 7,  name: "Teman E-Commerce",      client: "Teman",                            market: "Indonesia",   year: 2025, status: "PROTOTYPE",     category: "AI & Retail E-Commerce",      scope: "AI-driven product recommendation engine and personalized purchase flow integration." },
  { id: 8,  name: "Samaloop",              client: "Samaloop",                         market: "Indonesia",   year: 2025, status: "LIVE",          category: "EdTech & Marketplace",        scope: "Corporate website and public speaking coach directory booking platform." },
  // ── 2024 ──────────────────────────────────────────────────────────────────────
  { id: 9,  name: "Family Moo",            client: "Fonterra Indonesia",               market: "Indonesia",   year: 2024, status: "LIVE",          category: "FMCG & Loyalty Portal",       scope: "Customer loyalty management and points redemption portal for Fonterra's consumer ecosystem." },
  { id: 10, name: "Telescope Indonesia",   client: "Telescope Indonesia",              market: "Indonesia",   year: 2024, status: "LIVE",          category: "B2B Industrial Catalog",      scope: "Digital product catalog and technical specification showcase for specialized equipment." },
  { id: 11, name: "ASEAN Project Management System", client: "ASEAN Secretariat", market: "ASEAN / Regional", year: 2024, status: "LIVE INTERNAL", category: "Regional / Multi-Gov", scope: "Manajemen siklus proyek multilateral, pelaporan anggaran lintas negara, dan alur persetujuan multi-level antar delegasi." },
  { id: 12, name: "Distrik Navigasi Portal", client: "Maritime Operations", market: "Indonesia", year: 2024, status: "PRODUCTION", category: "Internal Enterprise", scope: "Digitalisasi alur operasional sarana bantu navigasi pelayaran, pemantauan aset maritim, dan koordinasi staf teknis lapangan." },
  // ── 2022 ──────────────────────────────────────────────────────────────────────
  { id: 13, name: "YAMET Center",          client: "YAMET Child Development",          market: "Indonesia",   year: 2022, status: "LIVE",          category: "Healthcare Portal",           scope: "Corporate website and service directory for child development clinics across Indonesia." },
  { id: 14, name: "Ada Polisi",            client: "Internal Public Sector",           market: "Indonesia",   year: 2022, status: "ARCHIVED",      category: "Public Sector Mobile App",    scope: "Internal mobile system for law enforcement data entry and reporting." },
  { id: 15, name: "Forum TJSL Portal", client: "BUMN Ecosystem", market: "Indonesia", year: 2022, status: "LIVE", category: "CSR Governance", scope: "Standardisasi pelaporan CSR terpusat, aggregasi metrik dampak sosial lintas perusahaan pelat merah, dan transparansi tata kelola audit." },
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
      className="font-sans text-xs font-semibold tracking-wider uppercase"
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
  { id: "archive", label: "Catalog", Icon: Archive },
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
      aria-label="Page navigation"
      className={[
        "fixed z-50 flex items-center gap-0 shadow-xl",
        // Mobile: full-width bottom tab bar
        "bottom-0 left-0 right-0 w-full rounded-none border-t border-slate-200/80",
        // Tablet/Desktop: floating centered pill
        "md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto md:rounded-xl md:border md:border-slate-200/80",
      ].join(" ")}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 10px 30px rgba(25, 36, 78, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {DOCK.map((entry, i) => {
        const isActive = activeSection === entry.id
        return (
          <button
            key={entry.id}
            onClick={() => scrollTo(entry.id)}
            aria-label={entry.label}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex flex-col items-center justify-center gap-1 py-2.5 flex-1 px-1.5 md:flex-none md:px-6 md:py-3 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C] rounded-lg cursor-pointer group ${
              isActive ? "bg-slate-100/70" : "hover:bg-slate-50/60"
            }`}
            style={{
              borderRight: i < DOCK.length - 1 ? `1px solid rgba(25, 36, 78, 0.08)` : "none",
              color: isActive ? N : `${N}B3`,
            }}
          >
            <entry.Icon size={19} strokeWidth={isActive ? 2.2 : 1.6} className="group-hover:text-[#19244E] transition-colors" />
            <span className={`font-sans text-[8.5px] sm:text-[9.5px] tracking-wider uppercase transition-colors ${isActive ? "font-bold text-[#19244E]" : "font-semibold text-[#19244E]/70 group-hover:text-[#19244E]"}`}>
              {entry.label}
            </span>
            {isActive && (
              <motion.span
                layoutId="dock-active"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2.5px] rounded-full"
                style={{ backgroundColor: C }}
              />
            )}
          </button>
        )
      })}
    </motion.nav>
  )
}

// ─── Hero Spring Config ───────────────────────────────────────────────────────
const HERO_SPRING = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as const, duration: 0.7 }

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ onReadMore }: { onReadMore: () => void }) {
  const [isAtWork, setIsAtWork] = useState(true)
  const [tick, setTick] = useState(0)
  const HELLOS = ["Hi, it's Dina!", "Halo, saya Dina!", "안녕하세요, 디나예요!"]

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % HELLOS.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative flex flex-col"
      style={{ backgroundColor: W }}
    >
      {/* ── Top nav bar ── */}
      <div
        className="flex items-center justify-between px-5 py-4 lg:px-16 lg:py-6"
        style={{ borderBottom: `1px solid rgba(25, 36, 78, 0.05)` }}
      >
        <div className="flex items-center gap-4 lg:gap-6">
          <span className="font-sans text-xs sm:text-sm lg:text-base font-black tracking-[0.22em] text-[#19244E] select-none">
            AFG
          </span>

          {/* Toggle Switch */}
          <div className="flex items-center gap-2">
            <span
              className="font-sans text-[10px] lg:text-xs font-semibold tracking-widest transition-all duration-150 cursor-pointer select-none animate-fade-in"
              style={{ color: N, opacity: isAtWork ? 1 : 0.35 }}
              onClick={() => setIsAtWork(true)}
            >
              At Work
            </span>

            <button
              onClick={() => setIsAtWork((v) => !v)}
              aria-label="Toggle between At Work and In Life mode"
              className="relative flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C] rounded-full cursor-pointer"
              style={{
                width: "36px",
                height: "20px",
                borderRadius: "999px",
                backgroundColor: isAtWork ? N : C,
                transition: "background-color 0.3s ease",
                flexShrink: 0,
              }}
            >
              <motion.span
                layout
                transition={HERO_SPRING}
                className="absolute bg-white rounded-full shadow-sm"
                style={{
                  width: "14px",
                  height: "14px",
                  left: isAtWork ? "3px" : "19px",
                }}
              />
            </button>

            <span
              className="font-sans text-[10px] lg:text-xs font-semibold tracking-widest transition-all duration-150 cursor-pointer select-none animate-fade-in"
              style={{ color: C, opacity: !isAtWork ? 1 : 0.35 }}
              onClick={() => setIsAtWork(false)}
            >
              In Life
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <a
            href="/resume-adina-fayza-gayo.pdf"
            download="ADINA FAYZA GAYO Resume 2026.pdf"
            className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all duration-150 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 cursor-pointer shadow-sm"
            style={{ border: `1px solid ${HAIR}`, color: `${N}DD` }}
            onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.borderColor = N; ;(e.currentTarget as HTMLElement).style.color = N }}
            onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.borderColor = HAIR; ;(e.currentTarget as HTMLElement).style.color = `${N}DD` }}
          >
            <Download size={15} />
            <span>Resume</span>
          </a>
          <a
            href={getGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all duration-150 rounded-xl px-4 py-2 sm:px-5 sm:py-2.5 whitespace-nowrap cursor-pointer shadow-sm flex items-center gap-1.5"
            style={{ border: `1px solid ${N}`, color: N }}
            onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = N; ;(e.currentTarget as HTMLElement).style.color = W }}
            onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; ;(e.currentTarget as HTMLElement).style.color = N }}
          >
            <span>Let's Chat</span>
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>

      {/* ── Sliding viewports wrapper ── */}
      <div className="overflow-hidden relative">
        <motion.div
          animate={{ x: isAtWork ? "0%" : "-50%" }}
          transition={HERO_SPRING}
          className="flex w-[200%]"
        >
          {/* ── PANEL A: AT WORK (Left 65%: Bold Upper Title + CTAs, Right 35%: Avatar + Nav + Bio) ── */}
          <div className="w-1/2 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 sm:px-8 lg:px-20 pt-10 lg:pt-20 pb-16 lg:pb-24 min-h-[calc(100vh-140px)] flex-shrink-0">
            {/* Left 7 Cols: Massive Headline & Compact Button */}
            <div className="lg:col-span-7 flex flex-col">
              <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#DB3E8C] uppercase mb-3 sm:mb-4">
                Product Designer · System Logic Architect
              </p>
              <h1
                className="font-display font-semibold leading-[0.92] sm:leading-[0.88] tracking-tight uppercase mb-6 sm:mb-7"
                style={{ fontSize: "clamp(2.2rem, 6.5vw, 8rem)", color: N }}
              >
                ENTERPRISE<br />
                DESIGN.<br />
                <span style={{ color: C }}>STARTUP</span><br />
                <span style={{ color: C }}>SPEED.</span>
              </h1>

              {/* Compact Button */}
              <div className="flex items-center gap-3.5 mb-6 lg:mb-0">
                <button
                  onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-bold tracking-wider uppercase text-white transition-all duration-150 hover:opacity-90 shadow-sm flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: N, borderRadius: "6px" }}
                >
                  Selected Work <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Photo Avatar, Quick Nav & Bio */}
            <div className="lg:col-span-5 flex flex-col gap-6 pt-2">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Photo Avatar Card with Pastel Tint */}
                <div className="relative w-[160px] sm:w-[220px] aspect-square rounded-2xl overflow-hidden bg-[#E2E8F0] shadow-lg border border-[#19244E]/10 flex-shrink-0 group">
                  <ImageWithFallback
                    src={adinaPhotoAbout}
                    alt="Adina Fayza Gayo - At Work"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Handwritten / Script Note Accent with Auto Ticker (EN, ID, KR) */}
                  <div
                    className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-md shadow-md border border-[#19244E]/10 overflow-hidden"
                    style={{ transform: "rotate(-3deg)" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={tick}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="font-serif italic text-xs font-bold text-[#DB3E8C] whitespace-nowrap block"
                      >
                        {HELLOS[tick]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Live Status / Current Scope Column */}
                <div className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm font-sans tracking-wide text-[#19244E] pt-0.5 max-w-full sm:max-w-[240px]">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      CURRENTLY
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-snug text-[#19244E]/85 block">
                      Designing complex fintech & enterprise logic
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      RESEARCHING
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-snug text-[#19244E]/85 block">
                      Design decision traceability & cross-functional frameworks
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      OPEN FOR
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-snug text-[#19244E]/85 block">
                      In-House Squads · Jakarta, ID (Remote / Relocation)
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio Block Underneath Avatar */}
              <div className="pt-2 border-t border-[#19244E]/10">
                <h3 className="font-display font-black text-lg sm:text-xl tracking-tight uppercase text-[#19244E] mb-2">
                  ADINA FAYZA GAYO
                </h3>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#19244E]/85 w-full mb-3">
                  I design complex B2B platforms and embedded insurance tools. Most of my day is spent untangling messy product logic, covering edge cases, and making sure developers have crystal-clear specs to build from.
                </p>
                <button
                  onClick={onReadMore}
                  className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-[#DB3E8C] hover:underline transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer py-1"
                >
                  View Full Profile & CV <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* ── PANEL B: IN LIFE (Left 65%: Bold Upper Title + CTAs, Right 35%: Avatar + Nav + Bio) ── */}
          <div className="w-1/2 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 sm:px-8 lg:px-20 pt-10 lg:pt-20 pb-16 lg:pb-24 min-h-[calc(100vh-140px)] flex-shrink-0">
            {/* Left 7 Cols: Massive Headline & Compact Buttons */}
            <div className="lg:col-span-7 flex flex-col">
              <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#DB3E8C] uppercase mb-3 sm:mb-4">
                Off The Clock · Real Human
              </p>
              <h1
                className="font-display font-semibold leading-[0.92] sm:leading-[0.88] tracking-tight uppercase mb-6 sm:mb-7"
                style={{ fontSize: "clamp(2.2rem, 6.5vw, 8rem)", color: N }}
              >
                PLOT<br />
                TWISTS.<br />
                <span style={{ color: C }}>FRONT ROW</span><br />
                <span style={{ color: C }}>CROWDS.</span>
              </h1>

              {/* Compact Button */}
              <div className="flex items-center gap-3.5 flex-wrap mb-6 lg:mb-0">
                <a
                  href="mailto:adinagayo@gmail.com"
                  className="px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-bold tracking-wider uppercase text-white transition-all duration-150 hover:opacity-90 shadow-sm flex items-center gap-2"
                  style={{ backgroundColor: C, borderRadius: "6px" }}
                >
                  Let's grab coffee <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Photo Avatar, Quick Nav & Bio */}
            <div className="lg:col-span-5 flex flex-col gap-6 pt-2">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Photo Avatar Card with Pastel Tint */}
                <div className="relative w-[160px] sm:w-[220px] aspect-square rounded-2xl overflow-hidden bg-[#FCE7F3] shadow-lg border border-[#19244E]/10 flex-shrink-0 group">
                  <ImageWithFallback
                    src={adinaPhotoLife}
                    alt="Adina Fayza Gayo - In Life"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Handwritten / Script Note Accent */}
                  <div
                    className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md border border-[#19244E]/10"
                    style={{ transform: "rotate(-3deg)" }}
                  >
                    <span className="font-serif italic text-xs font-bold text-[#DB3E8C] whitespace-nowrap block">
                      Spreadsheet wizard 🍵
                    </span>
                  </div>
                </div>

                {/* Live Status / Personal Focus Column */}
                <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans tracking-wide text-[#19244E] pt-0.5 max-w-full sm:max-w-[260px]">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      ON ROTATION
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-snug text-[#19244E]/85 block">
                      Detective K-Dramas & local concert gigs
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      CURRENT OBSESSION
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-snug text-[#19244E]/85 block">
                      Tracking thriller reads & Sudoku records
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      SUPERPOWER
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-snug text-[#19244E]/85 block">
                      Multi-currency, color-coded travel itineraries
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      FUEL
                    </span>
                    <span className="font-semibold text-xs sm:text-sm leading-snug text-[#19244E]/85 block">
                      Zero-sugar iced Americano & bitter matcha
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio Block Underneath Avatar */}
              <div className="pt-2 border-t border-[#19244E]/10">
                <h3 className="font-display font-black text-lg sm:text-xl tracking-tight uppercase text-[#19244E] mb-1">
                  ADINA FAYZA GAYO
                </h3>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#19244E]/85 w-full mb-3">
                  Off-screen, I swap design systems for live gigs, thriller K-Dramas, and genre-hopping playlists. Equal parts concert-goer and spreadsheet enthusiast. I track my books, chase Sudoku high scores, and plan trips down to the exact transit route.
                </p>
                <button
                  onClick={onReadMore}
                  className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-[#DB3E8C] hover:underline transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer py-1"
                >
                  View Full Profile & CV <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ImageLightboxModal({
  isOpen,
  onClose,
  screens,
  initialIndex = 0,
}: {
  isOpen: boolean
  onClose: () => void
  screens: { src: string; label: string; fitContain?: boolean }[]
  initialIndex?: number
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % screens.length)
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, screens.length, onClose])

  if (!isOpen || !screens || screens.length === 0) return null

  const current = screens[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-2xl flex flex-col justify-between p-4 lg:p-8 select-none"
        onClick={onClose}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between text-white z-10" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#DB3E8C] text-white text-[10px] font-sans font-bold tracking-widest uppercase shadow-md">
              Screen {currentIndex + 1} / {screens.length}
            </span>
            <span className="text-sm font-sans font-semibold text-white/90">
              {current.label}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-[#DB3E8C] text-white flex items-center justify-center transition-all text-base shadow-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Main Image Stage with Left and Right Arrows */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {/* Left Arrow Button */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length)}
            aria-label="Previous Image"
            className="absolute left-2 lg:left-8 z-30 w-12 h-12 rounded-full bg-[#19244E]/90 border border-white/20 text-white flex items-center justify-center text-xl hover:bg-[#DB3E8C] hover:scale-110 transition-all shadow-2xl cursor-pointer"
          >
            ❮
          </button>

          {/* Center Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-w-[88vw] max-h-[72vh] flex items-center justify-center"
            >
              <img
                src={current.src}
                alt={current.label}
                className={`max-w-full max-h-[72vh] rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-white/15 ${
                  current.fitContain ? "object-contain bg-[#141b36] p-3" : "object-contain"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow Button */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % screens.length)}
            aria-label="Next Image"
            className="absolute right-2 lg:right-8 z-30 w-12 h-12 rounded-full bg-[#19244E]/90 border border-white/20 text-white flex items-center justify-center text-xl hover:bg-[#DB3E8C] hover:scale-110 transition-all shadow-2xl cursor-pointer"
          >
            ❯
          </button>
        </div>

        {/* Bottom Thumbnail Strip Bar */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 z-10" onClick={(e) => e.stopPropagation()}>
          {screens.map((screen, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-14 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                idx === currentIndex
                  ? "border-[#DB3E8C] scale-105 shadow-[0_0_20px_rgba(219,62,140,0.6)]"
                  : "border-white/20 opacity-50 hover:opacity-100"
              }`}
            >
              <img src={screen.src} alt={screen.label} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function StackedFanOutDeck({ screens }: { screens: { src: string; label: string; fitContain?: boolean }[] }) {
  const [isHovered, setIsHovered] = useState(false)
  const [deckOrder, setDeckOrder] = useState<number[]>(() => screens.map((_, i) => i))
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const isDraggingRef = useRef(false)

  // Bring a specific card to front or open lightbox ONLY if already top
  const handleCardClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      return
    }

    const currentTopIdx = deckOrder[0]
    if (currentTopIdx === idx) {
      // ONLY open pop-up lightbox slider if this card is ALREADY at the very top/front!
      setLightboxIndex(idx)
    } else {
      // Otherwise, bring it to top/front first!
      setDeckOrder((prev) => [idx, ...prev.filter((i) => i !== idx)])
    }
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {screens.map((screen, idx) => {
          const total = screens.length
          const orderPos = deckOrder.indexOf(idx)
          const isTop = orderPos === 0

          const stackRotate = [0, 4, -4, 7, -5][idx % 5]
          const stackX = [0, 6, -6, 12, -12][idx % 5]
          const stackY = [0, -2, 2, -4, 4][idx % 5]

          const fanXShift = (idx - (total - 1) / 2) * 75
          const fanRotate = (idx - (total - 1) / 2) * 3

          return (
            <motion.div
              key={screen.label + idx}
              drag
              dragSnapToOrigin={true}
              dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.05, zIndex: 99, cursor: "grabbing" }}
              onDragStart={() => {
                isDraggingRef.current = false
              }}
              onDrag={(_, info) => {
                if (Math.hypot(info.offset.x, info.offset.y) > 5) {
                  isDraggingRef.current = true
                }
              }}
              onDragEnd={(_, info) => {
                if (Math.hypot(info.offset.x, info.offset.y) > 40) {
                  isDraggingRef.current = true
                  setDeckOrder((prev) => {
                    const currentTop = prev[0]
                    const rest = prev.slice(1)
                    return [...rest, currentTop]
                  })
                }
                setTimeout(() => {
                  isDraggingRef.current = false
                }, 120)
              }}
              onClick={(e) => handleCardClick(idx, e)}
              className={`absolute aspect-[16/10] w-[92%] max-h-[94%] rounded-2xl overflow-hidden border ${
                isTop ? "border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.65)]" : "border-white/20 shadow-2xl"
              } bg-[#141b36] cursor-grab transition-shadow duration-200`}
              style={{
                zIndex: isHovered ? (total - orderPos) : (total - orderPos),
                transformOrigin: "bottom center",
              }}
              animate={{
                x: isHovered ? fanXShift : stackX,
                y: isHovered ? orderPos * -4 : stackY,
                rotate: isHovered ? fanRotate : stackRotate,
                scale: isHovered ? (isTop ? 1.03 : 0.95) : 1 - orderPos * 0.018,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
              }}
            >
              <div className={`w-full h-full ${screen.fitContain ? "bg-[#141b36] p-2 flex items-center justify-center" : ""}`}>
                <img
                  src={screen.src}
                  alt={screen.label}
                  className={`w-full h-full ${screen.fitContain ? "object-contain p-1" : "object-cover object-top"} pointer-events-none`}
                />
              </div>

              {/* Screen Label Tag */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-[#19244E]/90 backdrop-blur-md rounded-lg text-[9px] font-sans font-bold text-white tracking-widest uppercase border border-white/15 truncate text-center shadow-md pointer-events-none">
                {screen.label}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Interactive Drag & Zoom Helper Badge (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#19244E]/95 backdrop-blur-md border border-white/15 rounded-full text-[8px] font-sans font-bold text-white tracking-widest uppercase shadow-md z-40 flex items-center gap-1.5 pointer-events-none whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#DB3E8C] animate-pulse" />
        <span>Drag to shuffle or click to expand screens</span>
      </div>

      {/* Full-Screen Pop-up Image Slider Lightbox */}
      <ImageLightboxModal
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        screens={screens}
        initialIndex={lightboxIndex ?? 0}
      />
    </div>
  )
}

function InfiniteMarqueeDeck({ screens }: { screens: { src: string; label?: string }[] }) {
  const [isHovered, setIsHovered] = useState(false)
  const duplicated = [...screens, ...screens, ...screens]

  return (
    <div
      className="relative w-full h-full flex items-center cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vignette Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#111936] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#111936] to-transparent z-20 pointer-events-none" />

      {/* Marquee Motion Track */}
      <motion.div
        className="flex items-center gap-4 pr-4 flex-nowrap w-full"
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: isHovered ? 40 : 16,
          ease: "linear",
        }}
      >
        {duplicated.map((screen, idx) => (
          <motion.div
            key={idx}
            drag
            dragSnapToOrigin={true}
            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.05, zIndex: 99, cursor: "grabbing" }}
            className="relative h-[340px] lg:h-[400px] aspect-[16/10] rounded-xl overflow-hidden border border-white/20 shadow-2xl flex-shrink-0 bg-[#141b36] group/item cursor-grab"
          >
            <img
              src={screen.src}
              alt={`Screen ${idx}`}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/item:scale-[1.03] pointer-events-none"
            />
            {screen.label && (
              <div className="absolute bottom-3 left-3 right-3 px-2.5 py-1 bg-[#19244E]/90 backdrop-blur-md rounded text-[8px] font-sans font-bold text-white tracking-widest uppercase border border-white/10 truncate text-center opacity-0 group-hover/item:opacity-100 transition-opacity z-10 pointer-events-none">
                {screen.label}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Badge Indicator */}
      <div className="absolute -top-2 right-0 px-3 py-1 bg-[#DB3E8C] text-white font-sans text-[8px] font-bold tracking-widest uppercase rounded-full shadow-md z-30 pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Infinite Marquee · Drag Cards
      </div>
    </div>
  )
}

function AutoCarouselDeck({ screens }: { screens: { src: string; label?: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [isHovered, screens.length])

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % screens.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length)
  }

  const current = screens[currentIndex]

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          drag
          dragSnapToOrigin={true}
          dragConstraints={{ left: -500, right: 500, top: -350, bottom: 350 }}
          dragElastic={0.2}
          whileDrag={{ scale: 1.05, zIndex: 99, cursor: "grabbing" }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative w-[95%] aspect-[16/10] max-h-[96%] rounded-md overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.65)] bg-[#141b36] flex items-center justify-center cursor-grab"
        >
          <img
            src={current.src}
            alt={current.label || `Screen ${currentIndex + 1}`}
            className="w-full h-full object-cover object-top rounded-md pointer-events-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav Buttons on Hover */}
      <button
        onClick={handlePrev}
        aria-label="Previous Screen"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#19244E]/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xs opacity-0 group-hover/carousel:opacity-100 hover:bg-[#DB3E8C] transition-all z-30 shadow-lg"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        aria-label="Next Screen"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#19244E]/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xs opacity-0 group-hover/carousel:opacity-100 hover:bg-[#DB3E8C] transition-all z-30 shadow-lg"
      >
        ❯
      </button>

      {/* Screen Step Label Overlay */}
      {current.label && (
        <div className="absolute bottom-4 left-6 px-3 py-1 bg-[#19244E]/90 backdrop-blur-md rounded-lg text-[9px] font-sans font-bold text-white tracking-widest uppercase border border-white/15 z-20 pointer-events-none shadow-md">
          {current.label}
        </div>
      )}

      {/* Progress Dots */}
      <div className="absolute bottom-4 right-6 flex items-center gap-1.5 z-20 pointer-events-none">
        {screens.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-5 bg-[#DB3E8C]" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Floating Badge Indicator */}
      <div className="absolute -top-2 right-0 px-3 py-1 bg-[#DB3E8C] text-white font-sans text-[8px] font-bold tracking-widest uppercase rounded-full shadow-md z-30 pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Auto Carousel · Drag Screen to Inspect
      </div>
    </div>
  )
}

function FeaturedWorkSection({
  onOpenProject,
  activeIndex,
  onActiveIndexChange,
}: {
  onOpenProject: (id: string) => void
  activeIndex: number
  onActiveIndexChange: (index: number) => void
}) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 25%"]
  })

  // GPU-Accelerated "Aperture / Viewport Box" Expansion Transition
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(15% 15% 15% 15% round 24px)", "inset(0% 0% 0% 0% round 0px)"]
  )

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const activeProject = FEATURED[activeIndex] || FEATURED[0]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden bg-white">
      <motion.div
        style={{ clipPath }}
        className="w-full h-full bg-[#19244E]"
      >
        {/* Header */}
      <div
        className="px-4 sm:px-8 lg:px-16 py-8 sm:py-10 flex items-center gap-6"
        style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}
      >
        <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-white/60">SELECTED WORK</span>
        <div className="flex-1 h-px bg-white/10" />
        <span className="font-sans text-[9px] sm:text-[10px] text-white/60 font-semibold tracking-[0.15em]">ENTERPRISE · B2B · REGIONAL</span>
      </div>

      {/* Section intro */}
      <div className="px-4 sm:px-8 lg:px-16 py-10 sm:py-16 lg:py-20" style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}>
        <h2
          className="font-display font-normal leading-tight text-white"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.02em", maxWidth: "900px" }}
        >
          Projects that <br className="lg:hidden" />
          define{" "}
          <em className="font-normal" style={{ color: C }}>how I think.</em>
        </h2>
      </div>

      {/* Showcase container */}
      <div className="px-4 sm:px-8 lg:px-16">
        {/* Desktop Showcase */}
        <div className="hidden lg:grid lg:grid-cols-[300px_1fr_320px] gap-10 py-16 min-h-[580px]">
          {/* Left Column: Project Selector */}
          <div className="flex flex-col gap-6 justify-center pr-6 border-r border-white/10">
            {FEATURED.map((project, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={project.projectId}
                  onClick={() => onActiveIndexChange(i)}
                  aria-label={`View project: ${project.name}`}
                  aria-pressed={i === activeIndex}
                  className={`group text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C] rounded-lg py-2.5 px-3 border-l-2 ${
                    isActive ? "border-[#DB3E8C] bg-white/[0.08] shadow-sm" : "border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="font-sans text-[10px] tracking-wider transition-colors duration-300 pt-1 font-bold"
                      style={{ color: isActive ? C : "rgba(255, 255, 255, 0.3)" }}
                    >
                      {project.num}
                    </span>
                    <span
                      className="text-base transition-all duration-300"
                      style={{
                        color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
                        fontWeight: isActive ? 700 : 500,
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

          {/* Center Column: Figma Canvas Stage */}
          <div
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringCanvas(true)}
            onMouseLeave={() => setIsHoveringCanvas(false)}
            className="relative flex items-center justify-center p-6 lg:p-8 overflow-hidden rounded-2xl bg-[#111936] cursor-crosshair select-none h-full min-h-[520px]"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Figma frame label (Left) */}
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded text-[10px] font-sans font-bold tracking-widest text-white/90 z-20 shadow-sm">
              {activeProject.num} · {activeProject.location} · {activeProject.year}
            </div>

            {/* Screens Count Badge (Right - Exactly Level with Left Tag) */}
            {activeProject.screens && (
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded text-[10px] font-sans font-bold tracking-widest text-white/90 z-20 shadow-sm flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DB3E8C] animate-pulse" />
                {activeProject.screens.length} Screens
              </div>
            )}

            {/* Active Figma Frame Preview Stage (Borderless & Unclipped) */}
            <motion.div
              key={activeProject.projectId}
              initial={{ scale: 0.98, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => onOpenProject(activeProject.projectId)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenProject(activeProject.projectId) }}
              role="button"
              tabIndex={0}
              aria-label={`Open case study: ${activeProject.name}`}
              className="relative w-full h-full min-h-[460px] lg:min-h-[500px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.01] focus:outline-none group"
            >
              {activeProject.screens ? (
                <StackedFanOutDeck screens={activeProject.screens} />
              ) : (
                <motion.div
                  drag
                  dragSnapToOrigin={true}
                  dragConstraints={{ left: -500, right: 500, top: -350, bottom: 350 }}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.04, zIndex: 99, cursor: "grabbing" }}
                  className="relative w-[95%] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] border border-white/20 bg-[#0d142d] cursor-grab"
                >
                  <ImageWithFallback
                    src={activeProject.thumb}
                    alt={`${activeProject.name} — mockup`}
                    className="w-full h-full object-cover object-top rounded-2xl group-hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
                  />
                </motion.div>
              )}
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
                  {/* Custom Figma Triangle cursor */}
                  <div className="flex items-start gap-1">
                    <MousePointer2 size={20} className="text-[#DB3E8C] fill-[#DB3E8C] stroke-white stroke-[1.5] drop-shadow-md flex-shrink-0" />
                    {/* User badge label */}
                    <div
                      className="ml-0.5 mt-2.5 px-2 py-0.5 rounded-md text-[9px] font-sans font-bold text-white shadow-lg border border-white/20 whitespace-nowrap"
                      style={{ backgroundColor: C }}
                    >
                      Hi Guest! 👋
                    </div>
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
                  <span className="font-sans text-xs font-semibold tracking-wider text-white/60 uppercase block mb-1">
                    CLIENT: {activeProject.client}
                  </span>
                  <h3 className="font-display font-semibold mb-4 leading-snug text-white" style={{ fontSize: "1.75rem", letterSpacing: "-0.01em" }}>
                    {activeProject.name}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-6 font-sans text-white/85">
                    {activeProject.headline}
                  </p>
                </div>

                {/* Metrics/Stats */}
                <div>
                  <div className="flex flex-col gap-3.5 mb-6">
                    <div className="flex items-baseline justify-between border-b border-white/10 pb-2.5">
                      <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase">OWNERSHIP ROLE</span>
                      <span className="font-sans font-semibold text-white text-xs sm:text-sm text-right">
                        {activeProject.role}
                      </span>
                    </div>
                    {activeProject.metrics.map((m) => (
                      <div key={m.sub} className="flex items-baseline justify-between border-b border-white/5 pb-2.5">
                        <span className="font-sans text-xs font-semibold tracking-widest text-white/60 uppercase">{m.sub}</span>
                        <span className="font-display font-semibold text-white text-lg sm:text-xl" style={{ color: C }}>
                          {m.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2.5 sm:gap-3 mt-1">
                    <button
                      onClick={() => onOpenProject(activeProject.projectId)}
                      className="group flex items-center justify-between w-full px-5 py-3.5 rounded-lg bg-[#DB3E8C] hover:bg-[#DB3E8C]/90 text-white font-sans text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-lg shadow-[#DB3E8C]/25 hover:shadow-[0_10px_25px_rgba(219,62,140,0.4)] cursor-pointer"
                    >
                      <span>Open Case Study</span>
                      <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <a
                      href={getWhatsAppLink(activeProject.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-3 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold tracking-wider text-xs uppercase transition-all cursor-pointer text-center shadow-sm"
                    >
                      💬 Ask about this project ↗
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Showcase */}
        <div className="block lg:hidden space-y-8 sm:space-y-12 py-8 sm:py-12">
          {FEATURED.map((project) => (
            <div
              key={project.projectId}
              onClick={() => onOpenProject(project.projectId)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenProject(project.projectId) }}
              role="button"
              tabIndex={0}
              aria-label={`Open case study: ${project.name}`}
              className="group relative rounded-2xl bg-[#111936] border border-white/5 p-4 sm:p-5 cursor-pointer shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C]"
            >
              {/* Figma frame label */}
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="font-sans text-[10px] sm:text-xs text-white/60 tracking-wider">
                  # {project.num} · {project.location} · {project.year}
                </span>
                <span className="font-sans text-[10px] sm:text-xs text-[#DB3E8C] font-bold tracking-wider uppercase">
                  View Case ↗
                </span>
              </div>

              <div className="relative aspect-[16/10] rounded-xl border border-white/10 bg-[#1c2446] overflow-hidden mb-4 p-1.5 flex items-center justify-center">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={project.thumb}
                    alt={project.name}
                    className="w-full h-full object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#19244E]/40" />
                </div>
              </div>

              {/* Metadata */}
              <div>
                <p className="font-sans text-xs font-semibold text-white/60 uppercase mb-0.5">
                  {project.client}
                </p>
                <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-2">
                  {project.name}
                </h3>
                <p className="text-sm leading-relaxed text-white/80 mb-4">
                  {project.headline}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                  {project.metrics.map((m) => (
                    <div key={m.sub} className="text-center">
                      <span className="font-display text-sm font-semibold block text-white" style={{ color: C }}>{m.val}</span>
                      <span className="font-sans text-[10px] sm:text-[11px] text-white/60 uppercase tracking-wider">{m.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
  )
}

// ─── HOW I WORK ─────────────────────────────────────────────────────────────────
const PHASES = [
  {
    num: "01", phase: "Strategic Alignment",
    sub: "Logic Deep-Dive & Business Research",
    desc: "Every engagement begins with stakeholder mapping, BRS analysis, and user research synthesis. Every pixel is anchored to a measurable business objective, not aesthetic preference.",
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

/* Hand-Drawn / Sketch SVG Icons for How I Work Statement */
function SketchSearchIcon({ className = "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 inline-block text-[#F472B6]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#hand-drawn)" }}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M17.5 17.5L24 24" strokeWidth="2.8" />
      <path d="M9 10C9.5 8.8 10.8 8.2 12 8.2" strokeWidth="1.6" strokeOpacity="0.7" />
    </svg>
  )
}

function SketchTargetIcon({ className = "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 inline-block text-[#F472B6]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#hand-drawn)" }}>
      <circle cx="13" cy="14" r="9" />
      <circle cx="13" cy="14" r="5" strokeWidth="2" />
      <circle cx="13" cy="14" r="2" fill="currentColor" />
      <path d="M19 8L24 3" strokeWidth="2.4" />
      <path d="M21 3L24 3L24 6" strokeWidth="2" />
    </svg>
  )
}

function SketchClipboardIcon({ className = "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 inline-block text-[#F472B6]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "url(#hand-drawn)" }}>
      <rect x="6" y="5" width="16" height="19" rx="2" />
      <path d="M10 3H18V6H10z" fill="currentColor" fillOpacity="0.2" strokeWidth="1.8" />
      <path d="M10 12L12.5 14.5L17.5 9.5" strokeWidth="2.4" />
      <path d="M10 18H18" strokeWidth="2" />
    </svg>
  )
}

function WorkflowSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end 20%"],
  })

  // Smooth scroll-driven opacity fade out & parallax lift as user scrolls past
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [1, 0.4, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div id="process" className="relative">
      {/* ── BLOCK 1: HOW I WORK STATEMENT HERO WITH SUBTLE VIDEO BACKGROUND ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col justify-center min-h-[460px] lg:min-h-[520px]"
        style={{ backgroundColor: N }}
      >
        {/* Subtle Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen pointer-events-none"
        >
          <source src={gettyBgVideo} type="video/mp4" />
        </video>

        {/* Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#19244E]/60 via-[#19244E]/30 to-[#19244E]/80 pointer-events-none" />

        {/* Header */}
        <div
          className="relative z-20 px-4 sm:px-8 lg:px-16 py-6 sm:py-8 flex items-center gap-6"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}
        >
          <span className="font-sans text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
            SYSTEM LOGIC
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-[#DB3E8C]">
            DESIGN PHILOSOPHY
          </span>
        </div>

        {/* Section headline — scroll-driven smooth fade out */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-20 px-4 sm:px-8 lg:px-16 py-14 sm:py-20 lg:py-24 flex flex-col items-center text-center"
        >
          <p className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase mb-6 sm:mb-10 text-[#DB3E8C]">
            [ HOW I WORK ]
          </p>
          <h2
            className="font-display font-light leading-[1.4] text-white max-w-4xl text-center drop-shadow-lg"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 4.2rem)", letterSpacing: "-0.025em" }}
          >
            I dig into the real problem first,{" "}
            <span className="inline-block origin-center align-middle mx-1">
              <SketchSearchIcon className="w-8 h-8 sm:w-16 sm:h-16 lg:w-20 lg:h-20 inline-block text-[#F472B6]" />
            </span>{" "}
            design the system <span className="text-[#DB3E8C]">logic with care,</span>{" "}
            <span className="inline-block origin-center align-middle mx-1">
              <SketchTargetIcon className="w-8 h-8 sm:w-16 sm:h-16 lg:w-20 lg:h-20 inline-block text-[#F472B6]" />
            </span>{" "}
            and hand off specs so clean{" "}
            <span className="inline-block origin-center align-middle mx-1">
              <SketchClipboardIcon className="w-8 h-8 sm:w-16 sm:h-16 lg:w-20 lg:h-20 inline-block text-[#F472B6]" />
            </span>{" "}
            that engineers rarely have to ask follow-up questions.
          </h2>
        </motion.div>
      </section>

      {/* ── BLOCK 2: 3-PHASE EXECUTION ENGINE (DARK MINIMALIST LIST VERSION) ── */}
      <section
        className="py-14 sm:py-18 lg:py-24 px-4 sm:px-8 lg:px-16 relative z-20 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0A1128 0%, #101936 100%)",
          borderTop: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        <div className="max-w-6xl mx-auto relative">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10 sm:mb-14 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
              <span className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/70">
                3-PHASE EXECUTION ENGINE
              </span>
            </div>
            <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-[#DB3E8C]">
              DESIGN TO HANDOFF PIPELINE
            </span>
          </div>

          {/* 3-Column Minimalist Grid with Hairline Dividers (No Heavy Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {PHASES.map((phase, idx) => {
              const Icon = phase.Icon
              const currentDelay = idx * 0.15

              return (
                <motion.div
                  key={phase.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: currentDelay, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="group p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.02] relative cursor-default"
                >
                  {/* Subtle Accent Highlight Line on Top Hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#DB3E8C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2.5">
                        <span className="font-sans text-sm sm:text-base font-bold tracking-wider text-[#DB3E8C] px-2.5 py-1 rounded-md bg-[#DB3E8C]/15 border border-[#DB3E8C]/30 shadow-sm">
                          {phase.num}
                        </span>
                        <span className="font-sans text-[9px] font-bold tracking-widest uppercase text-white/40">
                          PHASE {phase.num}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#DB3E8C]/40 group-hover:bg-[#DB3E8C]/10 transition-colors">
                        <Icon size={15} className="text-white/70 group-hover:text-[#DB3E8C] transition-colors" />
                      </div>
                    </div>

                    {/* Phase Title & Subtitle */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-[#DB3E8C] transition-colors duration-200">
                      {phase.phase}
                    </h3>
                    <p className="font-sans text-[11px] tracking-widest text-[#DB3E8C]/90 font-semibold uppercase mb-4">
                      {phase.sub}
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-white/75 font-sans mb-6">
                      {phase.desc}
                    </p>
                  </div>

                  {/* Tools & Artifacts Section */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2.5 block">
                      TOOLS & ARTIFACTS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-sans text-[8.5px] sm:text-[9.5px] font-semibold px-2.5 py-1 bg-white/5 text-white/80 border border-white/10 rounded-md group-hover:border-white/20 transition-colors"
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
        </div>
      </section>
    </div>
  )
}

// ─── PROJECT ARCHIVE ───────────────────────────────────────────────────────────
const PROJECT_PREVIEWS: Record<number, string> = {
  1: ci1,
  2: ci2,
  3: ci3,
  4: ci4,
  5: projectThumb1,
  6: mykawan1,
  7: projectThumb5,
  8: projectThumb2,
  9: anlene1,
  10: anlene2,
  11: anlene3,
  12: anlene4,
  13: mykawan3,
  14: mykawan4,
  15: ci4,
}

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

const DEFAULT_VISIBLE = 5

const getGradient = (id: number) => {
  const subtleGradients = [
    "linear-gradient(135deg, #19244E 0%, #141D3B 60%, #0D1530 100%)",
    "linear-gradient(135deg, #19244E 0%, #162247 60%, #101835 100%)",
    "linear-gradient(135deg, #141D3B 0%, #19244E 60%, #0F1633 100%)",
  ]
  return subtleGradients[id % subtleGradients.length]
}

function ProjectArchiveSection() {
  const [activeCat, setActiveCat] = useState("all")
  const [showAll, setShowAll] = useState(false)
  const { ref, inView } = useInView()
  const activeDef = CATEGORIES.find((c) => c.id === activeCat)!
  const filtered = PROJECTS.filter(activeDef.filter)
  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE)
  const hasMore = filtered.length > DEFAULT_VISIBLE

  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section
      id="archive"
      style={{ backgroundColor: S, borderTop: `1px solid ${HAIR}` }}
    >
      {/* Header */}
      <div
        ref={ref}
        className="px-4 sm:px-8 lg:px-16 py-8 sm:py-10 flex items-center gap-6"
        style={{ borderBottom: `1px solid rgba(25, 36, 78, 0.05)` }}
      >
        <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-[#19244E]/60">CATALOG</span>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(25, 36, 78, 0.05)" }} />
        <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] text-[#19244E]/60">Additional Works & Shipped Systems</span>
      </div>

      {/* Count + filter row */}
      <div
        className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8 flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 justify-between"
        style={{ borderBottom: `1px solid rgba(25, 36, 78, 0.05)` }}
      >
        <div className="flex items-baseline gap-3">
          <span
            className="font-display font-light text-4xl sm:text-5xl"
            style={{ color: N, letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            {filtered.length}
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-widest text-[#19244E]/60 uppercase">
            of {PROJECTS.length} projects
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => { setActiveCat(cat.id); setShowAll(false) }}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 font-sans text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C] rounded-xl cursor-pointer"
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

      {/* Catalog List View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCat}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 sm:px-8 lg:px-16 py-6 sm:py-10">
            <div className="divide-y divide-[#19244E]/10 border-t border-b border-[#19244E]/10">
              {visible.map((project, idx) => {
                const isHovered = hoveredId === project.id
                const statusColor = STATUS_COLOR[project.status] ?? `${N}80`
                const formattedNum = String(project.id).padStart(2, "0")
                const previewImg = PROJECT_PREVIEWS[project.id]

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    onMouseEnter={(e) => {
                      setHoveredId(project.id)
                      const rect = e.currentTarget.getBoundingClientRect()
                      setMousePos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      })
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setMousePos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      })
                    }}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedProject(project)}
                    className="group relative py-4 sm:py-5 px-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 transition-all duration-200 cursor-pointer select-none hover:bg-[#19244E]/[0.03] rounded-xl"
                  >
                    {/* Hover Image Preview Overlay following mouse pointer */}
                    <AnimatePresence>
                      {isHovered && previewImg && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, x: mousePos.x, y: mousePos.y - 140 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: mousePos.x,
                            y: mousePos.y - 140,
                          }}
                          exit={{ opacity: 0, scale: 0.8, x: mousePos.x, y: mousePos.y - 140 }}
                          transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 20,
                            mass: 0.4,
                          }}
                          className="hidden md:block absolute left-0 top-0 z-40 pointer-events-none -translate-x-1/2"
                        >
                          <div className="w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(25,36,78,0.45)] bg-[#141b36]">
                            <img
                              src={previewImg}
                              alt={project.name}
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Left: Number + Project Name + Client/Category */}
                    <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
                      <span className="font-sans text-sm sm:text-base font-bold tracking-wider text-[#19244E]/40 group-hover:text-[#DB3E8C] transition-colors duration-200 shrink-0">
                        {formattedNum}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display text-base sm:text-lg lg:text-xl font-semibold text-[#19244E] group-hover:text-[#DB3E8C] transition-colors duration-200 truncate">
                          {project.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                          <span className="font-sans text-[11px] sm:text-xs text-[#19244E]/60 font-medium truncate">
                            {project.client}
                          </span>
                          <span className="text-[#19244E]/30 hidden sm:inline">•</span>
                          <span className="font-sans text-[11px] sm:text-xs text-[#19244E]/50 hidden sm:inline truncate">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Year, Status Badge, WhatsApp link & Plus (+) icon */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#19244E]/5">
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-xs text-[#19244E]/50 font-medium hidden md:inline">
                          {project.year}
                        </span>
                        
                        {/* Status Badge */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#19244E]/[0.04] border border-[#19244E]/10">
                          <span className="relative flex h-1.5 w-1.5">
                            <span 
                              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                              style={{ backgroundColor: statusColor }}
                            />
                            <span 
                              className="relative inline-flex rounded-full h-1.5 w-1.5"
                              style={{ backgroundColor: statusColor }}
                            />
                          </span>
                          <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-[#19244E]/80">
                            {project.status}
                          </span>
                        </div>

                        {/* WhatsApp Quick Link */}
                        <a
                          href={getWhatsAppLink(project.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-sans text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#19244E]/50 hover:text-[#DB3E8C] transition-colors p-1"
                          title="Ask via WhatsApp"
                        >
                          💬 Ask ↗
                        </a>
                      </div>

                      {/* Plus Icon (+) - Hides preview image when hovered */}
                      <div 
                        onMouseEnter={(e) => { e.stopPropagation(); setHoveredId(null); }}
                        onMouseMove={(e) => { e.stopPropagation(); setHoveredId(null); }}
                        className="w-8 h-8 rounded-full border border-[#19244E]/15 group-hover:border-[#DB3E8C] group-hover:bg-[#DB3E8C] flex items-center justify-center transition-all duration-200 text-[#19244E]/70 group-hover:text-white shrink-0"
                      >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Show all / Show less toggle */}
          {hasMore && (
            <div
              className="flex flex-col items-center gap-3 py-6 sm:py-8 px-4 sm:px-8"
              style={{ borderTop: `1px solid rgba(25, 36, 78, 0.05)` }}
            >
              {!showAll && (
                <p className="font-sans text-xs tracking-widest text-[#19244E]/50 uppercase">
                  Showing {DEFAULT_VISIBLE} of {filtered.length} projects
                </p>
              )}
              <button
                onClick={() => {
                  if (showAll) {
                    setShowAll(false)
                    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" })
                  } else {
                    setShowAll(true)
                  }
                }}
                className="group flex items-center gap-2.5 px-6 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: showAll ? "transparent" : N,
                  color: showAll ? `${N}80` : "white",
                  border: `1px solid ${showAll ? "rgba(25,36,78,0.12)" : N}`,
                  boxShadow: showAll ? "none" : "0 4px 16px -4px rgba(25,36,78,0.20)"
                }}
              >
                {showAll ? (
                  <>
                    <span>↑ Show less</span>
                  </>
                ) : (
                  <>
                    <span>+ Show all {filtered.length} projects</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* iOS-style Bottom Sheet Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#19244E]/60 z-[200] backdrop-blur-sm cursor-pointer"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[201] max-w-[540px] mx-auto rounded-t-2xl bg-white p-5 sm:p-6 pb-10 sm:pb-12 shadow-[0_-12px_40px_rgba(25,36,78,0.2)] border-t border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              {/* Drag Handle */}
              <div 
                onClick={() => setSelectedProject(null)}
                className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-5 sm:mb-6 cursor-pointer hover:bg-gray-300 transition-colors shrink-0"
              />

              {/* Close header button */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                    [{String(selectedProject.id).padStart(2, "0")} // PROJECT DETAILS]
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mt-1 text-[#19244E]">
                    {selectedProject.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="font-sans text-xs font-bold uppercase tracking-widest text-[#19244E]/60 hover:text-[#19244E] transition-colors cursor-pointer p-1"
                >
                  Close
                </button>
              </div>

              {/* Metadata Badges */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 py-4 px-4 bg-[#F9FAFB] rounded-lg border border-gray-100 mb-6">
                {[
                  { label: "Client Partner", val: selectedProject.client },
                  { label: "Market / Territory", val: selectedProject.market },
                  { label: "Project Year", val: selectedProject.year },
                  { label: "System Status", val: selectedProject.status },
                  { label: "Category & Core Focus", val: selectedProject.category }
                ].map((meta, i) => (
                  <div key={meta.label} className={i === 4 ? "col-span-2" : ""}>
                    <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">
                      {meta.label}
                    </span>
                    {meta.label === "System Status" ? (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: STATUS_COLOR[selectedProject.status] ?? "#19244E" }} />
                        <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#19244E]">
                          {meta.val}
                        </span>
                      </div>
                    ) : (
                      <span className="font-sans text-xs sm:text-sm font-semibold text-[#19244E]">
                        {meta.val}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Scope/Description */}
              <div className="mb-8">
                <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                  System Architecture & Scope
                </span>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#19244E]/90">
                  {selectedProject.scope}
                </p>
              </div>

              {/* Close CTA & Ask WhatsApp Buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-3.5 text-sm font-bold tracking-widest uppercase text-white transition-opacity hover:opacity-85 cursor-pointer rounded-lg text-center shadow"
                  style={{ backgroundColor: N }}
                >
                  Return to Catalog
                </button>
                <a
                  href={getWhatsAppLink(selectedProject.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-sm font-semibold tracking-wider uppercase text-[#19244E]/70 hover:text-[#19244E] border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer rounded-lg text-center flex items-center justify-center gap-1.5"
                >
                  💬 Ask about this project ↗
                </a>
              </div>
            </motion.div>
          </>
        )}
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
      style={{ backgroundColor: "#0d142d", borderTop: `1px solid rgba(255, 255, 255, 0.08)` }}
    >
      {/* Header */}
      <div
        className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}
      >
        <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">CONTACT</span>
        <div className="flex-1 h-px bg-white/10" />
        <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] text-[#DB3E8C]">OPEN TO SENIOR IC & LEAD ROLES</span>
      </div>

      <div ref={ref} className="grid lg:grid-cols-[1fr_1px_480px]" style={{ minHeight: "440px" }}>
        {/* Left: headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 sm:py-16"
          style={{ borderRight: `1px solid rgba(255, 255, 255, 0.08)` }}
        >
          <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C] mb-2">REGION: SG / MY / REMOTE-FIRST</span>
          <h2
            className="font-display font-light leading-[0.95] sm:leading-[0.9] my-6 sm:my-8 text-white"
            style={{ fontSize: "clamp(2.1rem, 5.5vw, 5rem)", letterSpacing: "-0.025em" }}
          >
            Ready to build<br />something<br />
            <em className="font-normal not-italic text-[#DB3E8C]">significant?</em>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-[380px] text-white/80 font-sans" style={{ lineHeight: 1.8 }}>
            I'm open to senior IC and lead roles in Singapore, Malaysia, and remote-first regional opportunities. Happy to talk about your design challenges first.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:adinagayo@gmail.com"
              className="flex items-center gap-2 px-5 sm:px-6 py-3 text-sm font-medium text-white transition-all duration-150 hover:opacity-90 rounded-xl shadow-lg cursor-pointer"
              style={{ backgroundColor: C }}
            >
              <Mail size={14} /> Say Hello <ArrowRight size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/adinafayzagayo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 sm:px-6 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-white/10 rounded-xl cursor-pointer"
              style={{ border: `1px solid rgba(255, 255, 255, 0.2)` }}
            >
              <ExternalLink size={14} /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-white/10" />

        {/* Right: contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="flex flex-col justify-center"
          style={{ backgroundColor: "#090d1f" }}
        >
          {[
            { label: "Email", value: "adinagayo@gmail.com", sub: "Primary contact", href: "mailto:adinagayo@gmail.com" },
            { label: "Location", value: "Jakarta, Indonesia", sub: "Open for relocation" },
            { label: "Availability", value: "Open to new opportunities", sub: "" },
            { label: "LinkedIn", value: "/in/adinafayzagayo", sub: "Portfolio & recommendations", href: "https://www.linkedin.com/in/adinafayzagayo/" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="px-5 sm:px-10 py-6 sm:py-8"
              style={{ borderBottom: i < 3 ? `1px solid rgba(255, 255, 255, 0.08)` : "none" }}
            >
              <span className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-1">{item.label}</span>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.label === "LinkedIn" ? "_blank" : undefined}
                  rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="block text-sm sm:text-base font-semibold mt-1.5 sm:mt-2 mb-0.5 hover:text-[#DB3E8C] transition-colors text-white"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm sm:text-base font-semibold mt-1.5 sm:mt-2 mb-0.5 text-white">{item.value}</p>
              )}
              {item.sub && <p className="text-xs sm:text-sm text-white/50">{item.sub}</p>}
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
      className="px-8 lg:px-16 py-6 flex items-center justify-center"
      style={{ borderTop: `1px solid rgba(255, 255, 255, 0.08)`, backgroundColor: "#060914" }}
    >
      <span className="font-sans text-[10px] font-semibold tracking-widest uppercase text-white/40">© 2026 Adina Fayza Gayo</span>
    </footer>
  )
}

const FEATURED_INDEX_MAP: Record<string, number> = {
  tng: 0,
  gegi: 1,
  bijakwang: 2,
  election: 3,
  backoffice: 4,
  anlene: 5,
  archery: 6,
  myarchery: 7,
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "about" | "sunway-case" | "gegi-case" | "tng-case" | "archery-case" | "election-case" | "anlene-case" | "bijakwang-case" | "myarchery-case" | "backoffice-case">("home")
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState<number>(0)
  const activeSection = useScrollSpy(["home", "work", "process", "archive", "contact"])

  const handleOpenProject = (id: string) => {
    if (FEATURED_INDEX_MAP[id] !== undefined) {
      setActiveFeaturedIndex(FEATURED_INDEX_MAP[id])
    }
    if (id === "gegi") setCurrentView("gegi-case")
    if (id === "tng") setCurrentView("tng-case")
    if (id === "archery") setCurrentView("archery-case")
    if (id === "election") setCurrentView("election-case")
    if (id === "anlene") setCurrentView("anlene-case")
    if (id === "bijakwang") setCurrentView("bijakwang-case")
    if (id === "myarchery") setCurrentView("myarchery-case")
    if (id === "backoffice") setCurrentView("backoffice-case")
    if (id === "sunway") setCurrentView("sunway-case")
  }

  const handleBackToWork = () => {
    setCurrentView("home")
    setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "instant", block: "start" })
    }, 20)
  }

  if (currentView === "about") {
    return (
      <AboutMe
        onBack={() => { setCurrentView("home"); window.scrollTo({ top: 0 }) }}
      />
    )
  }

  if (currentView === "tng-case") {
    return (
      <TngCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("gegi"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("myarchery"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "gegi-case") {
    return (
      <GegiCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("bijakwang"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("tng"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "bijakwang-case") {
    return (
      <BijakWangCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("election"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("gegi"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "election-case") {
    return (
      <ElectionCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("backoffice"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("bijakwang"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "backoffice-case") {
    return (
      <BackofficeCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("anlene"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("election"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "anlene-case") {
    return (
      <AnleneCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("archery"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("backoffice"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "archery-case") {
    return (
      <ProArcheryCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("myarchery"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("anlene"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "myarchery-case") {
    return (
      <MyArcheryCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("tng"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("archery"); window.scrollTo({ top: 0 }) }}
      />
    )
  }

  if (currentView === "sunway-case") {
    return (
      <SunwayCase
        onBack={handleBackToWork}
      />
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: S }}>
      <HeroSection onReadMore={() => { setCurrentView("about"); window.scrollTo({ top: 0 }) }} />
      <FeaturedWorkSection
        activeIndex={activeFeaturedIndex}
        onActiveIndexChange={setActiveFeaturedIndex}
        onOpenProject={handleOpenProject}
      />
      <WorkflowSection />
      <ProjectArchiveSection />
      <ContactSection />
      <Footer />
      <FloatingDock activeSection={activeSection} />
    </div>
  )
}
