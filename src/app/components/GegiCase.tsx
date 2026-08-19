import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, LayoutGrid, Zap, Share2, Target, Clock, MessageSquare, ChevronDown
} from "lucide-react"
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import persona1 from "@/imports/image-11.png"
import persona2 from "@/imports/image-12.png"
import persona3 from "@/imports/image-13.png"
import persona4 from "@/imports/image-14.png"
import ci1 from "@/imports/CI1.png"
import ci2 from "@/imports/CI2.png"
import ci3 from "@/imports/CI3.png"
import ci4 from "@/imports/CI4.png"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"

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
  { id: "summary", num: "01", label: "Executive Takeaway" },
  { id: "challenge", num: "02", label: "Strategic Challenge & Evolution" },
  { id: "personas", num: "03", label: "Localized Persona System" },
  { id: "evolution", num: "03B", label: "Design Evolution: Concept to Release" },
  { id: "architecture", num: "04", label: "Architecture & Handoff" },
  { id: "process", num: "05", label: "Design Process & Pipeline" },
  { id: "deliverables", num: "06", label: "Business Impact & Deliverables" },
  { id: "impact", num: "07", label: 'Key Impact & "So What"' },
]

export default function GegiCase({ onBack, onNext, onPrev }: Props) {
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

  const PERSONAS = [
    { img: persona1, name: "Steady Pom Pi Pi", desc: "High CI readiness, fully covered & confident.", bg: "#E8F5EC" },
    { img: persona2, name: "Agak-Agak Planner", desc: "Partially covered, planning but not quite there.", bg: "#FDF3E3" },
    { img: persona3, name: "Hopeful Thinker", desc: "Low coverage, optimistic yet underinsured.", bg: "#EEF2FB" },
    { img: persona4, name: "YOLO Warrior", desc: "Critical gap, living in the moment, unprotected.", bg: "#FDE8EF" },
  ]

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
        <MonoTag>GEGI Singapore · MY CI GAP Campaign</MonoTag>
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
            <MonoTag accent>CASE STUDY 02</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>GAMIFIED CAMPAIGN & AEM INTEGRATION</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>GEGI SINGAPORE · 2026</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
          >
            Gamified CI Evaluation & Interactive Acquisition Campaign
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Combining scroll-based gamified evaluation, localized Singlish persona mechanics, and AEM integration under a strict 2-week deadline.
          </p>

          <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: BODY, lineHeight: 1.8 }}>
            A rapid-sprint interactive campaign tool for Great Eastern General Insurance Singapore, combining zero-button scroll interactions, localized Singlish persona mechanics, and organic social-sharing loops to eliminate acquisition drop-off friction.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-sm">
          <div className="col-span-2 md:col-span-1">
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E] text-xs sm:text-sm block leading-snug">
              Product Designer, UX, Interaction Logic & Developer Handoff
            </span>
            <span className="block text-xs text-gray-500 font-normal mt-1">
              (in collaboration with in-house Graphic Designer for art direction & illustration)
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Territory
            </span>
            <span className="font-semibold text-[#19244E]">
              GEGI Singapore (SG Market)
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Sprint Timeline
            </span>
            <span className="font-semibold text-[#19244E]">
              2-Week Rapid Sprint
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Tech Stack
            </span>
            <span className="font-semibold text-[#19244E]">
              Figma · Custom Dev SVGs · 16:9 IG Assets
            </span>
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY & 30-SECOND TAKEAWAYS */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30-SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Traditional CI forms suffered drop-off. Initial red concept needed brand alignment and UX interaction overhaul.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">2-week deadline, single-screen viewport limits, and a full set of ~25 game illustrations delivered in a &lt;24h freelance sprint.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Product Designer, UX, Interaction Logic & Developer Handoff (in collaboration with in-house Graphic Designer).</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Shipped 7-Q matrix & 4 Singlish personas in 2wks; achieved 92% completion rate & stakeholder praise.</p>
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
              { label: "Client & Market", val: "Great Eastern General Insurance Ltd (GEGI) / Singapore" },
              { label: "Role & Ownership", val: "Product Designer, UX, Interaction Logic & Developer Handoff (in collaboration with in-house Graphic Designer for art direction & illustration)" },
              { label: "Execution Sprint", val: "2 Weeks Rapid Sprint · March 2026" },
              { label: "Core Stack", val: "Figma · Custom Dev SVGs · 16:9 IG Assets" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>{label}</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* UI Screen Showcase Gallery */}
          <div className="mt-10 p-6 bg-[#0a0f24] rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <MonoTag accent>GEGI Singapore UI Showcase</MonoTag>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  Gamified CI Evaluation Flow
                </h3>
              </div>
              <span className="font-sans text-xs text-white/50 tracking-widest uppercase hidden sm:inline">
                4 High-Fidelity Views
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "01 · Campaign Hero Screen", img: ci1, desc: "Light/cream brand-aligned landing hero with zero-friction entry." },
                { title: "02 · Localized Game & Persona Assets", img: ci2, desc: "~25 custom game illustrations produced with illustrator Revi (<24h turnaround), covering quiz options and 4 personas." },
                { title: "03 · Auto-Select Question Matrix", img: ci3, desc: "Auto-select interaction that immediately advances upon pick, ending with a participant lucky draw data form." },
                { title: "04 · Developer SVG Handoff", img: ci4, desc: "Single-screen viewport optimized SVG states prepared for dev implementation." },
              ].map(({ title, img, desc }) => (
                <div
                  key={title}
                  onClick={() => setActiveZoomImg({ title, img, desc })}
                  className="bg-[#141b36] border border-white/10 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(219,62,140,0.2)]"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 mb-3 bg-[#0d142d] p-1">
                    <img src={img} alt={title} className="w-full h-full object-contain rounded group-hover:scale-105 transition-transform duration-500" />
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

        {/* 02 Strategic Challenge */}
        <div>
          <SectionTag id="challenge" num="02" label="The Strategic Challenge & Project Evolution" />
          <p className="font-display font-light leading-relaxed mb-10 text-base sm:text-lg" style={{ color: N, lineHeight: 1.65, maxWidth: "720px" }}>
            Great Eastern Singapore needed an engaging digital campaign to assess critical illness (CI) protection gaps. Starting from an initial red graphic concept, the project evolved through client reviews, a color pivot, an illustration crisis, and navigation refinements.
          </p>
          <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            Key Decisions & Constraints Solved
          </p>
          <div className="space-y-3">
            {[
              { Icon: Clock, title: "Color Palette Pivot (Red → Cream Light Theme)", desc: "The initial UI proposal was dominant red. Following client presentation feedback, the palette shifted to GEGI's light cream brand guideline for consistency with their previous gamification campaigns." },
              { Icon: Target, title: "~25 Game Illustration Sprint (<24h Turnaround)", desc: "When initial illustration concepts didn't land internally, I proposed bringing in a freelance illustrator. I engaged illustrator Revi, who delivered all ~25 game assets (personas, question illustrations, icons) in under 24 hours." },
              { Icon: LayoutGrid, title: "Navigation UX Evolution: Auto-Select vs. Next Button", desc: "Replaced click-to-advance with an auto-select interaction. Selecting an answer instantly moves to the next question, preserving momentum until the final result step." },
              { Icon: FileCode2, title: "Single-Screen Viewport SVG Specs", desc: "Engineered exact SVG state assets (default, selected, hover) sized precisely to keep the game frame single-screen and non-scrollable across devices." },
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

        {/* ── PERSONA BENTO GRID ──────────────────────────────────────────── */}
        <div>
          <SectionTag id="personas" num="03" label="Localized Persona System" />
          <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-[680px]" style={{ color: BODY, lineHeight: 1.75 }}>
            Partnered with freelance illustrator Revi under a &lt;24-hour sprint to craft ~25 custom game assets, including 4 Singapore-centric character personas representing distinct CI Gap tiers, fine-tuned with authentic Singlish tone.
          </p>

          {/* 2×2 bento grid */}
          <div className="grid grid-cols-2 gap-0" style={{ border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
            {PERSONAS.map((p, i) => (
              <div
                key={p.name}
                className="flex flex-col"
                style={{
                  borderRight: i % 2 === 0 ? `1px solid ${HAIR}` : "none",
                  borderBottom: i < 2 ? `1px solid ${HAIR}` : "none",
                }}
              >
                {/* Illustration area */}
                <div
                  className="flex items-center justify-center p-6"
                  style={{ backgroundColor: p.bg, minHeight: "200px" }}
                >
                  <ImageWithFallback
                    src={p.img}
                    alt={p.name}
                    className="object-contain"
                    style={{ maxHeight: "160px", maxWidth: "100%" }}
                  />
                </div>
                {/* Label */}
                <div className="px-5 py-4" style={{ backgroundColor: W }}>
                  <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: C }}>
                    [{String(i + 1).padStart(2, "0")}]
                  </p>
                  <p className="text-sm sm:text-base font-semibold mb-1" style={{ color: N }}>{p.name}</p>
                  <p className="text-xs sm:text-sm" style={{ color: BODY, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* ── SECTION 03B: DESIGN EVOLUTION ────────────────────────────────── */}
        <div>
          <SectionTag id="evolution" num="03B" label="Design Evolution: From Concept to Client-Ready" />
          
          <p className="font-display font-light leading-relaxed mb-10 text-base sm:text-lg" style={{ color: N, lineHeight: 1.7, maxWidth: "780px" }}>
            This project began with an internal graphic designer's initial UI concept, already presented to leadership, establishing an early direction with a dominant red palette. From there, I took ownership of translating that concept into a fully built product: structuring the UX flow, building responsive desktop and mobile layouts in Figma, and preparing the interaction logic based on GEGI's existing calculation spreadsheet for the 4-persona outcome system.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Color Pivot: Red to Brand Cream",
                desc: "After the first client presentation, GEGI requested a shift from the initial red-dominant palette to their signature cream and light tone, referencing visual language from a previous game they had developed. I requested their full brand guideline to realign typography and color tokens accordingly, making sure the final product matched their established digital identity instead of feeling like a one-off campaign look."
              },
              {
                num: "02",
                title: "Navigation: From Click to Next to Auto Advance",
                desc: "The interaction model also evolved through discussion. What started as a traditional click-Next flow was refined into an auto-advance system, where selecting an answer immediately moves the user to the next question, removing an unnecessary tap at every step. The one exception is the final question, which requires an explicit View My Result click, giving users a clear and intentional moment before submission."
              },
              {
                num: "03",
                title: "The Illustration Gap",
                desc: "Midway through the project, none of the illustration drafts from the internal graphic designer were landing the way the concept needed. Rather than settle, I raised the idea of bringing in a dedicated illustrator, and reached out to a freelance illustrator I'd worked with before, Revi, who delivered the full set of ~25 game assets in under 24 hours. Those assets became the 4 personas featured in the final product."
              },
              {
                num: "04",
                title: "Beyond the Brief: Result Sharing Assets",
                desc: "Anticipating that a dedicated results-sharing design might not be prioritized before launch, I took the initiative to design Instagram-ready result cards for each persona, confirming exact dimensions with the PM and recommending a 16:9 ratio suited for Instagram Story sharing. This became part of the campaign's organic growth loop, letting users share their persona result beyond the quiz itself."
              }
            ].map(({ num, title, desc }) => (
              <div key={title} className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs hover:border-[#DB3E8C]/30 transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-sans text-xs font-bold tracking-widest uppercase text-[#DB3E8C]">[{num}]</span>
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

        {/* 04 System Architecture */}
        <div>
          <SectionTag id="architecture" num="04" label="System Architecture & Developer Handoff" />
          <p className="font-sans text-xs text-gray-400 italic mb-6">
            (Technical reference only — process narrative lives in Section 03B above)
          </p>

          <div className="space-y-4">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <FileCode2 size={16} className="text-[#DB3E8C]" />
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E]">Developer Handoff: SVG Asset System</h3>
              </div>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Prepared a complete SVG asset library, including default, selected, and hover states, sized precisely to preserve a single-screen experience across devices. Where scrolling was unavoidable, interactions were contained within the card frame itself rather than the full page, keeping the visual rhythm consistent throughout the flow.
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Target size={16} className="text-[#DB3E8C]" />
                <h3 className="font-display font-bold text-base sm:text-lg text-[#19244E]">Data Flow (Lead Capture Form)</h3>
              </div>
              <p className="font-sans text-sm leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.75 }}>
                Defined the required form fields (Full Name, Email, WhatsApp Number, NRIC, Agent IAC) for the lucky-draw submission step, handed off as spec for the development team to implement. <span className="text-gray-500 italic">(AEM component integration and backend data handling were owned entirely by the development team.)</span>
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Design Process */}
        <div>
          <SectionTag id="process" num="05" label="Design Process & Workflow Pipeline" />
          <p className="font-sans text-xs font-semibold tracking-widest uppercase mb-8" style={{ color: `${N}99` }}>
            [METHODOLOGY: RAPID SPRINT & GAMIFIED UX] · [TECH STACK: FIGMA & DEV SVG SPECS]
          </p>

          <div className="relative">
            <div className="hidden lg:block absolute left-[calc(3rem-1px)] top-8 bottom-8 w-px" style={{ backgroundColor: HAIR }} />
            <div className="space-y-6">
              {[
                {
                  phase: "PHASE 01", tag: "ALIGNMENT & COLOR PIVOT",
                  title: "Graphic Designer Collaboration & Color Pivot",
                  items: [
                    { title: "Graphic Designer Collaboration & Color Pivot", desc: "Joined internal kick-off after the GD created an initial red UI draft. Following client review, pivoted the theme to GEGI's light cream palette for visual continuity with past campaign games." },
                    { title: "Figma Desktop & Mobile Build", desc: "Built complete desktop and mobile responsive UI frames in Figma based on the client's calculation spreadsheet and 4-persona outcome tiers." },
                  ],
                },
                {
                  phase: "PHASE 02", tag: "ILLUSTRATION & UX EVOLUTION",
                  title: "24-Hour Freelance Illustrator Sprint (~25 Assets)",
                  items: [
                    { title: "24-Hour Freelance Illustrator Sprint (~25 Assets)", desc: "Initiated outreach to illustrator Revi when in-house assets needed a pivot. Integrated ~25 game character and option vectors into Figma within 24 hours for internal and executive sign-off." },
                    { title: "Auto-Select Navigation Flow", desc: "Optimized questionnaire UX from manual \"Next\" button clicks to auto-select triggers, preserving friction-free momentum until the final result view." },
                  ],
                },
                {
                  phase: "PHASE 03", tag: "HANDOFF & INITIATIVES",
                  title: "Developer SVG Engineering & Proactive Assets",
                  items: [
                    { title: "Developer SVG Engineering", desc: "Engineered pixel-precise SVG state assets (default, hover, selected) sized to guarantee single-screen, non-scrollable layouts, and handed off lead-capture form field specs for the dev team's AEM implementation." },
                    { title: "Proactive 16:9 IG Story Assets", desc: "Self-initiated 16:9 Instagram Story shareable result graphics, confirming requirements with the PM to drive organic social sharing." },
                  ],
                },
              ].map((phase, pi) => (
                <div key={phase.phase} className="grid lg:grid-cols-[6rem_1.1fr_0.9fr] gap-6 lg:gap-10 items-start pb-12 relative">
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

                  {/* Left Column: Details */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: C }}>
                      {phase.phase}
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#19244E] mb-4 leading-tight">
                      {phase.title}
                    </h3>
                  </div>

                  {/* Right Column: Items */}
                  <div className="space-y-3">
                    {phase.items.map(({ title, desc }) => (
                      <div key={title} className="rounded-xl border border-[#19244E]/8 bg-[#F8F8F6] p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: C }} />
                          <span className="text-xs sm:text-sm font-bold text-[#19244E]">{title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#19244E]/70 leading-relaxed pl-3.5">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 06 Business Impact */}
        <div>
          <SectionTag id="deliverables" num="06" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { Icon: CheckCircle2, title: "Executive & Stakeholder Praise", desc: "Seamless integration of Revi's ~25 game illustrations, cream brand styling, and auto-select UX won praise from management and client stakeholders." },
              { Icon: Zap, title: "First-Round Live Deployment", desc: "Completed design iterations and developer asset prep within the strict 2-week deadline." },
              { Icon: Share2, title: "Organic Social Virality", desc: "The self-initiated 16:9 Instagram Story sharing cards enabled participants to post results directly, extending campaign reach." },
              { Icon: Globe, title: "Reusable Regional Framework", desc: "Established a reusable interactive campaign template for GEGI's future regional user acquisition initiatives." },
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

        {/* 07 Impact & The "So What" */}
        <div>
          <SectionTag id="impact" num="07" label="Key Impact & The 'So What'" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & BUSINESS VALIDATION
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Shipped in <span className="font-bold text-[#DB3E8C]">2 weeks</span> with a <span className="font-bold text-[#DB3E8C]">92% completion rate</span> across Great Eastern's Singapore campaign launch.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
              By pivoting to brand-aligned cream visuals, implementing auto-select UX, delivering ~25 game illustrations with illustrator Revi in under 24 hours, and preparing precise SVG state assets plus proactive 16:9 IG Story shareables, the team eliminated user friction and maximized engagement.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs sm:text-sm">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">2-Week Sprint</span>
                <p className="text-white/60">Rapid turnaround from client feedback pivot to live rollout.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">Auto-Select UX</span>
                <p className="text-white/60">Zero-button question transitions reducing form drop-off.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-xl text-[#DB3E8C] mb-1">92% Completion</span>
                <p className="text-white/80 font-medium">Secured GEGI's inaugural Singapore campaign tender.</p>
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
                "This project shows I can pick up an in-progress concept from another team member and carry it through to a polished, client-approved product, navigating brand pivots, stakeholder feedback, and a mid-project illustration crisis without losing the 2-week deadline. If you need someone who can adapt fast and still ship clean, that's what this demonstrates."
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
