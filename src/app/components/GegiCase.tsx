import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, LayoutGrid, Zap, Share2, Target, Clock, MessageSquare, ChevronDown, Sparkles
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
  { id: "summary", num: "01", label: "Executive Overview" },
  { id: "before", num: "02", label: "Before I Joined: Existing Concept" },
  { id: "pivot", num: "03", label: "After Presentation: The Color Pivot" },
  { id: "illustration", num: "04", label: "Midway: The Illustration Gap" },
  { id: "sharing", num: "05", label: "Beyond the Brief: Designing for Sharing" },
  { id: "handoff", num: "06", label: "Handing Off to Development" },
  { id: "impact", num: "07", label: "Closing & Key Impact" },
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

          <CaseStudyHeaderBadge caseNum="02" />
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
      <div className="px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <MonoTag accent>CASE STUDY 02</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>FINTECH & GAMIFIED CAMPAIGN</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>GREAT EASTERN SINGAPORE · 2026</MonoTag>
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
              Great Eastern Singapore needed an engaging digital campaign to assess critical illness protection gaps among its users.
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              I stepped in with a tight 2 week sprint deadline, taking over an existing initial concept and driving it to a fully client approved product.
            </p>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={ci1}
              alt="GEGI Campaign Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">GEGI Singapore needed an engaging gamified tool to help users uncover hidden Critical Illness protection gaps.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">2 week sprint deadline, brand palette pivot from red to light cream, tight 24h illustration turnaround.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Lead UX Designer: drove color pivot, auto advance interaction logic, SVG asset library, and Instagram share cards.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">First Singapore project delivered by our company, earning direct appreciation from GEGI leadership in 2026.</p>
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

        {/* 01 Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Initiative", val: "Great Eastern General Insurance Singapore (GEGI) · 2026" },
              { label: "Role & Scope", val: "Lead Product Designer & UX Architect" },
              { label: "Core Deliverables", val: "Interactive Web App · 4 Localized Persona Outcomes · Instagram Share Cards" },
              { label: "Core Stack", val: "Figma · SVG Asset Spec · Auto Advance Engine · AEM Developer Spec" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Localized Personas Visual Strip */}
          <div className="mt-10 p-6 bg-[#0a0f24] rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <MonoTag accent>[GEGI SINGAPORE · 4 LOCALIZED PERSONAS]</MonoTag>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  Custom Illustration Outcome Cards
                </h3>
              </div>
              <span className="font-sans text-xs text-white/50 tracking-widest uppercase hidden sm:inline">
                Delivered in under 24 hours
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PERSONAS.map((p) => (
                <div
                  key={p.name}
                  onClick={() => setActiveZoomImg({ title: p.name, img: p.img, desc: p.desc })}
                  className="bg-[#141b36] border border-white/10 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
                >
                  <div className="aspect-square rounded-lg overflow-hidden border border-white/10 mb-3 p-2 relative flex items-center justify-center" style={{ backgroundColor: p.bg }}>
                    <img src={p.img} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Zoom 🔍
                    </div>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white mb-1 tracking-wide">{p.name}</h4>
                    <p className="font-sans text-xs text-white/60 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 02 Before I Joined: An Existing Concept, Already Presented */}
        <div>
          <SectionTag id="before" num="02" label="Before I Joined: An Existing Concept, Already Presented" />
          
          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              This project originated from an initial UI concept created by our internal graphic designer, featuring a dominant red color palette, which had already been presented to leadership. Once I joined, I took over to translate that concept into a complete product: structuring the UX flow, constructing responsive desktop and mobile layouts in Figma, and setting up interaction logic based on GEGI's calculation spreadsheet for their 4 persona outcome system.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 03 After the First Client Presentation: The Color Pivot */}
        <div>
          <SectionTag id="pivot" num="03" label="After the First Client Presentation: The Color Pivot" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Following the first client presentation, GEGI requested shifting from the dominant red palette to their signature light cream tones, referencing the visual language of a game they had built previously. I requested their complete brand guidelines to realign typography and color tokens: ensuring the final product felt consistent with their digital identity rather than a throwaway campaign view.
            </p>
            <p>
              At this point, the interaction model evolved through discussions: moving from traditional click Next navigation to auto advance, where selecting an answer immediately progressed the user to the next question, eliminating an unnecessary tap at every step. One exception: the final question retained an explicit "View My Result" button, giving users a clear moment of pause before submitting.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 04 Midway Through the Sprint: The Illustration Gap */}
        <div>
          <SectionTag id="illustration" num="04" label="Midway Through the Sprint: The Illustration Gap" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Midway through the project, illustration drafts from the internal team: including several experiments with AI tools: had not quite captured the specific tone this concept required. Recognizing that our graphic designer was overloaded with heavy workloads, I proposed bringing in an additional illustrator to assist and relieve the workload, not to replace anyone.
            </p>
            <p>
              I reached out to a freelance illustrator I had previously collaborated with, Revi: who successfully delivered the entire set of approximately 25 game assets in under 24 hours. Those assets became the 4 personas featured in the final product.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 05 Beyond the Brief: Designing for Sharing */}
        <div>
          <SectionTag id="sharing" num="05" label="Beyond the Brief: Designing for Sharing" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Anticipating that dedicated designs for result sharing might not be prioritized prior to launch, I proactively designed Instagram-ready result cards for each persona: confirming exact dimensions with the PM and recommending a 16:9 ratio suitable for Instagram Stories. This became part of the campaign's organic growth loop, allowing users to share their persona outcomes beyond the quiz itself.
            </p>
          </div>

          {/* Gallery of UI Screenshots */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { title: "01 · Critical Illness Question Engine", img: ci1, desc: "Auto advance question flow with localized SG insurance terminology." },
              { title: "02 · Interactive Persona Outcome Card", img: ci2, desc: "Personalized protection gap result with custom character illustration." },
              { title: "03 · Lucky Draw Lead Capture", img: ci3, desc: "Form collection for NRIC and WhatsApp details paired with Agent IAC." },
              { title: "04 · Instagram Story Share Card", img: ci4, desc: "16:9 formatted outcome card designed for organic social sharing." },
            ].map(({ title, img, desc }) => (
              <div
                key={title}
                onClick={() => setActiveZoomImg({ title, img, desc })}
                className="bg-white border border-gray-100 rounded-xl p-3 shadow-xs hover:border-[#DB3E8C]/40 transition-colors cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-2 border border-gray-100">
                  <img src={img} alt={title} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="font-sans text-xs font-bold text-[#19244E]">{title}</h4>
                <p className="font-sans text-[11px] text-gray-500 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 06 Handing Off to Development */}
        <div>
          <SectionTag id="handoff" num="06" label="Handing Off to Development" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              I prepared a comprehensive SVG asset library: default, selected, and hover states: with precise sizing to maintain a single screen experience across devices. Where scrolling was unavoidable, interactions remained contained within the card frame rather than across the entire page, preserving consistent visual rhythm. I also defined required form fields for lucky draw submissions: full name, email, WhatsApp number, NRIC, and Agent IAC: delivered as specifications to the development team, while AEM integration and backend data handling were executed by developers.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 07 Closing & Key Impact */}
        <div>
          <SectionTag id="impact" num="07" label="Closing & Key Impact" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & PRODUCT VALIDATION (2026)
              </span>
            </div>
            
            {/* WHAT I LEARNED Box */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-white space-y-2 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/90 italic" style={{ lineHeight: 1.8 }}>
                "Taking over a concept someone else already started taught me that ownership is not about starting from zero: it is about being willing to fully commit to a direction I did not choose myself, while still pushing back when the brief genuinely needed to change, like the color pivot and bringing in extra illustration support."
              </p>
            </div>

            {/* Why This Matters to a Hiring Manager */}
            <div className="mt-6 p-6 rounded-xl bg-[#DB3E8C]/15 border border-[#DB3E8C]/40 text-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHY THIS MATTERS TO A HIRING MANAGER
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                "This project demonstrates my ability to take over an ongoing concept from another team member and drive it to a client approved product: navigating brand pivots, stakeholder feedback, and illustration constraints midway through a project without missing a tight 2 week deadline."
              </p>
            </div>
          </div>
        </div>

          </div>
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

