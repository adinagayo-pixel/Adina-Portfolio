import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, Shield, Zap, RefreshCw, Users, MessageSquare,
  Lock, Sliders, Database, Layers, ArrowRight, Activity, Filter, BarChart3
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

// ── Interactive Multi-Tenant Token & Query Filter Sandbox ────────────────────
function MultiTenantTokenSandbox() {
  const [tenant, setTenant] = useState<"mobility" | "insurance" | "commerce">("mobility")
  const [filterMode, setFilterMode] = useState<"global" | "isolated">("isolated")

  const tenants = {
    mobility: {
      name: "Mobility & Delivery Co.",
      accent: "#10B981", // Emerald
      badge: "Logistics Tenant",
      termUser: "Riders & Packages",
      termMetric: "Transit Delay %",
      metricVal: "99.4% On-Time",
      queryImpact: "Indexed Driver Trips Query",
    },
    insurance: {
      name: "Regional InsurTech Co.",
      accent: "#EF4444", // Crimson
      badge: "InsurTech Tenant",
      termUser: "Policyholders",
      termMetric: "Funnel Conversion",
      metricVal: "42.8% Conversion",
      queryImpact: "Scoped Premium Ledger Query",
    },
    commerce: {
      name: "Commerce Affiliate Network",
      accent: "#3B82F6", // Cobalt
      badge: "B2B Commerce Tenant",
      termUser: "Affiliate Partners",
      termMetric: "Commission Payouts",
      metricVal: "$124,500 Disbursed",
      queryImpact: "Isolated Tier Commission Query",
    },
  }

  const active = tenants[tenant]

  return (
    <div className="my-10 p-6 rounded-2xl bg-[#0f1738] border border-white/10 text-white shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={14} className="text-[#DB3E8C]" />
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
              INTERACTIVE DEMO // MULTI-TENANT TOKEN & QUERY SANDBOX
            </span>
          </div>
          <h3 className="font-display text-lg lg:text-xl font-bold mt-1 text-white">
            Semantic Token Swapping & Isolated Date Filter Engine
          </h3>
        </div>

        {/* Tenant Selector */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
          {(["mobility", "insurance", "commerce"] as const).map((tKey) => (
            <button
              key={tKey}
              onClick={() => setTenant(tKey)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                tenant === tKey
                  ? "bg-white text-black shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tKey}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Backoffice Dashboard Shell */}
      <div className="p-6 rounded-xl bg-[#19244E] border border-white/10 space-y-6 transition-all duration-300">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: active.accent }} />
            <span className="font-bold text-sm text-white">{active.name}</span>
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider text-white/90"
              style={{ backgroundColor: `${active.accent}33`, border: `1px solid ${active.accent}66` }}
            >
              {active.badge}
            </span>
          </div>

          {/* Filter Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Filter Strategy:</span>
            <button
              onClick={() => setFilterMode(filterMode === "global" ? "isolated" : "global")}
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                filterMode === "isolated"
                  ? "bg-[#22c55e]/20 border border-[#22c55e]/50 text-[#22c55e]"
                  : "bg-red-500/20 border border-red-500/50 text-red-400"
              }`}
            >
              <Filter size={10} /> {filterMode === "isolated" ? "Isolated Scoped Filter (Safe)" : "Global Date Filter (Risk)"}
            </button>
          </div>
        </div>

        {/* Dashboard Metric Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1">
            <span className="text-[9px] text-white/50 uppercase tracking-widest block">Entity Focus</span>
            <span className="text-sm font-bold text-white block">{active.termUser}</span>
            <span className="text-[10px] text-white/40 block">Mapped Taxonomy</span>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1">
            <span className="text-[9px] text-white/50 uppercase tracking-widest block">{active.termMetric}</span>
            <span className="text-base font-bold block" style={{ color: active.accent }}>{active.metricVal}</span>
            <span className="text-[10px] text-white/40 block">Dynamic Semantic Token</span>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1">
            <span className="text-[9px] text-white/50 uppercase tracking-widest block">Backend Query Performance</span>
            <span className={`text-xs font-bold block ${filterMode === "isolated" ? "text-[#22c55e]" : "text-red-400"}`}>
              {filterMode === "isolated" ? "⚡ < 80ms Latency (Pass)" : "⚠️ High Latency / Timeout Risk"}
            </span>
            <span className="text-[10px] text-white/40 block">{active.queryImpact}</span>
          </div>
        </div>

        {/* Filter Impact Status Banner */}
        <div className={`p-4 rounded-lg text-xs leading-relaxed flex items-start gap-3 ${
          filterMode === "isolated"
            ? "bg-[#22c55e]/10 border border-[#22c55e]/30 text-white/90"
            : "bg-red-500/10 border border-red-500/30 text-white/90"
        }`}>
          <Database size={16} className={`shrink-0 mt-0.5 ${filterMode === "isolated" ? "text-[#22c55e]" : "text-red-400"}`} />
          <div>
            <span className="font-bold block mb-0.5">
              {filterMode === "isolated"
                ? "Track B Architecture: Scoped Chart Date Picker Enabled"
                : "Unscoped Global Filter Friction Risk"}
            </span>
            <p className="text-white/70">
              {filterMode === "isolated"
                ? "Binding chart metrics to an isolated weekly/monthly bucket prevents full historical database table scans while delivering instant analytical fidelity for enterprise decision makers."
                : "Binding page-wide global date ranges directly to heavy multi-product sales aggregations risks database query timeouts across historical multi-tenant logs."}
            </p>
          </div>
        </div>
      </div>

      <p className="font-sans text-[10px] text-white/50 text-center italic">
        * Demonstrating Track A semantic token swapping (emerald, crimson, cobalt) and Track B isolated filtering logic negotiation with backend squads.
      </p>
    </div>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function BackofficeCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: S, fontFamily: "var(--font-sans)" }}>

      {/* Sticky Top Bar */}
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
          className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: N }}
        >
          <ArrowLeft size={12} /> Back to Portfolio
        </button>
        <MonoTag>Multi-Tenant Enterprise Backoffice Architecture</MonoTag>
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="sticky top-[53px] z-40 px-8 lg:px-16 py-2.5 bg-[#0e1635] text-white/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-sans">
        <span className="font-bold tracking-widest text-[#DB3E8C] uppercase text-xs">
          QUICK JUMP
        </span>
        <div className="flex items-center gap-6 overflow-x-auto">
          <a href="#summary" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-medium">
            01. Executive Summary
          </a>
          <a href="#challenge" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-medium">
            02. Tenant Diversity
          </a>
          <a href="#solution" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-medium">
            03. Dual-Track Engine
          </a>
          <a href="#deepdive" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-medium">
            04. Architectural Decisions
          </a>
          <a href="#impact" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-xs font-bold text-[#DB3E8C]">
            05. Impact & "So What" ↗
          </a>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 05</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>WHITE-LABEL & ANALYTICS ARCHITECTURE</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>ENTERPRISE BACKOFFICE · 2025</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            Multi-Tenant Enterprise Backoffice Architecture
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Scaling White-Label Operations & Real-Time Data Dashboards Under Lean Constraints.
          </p>

          {/* Confidentiality Notice */}
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
            <Lock size={15} className="shrink-0 mt-0.5 text-amber-700" />
            <div>
              <strong className="font-bold text-amber-950 block">Confidentiality & NDA Notice:</strong>
              To respect non-disclosure agreements (NDAs), all proprietary logos, client names, commercial metrics, and specific partner identifiers have been sanitized or replaced with conceptual aliases and placeholder data.
            </div>
          </div>
        </div>

        {/* Hero Metadata Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-xs">
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Solo Product Designer & System Logic Architect
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Industry Ecosystem
            </span>
            <span className="font-semibold text-[#19244E]">
              SuperApp Platforms, InsurTech & B2B Affiliates
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Core Focus Areas
            </span>
            <span className="font-semibold text-[#19244E]">
              White-Label Engine, Dynamic Tokens & Analytics
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Deployment Velocity
            </span>
            <span className="font-semibold text-[#19244E]">
              1–3 Hour Tenant Setup · Zero Query Timeouts
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="px-8 lg:px-16 py-16 max-w-6xl mx-auto space-y-20">

        {/* 01 Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Summary & Dual-Track Model" />
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-2xl font-bold text-[#22c55e] block font-display">1–3 Hours</span>
              <h4 className="font-semibold text-[#19244E] text-sm">Tenant Setup Velocity</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Track A established semantic token swapping enabling engineering to deploy standard white-label backoffices autonomously.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-2xl font-bold text-[#DB3E8C] block font-display">Dual-Track</span>
              <h4 className="font-semibold text-[#19244E] text-sm">Execution Engine</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Separated rapid white-label skinning from deep architectural query negotiations to avoid bottlenecking engineering.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-2xl font-bold text-[#19244E] block font-display">0 Timeouts</span>
              <h4 className="font-semibold text-[#19244E] text-sm">Backend Query Safety</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Proposed isolated date filtering for high-cardinality charts, preventing historical DB table scans and latency spikes.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 02 The Challenge */}
        <div>
          <SectionTag id="challenge" num="02" label="The Challenge: Operational Diversity Across Tenants" />
          <p className="font-display font-light leading-relaxed mb-10 text-xl text-[#19244E]">
            Operating as the sole product designer within a lean product team meant supporting multiple enterprise partners simultaneously without the overhead of heavy, paid design management suites.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Mobility & Delivery Ecosystem",
                desc: "High-volume claim lifecycle tracking, reason-for-delay breakdowns (transit damage vs. lost packages), and turnaround-time service level metrics.",
              },
              {
                title: "Regional InsurTech Ecosystem",
                desc: "Comprehensive policy conversion funnels, multi-channel product performance tracking, and agent contribution ledger breakdowns.",
              },
              {
                title: "Affiliate & Commerce Networks",
                desc: "Localized structures for partner tiering, commission reconciliations, multi-level referral trees, and instant payout validation.",
              },
            ].map((c) => (
              <div key={c.title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm space-y-3">
                <div className="w-8 h-8 rounded bg-[#DB3E8C]/10 border border-[#DB3E8C]/20 flex items-center justify-center text-[#DB3E8C]">
                  <Layers size={16} />
                </div>
                <h4 className="font-bold text-[#19244E] text-base">{c.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Heavy Aggregation Callout */}
          <div className="p-6 bg-[#19244E] text-white rounded-xl flex items-start gap-4">
            <Database size={20} className="text-[#DB3E8C] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Heavy Aggregation vs. Database Constraints</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Enterprise stakeholders frequently requested complex multi-variable dashboard charts. Designing these without technical alignment risked database query timeouts, high latency, and costly front-to-back rework.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 03 Dual Track Solution */}
        <div>
          <SectionTag id="solution" num="03" label="The Solution: Dual-Track Delivery Engine" />
          <p className="font-display font-light leading-relaxed mb-8 text-xl text-[#19244E]">
            To balance rapid market turnaround with structural feasibility, the design workflow was split into two distinct execution tracks.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 bg-white border border-[#10B981]/40 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider">TRACK A</span>
                <span className="text-[10px] font-bold bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded">1–3 HOUR SETUP</span>
              </div>
              <h4 className="text-lg font-bold text-[#19244E]">Rapid White-Label Skinning</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#10B981]" /> Semantic Token Swapping</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#10B981]" /> Domain Taxonomy Alignment</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#10B981]" /> Direct-to-Dev Baseline Handoff</li>
              </ul>
            </div>

            <div className="p-6 bg-white border border-[#3B82F6]/40 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">TRACK B</span>
                <span className="text-[10px] font-bold bg-[#3B82F6]/10 text-[#3B82F6] px-2 py-0.5 rounded">CROSS-FUNCTIONAL TRIAD</span>
              </div>
              <h4 className="text-lg font-bold text-[#19244E]">Deep Architectural Exploration</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#3B82F6]" /> Metric Discovery & Funnel Exploration</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#3B82F6]" /> Isolated vs. Global Date Filtering</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[#3B82F6]" /> Index-Safe Query Scoping</li>
              </ul>
            </div>
          </div>

          {/* Interactive Token & Filter Sandbox */}
          <MultiTenantTokenSandbox />
        </div>

        <Hairline />

        {/* 04 Architectural Decisions */}
        <div>
          <SectionTag id="deepdive" num="04" label="Deep Dive: Key Architectural Decisions" />

          <div className="space-y-8">
            <div className="p-6 bg-white border border-gray-200 rounded-xl space-y-4">
              <h4 className="font-bold text-lg text-[#19244E]">Track A: Rapid White-Label Theming Engine</h4>
              <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600 pt-2">
                <div className="p-4 bg-[#F9FAFB] rounded-lg space-y-1">
                  <strong className="text-[#19244E] font-bold block">Semantic Tokenization</strong>
                  <p>Core layouts and table components were mapped to semantic color tokens. Swapping themes took under 1 hour while preserving WCAG AA contrast.</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg space-y-1">
                  <strong className="text-[#19244E] font-bold block">Taxonomy & Menu Reconfiguration</strong>
                  <p>Menu headers dynamically adapted to match client terminology (Policyholder vs. Member, Agent vs. Affiliate Partner).</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg space-y-1">
                  <strong className="text-[#19244E] font-bold block">Direct-to-Dev Velocity</strong>
                  <p>Clear structural logic allowed engineering to deploy baseline partner portals autonomously without design bottlenecking.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-xl space-y-4">
              <h4 className="font-bold text-lg text-[#19244E]">Track B: Data-First Visualization & Query Negotiation</h4>
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#F9FAFB] rounded-lg border border-gray-100">
                  <span className="font-bold text-[#DB3E8C] block mb-1">End-to-End Funnel Architecture</span>
                  <p className="text-gray-600 leading-relaxed">
                    Mapped out multi-stage drop-off funnels (Landing Page → Plan View → Data Verification → Payment Gateway → Submission), converting raw transactional data into actionable operational insight.
                  </p>
                </div>

                <div className="p-4 bg-[#F9FAFB] rounded-lg border border-gray-100 space-y-2">
                  <span className="font-bold text-[#19244E] block">Isolated vs. Global Date Filtering Negotiation</span>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 bg-red-50 text-red-900 rounded border border-red-200">
                      <strong>The Friction:</strong> Global date ranges triggered massive aggregations across historical records, risking query timeouts.
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-900 rounded border border-blue-200">
                      <strong>The Solution:</strong> Scoped the Product Performance chart with an independent, isolated date filter defaulting to weekly buckets.
                    </div>
                    <div className="p-3 bg-green-50 text-green-900 rounded border border-green-200">
                      <strong>The Consensus:</strong> Backend engineers approved the isolated strategy, delivering instant page loads without sacrificing analytical utility.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Impact & So What */}
        <div>
          <SectionTag id="impact" num="05" label="Key Impact & The 'So What'" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                ENTERPRISE SYSTEM IMPACT & "SO WHAT"
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Scaled multi-tenant operations with <span className="font-bold text-[#DB3E8C]">1–3 hour turnaround</span> & zero backend query timeouts.
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-2xl">
              By separating rapid white-label skinning from deep data query negotiations, we enabled engineering squads to ship partner portals autonomously while protecting database performance.
            </p>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-[#22c55e] mb-1">1–3h Turnaround</span>
                <p className="text-white/60">Autonomous white-label backoffice deployment by dev squads.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">Dual-Track Engine</span>
                <p className="text-white/60">Structured separation between skinning & deep data architecture.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-xl text-[#DB3E8C] mb-1">Zero Query Timeouts</span>
                <p className="text-white/80 font-medium">Isolated date filtering protecting backend database limits.</p>
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
                "This project demonstrates my ability to design scalable design system architecture under lean constraints while actively collaborating with backend engineers on database query constraints. It proves I can protect system performance and accelerate dev velocity without inflating design headcount."
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Back CTA Bar */}
      <div style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: W }}>
        <div className="px-8 lg:px-16 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            {onPrev && (
              <button
                onClick={onPrev}
                className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
                style={{ color: N }}
              >
                <ArrowLeft size={12} /> Previous Case
              </button>
            )}
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
              style={{ color: N }}
            >
              Back to Portfolio
            </button>
          </div>
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
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
