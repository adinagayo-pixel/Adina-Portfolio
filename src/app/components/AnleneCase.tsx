import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, FileText, Smartphone,
  Activity, Heart, MessageSquare, Clipboard,
  CheckCircle2, Users, Zap, AlertTriangle
} from "lucide-react"
import anlene0 from "@/imports/anlene.png"
import anlene1 from "@/imports/anlene1.png"
import anlene2 from "@/imports/anlene2.png"
import anlene3 from "@/imports/anlene3.png"
import anlene4 from "@/imports/anlene4.png"
import anlene5 from "@/imports/anlene5.png"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"

// Anlene health tier colors
const TIER_BLUE   = { bg: "#EEF4FB", border: "#93C4E8", text: "#1A5276", dot: "#2E86C1" }
const TIER_GREEN  = { bg: "#EAF7EE", border: "#82CDA0", text: "#1E6B3A", dot: "#27AE60" }
const TIER_YELLOW = { bg: "#FEF9EC", border: "#F5CB5C", text: "#7D6008", dot: "#D4AC0D" }
const TIER_RED    = { bg: "#FDF0EE", border: "#F0A899", text: "#78281F", dot: "#C0392B" }

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

function BeforeAfterSlider() {
  return (
    <div className="my-8 rounded-xl border border-white/10 bg-[#0f172a] overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-[#1e293b] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[9px] font-bold tracking-widest text-[#DB3E8C] uppercase block">
            VISUAL IMPACT & WORKFLOW SIMPLIFICATION
          </span>
          <h4 className="text-white font-sans text-sm font-bold mt-0.5">
            Before vs. After Workflow Comparison
          </h4>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/60 font-sans">
          <span className="text-red-400 font-bold">Legacy (Cluttered Paper Intake)</span>
          <span>vs</span>
          <span className="text-emerald-400 font-bold">Streamlined Digital UX</span>
        </div>
      </div>

      {/* Comparison Grid Stage */}
      <div className="p-6 md:p-8 bg-[#0a0f1d] grid md:grid-cols-2 gap-6">
        {/* BEFORE Legacy */}
        <div className="bg-[#181124] p-5 rounded-xl border border-red-500/30 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-red-500/20">
            <span className="text-[9px] font-bold text-red-400 tracking-widest uppercase">BEFORE · LEGACY PROCESS</span>
            <span className="text-[9px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">Paper Forms · High Friction</span>
          </div>
          <div className="text-xs text-white/70 leading-relaxed font-sans space-y-2">
            <p className="text-[11px] text-white/60">❌ Multi-page paper diagnostic intake form filled by hand.</p>
            <p className="text-[11px] text-white/60">❌ Manual data re-entry from GE Achilles scanner printout.</p>
            <p className="text-[11px] text-white/60">❌ Delayed postal/manual delivery of health passport (3-5 days).</p>
          </div>
          <div className="p-3 bg-black/50 rounded border border-red-500/20 text-center">
            <span className="font-mono text-xs font-bold text-red-400">Total Time: 15–20 Mins / Customer</span>
          </div>
        </div>

        {/* AFTER Streamlined */}
        <div className="bg-[#0f241d] p-5 rounded-xl border border-emerald-500/30 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-emerald-500/20">
            <span className="text-[9px] font-bold text-emerald-400 tracking-widest uppercase">AFTER · STREAMLINED DIGITAL UX</span>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Digital Intake · Instant PDF</span>
          </div>
          <div className="text-xs text-white/70 leading-relaxed font-sans space-y-2">
            <p className="text-[11px] text-white/90 font-medium">✓ Bluetooth / QR diagnostic data sync directly from GE/Omron scanners.</p>
            <p className="text-[11px] text-white/90 font-medium">✓ Automated instant 4-tier Health Passport PDF generation.</p>
            <p className="text-[11px] text-white/90 font-medium">✓ 1-click automated WhatsApp PDF delivery to customer phone.</p>
          </div>
          <div className="p-3 bg-black/50 rounded border border-emerald-500/20 text-center">
            <span className="font-mono text-xs font-bold text-emerald-400">Total Time: ~90 Seconds (92% Time Saved)</span>
          </div>
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

export default function AnleneCase({ onBack, onNext, onPrev }: Props) {
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
        <MonoTag>Fonterra Anlene · Diagnostics & PDF Health Passport</MonoTag>
      </div>

      {/* Quick Jump Navigation Bar */}
      <div className="sticky top-[53px] z-40 px-8 lg:px-16 py-2.5 bg-[#0e1635] text-white/70 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
        <span className="font-bold tracking-widest text-[#DB3E8C] uppercase text-[9px]">
          QUICK JUMP
        </span>
        <div className="flex items-center gap-6 overflow-x-auto">
          <a href="#summary" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            01. Executive Overview
          </a>
          <a href="#challenge" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            02. Core Challenge
          </a>
          <a href="#pipeline" className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-[11px] font-medium">
            03. Diagnostic Pipeline
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
            <MonoTag accent>CASE STUDY 05</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>HEALTH TECH & FIELD SALES ENABLEMENT</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>FONTERRA ANLENE · 2023</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            Medical Diagnostics into Field Sales Intelligence
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Translating clinical data from Achilles bone scanners and Omron devices into personalized health passports and automated WhatsApp PDF delivery.
          </p>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: BODY, lineHeight: 1.8 }}>
            A complete product revamp of Fonterra's field sales tool, enabling SPGs to conduct 90-second health consultations during live event activations across Indonesia, backed by automated 4-tier diagnostic metrics and instant WhatsApp dispatch.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-xs">
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Sole Product Designer & UX Researcher
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Territory
            </span>
            <span className="font-semibold text-[#19244E]">
              Fonterra Indonesia × Anlene
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Sprint Timeline
            </span>
            <span className="font-semibold text-[#19244E]">
              3 Months (Aug – Oct 2023)
            </span>
          </div>
          <div>
            <span className="block font-sans text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
              Hardware Integrations
            </span>
            <span className="font-semibold text-[#19244E]">
              GE Achilles Scanner + Omron Body Scan
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
              { label: "Client & Brand", val: "Fonterra Indonesia × Anlene (Dairy & Nutrition Enterprise)" },
              { label: "Role & Team", val: "Lead UX/UI Designer & Systems Researcher: 1-Person Design Team" },
              { label: "Core Product Suite", val: "SPG Field Data Entry App (Tablet/Mobile) · Customer PDF Health Passport · WhatsApp/Email API Integration" },
              { label: "Core Stack", val: "Figma · FigJam · Photoshop · Adobe Illustrator · Graphic Standard Manual (GSM) Guidelines" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* UI Screen Showcase Gallery */}
          <div className="mt-10 p-6 bg-[#0a0f24] rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <MonoTag accent>[FONTERRA × ANLENE UI GALLERY]</MonoTag>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  Medical Diagnostics & Field Sales Flow
                </h3>
              </div>
              <span className="font-sans text-[10px] text-white/50 tracking-widest uppercase hidden sm:inline">
                6 High-Fidelity Views
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "01 · Health Passport Main UI", img: anlene0, desc: "Personalized consumer health passport displaying body age, bone density T-score, and muscle metrics." },
                { title: "02 · Diagnostic Matrix View", img: anlene1, desc: "4-tier color-coded health diagnostic ranges for fast SPG consultation." },
                { title: "03 · Bone Scanner Output", img: anlene2, desc: "GE Achilles ultrasound device integration and automated bone density status calculation." },
                { title: "04 · Field Intake System", img: anlene3, desc: "Fast-entry offline form for SPG event reps with zero data loss protection." },
                { title: "05 · Checkout & Redemption", img: anlene4, desc: "In-booth product purchase completion and automated WhatsApp PDF dispatch." },
                { title: "06 · Reports & Analytics", img: anlene5, desc: "Nationwide activation analytics tracking daily attendee intake per city." },
              ].map(({ title, img, desc }) => (
                <div key={title} className="bg-[#141b36] border border-white/10 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden border border-white/10 mb-3 bg-[#0d142d] p-1">
                    <img src={img} alt={title} className="w-full h-full object-contain rounded group-hover:scale-105 transition-transform duration-500" />
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
            On-site brand activations required SPGs to rapidly capture participant health metrics from hardware devices during busy event setups. The legacy app lacked clear data visualization, producing high entry friction for SPGs and confusing health summaries for consumers.
          </p>
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Domain Constraints]
          </p>
          <div className="space-y-3">
            {[
              {
                Icon: Activity,
                title: "Medical Hardware & Data Mapping",
                desc: "Translating diagnostic metrics from two distinct physical devices: GE Lunar Achilles Ultrasonometer (T-Score / Stiffness Index for bone density) and Omron Karada Scan HBF-375 (BMI, Body Fat %, Visceral Fat, Skeletal Muscle %, Body Age), into standard visual health ranges.",
              },
              {
                Icon: Zap,
                title: "High-Stress Field Sales Workflow",
                desc: "SPGs needed offline draft-saving, rapid data editing, and instant upload status tracking (Uploaded, Pending) while managing long queues at event booths, with no tolerance for data loss during network drops.",
              },
              {
                Icon: Clipboard,
                title: "Strict Brand Compliance: Fonterra GSM",
                desc: "Applying Anlene's Graphic Standard Manual guidelines consistently across mobile interfaces, PDF health reports, and activation marketing collateral, ensuring zero brand deviation across all surfaces.",
              },
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

          {/* Interactive Before vs. After Comparison Slider Widget */}
          <BeforeAfterSlider />
        </div>

        <Hairline />

        {/* 03 Research & Architecture */}
        <div>
          <SectionTag id="pipeline" num="03" label="Research & Diagnostic Data Pipeline" />

          {/* Pipeline diagram */}
          <div className="mb-8 p-6 overflow-x-auto" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <MonoTag>[Three-Stage Health Data Pipeline]</MonoTag>
            <div className="flex items-center mt-5 min-w-max">
              {[
                { label: "Hardware Deconstruction", sub: "Map device printout → digital fields", icon: Activity },
                { label: "Color Health Matrix", sub: "4-tier diagnostic band system", icon: Heart },
                { label: "Automated Report Pipeline", sub: "PDF generation & WA/Email dispatch", icon: FileText },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-start gap-3 min-w-[200px]">
                      <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: i === 1 ? `${C}10` : `${N}06`, border: `1px solid ${i === 1 ? `${C}30` : HAIR}`, borderRadius: "4px" }}>
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

          {/* Research steps */}
          <div className="space-y-3 mb-8">
            {[
              { num: "1.", title: "Physical Device & Field Observational Research", desc: "Analyzed operational documentation, user manuals, and field video recordings of SPG booth interactions to map hardware printout outputs directly into digital input fields, ensuring form fields mirrored the exact sequence of physical device readouts." },
              { num: "2.", title: "Medical Metric Threshold Categorization", desc: "Structured a unified 4-tier color diagnostic system across all health parameters, establishing clinically grounded visual ranges that SPGs and consumers could interpret instantly without medical training." },
              { num: "3.", title: "Dual-Journey Alignment: SPG Efficiency vs. Customer Value", desc: "Re-engineered the journey so SPGs could complete survey and medical data capture in under 2 minutes, while customers immediately received a QR code or direct WhatsApp/Email link to their personalized health passport." },
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

          {/* 4-Tier Color Matrix showcase */}
          <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
            <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}` }}>
              <MonoTag>[SYSTEM THINKING: MEDICAL THRESHOLD COLOR MATRIX]</MonoTag>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                { tier: TIER_BLUE,   label: "Low / Below Average", examples: "T-Score < −2.5 (Osteoporosis)\nBMI < 18.5 (Underweight)", code: "BLUE" },
                { tier: TIER_GREEN,  label: "Normal / Ideal State", examples: "T-Score −1.0 to 0\nBMI 18.5–24.9 (Normal)", code: "GREEN" },
                { tier: TIER_YELLOW, label: "High / Moderate Risk", examples: "Visceral Fat 10–14\nBody Fat % Above Normal", code: "YELLOW" },
                { tier: TIER_RED,    label: "Very High / High Risk", examples: "T-Score < −2.5 + fracture\nVisceral Fat 15+ (Obese)", code: "RED" },
              ].map(({ tier, label, examples, code }, i) => (
                <div
                  key={code}
                  className="px-5 py-5"
                  style={{
                    backgroundColor: tier.bg,
                    borderRight: i < 3 ? `1px solid ${HAIR}` : "none",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: tier.dot }} />
                    <span className="font-sans text-[9px] font-semibold tracking-widest" style={{ color: tier.text }}>
                      [{code}]
                    </span>
                  </div>
                  <p className="text-xs font-semibold mb-2" style={{ color: tier.text }}>{label}</p>
                  <p className="font-sans text-xs leading-relaxed whitespace-pre-line" style={{ color: tier.text, opacity: 0.75 }}>
                    {examples}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 04 System Deliverables */}
        <div>
          <SectionTag num="04" label="System Deliverables & Module Breakdown" />
          <div className="grid lg:grid-cols-2 gap-6">

            {/* SPG Console */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
                <div className="flex items-center gap-2">
                  <Smartphone size={12} style={{ color: C }} />
                  <MonoTag accent>[A] SPG Activation & Data Entry Console</MonoTag>
                </div>
                <p className="font-sans text-[9px] mt-1" style={{ color: `${N}99` }}>Tablet / Mobile · Field Sales Workflow</p>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Rapid Multi-Step Intake", desc: "Sequential forms for participant registration, milk consumption surveys, Achilles bone scan inputs, and Omron body composition fields, mirroring the exact order of physical device readouts." },
                  { title: "Draft Saving & Upload Status Tracking", desc: "Centralized participant dashboard with upload statuses (Uploaded, Pending) and instant edit capabilities, preventing data loss during network drops at busy event booths." },
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

            {/* Customer Health Passport */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
                <div className="flex items-center gap-2">
                  <Heart size={12} style={{ color: C }} />
                  <MonoTag accent>[B] Customer Health Passport & Recommendation Dashboard</MonoTag>
                </div>
                <p className="font-sans text-[9px] mt-1" style={{ color: `${N}99` }}>Consumer-Facing · PDF & WhatsApp Delivery</p>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Visual Metric Gauges", desc: "Intuitive indicators comparing participant results against ideal age-adjusted baselines, including BMI semi-circle gauges and T-Score bone density indicators using the 4-tier color system." },
                  { title: "Targeted Product & Lifestyle Recommendations", desc: "Automated recommendation engine suggesting specific Anlene milk variants and daily movement tips tailored to individual health scores." },
                  { title: "Automated PDF & WhatsApp Dispatch", desc: "One-click PDF report generator enabling SPGs or automated triggers to dispatch full health passports via WhatsApp Official API or Email, delivered while still at the event booth." },
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

          {/* HEALTH DASHBOARD callout */}
          <div
            className="mt-5 px-6 py-5 flex gap-5"
            style={{ backgroundColor: N, border: `1px solid ${N}`, borderRadius: "4px" }}
          >
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}20`, border: `1px solid ${C}40`, borderRadius: "4px" }}>
              <AlertTriangle size={13} style={{ color: C }} />
            </div>
            <div>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-2" style={{ color: C }}>
                HEALTH DASHBOARD: OMRON & ACHILLES METRIC VISUALIZATION
              </p>
              <p className="text-sm font-semibold text-white mb-1.5">Clinical Metrics Made Instantly Legible at the Point of Sale</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
                SPGs could reference a participant's <strong className="text-white">Visceral Fat 7.0</strong> (Red band) or <strong className="text-white">T-Score 2 </strong>(Green band) as a live visual argument, pointing to specific Anlene product lines backed by that consumer's own clinical data.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Business Impact */}
        <div>
          <SectionTag num="05" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-3 gap-4 mb-10">
            {[
              {
                Icon: Zap,
                title: "Streamlined Field Operations",
                desc: "Reduced SPG data input friction through device-mapped form structures and draft-saving features, enabling reliable data capture during high-volume event activations with minimal training overhead.",
              },
              {
                Icon: Users,
                title: "Empowered Field Sales Conversion",
                desc: "SPGs gained clear visual argument points (low T-Scores, high body age) to recommend specific Anlene product lines at the moment of health insight, transforming a diagnostic interaction into a sales conversion.",
              },
              {
                Icon: CheckCircle2,
                title: "Flawless Brand Governance",
                desc: "Successfully unified Anlene's digital app interface, PDF health reports, and physical event marketing materials under Fonterra's strict Graphic Standard Manual, ensuring zero brand deviation across all surfaces.",
              },
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

          {/* 06 Impact & The "So What" Closing Box */}
          <div id="impact" className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                CLINICAL SYSTEM IMPACT & "SO WHAT"
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Reduced customer intake from <span className="font-bold text-[#DB3E8C]">15 minutes to ~90 seconds</span> (92% time saved) with instant WhatsApp Health Passports.
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-2xl">
              By replacing paper intake forms with Bluetooth scanner sync and automated 4-tier diagnostic PDF generation, field reps converted health consultations into immediate product sales.
            </p>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-[#22c55e] mb-1">92% Time Saved</span>
                <p className="text-white/60">From 15-minute paper forms down to ~90-second digital intake.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-xl text-white mb-1">Instant PDF</span>
                <p className="text-white/60">Automated 4-tier health passport delivered via WhatsApp API.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-xl text-[#DB3E8C] mb-1">Zero GSM Errors</span>
                <p className="text-white/80 font-medium">Strict Fonterra brand manual compliance across all touchpoints.</p>
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
                "This proves I can deconstruct complex physical hardware data (GE & Omron diagnostic scanners) into intuitive digital interfaces that directly empower sales reps and drive immediate product conversions at the point of sale."
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
