import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, Shield, Zap, RefreshCw, Users, MessageSquare,
  Trophy, Smartphone, Target, QrCode, Sun, WifiOff, Calendar, AlertTriangle, Clock, ChevronDown, Sparkles
} from "lucide-react"

import heroImg from "@/imports/image-7.jpg"
import myArcheryPerpaniThumb from "@/imports/myarchery thumb.jpg"

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
            High Velocity Outdoor Target Scoring Interface
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
          { label: "M", val: "M", bg: "bg-gray-700 text-white font-bold" },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => addScore(btn.val)}
            disabled={scores.length >= 6}
            className={`py-3 rounded-lg text-sm transition-transform active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${btn.bg}`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Live Arrow Matrix Display */}
      <div className="grid grid-cols-6 gap-2 pt-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-mono text-base font-bold text-white"
          >
            {scores[idx] ? (
              <span className={scores[idx] === "X" || scores[idx] === "10" ? "text-yellow-400" : ""}>
                {scores[idx]}
              </span>
            ) : (
              <span className="text-white/20 text-xs">—</span>
            )}
          </div>
        ))}
      </div>

      {/* Calculated End Totals */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-mono">End Total</span>
            <span className="text-xl font-bold text-white font-mono">{calculateTotal()} / 60</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-mono">10 + X Count</span>
            <span className="text-sm font-bold text-yellow-400 font-mono">{countTens()} Hits</span>
          </div>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
          <WifiOff size={10} /> Local Queue Ready
        </span>
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
  { id: "context", num: "01", label: "Context" },
  { id: "constraints", num: "02", label: "Constraints" },
  { id: "decisions", num: "03", label: "Key Decisions" },
  { id: "solution", num: "04", label: "Solution & Evidence" },
  { id: "outcome", num: "05", label: "Outcome & Reflection" },
]

export default function MyArcheryCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("context")
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

          <CaseStudyHeaderBadge caseNum="03" />
        </div>

        {/* Mobile Collapsible Quick Jump Bar - Flush underneath */}
        <div className="block lg:hidden bg-[#0e1635] text-white border-b border-white/10 shadow-lg">


        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="w-full px-6 py-3 flex items-center justify-between text-xs font-sans cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2.5 min-w-0">
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
              <MonoTag accent>CASE STUDY 03</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>SPORTS TECH & FIELD RESEARCH</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>PERPANI · 2021 to 2023</MonoTag>
            </div>

            <h1
              className="font-display font-bold leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", color: N }}
            >
              MyArchery · PERPANI National Operating System
            </h1>

            <p
              className="font-display font-light leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              Registration, live scoring, and brackets for PERPANI tournaments, designed inside the judges' tents where the scoring happens.
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              I led research and product design for a platform that replaced manual registration checks and paper score re-entry. It shipped through 7+ live tournament releases, and I tested each one on site.
            </p>

            <CaseStudyFacts
              facts={[
                {
                  label: "My contribution",
                  value: "Lead UX researcher and product designer. I ran contextual inquiry in judges' tents, designed the tournament lifecycle, and led the design team.",
                },
                {
                  label: "Team & scope",
                  value: "A team of 3 designers working remotely (work from anywhere, WFA). Scope: registration, on-event scoring and brackets, and post-event scoreboards and reconciliation.",
                },
                {
                  label: "Verified impact",
                  value: "7+ live tournament releases from 2021 to 2023, from Jakarta trials to district and regional tournaments in late 2022.",
                  tone: "verified",
                },
                {
                  label: "Not measured here",
                  value: "Before and after timing or accuracy metrics. This case rests on field observation and release history.",
                  tone: "muted",
                },
              ]}
            />
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={myArcheryPerpaniThumb}
              alt="MyArchery System Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 30 SECOND TAKEAWAYS: the five-stage story at a glance */}
      <div className="px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Context</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Tournament operations ran on Google Forms, WhatsApp transfer checks, spreadsheets, and a legacy desktop scorer.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">No digital foundation to build on, outdoor glare, patchy Wi-Fi, and short gaps between scoring ends.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">A color coded keypad matched to the target rings, real-time brackets, and small field releases instead of one launch.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Registration with payment, a field tested keypad, live brackets, public scoreboards, and reconciliation, refined at each event.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Used across 7+ live tournaments. Field conditions shaped the design from the start, not after launch.</p>
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

        {/* 01 Context */}
        <div>
          <SectionTag id="context" num="01" label="Context: Tournaments Run on Fragmented Tools" />

          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-8" style={{ lineHeight: 1.8 }}>
            Before MyArchery, tournament operations ran on fragmented manual tools: Google Form signups, WhatsApp bank transfer checks, spreadsheet rosters, and a desktop scoring tool not built for field use. Paper scoresheets had to be physically collected and reentered before standings could update, which meant delays every round.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: Users,
                title: "Fragmented Registrations",
                desc: "Manual Google Form signups and bank transfer validation via WhatsApp created heavy operational overhead.",
              },
              {
                Icon: FileCode2,
                title: "Desktop Scoring Software",
                desc: "Desktop scoring not built for field conditions, prone to input errors under fast outdoor pressure.",
              },
              {
                Icon: Clock,
                title: "Paper Re-Entry Delays",
                desc: "Standings delayed every round while physical paper scoresheets were collected and typed in by hand.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
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

        {/* 02 Constraints */}
        <div>
          <SectionTag id="constraints" num="02" label="Constraints: Designing Under the Sun" />

          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-6" style={{ lineHeight: 1.8 }}>
            There was no digital infrastructure to build on, and a desk-based process could not anticipate the conditions. I ran contextual inquiry directly inside judges' tents at live tournaments: The HUB Cibubur Trials (2021) and Jakarta Open (2022). I watched how judges and scorekeepers worked under outdoor glare, patchy signal, and tight time pressure between scoring ends.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="p-6 bg-[#111836] text-white rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#EAB308]">
                <Sun size={18} />
                <span className="text-xs font-bold tracking-widest uppercase">FIELD CONSTRAINT 01</span>
              </div>
              <h4 className="text-lg font-bold text-white">Outdoor Heat & Sunlight Glare</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                The scoring screen had to stay readable and tappable in direct sun, which is why the keypad uses high contrast color.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#DB3E8C]">
                <Clock size={18} />
                <span className="text-xs font-bold tracking-widest uppercase text-[#DB3E8C]">FIELD CONSTRAINT 02</span>
              </div>
              <h4 className="text-lg font-bold text-[#19244E]">Patchy Wi-Fi & Time Pressure</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Field Wi-Fi was spotty, and scores had to be entered between ends. The system had to keep working when the connection dropped.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 03 Key Decisions */}
        <div>
          <SectionTag id="decisions" num="03" label="Key Decisions: Three Calls From the Field" />

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 01 · A color coded keypad, not a clever layout</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Judges tap arrows quickly, under glare, in the gap between two ends.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I mapped keypad colors to the official target rings: Yellow X, 10, 9; Red 8, 7; Blue 6, 5; Black 4, 3; White 2, 1.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> Colors that match the target are meant to build muscle memory for accurate taps. A studio-tested layout would not have helped someone scoring in the sun.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 02 · Real-time brackets instead of manual tabulation</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Paper scoresheets were collected and retyped before standings could update, which delayed every round.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I designed real-time bracket calculation, so standings update without waiting on manual tabulation.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> The paper re-entry step is removed from the path between rounds.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 03 · Small field releases, not one big launch</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Field conditions could not be fully predicted at a desk.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I tested each release at a live event, starting with local trials in 2021 and scaling to district and regional events by late 2022.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> Each round of real use refined the scoring and bracket logic before the next event.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 04 Solution & Evidence */}
        <div>
          <SectionTag id="solution" num="04" label="Solution & Evidence: The Platform Across the Tournament" />

          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-8" style={{ lineHeight: 1.8 }}>
            A modular platform covering the full tournament lifecycle:
          </p>

          <div className="space-y-4">
            <div className="p-5 bg-white border border-gray-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">PRE EVENT</span>
              <h4 className="font-bold text-base text-[#19244E]">Athlete Registration & Allocations</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Self-service registration with integrated payment, replacing manual bank transfer checks.</p>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider block">ON EVENT</span>
              <h4 className="font-bold text-base text-[#19244E]">Field Keypad & Real Time Brackets</h4>
              <p className="text-xs text-gray-600 leading-relaxed">A field tested scoring keypad, with standings that update as scores are entered.</p>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-[#22c55e] uppercase tracking-wider block">POST EVENT</span>
              <h4 className="font-bold text-base text-[#19244E]">Scoreboards & Financial Reconciliation</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Public live scoreboards and a reconciliation dashboard for organizing committees.</p>
            </div>
          </div>

          <div className="mt-8">
            <CaseStudyDisclosure label="Technical detail" summary="Full scope of each module">
              <ul className="space-y-3 list-none">
                <li><strong className="text-[#19244E]">Pre event.</strong> Category and target allocation for Barebow, Compound, Recurve, and National classes, alongside self-service registration and payment.</li>
                <li><strong className="text-[#19244E]">On event.</strong> Keypad scoring with six arrows per end, a live total and 10 and X count, and a local queue for patchy connections.</li>
                <li><strong className="text-[#19244E]">Post event.</strong> Public live scoreboards, e-certificate generation, and a financial reconciliation dashboard for the organizing committee.</li>
              </ul>
            </CaseStudyDisclosure>
          </div>

          {/* Interactive Scoring Keypad */}
          <TargetScoringKeypad />

          <p className="font-sans text-xs text-gray-500 -mt-6 mb-10">
            Try it: tap up to six arrows for one end. The total and the 10 and X count update as you score.
          </p>

          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#19244E]/60 font-sans block mb-4">Release timeline</span>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#DB3E8C] block">2021 // Local Trials</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The HUB Cibubur Trials: initial field validation of keypad scoring under outdoor conditions.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#3B82F6] block">2022 // Regional Open</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Jakarta Open: expanding multi category support for Barebow, Compound, and Recurve classes.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#22c55e] block">Late 2022 // District & Regional Events</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Sumbawa Barat and Purwakarta Open: full scale bracket engines and financial dashboards.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Outcome & Reflection */}
        <div>
          <SectionTag id="outcome" num="05" label="Outcome & Reflection" />

          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                VERIFIED OUTCOME (2021 TO 2023)
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Used at 7+ live tournament releases, from local trials to district and regional tournaments.
            </h3>

            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
              I led daily standups for a team of 3 designers working remotely, and I stayed hands-on with field testing at each tournament. I was not only designing the system; I was validating it on site.
            </p>

            {/* WHAT I LEARNED Box */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-white space-y-2 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/90 italic" style={{ lineHeight: 1.8 }}>
                "Sitting in judges' tents under direct sun taught me things no brief could have told me, like why a color coded keypad matters more than a clever layout when someone's scoring under time pressure and glare. Field conditions are not an edge case to design around after the fact; they have to shape the design from the start."
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
