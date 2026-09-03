import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence, useScroll, useTransform } from "motion/react"
import adinaPhotoAbout from "@/imports/Foto At Work.png"
import adinaPhotoLife from "@/imports/Foto In Life.jpg"
import afgLogo from "@/imports/LOGO.png"
import heroBgImage from "@/imports/smooth-abstract-space-with-flowing-lines-curves-monochromatic-palette.jpg"
import gettyBgVideo from "@/imports/GettyImages-1152749158.mp4"
import coverTng from "@/imports/Cover TNG.jpg"
import tngThumb4 from "@/imports/TNG thumb4.png"
import tngThumb5 from "@/imports/TNG thumb5.png"
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
import anleneThumb from "@/imports/Anlene thumb.jpg"
import anleneThumb2 from "@/imports/anlene thumb 2.png"
import anleneThumb3 from "@/imports/anlene thumb 3.png"
import anleneThumb4 from "@/imports/anlene thumb 4.png"
import anleneThumb5 from "@/imports/anlene thumb 5.png"
import anleneThumb6 from "@/imports/anlene thumb 6.png"
import ci1 from "@/imports/CI1.png"
import ci2 from "@/imports/CI2.png"
import ci3 from "@/imports/CI3.png"
import ci4 from "@/imports/CI4.png"
import ocbcThumb from "@/imports/thumb ocbc gegi.jpg"
import samaloopThumb from "@/imports/Samaloop thumb.jpg"
import telescopeThumb from "@/imports/Telescope thumb.jpg"
import gelmShopeeThumb from "@/imports/gelm shopee thumn.jpg"
import grabThumb from "@/imports/GRAB THUMB.jpg"
import aseanThumb from "@/imports/asean thumb.jpg"
import familyMooThumb from "@/imports/family moo thumb.jpg"
import yametThumb from "@/imports/yamet thumb.jpg"
import friendsureThumb from "@/imports/Friendsure thumbnail.jpg"
import mikrosayangThumb from "@/imports/mikrosayang thumb.jpg"
import mykawanThumb from "@/imports/mykawan thumb.jpg"
import disnavThumb from "@/imports/disnav thumb.jpg"
import adaPolisiThumb from "@/imports/ada polisi thumb.jpg"
import ftjslThumb from "@/imports/FTJSL Thumbnail.jpg"
import telkomSiagaVideo from "@/imports/telkom-siaga.mp4"
import mykawanGegmThumb from "@/imports/Mykawan GEGM thumb.jpg"
import drGadgetThumb from "@/imports/dr gadget thumb.jpg"
import sunwayThumb from "@/imports/sunway thumb.jpg"
import mySalamThumb from "@/imports/my salam thumb.jpg"
import eSaksiThumb from "@/imports/e-saksi thumb.jpg"
import proArcheryThumb from "@/imports/proarcherythumb5.jpg"
import backofficePortalThumb from "@/imports/backoffice portal thumb.jpg"
import myArcheryPerpaniThumb from "@/imports/myarchery thumb.jpg"
import section3PhaseBg from "@/imports/section 3 phase.jpg"

import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import {
  Home, Briefcase, Layers, Archive, Mail,
  ArrowRight, ArrowDown, ExternalLink, Globe, Zap,
  Users, CheckCircle, Coins, Bot, LayoutGrid,
  ArrowUpRight, ChevronRight, MousePointer2, Plus, Linkedin, Download,
  Search, Target, FileCheck, FileText, X, Eye, ChevronDown, ChevronUp, MessageSquare,
} from "lucide-react"

import GegiCase from "./components/GegiCase"
import TngCase from "./components/TngCase"
import ProArcheryCase from "./components/ProArcheryCase"
import ElectionCase from "./components/ElectionCase"
import AnleneCase from "./components/AnleneCase"
import BijakWangCase from "./components/BijakWangCase"
import MyArcheryCase from "./components/MyArcheryCase"
import BackofficeCase from "./components/BackofficeCase"
import AboutMe from "./components/AboutMe"
import { CaseStudySwipeWrapper, CaseStudyMeta } from "./components/ui/CaseStudySwipeWrapper"

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
    num: "01", name: "Seamless Micro Insurance Integration", client: "Touch 'n Go × GEGM",
    location: "MY", year: "2025", tags: ["PWA / SSO", "eKYC Data Mapping", "B2C / FinTech"],
    role: "Sole Product Designer",
    headline: "Great Tenang Madani micro insurance product integrated directly into Touch 'n Go eWallet ecosystem across 5 design iterations.",
    metrics: [{ val: "V5", sub: "Final Release" }, { val: "3mo", sub: "Sprint Timeline" }, { val: "RM0", sub: "PTV Checkout" }],
    projectId: "tng",
    thumb: coverTng,
    screens: [
      { src: coverTng, label: "01 · WALLET DASHBOARD" },
      { src: tngThumb4, label: "02 · EKYC DATA MAPPING" },
      { src: tngThumb5, label: "03 · POLICY CHECKOUT" },
    ],
  },
  {
    num: "02", name: "Gamified CI Evaluation & Acquisition", client: "GEGI Singapore",
    location: "SG", year: "2026", tags: ["Gamified Evaluation", "Singlish Persona", "Campaign"],
    role: "Sole Product Designer",
    headline: "An interactive digital acquisition campaign assessing critical illness protection gaps for Great Eastern Singapore.",
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
    num: "03", name: "Kahoot to In House: Roadshow Tournament Platform", client: "mySalam × myKawan",
    location: "MY", year: "2025", tags: ["Live Tournament", "100K Concurrent", "Gamified Financial Literacy"],
    role: "Sole Product Designer",
    headline: "Evolving My Money Sense into a dual mode live tournament platform for mySalam regional roadshows.",
    metrics: [{ val: "2 Mode", sub: "Practice & Tournament" }, { val: "2wk", sub: "First Release Sprint" }, { val: "3 People", sub: "Lean Product Team" }],
    projectId: "bijakwang",
    thumb: mySalamThumb,
    screens: [
      { src: mySalamThumb, label: "01 · LOBBY & CHALLENGES" },
      { src: mykawan2, label: "02 · REGISTRATION & ONBOARDING" },
      { src: mykawan3, label: "03 · LIVE QUIZ INTERACTION" },
      { src: mykawan4, label: "04 · RESKILLS REWARDS" },
      { src: mykawan5, label: "05 · LEADERBOARD & RANKINGS" },
    ],
  },
  {
    num: "04", name: "38 Province Real Time Election Monitoring", client: "Indonesian Political Party",
    location: "ID", year: "2024", tags: ["Public Sector", "Civic Tech", "Real Time CMS"],
    role: "Sole Product Designer",
    headline: "A multi platform system for real time vote monitoring across 38 provinces and 820,000+ TPS within a 48 hour window.",
    metrics: [{ val: "38", sub: "Provinces Monitored" }, { val: "820K+", sub: "TPS Polling Stations" }, { val: "48h", sub: "Tabulation Window" }],
    projectId: "election",
    thumb: eSaksiThumb,
    screens: [
      { src: eSaksiThumb, label: "01 · REAL TIME TABULATION" },
      { src: projectThumb1, label: "02 · PROVINCIAL MATRIX" },
      { src: projectThumb2, label: "03 · VERIFICATION CMS" },
    ],
  },
  {
    num: "05", name: "Multi Tenant White Label Backoffice Architecture", client: "Regional SuperApps & FinTech",
    location: "SG/MY/ID", year: "2024 to 2025", tags: ["White Label Engine", "Design System Tokens", "Data Analytics"],
    role: "Sole Product Designer",
    headline: "Building a reusable two track white label and analytics pattern to serve enterprise tenants with different operational needs.",
    metrics: [{ val: "2 Track", sub: "Delivery Model" }, { val: "1 to 3h", sub: "Tenant Setup" }, { val: "0", sub: "BE Query Timeouts" }],
    projectId: "backoffice",
    thumb: backofficePortalThumb,
    screens: [
      { src: backofficePortalThumb, label: "01 · DUAL TRACK ARCHITECTURE" },
      { src: projectThumb2, label: "02 · MULTI TENANT DASHBOARD" },
      { src: projectThumb1, label: "03 · ISOLATED FILTER ENGINE" },
    ],
  },
  {
    num: "06", name: "Bone Density & Health Check Passport Redesign", client: "Fonterra × Anlene",
    location: "ID", year: "2023", tags: ["Health Tech", "Field Sales Enablement", "Diagnostic Matrix"],
    role: "Sole Product Designer",
    headline: "Redesigning Anlene's field health check experience end to end, turning diagnostic scanner data into personalized health reports.",
    metrics: [{ val: "5", sub: "Health Metrics Logic" }, { val: "2", sub: "Diagnostic Scanners" }, { val: "2 Phase", sub: "Multi Year Sprint" }],
    projectId: "anlene",
    thumb: anleneThumb,
    screens: [
      { src: anleneThumb, label: "01 · HEALTH PASSPORT" },
      { src: anleneThumb2, label: "02 · DIAGNOSTIC MATRIX" },
      { src: anleneThumb3, label: "03 · BONE SCAN DATA" },
      { src: anleneThumb4, label: "04 · FIELD SALES INTAKE" },
      { src: anleneThumb5, label: "05 · CHECKOUT RESULTS" },
      { src: anleneThumb6, label: "06 · REPORTS & ANALYTICS" },
    ],
  },
  {
    num: "07", name: "Pro Archery 4 Surface Digital Ecosystem", client: "Pro Archery Jakarta",
    location: "ID", year: "2025", tags: ["AI Prompt to Code", "E Commerce", "Admin POS"],
    role: "Sole System & UI Designer",
    headline: "Turning Indonesia's premier physical archery retailer into a 4 surface digital ecosystem starting with a 24 hour AI built landing page.",
    metrics: [{ val: "24h", sub: "POC Delivery" }, { val: "4", sub: "Surfaces Built" }, { val: "1yr", sub: "Ongoing Engagement" }],
    projectId: "archery",
    thumb: proArcheryThumb,
    screens: [
      { src: proArcheryThumb, label: "01 · E COMMERCE PORTAL" },
      { src: projectThumb2, label: "02 · POS ADMIN DASHBOARD" },
      { src: projectThumb1, label: "03 · AI PROMPT ARCHITECTURE" },
    ],
  },
  {
    num: "08", name: "MyArchery PERPANI National Operating System", client: "PERPANI / MyArchery",
    location: "ID", year: "2021 to 2023", tags: ["Sports Tech", "Field UX Research", "Tournament Engine"],
    role: "Lead UX Researcher & Product Designer",
    headline: "Designing Indonesia's tournament operating system and real time scoring platform for official PERPANI national championships.",
    metrics: [{ val: "7+", sub: "Public Releases" }, { val: "2yr", sub: "Field Research Lifecycle" }, { val: "3 People", sub: "Remote WFA Team" }],
    projectId: "myarchery",
    thumb: myArcheryPerpaniThumb,
    screens: [
      { src: myArcheryPerpaniThumb, label: "01 · SCORING KEYPAD" },
      { src: projectThumb2, label: "02 · ADMIN DASHBOARD" },
      { src: projectThumb1, label: "03 · LIVE SCOREBOARD" },
    ],
  },
]

const PROJECTS: Project[] = [
  // ── 2026 ──────────────────────────────────────────────────────────────────────
  { id: 1,  name: "OCBC Insurance",        client: "Great Eastern Indonesia (GEGI) × OCBC", market: "Indonesia", year: 2026, status: "LIVE",          category: "Banking & InsurTech",         scope: "End to end insurance acquisition flow built with a custom standalone banking UI Kit from scratch." },
  { id: 2,  name: "GE × Shopee Insurance", client: "Great Eastern Malaysia × Shopee",  market: "Malaysia",    year: 2026, status: "LIVE",          category: "InsurTech & E Commerce",      scope: "Insurance product integration and purchase flow embedded within Shopee Malaysia's ecosystem." },
  { id: 3,  name: "Portal Sunway × GEGM",   client: "Great Eastern Malaysia × Sunway",   market: "Malaysia",    year: 2026, status: "LIVE",          category: "SuperApp & InsurTech",        scope: "Integrasi 4 produk embedded web di dalam Sunway Super App." },
  { id: 4,  name: "Haruuz Internal System",client: "Mikrosayang",                      market: "Malaysia",    year: 2026, status: "PRODUCTION",    category: "Internal System",             scope: "Internal management system for Mikrosayang's operational workflows and data tracking." },
  // ── 2025 ──────────────────────────────────────────────────────────────────────
  { id: 5,  name: "Grab Data Pipeline",    client: "Grab",                             market: "Indonesia",   year: 2025, status: "LIVE INTERNAL", category: "Enterprise B2B / FinTech",    scope: "Tri-party data exchange flow & middleware logic mapping across Grab, insurance, and FTI." },
  { id: 6,  name: "myKawan AI Engine",     client: "myKawan",                          market: "Malaysia",    year: 2025, status: "PRODUCTION",    category: "AI / Marketing Automation",   scope: "Internal AI powered CMS tool for automated marketing copy, articles, images, and media generation." },
  { id: 7,  name: "MyKawan × GEGM",        client: "Great Eastern Malaysia × myKawan",  market: "Malaysia",    year: 2025, status: "LIVE",          category: "InsurTech & Protection",      scope: "Asuransi kesehatan dan proteksi digital Protect Active dan Great Shield Active." },
  { id: 8,  name: "Teman E Commerce",      client: "Teman",                            market: "Indonesia",   year: 2025, status: "PROTOTYPE",     category: "AI & Retail E Commerce",      scope: "AI driven product recommendation engine and personalized purchase flow integration." },
  { id: 9,  name: "Samaloop",              client: "Samaloop",                         market: "Indonesia",   year: 2025, status: "LIVE",          category: "EdTech & Marketplace",        scope: "Corporate website and public speaking coach directory booking platform." },
  { id: 10, name: "Telkom Siaga",          client: "Telkom · Freelance Work",          market: "Indonesia",   year: 2025, status: "ARCHIVED",      category: "Interactive Display",         scope: "Membuat tampilan layar LED dan web untuk input ucapan tahun baru." },
  // ── 2024 ──────────────────────────────────────────────────────────────────────
  { id: 11, name: "Friendsure × Dr Gadget",client: "Friendsure × Dr Gadget",          market: "Malaysia",    year: 2024, status: "LIVE",          category: "Customer & Admin Portal",     scope: "Menyediakan customer dan admin portal untuk alur layanan servis." },
  { id: 12, name: "Family Moo",            client: "Fonterra Indonesia",               market: "Indonesia",   year: 2024, status: "LIVE",          category: "FMCG & Loyalty Portal",       scope: "Customer loyalty management and points redemption portal for Fonterra's consumer ecosystem." },
  { id: 13, name: "Telescope Indonesia",   client: "Telescope Indonesia",              market: "Indonesia",   year: 2024, status: "LIVE",          category: "B2B Industrial Catalog",      scope: "Digital product catalog and technical specification showcase for specialized equipment." },
  { id: 14, name: "ASEAN Project Management System", client: "ASEAN Secretariat", market: "ASEAN / Regional", year: 2024, status: "LIVE INTERNAL", category: "Regional / Multi-Gov", scope: "Manajemen siklus proyek multilateral, pelaporan anggaran lintas negara, dan alur persetujuan multi level antar delegasi." },
  { id: 15, name: "Distrik Navigasi Portal", client: "Maritime Operations", market: "Indonesia", year: 2024, status: "PRODUCTION", category: "Internal Enterprise", scope: "Digitalisasi alur operasional sarana bantu navigasi pelayaran, pemantauan aset maritim, dan koordinasi staf teknis lapangan." },
  // ── 2022 ──────────────────────────────────────────────────────────────────────
  { id: 16, name: "YAMET Center",          client: "YAMET Child Development",          market: "Indonesia",   year: 2022, status: "LIVE",          category: "Healthcare Portal",           scope: "Corporate website and service directory for child development clinics across Indonesia." },
  { id: 17, name: "Ada Polisi",            client: "Internal Public Sector",           market: "Indonesia",   year: 2022, status: "ARCHIVED",      category: "Public Sector Mobile App",    scope: "Internal mobile system for law enforcement data entry and reporting." },
  { id: 18, name: "Forum TJSL Portal",     client: "BUMN Ecosystem",                   market: "Indonesia",   year: 2022, status: "LIVE",          category: "CSR Governance",              scope: "Standardisasi pelaporan CSR terpusat, aggregasi metrik dampak sosial lintas perusahaan pelat merah, dan transparansi tata kelola audit." },
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
    const handleScroll = () => {
      if (window.scrollY < 150) {
        setActive("home")
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && window.scrollY >= 150) {
            setActive(e.target.id)
          }
        })
      },
      { rootMargin: "-30% 0px -40% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      obs.disconnect()
    }
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

// ─── Proximity Letter Wave Component (Fast & Smooth Top Studio Micro-Interaction) ─────────
const ProximityLetter = ({
  char,
  color,
  mouseX,
}: {
  char: string
  color: string
  mouseX: number | null
}) => {
  const letterRef = useRef<HTMLSpanElement>(null)
  const [offsetY, setOffsetY] = useState(0)
  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    if (mouseX === null || !letterRef.current) {
      setOffsetY(0)
      setRotate(0)
      return
    }

    const rect = letterRef.current.getBoundingClientRect()
    const letterCenterX = rect.left + rect.width / 2
    const dist = Math.abs(mouseX - letterCenterX)
    const maxRadius = 90

    if (dist < maxRadius) {
      const factor = Math.cos((dist / maxRadius) * (Math.PI / 2))
      setOffsetY(-15 * factor)
      setRotate(-4.5 * factor * (mouseX < letterCenterX ? -1 : 1))
    } else {
      setOffsetY(0)
      setRotate(0)
    }
  }, [mouseX])

  return (
    <motion.span
      ref={letterRef}
      className="inline-block"
      style={{ color }}
      animate={{ y: offsetY, rotate }}
      transition={{ type: "spring", stiffness: 520, damping: 26, mass: 0.55 }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  )
}

const WavyHeadlineText = ({ text, color }: { text: string; color: string }) => {
  const [mouseX, setMouseX] = useState<number | null>(null)

  return (
    <div
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
      className="block cursor-pointer select-none py-1"
    >
      {text.split("").map((char, index) => (
        <ProximityLetter key={index} char={char} color={color} mouseX={mouseX} />
      ))}
    </div>
  )
}

// ─── PDF PREVIEW MODAL COMPONENT ───────────────────────────────────────────────
function PdfPreviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="w-full max-w-5xl h-[88vh] bg-[#0F172A] text-white rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dark Custom Header Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-[#090D16] border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
              {/* Title & Document Badge */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-[#DB3E8C]/20 border border-[#DB3E8C]/30 text-[#DB3E8C] flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-xs sm:text-sm font-bold tracking-tight text-white truncate">
                    ADINA FAYZA GAYO
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/60 truncate">
                    Product Designer · Technical Resume (PDF)
                  </span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Open in Tab */}
                <a
                  href="/resume-adina-fayza-gayo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10 cursor-pointer"
                >
                  <span>Open in Tab</span>
                  <ExternalLink size={13} />
                </a>

                {/* Download PDF */}
                <a
                  href="/resume-adina-fayza-gayo.pdf"
                  download="ADINA FAYZA GAYO Resume 2026.pdf"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold bg-[#DB3E8C] text-white hover:bg-[#c2337b] transition-all shadow-sm cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  aria-label="Close PDF Preview"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full h-full bg-[#1E293B] relative">
              <iframe
                src="/resume-adina-fayza-gayo.pdf#toolbar=1"
                className="w-full h-full border-none"
                title="Adina Fayza Gayo Resume PDF"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Hero Spring Config ───────────────────────────────────────────────────────
const HERO_SPRING = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as const, duration: 0.7 }

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ onReadMore, onOpenPdfPreview }: { onReadMore: () => void; onOpenPdfPreview?: () => void }) {
  const [isAtWork, setIsAtWork] = useState(true)
  const [tick, setTick] = useState(0)
  const HELLOS = ["Hi, it's Dina!", "Halo, saya Dina!", "안녕하세요, 디나예요!"]

  const { scrollY } = useScroll()

  // Subtle Scale & Dim Transition (Cinematic Fade) on Scroll (0px -> 360px)
  const heroScale = useTransform(scrollY, [0, 360], [1, 0.96])
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0.05])

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % HELLOS.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Ultra-Subtle 3D Organic Architectural Waves BG Image with Mask Fade */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.14] mix-blend-multiply"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 92%)",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 92%)",
        }}
      >
        <img
          src={heroBgImage}
          alt=""
          className="w-full h-full object-cover object-center scale-105 filter blur-[1.5px]"
        />
      </div>

      {/* ── Sliding viewports wrapper (Parallax Fade & Scale on Scroll) ── */}
      <motion.div
        style={{
          scale: heroScale,
          opacity: heroOpacity,
        }}
        className="relative z-10 flex-1 flex flex-col justify-between bg-transparent origin-top"
      >
        {/* ── Top nav bar (Transparent Child) ── */}
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 lg:py-6 bg-transparent shrink-0 relative z-30 flex-wrap gap-3 sm:gap-6">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4 lg:gap-6 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm lg:text-base font-black tracking-[0.16em] text-[#19244E] select-none uppercase whitespace-nowrap">
              ADINA GAYO PORTFOLIO
            </span>
          </div>

          {/* Mode Switcher (At Work / In Life) */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0F172A]/5 backdrop-blur-md p-1 rounded-full border border-[#0F172A]/10 shrink-0">
            <button
              onClick={() => setIsAtWork(true)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isAtWork ? "bg-[#0F172A] text-white shadow-sm" : "text-[#0F172A]/60 hover:text-[#0F172A]"
              }`}
            >
              At Work
            </button>
            <button
              onClick={() => setIsAtWork(false)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                !isAtWork ? "bg-[#DB3E8C] text-white shadow-sm" : "text-[#0F172A]/60 hover:text-[#0F172A]"
              }`}
            >
              In Life
            </button>
          </div>
        </div>
      </div>

        {/* Sliding Dual Panels Container */}
        <div className="relative w-full flex-1 overflow-hidden">
          <motion.div
            animate={{ x: isAtWork ? "0%" : "-50%" }}
            transition={HERO_SPRING}
            className="flex relative z-10 bg-transparent w-[200%] min-w-[200%]"
            style={{ width: "200%" }}
          >
            {/* ── PANEL A: AT WORK ── */}
            <div className="w-1/2 min-w-[50%] flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-2 sm:pt-4 pb-32 sm:pb-40 min-h-[calc(100vh-100px)] shrink-0 bg-transparent">
              {/* Top Oversized Asymmetrical Headline & Floating Bio Container */}
              <div className="w-full mt-3 sm:mt-5 lg:mt-7 mb-auto flex flex-col justify-between bg-transparent">
                {/* 1. Full-Width Jumbo Headline Stack (Top) */}
                <div className="w-full flex flex-col items-center sm:items-start select-none cursor-default bg-transparent relative z-0">
                  <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="font-normal leading-[0.86] tracking-tight text-center sm:text-left select-none cursor-default bg-transparent w-full"
                    style={{
                      fontSize: "clamp(3.8rem, 11.5vw, 12.5rem)",
                      fontFamily: "'Instrument Serif', Georgia, serif",
                    }}
                  >
                    <span className="block text-[#0F172A] font-normal">
                      Smart Systems.
                    </span>
                    <span
                      className="block font-normal transition-all duration-300 mt-2 sm:mt-3 lg:mt-4 ml-0 sm:ml-6 lg:ml-12 text-[#DB3E8C]"
                      style={{
                        fontFamily: "'Instrument Serif', Georgia, serif",
                      }}
                    >
                      Thoughtful Interfaces.
                    </span>
                  </motion.h1>
                </div>

                {/* 2. Bottom Stack (2-Column Parallel Layout directly under Headline) */}
                <div className="w-full mt-8 sm:mt-10 lg:mt-12 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 sm:gap-8 bg-transparent relative z-10">
                  {/* Left Column Technical Specs & Metrics under Headline */}
                  <div className="flex flex-col items-center sm:items-start gap-3 font-mono text-xs text-[#19244E] text-center sm:text-left shrink-0 mb-1 relative z-20 w-full lg:w-auto">
                    {/* Shipped Systems Counter (2 lines on mobile, 1 line on desktop) */}
                    <div className="flex items-center sm:items-start justify-center sm:justify-start gap-2 font-bold tracking-wider text-[#DB3E8C]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DB3E8C] animate-pulse shrink-0 sm:mt-1" />
                      <div className="text-[#19244E] flex flex-col sm:flex-row sm:items-center sm:gap-1.5 text-center sm:text-left leading-tight sm:leading-normal">
                        <span className="whitespace-nowrap">15+ SHIPPED SYSTEMS</span>
                        <span className="hidden sm:inline text-[#DB3E8C]">·</span>
                        <span className="whitespace-nowrap">5+ YRS INDUSTRIAL EXP</span>
                      </div>
                    </div>

                    {/* Technical Radar Specs Table */}
                    <div className="grid grid-cols-[60px_1fr] gap-y-1.5 gap-x-3 text-[11px] tracking-wide text-[#19244E]/85 pt-2 border-t border-[#19244E]/12 max-w-xs sm:max-w-sm text-left mx-auto sm:mx-0">
                      <div className="font-bold text-[#DB3E8C] uppercase">ROLE</div>
                      <div className="font-medium text-[#19244E]">Product Designer</div>

                      <div className="font-bold text-[#DB3E8C] uppercase">BASE</div>
                      <div className="font-medium text-[#19244E]">Jakarta, ID (Open for Global Relocation)</div>

                      <div className="font-bold text-[#DB3E8C] uppercase">MODE</div>
                      <div className="font-medium text-[#19244E]">Remote, hybrid, or on-site</div>

                      <div className="font-bold text-[#DB3E8C] uppercase">STATUS</div>
                      <div className="font-bold text-[#19244E] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
                        Open to Team Roles
                      </div>

                    </div>
                  </div>

                  {/* Floating Bio Card with Subtle Soft Shadow */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-xl bg-white/50 sm:bg-white/60 backdrop-blur-sm p-5 sm:p-6 rounded-3xl shadow-sm sm:shadow-[0_4px_24px_rgba(25,36,78,0.06)] relative z-20 ml-auto"
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                      {/* Small Avatar Photo */}
                      <div
                        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-md shrink-0 transition-transform duration-300 hover:rotate-0 hover:scale-105"
                        style={{ transform: "rotate(-3deg)" }}
                      >
                        <ImageWithFallback
                          src={adinaPhotoAbout}
                          alt="Adina Fayza Gayo - At Work"
                          className="w-full h-full object-cover object-top rounded-2xl"
                        />
                      </div>

                      {/* Bio Paragraph & Conversion CTAs */}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#19244E]/90">
                          <span className="font-bold text-[#DB3E8C] inline-flex items-center gap-1 mr-1.5">
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={tick}
                                initial={{ y: 2, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -2, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block"
                              >
                                {HELLOS[tick]}
                              </motion.span>
                            </AnimatePresence>
                          </span>
                          I design end-to-end B2B platforms across fintech, e-commerce, and enterprise systems. I turn messy logic into clear edge cases and developer-ready Figma specs.
                        </p>

                        {/* Thin Divider Line */}
                        <div className="w-full h-[1px] bg-[#19244E]/10 my-3.5" />

                        {/* Action Buttons Row (Order: Resume -> Let's Chat -> Email) */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 mb-2.5">
                          {/* 1. Resume Download & In-App PDF Preview Button */}
                          <button
                            onClick={onOpenPdfPreview}
                            className="flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wider transition-all duration-150 rounded-xl px-3.5 py-2 cursor-pointer shadow-sm bg-white"
                            style={{ border: `1px solid ${HAIR}`, color: `${N}DD` }}
                            onMouseEnter={(e) => {
                              ;(e.currentTarget as HTMLElement).style.backgroundColor = N
                              ;(e.currentTarget as HTMLElement).style.color = W
                              ;(e.currentTarget as HTMLElement).style.borderColor = N
                            }}
                            onMouseLeave={(e) => {
                              ;(e.currentTarget as HTMLElement).style.backgroundColor = W
                              ;(e.currentTarget as HTMLElement).style.color = `${N}DD`
                              ;(e.currentTarget as HTMLElement).style.borderColor = HAIR
                            }}
                          >
                            <span>Resume</span>
                            <Eye size={14} />
                          </button>

                          {/* 2. Let's Chat WhatsApp Button */}
                          <a
                            href={getGeneralWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans text-xs font-semibold tracking-wider transition-all duration-150 rounded-xl px-3.5 py-2 whitespace-nowrap cursor-pointer shadow-sm flex items-center gap-1.5"
                            style={{ border: `1px solid ${N}`, color: N, backgroundColor: "transparent" }}
                            onMouseEnter={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = N; ;(e.currentTarget as HTMLElement).style.color = W }}
                            onMouseLeave={(e) => { ;(e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; ;(e.currentTarget as HTMLElement).style.color = N }}
                          >
                            <span>Let's Chat</span>
                            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                          </a>

                          {/* 3. Email Icon Button */}
                          <div className="relative group">
                            <a
                              href="mailto:adinagayo@gmail.com"
                              aria-label="Email Adina Fayza Gayo"
                              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150 cursor-pointer shadow-sm bg-white"
                              style={{ border: `1px solid ${HAIR}`, color: N }}
                              onMouseEnter={(e) => {
                                ;(e.currentTarget as HTMLElement).style.borderColor = N
                                ;(e.currentTarget as HTMLElement).style.backgroundColor = N
                                ;(e.currentTarget as HTMLElement).style.color = W
                              }}
                              onMouseLeave={(e) => {
                                ;(e.currentTarget as HTMLElement).style.borderColor = HAIR
                                ;(e.currentTarget as HTMLElement).style.backgroundColor = W
                                ;(e.currentTarget as HTMLElement).style.color = N
                              }}
                            >
                              <Mail size={15} />
                            </a>

                            <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 hidden group-hover:flex items-center gap-2 bg-[#19244E] text-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-mono font-medium whitespace-nowrap z-50 pointer-events-none transition-all duration-200">
                              <span className="w-2 h-2 rounded-full bg-[#DB3E8C]" />
                              <span>adinagayo@gmail.com</span>
                            </div>
                          </div>

                          {/* 4. LinkedIn Icon Button */}
                          <div className="relative group">
                            <a
                              href="https://www.linkedin.com/in/adinafayzagayo/"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn Adina Fayza Gayo"
                              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150 cursor-pointer shadow-sm bg-white"
                              style={{ border: `1px solid ${HAIR}`, color: N }}
                              onMouseEnter={(e) => {
                                ;(e.currentTarget as HTMLElement).style.borderColor = N
                                ;(e.currentTarget as HTMLElement).style.backgroundColor = N
                                ;(e.currentTarget as HTMLElement).style.color = W
                              }}
                              onMouseLeave={(e) => {
                                ;(e.currentTarget as HTMLElement).style.borderColor = HAIR
                                ;(e.currentTarget as HTMLElement).style.backgroundColor = W
                                ;(e.currentTarget as HTMLElement).style.color = N
                              }}
                            >
                              <Linkedin size={15} />
                            </a>

                            <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 hidden group-hover:flex items-center gap-2 bg-[#19244E] text-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-mono font-medium whitespace-nowrap z-50 pointer-events-none transition-all duration-200">
                              <span className="w-2 h-2 rounded-full bg-[#0077B5]" />
                              <span>/in/adinafayzagayo</span>
                            </div>
                          </div>
                        </div>

                        {/* Link: VIEW FULL PROFILE › */}
                        <button
                          onClick={onReadMore}
                          className="font-sans text-xs font-bold tracking-wider uppercase text-[#DB3E8C] hover:underline transition-all flex items-center justify-center sm:justify-start gap-1 focus:outline-none cursor-pointer py-0.5 mx-auto sm:mx-0"
                        >
                          <span>VIEW FULL PROFILE</span>
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ── PANEL B: IN LIFE ── */}
            <div className="w-1/2 min-w-[50%] flex flex-col justify-between px-4 sm:px-8 lg:px-20 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 min-h-[calc(100vh-140px)] shrink-0 bg-transparent">
            {/* Centered Editorial Headline & Bio */}
            <div className="flex flex-col items-center max-w-5xl mx-auto my-auto w-full bg-transparent">
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-normal leading-[0.96] sm:leading-[0.90] tracking-tight text-center group select-none cursor-default bg-transparent"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 7.8rem)",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                }}
              >
                <WavyHeadlineText text="Plot Twists. Live Acoustics." color="#0F172A" />
                <WavyHeadlineText text="Front Row Crowds" color="#DB2777" />
              </motion.h1>

              {/* Bio Block with Photo on Left & Bio Text + Greeting on Right */}
              <div className="mt-6 sm:mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7 text-center sm:text-left bg-transparent">
                {/* Small Photo on Left */}
                <div
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md shrink-0 transition-transform duration-300 hover:rotate-0 hover:scale-105"
                  style={{ transform: "rotate(3deg)" }}
                >
                  <ImageWithFallback
                    src={adinaPhotoLife}
                    alt="Adina Fayza Gayo - In Life"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                </div>

                {/* Bio Text & Greeting merged */}
                <div className="flex-1 bg-transparent">
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-[#19244E]/85 mb-5">
                    <span className="font-bold text-[#DB3E8C] inline-block mr-1.5">
                      Life in motion ✨
                    </span>
                    Off-screen, I swap design systems for live gigs, thriller K-Dramas, and genre-hopping playlists. Equal parts concert-goer and spreadsheet enthusiast. I track my books, chase Sudoku high scores, and plan trips down to the exact transit route.
                  </p>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 bg-transparent">
                    <a
                      href="mailto:adinagayo@gmail.com"
                      className="px-7 py-3.5 text-xs font-bold tracking-wider uppercase text-white transition-all duration-150 hover:opacity-90 shadow-sm flex items-center gap-2 cursor-pointer rounded-xl"
                      style={{ backgroundColor: C }}
                    >
                      Let's grab coffee <ArrowUpRight size={13} />
                    </a>
                    <button
                      onClick={onReadMore}
                      className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-[#DB3E8C] hover:underline transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer py-1"
                    >
                      View Full Profile <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metadata Strip (Transparent & No Vertical/Horizontal Stroke Lines) */}
            <div className="w-full pt-10 pb-16 sm:pb-20 bg-transparent">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-transparent">
                <div className="flex items-center gap-2.5 bg-transparent">
                  <span className="w-2 h-2 rounded-full bg-[#DB3E8C] shrink-0" />
                  <div>
                    <span className="text-[9.5px] font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      ON ROTATION
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-[#19244E]/85">
                      Detective K-Dramas & local concert gigs
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-transparent">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
                  <div>
                    <span className="text-[9.5px] font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
                      SUPERPOWER
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-[#19244E]/85">
                      Multi-currency travel itineraries
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
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
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
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
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
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
            </motion.div>
          )
        })}
      </div>

      {/* Interactive Drag & Zoom Helper Text (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-sans font-medium text-white/50 tracking-wider uppercase z-40 pointer-events-none whitespace-nowrap">
        Drag to shuffle or click to expand screens
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
            className="relative h-[340px] lg:h-[400px] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl flex-shrink-0 bg-[#141b36] group/item cursor-grab"

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
          className="relative w-[95%] aspect-[16/10] max-h-[96%] rounded-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] bg-[#141b36] flex items-center justify-center cursor-grab"

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
  activeIndex,
  onActiveIndexChange,
  onOpenProject,
}: {
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  onOpenProject: (projectId: string) => void
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Mobile Showcase State & Refs
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)
  const mobileChipsRef = useRef<HTMLDivElement>(null)

  const handleMobileChipClick = (index: number) => {
    setMobileActiveIndex(index)
    if (mobileCarouselRef.current && mobileCarouselRef.current.children[index]) {
      const slide = mobileCarouselRef.current.children[index] as HTMLElement
      mobileCarouselRef.current.scrollTo({
        left: slide.offsetLeft - 16,
        behavior: 'smooth'
      })
    }
  }

  const handleMobileCarouselScroll = () => {
    if (!mobileCarouselRef.current) return
    const container = mobileCarouselRef.current
    const scrollLeft = container.scrollLeft
    const firstSlide = container.children[0] as HTMLElement
    if (!firstSlide) return
    const slideWidth = firstSlide.offsetWidth + 16 // slide width + gap-4 (16px)
    const newIndex = Math.min(
      FEATURED.length - 1,
      Math.max(0, Math.round(scrollLeft / slideWidth))
    )
    if (newIndex !== mobileActiveIndex) {
      setMobileActiveIndex(newIndex)
      if (mobileChipsRef.current && mobileChipsRef.current.children[newIndex]) {
        const chip = mobileChipsRef.current.children[newIndex] as HTMLElement
        mobileChipsRef.current.scrollTo({
          left: chip.offsetLeft - 32,
          behavior: 'smooth'
        })
      }
    }
  }

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
    <section id="work" className="relative z-20 overflow-hidden bg-[#0F1735]">
      <div className="w-full h-full bg-[#0F1735]">

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
        <div className="px-4 sm:px-8 lg:px-16 py-5 sm:py-7 lg:py-8" style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}>
          <h2
            className="font-display font-normal leading-tight text-white"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.02em", maxWidth: "900px" }}
          >
            Projects that <br className="lg:hidden" />
            define{" "}
            <em className="font-normal" style={{ color: C }}>how I think.</em>
          </h2>
        </div>


        {/* Showcase container */}
        <div className="px-4 sm:px-8 lg:px-16">
          {/* Desktop Showcase */}
          <div className="hidden lg:grid lg:grid-cols-[300px_1fr_320px] gap-8 py-10 min-h-[540px]">
            {/* Left Column: Project Selector */}
            <div className="flex flex-col gap-2.5 justify-center pr-4 border-r border-white/10">
              {FEATURED.map((project, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={project.projectId}
                    onClick={() => onActiveIndexChange(i)}
                    aria-label={`View project: ${project.name}`}
                    aria-pressed={i === activeIndex}
                    className={`group text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C] rounded-lg py-2 px-3 border-l-2 ${
                      isActive ? "border-[#DB3E8C] bg-white/[0.08] shadow-sm" : "border-transparent hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className="font-sans text-[10px] tracking-wider transition-colors duration-300 pt-0.5 font-bold shrink-0"
                        style={{ color: isActive ? C : "rgba(255, 255, 255, 0.3)" }}
                      >
                        {project.num}
                      </span>
                      <span
                        className="text-xs sm:text-sm leading-snug transition-all duration-300"
                        style={{
                          color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
                          fontWeight: isActive ? 700 : 500,
                          transform: isActive ? "translateX(3px)" : "translateX(0px)",
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
              className="relative flex items-center justify-center p-6 lg:p-8 overflow-hidden rounded-2xl bg-[#111936] cursor-crosshair select-none h-full min-h-[500px]"
              style={{
                backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            >
              {/* Figma frame label (Left) */}
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded text-[10px] font-sans font-bold tracking-widest text-white/90 z-20 shadow-sm">
                {activeProject.num} · {activeProject.location} · {activeProject.year}
              </div>

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
                className="relative w-full h-full min-h-[460px] lg:min-h-[480px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.01] focus:outline-none group"
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
                    className="relative w-[95%] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] bg-[#0d142d] cursor-grab"

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
            <div className="flex flex-col justify-center pl-6 border-l border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.projectId}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col justify-center space-y-4 py-1"
                >
                  <div>
                    <span className="font-sans text-[11px] font-semibold tracking-wider text-white/60 uppercase block mb-1">
                      CLIENT: {activeProject.client}
                    </span>
                    <h3 className="font-display font-semibold mb-2 leading-tight text-white text-xl sm:text-2xl" style={{ letterSpacing: "-0.02em" }}>
                      {activeProject.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed mb-3 font-sans text-white/80">
                      {activeProject.headline}
                    </p>
                  </div>

                  {/* Metrics/Stats */}
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2 border-t border-[#DB3E8C]/20 pt-3">
                      <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5">
                        <span className="font-sans text-[11px] font-bold tracking-widest text-[#DB3E8C] uppercase">OWNERSHIP ROLE</span>
                        <span className="font-sans font-semibold text-white text-xs text-right">
                          {activeProject.role}
                        </span>
                      </div>
                      {activeProject.metrics.map((m) => (
                        <div key={m.sub} className="flex items-baseline justify-between border-b border-white/5 pb-1.5">
                          <span className="font-sans text-[10px] font-semibold tracking-widest text-white/60 uppercase">{m.sub}</span>
                          <span className="font-display font-semibold text-white text-base sm:text-lg" style={{ color: C }}>
                            {m.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        onClick={() => onOpenProject(activeProject.projectId)}
                        className="group flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[#DB3E8C] hover:bg-[#DB3E8C]/90 text-white font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-lg shadow-[#DB3E8C]/25 hover:shadow-[0_8px_20px_rgba(219,62,140,0.4)] cursor-pointer"
                      >
                        <span>Open Case Study</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                      <a
                        href={getWhatsAppLink(activeProject.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold tracking-wider text-xs uppercase transition-all cursor-pointer text-center shadow-sm"
                      >
                        <MessageSquare size={14} />
                        <span>Ask about this project ↗</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Showcase: Swipeable Horizontal Carousel */}
          <div className="block lg:hidden py-6 sm:py-8">
            <div
              ref={mobileCarouselRef}
              onScroll={handleMobileCarouselScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-0 -mx-4 sm:-mx-8 px-4 sm:px-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {FEATURED.map((project, i) => (
                <div
                  key={project.projectId}
                  className="w-[86vw] sm:w-[480px] shrink-0 snap-center rounded-2xl bg-[#111936] border border-white/10 p-4 sm:p-5 shadow-xl flex flex-col justify-between"
                >
                  {/* Figma frame label */}
                  <div className="mb-3">
                    <span className="font-sans text-[10px] sm:text-xs text-white/60 tracking-wider font-semibold">
                      # {project.num} · {project.location} · {project.year}
                    </span>
                  </div>

                  {/* Mockup Frame */}
                  <div
                    onClick={() => onOpenProject(project.projectId)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenProject(project.projectId) }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open case study: ${project.name}`}
                    className="relative aspect-[16/10] rounded-xl bg-[#1c2446] overflow-hidden mb-4 flex items-center justify-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C]"

                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={project.thumb}
                        alt={project.name}
                        className="w-full h-full object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#19244E]/30 pointer-events-none" />
                    </div>
                  </div>

                  {/* Metadata & Headline */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-sans text-xs font-semibold text-white/60 uppercase mb-0.5 tracking-wider">
                        CLIENT: {project.client}
                      </p>
                      <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-2 leading-tight">
                        {project.name}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-white/80 mb-4 font-sans line-clamp-3">
                        {project.headline}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2">
                      <div className="grid grid-cols-2 gap-2">

                        <button
                          onClick={() => onOpenProject(project.projectId)}
                          className="flex items-center justify-center gap-1 w-full py-2.5 px-3 rounded-lg bg-[#DB3E8C] hover:bg-[#DB3E8C]/90 text-white font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                        >
                          <span>Open Case</span>
                          <ArrowUpRight size={14} />
                        </button>
                        <a
                          href={getWhatsAppLink(project.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 w-full py-2.5 px-2 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold tracking-wider text-[11px] uppercase transition-all cursor-pointer text-center"
                        >
                          <MessageSquare size={13} />
                          <span>ASK ↗</span>
                        </a>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Swipe Indicator Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {FEATURED.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMobileChipClick(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === mobileActiveIndex ? "w-6 bg-[#DB3E8C]" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HOW I WORK ─────────────────────────────────────────────────────────────────
const PHASES = [
  {
    num: "01",
    title: "Research & Alignment",
    category: "Discovery",
    desc: "Every project starts with understanding the real problem. I dig into requirements with PMs, test existing apps hands-on, and benchmark proven design patterns from mature platforms. I also align early with Backend engineers so edge cases and data logic are solid before designing screens.",
    tools: ["Stakeholder Q&A", "App Walkthroughs", "UI Benchmarking", "Backend Alignment", "User Flows & Sitemaps"],
    footerMeta: "PMs consulted · Apps benchmarked hands-on",
    Icon: Users,
  },
  {
    num: "02",
    title: "Benchmark, AI Ideation & Craft",
    category: "Craft",
    desc: "I balance speed and quality by adapting proven patterns from mature apps and Dribbble, combined with AI ideation (Sketch AI, Claude, Gemini). I craft pixel-perfect screens and edge-case states in Figma, collaborate with graphic designers for custom visual assets, and build code prototypes when needed.",
    tools: ["Design Systems", "Figma Variables & Components", "Claude & Gemini", "VS Code", "Antigravity", "Prototyping"],
    footerMeta: "Powered by Claude, Gemini & Figma",
    Icon: Zap,
  },
  {
    num: "03",
    title: "Traceable Handoff & QA",
    category: "Handoff",
    desc: "Inside Figma, I organize every portal into a 3-page structure: Masterflow, Changelog, and Archive. When revisions happen, I create numbered before-and-after frames in Figma linked directly to Jira tickets, making every change easy to track and keeping the live app logic safe.",
    tools: ["Masterflow & Archive", "Jira Changelog Sync", "Numbered Notes", "Design QA", "Live App Auditing"],
    footerMeta: "Every revision numbered & Jira-linked",
    Icon: CheckCircle,
  },
]

/* Standalone Duo-Tone Vector Icons for How I Work Statement */
function StandaloneSearchIcon({ className = "w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#F472B6]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="8.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M19.5 19.5L27 27" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="13" cy="13" r="4" fill="currentColor" fillOpacity="0.35" />
      <path d="M10 10C10.8 8.8 12.2 8.2 13.5 8.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function StandaloneTargetIcon({ className = "w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#F472B6]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="11.5" stroke="currentColor" strokeWidth="3" strokeDasharray="3 3" />
      <circle cx="16" cy="16" r="6.5" stroke="currentColor" strokeWidth="3" />
      <circle cx="16" cy="16" r="3.5" fill="currentColor" />
      <path d="M16 2V5.5M16 26.5V30M2 16H5.5M26.5 16H30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function StandaloneClipboardIcon({ className = "w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#F472B6]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="6" width="18" height="22" rx="3" stroke="currentColor" strokeWidth="3.2" />
      <rect x="11" y="3" width="10" height="5" rx="1.5" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="2.4" />
      <path d="M11 16L14.5 19.5L21.5 12.5" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 23H21" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="2 2" />
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
    <div
      id="process"
      className="relative overflow-hidden bg-[#0A1128]"
    >
      {/* ── BLOCK 1: 3-PHASE EXECUTION ENGINE ── */}
      <section className="relative overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 px-6 sm:px-12 lg:px-20 z-20 bg-[#0A1128]">
        {/* Background Texture Overlay — Seamless Multiply Blend Mode on #0A1128 */}
        <div
          className="absolute inset-0 w-full h-full bg-[#0A1128] pointer-events-none z-0"
          style={{
            backgroundImage: `url(${section3PhaseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Animated Header & Tagline Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12 sm:mb-16 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/80">
                  3-PHASE EXECUTION ENGINE
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#DB3E8C]">
                DESIGN TO HANDOFF PIPELINE
              </span>
            </div>
          </motion.div>

          {/* 3-Column Timeline Pipeline (Continuous Top Line Track & Clean Vertical Dividers) */}
          <div className="relative">
            {/* Continuous Top Pipeline Track Line (Desktop) */}
            <div className="hidden md:block absolute top-[15px] left-0 right-0 h-px bg-white/10 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 relative z-10">
              {PHASES.map((phase, idx) => {
                const isLast = idx === PHASES.length - 1

                return (
                  <motion.div
                    key={phase.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`flex flex-col justify-between relative group ${
                      !isLast ? "md:border-r md:border-white/10 md:pr-10 lg:pr-14" : ""
                    }`}
                  >
                    <div>
                      {/* Top Node Header: Node Dot & Sleek Mono Label */}
                      <div className="flex items-center gap-2.5 mb-7 bg-[#0A1128] pr-4 w-fit relative z-10">

                        <span className="w-2.5 h-2.5 rounded-full bg-[#DB3E8C] shadow-[0_0_10px_#DB3E8C] animate-pulse" />
                        <span className="font-mono text-[11px] font-bold tracking-widest text-[#DB3E8C] uppercase px-3 py-1 rounded-full bg-[#DB3E8C]/15 border border-[#DB3E8C]/30">
                          {phase.num} {phase.category}
                        </span>
                      </div>

                      {/* Step Title: Large Bold Heading */}
                      <h3 className="font-display font-bold text-white text-xl sm:text-2xl lg:text-[26px] mb-4 leading-tight group-hover:text-[#F472B6] transition-colors duration-200">
                        {phase.title}
                      </h3>

                      {/* Process Description */}
                      <p className="text-white/80 text-sm leading-relaxed font-sans mb-8">
                        {phase.desc}
                      </p>
                    </div>

                    {/* Bottom Artifacts Section (Plain Text) */}
                    <div className="pt-6 border-t border-white/10 mt-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#DB3E8C]">
                          TOOLS & ARTIFACTS
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-white/80 font-normal">
                        {phase.tools.join(" · ")}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Centered Bottom CTA Link */}
            <div className="mt-14 sm:mt-16 lg:mt-20 text-center relative z-20">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-white/70 hover:text-[#DB3E8C] transition-colors duration-200 cursor-pointer inline-flex items-center gap-2 group/cta"
              >
                <span className="group-hover/cta:underline underline-offset-4 decoration-[#DB3E8C]/60">
                  See this process in action across all projects
                </span>
                <ArrowRight size={15} className="group-hover/cta:translate-x-1 transition-transform duration-200 text-[#DB3E8C]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOCK 2: HOW I WORK PHILOSOPHICAL STATEMENT HERO (NOW AT THE BOTTOM AS CLOSER) ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col justify-center min-h-[440px] lg:min-h-[480px] bg-[#0A1128]"
      >
        {/* Header - Solid Navy Divider Bar / Sekat Pemisah Mutlak */}
        <div
          className="relative z-30 px-4 sm:px-8 lg:px-16 py-6 sm:py-8 flex items-center gap-6 bg-[#0A1128]"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}
        >
          <span className="font-sans text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
            SYSTEM LOGIC
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-[#F472B6]">
            DESIGN PHILOSOPHY · REINFORCEMENT
          </span>
        </div>

        {/* Video Area Container */}
        <div className="relative flex-1 flex flex-col justify-center overflow-hidden">
          {/* Subtle Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen pointer-events-none"
          >
            <source src={gettyBgVideo} type="video/mp4" />
          </video>

          {/* Linear Gradient Mask at Top of Video Container (80-120px) */}
          <div className="absolute top-0 left-0 right-0 h-24 sm:h-28 lg:h-32 bg-gradient-to-b from-[#0A1128] via-[#0A1128]/80 to-transparent pointer-events-none z-10" />

          {/* Gradient Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1128]/30 to-[#0A1128]/80 pointer-events-none" />

          {/* Section headline — scroll-driven smooth fade out */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-20 px-4 sm:px-8 lg:px-16 py-14 sm:py-20 lg:py-24 flex flex-col items-center text-center"
          >
            <p className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase mb-6 sm:mb-10 text-[#F472B6]">
              THE LOGIC BEHIND IT
            </p>
            <h2
              className="font-display font-light leading-[1.45] text-white max-w-4xl text-center drop-shadow-lg"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 4.2rem)", letterSpacing: "-0.025em" }}
            >
              I dig into complex problems first{" "}
              <span className="inline-block align-middle mx-1 sm:mx-1.5 hover:scale-110 transition-transform duration-300">
                <StandaloneSearchIcon className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#F472B6]" />
              </span>,{" "}
              craft intuitive web & app interfaces with <span className="text-[#F472B6] font-bold">solid logic</span>{" "}
              <span className="inline-block align-middle mx-1 sm:mx-1.5 hover:scale-110 transition-transform duration-300">
                <StandaloneTargetIcon className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#F472B6]" />
              </span>,{" "}
              and hand off design files so clear that{" "}
              <span className="inline-block align-middle mx-1 sm:mx-1.5 hover:scale-110 transition-transform duration-300">
                <StandaloneClipboardIcon className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#F472B6]" />
              </span>{" "}
              engineers rarely have to second-guess.
            </h2>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// ─── PROJECT ARCHIVE ───────────────────────────────────────────────────────────
const PROJECT_PREVIEWS: Record<number, string> = {
  1: ocbcThumb,
  2: gelmShopeeThumb,
  3: sunwayThumb,
  4: mikrosayangThumb,
  5: grabThumb,
  6: mykawanThumb,
  7: mykawanGegmThumb,
  8: friendsureThumb,
  9: samaloopThumb,
  10: telkomSiagaVideo,
  11: drGadgetThumb,
  12: familyMooThumb,
  13: telescopeThumb,
  14: aseanThumb,
  15: disnavThumb,
  16: yametThumb,
  17: adaPolisiThumb,
  18: ftjslThumb,
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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedProject])

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
                            {previewImg.endsWith(".mp4") || previewImg.endsWith(".webm") ? (
                              <video
                                src={previewImg}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover rounded-2xl"
                              />
                            ) : (
                              <img
                                src={previewImg}
                                alt={project.name}
                                className="w-full h-full object-cover rounded-2xl"
                              />
                            )}
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
                        
                        {/* Status Text */}
                        <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#19244E]/60">
                          {project.status}
                        </span>

                        {/* WhatsApp Quick Link */}
                        <a
                          href={getWhatsAppLink(project.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 font-sans text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#19244E]/50 hover:text-[#DB3E8C] transition-colors p-1"
                          title="Ask via WhatsApp"
                        >
                          <MessageSquare size={13} />
                          <span>ASK ↗</span>
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
              <div className="flex justify-between items-start mb-4">
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

              {/* Project Preview Media (Full Uncropped Display) */}
              {PROJECT_PREVIEWS[selectedProject.id] && (
                <div className="relative mb-5 rounded-xl overflow-hidden border border-slate-200/80 shadow-sm bg-[#111836] p-1.5 flex items-center justify-center">
                  {PROJECT_PREVIEWS[selectedProject.id].endsWith(".mp4") || PROJECT_PREVIEWS[selectedProject.id].endsWith(".webm") ? (
                    <video
                      src={PROJECT_PREVIEWS[selectedProject.id]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto max-h-[280px] sm:max-h-[340px] object-contain rounded-lg"
                    />
                  ) : (
                    <img
                      src={PROJECT_PREVIEWS[selectedProject.id]}
                      alt={selectedProject.name}
                      className="w-full h-auto max-h-[280px] sm:max-h-[340px] object-contain rounded-lg"
                    />
                  )}
                </div>
              )}

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
                  <MessageSquare size={14} />
                  <span>Ask about this project ↗</span>
                </a>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

function TypingWordEffect({ words }: { words: string[] }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullWord = words[wordIdx]
    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting && currentText !== fullWord) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.slice(0, currentText.length + 1))
      }, 70)
    } else if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && currentText !== "") {
      timer = setTimeout(() => {
        setCurrentText(fullWord.slice(0, currentText.length - 1))
      }, 40)
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setWordIdx((prev) => (prev + 1) % words.length)
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, wordIdx, words])

  return (
    <span className="font-normal not-italic text-[#DB3E8C] border-r-2 border-[#DB3E8C] pr-1 inline-block min-w-[1ch]">
      {currentText}
    </span>
  )
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────
function ContactSection({ onOpenPdfPreview }: { onOpenPdfPreview?: () => void }) {
  const { ref, inView } = useInView()
  const WORDS = ["significant?", "scalable?", "impactful?", "thoughtful?", "intuitive?"]

  return (
    <section
      id="contact"
      style={{ backgroundColor: "#111936", borderTop: `1px solid rgba(255, 255, 255, 0.08)` }}
    >
      {/* Header */}
      <div
        className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8 flex items-center gap-6"
        style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}
      >
        <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">CONTACT</span>
        <div className="flex-1 h-px bg-white/10" />
        <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] text-[#DB3E8C]">OPEN TO MID – SENIOR PRODUCT DESIGNER ROLES</span>
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
          <h2
            className="font-display font-light leading-[0.95] sm:leading-[0.9] my-4 sm:my-6 text-white"
            style={{ fontSize: "clamp(2.1rem, 5.5vw, 5rem)", letterSpacing: "-0.025em" }}
          >
            Ready to build<br />something<br />
            <TypingWordEffect words={WORDS} />
          </h2>
          <p className="text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-[440px] text-white/80 font-sans" style={{ lineHeight: 1.75 }}>
            I'm open to Product Designer (Mid to Senior) roles whether remote, hybrid, or on-site with global relocation. Always excited to tackle complex systems and chat about your product challenges.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:adinagayo@gmail.com"
              className="flex items-center gap-2 px-5 sm:px-6 py-3 text-sm font-medium text-white transition-all duration-150 hover:opacity-90 rounded-xl shadow-lg cursor-pointer"
              style={{ backgroundColor: C }}
            >
              <Mail size={14} /> Say Hello <ArrowRight size={14} />
            </a>
            <button
              onClick={onOpenPdfPreview}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-white/10 rounded-xl cursor-pointer"
              style={{ border: `1px solid rgba(255, 255, 255, 0.2)` }}
            >
              Resume <Eye size={14} />
            </button>
          </div>
        </motion.div>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-white/10" />

        {/* Right: contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="flex flex-col justify-center bg-[#111936]"
        >
          {[
            { label: "Email", value: "adinagayo@gmail.com", sub: "Primary contact", href: "mailto:adinagayo@gmail.com" },
            { label: "Location", value: "Jakarta, Indonesia", sub: "Open for relocation" },
            { label: "Availability", value: "Looking for the next system to untangle", sub: "" },
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
      className="px-8 lg:px-16 py-6 sm:py-8 flex items-center justify-center"
      style={{ borderTop: `1px solid rgba(255, 255, 255, 0.08)`, backgroundColor: "#111936" }}
    >
      <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white/60">© 2026 Adina Fayza Gayo</span>
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
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const activeSection = useScrollSpy(["home", "work", "process", "archive", "contact"])

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash === "about") {
        setCurrentView("about")
      } else if (hash && hash.includes("-case")) {
        setCurrentView(hash as any)
      } else {
        setCurrentView("home")
      }
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const handleOpenAbout = () => {
    setCurrentView("about")
    if (typeof window !== "undefined") {
      const nextIdx = (window.history.state?.idx || 0) + 1
      window.history.pushState({ idx: nextIdx }, "", "#about")
      window.scrollTo({ top: 0 })
    }
  }


  const handleOpenProject = (id: string | number) => {
    const strId = String(id).toLowerCase()
    if (FEATURED_INDEX_MAP[strId] !== undefined) {
      setActiveFeaturedIndex(FEATURED_INDEX_MAP[strId])
    }

    const map: Record<string, typeof currentView> = {
      tng: "tng-case",
      gegi: "gegi-case",
      bijakwang: "bijakwang-case",
      election: "election-case",
      backoffice: "backoffice-case",
      anlene: "anlene-case",
      archery: "archery-case",
      myarchery: "myarchery-case",
      sunway: "tng-case",
      "1": "tng-case",
      "2": "gegi-case",
      "3": "tng-case",
      "4": "backoffice-case",
      "5": "backoffice-case",
      "6": "bijakwang-case",
      "7": "bijakwang-case",
      "8": "gegi-case",
      "9": "bijakwang-case",
      "10": "election-case",
      "11": "backoffice-case",
      "12": "anlene-case",
      "13": "archery-case",
      "14": "election-case",
      "15": "myarchery-case",
      "16": "anlene-case",
      "17": "election-case",
      "18": "backoffice-case",
    }

    const targetView = map[strId] || "tng-case"
    setCurrentView(targetView)
    if (typeof window !== "undefined") {
      const nextIdx = (window.history.state?.idx || 0) + 1
      window.history.pushState({ idx: nextIdx }, "", `#${targetView}`)
      window.scrollTo({ top: 0 })
    }
  }

  const handleBackToWork = () => {
    if (typeof window !== "undefined" && window.history.state && window.history.state.idx > 0) {
      window.history.back()
    } else {
      setCurrentView("home")
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", "/")
        window.scrollTo({ top: 0, behavior: "instant" })
      }
    }
  }



  if (currentView === "about") {
    return (
      <AboutMe
        onBack={handleBackToWork}
      />
    )
  }


  const CASE_STUDY_SEQUENCE: CaseStudyMeta[] = [
    { id: "tng", num: "01", name: "Seamless Micro Insurance Integration", client: "Touch 'n Go × GEGM", thumb: coverTng },
    { id: "gegi", num: "02", name: "Gamified CI Evaluation & Acquisition", client: "GEGI Singapore", thumb: ci1 },
    { id: "bijakwang", num: "03", name: "Roadshow Tournament Platform", client: "mySalam × myKawan", thumb: mySalamThumb },
    { id: "election", num: "04", name: "38 Province Real Time Election Monitoring", client: "Indonesian Political Party", thumb: aseanThumb },
    { id: "backoffice", num: "05", name: "Multi-tenant Backoffice Portal", client: "InsureTech SaaS Platform", thumb: backofficePortalThumb },
    { id: "anlene", num: "06", name: "Brand Design System & Asset Management", client: "Anlene Malaysia", thumb: anleneThumb },
    { id: "archery", num: "07", name: "ProArchery Competition Scoring App", client: "National Archery Federation", thumb: proArcheryThumb },
    { id: "myarchery", num: "08", name: "MyArchery Mobile Field App", client: "PERPANI Archery", thumb: myArcheryPerpaniThumb },
  ]

  const renderCaseStudyView = (viewId: string, caseComponent: React.ReactNode) => {
    const viewToIdMap: Record<string, string> = {
      "tng-case": "tng",
      "gegi-case": "gegi",
      "bijakwang-case": "bijakwang",
      "election-case": "election",
      "backoffice-case": "backoffice",
      "anlene-case": "anlene",
      "archery-case": "archery",
      "myarchery-case": "myarchery",
    }
    const currentId = viewToIdMap[viewId]
    const idx = CASE_STUDY_SEQUENCE.findIndex((item) => item.id === currentId)
    if (idx === -1) return caseComponent

    const currentProject = CASE_STUDY_SEQUENCE[idx]
    const nextProject = idx < CASE_STUDY_SEQUENCE.length - 1 ? CASE_STUDY_SEQUENCE[idx + 1] : null
    const prevProject = idx > 0 ? CASE_STUDY_SEQUENCE[idx - 1] : null

    return (
      <CaseStudySwipeWrapper
        currentProject={currentProject}
        nextProject={nextProject}
        prevProject={prevProject}
        totalCount={CASE_STUDY_SEQUENCE.length}
        currentIndex={idx}
        allProjects={CASE_STUDY_SEQUENCE}
        onNavigateNext={
          nextProject
            ? () => {
                handleOpenProject(nextProject.id)
                window.scrollTo({ top: 0 })
              }
            : undefined
        }
        onNavigatePrev={
          prevProject
            ? () => {
                handleOpenProject(prevProject.id)
                window.scrollTo({ top: 0 })
              }
            : undefined
        }
        onNavigateTo={(id) => {
          handleOpenProject(id)
          window.scrollTo({ top: 0 })
        }}
        onBackToHome={handleBackToWork}
      >
        {caseComponent}
      </CaseStudySwipeWrapper>
    )

  }

  if (currentView === "tng-case") {
    return renderCaseStudyView(
      "tng-case",
      <TngCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("gegi"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("myarchery"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "gegi-case") {
    return renderCaseStudyView(
      "gegi-case",
      <GegiCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("bijakwang"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("tng"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "bijakwang-case") {
    return renderCaseStudyView(
      "bijakwang-case",
      <BijakWangCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("election"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("gegi"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "election-case") {
    return renderCaseStudyView(
      "election-case",
      <ElectionCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("backoffice"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("bijakwang"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "backoffice-case") {
    return renderCaseStudyView(
      "backoffice-case",
      <BackofficeCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("anlene"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("election"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "anlene-case") {
    return renderCaseStudyView(
      "anlene-case",
      <AnleneCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("archery"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("backoffice"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "archery-case") {
    return renderCaseStudyView(
      "archery-case",
      <ProArcheryCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("myarchery"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("anlene"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "myarchery-case") {
    return renderCaseStudyView(
      "myarchery-case",
      <MyArcheryCase
        onBack={handleBackToWork}
        onNext={() => { handleOpenProject("tng"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("archery"); window.scrollTo({ top: 0 }) }}
      />
    )
  }



  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: S }}>
      <HeroSection
        onReadMore={handleOpenAbout}
        onOpenPdfPreview={() => setIsPdfModalOpen(true)}
      />

      <FeaturedWorkSection
        activeIndex={activeFeaturedIndex}
        onActiveIndexChange={setActiveFeaturedIndex}
        onOpenProject={handleOpenProject}
      />
      <WorkflowSection />
      <ProjectArchiveSection />
      <ContactSection onOpenPdfPreview={() => setIsPdfModalOpen(true)} />
      <Footer />
      <FloatingDock activeSection={activeSection} />
      <PdfPreviewModal isOpen={isPdfModalOpen} onClose={() => setIsPdfModalOpen(false)} />
    </div>
  )
}
