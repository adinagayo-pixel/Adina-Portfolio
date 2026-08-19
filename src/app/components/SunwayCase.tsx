import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, LayoutGrid, BarChart2, Users, Zap, ArrowRight, MessageSquare, ChevronDown
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

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

const QUICK_SECTIONS = [
  { id: "summary", num: "01", label: "Executive Summary" },
  { id: "challenge", num: "02", label: "The Strategic Challenge" },
  { id: "architecture", num: "03", label: "System & Data Pipeline Architecture" },
  { id: "process", num: "04", label: "Design Process & Pipeline" },
  { id: "deliverables", num: "05", label: "Dual-Sided Product Deliverables" },
  { id: "impact", num: "06", label: "Business Impact & Handoff" },
  { id: "retrospective", num: "07", label: "Retrospective & System Learnings" },
]

export default function SunwayCase({ onBack, onNext, onPrev }: Props) {
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
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-200"
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
          <ArrowLeft size={12} /> Back
        </button>
        <MonoTag>Sunway Pals × GEGM · InsurTech Portal</MonoTag>
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
            className={`text-[#white]/70 transition-transform duration-200 shrink-0 ml-2 ${mobileMenuOpen ? "rotate-180" : ""}`}
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
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>SPECIAL CASE STUDY</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>EMBEDDED INSURTECH & LOYALTY INTEGRATION</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>SUNWAY PALS × GEGM · 2024</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            Multi-Product Insurance Ecosystem in Sunway SuperApp
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Integrating 5 insurance products into Malaysia's leading conglomerate loyalty app with loyalty points API mapping and B2B back-office portals.
          </p>

          <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: BODY, lineHeight: 1.8 }}>
            An end-to-end integration architecture bridging third-party insurance microsites (GH360, Great Shield, Easi Care, Travel, Motorcycle) and back-office partner portals through reverse-engineered design systems and first-pass executive approval.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-sm">
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Solo Product Designer & Logic Architect
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Partner
            </span>
            <span className="font-semibold text-[#19244E]">
              Sunway Group × Great Eastern Malaysia
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Products Integrated
            </span>
            <span className="font-semibold text-[#19244E]">
              5 Insurance Lines + B2B Admin Console
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Approval Velocity
            </span>
            <span className="font-semibold text-[#19244E]">
              1st-Pass Executive Review Approval
            </span>
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
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              { label: "Client & Ecosystem", val: "Great Eastern General Malaysia (GEGM) × Sunway Group (Malaysia)" },
              { label: "Role & Responsibility", val: "Solo Product Designer & System Logic Architect" },
              { label: "Timeline & Rollout", val: "6-Month Multi-Phase Rollout (5 Products)" },
              { label: "Core Stack & Methods", val: "Figma · Gemini AI · API Schema Docs · PDS Guidelines · Reverse Engineering" },
            ].map(({ label, val }) => (
              <div
                key={label}
                className="px-6 py-5"
                style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}
              >
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 02 Strategic Challenge */}
        <div>
          <SectionTag id="challenge" num="02" label="The Strategic Challenge" />
          <p className="font-display font-light leading-relaxed mb-10" style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)", color: N, letterSpacing: "-0.005em", lineHeight: 1.65, maxWidth: "680px" }}>
            Integrating third-party financial products into an established ecosystem requires balancing strict legal compliance with frictionless user experience. The core objective was to build an embedded insurance purchasing microsite within the native Sunway App alongside a B2B Partner Portal for operational control.
          </p>

          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System Constraints]
          </p>
          <div className="space-y-3">
            {[
              {
                Icon: LayoutGrid,
                title: "Zero UI Kit Access",
                desc: "Sunway did not provide an accessible Figma Component Library. The UI had to be reverse-engineered from production builds to ensure 100% brand alignment.",
              },
              {
                Icon: FileCode2,
                title: "Legal & Regulatory Rigor",
                desc: "The purchasing flow had to strictly adhere to Product Disclosure Sheets (PDS), health declarations, age constraints, and dynamic underwriting rules.",
              },
              {
                Icon: Zap,
                title: "Payment & Loyalty Binding",
                desc: "Seamless integration with Sunway Pay, ensuring dynamic calculation of transaction rewards and Sunway Points.",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-5 px-6 py-5"
                style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ border: `1px solid ${HAIR}`, borderRadius: "4px" }}
                >
                  <Icon size={13} style={{ color: C }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 03 System Architecture */}
        <div>
          <SectionTag id="architecture" num="03" label="System & Data Pipeline Architecture" />

          {/* Flow diagram */}
          <div
            className="mb-10 p-6 overflow-x-auto"
            style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}
          >
            <MonoTag>[System Integration Flow]</MonoTag>
            <div className="flex items-center gap-0 mt-5 min-w-max">
              {[
                { label: "Reverse Engineering", sub: "UI component extraction", icon: LayoutGrid },
                { label: "API & Legal Mapping", sub: "PDS constraints & add-ons", icon: FileCode2 },
                { label: "Full-Spectrum Blueprint", sub: "Edge-cases & dev specs", icon: CheckCircle2 },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center gap-0">
                    <div className="flex flex-col items-start gap-3 min-w-[180px]">
                      <div
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ backgroundColor: i === 1 ? `${C}10` : `${N}06`, border: `1px solid ${HAIR}`, borderRadius: "4px" }}
                      >
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

          <div className="space-y-4">
            {[
              {
                num: "1.",
                title: "Design System Reverse Engineering",
                desc: "Conducted independent component extraction from the Sunway App build to establish a mirrored UI Kit. This eliminated visual friction when users transitioned from the main app into the embedded GEGM microsite.",
              },
              {
                num: "2.",
                title: "API-Driven Form & Logic Mapping",
                desc: "Parsed complex API specifications and PDS policy documents to create dynamic form fields. Form inputs adapt in real-time based on user age, property parameters, coverage selections, and policy add-ons.",
              },
              {
                num: "3.",
                title: "Cross-Border & Multi-Stakeholder Alignment",
                desc: "Synchronized technical constraints between regional Project Managers in Malaysia and engineering teams, managing critical flow shifts such as relocating consent terms from the host app to the microsite.",
              },
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

        {/* 04 Design Process */}
        <div>
          <SectionTag id="process" num="04" label="Design Process & Systemic Pipeline" />
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-8" style={{ color: `${N}99` }}>
            [METHODOLOGY: SYSTEMIC PRODUCT DESIGN] · [APPROACH: REVERSE ENGINEERING & API-DRIVEN]
          </p>

          {/* 4-step vertical timeline */}
          <div className="relative">
            {/* Continuous left rail */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ backgroundColor: HAIR }} />

            <div className="space-y-0">
              {[
                {
                  phase: "PHASE 01", tag: "DISCOVERY",
                  title: "Discovery & Reverse Engineering",
                  items: [
                    { title: "Deconstructing Host App Architecture", desc: "Directly analyzed the Sunway production build to perform component extraction (color palette, typography, navigation patterns) and establish a mirrored, high-precision UI Kit." },
                    { title: "API & Business Requirement Parsing", desc: "Deconstructed BRS documentation, API data schemas, and regulatory Product Disclosure Sheets (PDS) to identify legal constraints and dynamic data input variables." },
                    { title: "Ecosystem Benchmarking", desc: "Evaluated existing GEGM integrations across third-party applications to standardize an efficient insurance acquisition flow." },
                  ],
                },
                {
                  phase: "PHASE 02", tag: "LOGIC",
                  title: "Logic Synthesis & Interaction Mapping",
                  items: [
                    { title: "Dynamic Form Architecture", desc: "Engineered a multi-step wizard logic where form options adjust dynamically based on real-time calculations of age parameters, property types, and coverage add-ons." },
                    { title: "System Edge-Case Mapping", desc: "Comprehensively mapped all positive cases, negative cases (e.g., age disqualifications, invalid property data inputs), and validation error handling." },
                    { title: "OCR & Multi-Address Mapping", desc: "Structured a 3-tier address model (Residential/NRIC Address via OCR, Mailing Address, and Risk Property Address) to ensure full compliance with property insurance underwriting requirements without corrupting user identity records." },
                    { title: "Payment & Loyalty Binding Flow", desc: "Designed a checkout flow directly integrated with Sunway Pay, enabling automated calculations for transaction rewards and Sunway Points." },
                  ],
                },
                {
                  phase: "PHASE 03", tag: "ALIGNMENT",
                  title: "High-Fidelity & Cross-Border Alignment",
                  items: [
                    { title: "Interactive Prototyping", desc: "Built high-fidelity Figma prototypes with realistic, context-appropriate copy to facilitate executive stakeholder demonstrations." },
                    { title: "Regional Stakeholder Review", desc: "Conducted intensive synchronization with regional Project Managers in Malaysia to finalize technical flow shifts, such as relocating consent terms into the microsite." },
                    { title: "Advocating Low-Friction Flows", desc: "Proposed streamlined interaction models to client stakeholders (GE), advocating to consolidate product filtering and catalog displays onto a single screen to minimize interaction cost for a 5-product matrix." },
                    { title: "Technical & Logical Advocacy", desc: "Actively challenged client feedback regarding address field overrides by analyzing backend OCR data flows, presenting logical counter-arguments that prevented data loss and saved development rework." },
                    { title: "B2B Back-Office Console Design", desc: "Developed the Partner Portal interface to support dynamic banner CMS management, sales performance visualizations, and funnel drop-off tracking." },
                  ],
                },
                {
                  phase: "PHASE 04", tag: "HANDOFF",
                  title: "Developer-Ready Handoff & Governance",
                  items: [
                    { title: "Full-Spectrum Specification Specs", desc: "Delivered detailed design blueprints containing interaction annotations, validation logic, and precise engineering specifications." },
                    { title: "Pragmatic Adaptation & Finalization", desc: "Successfully integrated client-requested adjustments (1x revision iteration focusing on dedicated filter page structures and copywriting refinements) without disrupting development timelines or the underlying design system." },
                    { title: "Phased Production Rollout", desc: "Maintained UI/UX consistency across the phased launch of 5 insurance products deployed over 3 distinct release stages." },
                  ],
                },
              ].map((phase, pi) => (
                <div key={phase.phase} className="flex gap-6">
                  {/* Timeline node */}
                  <div className="flex flex-col items-center flex-shrink-0 z-10" style={{ paddingTop: "2px" }}>
                    <div
                      className="w-10 h-10 flex items-center justify-center font-sans text-[9px] font-semibold"
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

                  {/* Phase content */}
                  <div className="flex-1 pb-10">
                    <div className="flex items-center gap-3 mb-4 mt-1">
                      <span className="font-sans text-[9px] font-semibold tracking-widest" style={{ color: C }}>
                        [{phase.phase} // {phase.tag}]
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-5" style={{ color: N }}>{phase.title}</h3>
                    <div className="space-y-3">
                      {phase.items.map(({ title, desc }) => (
                        <div
                          key={title}
                          className="px-5 py-4"
                          style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}
                        >
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

        {/* 05 Deliverables */}
        <div>
          <SectionTag id="deliverables" num="05" label="Dual-Sided Product Deliverables" />

          <div className="grid lg:grid-cols-2 gap-6">
            {/* B2C */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
                <div className="flex items-center gap-2">
                  <Users size={12} style={{ color: C }} />
                  <MonoTag accent>[A] B2C Customer-Facing Embedded Microsite</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                {[
                  { title: "Seamless Embedded Transition", desc: "Native navigation bars and persistent headers enabling policy tracking, purchase confirmations, and automated e-mail dispatch." },
                  { title: "Product Comparison & Filtering", desc: "Transparent comparison flows allowing users to evaluate coverage tiers (GH360 vs. Travel) before committing to checkout." },
                  { title: "Multi-Step Form Optimization", desc: "Complex medical and property declarations broken into digestible wizard steps to mitigate cognitive load and form drop-off." },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <div className="flex items-start gap-2 mb-1">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                      <p className="text-xs font-semibold" style={{ color: N }}>{title}</p>
                    </div>
                    <p className="text-sm leading-relaxed pl-3" style={{ color: BODY, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
                <div className="flex items-center gap-2">
                  <BarChart2 size={12} style={{ color: C }} />
                  <MonoTag accent>[B] B2B Partner Portal: Back-Office Console</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                {[
                  { title: "Dynamic Banner CMS Engine", desc: "Empowered internal business teams to configure, schedule, and launch promotional banners directly without developer deployment cycles." },
                  { title: "Sales Performance Analytics Dashboard", desc: "Real-time data visualization tracking revenue charts, transaction volumes, and top-performing insurance products." },
                  { title: "Funnel Drop-Off Tracking", desc: "Analytics module identifying precise user drop-off points within the declaration flow, establishing actionable data for future UX optimization." },
                  { title: "Customer & Transaction Control", desc: "Centralized transaction logs enabling support teams to verify active policy statuses instantly." },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <div className="flex items-start gap-2 mb-1">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                      <p className="text-xs font-semibold" style={{ color: N }}>{title}</p>
                    </div>
                    <p className="text-sm leading-relaxed pl-3" style={{ color: BODY, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Business Impact */}
        <div>
          <SectionTag id="impact" num="06" label="Business Impact & Developer Handoff" />
          <div className="grid lg:grid-cols-2 gap-5">
            {[
              {
                Icon: CheckCircle2,
                title: "First-Round Executive Approval",
                desc: "High-fidelity UI architecture and interaction flows were approved on the first review cycle by key stakeholders with zero revision rounds.",
              },
              {
                Icon: FileCode2,
                title: "Zero-Defect Developer Handoff",
                desc: "Delivered full-spectrum blueprints containing annotated specs, positive/negative test cases, validation states, and edge-case behaviors—eliminating clarification cycles during engineering.",
              },
              {
                Icon: Globe,
                title: "Multi-Phase Production Rollout",
                desc: "Successfully deployed across 3 distinct phases: Phase 1 (GH360 & Great Shield Active), Phase 2 (Easi Care PA & Travel), Phase 3 (Motorcycle).",
              },
              {
                Icon: Zap,
                title: "Enterprise Scalability",
                desc: "Established the foundational design framework for GEGM's subsequent third-party ecosystem integrations across regional partners.",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 px-6 py-5"
                style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${C}08`, border: `1px solid ${C}20`, borderRadius: "4px" }}
                >
                  <Icon size={13} style={{ color: C }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Data Integrity block */}
          <div className="mt-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
            <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
              <div className="flex items-center gap-2">
                <FileCode2 size={12} style={{ color: C }} />
                <MonoTag accent>[Data Integrity Advocacy & Critical Friction Prevention]</MonoTag>
              </div>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                {
                  title: "Protecting OCR Data Integrity",
                  desc: "Successfully intercepted and corrected a high-risk client request during the Great Shield Home (GSH) property insurance flow that proposed overwriting the Personal Info address with Property Address data.",
                },
                {
                  title: "Systemic Logic Defense",
                  desc: "Identified that altering the auto-populated NRIC OCR results would cause a loss of the policyholder's legal residential data. Demonstrated that the Step 2 (Declaration Page) logic already accommodated edge cases where property addresses differed from NRIC records.",
                },
                {
                  title: "Winning Stakeholder Consensus",
                  desc: "Clearly articulated the data structure conflict to the regional PM, successfully pivoting the team away from a flawed implementation and safeguarding both data completeness and API integration accuracy.",
                },
              ].map(({ title, desc }) => (
                <div key={title}>
                  <div className="flex items-start gap-2 mb-1">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                    <p className="text-xs font-semibold" style={{ color: N }}>{title}</p>
                  </div>
                  <p className="text-sm leading-relaxed pl-3" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Client Collaboration block */}
          <div className="mt-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
            <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
              <div className="flex items-center gap-2">
                <Users size={12} style={{ color: C }} />
                <MonoTag accent>[Client Collaboration & Iterative Governance]</MonoTag>
              </div>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                {
                  title: "Internal First-Round Approval",
                  desc: "The core architecture and UI system were approved on the first review cycle by internal leadership with zero major structural revisions.",
                },
                {
                  title: "Client-Side Product Filtering Trade-off",
                  desc: "Navigated 1× revision round from Great Eastern (GE) regarding product discovery flows.",
                },
                {
                  title: "Design Advocacy vs. Business Strategy",
                  desc: "Advocated merging steps 5 and 6 into a single screen to eliminate a redundant filter page for 5 products, reducing user interaction costs and accelerating reach to product details.",
                },
                {
                  title: "Pragmatic Alignment",
                  desc: "While GE elected to proceed with a dedicated filter step for strategic business alignment, the rationale demonstrated proactive UX advocacy while maintaining cross-organizational adaptability.",
                },
              ].map(({ title, desc }) => (
                <div key={title}>
                  <div className="flex items-start gap-2 mb-1">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                    <p className="text-xs font-semibold" style={{ color: N }}>{title}</p>
                  </div>
                  <p className="text-sm leading-relaxed pl-3" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 07 Retrospective */}
        <div>
          <SectionTag id="retrospective" num="07" label="Retrospective & System Learnings" />
          <blockquote
            className="px-8 py-8 relative mb-10"
            style={{ backgroundColor: N, borderRadius: "4px" }}
          >
            <div className="absolute top-6 left-6 w-6 h-px" style={{ backgroundColor: C }} />
            <p
              className="font-display font-light text-white leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", letterSpacing: "-0.005em", lineHeight: 1.7 }}
            >
              "While third-party app boundaries restricted direct A/B testing at launch, the deployment of the Partner Portal's drop-off tracking provides the structural foundation needed to run granular usability iterations on complex form fields and CTA placements post-release."
            </p>
          </blockquote>

          {/* 08 Impact & The "So What" Closing Box */}
          <div id="impact" className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & BUSINESS VALIDATION
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Approved on <span className="font-bold text-[#DB3E8C]">1st internal review</span> & shipped embedded Sunway Pals InsurTech portal.
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-2xl">
              By mapping Sunway Pals loyalty point redemption schemas directly into GEGM's embedded micro-insurance webview, we eliminated checkout friction for over 1M+ active loyalty members.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">1st Pass Approval</span>
                <p className="text-white/60">Core UI & interaction architecture approved in initial stakeholder review cycle.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">Loyalty Points API</span>
                <p className="text-white/60">Direct Sunway Pals reward points redemption mapped into policy checkout.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-xl text-[#DB3E8C] mb-1">Embedded PWA</span>
                <p className="text-white/80 font-medium">Reusable webview integration framework for GEGM regional partners.</p>
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
                "This showcases my ability to embed financial products into third-party loyalty ecosystems with first-pass internal approval. It proves I can balance user advocacy with strict business, legal, and multi-organization requirements."
              </p>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

      {/* Back CTA */}
      <div style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: W }}>
        <div className="px-8 lg:px-16 py-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
            style={{ color: N }}
          >
            <ArrowLeft size={12} /> Back to Portfolio
          </button>
          <MonoTag>SUNWAY × GEGM · 2024</MonoTag>
        </div>
      </div>

    </div>
  )
}
