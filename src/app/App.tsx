import { useState, useRef, useEffect, Fragment } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence, useScroll, useTransform, useReducedMotion } from "motion/react"
import type { MotionValue } from "motion/react"
import type { ReactNode } from "react"
// @ts-expect-error -- react-dom has no type declarations installed in this project
import { flushSync, createPortal } from "react-dom"
import adinaPhotoAbout from "@/imports/Foto At Work.jpg"
import adinaPhotoLife from "@/imports/Foto In Life.jpg"
import afgLogo from "@/imports/LOGO.png"
import coverTng from "@/imports/Cover TNG.jpg"
import tngThumb4 from "@/imports/TNG thumb4.jpg"
import tngThumb5 from "@/imports/TNG thumb5.jpg"
import projectThumb1 from "@/imports/image-7.jpg"
import projectThumb2 from "@/imports/image-8.jpg"
import projectThumb4 from "@/imports/image-7.jpg"
import projectThumb5 from "@/imports/image-9.jpg"
import projectThumb6 from "@/imports/image-8.jpg"
import mykawan1 from "@/imports/mykawan1.jpg"
import mykawan2 from "@/imports/mykawan2.jpg"
import mykawan3 from "@/imports/mykawan3.jpg"
import mykawan4 from "@/imports/mykawan4.jpg"
import mykawan5 from "@/imports/mykawan5.jpg"
import anleneThumb from "@/imports/Anlene thumb.jpg"
import anleneThumb2 from "@/imports/anlene thumb 2.jpg"
import anleneThumb3 from "@/imports/anlene thumb 3.jpg"
import anleneThumb4 from "@/imports/anlene thumb 4.jpg"
import anleneThumb5 from "@/imports/anlene thumb 5.jpg"
import anleneThumb6 from "@/imports/anlene thumb 6.jpg"
import ci1 from "@/imports/CI1.jpg"
import ci2 from "@/imports/CI2.jpg"
import ci3 from "@/imports/CI3.jpg"
import ci4 from "@/imports/CI4.jpg"
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
import telkomCurvedLedDisplay from "@/imports/telkom-curved-led-display.png"
import telkomCurationDashboard from "@/imports/telkom-curation-dashboard.png"
import mykawanGegmThumb from "@/imports/Mykawan GEGM thumb.jpg"
import drGadgetThumb from "@/imports/dr gadget thumb.jpg"
import sunwayThumb from "@/imports/sunway thumb.jpg"
import mySalamThumb from "@/imports/my salam thumb.jpg"
import eSaksiThumb from "@/imports/e-saksi thumb.jpg"
import electionVerificationCms from "@/imports/election-verification-cms.png"
import electionSainteLague from "@/imports/election-sainte-lague.png"
import electionKpuEntry from "@/imports/election-kpu-entry.png"
import proArcheryThumb from "@/imports/proarcherythumb5.jpg"
import proArcheryInventory from "@/imports/proarchery-inventory.jpg"
import proArcheryStockTransaction from "@/imports/proarchery-stock-transaction.jpg"
import proArcheryPricingTiers from "@/imports/proarchery-pricing-tiers.jpg"
import proArcheryOrderTracking from "@/imports/proarchery-order-tracking.jpg"
import backofficePortalThumb from "@/imports/backoffice portal thumb.jpg"
import backofficeSalesOverview from "@/imports/backoffice-sales-overview.png"
import backofficeCustomerDetail from "@/imports/backoffice-customer-detail.png"
import backofficeAiTopPicks from "@/imports/backoffice-ai-top-picks.png"
import myArcheryPerpaniThumb from "@/imports/myarchery thumb.jpg"

import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import {
  Home, Briefcase, Layers, Archive, Mail,
  ArrowRight, ArrowDown, ExternalLink, Globe, Zap,
  Users, CheckCircle, Coins, Bot, LayoutGrid,
  ArrowUpRight, ChevronRight, ChevronLeft, MousePointer2, Plus, Linkedin, Download,
  Search, Target, FileCheck, FileText, X, Eye, ChevronDown, ChevronUp, MessageSquare, List,
} from "lucide-react"

import GegiCase from "./components/GegiCase"
import TngCase from "./components/TngCase"
import ProArcheryCase from "./components/ProArcheryCase"
import ElectionCase from "./components/ElectionCase"
import AnleneCase from "./components/AnleneCase"
import BijakWangCase from "./components/BijakWangCase"
import MyArcheryCase from "./components/MyArcheryCase"
import BackofficeCase from "./components/BackofficeCase"
import TelkomCase from "./components/TelkomCase"
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
    num: "01", shortTitle: "White Label Backoffice", name: "One Base, Many Partners: Reusable White Label Backoffice", client: "Multiple Enterprise Partnerships",
    location: "Regional", year: "2024 to 2025", tags: ["White Label Engine", "Shared Foundation", "Data Analytics"],
    role: "Sole Product Designer",
    headline: "A backoffice where partners monitor sales, manage customers, and review insurance claims. I designed the base once, then spent my design time only where partners genuinely differed.",
    confidentialNote: "Client names, logos, and data have been sanitized to respect NDAs. Screens reflect the real design process, not real production data.",
    metrics: [{ val: "2 Track", sub: "Delivery Model" }, { val: "1 Base", sub: "Multi-Partner System" }, { val: "Few days", sub: "Est. pitch turnaround" }],
    projectId: "backoffice",
    thumb: backofficePortalThumb,
    screens: [
      { src: backofficePortalThumb, label: "01 · DUAL TRACK ARCHITECTURE" },
      { src: backofficeSalesOverview, label: "02 · MULTI TENANT SALES DASHBOARD" },
      { src: backofficeCustomerDetail, label: "03 · DETAIL CUSTOMER & EKYC" },
      { src: backofficeAiTopPicks, label: "04 · AI TOP PICKS & RECOMMENDATIONS" },
    ],
  },
  {
    num: "02", shortTitle: "E-wallet Insurance Checkout", name: "Seamless Micro Insurance & Government Subsidy Integration", client: "Touch 'n Go × GEGM",
    location: "MY", year: "2025", tags: ["PWA / SSO", "eKYC Data Mapping", "B2C / FinTech"],
    role: "Sole Product Designer",
    headline: "A micro insurance checkout inside Touch 'n Go eWallet, where government subsidy eligibility decides the premium. Shipped as V5 after five design iterations.",
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
    num: "03", shortTitle: "Election Monitoring", name: "38 Province Real Time Election Monitoring", client: "Indonesian Political Party",
    location: "ID", year: "2024", tags: ["Public Sector", "Civic Tech", "Real Time CMS"],
    role: "Sole Product Designer",
    headline: "A multi platform system for real time vote monitoring across 38 provinces and 820,000+ TPS within a 48 hour window.",
    metrics: [{ val: "38", sub: "Provinces Monitored" }, { val: "820K+", sub: "TPS Polling Stations" }, { val: "48h", sub: "Tabulation Window" }],
    projectId: "election",
    thumb: eSaksiThumb,
    screens: [
      { src: eSaksiThumb, label: "01 · REAL TIME TABULATION" },
      { src: electionSainteLague, label: "02 · SAINTE-LAGUË SEAT MATRIX" },
      { src: electionVerificationCms, label: "03 · FORM C-HASIL VERIFICATION CMS" },
      { src: electionKpuEntry, label: "04 · DUAL ENTRY TABULATION ENGINE" },
    ],
  },
  {
    num: "04", shortTitle: "Field Health Screening App", name: "Bone Density & Health Check Passport Redesign", client: "Fonterra × Anlene",
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
    num: "05", shortTitle: "Archery Tournament Platform", name: "MyArchery · Scoring Built From the Scoring Table", client: "PERPANI / MyArchery",
    location: "ID", year: "2021 to 2023", tags: ["Sports Tech", "Field Research", "Scoring Iteration"],
    role: "Product Designer, Junior to PIC",
    headline: "Web and mobile qualification scoring for PERPANI tournaments, redesigned from my own shifts as a score input operator.",
    metrics: [{ val: "7", sub: "Live Tournaments" }, { val: "V5", sub: "Web Scoring Iterations" }, { val: "V3", sub: "Mobile Scoring Iterations" }],
    projectId: "myarchery",
    thumb: myArcheryPerpaniThumb,
    screens: [
      { src: myArcheryPerpaniThumb, label: "01 · SCORING KEYPAD" },
      { src: projectThumb2, label: "02 · ADMIN DASHBOARD" },
      { src: projectThumb1, label: "03 · LIVE SCOREBOARD" },
    ],
  },
  {
    num: "06", shortTitle: "Live Quiz Tournament Platform", name: "Kahoot to In House: Roadshow Tournament Platform", client: "mySalam × myKawan",
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
    num: "07", shortTitle: "Insurance Protection Gap Quiz", name: "Critical Illness Protection Gap Quiz", client: "GEGI Singapore",
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
    num: "08", shortTitle: "Retail E-commerce & POS", name: "Pro Archery 4 Surface Digital Ecosystem", client: "Pro Archery Jakarta",
    location: "ID", year: "2025", tags: ["AI Prompt to Code", "E Commerce", "Admin POS"],
    role: "Sole System & UI Designer",
    headline: "Turning Indonesia's premier physical archery retailer into a 4 surface digital ecosystem starting with a 24 hour AI built landing page.",
    metrics: [{ val: "24h", sub: "POC Delivery" }, { val: "4", sub: "Surfaces Built" }, { val: "1yr", sub: "Ongoing Engagement" }],
    projectId: "archery",
    thumb: proArcheryThumb,
    screens: [
      { src: proArcheryThumb, label: "01 · E COMMERCE PORTAL" },
      { src: proArcheryInventory, label: "02 · INVENTORY & SKU MANAGEMENT" },
      { src: proArcheryStockTransaction, label: "03 · BARCODE STOCK TRANSACTIONS" },
      { src: proArcheryPricingTiers, label: "04 · MULTI-TIER PRICING ENGINE" },
      { src: proArcheryOrderTracking, label: "05 · ORDER & WARRANTY TRACKING" },
    ],
  },
  {
    num: "09", shortTitle: "Public LED Display", name: "Interactive Public LED Display Ecosystem", client: "Telkomsel Siaga",
    location: "ID", year: "2025", tags: ["Interactive Display", "Two Tier Curation", "Public Space UX"],
    role: "UI Designer",
    headline: "Refining a nationwide greeting wall: from mobile input form to curated custom shaped LED display at Telkomsel HQ.",
    metrics: [{ val: "3", sub: "System Touchpoints" }, { val: "2 Tier", sub: "Curation Moderation" }, { val: "1wk", sub: "Sprint Timeline" }],
    projectId: "telkom",
    thumb: telkomCurvedLedDisplay,
    screens: [
      { src: telkomCurvedLedDisplay, label: "01 · CURVED CEILING LED WALL" },
      { src: telkomCurationDashboard, label: "02 · MESSAGE CURATION DASHBOARD" },
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
  // ── 2024 ──────────────────────────────────────────────────────────────────────
  { id: 10, name: "Friendsure × Dr Gadget",client: "Friendsure × Dr Gadget",          market: "Malaysia",    year: 2024, status: "LIVE",          category: "Customer & Admin Portal",     scope: "Menyediakan customer dan admin portal untuk alur layanan servis." },
  { id: 11, name: "Family Moo",            client: "Fonterra Indonesia",               market: "Indonesia",   year: 2024, status: "LIVE",          category: "FMCG & Loyalty Portal",       scope: "Customer loyalty management and points redemption portal for Fonterra's consumer ecosystem." },
  { id: 12, name: "Telescope Indonesia",   client: "Telescope Indonesia",              market: "Indonesia",   year: 2024, status: "LIVE",          category: "B2B Industrial Catalog",      scope: "Digital product catalog and technical specification showcase for specialized equipment." },
  { id: 13, name: "ASEAN Project Management System", client: "ASEAN Secretariat", market: "ASEAN / Regional", year: 2024, status: "LIVE INTERNAL", category: "Regional / Multi-Gov", scope: "Manajemen siklus proyek multilateral, pelaporan anggaran lintas negara, dan alur persetujuan multi level antar delegasi." },
  { id: 14, name: "Distrik Navigasi Portal", client: "Maritime Operations", market: "Indonesia", year: 2024, status: "PRODUCTION", category: "Internal Enterprise", scope: "Digitalisasi alur operasional sarana bantu navigasi pelayaran, pemantauan aset maritim, dan koordinasi staf teknis lapangan." },
  // ── 2022 ──────────────────────────────────────────────────────────────────────
  { id: 15, name: "YAMET Center",          client: "YAMET Child Development",          market: "Indonesia",   year: 2022, status: "LIVE",          category: "Healthcare Portal",           scope: "Corporate website and service directory for child development clinics across Indonesia." },
  { id: 16, name: "Ada Polisi",            client: "Internal Public Sector",           market: "Indonesia",   year: 2022, status: "ARCHIVED",      category: "Public Sector Mobile App",    scope: "Internal mobile system for law enforcement data entry and reporting." },
  { id: 17, name: "Forum TJSL Portal",     client: "BUMN Ecosystem",                   market: "Indonesia",   year: 2022, status: "LIVE",          category: "CSR Governance",              scope: "Standardisasi pelaporan CSR terpusat, aggregasi metrik dampak sosial lintas perusahaan pelat merah, dan transparansi tata kelola audit." },
]


// ─── Hooks ────────────────────────────────────────────────────────────────────
// True while the element is on screen and false once it leaves, so entry animations replay every time
// the reader scrolls back to the section.
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold })
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
  { id: "archive", label: "Catalog", Icon: Archive },
  { id: "process", label: "Process", Icon: Layers },
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
            <span className={`font-sans text-[11px] tracking-wider uppercase transition-colors ${isActive ? "font-bold text-[#19244E]" : "font-semibold text-[#19244E]/70 group-hover:text-[#19244E]"}`}>
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

// ─── HERO FACTS ──────────────────────────────────────────────────────────────
// Three categories; hovering, focusing, or tapping one swaps the chips beside it.
// One category is always open, so the content is never hidden on touch screens.
const HERO_FACTS = [
  { label: "Industries", items: ["Insurance & Financial Services", "Healthcare & Wellness", "FMCG", "Government", "E-commerce", "E-wallet", "Enterprise Operations", "Ride Hailing"] },
  { label: "Expertise", items: ["White-label & Multi-brand Products", "B2B Multi-portal Systems", "Modular Component Systems", "AI-assisted Design Workflows", "Developer Handoff"] },
  { label: "Tools", items: ["Figma", "Figma Make", "Framer", "Adobe Illustrator", "Adobe Photoshop", "Claude", "Gemini", "Antigravity", "Excel"] },
]

// ─── HERO TO DECK FLIGHT ─────────────────────────────────────────────────────
// Desktop only. As the page scrolls from the hero to the Work section, the hero's case cards fly
// down and settle into the stacked deck in the middle of the Work stage. The flight is tied to the
// scroll position, so it plays backwards when scrolling up. Each card starts exactly where its hero
// card sits and ends on the deck: the active case on top, the rest tucked underneath at a slight
// angle and fading out, so the real deck (that case's own screens) takes over seamlessly.
const HERO_FLIGHT_ITEMS = FEATURED.map((c) => ({ key: c.projectId, src: c.thumb }))
// px of scroll before the flight begins. Shared with the hero field, so the hero's case cards hide
// and the flying copies appear in the very same frame, decided by the same scroll position.
const HERO_FLIGHT_START = 40

function HeroDeckFlight() {
  const reduceMotion = useReducedMotion()
  const layerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion) return
    const mq = window.matchMedia("(min-width: 1024px)")
    // Offsets for the cards tucked under the top one, echoing the deck's own fan.
    const STACK_ROT = [4, -4, 7, -5, 3, -3, 6, -6]
    const STACK_X = [6, -6, 12, -12, 4, -4, 9, -9]
    const STACK_Y = [-2, 2, -4, 4, -1, 1, -3, 3]
    const START = HERO_FLIGHT_START
    const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))
    let on = false
    let hidDeck = false
    const setOn = (next: boolean) => {
      if (next === on) return
      on = next
      document.documentElement.dataset.heroFlight = next ? "on" : ""
    }
    let frame = 0
    const tick = () => {
      frame = requestAnimationFrame(tick)
      const layer = layerRef.current
      if (!layer) return
      const target = document.querySelector<HTMLElement>("[data-deck-target]")
      const off = () => {
        layer.style.display = "none"
        setOn(false)
        // Only undo what the flight itself hid, so other effects (the case morph) can hide the deck too.
        if (target && hidDeck) { target.style.opacity = ""; hidDeck = false }
      }
      if (!mq.matches || !target || !target.offsetParent) return off()

      // 0 when the flight starts, 1 when the deck's center reaches 62% of the screen height, so the
      // cards land a little before the deck is fully centered and never hang mid-air for long.
      const tr = target.getBoundingClientRect()
      // ...and never later than the moment the Work section's top reaches the top of the screen
      // (where the dock's "Work" link scrolls to), so arriving there always shows the finished deck,
      // whatever the browser's font size or window height.
      const work = document.getElementById("work")
      const workTop = work ? window.scrollY + work.getBoundingClientRect().top - 2 : Infinity
      const endY = Math.min(window.scrollY + tr.top + tr.height / 2 - window.innerHeight * 0.62, workTop)
      const p = (window.scrollY - START) / Math.max(1, endY - START)
      if (p <= 0 || p >= 1) return off()

      layer.style.display = "block"
      setOn(true)
      target.style.opacity = "0"
      hidDeck = true
      const activeKey = target.dataset.deckTarget
      const tw = Math.min(tr.width * 0.92, ((tr.height * 0.94) * 16) / 10)
      const th = (tw * 10) / 16
      const tcx = tr.left + tr.width / 2, tcy = tr.top + tr.height / 2

      let rank = 0
      HERO_FLIGHT_ITEMS.forEach((it, i) => {
        const el = cardRefs.current[i]
        if (!el) return
        const src = document.querySelector<HTMLElement>(`[data-hero-case="${it.key}"]`)
        if (!src || src.style.visibility === "hidden") { el.style.opacity = "0"; return }
        const sr = src.getBoundingClientRect()
        const isTop = it.key === activeKey
        const r = isTop ? 0 : rank++
        // Cards leave one after another, the top card first.
        const delay = isTop ? 0 : Math.min(0.24, (r + 1) * 0.03)
        const q = smooth((p - delay) / (1 - delay))
        const dx = isTop ? 0 : STACK_X[r % 8], dy = isTop ? 0 : STACK_Y[r % 8], rot = isTop ? 0 : STACK_ROT[r % 8]
        const w = sr.width + (tw - sr.width) * q
        const h = sr.height + (th - sr.height) * q
        const scx = sr.left + sr.width / 2, scy = sr.top + sr.height / 2
        const cx = scx + (tcx + dx - scx) * q
        const cy = scy + (tcy + dy - scy) * q
        el.style.width = `${w}px`
        el.style.height = `${h}px`
        el.style.transform = `translate(${cx - w / 2}px, ${cy - h / 2}px) rotate(${rot * q}deg)`
        el.style.zIndex = isTop ? "20" : String(10 - r)
        // Start at the hero card's own opacity; cards under the top one fade out near the end.
        const rest = parseFloat(src.dataset.restOpacity || "1")
        const base = rest + (1 - rest) * q
        el.style.opacity = String(isTop ? base : base * (1 - Math.max(0, (q - 0.8) / 0.2)))
      })
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.dataset.heroFlight = ""
      const t = document.querySelector<HTMLElement>("[data-deck-target]")
      if (t) t.style.opacity = ""
    }
  }, [reduceMotion])

  if (reduceMotion) return null
  return (
    <div ref={layerRef} aria-hidden="true" className="fixed inset-0 z-40 pointer-events-none" style={{ display: "none" }}>
      {HERO_FLIGHT_ITEMS.map((it, i) => (
        <div
          key={it.key}
          ref={(el) => { cardRefs.current[i] = el }}
          className="absolute left-0 top-0 overflow-hidden rounded-xl border border-[#19244E]/10 bg-white shadow-[0_24px_50px_-20px_rgba(15,23,53,0.55)]"
          style={{ willChange: "transform" }}
        >
          {/* Cropped from the top, exactly like the deck's cards, so the hand-off shows no jump */}
          <img src={it.src} alt="" className="w-full h-full object-cover object-top" draggable={false} />
        </div>
      ))}
    </div>
  )
}

// Desktop only: the same industries, expertise, and tools as the phone hero's switcher, laid out
// as a quiet three-column strip after the catalog so every keyword is visible at a glance. No
// interaction on purpose; the hero's floating cards stay the page's one signature moment.
function HeroFactsStrip() {
  return (
    <section aria-label="Industries, expertise, and tools" className="hidden lg:block relative z-20 bg-white" style={{ borderTop: `1px solid ${HAIR}` }}>
      <motion.div
        initial={{ opacity: 0, y: REVEAL_Y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE }}
        className="grid grid-cols-3 gap-12 xl:gap-16 px-16 py-12"
      >
        {HERO_FACTS.map((group) => (
          <div key={group.label} className="min-w-0">
            <span className="block font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#19244E]/60 mb-4">
              {group.label}
            </span>
            <p className="font-sans text-[15px] leading-[1.9] text-[#2E3A5C]">
              {group.items.map((item, i) => (
                <Fragment key={item}>
                  <span className="whitespace-nowrap">
                    {item}
                    {i < group.items.length - 1 && <span className="text-[#19244E]/25 ml-2" aria-hidden="true">·</span>}
                  </span>
                  {i < group.items.length - 1 && " "}
                </Fragment>
              ))}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function HeroFacts() {
  const [active, setActive] = useState(1)
  const current = HERO_FACTS[active]

  return (
    <div className="w-full flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-4 border-t border-[#19244E]/10 font-sans">
      <div role="tablist" aria-label="Profile facts" className="flex md:flex-col justify-center md:justify-start gap-1 md:w-36 shrink-0">
        {HERO_FACTS.map((fact, i) => {
          const isActive = i === active
          return (
            <button
              key={fact.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-2 md:px-0 py-1 text-[11px] font-bold tracking-wider uppercase cursor-pointer transition-colors focus:outline-none focus-visible:underline ${
                isActive ? "text-[#DB3E8C]" : "text-[#19244E]/50 hover:text-[#19244E]"
              }`}
            >
              <span className={`hidden md:block h-px bg-current transition-all duration-300 ${isActive ? "w-6" : "w-2"}`} />
              {fact.label}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" aria-label={current.label} className="flex-1 flex flex-wrap justify-center md:justify-start content-start gap-2 min-h-[5.5rem]">
        {current.items.map((item, i) => (
          <motion.span
            key={`${current.label}-${item}`}
            initial={{ opacity: 0, y: 10, scale: 0.9, rotate: i % 2 === 0 ? -4 : 4 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22, delay: i * 0.04 }}
            whileHover={{ y: -3, rotate: i % 2 === 0 ? -2 : 2 }}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#19244E]/10 text-[15px] text-[#19244E] cursor-default select-none"
          >
            {item}
          </motion.span>
        ))}
      </div>
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
                  <span className="font-mono text-[11px] sm:text-xs text-white/60 truncate">
                    UI/UX Designer · Digital Product Design (PDF)
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
// One motion language for every section entrance: same distance, duration and easing
const REVEAL_EASE = [0.21, 0.47, 0.32, 0.98] as const
const REVEAL_Y = 24
const REVEAL_DURATION = 0.7

const HERO_SPRING = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as const, duration: 0.7 }

// ─── Hero Section ─────────────────────────────────────────────────────────────
// ─── HERO WORK FIELD ─────────────────────────────────────────────────────────
// The site's one signature interaction (desktop only). Project thumbnails float around the hero
// content with 2.5D cursor parallax, curated and calm. Every thumbnail has a fixed, upright anchor in
// a loose ring around the content, with generous white space: no two cards touch, and none reaches
// the content, even at full parallax offset plus idle float. Cards come in three depth tiers. Far
// cards are small, faint, and nearly still; near cards are larger, clear, and follow the cursor most.
// Two layers. In front, the main case studies: large, in colour, and clickable to open the case.
// Behind them, the catalog thumbnails: small, faint, grey, and not interactive, so the field feels
// full without pulling attention from the main work. Case studies are placed first; catalog
// thumbnails only fill the space that is left, and are the first to go on small screens.
type ParallaxCard = {
  hidden: boolean; fx: number; fy: number; depth: number; restScale: number; restOpacity: number; tier: 0 | 1 | 2 | 3; backdrop: boolean
  ox: number; oy: number; scale: number
  // Idle float: two slow waves per axis with their own speed, size, and phase, so each path is a loose, unrepeating loop.
  floatAmp: number; floatLive: number; fA: number; fB: number; pA: number; pB: number
}

const PARALLAX = {
  MAX_OFFSET: 45,    // px a card may move away from its anchor
  LERP: 0.04,        // how quickly a card follows the cursor
  IDLE_MIN: 5,       // px, smallest idle float
  IDLE_MAX: 12,      // px, largest idle float
  TEXT_GAP: 24,      // px kept between a card and the headline, on top of all motion
  CARD_GAP: 22,      // px of white space kept between any two cards, on top of all motion
  CARD_BASE: 240,    // px, width of the card element before scaling (cards are 3:2 landscape)
}

// Three depth tiers: card width range in px, opacity, and how strongly the card follows the cursor.
const DEPTH_TIERS = {
  0: { minW: 38, maxW: 52, opacity: 0.32, depth: 0.01 },    // backdrop (catalog thumbnails)
  1: { minW: 100, maxW: 112, opacity: 0.6, depth: 0.015 },  // far
  2: { minW: 128, maxW: 144, opacity: 0.85, depth: 0.035 }, // middle
  3: { minW: 160, maxW: 176, opacity: 1, depth: 0.05 },     // near
} as const

// Each item gives its card height as a share of its width: 2/3 for the landscape case study
// covers, 4/3 for the portrait catalog thumbnails. Backdrop items are decorative only.
// A case card can have a fixed slot, so the same cases appear in the same places in every browser
// and window size. x: -1..1, the share of the way from the hero content's edge to the canvas edge
// (negative = left side). y: -1..1, the share of the half height (negative = above the middle).
type HeroFieldItem = { key: string; name: string; sub: string; src: string; aspect: number; backdrop?: boolean; slot?: { x: number; y: number }; onOpen?: () => void }

// Where each main case study sits in the hero, left column top to bottom, then right column.
const HERO_CASE_SLOTS: Record<string, { x: number; y: number }> = {
  backoffice: { x: -0.41, y: -0.71 },
  archery: { x: -0.78, y: -0.26 },
  gegi: { x: -0.36, y: -0.32 },
  telkom: { x: -0.76, y: 0.15 },
  bijakwang: { x: -0.37, y: 0.05 },
  myarchery: { x: -0.48, y: 0.52 },
  tng: { x: 0.47, y: -0.64 },
  election: { x: 0.55, y: -0.22 },
  anlene: { x: 0.44, y: 0.18 },
}

function HeroWorkField({ items, children, className = "" }: { items: HeroFieldItem[]; children: ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const textRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // Cards that do not fit with full white space are left out; the list is in priority order, so
  // the first cases are always the ones shown.
  const withImages = items.filter((it) => it.src)
  const [hovered, setHovered] = useState<number | null>(null)
  const hoveredRef = useRef<number | null>(null)
  hoveredRef.current = hovered

  const cards = useRef<ParallaxCard[]>([])
  // Cursor position relative to the section's center, from -0.5 to 0.5 on each axis.
  const mouse = useRef({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    mouse.current = { x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 }
  }
  const onLeave = () => { mouse.current = { x: 0, y: 0 } }

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const lerp = (from: number, to: number, f: number) => from + (to - from) * f

    // Areas no card may enter, as boxes measured from the canvas center: the hero content and, on
    // load, the floating page dock at the bottom of the screen.
    const zonesFor = (W: number, H: number) => {
      const zones: { cx: number; cy: number; hw: number; hh: number; text: boolean }[] = []
      const wr = wrap.getBoundingClientRect()
      const t = textRef.current
      if (t) {
        const r = t.getBoundingClientRect()
        zones.push({ cx: r.left + r.width / 2 - wr.left - W / 2, cy: r.top + r.height / 2 - wr.top - H / 2, hw: r.width / 2, hh: r.height / 2, text: true })
      } else {
        zones.push({ cx: 0, cy: 0, hw: 300, hh: 110, text: true })
      }
      const dock = document.querySelector<HTMLElement>('nav[aria-label="Page navigation"]')
      if (dock && dock.offsetWidth < window.innerWidth * 0.9) {
        const dh = dock.offsetHeight, dw = dock.offsetWidth
        const dockTop = window.innerHeight - 24 - dh - window.scrollY
        const cy = dockTop + dh / 2 - (wr.top) - H / 2
        if (Math.abs(cy) < H / 2 + dh) zones.push({ cx: window.innerWidth / 2 - wr.left - W / 2, cy, hw: dw / 2 + 8, hh: dh / 2 + 8, text: false })
      }
      return zones
    }

    // Repeatable pseudo-random numbers, so the layout looks the same on every visit.
    let seed = 7
    const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }

    // Everything scales with the canvas width: cards, motion range, and spacing. A 1280 px canvas is
    // full size; narrower canvases scale down (to 55% at most), so the layout fits small windows too.
    const fitFor = (w: number, h: number = w) => Math.max(0.55, Math.min(1, Math.max(w, h) / 1280))
    // How much of the full spacing the current layout uses (1 = full). Lowered when space is tight.
    const layout = { level: 1, fit: 1 }
    const textCenter = { x: 0, y: 0 }

    const place = () => {
      const W0 = wrap.clientWidth, H0 = wrap.clientHeight
      if (W0 < 50 || H0 < 50) return false
      const fit = fitFor(W0, H0)
      const zones = zonesFor(W0, H0)
      const textZone = zones[0]
      const n = withImages.length

      // Tiers follow priority: the first third of the cases are near, the next third middle, the rest
      // far. Catalog thumbnails form the backdrop tier.
      const caseIdx = withImages.map((it, i) => (it.backdrop ? -1 : i)).filter((i) => i >= 0)
      const backIdx = withImages.map((it, i) => (it.backdrop ? i : -1)).filter((i) => i >= 0)
      const nCases = caseIdx.length, nBack = backIdx.length
      const third = Math.ceil(nCases / 3)
      const tiers: (0 | 1 | 2 | 3)[] = withImages.map((it, i) => {
        if (it.backdrop) return 0
        const r = caseIdx.indexOf(i)
        return r < third ? 3 : r < third * 2 ? 2 : 1
      })
      // Home angle around the ring: cases spread evenly among themselves, backdrop cards evenly in between.
      const homeOf = (i: number) => {
        if (withImages[i].backdrop) return -Math.PI / 2 + (backIdx.indexOf(i) + 0.5) * ((Math.PI * 2) / Math.max(1, nBack))
        return -Math.PI / 2 + caseIdx.indexOf(i) * ((Math.PI * 2) / Math.max(1, nCases))
      }
      const stepOf = (i: number) => (Math.PI * 2) / Math.max(1, withImages[i].backdrop ? nBack : nCases)
      // A dropped case costs far more than any number of dropped backdrop cards.
      const costOf = (i: number) => (withImages[i].backdrop ? 1 : 1000 * (nCases - caseIdx.indexOf(i)))
      const tierWidths = tiers.map((t) => (DEPTH_TIERS[t].minW + rand() * (DEPTH_TIERS[t].maxW - DEPTH_TIERS[t].minW)) * fit)
      const widths = tierWidths.map((w) => w)
      let shrinkAll = 1
      const setShrink = (k: number) => { shrinkAll = k; tierWidths.forEach((w, i) => { widths[i] = w * k }) }

      // How far each card can travel from its anchor: parallax on each axis, plus idle float.
      const reachX = (i: number) => Math.min(PARALLAX.MAX_OFFSET * fit, 0.5 * W0 * DEPTH_TIERS[tiers[i]].depth)
      const reachY = (i: number) => Math.min(PARALLAX.MAX_OFFSET * fit, 0.5 * H0 * DEPTH_TIERS[tiers[i]].depth)
      const idle = PARALLAX.IDLE_MAX * fit
      // Backdrop cards float less, so they can sit closer to their neighbours.
      const idleOf = (i: number) => (withImages[i].backdrop ? PARALLAX.IDLE_MIN * fit : idle)
      const half = (i: number) => ({ hw: widths[i] / 2, hh: (widths[i] * withImages[i].aspect) / 2 })

      // A spot is allowed when the card, at any parallax offset and float, stays inside the canvas,
      // clear of the headline, and clear of every card already placed. Two cards always shift the same
      // way with the cursor, so between them only the difference in their reach can close the gap.
      const allowed = (x: number, y: number, i: number, placed: { i: number; x: number; y: number }[], spacing: number) => {
        const { hw, hh } = half(i)
        const mx = reachX(i) + idleOf(i), my = reachY(i) + idleOf(i)
        if (Math.abs(x) > W0 / 2 - hw - mx - 8 || Math.abs(y) > H0 / 2 - hh - my - 8) return false
        // The headline always keeps at least half its gap, whatever the spacing level.
        const tg = PARALLAX.TEXT_GAP * fit * Math.max(spacing, 0.5) + 4
        for (const z of zones) {
          if (Math.abs(x - z.cx) < z.hw + hw + mx + tg && Math.abs(y - z.cy) < z.hh + hh + my + tg) return false
        }
        for (const p of placed) {
          const o = half(p.i)
          // White space between two cards. Two case cards never touch, whatever the cursor does. A
          // backdrop card only keeps clear at rest: when the cursor moves, a case card may glide in
          // front of it, the way a near object passes in front of a far one.
          const withBackdrop = withImages[i].backdrop || withImages[p.i].backdrop
          const cg = PARALLAX.CARD_GAP * fit * spacing * (withBackdrop ? 0.5 : 1)
          const drift = withBackdrop ? 0 : 1
          const needX = hw + o.hw + drift * Math.abs(reachX(i) - reachX(p.i)) + idleOf(i) + idleOf(p.i) + cg
          const needY = hh + o.hh + drift * Math.abs(reachY(i) - reachY(p.i)) + idleOf(i) + idleOf(p.i) + cg
          if (Math.abs(x - p.x) < needX && Math.abs(y - p.y) < needY) return false
        }
        return true
      }

      // Curated ring: each card has a home angle, evenly spaced all the way around. Larger tiers are
      // placed first, then smaller cards settle into the space left. Each card searches near its home
      // angle first, widening the search only if needed, at a radius between the headline and the edge.
      const tryPlace = (spacing: number) => {
        widths.forEach((_, i) => { widths[i] = tierWidths[i] * shrinkAll })
        const placed: { i: number; x: number; y: number }[] = []
        let failures = 0
        const order = withImages.map((_, i) => i).sort((a, b) => tiers[b] - tiers[a])
        for (const i of order) {
          const home = homeOf(i)
          const step = stepOf(i)
          let spot: { x: number; y: number } | null = null
          // A higher-priority card shrinks step by step until it fits (never below the far-tier size),
          // so the most important cases are the last to be left out on small screens.
          const fullWidth = widths[i]
          const floor = withImages[i].backdrop ? fullWidth : DEPTH_TIERS[1].minW * fit * 0.8
          for (const shrink of withImages[i].backdrop ? [1] : [1, 0.85, 0.72, 0.6, 0.5]) {
            if (spot) break
            widths[i] = Math.max(floor, fullWidth * shrink)
            // A case with a fixed slot starts exactly there and, if needed, moves outward in a fixed
            // spiral, so the result is the same in every browser.
            const slot = withImages[i].slot
            if (slot) {
              const side = slot.x < 0 ? -1 : 1
              const textEdge = textZone.cx + side * textZone.hw
              const sx = textEdge + Math.abs(slot.x) * (side * W0 / 2 - textEdge)
              const sy = slot.y * (H0 / 2)
              // Stay on the slot's own side of the hero content and near its height, so the order
              // down each side never changes; if there is no room, the card shrinks instead.
              for (let r = 0; r <= 220 && !spot; r += 6) {
                const turns = r === 0 ? 1 : 16
                for (let k = 0; k < turns && !spot; k++) {
                  const a = (k / turns) * Math.PI * 2
                  const x = sx + Math.cos(a) * r, y = sy + Math.sin(a) * r * 0.5
                  if (side * (x - textZone.cx) <= 0) continue
                  if (allowed(x, y, i, placed, spacing)) spot = { x, y }
                }
              }
            }
            // Backdrop cards look anywhere on the canvas for space left between the cases.
            if (withImages[i].backdrop) {
              for (let attempt = 0; attempt < 500 && !spot; attempt++) {
                const x = (rand() - 0.5) * W0, y = (rand() - 0.5) * H0
                if (allowed(x, y, i, placed, spacing)) spot = { x, y }
              }
            }
            for (let attempt = 0; attempt < 400 && !spot && !slot; attempt++) {
              const spread = step * (0.3 + attempt / 50)
              const angle = home + (rand() - 0.5) * spread
              const band = 0.28 + rand() * 0.16
              const ex = Math.cos(angle) * band * W0, ey = Math.sin(angle) * band * H0
              const dist = Math.hypot(ex, ey) || 1
              const cx = ex / dist, cy = ey / dist
              // Search outward from just past the headline toward the canvas edge along this direction.
              const r = dist * (0.85 + rand() * 0.4)
              const x = textZone.cx + cx * r, y = textZone.cy + cy * r
              if (allowed(x, y, i, placed, spacing)) spot = { x, y }
            }
            if (widths[i] === floor) break
          }
          // A card with no safe spot even at its smallest is left out rather than squeezed in.
          // Failures are weighted by priority: dropping case 01 scores worse than dropping case 09, and
          // dropping any case scores worse than dropping every backdrop card.
          if (!spot) { widths[i] = fullWidth; failures += costOf(i); continue }
          placed.push({ i, ...spot })
        }
        return { placed, failures }
      }

      // Full white space first. On small canvases, step the spacing down; if cards still do not all
      // fit, make every card a little smaller and try again, so cards never have to overlap.
      let result = tryPlace(1), spacingUsed = 1
      let chosenWidths = [...widths]
      outer: for (const k of [1, 0.9, 0.8, 0.7, 0.6]) {
        if (k !== 1) setShrink(k)
        for (const sp of [1, 0.6, 0.3, 0]) {
          // Stop as soon as every case study fits; backdrop cards simply fill whatever space is left.
          if (k === 1 && sp === 1) { if (result.failures < 1000) break outer; continue }
          const next = tryPlace(sp)
          if (next.failures < result.failures || next.failures === 0) { result = next; spacingUsed = sp; chosenWidths = [...widths] }
          if (result.failures < 1000) break outer
        }
      }
      // Draw every card at the size it had in the chosen round, so positions and sizes always match.
      chosenWidths.forEach((w, i) => { widths[i] = w })
      layout.level = spacingUsed
      layout.fit = fit
      textCenter.x = textZone.cx
      textCenter.y = textZone.cy

      // Balance the bottom-right quadrant (only when the cases have no fixed slots). It runs after every card is placed and only moves cards in
      // that quadrant, so the rest of the layout stays exactly as it was. Visual weight is card area
      // times opacity. If the bottom-right carries less than half the average of the other quadrants:
      //   1. one of its far cards becomes a near (tier 3) card, placed where it has the most room;
      //   2. the most cramped of its remaining cards moves to a roomier spot in the same quadrant.
      // Every move still passes the same checks: no overlap, clear of the headline, inside the canvas.
      if (!withImages.some((it) => it.slot)) {
        const placed = result.placed
        const weightOf = (p: { i: number }) => widths[p.i] * widths[p.i] * withImages[p.i].aspect * DEPTH_TIERS[tiers[p.i]].opacity
        const inBR = (p: { x: number; y: number }) => p.x > 0 && p.y > 0
        const quadrant = (p: { x: number; y: number }) => (p.y < 0 ? 0 : 2) + (p.x < 0 ? 0 : 1)
        const weights = [0, 0, 0, 0]
        placed.forEach((p) => { weights[quadrant(p)] += weightOf(p) })
        const othersAvg = (weights[0] + weights[1] + weights[2]) / 3
        const roomAt = (x: number, y: number, skip: number) => {
          let best = Infinity
          for (const p of placed) if (p.i !== skip) best = Math.min(best, Math.hypot((x - p.x) * 0.75, y - p.y))
          return best
        }
        const findRoomiest = (i: number) => {
          const rest = placed.filter((p) => p.i !== i)
          let spot: { x: number; y: number } | null = null, bestRoom = -1
          for (let k = 0; k < 600; k++) {
            const x = rand() * (W0 / 2), y = rand() * (H0 / 2)
            if (!allowed(x, y, i, rest, spacingUsed)) continue
            const room = roomAt(x, y, i)
            if (room > bestRoom) { bestRoom = room; spot = { x, y } }
          }
          return spot ? { ...spot, room: bestRoom } : null
        }

        if (weights[3] < othersAvg * 0.5) {
          // 1. Promote one far card to the near tier, at the size of the other near cards.
          const nearWidths = placed.filter((p) => tiers[p.i] === 3).map((p) => widths[p.i])
          const nearWidth = nearWidths.length ? nearWidths.reduce((a, b) => a + b, 0) / nearWidths.length : widths[0] * 1.8
          const candidates = placed.filter((p) => inBR(p) && tiers[p.i] === 1)
            .sort((a, b) => roomAt(b.x, b.y, b.i) - roomAt(a.x, a.y, a.i))
          let promoted = -1
          for (const c of candidates) {
            const before = { tier: tiers[c.i], width: widths[c.i] }
            tiers[c.i] = 3
            widths[c.i] = nearWidth
            const spot = findRoomiest(c.i)
            if (spot) { c.x = spot.x; c.y = spot.y; promoted = c.i; break }
            tiers[c.i] = before.tier
            widths[c.i] = before.width
          }

          // 2. Give the most cramped remaining bottom-right card more room, if a clearly better spot exists.
          const rest = placed.filter((p) => inBR(p) && p.i !== promoted)
            .sort((a, b) => roomAt(a.x, a.y, a.i) - roomAt(b.x, b.y, b.i))
          const cramped = rest[0]
          if (cramped) {
            const now = roomAt(cramped.x, cramped.y, cramped.i)
            const spot = findRoomiest(cramped.i)
            if (spot && spot.room > now * 1.3) { cramped.x = spot.x; cramped.y = spot.y }
          }
        }

        // Bridge the widest gap in the bottom-right. For each small (far) card there, look at its nearest
        // neighbours on the left and on the right. The card sitting in the widest such gap is raised to the
        // middle tier and moved toward the midpoint between those two neighbours, so the row reads as a
        // smooth run of sizes instead of a hole with a tiny card in it. The move starts at the midpoint and
        // widens only as far as the checks allow: no overlap, clear of the headline, inside the canvas.
        const midWidths = placed.filter((p) => tiers[p.i] === 2).map((p) => widths[p.i])
        const midWidth = midWidths.length ? midWidths.reduce((a, b) => a + b, 0) / midWidths.length : widths[0] * 1.4
        const lowerHalf = placed.filter((p) => p.y > 0)
        let bridge: { card: (typeof placed)[number]; mid: { x: number; y: number }; span: number } | null = null
        for (const c of placed.filter((p) => inBR(p) && tiers[p.i] === 1)) {
          const left = lowerHalf.filter((p) => p.x < c.x).sort((a, b) => Math.hypot(a.x - c.x, a.y - c.y) - Math.hypot(b.x - c.x, b.y - c.y))[0]
          const right = placed.filter((p) => p.x > c.x && p.y > -H0 * 0.1).sort((a, b) => Math.hypot(a.x - c.x, a.y - c.y) - Math.hypot(b.x - c.x, b.y - c.y))[0]
          if (!left || !right) continue
          const span = Math.hypot(right.x - left.x, right.y - left.y)
          if (!bridge || span > bridge.span) bridge = { card: c, mid: { x: (left.x + right.x) / 2, y: (left.y + right.y) / 2 }, span }
        }
        if (bridge && bridge.span > midWidth * 3) {
          const m = bridge.card
          const rest = placed.filter((p) => p.i !== m.i)
          const before = { tier: tiers[m.i], width: widths[m.i] }
          const tryAt = (tier: 1 | 2, width: number) => {
            tiers[m.i] = tier
            widths[m.i] = width
            for (let k = 0; k < 600; k++) {
              const radius = k * 0.3
              const a = rand() * Math.PI * 2
              const x = bridge!.mid.x + Math.cos(a) * radius, y = bridge!.mid.y + Math.sin(a) * radius
              // Only accept spots closer to the midpoint than the card already is.
              if (Math.hypot(x - bridge!.mid.x, y - bridge!.mid.y) >= Math.hypot(m.x - bridge!.mid.x, m.y - bridge!.mid.y)) break
              if (allowed(x, y, m.i, rest, spacingUsed)) return { x, y }
            }
            return null
          }
          const spot = tryAt(2, midWidth) ?? tryAt(1, before.width)
          if (spot) { m.x = spot.x; m.y = spot.y } else { tiers[m.i] = before.tier; widths[m.i] = before.width }
          // If the middle tier did not fit, try promoting in place.
          if (!spot) {
            tiers[m.i] = 2
            widths[m.i] = midWidth
            if (!allowed(m.x, m.y, m.i, rest, spacingUsed)) { tiers[m.i] = before.tier; widths[m.i] = before.width }
          }
        }
      }

      const byIndex = new Map(result.placed.map((p) => [p.i, p]))
      cards.current = withImages.map((_, i) => {
        const p = byIndex.get(i) ?? { x: 0, y: 0 }
        const hidden = !byIndex.has(i)
        const t = DEPTH_TIERS[tiers[i]]
        const restScale = widths[i] / fit / PARALLAX.CARD_BASE
        return {
          hidden, fx: p.x / W0, fy: p.y / H0, depth: t.depth, restScale, restOpacity: t.opacity, tier: tiers[i], backdrop: !!withImages[i].backdrop,
          ox: 0, oy: 0, scale: restScale,
          floatAmp: withImages[i].backdrop ? PARALLAX.IDLE_MIN * rand() : PARALLAX.IDLE_MIN + rand() * (PARALLAX.IDLE_MAX - PARALLAX.IDLE_MIN), floatLive: 1,
          // Periods of roughly 9 to 20 seconds.
          fA: 0.0003 + rand() * 0.0004, fB: 0.0003 + rand() * 0.0004,
          pA: rand() * Math.PI * 2, pB: rand() * Math.PI * 2,
        }
      })
      return true
    }

    // Lay out once the canvas has a size, and again when its width changes noticeably.
    let laidOutWidth = 0
    const relayout = () => {
      const w = wrap.clientWidth
      if (laidOutWidth && Math.abs(w - laidOutWidth) / laidOutWidth < 0.12) return
      seed = 7
      if (place()) laidOutWidth = w
    }
    relayout()
    const observer = new ResizeObserver(relayout)
    observer.observe(wrap)
    // Lay out again once the web fonts have loaded and the content has finished its entrance, since
    // both change the size and position of the area the cards must avoid.
    const force = () => { laidOutWidth = 0; relayout() }
    document.fonts?.ready.then(force)
    const settle = window.setTimeout(force, 1000)

    let frame = 0
    let last = performance.now()
    let everScrolled = window.scrollY > 0
    const tick = (now: number) => {
      // Every step is scaled by elapsed time, so the motion is equally smooth at 60 Hz and 120 Hz.
      const dt = Math.min(3, (now - last) / 16.667)
      last = now
      const ease = (f: number) => 1 - Math.pow(1 - f, dt)
      const W = wrap.clientWidth, H = wrap.clientHeight
      const textHalfW = (textRef.current?.offsetWidth ?? 600) / 2
      const textHalfH = (textRef.current?.offsetHeight ?? 220) / 2
      const tcx = textCenter.x, tcy = textCenter.y
      const hoveredIndex = hoveredRef.current
      const fit = fitFor(W, H)
      const maxOffset = PARALLAX.MAX_OFFSET * fit
      const idle = PARALLAX.IDLE_MAX * fit
      // Exit on scroll: as the page scrolls past the hero, the cards drift up and fade, near cards
      // fastest and backdrop cards slowest, so the field lifts away by depth. 0 at the top of the
      // page, 1 once the field has scrolled most of its height. Skipped for reduced motion.
      const wr = wrap.getBoundingClientRect()
      const exit = reduceMotion ? 0 : Math.max(0, Math.min(1, -wr.top / (wr.height * 0.75) + 0.12))
      const exitEase = exit * exit * (3 - 2 * exit)

      cards.current.forEach((c, i) => {
        const el = itemRefs.current[i]
        if (!el) return
        if (c.hidden) { el.style.opacity = "0"; el.style.visibility = "hidden"; return }
        el.style.visibility = "visible"
        const isHovered = hoveredIndex === i
        // Hover grows the card smoothly; small far cards grow enough to be readable.
        c.scale = lerp(c.scale, isHovered ? Math.max(c.restScale * 1.35, 0.95) : c.restScale, ease(0.1))
        const shown = c.scale * fit
        const cardW = el.offsetWidth * shown, cardH = el.offsetHeight * shown

        // Anchor from its stored fraction of the canvas. As a safety net after a resize, if it sits
        // too close to the headline, move it outward along its own direction.
        let ax = c.fx * W
        let ay = c.fy * H
        // Use this card's own reach, the same figure the layout was planned with, so the safety net
        // never pushes a card further than planned and into a neighbour.
        const cardIdle = c.backdrop ? PARALLAX.IDLE_MIN * fit : idle
        const reachX = Math.min(maxOffset, 0.5 * W * c.depth) + cardIdle
        const reachY = Math.min(maxOffset, 0.5 * H * c.depth) + cardIdle
        const k = Math.max(Math.abs(ax - tcx) / (textHalfW + cardW / 2 + reachX), Math.abs(ay - tcy) / (textHalfH + cardH / 2 + reachY))
        if (k < 0.001) { ax = tcx + textHalfW + cardW / 2 + reachX; ay = tcy }
        else if (k < 1) { ax = tcx + (ax - tcx) / k; ay = tcy + (ay - tcy) / k }
        // Keep the anchor far enough inside the section that a full offset stays inside too.
        const limX = Math.max(0, W / 2 - cardW / 2 - reachX - 8)
        const limY = Math.max(0, H / 2 - cardH / 2 - reachY - 8)
        ax = Math.max(-limX, Math.min(limX, ax))
        ay = Math.max(-limY, Math.min(limY, ay))

        // Final position = anchor + idle float + cursor parallax.
        // Parallax: near layers shift further than far ones, opposite to the cursor, capped at MAX_OFFSET,
        // and eased with a heavy lerp so the cards follow the cursor slowly.
        const still = reduceMotion || isHovered
        const clampOffset = (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v))
        const targetX = still ? 0 : clampOffset(-mouse.current.x * W * c.depth)
        const targetY = still ? 0 : clampOffset(-mouse.current.y * H * c.depth)
        c.ox = lerp(c.ox, targetX, ease(PARALLAX.LERP))
        c.oy = lerp(c.oy, targetY, ease(PARALLAX.LERP))
        // Idle float: two slow waves per axis. It fades out while hovered and back in afterwards.
        c.floatLive = lerp(c.floatLive, still ? 0 : 1, ease(0.04))
        const amp = c.floatAmp * c.floatLive * fit
        const fx = (Math.sin(now * c.fA + c.pA) * 0.7 + Math.sin(now * c.fB * 0.6 + c.pB) * 0.3) * amp
        const fy = (Math.cos(now * c.fB + c.pB) * 0.7 + Math.cos(now * c.fA * 0.7 + c.pA) * 0.3) * amp

        // Upright, no rotation or skew.
        // Backdrop cards drift up and fade on scroll. Case cards stay put: once the page scrolls, the
        // flight layer (HeroDeckFlight) takes them over and carries them down into the Work deck.
        const lift = c.backdrop ? exitEase * (120 + 130) : 0
        const flying = !c.backdrop && !reduceMotion && window.scrollY > HERO_FLIGHT_START
        el.style.transform = `translate(-50%, -50%) translate(${W / 2 + ax + c.ox + fx}px, ${H / 2 + ay + c.oy + fy - lift}px) scale(${shown})`
        el.style.zIndex = isHovered ? "40" : String(10 + c.tier * 5)
        el.dataset.restOpacity = String(c.restOpacity)
        // The soft opacity fade is only for the cards' first appearance on load. Once the page has
        // been scrolled, every change is instant, so cards returning from the deck never fade in late.
        if (window.scrollY > 0) everScrolled = true
        el.style.transitionDuration = everScrolled ? "0s" : ""
        el.style.opacity = flying ? "0" : String((isHovered ? 1 : c.restOpacity) * (c.backdrop ? 1 - exitEase : 1))
        if (c.backdrop) el.style.filter = "grayscale(1)"
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.clearTimeout(settle) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withImages.length, reduceMotion])

  const active = hovered !== null ? withImages[hovered] : null

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden select-none ${className}`}
    >
      {withImages.map((p, i) =>
        p.backdrop ? (
          // Backdrop card: decorative only, never focusable or clickable.
          <button
            key={p.key}
            ref={(el) => { itemRefs.current[i] = el }}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute left-0 top-0 w-[240px] overflow-hidden rounded-2xl border border-[#19244E]/10 bg-white pointer-events-none transition-opacity duration-500"
            style={{ opacity: 0, aspectRatio: `1 / ${p.aspect}`, willChange: "transform" }}
          >
            <img src={p.src} alt="" className="w-full h-full object-cover object-top" draggable={false} />
          </button>
        ) : (
        <button
          key={p.key}
          ref={(el) => { itemRefs.current[i] = el }}
          type="button"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered((h) => (h === i ? null : h))}
          onClick={() => p.onOpen?.()}
          aria-label={`Open ${p.name}`}
          data-hero-case={p.key}
          className="absolute left-0 top-0 w-[240px] overflow-hidden rounded-xl border border-[#19244E]/10 bg-white shadow-[0_12px_30px_-14px_rgba(25,36,78,0.4)] cursor-pointer transition-opacity duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C]"
          style={{ opacity: 0, aspectRatio: `1 / ${p.aspect}`, willChange: "transform" }}
        >
          <img src={p.src} alt="" className="w-full h-full object-cover" draggable={false} />
        </button>
        )
      )}

      {/* The hero content sits in the clear zone in the middle; cards are laid out around it. */}
      <div className="absolute inset-0 z-30 flex items-center justify-center px-6 pb-[100px] pointer-events-none">
        <div
          ref={textRef}
          className="pointer-events-auto transition-opacity duration-300"
          style={{ opacity: active ? 0.25 : 1 }}
        >
          {children}
        </div>
      </div>

      {/* Name of the hovered project, pinned to the bottom so the image never covers it */}
      <div className="absolute inset-x-0 bottom-2 z-50 flex justify-center px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="text-center"
            >
              <span className="block font-display font-semibold text-[#19244E] text-xl sm:text-2xl">{active.name}</span>
              <span className="block mt-1 font-sans text-sm text-[#2E3A5C]">{active.sub} · Click to open the case study</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Rotating greeting above the hero headline.
function HeroGreeting({ tick, hellos, className = "" }: { tick: number; hellos: string[]; className?: string }) {
  return (
    <span
      className={`block font-display font-medium text-[#DB3E8C] min-h-[1.6em] ${className}`}
      style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={tick}
          initial={{ y: 4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -4, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          {hellos[tick]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// Resume, WhatsApp, email, LinkedIn, and View Full Profile, used by both hero layouts.
function HeroActions({ onOpenPdfPreview, onReadMore, center = false }: { onOpenPdfPreview?: () => void; onReadMore: () => void; center?: boolean }) {
  return (
    <div className={`flex flex-wrap xl:flex-nowrap items-center ${center ? "justify-center" : "justify-center sm:justify-start"} gap-2 sm:gap-2.5`}>
      {/* 1. Resume Download & In-App PDF Preview Button */}
      <button
        onClick={onOpenPdfPreview}
        className="flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wider transition-all duration-150 rounded-xl px-3.5 py-2 cursor-pointer bg-white"
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
    
      {/* 2. WhatsApp Icon Button */}
      <div className="relative group">
        <a
          href={getGeneralWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Adina Fayza Gayo on WhatsApp"
          className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150 cursor-pointer bg-white"
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
          <svg className="w-[15px] h-[15px] fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        </a>
    
        <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 hidden group-hover:flex items-center gap-2 bg-[#19244E] text-white px-3 py-1.5 rounded-lg shadow-xl text-xs font-mono font-medium whitespace-nowrap z-50 pointer-events-none transition-all duration-200">
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          <span>Let's chat on WhatsApp</span>
        </div>
      </div>
    
      {/* 3. Email Icon Button */}
      <div className="relative group">
        <a
          href="mailto:adinagayo@gmail.com"
          aria-label="Email Adina Fayza Gayo"
          className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150 cursor-pointer bg-white"
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
          className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150 cursor-pointer bg-white"
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
      {/* 5. Link: VIEW FULL PROFILE › */}
      <button
        onClick={onReadMore}
        className="font-sans text-xs font-bold tracking-wider uppercase text-[#DB3E8C] hover:underline transition-all flex items-center gap-1 focus:outline-none cursor-pointer py-0.5 ml-1 sm:ml-2 whitespace-nowrap"
      >
        <span>VIEW FULL PROFILE</span>
        <ChevronRight size={13} />
      </button>
    </div>
  )
}

function HeroSection({ onReadMore, onOpenPdfPreview, onOpenProject }: { onReadMore: () => void; onOpenPdfPreview?: () => void; onOpenProject: (projectId: string) => void }) {
  const [isAtWork, setIsAtWork] = useState(true)
  const [tick, setTick] = useState(0)
  // The floating work field is the desktop hero; phones and tablets keep the stacked layout.
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  const HELLOS = ["Hi, it's Dina!", "Halo, saya Dina!", "안녕하세요, 디나예요!"]

  // Scale and dim the hero as it leaves the screen. The fade is tied to the hero's own height:
  // it starts only once the hero's bottom edge has reached the bottom of the viewport, so on
  // phones, where the hero is taller than the screen, the buttons and facts stay fully visible
  // until they have been scrolled into view.
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroExit } = useScroll({ target: heroRef, offset: ["end end", "end start"] })
  const heroScale = useTransform(heroExit, [0, 0.45], [1, 0.96])
  const heroOpacity = useTransform(heroExit, [0, 0.45], [1, 0.05])

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % HELLOS.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── Technical Grid & Ambient Accent Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Ambient Color Accent Orbs / Soft Glows */}
        <div
          className="absolute -top-[12%] -right-[6%] w-[550px] h-[550px] rounded-full filter blur-[140px] opacity-[0.14]"
          style={{ background: "radial-gradient(circle, #DB3E8C 0%, #3B82F6 100%)" }}
        />
        <div
          className="absolute -bottom-[15%] -left-[8%] w-[650px] h-[650px] rounded-full filter blur-[160px] opacity-[0.09]"
          style={{ background: "radial-gradient(circle, #19244E 0%, #DB3E8C 100%)" }}
        />

        {/* Technical Linear Grid Pattern with Radial Mask */}
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(25, 36, 78, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(25, 36, 78, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 90%)",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 90%)",
          }}
        />

        {/* Subtle Dot Grid Accent Overlay */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(rgba(219, 62, 140, 0.22) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 35%, black 15%, transparent 85%)",
            maskImage: "radial-gradient(ellipse 65% 55% at 50% 35%, black 15%, transparent 85%)",
          }}
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
            <div className="w-1/2 min-w-[50%] flex flex-col justify-between px-4 sm:px-8 lg:px-16 pt-0 sm:pt-1 pb-32 sm:pb-40 lg:pb-0 min-h-[calc(100vh-100px)] shrink-0 bg-transparent">
              {/* Top Oversized Asymmetrical Headline & Floating Bio Container */}
              <div className="w-full mt-0 lg:-mt-2 mb-auto flex flex-col bg-transparent">
                {/* Info and profile row: info on the left, profile on the right in line style, no card */}
                <div className="relative z-20 w-full mt-8 sm:mt-12 lg:mt-16 flex flex-col gap-6 lg:gap-8">
                  <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center sm:items-start lg:flex-row lg:items-center lg:justify-center lg:gap-x-0 gap-3 font-mono text-xs text-[#19244E] text-center sm:text-left">
                    {/* Shipped Systems Counter: one line at every width; sits beside the role line on large screens */}
                    <div className="flex items-center sm:items-start lg:items-center justify-center sm:justify-start gap-2 font-bold tracking-wider text-[#DB3E8C]">
                      <div className="text-[#19244E] flex flex-row items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm leading-none">
                        <span>5+ YRS INDUSTRIAL EXP</span>
                      </div>
                    </div>

                    {/* Role line: one line instead of the four-row spec table */}
                    <div className="flex items-center justify-center sm:justify-start text-[13px] sm:text-[15px] leading-none tracking-wide whitespace-nowrap text-[#19244E]/85 pt-2 border-t border-[#19244E]/12 mx-auto sm:mx-0 lg:pt-0 lg:border-t-0">
                      <span className="hidden lg:inline text-[#DB3E8C] mx-1.5">·</span>
                      <span className="font-bold text-[#19244E]">Product Designer</span>
                      <span className="text-[#DB3E8C] mx-1.5">·</span>
                      <span>Jakarta, ID</span>
                      <span className="text-[#DB3E8C] mx-1.5">·</span>
                      <span className="inline-flex items-center gap-1.5 font-bold text-[#19244E] leading-none">
                        Open to team roles
                      </span>
                    </div>
                  </div>

                  </div>

                  {isDesktop && (
                    <HeroWorkField
                      items={[
                        ...FEATURED.map((c) => ({ key: c.projectId, name: c.shortTitle, sub: c.client, src: c.thumb, aspect: 2 / 3, slot: HERO_CASE_SLOTS[c.projectId], onOpen: () => onOpenProject(c.projectId) })),
                        // A handful of catalog thumbnails as a quiet backdrop (the newest ones), not the whole catalog.
                        ...PROJECTS.filter((p) => PROJECT_PREVIEWS[p.id] && !/\.(mp4|webm)$/.test(PROJECT_PREVIEWS[p.id])).slice(0, 8).map((p) => ({
                          key: `catalog-${p.id}`, name: p.name, sub: p.client, src: PROJECT_PREVIEWS[p.id], aspect: 4 / 3, backdrop: true,
                        })),
                      ]}
                      className="-mx-16 h-[calc(100vh-180px)] min-h-[580px] max-h-[920px] -mt-4"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: REVEAL_Y }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: REVEAL_DURATION, delay: 0.15, ease: REVEAL_EASE }}
                        className="flex flex-col items-center text-center max-w-[640px] 2xl:max-w-[820px]"
                      >
                        <div className="relative mb-4">
                          <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden border border-[#19244E]/10">
                            <ImageWithFallback
                              src={adinaPhotoAbout}
                              alt="Adina Fayza Gayo - At Work"
                              className="block w-full h-full object-cover object-[50%_18%]"
                            />
                          </div>
                          <motion.span
                            aria-hidden="true"
                            animate={{ rotate: [0, 18, -8, 18, -4, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                            style={{ transformOrigin: "70% 70%" }}
                            className="absolute -bottom-1 -right-2 w-8 h-8 rounded-full bg-white border border-[#19244E]/10 shadow-sm flex items-center justify-center text-base select-none"
                          >
                            👋
                          </motion.span>
                        </div>
                        <HeroGreeting tick={tick} hellos={HELLOS} className="mb-2" />
                        <h1
                          className="font-display font-medium text-[#0F172A] tracking-tight"
                          style={{ fontSize: "clamp(2rem, 3.1vw, 3.6rem)", lineHeight: 1.08 }}
                        >
                          I design end-to-end <span className="text-[#DB3E8C]">B2B platforms</span> across fintech, e-commerce, and enterprise systems.
                        </h1>
                        <p
                          className="font-sans text-[#2E3A5C] mt-4 max-w-[600px]"
                          style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)", lineHeight: 1.6 }}
                        >
                          I turn business rules and compliance constraints into flows people can follow and specs developers can build from.
                        </p>
                        <div className="h-5" />
                        <HeroActions onOpenPdfPreview={onOpenPdfPreview} onReadMore={onReadMore} center />
                      </motion.div>
                    </HeroWorkField>
                  )}

                  {!isDesktop && (
                  <>
                  <motion.div
                    initial={{ opacity: 0, y: REVEAL_Y }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: REVEAL_DURATION, delay: 0.15, ease: REVEAL_EASE }}
                    className="w-full"
                  >
                    <div className="flex flex-col-reverse sm:flex-row items-center sm:items-center sm:justify-between gap-8 lg:gap-16">
                      {/* Round profile photo with a waving hand */}
                      <div className="relative shrink-0 sm:order-2 sm:self-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full overflow-hidden border border-[#19244E]/10">
                          <ImageWithFallback
                            src={adinaPhotoAbout}
                            alt="Adina Fayza Gayo - At Work"
                            className="block w-full h-full object-cover object-[50%_18%]"
                          />
                        </div>
                        <motion.span
                          aria-hidden="true"
                          animate={{ rotate: [0, 18, -8, 18, -4, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                          style={{ transformOrigin: "70% 70%" }}
                          className="absolute bottom-1 -left-2 lg:bottom-3 lg:left-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white border border-[#19244E]/10 shadow-sm flex items-center justify-center text-xl sm:text-2xl lg:text-3xl select-none"
                        >
                          👋
                        </motion.span>
                      </div>

                      {/* Bio Paragraph & Conversion CTAs */}
                      <div className="flex-1 min-w-0 max-w-5xl text-center sm:text-left sm:order-1">
                        <HeroGreeting tick={tick} hellos={HELLOS} className="mb-3 sm:mb-4" />
                        <h1
                          className="font-display font-medium text-[#0F172A] tracking-tight"
                          style={{ fontSize: "clamp(2.1rem, 4.7vw, 5.2rem)", lineHeight: 1.04 }}
                        >
                          I design end-to-end <span className="text-[#DB3E8C]">B2B platforms</span> across fintech, e-commerce, and enterprise systems.
                        </h1>
                        <p
                          className="font-sans text-[#2E3A5C] mt-5 sm:mt-6 max-w-3xl mx-auto sm:mx-0"
                          style={{ fontSize: "clamp(1rem, 1.35vw, 1.2rem)", lineHeight: 1.6 }}
                        >
                          I turn business rules and compliance constraints into flows people can follow and specs developers can build from.
                        </p>

                        <div className="h-5" />

                        <HeroActions onOpenPdfPreview={onOpenPdfPreview} onReadMore={onReadMore} />

                      </div>
                    </div>
                  </motion.div>

                  <HeroFacts />
                  </>
                  )}
                </div>
              </div>
            </div>

            {/* ── PANEL B: IN LIFE ── */}
            <div className="w-1/2 min-w-[50%] flex flex-col justify-between px-4 sm:px-8 lg:px-20 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 min-h-[calc(100vh-140px)] shrink-0 bg-transparent">
            {/* Centered Editorial Headline & Bio */}
            <div className="flex flex-col items-center max-w-5xl mx-auto my-auto w-full bg-transparent">
              <motion.h1
                initial={{ opacity: 0, y: REVEAL_Y }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE }}
                className="font-medium leading-[0.96] sm:leading-[0.90] tracking-tight text-center group select-none cursor-default bg-transparent"
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 7.8rem)",
                  fontFamily: "var(--font-serif)",
                }}
              >
                <WavyHeadlineText text="Plot Twists. Live Acoustics." color="#0F172A" />
                <WavyHeadlineText text="Front Row Crowds" color="#DB3E8C" />
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
                    <span className="text-[11px] font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
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
                    <span className="text-[11px] font-bold tracking-widest text-[#DB3E8C] uppercase block mb-0.5">
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

  // Rendered into <body> through a portal. Inside the deck it sat under a parent that scales on
  // hover, which made the "fixed" overlay size itself to the deck (a small window) and jump to full
  // screen when the cursor left. The wrapper stops clicks and pointer presses from reaching the deck
  // through the React tree, so closing the viewer never opens the case or starts a drag.
  return createPortal(
    <div onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
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
            <span className="px-3 py-1 rounded-md bg-[#DB3E8C] text-white text-[11px] font-sans font-bold tracking-widest uppercase shadow-md">
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
    </div>,
    document.body,
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs font-sans font-medium text-white/50 tracking-wider uppercase z-40 pointer-events-none whitespace-nowrap">
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
              <div className="absolute bottom-3 left-3 right-3 px-2.5 py-1 bg-[#19244E]/90 backdrop-blur-md rounded text-[11px] font-sans font-bold text-white tracking-widest uppercase border border-white/10 truncate text-center opacity-0 group-hover/item:opacity-100 transition-opacity z-10 pointer-events-none">
                {screen.label}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Badge Indicator */}
      <div className="absolute -top-2 right-0 px-3 py-1 bg-[#DB3E8C] text-white font-sans text-[11px] font-bold tracking-widest uppercase rounded-full shadow-md z-30 pointer-events-none flex items-center gap-1.5">
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
      <div className="absolute bottom-4 left-6 px-3 py-1 bg-[#19244E]/90 backdrop-blur-md rounded-lg text-[11px] font-sans font-bold text-white tracking-widest uppercase border border-white/15 z-20 pointer-events-none shadow-md">
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
    <div className="absolute -top-2 right-0 px-3 py-1 bg-[#DB3E8C] text-white font-sans text-[11px] font-bold tracking-widest uppercase rounded-full shadow-md z-30 pointer-events-none flex items-center gap-1.5">
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
  // Coming back from a case page, the deck must already be in place for the image to land on it,
  // so the section skips its entrance animation that one time.
  const [skipReveal] = useState(() => {
    const w = window as unknown as { __skipWorkReveal?: boolean }
    const skip = !!w.__skipWorkReveal
    w.__skipWorkReveal = false
    return skip
  })

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

  // The right column's content for one case. Rendered for every case (invisibly) as well, so the
  // column always takes the height of the tallest case and the list and deck never jump when the
  // reader switches between cases.
  const renderSpecs = (project: (typeof FEATURED)[number]) => (
    <>
          <div>
            <span className="font-sans text-xs font-semibold tracking-wider text-white/60 uppercase block mb-1">
              CLIENT: {project.client}
            </span>
            <h3 className="font-display font-semibold mb-2 leading-tight text-white text-xl sm:text-2xl" style={{ letterSpacing: "-0.02em" }}>
              {project.name}
            </h3>
            <p className="text-base leading-relaxed mb-3 font-sans text-white/80">
              {project.headline}
            </p>
          </div>

          {/* Metrics/Stats */}
          <div className="space-y-3">
            <div className="flex flex-col gap-2 border-t border-[#DB3E8C]/20 pt-3">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-1.5">
                <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase">OWNERSHIP ROLE</span>
                <span className="font-sans font-semibold text-white text-sm text-right">
                  {project.role}
                </span>
              </div>
              {project.metrics.map((m) => (
                <div key={m.sub} className="flex items-baseline justify-between border-b border-white/5 pb-1.5">
                  <span className="font-sans text-xs font-semibold tracking-widest text-white/60 uppercase">{m.sub}</span>
                  <span className="font-display font-semibold text-white text-base sm:text-lg" style={{ color: C }}>
                    {m.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => onOpenProject(project.projectId)}
                className="group flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[#DB3E8C] hover:bg-[#DB3E8C]/90 text-white font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-lg shadow-[#DB3E8C]/25 hover:shadow-[0_8px_20px_rgba(219,62,140,0.4)] cursor-pointer"
              >
                <span>Open Case Study</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <a
                href={getWhatsAppLink(project.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold tracking-wider text-xs uppercase transition-all cursor-pointer text-center shadow-sm"
              >
                <MessageSquare size={14} />
                <span>Ask about this project ↗</span>
              </a>
            </div>
          </div>
    </>
  )


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

        {/* Section intro: fades up each time the section scrolls into view, like Process */}
        <motion.div
          initial={skipReveal ? false : { opacity: 0, y: REVEAL_Y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE }}
          className="px-4 sm:px-8 lg:px-16 pt-14 sm:pt-16 lg:pt-20 pb-5 sm:pb-7 lg:pb-8"
          style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.08)` }}
        >
          <h2
            className="font-display font-normal leading-tight text-white"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.02em", maxWidth: "900px" }}
          >
            Projects that <br className="lg:hidden" />
            define{" "}
            <em className="font-normal" style={{ color: C }}>how I think.</em>
          </h2>
        </motion.div>


        {/* Showcase container: follows the intro in, slightly later */}
        <motion.div
          initial={skipReveal ? false : { opacity: 0, y: REVEAL_Y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: REVEAL_DURATION, delay: 0.15, ease: REVEAL_EASE }}
          className="px-4 sm:px-8 lg:px-16"
        >
          {/* Desktop Showcase */}
          <div className="hidden lg:grid lg:grid-cols-[300px_1fr_320px] gap-8 py-10 min-h-[540px]">
            {/* Left Column: Project Selector (Ultra-Compact Single-Line Project List) */}
            <div className="flex flex-col justify-center gap-y-2 sm:gap-y-2.5 py-2 pr-4 border-r border-white/10 overflow-hidden select-none">
              {FEATURED.map((project, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={project.projectId}
                    onClick={() => onActiveIndexChange(i)}
                    aria-label={`View project: ${project.name}`}
                    aria-pressed={i === activeIndex}
                    className={`group w-full text-left transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E62E85] py-1.5 px-3 border-l-2 ${
                      isActive
                        ? "border-[#E62E85] bg-[#E62E85]/10 rounded-r-md"
                        : "border-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full min-w-0">
                      <span
                        className={`font-mono text-sm w-7 shrink-0 transition-colors duration-200 ${
                          isActive ? "text-[#E62E85] font-bold" : "text-slate-500 group-hover:text-slate-400 font-normal"
                        }`}
                      >
                        {project.num}
                      </span>
                      <span
                        className={`text-sm sm:text-base transition-all duration-200 whitespace-nowrap ${
                          isActive
                            ? "text-white font-semibold translate-x-0.5"
                            : "text-slate-400 group-hover:text-slate-200 group-hover:translate-x-1 font-medium"
                        }`}
                        title={project.name}
                      >
                        {project.shortTitle || project.name}
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
              {/* Figma frame label & NDA Badge (Stacked Top Left) */}
              <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-1.5 pointer-events-none max-w-[calc(100%-2rem)]">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded text-xs font-sans font-bold tracking-widest text-white/90 shadow-sm pointer-events-auto">
                  {activeProject.num} · {activeProject.location} · {activeProject.year}
                </div>

                {'confidentialNote' in activeProject && activeProject.confidentialNote && (
                  <div
                    className="text-amber-200/90 text-xs font-sans font-medium whitespace-nowrap pointer-events-auto cursor-help"
                    title="Client names, logos, and specific metrics have been sanitized to respect NDAs. What is shown here reflects the real process, not real production data."
                  >
                    <span>Sanitized for NDA · Reflects real process</span>
                  </div>
                )}
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
                {/* The hero's flying cards land here; this wrapper marks the landing spot. */}
                <div data-deck-target={activeProject.projectId} className="relative w-full h-full min-h-[460px] lg:min-h-[480px] flex items-center justify-center">
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
                </div>
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
                        className="ml-0.5 mt-2.5 px-2 py-0.5 rounded-md text-[11px] font-sans font-bold text-white shadow-lg border border-white/20 whitespace-nowrap"
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
            <div className="grid pl-6 border-l border-white/10">
              {/* Invisible copies of every case's specs, stacked in one cell: they set the column's height */}
              {FEATURED.map((project) => (
                <div key={project.projectId} aria-hidden="true" className="invisible [grid-area:1/1] flex flex-col justify-center space-y-4 py-1">
                  {renderSpecs(project)}
                </div>
              ))}
              <div className="[grid-area:1/1] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.projectId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col justify-center space-y-4 py-1"
                  >
                    {renderSpecs(activeProject)}
                  </motion.div>
                </AnimatePresence>
              </div>
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
                    <span className="font-sans text-xs text-white/60 tracking-wider font-semibold">
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

                  {/* Confidentiality Note badge under image */}
                  {'confidentialNote' in project && project.confidentialNote && (
                    <div
                      className="mb-3 text-amber-200/90 text-xs font-sans font-medium w-fit"
                      title={project.confidentialNote}
                    >
                      <span>Sanitized for NDA · Reflects real process</span>
                    </div>
                  )}

                  {/* Metadata & Headline */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-sans text-xs font-semibold text-white/60 uppercase mb-0.5 tracking-wider">
                        CLIENT: {project.client}
                      </p>
                      <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-2 leading-tight">
                        {project.name}
                      </h3>
                      <p className="text-sm sm:text-base leading-relaxed text-white/80 mb-4 font-sans line-clamp-3">
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
        </motion.div>
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
    desc: "Every project starts with understanding the real problem. I dig into requirements with PMs, then do desk research: testing existing apps hands-on, reading API and product documentation, and benchmarking patterns from mature platforms. I align early with backend engineers so edge cases and data logic are solid before I design screens.",
    tools: ["Stakeholder Q&A", "Desk Research", "App Walkthroughs", "Backend Alignment", "User Flows & Sitemaps"],
    footerMeta: "PMs consulted · Apps benchmarked hands-on",
    Icon: Users,
  },
  {
    num: "02",
    title: "Benchmark & AI Ideation",
    category: "Explore",
    desc: "I balance speed and quality by adapting proven patterns from mature apps and Dribbble, then exploring directions quickly with AI (Stitch AI, Claude, Gemini) before committing to one in Figma.",
    tools: ["Pattern Benchmarking", "Reference Boards", "AI Ideation", "Concept Directions"],
    footerMeta: "Claude, Gemini & Stitch AI in the loop",
    Icon: Zap,
  },
  {
    num: "03",
    title: "Platform-first Design",
    category: "Design",
    desc: "I first confirm which platform matters most, mobile or web, and design that one in Figma with the edge-case states developers need. I add responsive screens only where a layout truly changes; the rest, developers adapt from the base. I also work with graphic designers on custom visuals and build code prototypes when needed.",
    tools: ["Design Systems", "Figma Variables & Components", "Edge-case States", "Code Prototypes"],
    footerMeta: "Mobile or web first, responsive where it matters",
    Icon: Layers,
  },
  {
    num: "04",
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

// ─── SCROLL REVEAL TEXT ──────────────────────────────────────────────────────
// Each piece starts dim and turns fully white as the reader scrolls the statement
// through the middle of the screen. Pieces are words, or an icon with its punctuation.
type RevealPiece = { key: string; node: ReactNode }

function RevealPieceSpan({ piece, index, total, progress }: { piece: RevealPiece; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total
  const end = Math.min(1, start + 1.5 / total)
  const opacity = useTransform(progress, [start, end], [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {piece.node}{" "}
    </motion.span>
  )
}

function ScrollRevealText({ pieces, className, style }: { pieces: RevealPiece[]; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.7"] })
  return (
    <h2 ref={ref} className={className} style={style}>
      {reduceMotion
        ? pieces.map((p) => <span key={p.key}>{p.node} </span>)
        : pieces.map((p, i) => <RevealPieceSpan key={p.key} piece={p} index={i} total={pieces.length} progress={scrollYProgress} />)}
    </h2>
  )
}

function revealWords(text: string, keyPrefix: string, render?: (word: string) => ReactNode): RevealPiece[] {
  return text.split(" ").map((word, i) => ({ key: `${keyPrefix}-${i}`, node: render ? render(word) : word }))
}

function WorkflowSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div
      id="process"
      className="relative overflow-hidden bg-white"
    >
      {/* ── BLOCK 1: PROCESS (three phases) ── */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 lg:pb-28 px-6 sm:px-12 lg:px-20 z-20 bg-white" style={{ borderTop: `1px solid ${HAIR}` }}>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section headline, styled like the catalog's */}
          <motion.h2
            initial={{ opacity: 0, y: REVEAL_Y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE }}
            className="font-display font-medium text-[#19244E] tracking-tight mb-12 sm:mb-16"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
          >
            From brief to <span className="text-[#DB3E8C]">developer handoff.</span>
          </motion.h2>

          {/* Four phases: one row of four on wide screens, a 2×2 grid on tablets and small laptops */}
          <div className="relative">
            {/* Continuous Top Pipeline Track Line (Desktop) */}
            <div className="hidden xl:block absolute top-[15px] left-0 right-0 h-px bg-[#19244E]/10 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:grid-rows-[auto_auto_auto_auto] xl:grid-rows-[auto_auto] gap-y-10 md:gap-y-14 xl:gap-y-0 gap-x-10 xl:gap-x-12 relative z-10">
              {PHASES.map((phase, idx) => {
                // Vertical divider after each column: phases 01 and 03 on the 2×2 grid, every phase but the last on one row.
                const divider = [
                  idx % 2 === 0 ? "md:border-r md:pr-10" : "",
                  idx < PHASES.length - 1 ? "xl:border-r xl:pr-12" : "xl:border-r-0 xl:pr-0",
                ].join(" ")

                return (
                  <motion.div
                    key={phase.num}
                    initial={{ opacity: 0, y: REVEAL_Y }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: REVEAL_DURATION, delay: idx * 0.15, ease: REVEAL_EASE }}
                    className={`flex flex-col md:grid md:grid-rows-subgrid md:row-span-2 relative group md:border-[#19244E]/10 ${divider}`}
                  >
                    <div>
                      {/* Top Node Header: Node Dot & Sleek Mono Label */}
                      <div className="flex items-center gap-2.5 mb-7 bg-white pr-4 w-fit relative z-10">

                        <span className="w-2.5 h-2.5 rounded-full bg-[#DB3E8C] shadow-[0_0_8px_rgba(219,62,140,0.45)] animate-pulse" />
                        <span className="font-mono text-[11px] font-bold tracking-widest text-[#DB3E8C] uppercase px-3 py-1 rounded-full bg-[#DB3E8C]/10 border border-[#DB3E8C]/25">
                          {phase.num} {phase.category}
                        </span>
                      </div>

                      {/* Step Title: Large Bold Heading */}
                      <h3 className="font-display font-bold text-[#19244E] text-xl sm:text-2xl lg:text-[26px] mb-4 leading-tight group-hover:text-[#DB3E8C] transition-colors duration-200">
                        {phase.title}
                      </h3>

                      {/* Process Description */}
                      <p className="text-[#2E3A5C] text-base leading-relaxed font-sans mb-8">
                        {phase.desc}
                      </p>
                    </div>

                    {/* Bottom Artifacts Section (Plain Text) */}
                    <div className="pt-6 border-t border-[#19244E]/10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#DB3E8C]">
                          TOOLS & ARTIFACTS
                        </span>
                      </div>
                      <p className="font-sans text-[15px] leading-relaxed text-[#2E3A5C] font-normal">
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
                className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#19244E]/70 hover:text-[#DB3E8C] transition-colors duration-200 cursor-pointer inline-flex items-center gap-2 group/cta"
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
        className="relative overflow-hidden flex flex-col justify-center min-h-[440px] lg:min-h-[480px]"
        style={{ backgroundColor: S, borderTop: `1px solid ${HAIR}` }}
      >
        {/* Headline area */}
        <div className="relative flex-1 flex flex-col justify-center overflow-hidden">
          {/* Section headline — scroll-driven smooth fade out */}
          {/* No fade-out on scroll: once revealed, the statement stays fully readable. */}
          <div className="relative z-20 px-4 sm:px-8 lg:px-16 py-14 sm:py-20 lg:py-24 flex flex-col items-center text-center">
            <p className="font-sans text-[11px] font-bold tracking-[0.25em] uppercase mb-6 sm:mb-10 text-[#DB3E8C]">
              THE LOGIC BEHIND IT
            </p>
            <ScrollRevealText
              className="font-display font-light leading-[1.45] text-[#19244E] max-w-4xl text-center"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 4.2rem)", letterSpacing: "-0.025em" }}
              pieces={[
                ...revealWords("I dig into complex problems first", "a"),
                {
                  key: "icon-search",
                  node: (
                    <span className="whitespace-nowrap">
                      <span className="inline-block align-middle mx-1 sm:mx-1.5 hover:scale-110 transition-transform duration-300">
                        <StandaloneSearchIcon className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#DB3E8C]" />
                      </span>,
                    </span>
                  ),
                },
                ...revealWords("craft intuitive web & app interfaces with", "b"),
                ...revealWords("solid logic", "c", (w) => <span className="text-[#DB3E8C] font-bold">{w}</span>),
                {
                  key: "icon-target",
                  node: (
                    <span className="whitespace-nowrap">
                      <span className="inline-block align-middle mx-1 sm:mx-1.5 hover:scale-110 transition-transform duration-300">
                        <StandaloneTargetIcon className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#DB3E8C]" />
                      </span>,
                    </span>
                  ),
                },
                ...revealWords("and hand off Figma files", "d"),
                ...revealWords("engineers rarely have to second-guess.", "e"),
                {
                  key: "icon-clipboard",
                  node: (
                    <span className="inline-block align-middle mx-1 sm:mx-1.5 hover:scale-110 transition-transform duration-300">
                      <StandaloneClipboardIcon className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 inline-block text-[#DB3E8C]" />
                    </span>
                  ),
                },
              ]}
            />
          </div>
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
  10: drGadgetThumb,
  11: familyMooThumb,
  12: telescopeThumb,
  13: aseanThumb,
  14: disnavThumb,
  15: yametThumb,
  16: adaPolisiThumb,
  17: ftjslThumb,
}

const STATUS_COLOR: Record<string, string> = {
  "LIVE":          "#22c55e",
  "LIVE INTERNAL": "#3b82f6",
  "PRODUCTION":    "#10b981",
  "PROTOTYPE":     "#f59e0b",
  "ON HOLD":       "#f97316",
  "ARCHIVED":      "rgba(25,36,78,0.30)",
}


const DEFAULT_VISIBLE = 5

const getGradient = (id: number) => {
  const subtleGradients = [
    "linear-gradient(135deg, #19244E 0%, #141D3B 60%, #0D1530 100%)",
    "linear-gradient(135deg, #19244E 0%, #162247 60%, #101835 100%)",
    "linear-gradient(135deg, #141D3B 0%, #19244E 60%, #0F1633 100%)",
  ]
  return subtleGradients[id % subtleGradients.length]
}

// ─── CATALOG GALLERY VIEW ────────────────────────────────────────────────────
// Gallery view: one horizontally scrolling row of project cards in the same card language as the
// Work section (padded card, rounded image, name + meta underneath), so the catalog reads as a
// continuation of the case studies and stays short. Swipe/trackpad scroll, plus arrow buttons for
// mouse users. Static on purpose, like the list view.
function CatalogGrid({ projects, onOpen, headline, toolbar }: { projects: Project[]; onOpen: (p: Project) => void; headline: ReactNode; toolbar?: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [edge, setEdge] = useState({ start: true, end: false })

  // "Deal" entrance, continuing the hero → deck story: while the row is off screen its cards sit in a
  // tilted pile on the first card's spot, like the Work deck; each time the row comes into view they
  // are dealt out to the right, one after another. Cards whose spot is already off screen to the right
  // stay where they are, so nothing streaks across the screen. Skipped for reduced motion.
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [pileOffsets, setPileOffsets] = useState<number[]>([])
  const [dealt, setDealt] = useState(false)
  const measurePile = () => {
    const track = trackRef.current
    const first = cardRefs.current[0]
    if (!track || !first) return
    setPileOffsets(cardRefs.current.map((c) => {
      if (!c) return 0
      const d = c.offsetLeft - first.offsetLeft
      return d > track.clientWidth ? 0 : -d
    }))
  }
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    measurePile()
    // Deal once a quarter of the row is visible; gather the pile again only after the row has left
    // the screen completely, so cards never vanish while they can still be seen.
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.25) setDealt(true)
      else if (!e.isIntersecting) { setDealt(false); track.scrollLeft = 0 }
    }, { threshold: [0, 0.25] })
    io.observe(track)
    window.addEventListener("resize", measurePile)
    return () => { io.disconnect(); window.removeEventListener("resize", measurePile) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length])
  const PILE_ROTATE = [0, -3, 2.5, -1.5, 3.5, -2.5]
  const PILE_Y = [0, 2, -2, 3, -1, 1]
  const showDealt = dealt || !!reduceMotion
  const updateEdge = () => {
    const el = trackRef.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }
  useEffect(() => {
    updateEdge()
    window.addEventListener("resize", updateEdge)
    return () => window.removeEventListener("resize", updateEdge)
  }, [])
  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" })
  }
  const arrow = "flex items-center justify-center w-10 h-10 rounded-full border border-[#19244E]/15 bg-white text-[#19244E] transition-all hover:border-[#19244E]/40 disabled:opacity-30 disabled:cursor-default cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C]"
  return (
    <div className="pt-10 sm:pt-14 pb-14 sm:pb-20">
      <div className="px-4 sm:px-8 lg:px-16 flex items-end justify-between gap-6 mb-8 sm:mb-10">
        {headline}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <button type="button" aria-label="Scroll catalog left" className={arrow} disabled={edge.start} onClick={() => scrollByPage(-1)}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label="Scroll catalog right" className={arrow} disabled={edge.end} onClick={() => scrollByPage(1)}>
              <ChevronRight size={18} />
            </button>
          </div>
          {toolbar}
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={updateEdge}
        className="flex gap-3 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-8 lg:scroll-px-16 px-4 sm:px-8 lg:px-16 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((p, i) => {
          const src = PROJECT_PREVIEWS[p.id]
          const offset = pileOffsets[i] ?? 0
          const inPile = i === 0 || offset !== 0
          return (
            <motion.button
              ref={(el) => { cardRefs.current[i] = el }}
              initial={false}
              animate={
                showDealt || !inPile
                  ? { x: 0, y: 0, rotate: 0 }
                  : { x: offset, y: PILE_Y[i % PILE_Y.length], rotate: PILE_ROTATE[i % PILE_ROTATE.length] }
              }
              transition={
                showDealt
                  ? { duration: 0.65, ease: REVEAL_EASE, delay: 0.1 + i * 0.07 }
                  : { duration: 0 }
              }
              style={{ zIndex: projects.length - i }}
              key={p.id}
              type="button"
              onClick={() => onOpen(p)}
              className="group shrink-0 snap-start w-[42vw] sm:w-[220px] lg:w-[240px] xl:w-[260px] flex flex-col justify-start text-left rounded-2xl bg-white border border-[#19244E]/10 p-2.5 sm:p-3 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(25,36,78,0.25)] hover:border-[#19244E]/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C] my-2"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#19244E]/5">
                {src && (
                  <img
                    src={src}
                    alt={`${p.name} preview`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="px-1 pt-3 pb-1">
                <p className="font-sans text-sm sm:text-[15px] font-semibold text-[#19244E] leading-snug">{p.name}</p>
                <p className="font-sans text-xs sm:text-[13px] text-[#2E3A5C]/70 mt-1 leading-snug">
                  {p.category} · {p.year}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function ProjectArchiveSection() {
  const [showAll, setShowAll] = useState(false)
  const filtered = PROJECTS
  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE)
  const hasMore = filtered.length > DEFAULT_VISIBLE

  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  // Gallery by default on wide screens, list by default on phones.
  const [view, setView] = useState<"list" | "gallery">(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches ? "gallery" : "list"
  )

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

  // Gallery / list switch, shown at the end of the catalog's headline row in both views.
  const viewToggle = (
  <div role="tablist" aria-label="Catalog view" className="flex items-center gap-1 p-1 rounded-xl border border-[#19244E]/10 bg-white">
    {([
      { v: "gallery", label: "Gallery view", Icon: LayoutGrid },
      { v: "list", label: "List view", Icon: List },
    ] as const).map(({ v, label, Icon }) => {
      const isActive = view === v
      return (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={isActive}
          aria-label={label}
          title={label}
          onClick={() => setView(v)}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C] ${
            isActive ? "bg-[#19244E] text-white" : "text-[#19244E]/50 hover:text-[#19244E] hover:bg-[#19244E]/5"
          }`}
        >
          <Icon size={16} />
        </button>
      )
    })}
  </div>
  )
  const headline = (
    <h3
      className="font-display font-medium text-[#19244E] tracking-tight"
      style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
    >
      {filtered.length} more products, designed <span className="text-[#DB3E8C]">end to end.</span>
    </h3>
  )

  return (
    <section
      id="archive"
      style={{ backgroundColor: S, borderTop: `1px solid ${HAIR}` }}
    >
      {/* Catalog List View */}
      {view === "gallery" ? (
        <CatalogGrid projects={filtered} onOpen={setSelectedProject} headline={headline} toolbar={viewToggle} />
      ) : (
      // List view is static on purpose: no entry animation, so rows never fade out as the reader
      // scrolls on to the next section.
      <AnimatePresence mode="wait">
        <motion.div key="all">
          <div className="px-4 sm:px-8 lg:px-16 pt-10 sm:pt-14 flex items-end justify-between gap-6">
            {headline}
            {viewToggle}
          </div>
          <div className="px-4 sm:px-8 lg:px-16 py-6 sm:py-10">
            <div className="divide-y divide-[#19244E]/10 border-t border-b border-[#19244E]/10">
              {visible.map((project, idx) => {
                const isHovered = hoveredId === project.id
                const formattedNum = String(project.id).padStart(2, "0")
                const previewImg = PROJECT_PREVIEWS[project.id]

                return (
                  <motion.div
                    key={project.id}
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
                          <span className="font-sans text-sm sm:text-[15px] text-[#19244E]/70 font-medium truncate">
                            {project.client}
                          </span>
                          <span className="text-[#19244E]/30 hidden sm:inline">•</span>
                          <span className="font-sans text-sm sm:text-[15px] text-[#19244E]/60 hidden sm:inline truncate">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Year, Status Badge, WhatsApp link & Plus (+) icon */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#19244E]/5">
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-sm text-[#19244E]/60 font-medium hidden md:inline">
                          {project.year}
                        </span>
                        
                        {/* Status Text */}
                        <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#19244E]/60">
                          {project.status}
                        </span>

                        {/* WhatsApp Quick Link */}
                        <a
                          href={getWhatsAppLink(project.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 font-sans text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#19244E]/50 hover:text-[#DB3E8C] transition-colors p-1"
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
      )}

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
                <p className="font-sans text-base sm:text-[17px] leading-relaxed text-[#19244E]/90">
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
      style={{ backgroundColor: W, borderTop: `1px solid ${HAIR}` }}
    >
      <div ref={ref} className="grid lg:grid-cols-[1fr_1px_480px]" style={{ minHeight: "440px" }}>
        {/* Left: headline */}
        <motion.div
          initial={{ opacity: 0, y: REVEAL_Y }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: REVEAL_Y }}
          transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE }}
          className="flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 sm:py-16"
        >
          <h2
            className="font-display font-light leading-[0.95] sm:leading-[0.9] my-4 sm:my-6 text-[#19244E]"
            style={{ fontSize: "clamp(2.1rem, 5.5vw, 5rem)", letterSpacing: "-0.025em" }}
          >
            Ready to build<br />something<br />
            <TypingWordEffect words={WORDS} />
          </h2>
          <p className="text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-[440px] text-[#2E3A5C] font-sans" style={{ lineHeight: 1.75 }}>
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
              className="flex items-center gap-2 px-5 sm:px-6 py-3 text-sm font-medium text-[#19244E] bg-white transition-all duration-150 hover:bg-[#19244E]/5 rounded-xl cursor-pointer"
              style={{ border: `1px solid rgba(25, 36, 78, 0.2)` }}
            >
              Resume <Eye size={14} />
            </button>
          </div>
        </motion.div>

        {/* Vertical divider */}
        <div className="hidden lg:block bg-[#19244E]/10" />

        {/* Right: contact details */}
        <motion.div
          initial={{ opacity: 0, y: REVEAL_Y }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: REVEAL_Y }}
          transition={{ duration: REVEAL_DURATION, delay: 0.15, ease: REVEAL_EASE }}
          className="flex flex-col justify-center bg-white"
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
              style={{ borderBottom: i < 3 ? `1px solid ${HAIR}` : "none" }}
            >
              <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#19244E]/60 block mb-1">{item.label}</span>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.label === "LinkedIn" ? "_blank" : undefined}
                  rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="block text-sm sm:text-base font-semibold mt-1.5 sm:mt-2 mb-0.5 hover:text-[#DB3E8C] transition-colors text-[#19244E]"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm sm:text-base font-semibold mt-1.5 sm:mt-2 mb-0.5 text-[#19244E]">{item.value}</p>
              )}
              {item.sub && <p className="text-sm text-[#2E3A5C]/80">{item.sub}</p>}
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
      style={{ backgroundColor: W, borderTop: `1px solid ${HAIR}` }}
    >
      <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-[#19244E]/60">© 2026 Adina Fayza Gayo</span>
    </footer>
  )
}

const FEATURED_INDEX_MAP: Record<string, number> = {
  backoffice: 0,
  tng: 1,
  election: 2,
  anlene: 3,
  myarchery: 4,
  bijakwang: 5,
  gegi: 6,
  archery: 7,
  telkom: 8,
}

// ─── APP ──────────────────────────────────────────────────────────────────────
// ─── CASE MORPH ───────────────────────────────────────────────────────────────
// Desktop only. Opening a case study from the Work deck (or a hero card) grows that card's cover
// smoothly into the hero image at the top of the case page, so the card's journey (hero → deck →
// case) reads as one continuous move. The source rect is captured before the view changes; the
// layer then waits for the case page's hero image ([data-case-hero]) and animates onto it.
type CaseMorphDetail = {
  src: string
  from: { left: number; top: number; width: number; height: number }
  // Where to land: the case page's hero image (opening a case) or the Work deck (coming back).
  target?: "case" | "deck"
}

// The deck's top card inside the Work stage: 92% of the stage width (or 94% of its height), 16:10, centered.
function deckTopCardRect(stage: DOMRect) {
  const w = Math.min(stage.width * 0.92, ((stage.height * 0.94) * 16) / 10)
  const h = (w * 10) / 16
  return { left: stage.left + (stage.width - w) / 2, top: stage.top + (stage.height - h) / 2, width: w, height: h }
}

function startCaseMorph(projectId: string) {
  if (typeof window === "undefined") return
  if (!window.matchMedia("(min-width: 1024px)").matches) return
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  const feat = FEATURED.find((f) => f.projectId === projectId)
  if (!feat) return
  const inView = (r: DOMRect) => r.bottom > 0 && r.top < window.innerHeight && r.width > 0
  let from: CaseMorphDetail["from"] | null = null
  const deck = document.querySelector<HTMLElement>(`[data-deck-target="${projectId}"]`)
  const dr = deck?.getBoundingClientRect()
  if (deck && dr && inView(dr) && deck.style.opacity !== "0") {
    from = deckTopCardRect(dr)
  } else {
    const card = document.querySelector<HTMLElement>(`[data-hero-case="${projectId}"]`)
    const cr = card?.getBoundingClientRect()
    if (card && cr && inView(cr) && card.style.visibility !== "hidden") from = { left: cr.left, top: cr.top, width: cr.width, height: cr.height }
  }
  if (!from) return
  document.documentElement.dataset.morphing = "case"
  window.dispatchEvent(new CustomEvent<CaseMorphDetail>("case-morph", { detail: { src: feat.thumb, from, target: "case" } }))
}

// Coming back from a case page: the case's hero image shrinks back onto the Work deck. Call it with
// the hero image's rect captured before the view changes, after the page has scrolled to the deck.
function canReturnMorph(projectId: string, from: CaseMorphDetail["from"] | null): from is CaseMorphDetail["from"] {
  if (typeof window === "undefined" || !from) return false
  if (!window.matchMedia("(min-width: 1024px)").matches) return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  if (from.top + from.height < 0 || from.top > window.innerHeight) return false
  return FEATURED.some((f) => f.projectId === projectId)
}

function startDeckReturnMorph(projectId: string, from: CaseMorphDetail["from"] | null) {
  if (!canReturnMorph(projectId, from)) return
  const feat = FEATURED.find((f) => f.projectId === projectId)!
  window.dispatchEvent(new CustomEvent<CaseMorphDetail>("case-morph", { detail: { src: feat.thumb, from, target: "deck" } }))
}

function CaseMorphLayer() {
  const [morph, setMorph] = useState<(CaseMorphDetail & { id: number }) | null>(null)
  const [to, setTo] = useState<CaseMorphDetail["from"] | null>(null)
  const [fading, setFading] = useState(false)
  const [correcting, setCorrecting] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const onMorph = (e: Event) => {
      setTo(null)
      setFading(false)
      setCorrecting(false)
      setMorph({ ...(e as CustomEvent<CaseMorphDetail>).detail, id: Date.now() })
    }
    window.addEventListener("case-morph", onMorph)
    return () => window.removeEventListener("case-morph", onMorph)
  }, [])

  const landingEl = () =>
    document.querySelector<HTMLElement>(morph?.target === "deck" ? "[data-deck-target]" : "[data-case-hero]")
  const rectOf = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    return morph?.target === "deck" ? deckTopCardRect(r) : { left: r.left, top: r.top, width: r.width, height: r.height }
  }

  // Wait for the landing spot to be laid out (the case page's hero image, or the Work deck), then fly onto it.
  useEffect(() => {
    if (!morph) return
    let raf = 0, tries = 0
    const find = () => {
      const target = landingEl()
      const r = target?.getBoundingClientRect()
      if (target && r && r.height > 40 && target.offsetParent) {
        target.style.opacity = "0"
        setTo(rectOf(target))
        return
      }
      if (++tries > 90) { delete document.documentElement.dataset.morphing; setMorph(null); return }
      raf = requestAnimationFrame(find)
    }
    raf = requestAnimationFrame(find)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [morph])

  // Landed. If the spot moved while flying (the page was still settling), glide the last bit. Then
  // wait until the page around it is fully shown, and swap to the real image in the same frame, so
  // there is never a moment with two copies on screen. A video target (Telkom) cross-fades instead.
  const land = () => {
    const target = landingEl()
    if (!target) { delete document.documentElement.dataset.morphing; setMorph(null); return }
    const now = rectOf(target)
    if (to && (Math.abs(now.left - to.left) > 1 || Math.abs(now.top - to.top) > 1 || Math.abs(now.width - to.width) > 1)) {
      setCorrecting(true)
      setTo(now)
      return
    }
    let tries = 0
    const swap = () => {
      let el: HTMLElement | null = target.parentElement, settled = true
      while (el && el !== document.body) {
        if (parseFloat(getComputedStyle(el).opacity) < 0.99) { settled = false; break }
        el = el.parentElement
      }
      if (!settled && ++tries < 60) { requestAnimationFrame(swap); return }
      const isVideo = target.tagName === "VIDEO"
      // Same frame: hide the flying copy (unless cross-fading to a video) and reveal the real image.
      if (!isVideo && imgRef.current) imgRef.current.style.visibility = "hidden"
      target.style.opacity = ""
      delete document.documentElement.dataset.morphing
      if (isVideo) setFading(true)
      else setMorph(null)
    }
    swap()
  }

  if (!morph) return null
  return (
    <motion.img
      ref={imgRef}
      key={morph.id}
      src={morph.src}
      alt=""
      aria-hidden="true"
      className="fixed z-[300] object-cover object-top pointer-events-none"
      initial={{ ...morph.from, borderRadius: 12, opacity: 1 }}
      animate={fading ? { opacity: 0 } : to ? { ...to, borderRadius: 16, opacity: 1 } : { ...morph.from, borderRadius: 12, opacity: 1 }}
      transition={fading ? { duration: 0.25 } : { duration: !to ? 0 : correcting ? 0.18 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (fading) { setMorph(null); return }
        if (to) land()
      }}
    />
  )
}

export default function App() {
  return (
    <>
      <AppContent />
      <CaseMorphLayer />
    </>
  )
}

function AppContent() {
  const [currentView, setCurrentView] = useState<"home" | "about" | "sunway-case" | "gegi-case" | "tng-case" | "archery-case" | "election-case" | "anlene-case" | "bijakwang-case" | "myarchery-case" | "backoffice-case" | "telkom-case">("home")
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState<number>(0)
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const activeSection = useScrollSpy(["home", "work", "archive", "process", "contact"])

  // The browser's own back button: leaving a case page for the home page behaves like the case
  // page's Home button (back to the Work section, that case selected, image shrinking onto the deck).
  // Refs keep the listener (attached once) in step with the current view and handler.
  const viewRef = useRef(currentView)
  viewRef.current = currentView
  const backFromCaseRef = useRef<(push?: unknown) => void>(() => {})

  useEffect(() => {
    // The app restores scroll positions itself (for example to the Work section), so the browser must not.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "")
      if (!hash && viewRef.current.endsWith("-case")) {
        backFromCaseRef.current(false)
        return
      }
      if (hash === "about") {
        setCurrentView("about")
      } else if (hash && hash.includes("-case")) {
        setCurrentView(hash as any)
      } else {
        setCurrentView("home")
      }
    }
    handlePopState()
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
      telkom: "telkom-case",
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
      "10": "backoffice-case",
      "11": "anlene-case",
      "12": "archery-case",
      "13": "election-case",
      "14": "myarchery-case",
      "15": "anlene-case",
      "16": "election-case",
      "17": "backoffice-case",
    }

    const targetView = map[strId] || "tng-case"
    setCurrentView(targetView)
    if (typeof window !== "undefined") {
      const nextIdx = (window.history.state?.idx || 0) + 1
      window.history.pushState({ idx: nextIdx }, "", `#${targetView}`)
      window.scrollTo({ top: 0 })
    }
  }

  const handleBackToHome = () => {
    setCurrentView("home")
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", window.location.pathname)
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }
  const handleBackToWork = handleBackToHome

  // Back from a case page lands on the Work section (not the top of the page), with the case just
  // read selected in the deck, and its hero image shrinks back onto the deck.
  // `push` is false when called from the browser's back button, which has already changed the URL.
  const handleBackFromCase = (push: unknown = true) => {
    const id = currentView.replace(/-case$/, "")
    const heroEl = document.querySelector<HTMLElement>("[data-case-hero]")
    const hr = heroEl?.getBoundingClientRect()
    const from = hr ? { left: hr.left, top: hr.top, width: hr.width, height: hr.height } : null
    if (FEATURED_INDEX_MAP[id] !== undefined) setActiveFeaturedIndex(FEATURED_INDEX_MAP[id])
    ;(window as unknown as { __skipWorkReveal?: boolean }).__skipWorkReveal = true
    // Hide the deck before the home view renders its first frame, so it never flashes before the image lands.
    if (canReturnMorph(id, from)) document.documentElement.dataset.morphing = "deck"
    // Render the home view right away, scroll to the deck, and start the morph, all before the next
    // paint, so there is no blank or out-of-place frame in between.
    flushSync(() => setCurrentView("home"))
    if (push !== false) window.history.pushState(null, "", window.location.pathname)
    const deck = document.querySelector<HTMLElement>("[data-deck-target]")
    if (deck && deck.offsetParent) {
      const r = deck.getBoundingClientRect()
      window.scrollTo({ top: window.scrollY + r.top + r.height / 2 - window.innerHeight / 2, behavior: "instant" })
    } else {
      document.getElementById("work")?.scrollIntoView({ behavior: "instant", block: "start" })
    }
    startDeckReturnMorph(id, from)
  }
  backFromCaseRef.current = handleBackFromCase



  if (currentView === "about") {
    return (
      <>
        <AboutMe
          onBack={handleBackToWork}
          onOpenPdfPreview={() => setIsPdfModalOpen(true)}
        />
        <PdfPreviewModal isOpen={isPdfModalOpen} onClose={() => setIsPdfModalOpen(false)} />
      </>
    )
  }


  const CASE_STUDY_SEQUENCE: CaseStudyMeta[] = [
    { id: "backoffice", num: "01", name: "One Base, Many Partners: Reusable White Label Backoffice", client: "Multiple Enterprise Partnerships", thumb: backofficePortalThumb },
    { id: "tng", num: "02", name: "Seamless Micro Insurance & Government Subsidy Integration", client: "Touch 'n Go × GEGM", thumb: coverTng },
    { id: "election", num: "03", name: "38 Province Real Time Election Monitoring", client: "Indonesian Political Party", thumb: aseanThumb },
    { id: "anlene", num: "04", name: "Bone Density & Health Check Passport Redesign", client: "Fonterra × Anlene", thumb: anleneThumb },
    { id: "myarchery", num: "05", name: "MyArchery · Scoring Built From the Scoring Table", client: "PERPANI / MyArchery", thumb: myArcheryPerpaniThumb },
    { id: "bijakwang", num: "06", name: "Kahoot to In House: Roadshow Tournament Platform", client: "mySalam × myKawan", thumb: mySalamThumb },
    { id: "gegi", num: "07", name: "Critical Illness Protection Gap Quiz", client: "GEGI Singapore", thumb: ci1 },
    { id: "archery", num: "08", name: "Pro Archery 4 Surface Digital Ecosystem", client: "Pro Archery Jakarta", thumb: proArcheryThumb },
    { id: "telkom", num: "09", name: "Interactive Public LED Display Ecosystem", client: "Telkomsel Siaga", thumb: telkomCurvedLedDisplay },
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
      "telkom-case": "telkom",
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
        onBackToHome={handleBackFromCase}
      >
        {caseComponent}
      </CaseStudySwipeWrapper>
    )

  }

  if (currentView === "tng-case") {
    return renderCaseStudyView(
      "tng-case",
      <TngCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("election"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("backoffice"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "gegi-case") {
    return renderCaseStudyView(
      "gegi-case",
      <GegiCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("archery"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("bijakwang"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "bijakwang-case") {
    return renderCaseStudyView(
      "bijakwang-case",
      <BijakWangCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("gegi"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("myarchery"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "election-case") {
    return renderCaseStudyView(
      "election-case",
      <ElectionCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("anlene"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("tng"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "backoffice-case") {
    return renderCaseStudyView(
      "backoffice-case",
      <BackofficeCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("tng"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("telkom"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "anlene-case") {
    return renderCaseStudyView(
      "anlene-case",
      <AnleneCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("myarchery"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("election"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "archery-case") {
    return renderCaseStudyView(
      "archery-case",
      <ProArcheryCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("telkom"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("gegi"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "myarchery-case") {
    return renderCaseStudyView(
      "myarchery-case",
      <MyArcheryCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("bijakwang"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("anlene"); window.scrollTo({ top: 0 }) }}
      />
    )
  }
  if (currentView === "telkom-case") {
    return renderCaseStudyView(
      "telkom-case",
      <TelkomCase
        onBack={handleBackFromCase}
        onNext={() => { handleOpenProject("backoffice"); window.scrollTo({ top: 0 }) }}
        onPrev={() => { handleOpenProject("archery"); window.scrollTo({ top: 0 }) }}
      />
    )
  }



  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: S }}>
      <HeroSection
        onReadMore={handleOpenAbout}
        onOpenPdfPreview={() => setIsPdfModalOpen(true)}
        onOpenProject={(id: string) => { startCaseMorph(String(id).toLowerCase()); handleOpenProject(id) }}
      />
      <HeroDeckFlight />

      <FeaturedWorkSection
        activeIndex={activeFeaturedIndex}
        onActiveIndexChange={setActiveFeaturedIndex}
        onOpenProject={(id: string) => { startCaseMorph(String(id).toLowerCase()); handleOpenProject(id) }}
      />
      {/* All the work together first (main cases, then the catalog), then how I work. */}
      <ProjectArchiveSection />
      {/* Breadth in keywords (industries, expertise, tools), between the catalog and the process */}
      <HeroFactsStrip />
      <WorkflowSection />
      <ContactSection onOpenPdfPreview={() => setIsPdfModalOpen(true)} />
      <Footer />
      <FloatingDock activeSection={activeSection} />
      <PdfPreviewModal isOpen={isPdfModalOpen} onClose={() => setIsPdfModalOpen(false)} />
    </div>
  )
}
