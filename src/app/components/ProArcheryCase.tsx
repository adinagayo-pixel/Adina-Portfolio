import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, LayoutGrid, Zap, ShoppingCart, Package, Users
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
    <div className="mb-10">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: C }}>
        [{num} // {label.toUpperCase()}]
      </div>
      <h2 className="font-display text-2xl lg:text-3xl font-bold" style={{ color: N }}>
        {label}
      </h2>
      <div className="w-12 h-[2px] mt-4" style={{ backgroundColor: C }} />
    </div>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function ProArcheryCase({ onBack, onNext, onPrev }: Props) {
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
        <MonoTag>[PRO ARCHERY · B2C E-COMMERCE & ADMIN POS · AI-FIRST]</MonoTag>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: N }}>
        {/* Meta strip */}
        <div
          className="px-8 lg:px-16 py-5 flex flex-wrap items-center gap-6"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
        >
          {[
            { label: "Client", val: "Pro Archery · Jakarta" },
            { label: "Region", val: "Indonesia & Asia Expansion" },
            { label: "Workflow", val: "AI-First Prompt-to-Code" },
            { label: "System", val: "B2C E-Commerce & Admin POS" },
            { label: "Role", val: "Lead Freelance Product Designer & AI Systems Integrator" },
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
        </div>

        {/* Title block */}
        <div className="px-8 lg:px-16 py-16 lg:py-24">
          <p className="font-sans text-[10px] font-semibold tracking-widest uppercase mb-6" style={{ color: C }}>
            Case Study · 04
          </p>
          <h1
            className="font-display font-light text-white leading-[0.92] mb-8"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.025em", maxWidth: "820px" }}
          >
            Digital Transformation &<br />
            AI-Driven Ecosystem for<br />
            <em className="font-normal" style={{ color: C }}>Indonesia's Premier Archery Retailer.</em>
          </h1>
          <p className="text-sm leading-relaxed max-w-[640px]" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            An end-to-end digital ecosystem scaling a physical archery retailer into an Asia-wide e-commerce platform, featuring AI-accelerated frontend prototyping, interactive scenario testers, serial-number inventory tracking, and integrated B2B dealer loyalty portals.
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          {[
            { val: "24h", label: "POC Delivery", sub: "Landing page live in 1 day for stakeholder demo" },
            { val: "4", label: "Portals Built", sub: "B2C, Customer, Admin POS & Company Profile" },
            { val: "0", label: "Figma Wireframes", sub: "AI prompt-to-code: no manual layout phase" },
            { val: "AI", label: "First Workflow", sub: "Claude + Gemini + Antigravity + VS Code" },
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
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-1" style={{ color: C }}>
                {s.label}
              </p>
              <p className="text-[10px] leading-snug" style={{ color: "rgba(255,255,255,0.35)" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-20">

        {/* 01 Executive Summary */}
        <div>
          <SectionTag num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Scope", val: "Pro Archery (Jakarta, Indonesia) × Asian Regional Expansion" },
              { label: "Role & Responsibility", val: "Lead Freelance Product Designer & AI Systems Integrator" },
              { label: "Core Product Suite", val: "B2C E-Commerce Storefront · Customer Warranty Portal · Admin POS & Inventory · Corporate Landing Page" },
              { label: "Core Stack", val: "Claude AI · Gemini · VS Code · Antigravity · HTML/CSS Code-Driven Prototyping" },
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
            Transitioning a brick-and-mortar archery enterprise into a regional e-commerce power required an ultra-fast Proof of Concept to secure investor and partner alignments while managing complex technical product attributes.
          </p>
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Business Constraints]
          </p>
          <div className="space-y-3">
            {[
              { Icon: Zap, title: "Ultra-Fast Execution Needed for POC", desc: "Traditional Figma-to-code design cycles were too slow to meet tight partner presentation deadlines, requiring a direct AI prompt-to-code pipeline instead." },
              { Icon: Package, title: "Complex Inventory Mechanics", desc: "Archery gear requires granular tracking, from compound bow serial numbers (SN) to multi-tier dealer pricing (Guest vs. Silver Dealer)." },
              { Icon: LayoutGrid, title: "Omnichannel Portal Multiplicity", desc: "Designing 4 interconnected portals (B2C Storefront, Customer Portal, Admin POS/Inventory, Company Profile) under a unified design system." },
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

        {/* 03 System Architecture */}
        <div>
          <SectionTag num="03" label="System & Interaction Architecture" />

          {/* Flow diagram */}
          <div className="mb-8 p-6 overflow-x-auto" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <MonoTag>[AI-First Product Pipeline]</MonoTag>
            <div className="flex items-center mt-5 min-w-max">
              {[
                { label: "AI-First Prompt-to-Code", sub: "Claude/Gemini → VS Code direct output", icon: Zap },
                { label: "Interactive Scenario Tester", sub: "Live grid & user-state toggle widget", icon: LayoutGrid },
                { label: "Omnichannel B2C & Admin", sub: "POS, SN tracking & warranty portal", icon: ShoppingCart },
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

          <div className="space-y-3">
            {[
              { num: "1.", title: "AI-Driven Prompt-to-Code Pipeline", desc: "Bypassed manual Figma layout creation by utilizing advanced AI prompting (Claude/Gemini) to generate functional frontend code structure directly in VS Code and Antigravity, delivering a live, production-ready landing page POC in just 24 hours." },
              { num: "2.", title: "Embedded \"Scenario Tester\" Demo Widget", desc: "Engineered an interactive control widget built directly into the client presentation prototype. Stakeholders could toggle live between User Scenarios (Guest User vs. Silver Dealer Pricing) and Grid Layouts (Default, 4-Column, 5-Column) in real time during review meetings, dramatically reducing layout debate cycles." },
              { num: "3.", title: "Granular Order Lifecycle & Serial Number (SN) Tracking", desc: "Designed a high-density Admin Portal capable of tracking complex archery inventory, including serial number inputs for high-value bows, warranty claim statuses, order fulfillment timelines, and point-of-sale (POS) integration." },
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

        {/* 04 Dual-Portal Suite */}
        <div>
          <SectionTag num="04" label="The Dual-Portal Suite" />
          <div className="grid lg:grid-cols-2 gap-6">

            {/* B2C */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
                <div className="flex items-center gap-2">
                  <ShoppingCart size={12} style={{ color: C }} />
                  <MonoTag accent>[A] B2C E-Commerce & Customer Self-Service Portal</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                {[
                  { title: "Custom Bow & Gear Builder", desc: "Interactive product catalog supporting customized archery equipment configurations and integrated payment gateways." },
                  { title: "Customer Warranty & Order Tracking", desc: "Dedicated portal for users to track order timelines, view serial number certificates, manage loyalty points, and lodge warranty claims." },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                      <p className="text-sm font-semibold" style={{ color: N }}>{title}</p>
                    </div>
                    <p className="text-sm leading-relaxed pl-3" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
                <div className="flex items-center gap-2">
                  <Package size={12} style={{ color: C }} />
                  <MonoTag accent>[B] Back-Office Admin & POS Management Console</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                {[
                  { title: "Inventory & Serial Number Management", desc: "Precise tracking of high-tier archery stock requiring individual serial numbers (e.g., Hoyt Altus Compound Bows)." },
                  { title: "Multi-Tier Member & Discount Rules", desc: "Automated pricing engines adjusting storefront rates based on member tiers (Gold Member, Silver Dealer)." },
                  { title: "Unified POS & Sales Analytics", desc: "Integrated Point-of-Sale system synchronizing offline physical store transactions with online e-commerce inventory." },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                      <p className="text-sm font-semibold" style={{ color: N }}>{title}</p>
                    </div>
                    <p className="text-sm leading-relaxed pl-3" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scenario Tester callout */}
          <div
            className="mt-5 px-6 py-5 flex gap-5"
            style={{ backgroundColor: N, border: `1px solid ${N}`, borderRadius: "4px" }}
          >
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}20`, border: `1px solid ${C}40`, borderRadius: "4px" }}>
              <LayoutGrid size={13} style={{ color: C }} />
            </div>
            <div>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-2" style={{ color: C }}>
                [PROTOTYPE FEATURE: LIVE SCENARIO TESTER WIDGET]
              </p>
              <p className="text-sm font-semibold text-white mb-1.5">Interactive Scenario Tester: Built Into the Prototype</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
                Stakeholders toggled live between <strong className="text-white">Guest User</strong> vs. <strong className="text-white">Silver Dealer</strong> pricing and switched grid layouts (3 / 4 / 5 columns) in real time during review meetings, eliminating revision rounds caused by layout ambiguity.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Design Process */}
        <div>
          <SectionTag num="05" label="AI-First Design Process" />
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-8" style={{ color: `${N}99` }}>
            [WORKFLOW: AI-FIRST PROMPT-TO-CODE] · [NO TRADITIONAL WIREFRAME PHASE]
          </p>

          <div className="relative">
            <div className="hidden lg:block absolute left-[calc(3rem-1px)] top-8 bottom-8 w-px" style={{ backgroundColor: HAIR }} />
            <div className="space-y-6">
              {[
                {
                  phase: "PHASE 01", tag: "BRIEF & PROMPT",
                  title: "Requirement Parsing & AI Prompt Engineering",
                  items: [
                    { title: "Business Requirement Synthesis", desc: "Extracted core system requirements (inventory logic, member tiers, portal hierarchy) and translated them into structured AI prompts for immediate code generation." },
                    { title: "Design System Token Setup", desc: "Established shared design tokens (color palette, typography, spacing) as prompt context to ensure visual consistency across all 4 portals from the first output." },
                  ],
                },
                {
                  phase: "PHASE 02", tag: "BUILD",
                  title: "AI-Accelerated Frontend Build",
                  items: [
                    { title: "Prompt-to-Code Iteration", desc: "Used Claude and Gemini to generate, review, and refine HTML/CSS frontend components in VS Code and Antigravity, iterating rapidly without traditional layout phases." },
                    { title: "Scenario Tester Engineering", desc: "Built the live scenario toggle widget directly into the presentation prototype, enabling real-time stakeholder testing of pricing tiers and grid configurations." },
                  ],
                },
                {
                  phase: "PHASE 03", tag: "HANDOFF",
                  title: "Stakeholder Review & Developer Handoff",
                  items: [
                    { title: "24-Hour POC Delivery", desc: "Shipped the complete landing page POC for urgent partner presentations within a single working day, demonstrating the compressing power of AI-first design methodology." },
                    { title: "Production-Ready Specification", desc: "Delivered annotated component specs, admin portal interaction flows, and SN tracking logic for development team implementation." },
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
          <SectionTag num="06" label="Business Impact & Workflow Efficiency" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { Icon: Zap, title: "24-Hour Landing Page Deployment", desc: "Leveraged AI-first design workflows to ship a fully functional landing page in 1 day for urgent stakeholder POC presentations." },
              { Icon: CheckCircle2, title: "Streamlined Stakeholder Approvals", desc: "The embedded Scenario Tester widget allowed executive decision-makers to test layout variations instantly without waiting for design revision rounds." },
              { Icon: Globe, title: "Regional Market Readiness", desc: "Delivered a complete 4-portal digital infrastructure enabling Pro Archery to validate its business model and expand retail operations across Asian markets." },
              { Icon: Users, title: "AI-First Methodology Proof", desc: "Demonstrated that a production-ready multi-portal system can be designed, prototyped, and handed off without a single traditional wireframe session." },
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

    </div>
  )
}
