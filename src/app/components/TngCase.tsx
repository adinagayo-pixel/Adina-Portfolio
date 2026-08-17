import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, Shield, Zap, RefreshCw, GitBranch, Users, MessageSquare, Sparkles, AlertTriangle
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

function StateEdgeCaseSwitcher() {
  const [activeState, setActiveState] = useState<"valid" | "error" | "timeout">("valid")

  const states = {
    valid: {
      title: "Valid State (SSO Auto-Filled)",
      badge: "HTTP 200 · SUCCESS",
      badgeColor: "#22c55e",
      desc: "Native eKYC parameters auto-populate NRIC & Full Name fields. Zero manual input required from user.",
      preview: {
        nric: "920412-14-5821 (Auto-filled)",
        status: "Eligible for RM75 PTV Voucher Subsidy",
        buttonText: "Proceed to RM0 Checkout",
        buttonBg: "#22c55e",
      }
    },
    error: {
      title: "Validation Error State (Invalid NRIC)",
      badge: "HTTP 422 · VALIDATION ERROR",
      badgeColor: "#ef4444",
      desc: "Invalid NRIC format triggers inline helper text without page reload, keeping user in context with retry prompt.",
      preview: {
        nric: "920412-14-XXXX (Format Error)",
        status: "NRIC number not found in Government PTV registry",
        buttonText: "Retry NRIC Check",
        buttonBg: "#ef4444",
      }
    },
    timeout: {
      title: "Network Timeout / Retry State",
      badge: "HTTP 504 · GATEWAY TIMEOUT",
      badgeColor: "#f59e0b",
      desc: "API handshake latency fallback: caches draft state locally, displays offline status toast with 1-click resend.",
      preview: {
        nric: "920412-14-5821 (Pending Sync)",
        status: "Connection timed out. Local draft saved safely.",
        buttonText: "Tap to Re-sync Verification",
        buttonBg: "#f59e0b",
      }
    }
  }

  const cur = states[activeState]

  return (
    <div className="my-8 rounded-xl border border-white/10 bg-[#0f172a] overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-[#1e293b] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[9px] font-bold tracking-widest text-[#DB3E8C] uppercase block">
            INTERACTIVE EDGE CASE LOGIC ARCHITECTURE
          </span>
          <h4 className="text-white font-sans text-sm font-bold mt-0.5">
            Checkout State & Error Handling Switcher
          </h4>
        </div>
        {/* Toggle Switcher Tabs */}
        <div className="flex bg-[#0f172a] p-1 rounded-lg border border-white/10 gap-1">
          {(["valid", "error", "timeout"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setActiveState(st)}
              className={`px-3 py-1.5 rounded text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeState === st
                  ? "bg-[#DB3E8C] text-white shadow-md"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              State: {st}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive State Canvas */}
      <div className="p-6 md:p-8 bg-[#0a0f1d] grid md:grid-cols-2 gap-6 items-center">
        {/* Left Specs */}
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[9px] font-bold tracking-wider uppercase mb-3" style={{ backgroundColor: `${cur.badgeColor}20`, color: cur.badgeColor, border: `1px solid ${cur.badgeColor}40` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cur.badgeColor }} />
            {cur.badge}
          </div>
          <h3 className="text-white font-display text-lg font-bold mb-2">{cur.title}</h3>
          <p className="text-white/70 text-xs font-sans leading-relaxed mb-4">{cur.desc}</p>
          <div className="text-[10px] font-mono text-white/40 bg-black/40 p-3 rounded border border-white/5">
            // Developer Specs & Fallback Strategy<br />
            {activeState === "valid" && `state.status = 'READY'; api.sync('SSO_OK');`}
            {activeState === "error" && `state.error = 'NRIC_NOT_FOUND'; ui.showInlineError();`}
            {activeState === "timeout" && `state.offline = true; storage.saveDraft(); ui.showRetryToast();`}
          </div>
        </div>

        {/* Right UI State Mockup Frame */}
        <div className="bg-[#1e293b] p-5 rounded-xl border border-white/10 shadow-xl space-y-3">
          <div className="text-[9px] font-sans font-bold text-white/50 tracking-wider uppercase flex justify-between">
            <span>Embedded PWA Interface</span>
            <span>Step 2/3</span>
          </div>
          <div className="p-3 bg-black/40 rounded border border-white/10 space-y-1">
            <span className="text-[8px] text-white/40 uppercase font-sans">Identity NRIC</span>
            <p className="text-xs font-mono font-semibold text-white">{cur.preview.nric}</p>
          </div>
          <div className="p-3 rounded border" style={{ backgroundColor: `${cur.badgeColor}15`, borderColor: `${cur.badgeColor}30` }}>
            <p className="text-[10px] font-sans font-bold" style={{ color: cur.badgeColor }}>
              {cur.preview.status}
            </p>
          </div>
          <button className="w-full py-2.5 rounded font-sans text-xs font-bold text-white uppercase tracking-wider shadow" style={{ backgroundColor: cur.preview.buttonBg }}>
            {cur.preview.buttonText}
          </button>
        </div>
      </div>
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
        <MonoTag>TNG eWallet × GEGM · PWA InsurTech</MonoTag>
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="sticky top-[53px] z-40 px-8 lg:px-16 py-2.5 bg-[#0e1635] text-white/70 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
        <span className="font-bold tracking-widest text-[#DB3E8C] uppercase text-[9px]">
          QUICK JUMP
        </span>
        <div className="flex items-center gap-6 overflow-x-auto">
          <a href="#summary" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            01. Takeaways
          </a>
          <a href="#challenge" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            02. Challenge
          </a>
          <a href="#architecture" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            03. Edge Cases
          </a>
          <a href="#ds-adaptation" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium text-[#DB3E8C]">
            04. DS Adaptation
          </a>
          <a href="#evolution" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            05. V1–V5 Iterations
          </a>
          <a href="#impact" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-bold text-[#DB3E8C]">
            06. Impact & "So What" ↗
          </a>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 01</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>FINTECH & EMBEDDED MICRO-INSURANCE</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>TOUCH 'N GO × GEGM · 2024</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            Seamless Micro-Insurance & Government Subsidy Integration
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            An embedded PWA architecture built inside Malaysia's leading e-wallet ecosystem (20M+ users), leveraging native SSO and eKYC data pipelines.
          </p>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: BODY, lineHeight: 1.8 }}>
            Designing and shipping 5 live production releases of Great Tenang Madani within Touch 'n Go eWallet, integrating automated Perlindungan Tenang Voucher (PTV) government subsidy checks and zero-friction eKYC auto-population.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-xs">
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Lead Product Designer & Systems Architect
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Partners
            </span>
            <span className="font-semibold text-[#19244E]">
              Touch 'n Go × Great Eastern (MY Market)
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Timeline & Delivery
            </span>
            <span className="font-semibold text-[#19244E]">
              3 Months · 5 Design Iterations → 1 Production Release (V5)
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Platforms & Architecture
            </span>
            <span className="font-semibold text-[#19244E]">
              Embedded PWA / Native SSO / eKYC
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
              <p className="text-[11px] leading-relaxed text-white/80">Complex multi-party eKYC data mapping & insurance checkout inside Malaysia's top e-wallet (20M+ users).</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <span className="block text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1.5">02 · Core Constraints</span>
              <p className="text-[11px] leading-relaxed text-white/80">3-month deadline, native eWallet webview constraints, PTV government subsidy voucher validation APIs.</p>
            </div>
            <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
              <span className="block text-[9px] font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
              <p className="text-[11px] font-semibold text-white leading-relaxed">Lead UI/UX Designer & Systems Integrator (PWA Architecture, Data Flows & Specs).</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
              <span className="block text-[9px] font-bold tracking-widest text-white/40 uppercase mb-1.5">04 · Key Impact</span>
              <p className="text-[11px] font-semibold text-white leading-relaxed">Refined through 5 iterative versions before shipping the final zero-defect release live to 20M+ TNG users.</p>
            </div>
          </div>
        </div>

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-20">

        {/* 01 Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Partner", val: "Great Eastern General Insurance Malaysia (GEGM) × Touch 'n Go eWallet" },
              { label: "Role & Team", val: "Lead UI/UX Designer & PWA Systems Researcher (1-Person Design Ownership)" },
              { label: "Target Audience", val: "Touch 'n Go eWallet users (20M+ userbase) eligible for PTV government micro-insurance subsidies" },
              { label: "Core Stack", val: "Figma · FigJam · Embedded PWA Webview · TNG SSO / eKYC Schema · Photoshop" },
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
          <SectionTag id="challenge" num="02" label="The Strategic Challenge" />
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

        {/* 03 System & Interaction Architecture */}
        <div>
          <SectionTag id="architecture" num="03" label="System & Interaction Architecture" />

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

          <div className="space-y-3 mb-8">
            {[
              { num: "1.", title: "Zero-Friction Identity Auto-Fill (SSO + eKYC)", desc: "Mapped TNG's native Single Sign-On (SSO) and eKYC data schema (base user profile, NRIC, full name, age parameters) directly into the embedded PWA forms, eliminating manual typing friction and preventing identity spoofing." },
              { num: "2.", title: "Automated PTV Voucher Eligibility Verification", desc: "Engineered an inline identity validation screen where users input/confirm their NRIC to instantly check government subsidy eligibility. The system automatically adjusts premium totals to RM 0 (for eligible PTV recipients) or routes to standard TNG e-wallet debit." },
              { num: "3.", title: "Multi-Version Design Iteration (V1 to V5 Evolution)", desc: "Managed continuous iterations across 5 design versions, refining copy nuances, adapting pricing updates, and synchronizing layout structures directly with Touch 'n Go's design and technical teams." },
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

          {/* Interactive State & Edge Case Switcher Widget */}
          <StateEdgeCaseSwitcher />
        </div>

        <Hairline />

        {/* PTV Split Flow — Bento 2-col */}
        <div>
          <SectionTag num="04" label="PTV Voucher vs. Standard Checkout Split Flow" />
          <p className="text-sm leading-relaxed mb-6 max-w-[600px]" style={{ color: BODY, lineHeight: 1.75 }}>
            The core UX fork, dynamically routing users based on real-time NRIC eligibility check results at the payment gateway step.
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
                  "Policy confirmed: no e-wallet debit triggered",
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
                  "Policy confirmed: standard debit processed",
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

        {/* 04 Cross-Team Design System Adaptation */}
        <div id="ds-adaptation" className="scroll-mt-24">
          <SectionTag num="04" label="Cross-Team Design System Adaptation" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB3E8C] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                DESIGN SYSTEM GOVERNANCE // CROSS-TEAM ADAPTATION
              </span>
            </div>
            <h3 className="font-display text-xl lg:text-2xl font-bold text-white">
              Adapting & Extending TNG's Ecosystem for InsurTech Mini-Programs
            </h3>
            <p className="font-sans text-xs text-white/80 leading-relaxed max-w-3xl">
              Worked directly with Touch 'n Go's internal design team to adapt and extend their existing design system for the embedded insurance mini-program — ensuring visual and interaction consistency across a 20M+ user ecosystem while introducing new insurance-specific flows.
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <strong className="text-[#DB3E8C] font-bold block mb-1">Design System Alignment</strong>
                <p className="text-white/60 text-[11px]">Seamlessly integrated TNG typography, color tokens, and modal primitives.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <strong className="text-white font-bold block mb-1">Insurance Flow Primitives</strong>
                <p className="text-white/60 text-[11px]">Extended baseline mini-program specs to support multi-product coverage selection.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <strong className="text-[#22c55e] font-bold block mb-1">20M+ User Consistency</strong>
                <p className="text-white/60 text-[11px]">Zero-friction transition between native eWallet hub & insurance checkout.</p>
              </div>
            </div>
          </div>

          {/* The Trickiest Decision: Exit Flow After Payment */}
          <div className="mt-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-950 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-700" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-amber-800">
                THE TRICKIEST DECISION // EXIT FLOW AFTER PAYMENT
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-amber-950">
              Balancing Client Intent Against Platform-Native Webview Behavior
            </h3>
            <p className="text-xs leading-relaxed text-amber-900">
              One design conflict didn't come from technical constraints — it came from balancing client intent against platform-native behavior.
            </p>
            <p className="text-xs leading-relaxed text-amber-900">
              After a successful payment, our web view (embedded inside TNG's mini program) had a hard technical limitation: once a user exited, they couldn't be routed back into the purchase flow — the transaction was already closed. GEGM wanted an explicit "Back to App" or "Close" button on the success screen to make the exit path obvious for users.
            </p>
            <p className="text-xs leading-relaxed text-amber-900">
              <strong>The problem:</strong> TNG's mini program already had a native X icon in the header by default — but it was subtle enough that users might miss it. Adding a custom "Back" button risked a worse outcome: users assuming they could return to an earlier step (like re-selecting a product) when the transaction was already final. That mismatch between expectation and reality would create confusion, not clarity.
            </p>
            <p className="text-xs leading-relaxed text-amber-950 font-semibold p-3 rounded bg-amber-500/15 border border-amber-500/20">
              <strong>The Consensus:</strong> After discussion with TNG's team, we decided against introducing a custom exit element and relied on the platform's existing X icon instead — trusting the native pattern users already recognized from other TNG mini programs, rather than adding a new element that could contradict it.
            </p>
          </div>
        </div>

        <Hairline />

        {/* Version Evolution */}
        <div>
          <SectionTag id="evolution" num="05" label="5 Design Iterations → 1 Final Production Release (V5)" />
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
                      className="font-sans text-[9px] font-semibold tracking-widest uppercase mt-1 block"
                      style={{ color: i === 4 ? C : `${N}99` }}
                    >
                      {ver.status}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="px-5 py-4 flex-1 flex flex-col justify-between" style={{ backgroundColor: W }}>
                    <div>
                      <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{ver.label}</p>
                      <p className="text-[11px] leading-relaxed" style={{ color: BODY, lineHeight: 1.65 }}>{ver.desc}</p>
                    </div>
                    {ver.v === "V3" && (
                      <p className="text-[10px] italic mt-3 p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 leading-tight font-sans">
                        "The trickiest part wasn't the happy path — it was designing for the edge cases TNG's compliance team kept surfacing one by one."
                      </p>
                    )}
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
            [DESIGN ITERATIONS: V1 ──► V5 FINAL PRODUCTION RELEASE] · 5 ITERATIVE VERSIONS BEFORE LIVE RELEASE
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
                    { title: "Prototyping Without Official UI Kit", desc: "Built an initial custom UI Kit based on TNG's live app build to secure first-round executive alignment prior to receiving official design assets. There was a real risk this reverse-engineered kit wouldn't match TNG's actual system once it arrived — but greenlighting the concept early meant we didn't lose a single week of the 3-month timeline waiting for assets." },
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
          <div className="grid lg:grid-cols-2 gap-4 mb-10">
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

          {/* 08 Impact & The "So What" Closing Box */}
          <div id="impact" className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                ENTERPRISE SYSTEM IMPACT & "SO WHAT"
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Refined through <span className="font-bold text-[#DB3E8C]">5 design iterations</span> before shipping the final <span className="font-bold text-[#DB3E8C]">zero-defect release</span> live to 20M+ TNG users.
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-2xl">
              By mapping native eKYC parameters and engineering automated PTV government subsidy verification, we reduced insurance checkout friction from 8 minutes down to 3 clicks.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">5 Iterations → 1 Release</span>
                <p className="text-white/60">Continuous evolution refining pricing, terms & PWA performance.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">RM 0 Subsidy Flow</span>
                <p className="text-white/60">Automated NRIC eligibility verification for government PTV vouchers.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-xl text-[#DB3E8C] mb-1">Zero-Friction SSO</span>
                <p className="text-white/80 font-medium">Auto-filled eKYC data eliminating typing errors.</p>
              </div>
            </div>

            {/* What I Learned */}
            <div className="mt-6 p-5 rounded-xl bg-white/5 border border-white/10 text-white space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#22c55e]" />
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-xs font-sans leading-relaxed text-white/90 italic">
                "Working inside TNG's ecosystem taught me that enterprise design isn't about creative freedom — it's about earning trust fast enough that your team lets you make decisions without them re-checking every pixel. By V5, TNG's design leads stopped asking for revision rounds on layout and only reviewed copy — that shift in trust was the real milestone of this project."
              </p>
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
                "This demonstrates my ability to navigate enterprise complexity across 20M+ users—balancing strict eKYC compliance and government API constraints while delivering zero-defect specs. It proves I can collaborate seamlessly with engineering squads and refine product logic across multiple live production iterations."
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

    </div>
  )
}
