import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, Shield, Zap, RefreshCw, GitBranch, Users
} from "lucide-react"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const TNG = "#0060AF"
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

export default function TngCase({ onBack, onNext, onPrev }: Props) {
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
        <MonoTag>[TNG × GEGM · PWA / SSO / eKYC · PTV VOUCHER]</MonoTag>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: N }}>
        {/* Meta strip */}
        <div
          className="px-8 lg:px-16 py-5 flex flex-wrap items-center gap-6"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
        >
          {[
            { label: "Client", val: "Touch 'n Go × GEGM" },
            { label: "Tech", val: "PWA / SSO / eKYC" },
            { label: "Gov. Program", val: "PTV Voucher" },
            { label: "Timeline", val: "3 Months · 5 Versions" },
            { label: "Role", val: "Lead UI/UX Designer & Systems Integrator" },
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
            <MonoTag>Released V5 · Production</MonoTag>
          </div>
        </div>

        {/* Title block */}
        <div className="px-8 lg:px-16 py-16 lg:py-24">
          <p className="font-sans text-[10px] font-semibold tracking-widest uppercase mb-6" style={{ color: C }}>
            Case Study · 03
          </p>
          <h1
            className="font-display font-light text-white leading-[0.92] mb-8"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.025em", maxWidth: "820px" }}
          >
            Seamless Micro-Insurance Integration<br />
            & Government Subsidy Flow for<br />
            <em className="font-normal" style={{ color: C }}>Touch 'n Go E-Wallet.</em>
          </h1>
          <p className="text-sm leading-relaxed max-w-[640px]" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            An embedded Progressive Web Application (PWA) architecture built inside Malaysia's leading e-wallet ecosystem — leveraging TNG native SSO + eKYC data pipelines, automated Government Voucher (PTV) eligibility checks, and 5-version iterative design system alignments.
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          {[
            { val: "V5", label: "Production Release", sub: "5 iterated versions shipped to live" },
            { val: "3mo", label: "Timeline", sub: "End-to-end design & governance" },
            { val: "RM0", label: "PTV Eligible Flow", sub: "Zero-cost checkout for gov. voucher users" },
            { val: "0", label: "Defect UX Flows", sub: "Zero-defect through all 5 versions" },
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
              { label: "Client & Ecosystem", val: "Great Eastern General Malaysia (GEGM) × Touch 'n Go (TNG Digital / Malaysia)" },
              { label: "Role & Responsibility", val: "Lead UI/UX Designer & Systems Integrator" },
              { label: "Timeline & Governance", val: "3 Months · Iterated and released across 5 major production UI versions" },
              { label: "Core Stack & Integration", val: "Figma · TNG Mini Program API · SSO Auth · eKYC Data Mapping · TNG Native UI Kit" },
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
            Integrating the Great Tenang Madani micro-insurance policy directly into Touch 'n Go's high-concurrency e-wallet required a zero-friction checkout for millions of active users while enforcing strict fraud-prevention controls.
          </p>
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Business Constraints]
          </p>
          <div className="space-y-3">
            {[
              { Icon: GitBranch, title: "Dual-Purchase Logic (Normal vs. PTV Voucher)", desc: "The checkout flow had to dynamically fork between standard e-wallet payments and Government Program Discount (Perlindungan Tenang Voucher / PTV) validation based on real-time NRIC eligibility." },
              { Icon: Shield, title: "Third-Party Fraud Mitigation", desc: "Enforcing strict identity cross-referencing to prevent users from buying subsidized policies on behalf of unauthorized third parties." },
              { Icon: FileCode2, title: "Design System Adaptation", desc: "Constructing a mirrored TNG UI Kit for first-round approvals prior to receiving official TNG design assets, followed by seamless system adaptation." },
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
          <SectionTag num="03" label="System & Data Pipeline Architecture" />

          {/* Flow diagram */}
          <div className="mb-8 p-6 overflow-x-auto" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <MonoTag>[Integration Data Pipeline]</MonoTag>
            <div className="flex items-center mt-5 min-w-max">
              {[
                { label: "SSO & eKYC Auto-Populate", sub: "Pre-fill NRIC, age & identity", icon: Users },
                { label: "Real-Time PTV Checking", sub: "Gov. discount eligibility + anti-fraud", icon: Shield },
                { label: "TNG E-Wallet Checkout", sub: "PIN debit & policy confirmation", icon: CheckCircle2 },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-start gap-3 min-w-[200px]">
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

          <div className="space-y-3">
            {[
              { num: "1.", title: "Zero-Friction Identity Auto-Fill (SSO + eKYC)", desc: "Mapped TNG's native Single Sign-On (SSO) and eKYC data schema (base user profile, NRIC, full name, age parameters) directly into the embedded PWA forms — eliminating manual typing friction and preventing identity spoofing." },
              { num: "2.", title: "Automated PTV Voucher Eligibility Verification", desc: "Engineered an inline identity validation screen where users input/confirm their NRIC to instantly check government subsidy eligibility. The system automatically adjusts premium totals to RM 0 (for eligible PTV recipients) or routes to standard TNG e-wallet debit." },
              { num: "3.", title: "Multi-Version Design Iteration (V1 to V5 Evolution)", desc: "Managed continuous iterations across 5 design versions — refining copy nuances, adapting pricing updates, and synchronizing layout structures directly with Touch 'n Go's design and technical teams." },
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

        {/* PTV Split Flow — Bento 2-col */}
        <div>
          <SectionTag num="04" label="PTV Voucher vs. Standard Checkout Split Flow" />
          <p className="text-sm leading-relaxed mb-6 max-w-[600px]" style={{ color: BODY, lineHeight: 1.75 }}>
            The core UX fork — dynamically routing users based on real-time NRIC eligibility check results at the payment gateway step.
          </p>
          <div className="grid lg:grid-cols-2 gap-0" style={{ border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
            {/* PTV eligible */}
            <div style={{ borderRight: `1px solid ${HAIR}` }}>
              <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: "#E8F5EC" }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                <span className="font-sans text-[9px] font-semibold tracking-widest uppercase" style={{ color: "#166534" }}>
                  [PTV ELIGIBLE · RM 0 FLOW]
                </span>
              </div>
              <div className="px-6 py-6 space-y-3" style={{ backgroundColor: W }}>
                {[
                  "User confirms NRIC on eligibility screen",
                  "System validates against PTV government database",
                  "Premium auto-adjusted to RM 0",
                  "Policy confirmed — no e-wallet debit triggered",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-sans text-[9px] font-semibold flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: N, lineHeight: 1.7 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard */}
            <div>
              <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${TNG}0a` }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TNG }} />
                <span className="font-sans text-[9px] font-semibold tracking-widest uppercase" style={{ color: TNG }}>
                  [STANDARD · TNG E-WALLET DEBIT]
                </span>
              </div>
              <div className="px-6 py-6 space-y-3" style={{ backgroundColor: W }}>
                {[
                  "Non-eligible or no NRIC entered",
                  "System routes to full premium calculation",
                  "TNG e-wallet PIN confirmation triggered",
                  "Policy confirmed — standard debit processed",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="font-sans text-[9px] font-semibold flex-shrink-0 mt-0.5" style={{ color: TNG }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: N, lineHeight: 1.7 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* Version Evolution */}
        <div>
          <SectionTag num="05" label="Version Evolution — V1 → V5 Production Release" />
          <div className="overflow-x-auto">
            <div className="flex gap-0 min-w-max" style={{ border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              {[
                { v: "V1", label: "Initial Framework", desc: "Custom TNG-mirrored UI Kit. Core checkout flow established.", status: "Draft" },
                { v: "V2", label: "PTV Flow Added", desc: "Dual-purchase logic & NRIC eligibility gate integrated.", status: "Review" },
                { v: "V3", label: "Fraud Gates", desc: "Anti-fraud identity cross-referencing & error states mapped.", status: "Review" },
                { v: "V4", label: "Copy & Pricing", desc: "Malay/English compliance, dynamic price calculation updates.", status: "Staging" },
                { v: "V5", label: "Production", desc: "Final alignment with official TNG assets. Live deployment.", status: "Live" },
              ].map((ver, i) => (
                <div
                  key={ver.v}
                  className="flex flex-col"
                  style={{
                    borderRight: i < 4 ? `1px solid ${HAIR}` : "none",
                    minWidth: "168px",
                  }}
                >
                  {/* Version badge */}
                  <div
                    className="px-5 py-4"
                    style={{
                      backgroundColor: i === 4 ? N : `${N}05`,
                      borderBottom: `1px solid ${HAIR}`,
                    }}
                  >
                    <p
                      className="font-display font-light"
                      style={{ fontSize: "1.6rem", color: i === 4 ? W : N, letterSpacing: "-0.03em", lineHeight: 1 }}
                    >
                      {ver.v}
                    </p>
                    <span
                      className="font-sans text-[8px] font-semibold tracking-widest uppercase mt-1 block"
                      style={{ color: i === 4 ? C : `${N}99` }}
                    >
                      {ver.status}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="px-5 py-4 flex-1" style={{ backgroundColor: W }}>
                    <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{ver.label}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: BODY, lineHeight: 1.65 }}>{ver.desc}</p>
                  </div>
                  {/* Arrow connector */}
                  {i < 4 && (
                    <div
                      className="absolute"
                      style={{ display: "none" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="font-sans text-[9px] tracking-widest mt-3" style={{ color: `${N}80` }}>
            [VERSION EVOLUTION: V1 ──► V5 PRODUCTION RELEASE] · 5 MAJOR ITERATIONS ACROSS 3 MONTHS
          </p>
        </div>

        <Hairline />

        {/* 06 Design Process */}
        <div>
          <SectionTag num="06" label="Design Process & Systemic Pipeline" />
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-8" style={{ color: `${N}99` }}>
            [METHODOLOGY: E-WALLET PWA INTEGRATION] · [GOVERNANCE: 5-STAGE VERSION CONTROL]
          </p>

          <div className="relative">
            <div className="hidden lg:block absolute left-[calc(3rem-1px)] top-8 bottom-8 w-px" style={{ backgroundColor: HAIR }} />
            <div className="space-y-6">
              {[
                {
                  phase: "PHASE 01", tag: "DISCOVERY",
                  title: "API Discovery & Flow Reconstruction",
                  items: [
                    { title: "TNG Mini Program Parsing", desc: "Deconstructed TNG's mini program API documentation to identify accessible data fields (base data vs. eKYC data) and payment modal behaviors." },
                    { title: "Prototyping Without Official UI Kit", desc: "Built an initial custom UI Kit based on TNG's live app build to secure first-round executive alignment prior to receiving official design assets." },
                  ],
                },
                {
                  phase: "PHASE 02", tag: "LOGIC",
                  title: "Fraud Prevention & Edge-Case Mapping",
                  items: [
                    { title: "Anti-Fraud Identity Mapping", desc: "Designed validation gates ensuring that the policyholder's NRIC matched the authenticated TNG account eKYC, preventing unauthorized third-party claims." },
                    { title: "Eligibility Error States", desc: "Mapped comprehensive error and fallback screens for non-eligible PTV users, seamlessly transitioning them to standard purchase options without breaking the user journey." },
                  ],
                },
                {
                  phase: "PHASE 03", tag: "GOVERNANCE",
                  title: "Iterative Governance (V1 → V5)",
                  items: [
                    { title: "Cross-Team Collaboration", desc: "Conducted daily technical alignment sessions with engineering teams and TNG's design leads to refine information architecture, modal heights, and CTA wording." },
                    { title: "Pricing & Copy Refinements", desc: "Managed 5 version cycles addressing minor UX adjustments, dynamic price calculation updates, and localized Malay/English copy compliance." },
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

        {/* 07 Business Impact */}
        <div>
          <SectionTag num="07" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { Icon: CheckCircle2, title: "Successful V5 Production Launch", desc: "Successfully deployed Great Tenang Madani to Touch 'n Go's live app ecosystem, maintaining zero-defect UX flows through version 5." },
              { Icon: Zap, title: "Frictionless Government Subsidy Access", desc: "Enabled thousands of eligible Malaysian citizens to verify PTV status and claim subsidized micro-insurance in under 3 clicks via eKYC auto-population." },
              { Icon: RefreshCw, title: "Adaptable PWA Framework", desc: "Created a reusable embedded PWA insurance checkout architecture that GEGM now utilizes for third-party fintech partners." },
              { Icon: Globe, title: "Regional Integration Template", desc: "Established the blueprint for GEGM's multi-partner embedded insurance strategy across Southeast Asian e-wallet ecosystems." },
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
