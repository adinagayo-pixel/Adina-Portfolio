import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  Smartphone, BarChart2, Camera, MessageSquare,
  Shield, Database, MapPin, AlertCircle, Users, WifiOff, RefreshCw, Layers, CheckSquare, ChevronDown
} from "lucide-react"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"
const GOV = "#0F3460" // Deeper civic navy accent

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

function Hairline() {
  return <div className="w-full h-px" style={{ backgroundColor: HAIR }} />
}

function SectionTag({ id, num, label }: { id?: string; num: string; label: string }) {
  return (
    <div id={id} className="mb-10 pt-4 scroll-mt-24">
      <div className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#DB3E8C]">
        SECTION {num}
      </div>
      <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#19244E]">
        {label}
      </h2>
      <div className="w-12 h-[2px] mt-4 bg-[#DB3E8C]" />
    </div>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

const QUICK_SECTIONS = [
  { id: "summary", num: "01", label: "Executive Overview" },
  { id: "challenge", num: "02", label: "The Strategic Challenge" },
  { id: "pilar1", num: "03", label: "Pilar 1 — AI + Human Hybrid Verification" },
  { id: "pilar2", num: "04", label: "Pilar 2 — Offline-First Mode & Sync" },
  { id: "pilar3", num: "05", label: "Pilar 3 — Sainte-Laguë Table & Alerts" },
  { id: "supporting", num: "06", label: "Supporting Systems" },
  { id: "process", num: "07", label: "Design Process & Pipeline" },
  { id: "impact-business", num: "08", label: "Business Impact & Deliverables" },
  { id: "impact", num: "09", label: 'Key Impact & "So What"' },
]

export default function ElectionCase({ onBack, onNext, onPrev }: Props) {
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

      {/* Sticky top nav */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : W,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${HAIR}`,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: N }}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <MonoTag>Indonesian Election 2024 · 38 Provinces / 820K+ Polling Stations</MonoTag>
      </div>

      {/* Mobile Collapsible Quick Jump Bar */}
      <div className="block lg:hidden sticky top-[53px] z-40 bg-[#0e1635] text-white border-b border-white/10 shadow-lg">
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
                      ? "bg-[#DB3E8C] text-[#DB3E8C]"
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

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 06</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>NATIONAL ELECTION MONITORING SYSTEM</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>INDONESIA · 2024</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
          >
            Designing for the Unpredictable: Election Monitoring System for 38 Provinces
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            A multi-platform system for real-time vote monitoring, built to hold up under the exact conditions a national election guarantees: unreliable signal, tight time windows, and data that has to be right the first time.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-12 mt-12 border-t border-gray-100 text-sm">
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Solo UX/UI Designer & Systems Architect
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Territory
            </span>
            <span className="font-semibold text-[#19244E]">
              Indonesian Political Party (National) — 2024 Presidential & Legislative Elections
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Scope
            </span>
            <span className="font-semibold text-[#19244E]">
              Web admin dashboard, web verification portal, mobile app for TPS witnesses, web data entry tool
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              National Coverage
            </span>
            <span className="font-semibold text-[#19244E]">
              820,000+ TPS · 38 Provinces · 127 PPLN
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Critical Execution Window
            </span>
            <span className="font-semibold text-[#19244E]">
              48-Hour Live Tabulation
            </span>
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Monitoring vote tabulation across 820,000+ TPS across 38 provinces in real-time under signal dead zones and strict 48-hour deadline.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">4 election types, handwritten C-Hasil forms, offline regions, WhatsApp outages, and complex Sainte-Laguë seat math.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Solo UX/UI Designer & Systems Architect (Dashboard, Mobile Witness App, Verification Portal, Data Entry Tool).</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Processed 820K+ TPS in 48 hours; zero data loss via offline sync & Emergency App fallback; automated 5-tier seat risk alerts.</p>
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

        {/* 01 Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Market", val: "Indonesian Political Party, National Election Committee (KSN)" },
              { label: "Role & Ownership", val: "Solo UX/UI Designer & Systems Architect, working across four connected platforms end to end" },
              { label: "Organizational Structure", val: "Four-tier hierarchy (KSN Wilayah → Daerah → Cabang → Ranting), each requiring its own onboarding, verification, and data entry flow" },
              { label: "Core Stack", val: "Web dashboard, mobile witness app, WhatsApp-based verification, offline-capable data entry" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 02 The Strategic Challenge */}
        <div>
          <SectionTag id="challenge" num="02" label="The Strategic Challenge" />
          <p className="font-display font-light leading-relaxed mb-10 text-base sm:text-lg" style={{ color: N, lineHeight: 1.65, maxWidth: "780px" }}>
            An election doesn't wait for good conditions. The system had to work whether a witness was in a city with full signal or a village with none, whether a form was filled out neatly or scrawled in a rush during vote counting, and whether the AI reading a handwritten tally got it right or needed a human to step in.
          </p>

          <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key Constraints]
          </p>
          <div className="space-y-3">
            {[
              { 
                Icon: Layers, 
                title: "Layered Data Complexity", 
                desc: "Four separate election types (President, DPR RI, DPRD Provinsi, DPRD Kabupaten/Kota), each requiring separate vote entry, verification, and seat allocation logic." 
              },
              { 
                Icon: AlertCircle, 
                title: "Time Pressure at Every Layer", 
                desc: "A 48-hour live tabulation window, witnesses counting votes on the spot, and a data entry team racing against the same clock to catch what automation missed." 
              },
              { 
                Icon: WifiOff, 
                title: "Infrastructure You Can't Control", 
                desc: "Signal dead zones, WhatsApp numbers that could go down without warning, and thousands of witnesses with varying comfort levels with technology." 
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                  <Icon size={14} style={{ color: C }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 03 Pilar 1 — AI + Human Hybrid Verification */}
        <div>
          <SectionTag id="pilar1" num="03" label="Pilar 1 — AI + Human Hybrid Verification" />
          <p className="font-sans text-sm sm:text-base leading-relaxed mb-8 text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
            Vote tallies in Indonesia are handwritten on physical forms (C-Hasil), then photographed and submitted by TPS witnesses. An AI model reads the handwriting and auto-fills the digital form, but handwriting isn't always legible, and the system needed a real fallback, not just a best-effort guess.
          </p>

          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [BALLOT-ORDER LAYOUT FRAMEWORK]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">
                Designing Around a Fixed, Trustworthy Sequence
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Party order on every ballot paper follows the same official KPU numbering nationwide. Rather than treating this as a fixed constraint, it became the foundation of the verification flow: reviewers first select which parties appear on the form they're looking at (a fast process, since the numbering is already familiar to anyone who's seen a ballot), then move through numbered tabs (1, 2, 3, 4) that match the physical layout of the paper. A reviewer working under time pressure can jump straight to the section matching what's in front of them instead of scrolling through an unfamiliar list.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                  [DOCUMENT TYPOLOGY]
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Two Paper Types, Two Flows</h3>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  The system distinguishes between Plano (the large-format tally sheet) and Berita Acara (the official summary form), each requiring a slightly different verification path, since the two documents are laid out differently.
                </p>
              </div>

              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                  [REJECTION HANDLING]
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Built-In Reject Path</h3>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  When a submitted photo is a duplicate, unreadable, or not the right form entirely, reviewers can reject it directly rather than being forced through a verification flow that doesn't apply.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [MULTI-SURFACE ECOSYSTEM]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Two Platforms, One System</h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Witnesses submit photos from a mobile app in the field. A separate web tool (dataentry.qrc5.co) handles verification and manual correction, staffed by a dedicated entry team whose job is specifically to catch and fix what the AI got wrong, before results are finalized.
              </p>
            </div>

            <div className="p-6 bg-[#111836] text-white rounded-xl shadow-md border border-white/10">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [SYSTEM PHILOSOPHY // WHY THIS MATTERS]
              </span>
              <p className="font-sans text-sm leading-relaxed text-white/90" style={{ lineHeight: 1.75 }}>
                This wasn't designing for the ideal case and hoping the AI held up. It meant building two parallel experiences, one fast and automated, one manual and deliberate, and making sure a human could always step in without the system falling apart around them.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 04 Pilar 2 — Offline-First Mode & Sync */}
        <div>
          <SectionTag id="pilar2" num="04" label="Pilar 2 — Offline-First Mode & Sync" />
          <p className="font-sans text-sm sm:text-base leading-relaxed mb-8 text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
            This feature didn't exist in the original scope. It came from the client physically traveling across Indonesia ahead of the election and finding regions with limited or no signal, then requesting an offline mode close to launch.
          </p>

          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [STATE ARCHITECTURE]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Designing for "No Connection" as a Normal State</h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Rather than treating offline as an error state, the interface treats it as expected: a persistent "Mode di luar jaringan" (Offline Mode) label stays visible, and TPS entries are split into two clear tabs, "Belum diinput" (Not yet entered) and "Sudah diinput" (Already entered), pulled automatically from each witness's pre-assigned region.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                  [BULK SYNC PATTERN]
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">One Sync Button, Not Many</h3>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  Rather than requiring users to sync each entry individually, a single "Sinkron Semua Data" (Sync All Data) button handles everything at once when connection returns, reducing the risk of a witness manually syncing nine out of ten records and forgetting the tenth. The system also auto-syncs in the background once it detects a connection, with the manual button available as a backup.
                </p>
              </div>

              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                  [VISUAL SEMANTICS]
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">A Familiar Visual Language for "Pending"</h3>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  Entries waiting to sync are marked with a recycle-plus-alert icon, a convention chosen after looking at how similar pending-state indicators are used elsewhere, rather than inventing a new visual pattern users would have to learn from scratch.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [FEATURE BOUNDARIES]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Where Offline Mode Applies</h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                This mode covers the Tanda Terima (chain-of-custody receipt) and Manual Entry flows, the two places where data capture couldn't afford to simply stop because a witness had no signal.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Pilar 3 — Saint League Table & Alert System */}
        <div>
          <SectionTag id="pilar3" num="05" label="Pilar 3 — Sainte-Laguë Table & Alert System" />
          <p className="font-sans text-sm sm:text-base leading-relaxed mb-8 text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
            Seat allocation in Indonesian elections uses the Sainte-Laguë method, dividing each party's vote count by a sequence of odd numbers (1, 3, 5, 7, 9...) to determine who wins each seat. It's mathematically sound and visually unreadable to almost everyone outside election administration.
          </p>

          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [DOMAIN MASTERY]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Learning the Method from Scratch</h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Understanding Sainte-Laguë well enough to explain it to developers meant going past a surface definition, reading official sources on how and why the method works, then studying how existing third-party election-tracking sites had already solved the same visualization problem for the 2019 election, breaking data down by province, by dapil (electoral district), by seat allocation, and by top candidates.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [DATA VISUALIZATION]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">From Formula to Readable Table</h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                That research became the basis for a table format showing each party's vote count against its sequence of divisors (n/1, n/3, n/5...) side by side, so anyone from the party, not just someone fluent in the math, could see how seat allocation was playing out.
              </p>
            </div>

            {/* A Five-Category Alert System */}
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-3">
                [RISK SIGNALS // A FIVE-CATEGORY ALERT SYSTEM]
              </span>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C] mb-4">
                On top of the raw table, five alert categories were layered in to translate the numbers into plain-language risk signals:
              </p>

              <div className="space-y-2.5">
                {[
                  { tag: "2-Seat Alert", color: "#eab308", desc: "triggers when a party's vote margin comes within a defined range of losing a second seat" },
                  { tag: "Menang Telak (Decisive Win)", color: "#22c55e", desc: "vote lead exceeds 10% over the next party" },
                  { tag: "Hampir Kalah (Near Loss)", color: "#f97316", desc: "leading, but the margin over the party below is under 10%" },
                  { tag: "Hampir Menang (Near Win)", color: "#3b82f6", desc: "trailing, but the gap to the party above is under 10%" },
                  { tag: "Kalah Telak (Decisive Loss)", color: "#ef4444", desc: "vote count trails by more than 10%" },
                ].map((item) => (
                  <div key={item.tag} className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded border border-gray-100">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-bold text-[#19244E] text-xs sm:text-sm min-w-[190px]">{item.tag}:</span>
                    <span className="text-xs sm:text-sm text-[#2E3A5C]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#111836] text-white rounded-xl shadow-md border border-white/10">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [DESIGN OWNERSHIP // WHY THIS MATTERS]
              </span>
              <p className="font-sans text-sm leading-relaxed text-white/90" style={{ lineHeight: 1.75 }}>
                This wasn't just displaying a formula. It meant learning an unfamiliar domain well enough to make independent design decisions about what mattered to surface and how, then defending that logic to the development team building it.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 06 Supporting Systems */}
        <div>
          <SectionTag id="supporting" num="06" label="Supporting Systems" />

          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [FALLBACK CHANNEL]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">
                WhatsApp-to-Web Migration & Emergency App
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Submissions originally ran through 12 regional WhatsApp numbers, tied to a custom system for tracking whether each number was actively connected. As data started coming in scattered across a dozen separate channels, the team moved primary submission to a centralized web app instead. When the WhatsApp system genuinely went down close to the election, the previously built Emergency App became the fallback channel, letting witnesses keep submitting selfies and C-Hasil photos without a working WA connection.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                  [PRAGMATIC IDENTITY]
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">WhatsApp Group Verification</h3>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  Rather than a costly SMS OTP flow, witness verification checked whether a submitted phone number was already a member of the relevant WhatsApp group, a cheaper and faster proxy for identity that fit how these regional groups already operated.
                </p>
              </div>

              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                  [DOCUMENT CUSTODY]
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Tanda Terima (Chain-of-Custody Receipts)</h3>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  A separate system tracked the physical handover of election documents, recording who was responsible, their contact number, and which TPS the documents came from. Multiple design alternatives were explored before landing on the final version, including a photo-only variant for cases where full manual entry wasn't practical.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 07 Design Process & Workflow Pipeline */}
        <div>
          <SectionTag id="process" num="07" label="Design Process & Workflow Pipeline" />

          <div className="space-y-4">
            {[
              {
                num: "01",
                tag: "DOMAIN RESEARCH",
                title: "Domain Research (Phase 01)",
                desc: "Learned Sainte-Laguë from official sources and studied existing third-party visualizations before designing the internal seat-allocation tables and alert system."
              },
              {
                num: "02",
                tag: "CORE FLOW DESIGN",
                title: "Core Flow Design (Phase 02)",
                desc: "Designed the AI-assisted verification flow across mobile and web, including the party-selection and tabbed review system built around the fixed KPU ballot order."
              },
              {
                num: "03",
                tag: "FIELD-DRIVEN ITERATION",
                title: "Field-Driven Iteration (Phase 03)",
                desc: "Added Offline Mode and the Emergency App in response to real conditions the client encountered in the field, low-signal regions and a WhatsApp outage, rather than assumptions made at the planning stage."
              },
              {
                num: "04",
                tag: "SCOPE DISCIPLINE",
                title: "Scope Discipline Under Deadline",
                desc: "Several planned modules (Admin, Profile, TPS Prioritas) were deliberately shelved to protect the timeline for higher-priority flows, since an election date isn't a deadline that moves."
              },
              {
                num: "05",
                tag: "LIVE CO-DESIGN AGILITY",
                title: "Live Design in Client Meetings",
                desc: "Much of the client-facing work happened in real time. Rather than presenting only finished mockups, sessions often involved designing directly in Figma while the client watched, adjusting flows and layouts on the spot based on their feedback. This was before AI-assisted design tools were common, so it meant thinking and building at the same pace as the conversation. Client feedback throughout these sessions was consistently positive."
              },
            ].map(({ num, tag, title, desc }) => (
              <div key={title} className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase">[{num} · {tag}]</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E]">{title}</h3>
                </div>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 08 Business Impact & Key Deliverables */}
        <div>
          <SectionTag id="impact-business" num="08" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { 
                Icon: Shield, 
                title: "A System Built for Real Conditions, Not Ideal Ones", 
                desc: "Every major design decision, the verification fallback, the offline mode, the emergency channel, existed because the \"happy path\" alone wasn't going to hold up on election day." 
              },
              { 
                Icon: BarChart2, 
                title: "Independent Domain Mastery", 
                desc: "Seat-allocation logic and alert thresholds were researched and designed independently, then translated into specifications a development team could build against." 
              },
              { 
                Icon: CheckCircle2, 
                title: "Field-Responsive, Not Static", 
                desc: "Major features were added mid-project based on direct observations from the client's own fieldwork, not a fixed brief handed down at the start." 
              },
              { 
                Icon: Globe, 
                title: "An Honest Note on Results Data", 
                desc: "TPS-level submission and accuracy data does exist from election day, but wasn't something I had direct access to at the time. What I can speak to directly is that the systems ran, and the team was on standby throughout the tabulation window supporting live operations." 
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-4 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}08`, border: `1px solid ${C}20`, borderRadius: "4px" }}>
                  <Icon size={14} style={{ color: C }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 09 Impact & The "So What" */}
        <div>
          <SectionTag id="impact" num="09" label="Key Impact & The 'So What'" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & DESIGN VALIDATION
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Four interconnected platforms, built and evolved under a fixed, non-negotiable deadline, covering witness submission, AI-assisted verification, offline data capture, and seat-allocation reporting.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl" style={{ lineHeight: 1.8 }}>
              By designing dual-path flows for every failure point, AI verification with human fallback, online submission with an offline mode, WhatsApp with an emergency backup, the system was built to keep functioning when any single piece failed, which mattered more in this context than almost anywhere else.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs sm:text-sm">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-base text-white mb-1">Dual-Mode Verification</span>
                <p className="text-white/60">AI-assisted entry with a dedicated human correction path.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-base text-white mb-1">True Offline Support</span>
                <p className="text-white/60">Built after direct field observation, not assumed from the start.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-base text-[#DB3E8C] mb-1">Independent Domain Research</span>
                <p className="text-white/80 font-medium">Sainte-Laguë translated from formula to a usable, alert-driven table.</p>
              </div>
            </div>

            {/* Why This Matters to a Hiring Manager */}
            <div className="mt-6 p-6 rounded-xl bg-[#DB3E8C]/15 border border-[#DB3E8C]/40 text-white space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-[#DB3E8C]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHY THIS MATTERS TO A HIRING MANAGER
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                "This project shows I can design for conditions I don't control, bad signal, tight deadlines, a domain I didn't start out understanding, and still ship systems that hold up. Much of the client relationship was built live, designing directly in Figma during meetings and adjusting on the spot rather than only presenting finished work. It also shows I know the difference between what I can confidently claim and what I can't, which matters as much as the design work itself."
              </p>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

      {/* Back CTA */}
      <div style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: W }}>
        <div className="px-8 lg:px-16 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            {onPrev && (
              <button
                onClick={onPrev}
                className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
                style={{ color: N }}
              >
                <ArrowLeft size={13} /> Previous Case
              </button>
            )}
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
              style={{ color: N }}
            >
              Back to Portfolio
            </button>
          </div>
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
              style={{ color: N }}
            >
              Next Case <ChevronRight size={13} />
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
