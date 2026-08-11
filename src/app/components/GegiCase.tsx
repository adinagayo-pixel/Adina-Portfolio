import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, LayoutGrid, Zap, Share2, Target, Clock
} from "lucide-react"
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import persona1 from "@/imports/image-11.png"
import persona2 from "@/imports/image-12.png"
import persona3 from "@/imports/image-13.png"
import persona4 from "@/imports/image-14.png"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"

function MonoTag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className="font-mono text-[10px] font-semibold tracking-wider uppercase"
      style={{ color: accent ? C : `${N}CC` }}
    >
      {children}
    </span>
  )
}

function Hairline() {
  return <div className="w-full h-px" style={{ backgroundColor: HAIR }} />
}

function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-[10px] font-semibold tracking-widest" style={{ color: C }}>
        [{num}]
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: HAIR }} />
      <MonoTag>{label}</MonoTag>
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

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const PERSONAS = [
    { img: persona1, name: "Steady Pom Pi Pi", desc: "High CI readiness — fully covered & confident.", bg: "#E8F5EC" },
    { img: persona2, name: "Agak-Agak Planner", desc: "Partially covered — planning but not quite there.", bg: "#FDF3E3" },
    { img: persona3, name: "Hopeful Thinker", desc: "Low coverage — optimistic yet underinsured.", bg: "#EEF2FB" },
    { img: persona4, name: "YOLO Warrior", desc: "Critical gap — living in the moment, unprotected.", bg: "#FDE8EF" },
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
          className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: N }}
        >
          <ArrowLeft size={12} /> Back
        </button>
        <MonoTag>[GEGI SINGAPORE · MY CI GAP · MARCH 2026]</MonoTag>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: N }}>
        {/* Meta strip */}
        <div
          className="px-8 lg:px-16 py-5 flex flex-wrap items-center gap-6"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
        >
          {[
            { label: "Client", val: "GEGI Singapore" },
            { label: "Tech", val: "Adobe Experience Manager" },
            { label: "Timeline", val: "2-Week Sprint" },
            { label: "Launch", val: "March 2026" },
            { label: "Role", val: "Lead UI/UX Designer" },
          ].map(({ label, val }) => (
            <div key={label}>
              <span className="font-mono text-[9px] tracking-widest uppercase block mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                {label}
              </span>
              <span className="font-mono text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                {val}
              </span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
            <MonoTag>Live · Singapore</MonoTag>
          </div>
        </div>

        {/* Title block */}
        <div className="grid lg:grid-cols-[1fr_1px_480px]">
          <div className="px-8 lg:px-16 py-16 lg:py-24">
            <p className="font-mono text-[10px] font-semibold tracking-widest uppercase mb-6" style={{ color: C }}>
              Case Study · 02
            </p>
            <h1
              className="font-display font-light text-white leading-[0.92] mb-8"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.025em" }}
            >
              Gamified Financial<br />
              Evaluation & Interactive<br />
              <em className="font-normal" style={{ color: C }}>Acquisition Campaign.</em>
            </h1>
            <p className="text-sm leading-relaxed max-w-[560px]" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              A rapid-sprint interactive campaign tool for Great Eastern General Insurance Singapore — combining scroll-based gamified evaluation, localized Singlish persona mechanics, AEM integration, and organic social-sharing loops under a strict 2-week execution timeline.
            </p>
          </div>

          {/* Hairline */}
          <div className="hidden lg:block" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />

          {/* Persona preview — right panel */}
          <div className="hidden lg:grid grid-cols-2" style={{ borderLeft: "none" }}>
            {PERSONAS.map((p, i) => (
              <div
                key={p.name}
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  borderRight: i % 2 === 0 ? `1px solid rgba(255,255,255,0.06)` : "none",
                  borderBottom: i < 2 ? `1px solid rgba(255,255,255,0.06)` : "none",
                  minHeight: "160px",
                }}
              >
                <ImageWithFallback
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-contain p-4"
                  style={{ maxHeight: "140px" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          {[
            { val: "2wk", label: "Sprint Execution", sub: "From brief to live deployment" },
            { val: "7Q", label: "Question Matrix", sub: "Scroll-based, no Next button" },
            { val: "4", label: "Persona Outcomes", sub: "Singlish-localized CI gap tiers" },
            { val: "1st", label: "SG Market Tender", sub: "Won GEGI's inaugural SG campaign" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="px-8 lg:px-10 py-10"
              style={{
                borderRight: i < 3 ? `1px solid rgba(255,255,255,0.06)` : "none",
                borderBottom: i < 2 ? `1px solid rgba(255,255,255,0.06)` : "none",
              }}
            >
              <p
                className="font-display font-light mb-2"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: W, lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {s.val}
              </p>
              <p className="font-mono text-[9px] font-semibold tracking-widest uppercase mb-1" style={{ color: C }}>
                {s.label}
              </p>
              <p className="text-[10px] leading-snug" style={{ color: "rgba(255,255,255,0.35)" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-20">

        {/* 01 Executive Summary */}
        <div>
          <SectionTag num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Market", val: "Great Eastern General Insurance Ltd (GEGI) / Singapore" },
              { label: "Role & Responsibility", val: "Lead UI/UX Designer (Dedicated Outsourcing)" },
              { label: "Execution Sprint", val: "2 Weeks Rapid Sprint · March 2026" },
              { label: "Core Stack", val: "Figma · Adobe Experience Manager · Google Analytics · Custom SVG Engineering" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 02 Strategic Challenge */}
        <div>
          <SectionTag num="02" label="The Strategic Challenge" />
          <p className="font-display font-light leading-relaxed mb-10" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: N, letterSpacing: "-0.005em", lineHeight: 1.65, maxWidth: "680px" }}>
            Great Eastern Singapore required an engaging digital marketing tool to assess critical illness (CI) protection gaps among prospective Singaporean clients while capturing qualified lead sign-ups.
          </p>
          <p className="font-mono text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Business Constraints]
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
          <SectionTag num="03" label="Localized Persona System" />
          <p className="text-sm leading-relaxed mb-8 max-w-[600px]" style={{ color: BODY, lineHeight: 1.75 }}>
            Collaborated with a dedicated illustrator to produce 4 Singapore-centric character personas representing distinct CI Gap tiers — fine-tuned with Singlish terminology for authentic market resonance.
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
                  <p className="font-mono text-[9px] font-semibold tracking-widest uppercase mb-1" style={{ color: C }}>
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
                        <p className="font-mono text-[9px] mt-0.5" style={{ color: `${N}AA` }}>{step.sub}</p>
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
              { num: "3.", title: "Unprompted Growth Initiative (Instagram Story Assets)", desc: "Proactively designed customized Instagram Story shareable cards for each persona result — going beyond the initial brief to drive organic, word-of-mouth brand awareness across social channels." },
            ].map(({ num, title, desc }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <span className="font-mono text-[10px] font-semibold flex-shrink-0 mt-0.5" style={{ color: C }}>{num}</span>
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
          <p className="font-mono text-[9px] font-semibold tracking-widest uppercase mb-8" style={{ color: `${N}99` }}>
            [METHODOLOGY: RAPID SPRINT & GAMIFIED UX] · [TECH STACK: AEM & GA TRACKING]
          </p>

          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ backgroundColor: HAIR }} />
            <div className="space-y-0">
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
                <div key={phase.phase} className="flex gap-6">
                  <div className="flex flex-col items-center flex-shrink-0 z-10" style={{ paddingTop: "2px" }}>
                    <div
                      className="w-10 h-10 flex items-center justify-center font-mono text-[9px] font-semibold"
                      style={{
                        backgroundColor: pi === 0 ? N : W,
                        border: `1px solid ${pi === 0 ? N : HAIR}`,
                        color: pi === 0 ? W : `${N}BB`,
                        borderRadius: "4px",
                        flexShrink: 0,
                      }}
                    >
                      {String(pi + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flex-1 pb-10">
                    <div className="flex items-center gap-3 mb-4 mt-1">
                      <span className="font-mono text-[9px] font-semibold tracking-widest" style={{ color: C }}>
                        [{phase.phase} // {phase.tag}]
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-5" style={{ color: N }}>{phase.title}</h3>
                    <div className="space-y-3">
                      {phase.items.map(({ title, desc }) => (
                        <div key={title} className="px-5 py-4" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                          <p className="text-sm font-semibold mb-1" style={{ color: N }}>{title}</p>
                          <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                        </div>
                      ))}
                    </div>
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

      </div>

      {/* Back CTA */}
      <div style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: W }}>
        <div className="px-8 lg:px-16 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            {onPrev && (
              <button
                onClick={onPrev}
                className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: N }}
              >
                <ArrowLeft size={12} /> Previous Case
              </button>
            )}
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: N }}
            >
              Back to Portfolio
            </button>
          </div>
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
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
