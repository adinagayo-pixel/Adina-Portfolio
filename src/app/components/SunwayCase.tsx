import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, LayoutGrid, BarChart2, Users, Zap, ArrowRight
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

function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-sans text-[10px] font-semibold tracking-widest" style={{ color: C }}>
        [{num}]
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: HAIR }} />
      <MonoTag>{label}</MonoTag>
    </div>
  )
}

interface Props {
  onBack: () => void
}

export default function SunwayCase({ onBack }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
        <MonoTag>[SUNWAY × GEGM · MY · 2024]</MonoTag>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: N }}>
        {/* Meta strip */}
        <div
          className="px-8 lg:px-16 py-5 flex flex-wrap items-center gap-6"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
        >
          {[
            { label: "Region", val: "Malaysia" },
            { label: "Scope", val: "Embedded Insurance & B2B Portal" },
            { label: "Status", val: "Live / Production" },
            { label: "Role", val: "Solo Product Designer & System Logic Architect" },
          ].map(({ label, val }) => (
            <div key={label}>
              <span className="font-sans text-[9px] tracking-widest uppercase block mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                {label}
              </span>
              <span className="font-sans text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                {val}
              </span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
            <MonoTag>Live in Production</MonoTag>
          </div>
        </div>

        {/* Title block */}
        <div className="px-8 lg:px-16 py-16 lg:py-24">
          <p className="font-sans text-[10px] font-semibold tracking-widest uppercase mb-6" style={{ color: C }}>
            Case Study · 01
          </p>
          <h1
            className="font-display font-light text-white leading-[0.92] mb-8"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)", letterSpacing: "-0.025em", maxWidth: "780px" }}
          >
            Integrating Multi-Product<br />
            Insurance Ecosystem into<br />
            <em className="font-normal" style={{ color: C }}>Malaysia's Leading Conglomerate App.</em>
          </h1>
          <p className="text-sm leading-relaxed max-w-[640px]" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            An end-to-end integration architecture bridging third-party insurance microsites and back-office management consoles through API data mapping, reverse-engineered design systems, and zero-defect developer handoffs.
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          {[
            { val: "5", label: "Insurance Products", sub: "GH360, Great Shield, Easi Care, Travel, Motorcycle" },
            { val: "3", label: "Rollout Phases", sub: "Phase 1 → 2 → 3 production deployment" },
            { val: "6mo", label: "Timeline", sub: "Multi-phase end-to-end delivery" },
            { val: "0", label: "Revision Rounds", sub: "First-round executive approval" },
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
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: W, lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {s.val}
              </p>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-1" style={{ color: C }}>
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
          <SectionTag num="02" label="The Strategic Challenge" />
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
          <SectionTag num="03" label="System & Logic Architecture" />

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
          <SectionTag num="04" label="Design Process & Systemic Pipeline" />
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
                    { title: "Advocating Low-Friction Flows", desc: "Proposed streamlined interaction models to client stakeholders (GE) — advocating to consolidate product filtering and catalog displays onto a single screen to minimize interaction cost for a 5-product matrix." },
                    { title: "Technical & Logical Advocacy", desc: "Actively challenged client feedback regarding address field overrides by analyzing backend OCR data flows — presenting logical counter-arguments that prevented data loss and saved development rework." },
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
          <SectionTag num="05" label="Dual-Sided Product Deliverables" />

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
                  <MonoTag accent>[B] B2B Partner Portal — Back-Office Console</MonoTag>
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
          <SectionTag num="06" label="Business Impact & Developer Handoff" />
          <div className="grid lg:grid-cols-2 gap-5">
            {[
              {
                Icon: CheckCircle2,
                title: "First-Round Executive Approval",
                desc: "High-fidelity UI architecture and interaction flows were approved on the first review cycle by key stakeholders — zero revision rounds.",
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

        {/* 06 Retrospective */}
        <div>
          <SectionTag num="07" label="Retrospective & Next Steps" />
          <blockquote
            className="px-8 py-8 relative"
            style={{ backgroundColor: N, borderRadius: "4px" }}
          >
            <div className="absolute top-6 left-6 w-6 h-px" style={{ backgroundColor: C }} />
            <p
              className="font-display font-light text-white leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", letterSpacing: "-0.005em", lineHeight: 1.7 }}
            >
              "While third-party app boundaries restricted direct A/B testing at launch, the deployment of the Partner Portal's drop-off tracking provides the structural foundation needed to run granular usability iterations on complex form fields and CTA placements post-release."
            </p>
            <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
              [LEARNINGS & SYSTEM EVOLUTION]
            </p>
          </blockquote>
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
