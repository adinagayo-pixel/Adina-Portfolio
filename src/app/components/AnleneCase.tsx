import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, FileText, Smartphone,
  Activity, Heart, MessageSquare, Clipboard,
  CheckCircle2, Users, Zap, AlertTriangle
} from "lucide-react"

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
}

export default function AnleneCase({ onBack }: Props) {
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
          className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: N }}
        >
          <ArrowLeft size={12} /> Back
        </button>
        <MonoTag>[FONTERRA INDONESIA · ANLENE · FIELD DATA ENTRY & PDF GENERATOR]</MonoTag>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: N }}>

        {/* Meta strip */}
        <div
          className="px-8 lg:px-16 py-5 flex flex-wrap items-center gap-6"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
        >
          {[
            { label: "Client", val: "Fonterra Indonesia × Anlene" },
            { label: "Sector", val: "Dairy & Nutrition / Health Tech" },
            { label: "Timeline", val: "August – October 2023 · 3-Month Sprint" },
            { label: "Scope", val: "Field Sales Enablement & Health Passport" },
            { label: "Role", val: "Lead UX/UI Designer & Systems Researcher · 1-Person Team" },
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
        </div>

        {/* Title block */}
        <div className="px-8 lg:px-16 py-16 lg:py-24">
          <p className="font-mono text-[10px] font-semibold tracking-widest uppercase mb-6" style={{ color: C }}>
            Case Study · 06
          </p>
          <h1
            className="font-display font-light text-white leading-[0.92] mb-8"
            style={{ fontSize: "clamp(2rem, 4.8vw, 4.2rem)", letterSpacing: "-0.025em", maxWidth: "860px" }}
          >
            Medical Diagnostics into<br />
            Field Sales Intelligence —<br />
            <em className="font-normal" style={{ color: C }}>The Anlene Health Passport.</em>
          </h1>
          <p className="text-sm leading-relaxed max-w-[640px]" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
            A complete product revamp of Fonterra's field sales tool — translating clinical data from Achilles bone scanners and Omron body composition devices into personalized health dashboards, automated PDF reports, and WhatsApp delivery pipelines used by SPGs during live event activations across Indonesia.
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}>
          {[
            { val: "3mo", label: "Delivery Sprint", sub: "Aug – Oct 2023 fast-paced timeline" },
            { val: "2", label: "Medical Devices", sub: "GE Achilles Ultrasonometer + Omron HBF-375" },
            { val: "4-tier", label: "Health Matrix", sub: "Blue / Green / Yellow / Red diagnostic bands" },
            { val: "2", label: "Portal Surfaces", sub: "SPG field console + Customer health passport" },
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
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: W, lineHeight: 1, letterSpacing: "-0.03em" }}
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

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-20">

        {/* 01 Executive Summary */}
        <div>
          <SectionTag num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Brand", val: "Fonterra Indonesia × Anlene (Dairy & Nutrition Enterprise)" },
              { label: "Role & Team", val: "Lead UX/UI Designer & Systems Researcher — 1-Person Design Team" },
              { label: "Core Product Suite", val: "SPG Field Data Entry App (Tablet/Mobile) · Customer PDF Health Passport · WhatsApp/Email API Integration" },
              { label: "Core Stack", val: "Figma · FigJam · Photoshop · Adobe Illustrator · Graphic Standard Manual (GSM) Guidelines" },
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
            On-site brand activations required SPGs to rapidly capture participant health metrics from hardware devices during busy event setups. The legacy app lacked clear data visualization — producing high entry friction for SPGs and confusing health summaries for consumers.
          </p>
          <p className="font-mono text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Domain Constraints]
          </p>
          <div className="space-y-3">
            {[
              {
                Icon: Activity,
                title: "Medical Hardware & Data Mapping",
                desc: "Translating diagnostic metrics from two distinct physical devices — GE Lunar Achilles Ultrasonometer (T-Score / Stiffness Index for bone density) and Omron Karada Scan HBF-375 (BMI, Body Fat %, Visceral Fat, Skeletal Muscle %, Body Age) — into standard visual health ranges.",
              },
              {
                Icon: Zap,
                title: "High-Stress Field Sales Workflow",
                desc: "SPGs needed offline draft-saving, rapid data editing, and instant upload status tracking (Uploaded, Pending) while managing long queues at event booths — with no tolerance for data loss during network drops.",
              },
              {
                Icon: Clipboard,
                title: "Strict Brand Compliance — Fonterra GSM",
                desc: "Applying Anlene's Graphic Standard Manual guidelines consistently across mobile interfaces, PDF health reports, and activation marketing collateral — ensuring zero brand deviation across all surfaces.",
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
        </div>

        <Hairline />

        {/* 03 Research & Architecture */}
        <div>
          <SectionTag num="03" label="Research & System Architecture" />

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

          {/* Research steps */}
          <div className="space-y-3 mb-8">
            {[
              { num: "1.", title: "Physical Device & Field Observational Research", desc: "Analyzed operational documentation, user manuals, and field video recordings of SPG booth interactions to map hardware printout outputs directly into digital input fields — ensuring form fields mirrored the exact sequence of physical device readouts." },
              { num: "2.", title: "Medical Metric Threshold Categorization", desc: "Structured a unified 4-tier color diagnostic system across all health parameters — establishing clinically grounded visual ranges that SPGs and consumers could interpret instantly without medical training." },
              { num: "3.", title: "Dual-Journey Alignment — SPG Efficiency vs. Customer Value", desc: "Re-engineered the journey so SPGs could complete survey and medical data capture in under 2 minutes, while customers immediately received a QR code or direct WhatsApp/Email link to their personalized health passport." },
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
                    <span className="font-mono text-[9px] font-semibold tracking-widest" style={{ color: tier.text }}>
                      [{code}]
                    </span>
                  </div>
                  <p className="text-xs font-semibold mb-2" style={{ color: tier.text }}>{label}</p>
                  <p className="font-mono text-[8px] leading-relaxed whitespace-pre-line" style={{ color: tier.text, opacity: 0.75 }}>
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
                <p className="font-mono text-[9px] mt-1" style={{ color: `${N}99` }}>Tablet / Mobile · Field Sales Workflow</p>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Rapid Multi-Step Intake", desc: "Sequential forms for participant registration, milk consumption surveys, Achilles bone scan inputs, and Omron body composition fields — mirroring the exact order of physical device readouts." },
                  { title: "Draft Saving & Upload Status Tracking", desc: "Centralized participant dashboard with upload statuses (Uploaded, Pending) and instant edit capabilities — preventing data loss during network drops at busy event booths." },
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
                <p className="font-mono text-[9px] mt-1" style={{ color: `${N}99` }}>Consumer-Facing · PDF & WhatsApp Delivery</p>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Visual Metric Gauges", desc: "Intuitive indicators comparing participant results against ideal age-adjusted baselines — including BMI semi-circle gauges and T-Score bone density indicators using the 4-tier color system." },
                  { title: "Targeted Product & Lifestyle Recommendations", desc: "Automated recommendation engine suggesting specific Anlene milk variants and daily movement tips tailored to individual health scores." },
                  { title: "Automated PDF & WhatsApp Dispatch", desc: "One-click PDF report generator enabling SPGs or automated triggers to dispatch full health passports via WhatsApp Official API or Email — delivered while still at the event booth." },
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
              <p className="font-mono text-[9px] font-semibold tracking-widest uppercase mb-2" style={{ color: C }}>
                [HEALTH DASHBOARD: OMRON & ACHILLES METRIC VISUALIZATION]
              </p>
              <p className="text-sm font-semibold text-white mb-1.5">Clinical Metrics Made Instantly Legible at the Point of Sale</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
                SPGs could reference a participant's <strong className="text-white">Visceral Fat 7.0</strong> (Red band) or <strong className="text-white">T-Score 2 </strong>(Green band) as a live visual argument — pointing to specific Anlene product lines backed by that consumer's own clinical data.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Business Impact */}
        <div>
          <SectionTag num="05" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {
                Icon: Zap,
                title: "Streamlined Field Operations",
                desc: "Reduced SPG data input friction through device-mapped form structures and draft-saving features — enabling reliable data capture during high-volume event activations with minimal training overhead.",
              },
              {
                Icon: Users,
                title: "Empowered Field Sales Conversion",
                desc: "SPGs gained clear visual argument points (low T-Scores, high body age) to recommend specific Anlene product lines at the moment of health insight — transforming a diagnostic interaction into a sales conversion.",
              },
              {
                Icon: CheckCircle2,
                title: "Flawless Brand Governance",
                desc: "Successfully unified Anlene's digital app interface, PDF health reports, and physical event marketing materials under Fonterra's strict Graphic Standard Manual — zero brand deviation across all surfaces.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-4 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${C}08`, border: `1px solid ${C}20`, borderRadius: "4px" }}>
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
        <div className="px-8 lg:px-16 py-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
            style={{ color: N }}
          >
            <ArrowLeft size={12} /> Back to Portfolio
          </button>
          <MonoTag>ANLENE HEALTH PASSPORT · FONTERRA INDONESIA · AUG–OCT 2023</MonoTag>
        </div>
      </div>

    </div>
  )
}
