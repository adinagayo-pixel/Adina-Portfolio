import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, Shield, Zap, RefreshCw, Users, MessageSquare,
  Trophy, Smartphone, Target, QrCode, Sun, WifiOff, Calendar, AlertTriangle, Clock
} from "lucide-react"

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

// ── Interactive Archery Scoring Keypad Component ─────────────────────────────
function TargetScoringKeypad() {
  const [scores, setScores] = useState<string[]>([])

  const addScore = (val: string) => {
    if (scores.length < 6) {
      setScores([...scores, val])
    }
  }

  const resetScores = () => setScores([])

  const calculateTotal = () => {
    return scores.reduce((sum, s) => {
      if (s === "X" || s === "10") return sum + 10
      if (s === "M") return sum + 0
      return sum + (parseInt(s, 10) || 0)
    }, 0)
  }

  const countTens = () => scores.filter((s) => s === "X" || s === "10").length

  return (
    <div className="my-10 p-6 rounded-2xl bg-[#0f1738] border border-white/10 text-white shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Target size={14} className="text-[#DB3E8C]" />
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
              INTERACTIVE DEMO // FIELD SCORING KEYPAD
            </span>
          </div>
          <h3 className="font-display text-lg lg:text-xl font-bold mt-1 text-white">
            High-Velocity Outdoor Target Scoring Interface
          </h3>
        </div>
        <button
          onClick={resetScores}
          className="px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer"
        >
          Reset End (6 Arrows)
        </button>
      </div>

      {/* Target Keypad Buttons */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {[
          { label: "X", val: "X", bg: "bg-[#EAB308] text-black font-extrabold" },
          { label: "10", val: "10", bg: "bg-[#FACC15] text-black font-bold" },
          { label: "9", val: "9", bg: "bg-[#FEF08A] text-black font-bold" },
          { label: "8", val: "8", bg: "bg-[#EF4444] text-white font-bold" },
          { label: "7", val: "7", bg: "bg-[#F87171] text-white font-bold" },
          { label: "6", val: "6", bg: "bg-[#3B82F6] text-white font-bold" },
          { label: "5", val: "5", bg: "bg-[#60A5FA] text-white font-bold" },
          { label: "4", val: "4", bg: "bg-[#1E293B] text-white font-bold border border-white/20" },
          { label: "3", val: "3", bg: "bg-[#334155] text-white font-bold border border-white/20" },
          { label: "2", val: "2", bg: "bg-white text-black font-bold" },
          { label: "1", val: "1", bg: "bg-gray-200 text-black font-bold" },
          { label: "M", val: "M", bg: "bg-gray-800 text-red-400 font-bold border border-red-500/30" },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => addScore(btn.val)}
            disabled={scores.length >= 6}
            className={`h-12 rounded-lg text-sm transition-all duration-150 active:scale-95 shadow-md flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${btn.bg}`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Live Scoresheet Output Bar */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="font-sans text-[10px] text-white/50 uppercase tracking-widest mr-2">
            Arrow Scores:
          </span>
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className="w-9 h-9 rounded-lg border border-white/15 bg-[#19244E] flex items-center justify-center font-display font-bold text-sm text-white"
            >
              {scores[idx] || "-"}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest">
              10s / Xs
            </span>
            <span className="font-display font-bold text-base text-[#DB3E8C]">
              {countTens()}
            </span>
          </div>
          <div className="text-right pl-6 border-l border-white/10">
            <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest">
              End Total
            </span>
            <span className="font-display font-bold text-xl text-[#22c55e]">
              {calculateTotal()} <span className="text-xs text-white/40 font-normal">/ 60</span>
            </span>
          </div>
        </div>
      </div>
      <p className="font-sans text-[10px] text-white/50 text-center italic">
        * Designed with high-contrast target ring colors for maximum outdoor visibility under direct sunlight.
      </p>
    </div>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function MyArcheryCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: S, fontFamily: "var(--font-sans)" }}>

      {/* Sticky Top Bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-4 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : W,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${HAIR}`,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: N }}
        >
          <ArrowLeft size={12} /> Back to Portfolio
        </button>
        <MonoTag>MyArchery · PERPANI National Operating System</MonoTag>
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="sticky top-[53px] z-40 px-8 lg:px-16 py-2.5 bg-[#0e1635] text-white/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-sans">
        <span className="font-bold tracking-widest text-[#DB3E8C] uppercase text-xs">
          QUICK JUMP
        </span>
        <div className="flex items-center gap-6 overflow-x-auto">
          <a href="#summary" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-medium">
            01. Executive Overview
          </a>
          <a href="#challenge" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-medium">
            02. Core Challenge
          </a>
          <a href="#matrix" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-medium">
            03. Feature Matrix
          </a>
          <a href="#impact" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-bold text-[#DB3E8C]">
            04. Impact & "So What" ↗
          </a>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 08</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>SPORTS TECH & FIELD RESEARCH</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>PERPANI / MYARCHERY · 2023</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            National Archery Operating System & Tournament Platform
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Designing Indonesia's centralized tournament operating system & real-time scoring platform for official PERPANI national championships.
          </p>

          <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: BODY, lineHeight: 1.8 }}>
            A comprehensive sports tech platform that digitized 100% of manual paper scoring workflows, managed athlete registrations, and provided real-time field keypad scoring for national archers.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-sm">
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Lead UX Researcher & Product Designer
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Organization
            </span>
            <span className="font-semibold text-[#19244E]">
              PERPANI / MyArchery Indonesia
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Lifecycle & Scale
            </span>
            <span className="font-semibold text-[#19244E]">
              2 Years · 7+ Public Releases
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Field Automation
            </span>
            <span className="font-semibold text-[#19244E]">
              100% Manual Flow Automation
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="px-8 lg:px-16 py-16 max-w-6xl mx-auto space-y-20">

        {/* 01 Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Overview & Impact Snapshot" />
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-2xl font-bold text-[#22c55e] block font-display">100%</span>
              <h4 className="font-semibold text-[#19244E] text-sm">Manual Flow Automation</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Eliminated manual Google Form signups and bank transfer WhatsApp checks with integrated athlete registration & payment gateways.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-2xl font-bold text-[#DB3E8C] block font-display">3-Person Team</span>
              <h4 className="font-semibold text-[#19244E] text-sm">WFA Standup Leadership</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Led daily stand-up meetings and hands-on field testing during remote (WFA) team execution across a 3-designer team.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-2xl font-bold text-[#19244E] block font-display">7+ Public</span>
              <h4 className="font-semibold text-[#19244E] text-sm">Release Iterations</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Shipped live field iterations from local Jakarta trials to Sumbawa Barat & Purwakarta Open national championships.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 02 The Problem */}
        <div>
          <SectionTag id="problem" num="02" label="The Problem: High-Stakes Chaos of Archery Tournaments" />
          <p className="font-display font-light leading-relaxed mb-10 text-xl text-[#19244E]">
            Before MyArchery, over 80% of tournament operations in Indonesia were managed manually across fragmented tools, creating high administrative burnout and scoring delays.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Users,
                title: "Administrative Overload",
                desc: "Tournament committees spent days manually processing Google Form entries, verifying bank transfers over WhatsApp, and typing athlete rosters into spreadsheets.",
              },
              {
                Icon: FileCode2,
                title: "Scoring Friction & Legacy Ianseo Dependency",
                desc: "Committees relied on Ianseo—a complex desktop legacy software requiring specialized technical training that was highly prone to human input errors under field pressure.",
              },
              {
                Icon: Clock,
                title: "Delayed Elimination Standings",
                desc: "Qualification brackets and live standings suffered long delays because officials had to wait for physical paper scoresheets to be manually collected, audited, and re-entered.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#DB3E8C]/10 border border-[#DB3E8C]/20 flex items-center justify-center text-[#DB3E8C]">
                  <Icon size={18} />
                </div>
                <h4 className="font-bold text-[#19244E] text-base">{title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 03 Field Discovery */}
        <div>
          <SectionTag id="field" num="03" label="Field Discovery: Contextual Inquiry Under the Sun" />
          <p className="font-display font-light leading-relaxed mb-8 text-xl text-[#19244E]">
            Rather than designing from behind a comfortable office desk, our design team conducted contextual inquiries and live usability testing directly inside judges' tents at official tournaments.
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-[#111836] text-white rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#EAB308]">
                <Sun size={18} />
                <span className="text-xs font-bold tracking-widest uppercase">ENVIRONMENTAL CONSTRAINTS</span>
              </div>
              <h4 className="text-lg font-bold text-white">Direct Outdoor Heat & Sunlight Glare</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Field judges and scorekeepers operate under blazing outdoor sunlight with direct screen glare, spotty field Wi-Fi/cellular connectivity, and severe time pressure between scoring ends.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-white/60">
                <span className="flex items-center gap-1"><Sun size={12} className="text-[#EAB308]" /> High Screen Contrast</span>
                <span className="flex items-center gap-1"><WifiOff size={12} className="text-red-400" /> Offline Draft State</span>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#DB3E8C]">
                <QrCode size={18} />
                <span className="text-xs font-bold tracking-widest uppercase text-[#DB3E8C]">PHYSICAL-TO-DIGITAL TRANSITION</span>
              </div>
              <h4 className="text-lg font-bold text-[#19244E]">Legal Scoresheet Auditability</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Physical paper scoresheets remain the legal audit standard in official PERPANI regulations. Our digital flow had to seamlessly complement paper score verification with instant QR Code target board validation.
              </p>
              <div className="pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><QrCode size={12} className="text-[#DB3E8C]" /> QR Target Scan</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#22c55e]" /> Official Signature Sync</span>
              </div>
            </div>
          </div>

          {/* Key Field Notes Card */}
          <div className="p-6 bg-[#F9FAFB] border border-gray-200 rounded-xl space-y-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#DB3E8C]">
              RESEARCH DISCOVERY INSIGHT // FIELD TRIAL LOCATIONS
            </span>
            <p className="text-xs text-[#19244E] font-medium leading-relaxed">
              Field observations were conducted live during <strong className="text-[#DB3E8C]">The HUB Scoring Games 2021 (Cibubur)</strong> and <strong className="text-[#DB3E8C]">Jakarta Open 2022</strong>, directly informing the design of the high-contrast outdoor scoring keypad.
            </p>
          </div>

          {/* Interactive Demo Keypad */}
          <TargetScoringKeypad />
        </div>

        <Hairline />

        {/* 04 Architecture */}
        <div>
          <SectionTag id="architecture" num="04" label="System Architecture: End-to-End Tournament Lifecycle" />
          <p className="font-display font-light leading-relaxed mb-10 text-xl text-[#19244E]">
            We architected a modular platform based on Feature-Driven Development (FDD) spanning all 3 stages of a sports tournament lifecycle.
          </p>

          <div className="space-y-6">
            {[
              {
                phase: "01. PRE-EVENT (Setup & Monetization)",
                title: "Athlete Self-Registration & Target Allocation",
                color: "#DB3E8C",
                items: [
                  { t: "Automated Payment Gateway Integration", d: "Self-service registration portal with instant payment processing, eliminating manual bank transfer checks via WhatsApp." },
                  { t: "Category Rules & Target Board Engine", d: "Automated configuration dashboard for Barebow, Compound, Recurve, and National categories with auto-target allocation." },
                ]
              },
              {
                phase: "02. ON-EVENT (High-Velocity Scoring)",
                title: "Ergonomic Mobile Keypad & Real-Time Brackets",
                color: "#3B82F6",
                items: [
                  { t: "Target-Colored Mobile Keypad", d: "Ergonomic color-coded keypad (Yellow X-10-9, Red 8-7, Blue 6-5, Black 4-3, White 2-1) designed for touch accuracy in outdoor conditions." },
                  { t: "Instant Elimination Bracket Engine", d: "Real-time calculation of qualification rounds and instant bracket seeding without waiting for manual paper tabulation." },
                ]
              },
              {
                phase: "03. POST-EVENT (Data & Governance)",
                title: "Public Live Scoreboards & Financial Reconciliation",
                color: "#22c55e",
                items: [
                  { t: "Public Live Standings & E-Certificates", d: "Real-time public scoreboard view for spectators and automated e-certificate generation for all participants." },
                  { t: "Financial Reconciliation Dashboard", d: "Automated revenue audit and financial summary reports for tournament organizing committees." },
                ]
              },
            ].map((p) => (
              <div key={p.phase} className="p-6 bg-white border border-gray-200 rounded-xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: p.color }}>
                    {p.phase}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[#19244E]">{p.title}</h4>
                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  {p.items.map((it) => (
                    <div key={it.t} className="p-4 bg-[#F9FAFB] rounded-lg border border-gray-100 space-y-1">
                      <span className="block font-bold text-xs text-[#19244E]">{it.t}</span>
                      <p className="text-xs text-gray-600 leading-relaxed">{it.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 05 Iterative Deployment */}
        <div>
          <SectionTag id="deployment" num="05" label="Iterative Deployment: 7+ Release Public Lifecycle" />
          <p className="font-display font-light leading-relaxed mb-8 text-xl text-[#19244E]">
            MyArchery was not delivered as a static desktop prototype; it was iteratively tested and deployed across 7+ live public tournament releases over 2 years.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-gray-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-[#DB3E8C]">OCT 2021 // ALPHA</span>
              <h5 className="font-bold text-[#19244E] text-sm">The HUB Cibubur Trials</h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                Initial field validation of the mobile scoring keypad and basic end calculation logic under live outdoor match conditions.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-[#3B82F6]">JUL – NOV 2022 // V2.0–V2.2</span>
              <h5 className="font-bold text-[#19244E] text-sm">Jakarta Series & Pangkoarmada</h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                Multi-category scaling (Recurve, Compound, Barebow) across high-volume regional championships with QR target scanning.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-[#22c55e]">DEC 2022 // V2.3–V2.4</span>
              <h5 className="font-bold text-[#19244E] text-sm">Sumbawa & Purwakarta Open</h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                National tournament expansion supporting multi-stage elimination brackets and automated financial reconciliation.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 06 Impact & The So What */}
        <div>
          <SectionTag id="impact" num="06" label="Key Impact & The 'So What'" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                NATIONAL SPORTS TECH IMPACT & "SO WHAT"
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Unified Indonesia's archery ecosystem with a <span className="font-bold text-[#DB3E8C]">7+ release operating system</span>.
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-2xl">
              By replacing paper re-entry and legacy desktop software with mobile outdoor scoring keypads and instant bracket engines, MyArchery became the official digital infrastructure for PERPANI tournaments nationwide.
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-[#22c55e] mb-1">2 Years Lifecycle</span>
                <p className="text-white/60">Multi-release product evolution from August 2021 to April 2023.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">7+ Live Releases</span>
                <p className="text-white/60">Tested and validated across major national archery championships.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-xl text-[#DB3E8C] mb-1">100% Digital Flow</span>
                <p className="text-white/80 font-medium">Replaced Ianseo desktop legacy dependency across official events.</p>
              </div>
            </div>

            {/* Why This Matters to a Hiring Manager */}
            <div className="mt-6 p-5 rounded-xl bg-[#DB3E8C]/15 border border-[#DB3E8C]/40 text-white space-y-2">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[#DB3E8C]" />
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHY THIS MATTERS TO A HIRING MANAGER
                </span>
              </div>
              <p className="text-xs font-sans leading-relaxed text-white/90 italic">
                "This project highlights my initiative to step up and lead team syncs under remote WFA conditions. Operating in a 3-designer team with senior peers, I stepped up as the hands-on lead, facilitated daily standup meetings, conducted grounded field research under direct sunlight, and delivered resilient multi-surface software across 7+ live releases. If you need a proactive designer who naturally takes ownership and drives team alignment, this is what that looks like."
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Back CTA Bar */}
      <div style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: W }}>
        <div className="px-8 lg:px-16 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            {onPrev && (
              <button
                onClick={onPrev}
                className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
                style={{ color: N }}
              >
                <ArrowLeft size={12} /> Previous Case
              </button>
            )}
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
              style={{ color: N }}
            >
              Back to Portfolio
            </button>
          </div>
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
              style={{ color: N }}
            >
              Next Case <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
