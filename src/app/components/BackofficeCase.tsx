import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, Shield, Zap, RefreshCw, Users, MessageSquare,
  Lock, Sliders, Database, Layers, ArrowRight, Activity, Filter, BarChart3, ChevronDown, Sparkles
} from "lucide-react"

import heroImg from "@/imports/image-8.png"
import backofficePortalThumb from "@/imports/backoffice portal thumb.jpg"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"

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

function Hairline() {
  return <div className="w-full h-px" style={{ backgroundColor: HAIR }} />
}

function SectionTag({ id, num, label }: { id?: string; num: string; label: string }) {
  return (
    <div id={id} className="mb-10 pt-4 scroll-mt-24">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-[#DB3E8C]">
        SECTION {num}
      </div>
      <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#19244E]">
        {label}
      </h2>
      <div className="w-12 h-[2px] mt-4 bg-[#DB3E8C]" />
    </div>
  )
}

// ── Interactive Multi-Tenant Token & Query Filter Sandbox ────────────────────
function MultiTenantTokenSandbox() {
  const [tenant, setTenant] = useState<"mobility" | "insurance" | "commerce">("mobility")
  const [filterMode, setFilterMode] = useState<"global" | "isolated">("isolated")

  const tenants = {
    mobility: {
      name: "Mobility & Delivery Co.",
      accent: "#10B981", // Emerald
      badge: "Logistics Tenant",
      termUser: "Riders & Packages",
      termMetric: "Transit Delay %",
      metricVal: "99.4% On Time",
      queryImpact: "Indexed Driver Trips Query",
    },
    insurance: {
      name: "Regional InsurTech Co.",
      accent: "#EF4444", // Crimson
      badge: "InsurTech Tenant",
      termUser: "Policyholders",
      termMetric: "Funnel Conversion",
      metricVal: "42.8% Conversion",
      queryImpact: "Scoped Premium Ledger Query",
    },
    commerce: {
      name: "Commerce Affiliate Network",
      accent: "#3B82F6", // Cobalt
      badge: "B2B Commerce Tenant",
      termUser: "Affiliate Partners",
      termMetric: "Commission Payouts",
      metricVal: "$124,500 Disbursed",
      queryImpact: "Isolated Tier Commission Query",
    },
  }

  const active = tenants[tenant]

  return (
    <div className="my-10 p-6 rounded-2xl bg-[#0f1738] border border-white/10 text-white shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={14} className="text-[#DB3E8C]" />
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
              INTERACTIVE DEMO // MULTI TENANT TOKEN & QUERY SANDBOX
            </span>
          </div>
          <h3 className="font-display text-lg lg:text-xl font-bold mt-1 text-white">
            Semantic Token Swapping & Isolated Date Filter Engine
          </h3>
        </div>

        {/* Tenant Selector */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
          {(["mobility", "insurance", "commerce"] as const).map((tKey) => (
            <button
              key={tKey}
              onClick={() => setTenant(tKey)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                tenant === tKey ? "bg-[#DB3E8C] text-white shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              {tKey}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Display */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Token Swapper Output */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">1. SEMANTIC TOKEN SWAPPER</span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
              style={{ backgroundColor: `${active.accent}20`, color: active.accent }}
            >
              {active.badge}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Tenant Entity Identity</span>
              <span className="text-sm font-bold text-white">{active.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[9px] text-gray-400 uppercase block font-mono">User Taxonomy Token</span>
                <span className="text-xs font-bold text-[#DB3E8C] mt-0.5 block">{active.termUser}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[9px] text-gray-400 uppercase block font-mono">KPI Metric Token</span>
                <span className="text-xs font-bold text-[#22c55e] mt-0.5 block">{active.metricVal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Query & Filter Constraint */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">2. COMPOSABLE FILTER ENGINE</span>
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-md text-[10px] font-mono">
              <button
                onClick={() => setFilterMode("global")}
                className={`px-2 py-0.5 rounded cursor-pointer ${filterMode === "global" ? "bg-red-500/30 text-red-300 font-bold" : "text-gray-400"}`}
              >
                Global Heavy
              </button>
              <button
                onClick={() => setFilterMode("isolated")}
                className={`px-2 py-0.5 rounded cursor-pointer ${filterMode === "isolated" ? "bg-emerald-500/30 text-emerald-300 font-bold" : "text-gray-400"}`}
              >
                Scoped Isolated
              </button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/50 font-mono text-[11px] space-y-2 border border-white/10">
            <div className="flex items-center justify-between text-gray-400">
              <span>SQL Execution Preview:</span>
              <span className={filterMode === "isolated" ? "text-emerald-400" : "text-red-400"}>
                {filterMode === "isolated" ? "Fast (<180ms)" : "Timeout Risk (>4.2s)"}
              </span>
            </div>
            <p className="text-gray-300 leading-snug">
              <span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> {tenant}_ledger
              <br />
              <span className="text-purple-400">WHERE</span> tenant_id = <span className="text-amber-300">"{tenant}_prod_01"</span>
              {filterMode === "isolated" ? (
                <>
                  <br />
                  <span className="text-emerald-400">  AND event_date BETWEEN :start AND :end</span>
                  <br />
                  <span className="text-emerald-400 font-bold">  LIMIT 500; -- Indexed Date Filter</span>
                </>
              ) : (
                <>
                  <br />
                  <span className="text-red-400">  -- Unbounded global scan across all history</span>
                </>
              )}
            </p>
          </div>

          <div className="text-[10px] text-gray-400 flex items-center gap-2">
            <Filter size={12} className="text-[#DB3E8C]" />
            <span>Targeting query: <strong className="text-white">{active.queryImpact}</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

const QUICK_SECTIONS = [
  { id: "summary", num: "01", label: "The Pattern I Noticed" },
  { id: "different", num: "02", label: "Why Every Tenant Was Different" },
  { id: "twotracks", num: "03", label: "Splitting the Work Into Two Tracks" },
  { id: "datefilter", num: "04", label: "A Concrete Example: The Date Filter Problem" },
  { id: "impact", num: "05", label: "What This Actually Solved" },
]

export default function BackofficeCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("summary")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ScrollSpy for Quick Jump active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveQuickId(entry.target.id)
          }
        })
      },
      { rootMargin: "-25% 0px -55% 0px" }
    )

    QUICK_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
    }
  }

  const activeSectionObj = QUICK_SECTIONS.find((s) => s.id === activeQuickId) || QUICK_SECTIONS[0]

  return (
    <div className="min-h-screen scroll-smooth" style={{ backgroundColor: S, fontFamily: "var(--font-sans)" }}>

      {/* Sticky top header & mobile quick jump stack */}
      <div className="sticky top-0 z-50 w-full">
        {/* White top nav */}
        <div
          className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-3 sm:py-3.5 transition-all duration-200"
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : W,
            backdropFilter: "blur(16px)",
            borderBottom: `1px solid ${HAIR}`,
          }}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              onBack()
            }}
            className="flex items-center gap-1.5 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-150 hover:opacity-75 cursor-pointer group"
            style={{ color: N }}
            title="Back to Home Portfolio"
          >
            <Home size={16} className="group-hover:scale-110 transition-transform" />
            <span>HOME</span>
          </a>

          <CaseStudyHeaderBadge caseNum="05" />
        </div>

        {/* Mobile Collapsible Quick Jump Bar - Flush underneath */}
        <div className="block lg:hidden bg-[#0e1635] text-white border-b border-white/10 shadow-lg">


        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="w-full px-6 py-3 flex items-center justify-between text-xs font-sans cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse shrink-0" />
            <span className="font-bold text-[#DB3E8C] uppercase tracking-wider shrink-0">QUICK JUMP:</span>
            <span className="font-semibold text-white/90 truncate">
              {activeSectionObj.num}. {activeSectionObj.label}
            </span>
          </div>
          <ChevronDown
            size={14}
            className={`text-white/70 transition-transform duration-200 shrink-0 ml-2 ${mobileMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Expanded Vertical Menu for Mobile */}
        {mobileMenuOpen && (
          <div className="px-6 py-3 bg-[#080d21] border-t border-white/10 space-y-1 max-h-[60vh] overflow-y-auto">
            {QUICK_SECTIONS.map((sec) => {
              const isActive = activeQuickId === sec.id
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => scrollToSection(e, sec.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#DB3E8C] text-white font-bold"
                      : "text-white/75 hover:bg-white/10 hover:text-white font-medium"
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? "text-white" : "text-[#DB3E8C]"}`}>
                    {sec.num}
                  </span>
                  <span>{sec.label}</span>
                </a>
              )
            })}
          </div>
        )}
      </div>
      </div>


      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <MonoTag accent>CASE STUDY 05</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>WHITE LABEL & ANALYTICS ARCHITECTURE</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>MULTIPLE ENTERPRISE PARTNERSHIPS · 2024 to 2025</MonoTag>
            </div>

            <h1
              className="font-display font-bold leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", color: N }}
            >
              Multi Tenant Backoffice Architecture: A Reusable Pattern Across White Label Partners
            </h1>

            <p
              className="font-display font-light leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              Building one scalable white label and analytics pattern to serve tenants with fundamentally different operational needs.
            </p>

            {/* Confidentiality Notice */}
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
              <Lock size={15} className="shrink-0 mt-0.5 text-amber-700" />
              <div>
                <strong className="font-bold text-amber-950 block">Confidentiality Note:</strong>
                Client names, logos, and specific metrics have been sanitized to respect NDAs. What is shown here reflects the real process, not real production data.
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={backofficePortalThumb}
              alt="Backoffice Architecture Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS */}
      <div className="px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Supporting multiple enterprise partners simultaneously, each with different data structures, without a reusable design system to fall back on.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Solo designer across several tenants at once; enterprise stakeholders requesting complex multi variable charts risking backend query strain.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Solo Designer: architected reusable two track delivery model, negotiated chart level data filtering directly with backend engineers.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Established a design pattern reused across multiple enterprise partnerships, reducing engineering's dependency on design for standard deployments.</p>
          </div>
        </div>
      </div>

      {/* ── MAIN BODY WITH STICKY LEFT SIDEBAR TOC (DESKTOP) ──────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-16 items-start">

          {/* Left Column: Sticky Desktop Table of Contents (TOC) Sidebar */}
          <aside className="hidden lg:block sticky top-24 space-y-6 self-start pr-4">
            <div className="p-5 rounded-2xl bg-[#0e1635] text-white shadow-xl border border-white/10">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  QUICK JUMP
                </span>
              </div>
              <nav className="space-y-1.5" aria-label="Table of Contents">
                {QUICK_SECTIONS.map((sec) => {
                  const isActive = activeQuickId === sec.id
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`group flex items-start gap-2.5 p-2 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-[#DB3E8C] text-white font-bold shadow-md"
                          : "text-white/65 hover:bg-white/10 hover:text-white font-medium"
                      }`}
                    >
                      <span className={`font-mono text-[10px] shrink-0 pt-0.5 ${isActive ? "text-white" : "text-[#DB3E8C]"}`}>
                        {sec.num}
                      </span>
                      <span className="leading-snug">{sec.label}</span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: Case Study Main Content Sections */}
          <div className="space-y-16 lg:space-y-20 min-w-0">

        {/* 01 The Pattern I Noticed */}
        <div>
          <SectionTag id="summary" num="01" label="The Pattern I Noticed" />
          
          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              After a series of successive insurance and affiliate integration projects, each requiring its own admin portal, partner portal, and insurance portal, I began noticing the same underlying shape appearing repeatedly. The data structures differed from tenant to tenant, but the fundamental needs did not. Rather than redesigning from scratch with each new project, I developed an approach that could be carried across engagements.
            </p>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-white border border-[#10B981]/40 rounded-xl space-y-3 shadow-xs">
                <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">TRACK A</span>
                <h4 className="font-bold text-lg text-[#19244E]">Rapid Skinning</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Semantic token swapping and taxonomy alignment allowed engineering to deploy standard white label backoffices independently, without waiting on design.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#3B82F6]/40 rounded-xl space-y-3 shadow-xs">
                <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider block">TRACK B</span>
                <h4 className="font-bold text-lg text-[#19244E]">Case by Case Data Architecture</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Track B is not a fixed template. Its scope varies by tenant: some partners required only an additional filter, while others needed restructured charts entirely because their underlying data source differed. Each case meant returning to backend engineering to work through the requirements together.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 02 Why Every Tenant Was Different */}
        <div>
          <SectionTag id="different" num="02" label="Why Every Tenant Was Different" />
          
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-6" style={{ lineHeight: 1.8 }}>
            As the sole product designer on a lean team, I supported multiple enterprise partners simultaneously, without the overhead of heavy design ops tooling.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-2">
              <h4 className="font-bold text-[#19244E] text-base">Mobility & Delivery Ecosystem</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                High volume claim lifecycle tracking, delay reason breakdowns, turnaround time metrics.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-2">
              <h4 className="font-bold text-[#19244E] text-base">Regional InsurTech Ecosystem</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Policy conversion funnels, product performance tracking across channels, agent contribution breakdowns.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-2">
              <h4 className="font-bold text-[#19244E] text-base">Affiliate & Commerce Networks</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Partner tiering, commission reconciliation, referral trees, payout validation.
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#19244E] text-white rounded-xl flex items-start gap-4 shadow-md">
            <Database size={20} className="text-[#DB3E8C] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Heavy Aggregation vs. Database Constraints</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Enterprise stakeholders frequently requested complex, multi variable dashboard charts. Designing these without technical alignment risked slow queries and costly rework further down the line, a pressure that ultimately shaped the two track approach below.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 03 Splitting the Work Into Two Tracks */}
        <div>
          <SectionTag id="twotracks" num="03" label="Splitting the Work Into Two Tracks" />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-white border border-[#10B981]/40 rounded-xl space-y-3">
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">TRACK A</span>
              <p className="text-sm font-semibold text-[#19244E]">
                Rapid white label skinning · semantic token swapping · domain taxonomy alignment · direct to dev baseline handoff.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#3B82F6]/40 rounded-xl space-y-3">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider block">TRACK B</span>
              <p className="text-sm font-semibold text-[#19244E]">
                Deep architectural exploration, scope varies per tenant · metric and funnel discovery · filter scope negotiated with backend · query feasibility checks before implementation.
              </p>
            </div>
          </div>

          {/* Interactive Token & Filter Sandbox */}
          <MultiTenantTokenSandbox />
        </div>

        <Hairline />

        {/* 04 A Concrete Example: The Date Filter Problem */}
        <div>
          <SectionTag id="datefilter" num="04" label="A Concrete Example: The Date Filter Problem" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              One dashboard's Product Sales Performance chart needed to show policy volume trends per product across months or years. If it inherited the dashboard's global date range filter, typically set to a short window for daily or weekly transaction monitoring, the product trend view would become too fragmented to be useful.
            </p>
            <p>
              I proposed excluding this chart from the global filter and giving it an independent control instead: a Monthly or Yearly toggle, defaulting to Monthly. Before implementation, I confirmed feasibility with the backend engineer, since a per product monthly breakdown requires a different aggregation than a standard date range query, and separately researched the chart type best suited to the data, landing on a grouped bar chart with one series per product.
            </p>
            <p className="text-xs text-gray-500 italic bg-gray-100 p-3 rounded-lg border border-gray-200">
              Note on the interactive demo above (semantic token swapper / SQL query preview): the sample query and schema shown are an illustrative example built to demonstrate the isolated filtering concept, not a reproduction of an actual backend schema.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 05 What This Actually Solved */}
        <div>
          <SectionTag id="impact" num="05" label="What This Actually Solved" />

          <div className="space-y-6">
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
              By separating rapid white label skinning from case by case data architecture work, engineering squads could ship partner portal baselines independently, while chart level query design was resolved directly with backend engineers on a case by case basis.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="font-bold text-[#DB3E8C] text-sm block">Reusable Two Track Model</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Structured separation between skinning and deep data architecture, applied across multiple tenant partnerships.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="font-bold text-[#10B981] text-sm block">Engineering Autonomy</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Track A's clear structural logic let dev squads deploy baseline portals without design bottlenecking.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="font-bold text-[#3B82F6] text-sm block">Backend Aligned Filtering</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Chart level date filtering decisions, like the case above, were negotiated with backend engineers before implementation, rather than assumed.
                </p>
              </div>
            </div>

            {/* WHAT I LEARNED Box */}
            <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-[#19244E]">
                <Sparkles size={16} className="text-[#DB3E8C]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                "Working across tenants with genuinely different needs taught me that reusability is not about forcing every project into the same template. It is about correctly identifying which parts of the work actually repeat, and which parts need to be renegotiated every time."
              </p>
            </div>

            {/* WHY THIS MATTERS TO A HIRING MANAGER */}
            <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-4 shadow-2xl mt-6">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-[#DB3E8C]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHY THIS MATTERS TO A HIRING MANAGER
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                "This shows my ability to recognize a repeating pattern across multiple client engagements and turn it into a reusable design approach, rather than solving the same problem from scratch each time. It also reflects how I work with backend engineers on technical trade offs, not just visual design."
              </p>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

    </div>
  )
}

