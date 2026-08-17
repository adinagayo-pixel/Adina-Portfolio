import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, LayoutGrid, Zap, Share2, Target, Clock, MessageSquare
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



interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function GegiCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeZoomImg, setActiveZoomImg] = useState<{ title: string; img: string; desc: string } | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const PERSONAS = [
    { img: persona1, name: "Steady Pom Pi Pi", desc: "High CI readiness, fully covered & confident.", bg: "#E8F5EC" },
    { img: persona2, name: "Agak-Agak Planner", desc: "Partially covered, planning but not quite there.", bg: "#FDF3E3" },
    { img: persona3, name: "Hopeful Thinker", desc: "Low coverage, optimistic yet underinsured.", bg: "#EEF2FB" },
    { img: persona4, name: "YOLO Warrior", desc: "Critical gap, living in the moment, unprotected.", bg: "#FDE8EF" },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: S, fontFamily: "var(--font-sans)" }}>

      {/* Sticky nav */}
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
          className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: N }}
        >
          <ArrowLeft size={12} /> Back
        </button>
        <MonoTag>GEGI Singapore · MY CI GAP Campaign</MonoTag>
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="sticky top-[53px] z-40 px-8 lg:px-16 py-2.5 bg-[#0e1635] text-white/70 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
        <span className="font-bold tracking-widest text-[#DB3E8C] uppercase text-[9px]">
          QUICK JUMP
        </span>
        <div className="flex items-center gap-6 overflow-x-auto">
          <a href="#summary" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            01. Executive Takeaway
          </a>
          <a href="#challenge" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            02. Core Challenge
          </a>
          <a href="#personas" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            03. Persona System
          </a>
          <a href="#impact" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-bold text-[#DB3E8C]">
            04. Impact & "So What" ↗
          </a>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
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
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            Gamified CI Evaluation & Interactive Acquisition Campaign
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Combining scroll-based gamified evaluation, localized Singlish persona mechanics, and AEM integration under a strict 2-week deadline.
          </p>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: BODY, lineHeight: 1.8 }}>
            A rapid-sprint interactive campaign tool for Great Eastern General Insurance Singapore, combining zero-button scroll interactions, localized Singlish persona mechanics, and organic social-sharing loops to eliminate acquisition drop-off friction.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-xs">
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Sole Product Designer
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Territory
            </span>
            <span className="font-semibold text-[#19244E]">
              GEGI Singapore (SG Market)
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Sprint Timeline
            </span>
            <span className="font-semibold text-[#19244E]">
              2-Week Rapid Sprint
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Tech Stack
            </span>
            <span className="font-semibold text-[#19244E]">
              Adobe Experience Manager (AEM)
            </span>
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY & 30-SECOND TAKEAWAYS */}
        <div className="px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
              EXECUTIVE SUMMARY & 30-SECOND TAKEAWAYS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans">
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <span className="block text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1.5">01 · Problem</span>
              <p className="text-[11px] leading-relaxed text-white/80">Traditional CI evaluation forms suffered high drop-off rates due to dry financial terms and multi-page fatigue.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <span className="block text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1.5">02 · Core Constraints</span>
              <p className="text-[11px] leading-relaxed text-white/80">Strict 2-week sprint timeline, AEM CMS integration compatibility, zero-button continuous scroll interaction.</p>
            </div>
            <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
              <span className="block text-[9px] font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
              <p className="text-[11px] font-semibold text-white leading-relaxed">Sole Product Designer & System Logic Architect (End-to-End UI, Mechanics & Developer Specs).</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <span className="block text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1.5">04 · Key Impact</span>
              <p className="text-[11px] font-semibold text-white leading-relaxed">Shipped 7-Q matrix & 4 Singlish personas in 2wks; achieved 92% completion rate across SG campaign launch.</p>
            </div>
          </div>
        </div>

      {/* ── BODY CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-20">

        {/* 01 Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Market", val: "Great Eastern General Insurance Ltd (GEGI) / Singapore" },
              { label: "Role & Responsibility", val: "Lead UI/UX Designer (Dedicated Outsourcing)" },
              { label: "Execution Sprint", val: "2 Weeks Rapid Sprint · March 2026" },
              { label: "Core Stack", val: "Figma · Adobe Experience Manager · Google Analytics · Custom SVG Engineering" },
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
              <span className="font-sans text-[10px] text-white/50 tracking-widest uppercase hidden sm:inline">
                4 High-Fidelity Views
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "01 · Campaign Hero Screen", img: ci1, desc: "Interactive landing hero featuring scroll-based gamified evaluation entry." },
                { title: "02 · Localized Singlish Personas", img: ci2, desc: "Interactive Singaporean Singlish persona mechanics for relatable protection tiering." },
                { title: "03 · Evaluation Question Matrix", img: ci3, desc: "7-question evaluation matrix engineered without traditional Next buttons to prevent fatigue." },
                { title: "04 · AEM & Analytics Integration", img: ci4, desc: "Seamless Adobe Experience Manager component integration with Google Analytics tracking tags." },
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
                    <p className="font-sans text-[10px] text-white/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 02 Strategic Challenge */}
        <div>
          <SectionTag id="challenge" num="02" label="The Strategic Challenge" />
          <p className="font-display font-light leading-relaxed mb-10" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: N, letterSpacing: "-0.005em", lineHeight: 1.65, maxWidth: "680px" }}>
            Great Eastern Singapore required an engaging digital marketing tool to assess critical illness (CI) protection gaps among prospective Singaporean clients while capturing qualified lead sign-ups.
          </p>
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            Key System & Business Constraints
          </p>
          <div className="space-y-3">
            {[
              { Icon: Clock, title: "Ultra-Tight Timeline (2-Week Sprint)", desc: "High-stakes execution to secure GEGI's first interactive campaign tender in the Singapore market." },
              { Icon: FileCode2, title: "Enterprise Technical Integration", desc: "Must seamlessly embed within Adobe Experience Manager (AEM) with precise Google Analytics tracking events tagged on every question and scroll interaction." },
              { Icon: LayoutGrid, title: "UX & Content Density Challenge", desc: "Designing a continuous scroll-based evaluation experience for a 7-question matrix without relying on traditional \"Next\" buttons, avoiding user fatigue on high-density pages." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                  <Icon size={13} style={{ color: C }} />
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
          <p className="text-sm leading-relaxed mb-8 max-w-[600px]" style={{ color: BODY, lineHeight: 1.75 }}>
            Collaborated with a dedicated illustrator to produce 4 Singapore-centric character personas representing distinct CI Gap tiers, fine-tuned with Singlish terminology for authentic market resonance.
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
                  <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-1" style={{ color: C }}>
                    [{String(i + 1).padStart(2, "0")}]
                  </p>
                  <p className="text-sm font-semibold mb-1" style={{ color: N }}>{p.name}</p>
                  <p className="text-sm" style={{ color: BODY, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 04 System Architecture */}
        <div>
          <SectionTag num="04" label="System & Interaction Architecture" />

          {/* Flow diagram */}
          <div className="mb-8 p-6 overflow-x-auto" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <MonoTag>[Campaign Interaction Flow]</MonoTag>
            <div className="flex items-center mt-5 min-w-max">
              {[
                { label: "Scroll-Based Evaluation", sub: "7-question matrix, no Next button", icon: LayoutGrid },
                { label: "Localized Persona Logic", sub: "Dynamic CI Gap + Singlish personas", icon: Target },
                { label: "Organic Growth Loops", sub: "IG Story cards, lead-capture, AEM", icon: Share2 },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-start gap-3 min-w-[180px]">
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

          <div className="space-y-3">
            {[
              { num: "1.", title: "Scroll-Driven UX Matrix", desc: "Eliminated traditional multi-step wizard buttons in favor of an intuitive, scroll-based question flow. Users navigate financial questions (income ranges, sum insured expectations) alongside visual preference cards (hobbies, food choices) in one continuous, fluid layout." },
              { num: "2.", title: "Localized Character Personas & Culture Alignment", desc: "Collaborated with a dedicated illustrator to establish brand-compliant, Singapore-centric character personas representing different CI Gap tiers. Fine-tuned visual assets and localized Singlish terminology based on client feedback to ensure authentic market resonance." },
              { num: "3.", title: "Unprompted Growth Initiative (Instagram Story Assets)", desc: "Proactively designed customized Instagram Story shareable cards for each persona result, going beyond the initial brief to drive organic, word-of-mouth brand awareness across social channels." },
            ].map(({ num, title, desc }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <span className="font-sans text-[10px] font-semibold flex-shrink-0 mt-0.5" style={{ color: C }}>{num}</span>
                <div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 05 Design Process */}
        <div>
          <SectionTag num="05" label="Design Process & Workflow Pipeline" />
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-8" style={{ color: `${N}99` }}>
            [METHODOLOGY: RAPID SPRINT & GAMIFIED UX] · [TECH STACK: AEM & GA TRACKING]
          </p>

          <div className="relative">
            <div className="hidden lg:block absolute left-[calc(3rem-1px)] top-8 bottom-8 w-px" style={{ backgroundColor: HAIR }} />
            <div className="space-y-6">
              {[
                {
                  phase: "PHASE 01", tag: "ALIGNMENT",
                  title: "Alignment & Asset Direction",
                  items: [
                    { title: "Brand & Visual Guidelines Parsing", desc: "Analyzed GEGI Singapore's corporate branding rules and illustration style to select appropriate visual assets and primary color themes." },
                    { title: "Illustration Collaboration", desc: "Coordinated with a graphic illustrator to produce custom SVG character assets tailored specifically for the 4 financial persona outcomes." },
                  ],
                },
                {
                  phase: "PHASE 02", tag: "PROTOTYPING",
                  title: "Interaction Design & Prototyping",
                  items: [
                    { title: "Continuous Scroll Layout", desc: "Built responsive mobile and desktop layouts optimized for vertical scroll interactions, balancing content density with visual breathing space." },
                    { title: "Interactive Prototyping", desc: "Created rapid Figma prototypes to demonstrate scroll transitions and result-calculation states for Singapore executive approval." },
                  ],
                },
                {
                  phase: "PHASE 03", tag: "LOCALIZATION",
                  title: "Localization & Analytics Tagging",
                  items: [
                    { title: "Cultural Copywriting Refinement", desc: "Incorporated feedback from the Singapore client team to align localized terms (such as validating the usage of \"Pom Pi Pi\" for the high-readiness tier)." },
                    { title: "Analytics & Developer Handoff", desc: "Prepared production-ready SVG assets and mapped Google Analytics event triggers across every questionnaire selection point for seamless AEM developer implementation." },
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
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#19244E]/30 text-center leading-tight">
                      {phase.tag}
                    </div>
                  </div>

                  {/* Left Column: Details */}
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: C }}>
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
                          <span className="text-xs font-bold text-[#19244E]">{title}</span>
                        </div>
                        <p className="text-xs text-[#19244E]/65 leading-relaxed pl-3.5">
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
          <SectionTag num="06" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { Icon: CheckCircle2, title: "Won First Singapore Market Tender", desc: "Successful rapid-sprint delivery led to the acquisition of GEGI's inaugural interactive campaign tender in Singapore, receiving direct commendations from regional management." },
              { Icon: Zap, title: "First-Round Live Deployment", desc: "Completed design, stakeholder review, developer asset preparation, and AEM integration within the 2-week window." },
              { Icon: Share2, title: "Organic Shareability", desc: "The unprompted Instagram Story sharing design successfully expanded campaign reach beyond paid channels into user-generated social loops." },
              { Icon: Globe, title: "Foundation for Regional Gamification", desc: "Established a reusable interactive campaign template for GEGI's future user acquisition initiatives across regional markets." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-4 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}08`, border: `1px solid ${C}20`, borderRadius: "4px" }}>
                  <Icon size={13} style={{ color: C }} />
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

        {/* 04 Impact & The "So What" */}
        <div>
          <SectionTag id="impact" num="04" label="Key Impact & The 'So What'" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & BUSINESS VALIDATION
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Shipped in <span className="font-bold text-[#DB3E8C]">2 weeks</span> with a <span className="font-bold text-[#DB3E8C]">92% completion rate</span> across Great Eastern's Singapore campaign launch.
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-2xl">
              By replacing dry multi-page forms with a Singlish-localized, 7-question continuous scroll matrix, we eliminated drop-off friction and established a benchmark for interactive campaign execution.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">2-Week Sprint</span>
                <p className="text-white/60">Rapid delivery from brief to live AEM production rollout.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">7-Q Matrix</span>
                <p className="text-white/60">Zero-button scroll interaction eliminating user form fatigue.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-xl text-[#DB3E8C] mb-1">92% Completion</span>
                <p className="text-white/80 font-medium">Secured GEGI's inaugural Singapore campaign tender.</p>
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
                "This project shows I can own end-to-end design under a hard 2-week deadline—from stakeholder alignment to shipped AEM product—without sacrificing system logic or handoff quality. If you need someone who can move fast and leave clean specs behind, this is what that looks like."
              </p>
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
                className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: N }}
              >
                <ArrowLeft size={12} /> Previous Case
              </button>
            )}
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: N }}
            >
              Back to Portfolio
            </button>
          </div>
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: N }}
            >
              Next Case <ChevronRight size={12} />
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
            <p className="text-white/70 text-xs font-sans text-center max-w-xl">{activeZoomImg.desc}</p>
          </div>
        </div>
      )}

    </div>
  )
}
