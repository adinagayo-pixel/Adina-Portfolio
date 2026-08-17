import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  Smartphone, BarChart2, Camera, MessageSquare,
  Shield, Database, MapPin, AlertCircle, Users
} from "lucide-react"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"
const GOV = "#0F3460" // Deeper civic navy accent

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

export default function ElectionCase({ onBack, onNext, onPrev }: Props) {
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
        <MonoTag>Indonesian Election 2024 · 38 Provinces / 820K+ Polling Stations</MonoTag>
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="sticky top-[53px] z-40 px-8 lg:px-16 py-2.5 bg-[#0e1635] text-white/70 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
        <span className="font-bold tracking-widest text-[#DB3E8C] uppercase text-[9px]">
          QUICK JUMP
        </span>
        <div className="flex items-center gap-6 overflow-x-auto">
          <a href="#summary" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            01. Executive Summary
          </a>
          <a href="#challenge" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            02. Core Challenge
          </a>
          <a href="#architecture" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            03. System Architecture
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
            <MonoTag accent>CASE STUDY 04</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>CIVIC TECH & NATIONAL DATA CONCURRENCY</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>INDONESIAN ELECTION 2024</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            National Quick Count & Real-Time Monitoring System
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Tracking vote tabulation across 820,000+ polling stations and 38 provinces in real-time with automated Saint-Laguë seat projections.
          </p>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: BODY, lineHeight: 1.8 }}>
            An end-to-end multi-level election monitoring system for Indonesia's 2024 Presidential & Legislative Elections, combining a field witness Progressive Web App (PWA), OCR C-Hasil form scanning, and an executive CMS for national party leadership.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-xs">
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Solo UX/UI Designer & Systems Architect
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Territory
            </span>
            <span className="font-semibold text-[#19244E]">
              Indonesian Political Party (National)
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              National Concurrency
            </span>
            <span className="font-semibold text-[#19244E]">
              820,000+ TPS · 38 Provinces · 127 PPLN
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Critical Execution Window
            </span>
            <span className="font-semibold text-[#19244E]">
              48-Hour Live Tabulation Window
            </span>
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
              { label: "Client & Sector", val: "Indonesian Political Party × Public Sector / Election Services" },
              { label: "Role & Team", val: "Solo UX/UI Designer & System Logic Architect: 1-Person Design Team" },
              { label: "System Suite", val: "Field Witness Mobile PWA + Executive Monitoring Web CMS" },
              { label: "Core Stack", val: "Figma · FigJam · OCR Engine Specs · WhatsApp API · Angular System Explorations" },
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
          <p className="font-display font-light leading-relaxed mb-10" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: N, letterSpacing: "-0.005em", lineHeight: 1.65, maxWidth: "700px" }}>
            Capturing paper-based C-Hasil election forms from over 820,000 polling stations within a high-stakes 48-hour critical window, establishing early vote trends, legislative seat projections, and strategic party intelligence before the official March 20 tally.
          </p>

          {/* Critical window callout */}
          <div
            className="px-6 py-5 mb-6 flex gap-5"
            style={{ backgroundColor: `${GOV}`, border: `1px solid rgba(255,255,255,0.08)`, borderRadius: "4px" }}
          >
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}25`, border: `1px solid ${C}40`, borderRadius: "4px" }}>
              <AlertCircle size={13} style={{ color: C }} />
            </div>
            <div>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-2" style={{ color: C }}>
                [CRITICAL WINDOW: FEBRUARY 14–15, 2024]
              </p>
              <p className="text-sm text-white leading-relaxed" style={{ lineHeight: 1.75 }}>
                Election day through the 48-hour post-election quick count window required uninterrupted, real-time data ingestion from 820,000+ polling stations, a zero-downtime constraint with no tolerance for data entry bottlenecks or system failures.
              </p>
            </div>
          </div>

          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Technical Constraints]
          </p>
          <div className="space-y-3">
            {[
              { Icon: Smartphone, title: "Critical Speed & Precision: \"Fast & Accurate\"", desc: "Field witnesses needed an input flow optimized for rapid completion under chaotic polling station conditions, including rural areas with poor internet connectivity and low tech literacy." },
              { Icon: Camera, title: "Dual Data-Input Integrity", desc: "Designing a dual-role workflow (Image Uploaders at TPS vs. Verifiers at regional HQ), with OCR automated parsing for photo-captured forms and manual entry fallbacks for offline scenarios." },
              { Icon: BarChart2, title: "Complex Legislative Calculation Logic", desc: "The Web CMS needed to automatically process Saint-Laguë vote-to-seat allocation algorithms, Parliamentary Threshold filters, and multi-candidate ranking tables across every DAPIL district in real time." },
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
          <SectionTag id="architecture" num="03" label="System & Data Pipeline Architecture" />

          {/* Flow diagram */}
          <div className="mb-8 p-6 overflow-x-auto" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <MonoTag>[Three-Stage National Data Pipeline]</MonoTag>
            <div className="flex items-center mt-5 min-w-max">
              {[
                { label: "Witness Mobile PWA", sub: "Location-locked C-Hasil capture & fallback", icon: Smartphone },
                { label: "OCR & WA Verification", sub: "Auto-parse votes · WhatsApp alerts", icon: MessageSquare },
                { label: "Executive Web CMS", sub: "Heat map · Saint-Laguë projections", icon: BarChart2 },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-start gap-3 min-w-[210px]">
                      <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: i === 1 ? `${C}10` : `${GOV}08`, border: `1px solid ${i === 1 ? `${C}30` : HAIR}`, borderRadius: "4px" }}>
                        <Icon size={14} style={{ color: i === 1 ? C : GOV }} />
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
              { num: "1.", title: "Location-Predefined Mobile Witness PWA", desc: "Designed a lightweight PWA where polling station (TPS) witnesses were pre-assigned location contexts by super-admins, reducing data entry steps. Witnesses simply captured C-Hasil form photos or completed manual fallbacks when connectivity dropped." },
              { num: "2.", title: "OCR Integration & WhatsApp Verification Engine", desc: "Integrated OCR to automatically extract candidate numbers and party vote totals from uploaded form photos. The pipeline featured WhatsApp API integration for real-time verification alerts, system announcements, and credential blasts to regional leaders." },
              { num: "3.", title: "Real-Time Executive Monitoring Web CMS", desc: "Engineered a high-density Web CMS featuring an interactive national heat map, live presidential quick count gauges, legislative seat allocation tables (Saint-Laguë formula), and regional progress trackers (Total TPS, Verified vs. Pending) across 38 provinces." },
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

        {/* 04 System Deliverables */}
        <div>
          <SectionTag num="04" label="System Deliverables & Module Breakdown" />
          <div className="grid lg:grid-cols-2 gap-6">

            {/* PWA Suite */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${GOV}06` }}>
                <div className="flex items-center gap-2">
                  <Smartphone size={12} style={{ color: C }} />
                  <MonoTag accent>[A] Field Witness & Verifier PWA Suite</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Mobile C-Hasil Data Entry", desc: "Dual-state camera capture and input fields for Presidential (Pilpres) and Legislative (DPR RI / DPRD) vote tallies, optimized for low-connectivity environments." },
                  { title: "Photo Verification & Rejection Module", desc: "Admin verification interface for regional supervisors to cross-examine uploaded C-Hasil photos against OCR-extracted data before final database committal." },
                  { title: "Regional Input Progress Tracker", desc: "Live status lists for regional captains to monitor data entry percentages across sub-districts (Kecamatan / Kelurahan) in real time." },
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

            {/* Executive CMS */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${GOV}06` }}>
                <div className="flex items-center gap-2">
                  <BarChart2 size={12} style={{ color: C }} />
                  <MonoTag accent>[B] Executive Command & Analytics Web CMS</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Interactive National Heat Map", desc: "Real-time visual representation of vote distributions across all 38 provinces, updated continuously as field witnesses submitted data from TPS locations." },
                  { title: "Saint-Laguë Seat Projection Engine", desc: "Automated calculation dashboards displaying seat projections, party rank lists, and parliamentary threshold filters per electoral district (DAPIL)." },
                  { title: "Candidate & Representative Database", desc: "Comprehensive record management for candidates, vote totals, witness profiles, and WhatsApp blast templates for regional coordinator communication." },
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
        </div>

        <Hairline />

        {/* 05 Field Study */}
        <div>
          <SectionTag num="05" label="Field Study & User Testing Validation" />
          <p className="font-display font-light leading-relaxed mb-10" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: N, letterSpacing: "-0.005em", lineHeight: 1.65, maxWidth: "680px" }}>
            A nationwide onboarding campaign was conducted across regional hubs in Semarang, Palembang, and Jakarta, training representatives from all 38 provinces before election day.
          </p>

          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            {/* 90% stat */}
            <div
              className="px-6 py-7 flex flex-col"
              style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}
            >
              <p
                className="font-display font-light mb-2"
                style={{ fontSize: "3.5rem", color: N, lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                90%
              </p>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-3" style={{ color: C }}>
                Unassisted Task Completion
              </p>
              <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>
                During live simulation sessions, 90% of regional representatives successfully operated the mobile PWA and full data entry flows without any technical intervention, validating the "fast & accurate" design brief.
              </p>
            </div>

            {/* 10% finding */}
            <div
              className="px-6 py-7 flex flex-col"
              style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}
            >
              <p
                className="font-display font-light mb-2"
                style={{ fontSize: "3.5rem", color: N, lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                10%
              </p>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-3" style={{ color: C }}>
                Pre-Election Friction Identified & Resolved
              </p>
              <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>
                Remaining operational friction, primarily unmatched NIK numbers or electoral district mismatches, was identified and addressed prior to election day through fallback admin override protocols, preventing live-day failures.
              </p>
            </div>
          </div>

          <div className="px-6 py-5 flex gap-4" style={{ backgroundColor: `${GOV}`, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: "4px" }}>
            <Globe size={14} style={{ color: C, flexShrink: 0, marginTop: "2px" }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
              Coverage spanned <strong className="text-white">Semarang, Palembang, and Jakarta</strong> training hubs, with representatives from all 38 provinces participating in live system simulation before the February 14 election day rollout.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 06 Business Impact */}
        <div>
          <SectionTag num="06" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-2 gap-4 mb-10">
            {[
              { Icon: Shield, title: "Successful Nationwide 2024 Election Rollout", desc: "Maintained continuous operational uptime throughout the critical February 14–15 quick count window, capturing real-time internal data across 38 provinces and 127 international districts without interruption." },
              { Icon: BarChart2, title: "High-Precision Early Seat Projections", desc: "Executive party leadership monitored legislative seat gains (DPR RI/DPRD) using automated Saint-Laguë calculation tables immediately as vote tallies entered the system." },
              { Icon: Database, title: "Optimized Field Data Efficiency", desc: "OCR auto-fill, location pre-definition, and WhatsApp verification minimized input latency, delivering a fast, accurate internal data baseline hours ahead of competing party intelligence." },
              { Icon: Users, title: "Solo Architecture, National Scale", desc: "Designed, prototyped, and delivered a two-surface system (mobile PWA + web CMS) as a 1-person design team, covering UX flows, system logic, and stakeholder alignment from June 2023 to election day." },
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

          {/* 07 Impact & The "So What" Closing Box */}
          <div id="impact" className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                NATIONAL SCALE IMPACT & "SO WHAT"
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Architected a nationwide election monitoring system covering <span className="font-bold text-[#DB3E8C]">820,000+ polling stations</span> across 38 provinces.
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-2xl">
              By designing dual-surface PWAs with OCR verification and real-time Saint-Laguë seat allocation calculation tables, we enabled party leadership to project legislative seats hours ahead of official manual tallies.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">820K+ TPS</span>
                <p className="text-white/60">Coverage across 38 Indonesian provinces & 127 overseas voting hubs.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-[#22c55e] mb-1">Zero Downtime</span>
                <p className="text-white/60">100% operational uptime throughout the 48-hour election window.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-xl text-[#DB3E8C] mb-1">Saint-Laguë AI</span>
                <p className="text-white/80 font-medium">Automated parliamentary threshold & seat quota calculation.</p>
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
                "This highlights my capacity to architect ultra-high-stakes national systems—handling massive data concurrency across 820,000+ polling stations with 100% uptime. If you're looking for a designer who understands data integrity, system scale, and high-pressure execution, this is the proof."
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
