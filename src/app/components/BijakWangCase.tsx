import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, Trophy, Users,
  Zap, Volume2, Radio, BarChart2,
  CheckCircle2, Globe, Target, MessageSquare, Clock, LayoutGrid, FileCode2, Share2, ChevronDown
} from "lucide-react"
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import mykawan1 from "@/imports/mykawan1.png"
import mykawan2 from "@/imports/mykawan2.png"
import mykawan3 from "@/imports/mykawan3.png"
import mykawan4 from "@/imports/mykawan4.png"
import mykawan5 from "@/imports/mykawan5.png"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"
const GAME = "#0047AB"   // myKawan blue

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
  { id: "lineage", num: "02", label: "Project Lineage & Why We Built This" },
  { id: "challenge", num: "03", label: "The Strategic Challenge" },
  { id: "mechanics", num: "04", label: "Gamification Mechanics" },
  { id: "evolution", num: "05", label: "Game Rules Evolution" },
  { id: "iteration", num: "06", label: "Post Launch Iteration" },
  { id: "process", num: "07", label: "Design Process & Pipeline" },
  { id: "impact-business", num: "08", label: "Business Impact & Deliverables" },
  { id: "impact", num: "09", label: 'Key Impact & "So What"' },
]

export default function BijakWangCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeZoomImg, setActiveZoomImg] = useState<{ title: string; img: string; desc: string } | null>(null)
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
        <MonoTag>Cabaran Bijak Wang · National Gamified Platform</MonoTag>
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

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 03</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>IN HOUSE GAMIFIED QUIZ PLATFORM</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>MYSALAM x MYKAWAN · 2025 to 2026</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
          >
            In House Gamified Quiz Platform for Financial Literacy Roadshows
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Building a reusable, Kahoot inspired live quiz engine for mySalam's ongoing financial literacy roadshows across Malaysia, evolved through real event feedback and continuous iteration.
          </p>

          <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: BODY, lineHeight: 1.8 }}>
            Following mySalam's Kahoot based financial literacy event, which earned Malaysia Book of Records recognition for largest financial literacy quiz challenge in late 2025, the team set out to build an in house version of that experience. The goal was a platform mySalam could reuse across their regional roadshow circuit instead of depending on a third party tool for every stop.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-sm">
          <div className="col-span-2 md:col-span-1">
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E] block leading-snug">
              Product Designer & Gamification Architect
            </span>
            <span className="block text-xs text-gray-500 font-normal mt-0.5">
              (building on an earlier 2025 collaboration with mySalam, My Money Sense)
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Initiative
            </span>
            <span className="font-semibold text-[#19244E]">
              mySalam Malaysia x myKawan
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Timeline
            </span>
            <span className="font-semibold text-[#19244E]">
              My Money Sense (2025) to BijakWang Challenge (2026, ongoing)
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Platform Status
            </span>
            <span className="font-semibold text-[#19244E]">
              First roadshow rollout May 2026, actively developed as of Aug 2026
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
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">mySalam needed a reusable, owned quiz platform for their nationwide roadshow circuit, instead of relying on a third party tool for every stop.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">System architecture load tested for up to 100,000 concurrent sessions, built for a regional roadshow format rather than a single mass event, with real time scoring and host controlled live sessions.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Product Designer & Gamification Architect, evolving the platform through multiple rounds of post launch iteration based on real booth feedback.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Shipped a two mode platform (self paced practice and host controlled tournament), iterated scoring logic and registration flow after the first live rollout, and kept development active as the roadshow expands.</p>
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
              { label: "Client & Initiative", val: "mySalam Malaysia, under myKawan (Friendsure Technology)" },
              { label: "Role & Scope", val: "Product Designer & Gamification Architect" },
              { label: "Core Product Suite", val: "Daily Self Practice Portal · Host Controlled Live Tournament Engine · Registration & Lead Capture Flow" },
              { label: "Core Stack", val: "Figma · Gemini AI Audio Generation · Custom Dev Handoff" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* National record callout */}
          <div
            className="mt-4 px-6 py-5 flex gap-5"
            style={{ backgroundColor: GAME, border: `1px solid ${GAME}`, borderRadius: "4px" }}
          >
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}25`, border: `1px solid ${C}40`, borderRadius: "4px" }}>
              <Trophy size={14} style={{ color: C }} />
            </div>
            <div>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-2 text-white/90">
                [NATIONAL CAMPAIGN: MYSALAM x KEMENTERIAN DIGITAL MALAYSIA]
              </p>
              <p className="text-sm font-semibold text-white mb-1">Malaysia Book of Records Recognition</p>
              <p className="text-sm leading-relaxed text-white/80" style={{ lineHeight: 1.75 }}>
                Following mySalam's late 2025 event which earned Malaysia Book of Records recognition for largest financial literacy quiz challenge, the team built this in house platform to power their ongoing regional roadshows across Malaysia.
              </p>
            </div>
          </div>

          {/* UI Screen Showcase Gallery */}
          <div className="mt-10 p-6 bg-[#0a0f24] rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <MonoTag accent>[MYSALAM × MYKAWAN UI GALLERY]</MonoTag>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  In House Roadshow Tournament Platform Flow
                </h3>
              </div>
              <span className="font-sans text-xs text-white/50 tracking-widest uppercase hidden sm:inline">
                5 High-Fidelity Views
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "01 · Player Lobby", img: mykawan1, desc: "Interactive welcome screen with Singlish persona mascot and game rule instructions." },
                { title: "02 · Email Login & Registration", img: mykawan4, desc: "Instant entry verification for student participants before entering live queue." },
                { title: "03 · Live Quiz Screen", img: mykawan2, desc: "Real-time multiple choice question engine with instant squad leaderboard tracking." },
                { title: "04 · Voucher & Reward Claim", img: mykawan3, desc: "Sponsor integration popup providing 1 Month Free Learning via ReSkills." },
                { title: "05 · Live Tournament Leaderboard", img: mykawan5, desc: "Global and state-level real-time leaderboard processing 100,000 active scores." },
              ].map(({ title, img, desc }) => (
                <div
                  key={title}
                  onClick={() => setActiveZoomImg({ title, img, desc })}
                  className="bg-[#141b36] border border-white/10 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(219,62,140,0.2)]"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 mb-3 bg-[#0d142d] p-1 relative">
                    <img src={img} alt={title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 rounded" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to Zoom 🔍
                    </div>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white mb-1 tracking-wide">{title}</h4>
                    <p className="font-sans text-xs text-white/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 02 Project Lineage */}
        <div>
          <SectionTag id="lineage" num="02" label="Project Lineage & Why We Built This" />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [01. PRODUCT EVOLUTION]
              </span>
              <h3 className="font-display font-bold text-lg text-[#19244E] mb-3">
                From My Money Sense to BijakWang
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                This wasn't a single sprint project. It started in 2025 with My Money Sense, a daily practice financial literacy game built with mySalam, playable anytime without needing an account. In 2026, mySalam wanted to evolve the concept into a Kahoot style live tournament experience called BijakWang Challenge, combining daily self practice with a live, host controlled quiz mode for use at roadshow events across Malaysia.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [02. BUSINESS STRATEGY]
              </span>
              <h3 className="font-display font-bold text-lg text-[#19244E] mb-3">
                Why Build In House Instead of Using Kahoot Again
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                mySalam's late 2025 event, run on Kahoot and TikTok Live, had already proven the format worked. It drew enough participation to earn Malaysia Book of Records recognition for largest financial literacy quiz challenge. But relying on a third party platform for every regional stop wasn't sustainable long term. The goal for BijakWang was to give mySalam a reusable, owned platform they could deploy at each booth without depending on external tooling.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 03 Strategic Challenge */}
        <div>
          <SectionTag id="challenge" num="03" label="The Strategic Challenge" />
          <p className="font-display font-light leading-relaxed mb-10 text-base sm:text-lg" style={{ color: N, lineHeight: 1.65, maxWidth: "720px" }}>
            Turning financial education into an engaging, competitive format for a roadshow that moves across different regions of Malaysia, not just a single big event. This meant designing a system flexible enough to run both as a quiet, self paced daily practice tool and as a synchronized, host led live tournament at busy booth activations.
          </p>
          <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Interaction Constraints]
          </p>
          <div className="space-y-3">
            {[
              { Icon: Zap, title: "Dual Mode Architecture", desc: "Supporting both individual, self paced daily practice and host controlled, synchronized live tournament sessions within the same underlying system." },
              { Icon: Users, title: "Designed for Scale, Built for Roadshow Reality", desc: "The system architecture was load tested for up to 100,000 concurrent sessions, anticipating growth as the roadshow expands. In practice, early rollout numbers are far smaller and grow with each stop, since this is a recurring regional circuit rather than one single mass gathering." },
              { Icon: Target, title: "Booth Ready, Phone First Access", desc: "Designing for participants joining via QR code scan on their own phones at a live booth, rather than pre installed devices or desktop access." },
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

        {/* 04 Gamification Mechanics */}
        <div>
          <SectionTag id="mechanics" num="04" label="Gamification Mechanics" />

          {/* Three Stage Tournament Game Loop */}
          <div className="mb-8 p-6 overflow-x-auto" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <MonoTag>[Three Stage Tournament Game Loop]</MonoTag>
            <div className="flex items-center mt-5 min-w-max">
              {[
                { label: "1. Team Formation & Registration", sub: "Email based signup, quick entry into the game lobby", icon: Users },
                { label: "2. Real Time Answer Locking", sub: "Host paced questions, proportional speed scoring", icon: Radio },
                { label: "3. Leaderboard & Audio Feedback", sub: "Live top 5 leaderboard, Gemini AI generated soundscapes", icon: BarChart2 },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-start gap-3 min-w-[200px]">
                      <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: i === 1 ? `${C}10` : `${N}06`, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                        <Icon size={14} style={{ color: i === 1 ? C : N }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: N }}>{step.label}</p>
                        <p className="font-sans text-[9px] mt-0.5" style={{ color: `${N}AA` }}>{step.sub}</p>
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="flex items-center mx-4 pb-5">
                        <div className="h-px w-10" style={{ backgroundColor: HAIR }} />
                        <ChevronRight size={11} style={{ color: `${N}DD`, marginLeft: "-4px" }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Original Scoring Rules */}
          <div className="mb-8 p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
            <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#DB3E8C] block mb-3">
              [ORIGINAL SCORING RULES — FIRST VERSION]
            </span>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-3 bg-[#F9FAFB] rounded border border-gray-100">
                <span className="block text-xs text-gray-400 uppercase font-bold">Correct Answer</span>
                <span className="font-bold text-[#19244E] text-base">100 Points</span>
              </div>
              <div className="p-3 bg-[#F9FAFB] rounded border border-gray-100">
                <span className="block text-xs text-gray-400 uppercase font-bold">Within 30s Bonus</span>
                <span className="font-bold text-[#DB3E8C] text-base">+15 Points</span>
              </div>
              <div className="p-3 bg-[#F9FAFB] rounded border border-gray-100">
                <span className="block text-xs text-gray-400 uppercase font-bold">Total Per Q</span>
                <span className="font-bold text-[#19244E] text-base">100 – 115 Points</span>
              </div>
              <div className="p-3 bg-[#F9FAFB] rounded border border-gray-100">
                <span className="block text-xs text-gray-400 uppercase font-bold">Incorrect Answer</span>
                <span className="font-bold text-gray-400 text-base">0 Points</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Host Controlled Live Format</h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Modeled after Kahoot's session structure, a mySalam staff member acts as host during main tournament sessions, advancing the group through each question in sync. This keeps the room's pacing and energy unified, which matters a lot in a live booth setting where dozens of players are answering together.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Contextual Gemini AI Audio</h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Added after the first rollout, using Gemini AI to generate lightweight instrumental soundscapes for different game states, keeping production light without licensing costs.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Answer Distribution Instead of Answer Reveal</h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Rather than showing the correct answer immediately after each question, the platform now shows a live percentage breakdown of how the group answered (A/B/C/D split) along with a top 5 leaderboard snapshot, keeping the competitive tension going instead of settling the question outright.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Game Rules Evolution */}
        <div>
          <SectionTag id="evolution" num="05" label="Game Rules Evolution" />
          
          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [SCORING REVISION]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">
                From Flat Bonus to Proportional Speed Scoring
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                The scoring system changed after the first rollout. The original rule gave a flat +15 bonus to anyone answering within 30 seconds, with no bonus at all past that mark. This was revised into a proportional formula: correct answers now earn 10 base points, plus a bonus equal to the number of seconds remaining when the player submits. For example, answering with 7 seconds left on a 10 second timer earns a +7 point bonus. This rewards genuinely fast responses instead of treating every within time answer the same.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [UI UX REFINEMENT]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">
                Hiding the Timer, Keeping the Logic
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Unlike Kahoot's classic format, where a visible countdown bar is part of the core tension, mySalam requested removing the visible timer from BijakWang's UI. The timer still runs in the background, since it's what powers the proportional speed bonus, but players no longer see the numbers counting down. The likely reasoning was reducing the pressure of a visibly ticking clock, though this wasn't something formally confirmed, just an educated read on the request.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase block mb-2">
                [MODE FLEXIBILITY]
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">
                Host Controlled vs Self Paced Modes
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                The platform runs two distinct modes by design. Daily practice is self paced, players can jump in anytime and move through questions at their own speed. The main tournament mode used at live roadshow events is host controlled, keeping everyone moving through the quiz together rather than independently.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 06 Post Launch Iteration Based on Real Event Feedback */}
        <div>
          <SectionTag id="iteration" num="06" label="Post Launch Iteration Based on Real Event Feedback" />
          <p className="font-display font-light leading-relaxed mb-8 text-base sm:text-lg" style={{ color: N, lineHeight: 1.65 }}>
            After the first booth rollout in May 2026, mySalam requested several changes based on what they observed in the field.
          </p>

          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-xs font-bold tracking-widest text-[#DB3E8C] uppercase">[CONTESTED UX CHANGE]</span>
                <h3 className="font-display font-bold text-lg text-[#19244E]">Simplifying Registration to Email Only</h3>
              </div>
              <div className="space-y-4 font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                <p>
                  This was the most contested change. The original flow collected first name, last name, and email, later sending a follow up email to complete a full myKawan account for record keeping. mySalam initially wanted to drop this down to just a username, arguing it would lower signup friction, but that made it nearly impossible to reliably track individual participants. After discussion between mySalam and our CEO and PM, the team settled on email only at signup, still enough to identify a player, without the extra friction of a full name field.
                </p>
                <div className="p-4 bg-[#F9FAFB] rounded-lg border-l-4 border-[#DB3E8C]">
                  <span className="block font-bold text-[#19244E] mb-1">Compliance & Post-Game Offer Intersections:</span>
                  <p className="text-gray-600">
                    This also intersected with a third party compliance rule: the event couldn't be used as a marketing channel, meaning mySalam was no longer permitted to send participants a follow up email containing a direct link back into the game lobby, something the earlier flow relied on. Post game, players are simply offered an optional one month free ReSkills learning voucher, a standard myKawan signup perk. Whether they accept or skip it, they still receive a follow up email inviting them to complete their profile, but never one containing a game access link.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Removing the Immediate Answer Reveal</h3>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  Replaced with the answer distribution and leaderboard snapshot described above, to keep the competitive momentum going through the full session.
                </p>
              </div>

              <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E] mb-2">Adding Contextual Audio</h3>
                <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                  Background music and sound cues were added using Gemini AI generated audio, giving the live sessions more atmosphere without licensing costs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 07 Design Process & Workflow Pipeline */}
        <div>
          <SectionTag id="process" num="07" label="Design Process & Workflow Pipeline" />

          <div className="relative">
            <div className="hidden lg:block absolute left-[calc(3rem-1px)] top-8 bottom-8 w-px" style={{ backgroundColor: HAIR }} />
            <div className="space-y-6">
              {[
                {
                  phase: "PHASE 01", tag: "FOUNDATION (2025)",
                  title: "Dual Mode Architecture Structure",
                  desc: "Building on My Money Sense's existing self practice foundation from 2025, structured the dual mode architecture for BijakWang, separating self paced daily practice from host controlled live tournament sessions."
                },
                {
                  phase: "PHASE 02", tag: "FIRST ROLLOUT (MAY 2026)",
                  title: "First Live Roadshow Release",
                  desc: "Designed and shipped the first live version for the May 2026 booth rollout, including QR based entry, host controlled question flow, and the original scoring system."
                },
                {
                  phase: "PHASE 03", tag: "FIELD INFORMED ITERATION",
                  title: "Post Launch Refinements",
                  desc: "Following real usage at the first roadshow stop, iterated on registration flow (email only signup), scoring logic (proportional speed bonus), UI (hidden timer), and added Gemini AI audio, based directly on mySalam's field observations and internal compliance requirements."
                },
              ].map((phase, pi) => (
                <div key={phase.phase} className="grid lg:grid-cols-[6rem_1fr] gap-6 lg:gap-10 items-start pb-8 relative">
                  {/* Badge */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg text-white shadow-md z-10"
                      style={{ backgroundColor: pi === 0 ? N : C }}
                    >
                      {String(pi + 1).padStart(2, "0")}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#19244E]/40 text-center leading-tight">
                      {phase.tag}
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: C }}>
                      {phase.phase}
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#19244E] mb-2">
                      {phase.title}
                    </h3>
                    <p className="font-sans text-sm text-[#19244E]/75 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 08 Business Impact */}
        <div>
          <SectionTag id="impact-business" num="08" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { Icon: CheckCircle2, title: "Reusable Regional Platform", desc: "Gave mySalam an owned, reusable alternative to third party tools for their ongoing roadshow circuit across Malaysia, instead of a one off event solution." },
              { Icon: Trophy, title: "Built on Proven Ground", desc: "Designed as the in house evolution of a format mySalam had already validated through their Kahoot and TikTok Live event, which earned Malaysia Book of Records recognition in late 2025." },
              { Icon: Zap, title: "Field Responsive Development", desc: "Iterated registration flow, scoring logic, and UI directly based on real event feedback and a third party compliance constraint, rather than shipping once and leaving it static." },
              { Icon: Globe, title: "Active, Growing Platform", desc: "Still in active development as of August 2026, with the roadshow continuing to expand across additional regions." },
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
                SYSTEM OUTCOME & PRODUCT VALIDATION
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Evolved from a 2025 daily practice tool into a full <span className="font-bold text-[#DB3E8C]">dual mode live tournament platform</span>, built to give mySalam ownership over their own gamified roadshow experience.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              By designing for both self paced and host controlled formats, iterating scoring logic and registration flow based on real field feedback, and navigating a genuine data versus compliance tradeoff, the platform grew from its first rollout into an actively developed product.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs sm:text-sm">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-lg text-white mb-1">Dual Mode System</span>
                <p className="text-white/60">Self paced practice and host controlled live tournament in one platform.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-lg text-white mb-1">Field Tested Iteration</span>
                <p className="text-white/60">Registration, scoring, and UI all revised based on real booth feedback.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-lg text-[#DB3E8C] mb-1">Load Tested for Scale</span>
                <p className="text-white/80 font-medium">Architecture built to support up to 100,000 concurrent sessions as the roadshow grows.</p>
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
                "This project shows I can take a validated concept and turn it into a reusable, owned product, then keep improving it based on what actually happens in the field, not just what was planned. The registration flow alone involved balancing user experience, data tracking needs, and a third party compliance restriction I didn't control, and required real negotiation between stakeholders to land on a workable answer. That's the kind of judgment that matters more than any single launch number."
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

      {/* Fullscreen Lightbox Zoom Modal */}
      {activeZoomImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-6 lg:p-12 flex flex-col items-center justify-center animate-fade-in"
          onClick={() => setActiveZoomImg(null)}
        >
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <span className="text-white/60 text-xs font-sans">Click anywhere or press ESC to close</span>
            <button
              onClick={() => setActiveZoomImg(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close ✕
            </button>
          </div>
          <div
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeZoomImg.img}
              alt={activeZoomImg.title}
              className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-white/10 mb-4"
            />
            <h3 className="text-white font-display text-xl font-bold text-center mb-1">{activeZoomImg.title}</h3>
            <p className="text-white/70 text-xs sm:text-sm font-sans text-center max-w-xl">{activeZoomImg.desc}</p>
          </div>
        </div>
      )}

    </div>
  )
}
