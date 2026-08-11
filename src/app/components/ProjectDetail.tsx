import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft, ArrowRight, Lock, Lightbulb, FileCode2,
  Users, CheckCircle2, Zap, Globe, ChevronRight, ExternalLink
} from "lucide-react"

const NAVY = "#152055"
const CERISE = "#DB3E8C"
const TNG_BLUE = "#0060AF"
const TNG_BG = "#E6F0F9"

interface ProjectDetailProps {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

// ── Animated flow diagram ──────────────────────────────────────────────────
function FlowDiagram() {
  const steps = [
    { label: "TNG App", sub: "User ecosystem", icon: "📱" },
    { label: "Mini-Program", sub: "Embedded PWA", icon: "🔗" },
    { label: "SSO + eKYC", sub: "Auth bridge", icon: "🔐" },
    { label: "GEGM API", sub: "Policy engine", icon: "🏦" },
    { label: "e-Wallet", sub: "Payment layer", icon: "💳" },
  ]
  return (
    <div className="rounded-2xl border border-[#0060AF]/15 bg-white p-6 overflow-x-auto">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#152055]/35 mb-5">
        System Integration Flow
      </div>
      <div className="flex items-center gap-0 min-w-max">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-0">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm border border-[#0060AF]/10"
                style={{ backgroundColor: i === 0 || i === 4 ? TNG_BG : i === 2 ? "#DB3E8C12" : "#F8F8F6" }}
              >
                {s.icon}
              </div>
              <div className="text-center">
                <div className="text-[11px] font-semibold text-[#152055]">{s.label}</div>
                <div className="text-[9px] text-[#152055]/40">{s.sub}</div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center mx-2 pb-5">
                <div className="h-px w-8 bg-[#0060AF]/20" />
                <ChevronRight size={12} className="text-[#0060AF]/40 -ml-1" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Constraints card ────────────────────────────────────────────────────────
function ConstraintItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ backgroundColor: CERISE }} />
      <span className="text-sm text-[#152055]/65 leading-relaxed">{text}</span>
    </div>
  )
}

// ── Phone frame mockup ──────────────────────────────────────────────────────
function PhoneMockup({ screen }: { screen: number }) {
  const screens = [
    // Screen 0: Product selection
    <div key={0} className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[#0060AF]/10 flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: TNG_BLUE }}>
          <div className="w-full h-full flex items-center justify-center text-white text-[8px] font-bold">T</div>
        </div>
        <span className="text-[9px] font-semibold text-[#152055]">TNG × GEGM Insurance</span>
      </div>
      <div className="px-4 py-3 flex-1">
        <div className="text-[8px] text-[#152055]/40 mb-2 uppercase tracking-wide font-semibold">Select Plan</div>
        <div className="space-y-2">
          {["Basic — RM 12/yr", "Standard — RM 28/yr", "Premium — RM 56/yr"].map((plan, i) => (
            <div
              key={plan}
              className="rounded-lg p-2.5 border text-[9px] flex justify-between items-center"
              style={{
                borderColor: i === 1 ? TNG_BLUE : "rgba(21,32,85,0.08)",
                backgroundColor: i === 1 ? TNG_BG : "transparent",
              }}
            >
              <span className="font-medium text-[#152055]">{plan}</span>
              {i === 1 && (
                <span className="text-[7px] px-1.5 py-0.5 rounded-full text-white font-semibold" style={{ backgroundColor: TNG_BLUE }}>
                  Popular
                </span>
              )}
            </div>
          ))}
        </div>
        <div
          className="mt-4 rounded-lg py-2.5 text-center text-white text-[9px] font-bold"
          style={{ backgroundColor: TNG_BLUE }}
        >
          Continue →
        </div>
      </div>
    </div>,

    // Screen 1: PTV eligibility check
    <div key={1} className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[#0060AF]/10">
        <div className="text-[9px] font-semibold text-[#152055]">PTV Eligibility Check</div>
        <div className="text-[7px] text-[#152055]/40">Government subsidy program</div>
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col gap-3">
        <div className="rounded-lg p-3" style={{ backgroundColor: TNG_BG }}>
          <div className="text-[7px] text-[#0060AF] font-semibold mb-1">Your NRIC</div>
          <div className="text-[10px] font-semibold text-[#152055]">880101-14-****</div>
          <div className="text-[7px] text-[#152055]/40">Pre-filled from TNG account</div>
        </div>
        <div
          className="rounded-lg p-3 border"
          style={{ borderColor: `${CERISE}30`, backgroundColor: `${CERISE}08` }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ backgroundColor: CERISE }}>
              <span className="text-white text-[6px] font-bold">✓</span>
            </div>
            <span className="text-[8px] font-bold" style={{ color: CERISE }}>PTV Eligible!</span>
          </div>
          <div className="text-[7px] text-[#152055]/50">You qualify for RM 50 government subsidy</div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[8px]">
            <span className="text-[#152055]/50">Premium</span>
            <span className="font-semibold text-[#152055]">RM 28.00</span>
          </div>
          <div className="flex justify-between text-[8px]">
            <span style={{ color: CERISE }}>PTV Discount</span>
            <span className="font-semibold" style={{ color: CERISE }}>- RM 28.00</span>
          </div>
          <div className="border-t border-[#152055]/8 pt-1.5 flex justify-between text-[8px]">
            <span className="font-bold text-[#152055]">Total</span>
            <span className="font-bold" style={{ color: TNG_BLUE }}>RM 0.00</span>
          </div>
        </div>
        <div
          className="rounded-lg py-2.5 text-center text-white text-[9px] font-bold mt-auto"
          style={{ backgroundColor: TNG_BLUE }}
        >
          Pay with e-Wallet
        </div>
      </div>
    </div>,

    // Screen 2: eKYC + Data confirmation
    <div key={2} className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[#0060AF]/10">
        <div className="text-[9px] font-semibold text-[#152055]">Confirm Your Details</div>
        <div className="text-[7px] text-[#152055]/40">Powered by TNG eKYC</div>
      </div>
      <div className="px-4 py-3 flex-1 space-y-2">
        {[
          ["Full Name", "Ahmad Razif bin Hassan"],
          ["NRIC", "880101-14-****"],
          ["Age", "36 years"],
          ["Email", "ahmad@email.com"],
          ["Phone", "+60 12-345 6789"],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between items-center py-1.5 border-b border-[#152055]/5">
            <span className="text-[7px] text-[#152055]/40 uppercase tracking-wide font-semibold">{label}</span>
            <span className="text-[8px] font-medium text-[#152055]">{val}</span>
          </div>
        ))}
        <div
          className="rounded-lg p-2 mt-2"
          style={{ backgroundColor: `${TNG_BLUE}10` }}
        >
          <div className="text-[7px] text-[#0060AF] font-semibold">
            ✓ eKYC Verified &nbsp;·&nbsp; SSO Auth Active
          </div>
        </div>
        <div
          className="rounded-lg py-2.5 text-center text-white text-[9px] font-bold"
          style={{ backgroundColor: TNG_BLUE }}
        >
          Confirm & Buy
        </div>
      </div>
    </div>,
  ]

  return (
    <div className="relative mx-auto" style={{ width: 160, height: 290 }}>
      {/* Phone frame */}
      <div
        className="absolute inset-0 rounded-[22px] border-[3px] shadow-2xl overflow-hidden bg-white"
        style={{ borderColor: NAVY }}
      >
        {/* Status bar */}
        <div className="h-6 flex items-center justify-between px-3" style={{ backgroundColor: TNG_BLUE }}>
          <span className="text-white text-[7px] font-medium">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 rounded-sm bg-white/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </div>
        {/* Screen content */}
        <div className="absolute inset-0 top-6 overflow-hidden text-left">
          {screens[screen]}
        </div>
      </div>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 rounded-b-xl" style={{ backgroundColor: NAVY }} />
    </div>
  )
}

// ── Solution feature block ─────────────────────────────────────────────────
function SolutionBlock({
  number, title, points, screen,
  isReversed = false,
}: {
  number: string
  title: string
  points: string[]
  screen: number
  isReversed?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isReversed ? "lg:[direction:rtl]" : ""}`}
    >
      <div className={isReversed ? "lg:[direction:ltr]" : ""}>
        <div
          className="text-4xl font-display font-bold mb-2 opacity-15"
          style={{ color: NAVY }}
        >
          {number}
        </div>
        <h3 className="font-display text-2xl font-bold text-[#152055] mb-4">{title}</h3>
        <ul className="space-y-3">
          {points.map((pt, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                style={{ backgroundColor: CERISE }}
              />
              <span
                className="text-sm text-[#152055]/65 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: pt }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={`flex justify-center ${isReversed ? "lg:[direction:ltr]" : ""}`}>
        <PhoneMockup screen={screen} />
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ProjectDetail({ onBack, onNext, onPrev }: ProjectDetailProps) {
  const [activeScreen, setActiveScreen] = useState(0)

  return (
    <div className="min-h-screen bg-white text-[#152055]">

      {/* ── Back nav ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#152055]/6 px-6 lg:px-12 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-[#152055]/50 hover:text-[#152055] transition-colors"
        >
          <ArrowLeft size={15} /> Back to Portfolio
        </button>
        <div className="font-display font-bold text-[#152055] text-base">
          AFG<span style={{ color: CERISE }}>.</span>
        </div>
        <div className="text-[10px] text-[#152055]/30 font-medium hidden lg:block">
          Case Study 02 / 03
        </div>
      </div>

      {/* ════════════════════════════════════
          1. HERO & METADATA
      ════════════════════════════════════ */}
      <section className="px-6 lg:px-12 pt-16 pb-20 relative overflow-hidden">
        {/* Geometry */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04] -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: TNG_BLUE }} />
        <div className="absolute bottom-0 left-1/4 w-px h-48 bg-[#152055]/5 rotate-12" />

        <div className="max-w-5xl mx-auto">
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: CERISE }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Status: Go-Live Regional
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold"
              style={{ backgroundColor: `${TNG_BLUE}15`, color: TNG_BLUE }}
            >
              Market: Malaysia
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-semibold bg-[#152055]/5 text-[#152055]/50">
              B2B · Fintech · Insurance · Mini-Program
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-bold text-[#152055] leading-[0.9] mb-5"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            TNG <em className="not-italic" style={{ color: CERISE }}>×</em> GEGM
          </h1>
          <p className="text-[#152055]/50 text-lg lg:text-2xl font-light leading-snug max-w-2xl mb-14">
            Integrasi Pihak Ketiga untuk Pembelian Asuransi Mikro Regional — embedded PWA di dalam ekosistem TNG App.
          </p>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-0 border border-[#152055]/8 rounded-2xl overflow-hidden">
            {[
              { label: "Year", value: "2023" },
              { label: "Duration", value: "3 Months" },
              { label: "My Role", value: "UI/UX Designer" },
              { label: "Client", value: "TNG × GEGM" },
              { label: "Tools", value: "Figma" },
            ].map((m, i) => (
              <div
                key={m.label}
                className={`px-5 py-4 ${i < 4 ? "border-r border-[#152055]/8" : ""} ${i < 2 ? "border-b lg:border-b-0 border-[#152055]/8" : ""}`}
              >
                <div className="text-[9px] text-[#152055]/30 uppercase tracking-[0.15em] font-semibold mb-1">
                  {m.label}
                </div>
                <div className="text-sm font-semibold text-[#152055]">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          2. CHALLENGE & GOAL SPLIT-CARDS
      ════════════════════════════════════ */}
      <section className="px-6 lg:px-12 py-20 bg-[#F8F8F6]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: CERISE }}>
              The Context
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#152055]">
              Challenge & Goal
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Challenge card */}
            <div className="rounded-2xl bg-white border border-[#152055]/8 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#152055]/35 mb-1">
                    The Challenge
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#152055]">
                    Navigating a Foreign Ecosystem
                  </h3>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ml-4"
                  style={{ backgroundColor: `${CERISE}12` }}
                >
                  <Lock size={16} style={{ color: CERISE }} />
                </div>
              </div>
              <div className="space-y-3">
                <ConstraintItem text="Membaca dan memahami dokumentasi API pihak ketiga (TNG mini-program) sebelum bisa mendesain satu layar pun." />
                <ConstraintItem text="Memahami data apa saja yang bisa diperoleh dari app (nama, email, NRIC, usia) untuk membangun flow yang intuitif tanpa input manual berlebihan." />
                <ConstraintItem text="Menghindari skenario pembelian silang — seseorang membeli untuk orang lain — yang bisa menyalahi ketentuan program PTV." />
                <ConstraintItem text="Mematuhi design system mini program TNG yang sudah ada tanpa kehilangan identitas produk GEGM." />
                <ConstraintItem text="Mengelola pengecekan eligibilitas PTV secara real-time berdasarkan NRIC tanpa menambah friction pada flow utama." />
              </div>
            </div>

            {/* Goal card */}
            <div className="rounded-2xl bg-white border border-[#152055]/8 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#152055]/35 mb-1">
                    The Goal
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#152055]">
                    Zero-Friction Insurance Access
                  </h3>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ml-4"
                  style={{ backgroundColor: `${CERISE}12` }}
                >
                  <Lightbulb size={16} style={{ color: CERISE }} />
                </div>
              </div>
              <div className="space-y-3">
                <ConstraintItem text="Menyediakan akses pembelian asuransi yang mulus langsung di dalam ekosistem aplikasi mitra tanpa drop-off di titik manapun." />
                <ConstraintItem text="Memudahkan user dalam melakukan pengecekan apakah NRIC mereka termasuk dalam penerima PTV Discount secara real-time." />
                <ConstraintItem text="Memanfaatkan SSO + eKYC yang sudah disediakan TNG — base data, basic user data, dan eKYC user data — untuk meminimalkan input form." />
                <ConstraintItem text="Membangun 2 flow paralel yang jelas: pembelian normal dan pembelian dengan PTV Diskon (program subsidi pemerintah Malaysia)." />
                <ConstraintItem text="Go-live di pasar Malaysia dengan persetujuan penuh dari TNG dan manajemen GEGM." />
              </div>
            </div>
          </div>

          {/* Summary callout */}
          <div
            className="mt-6 rounded-2xl p-6 border"
            style={{ backgroundColor: `${TNG_BLUE}08`, borderColor: `${TNG_BLUE}20` }}
          >
            <div className="flex items-start gap-3">
              <Globe size={16} className="mt-0.5 shrink-0" style={{ color: TNG_BLUE }} />
              <p className="text-sm text-[#152055]/65 leading-relaxed">
                <strong className="text-[#152055]">Context:</strong> Mengintegrasikan pembelian asuransi Great Tenang Madani agar user TNG app bisa membeli asuransi via aplikasi menggunakan e-wallet. Kami menyediakan embedded web (PWA) di dalam aplikasi TNG. Pembelian dibuat seamless dengan menggunakan data user dari app existing. Ada 2 kasus pembelian — pembelian normal dan pembelian menggunakan PTV Diskon (program pemerintah Malaysia).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          2b. DESIGN WORKFLOW PHASES
      ════════════════════════════════════ */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: CERISE }}>
              How I Work
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#152055]">
              Design Workflow
            </h2>
            <p className="text-[#152055]/45 text-sm mt-3 max-w-lg leading-relaxed">
              Tiga fase yang saya terapkan secara konsisten di setiap proyek — dari alignment awal hingga handoff teknis yang bersih.
            </p>
          </div>

          {/* Phase connector line — desktop */}
          <div className="relative">
            {/* Vertical spine */}
            <div className="hidden lg:block absolute left-[calc(3rem-1px)] top-8 bottom-8 w-px bg-[#152055]/8" />

            <div className="space-y-6">

              {/* ── PHASE 1 ───────────────────────────────────── */}
              <div className="grid lg:grid-cols-[6rem_1fr_1fr] gap-6 lg:gap-10 items-start">
                {/* Phase number badge */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg text-white shadow-md z-10"
                    style={{ backgroundColor: NAVY }}
                  >
                    01
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#152055]/30 text-center leading-tight">
                    Fase<br />Satu
                  </div>
                </div>

                {/* Text */}
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: CERISE }}>
                    Strategic Alignment
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#152055] mb-4 leading-tight">
                    User Research &<br />Logic Deep-Dive
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: CERISE }} />
                        <span className="text-xs font-bold text-[#152055]">User & Persona Synthesis</span>
                      </div>
                      <p className="text-sm text-[#152055]/55 leading-relaxed pl-3.5">
                        Menganalisis dan merumuskan karakteristik, kebutuhan, serta behavior calon pengguna — baik dari data yang disediakan klien maupun riset mandiri untuk memetakan user persona yang akurat.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: CERISE }} />
                        <span className="text-xs font-bold text-[#152055]">Technical Constraint Analysis</span>
                      </div>
                      <p className="text-sm text-[#152055]/55 leading-relaxed pl-3.5">
                        Membedah dokumen BRS, menganalisis batasan arsitektur teknologi (dokumentasi API, panduan mini program), serta menyelaraskan ekspektasi bisnis dengan realitas teknis sebelum mulai mendesain.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual: Persona + BRS cards */}
                <div className="space-y-3">
                  {/* Persona card */}
                  <div className="rounded-xl border border-[#152055]/8 bg-[#F8F8F6] p-4">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#152055]/30 mb-3">User Persona</div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#152055]/8 flex items-center justify-center text-base shrink-0">
                        👤
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#152055]">Ahmad, 36 · Malaysia</div>
                        <div className="text-[10px] text-[#152055]/45 mt-0.5">TNG App user · Govt subsidy eligible</div>
                        <div className="flex gap-1.5 mt-2">
                          {["eKYC done", "PTV eligible", "Mobile-first"].map(tag => (
                            <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded-full bg-white border border-[#152055]/8 text-[#152055]/45 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BRS doc card */}
                  <div className="rounded-xl border border-[#152055]/8 bg-[#F8F8F6] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#152055]/30">BRS / API Analysis</div>
                      <FileCode2 size={12} className="text-[#152055]/25" />
                    </div>
                    <div className="space-y-1.5">
                      {["GET /user/profile → SSO data", "POST /ptv/check → eligibility", "POST /payment/init → e-wallet"].map(line => (
                        <div key={line} className="text-[9px] font-mono text-[#152055]/50 bg-white rounded-lg px-2.5 py-1.5 border border-[#152055]/5">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector dot */}
              <div className="hidden lg:flex items-center gap-3 pl-[3.75rem]">
                <div className="h-px flex-1 max-w-[4rem]" style={{ backgroundColor: `${NAVY}15` }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CERISE }} />
              </div>

              {/* ── PHASE 2 ───────────────────────────────────── */}
              <div className="grid lg:grid-cols-[6rem_1fr_1fr] gap-6 lg:gap-10 items-start">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg text-white shadow-md z-10"
                    style={{ backgroundColor: CERISE }}
                  >
                    02
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#152055]/30 text-center leading-tight">
                    Fase<br />Dua
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: CERISE }}>
                    AI-Assisted Rapid Prototyping
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#152055] mb-1 leading-tight">
                    High-Speed Design<br />with AI Augmentation
                  </h3>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                    style={{ backgroundColor: `${CERISE}12` }}
                  >
                    <Zap size={11} style={{ color: CERISE }} />
                    <span className="text-xs font-bold" style={{ color: CERISE }}>
                      70% Faster Delivery Time
                    </span>
                  </div>
                  <p className="text-sm text-[#152055]/55 leading-relaxed mb-4">
                    Di fase ini, Claude dan Gemini digunakan sebagai <em>thought partner</em> — menganalisis logika interaksi yang kompleks (seperti flow PTV eligibility check dengan edge case ganda), merancang struktur konten, dan men-generate komponen prototipe awal.
                  </p>
                  <div className="space-y-2">
                    {[
                      { icon: "⚡", text: "Analisis logika kuesioner & interaksi kompleks via Claude" },
                      { icon: "🎨", text: "Generasi komponen awal → iterasi langsung di Figma" },
                      { icon: "🔁", text: "Feedback loop desain–AI dipangkas dari hari menjadi jam" },
                    ].map(item => (
                      <div key={item.text} className="flex items-start gap-2.5">
                        <span className="text-sm shrink-0 mt-0.5">{item.icon}</span>
                        <span className="text-xs text-[#152055]/55 leading-relaxed">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual: Figma workspace mockup */}
                <div>
                  <div className="rounded-2xl overflow-hidden border border-[#152055]/8 shadow-lg bg-white">
                    {/* Figma toolbar */}
                    <div className="h-8 bg-[#1E1E1E] flex items-center px-3 gap-2">
                      <div className="w-3 h-3 rounded-sm bg-[#FF7262] flex items-center justify-center">
                        <span className="text-[6px] text-white font-bold">F</span>
                      </div>
                      <div className="flex gap-1.5">
                        {["#", "V", "R", "T"].map(t => (
                          <div key={t} className="w-5 h-5 rounded flex items-center justify-center text-[8px] text-white/50 hover:bg-white/10">
                            {t}
                          </div>
                        ))}
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <div
                          className="px-2 py-0.5 rounded text-[7px] font-bold text-white flex items-center gap-1"
                          style={{ backgroundColor: CERISE }}
                        >
                          <span>⚡</span> AI Mode
                        </div>
                      </div>
                    </div>

                    {/* Figma body */}
                    <div className="flex h-40">
                      {/* Left panel */}
                      <div className="w-24 bg-[#2C2C2C] border-r border-white/5 px-2 py-2">
                        <div className="text-[7px] text-white/30 uppercase tracking-wider mb-2">Layers</div>
                        {["PTV Flow", "∟ Screen_01", "∟ Screen_02", "Normal Flow", "∟ Screen_01", "Components"].map((l, i) => (
                          <div
                            key={i}
                            className="text-[7px] py-0.5 px-1 rounded"
                            style={{
                              color: i === 2 ? CERISE : "rgba(255,255,255,0.5)",
                              backgroundColor: i === 2 ? `${CERISE}20` : "transparent",
                            }}
                          >
                            {l}
                          </div>
                        ))}
                      </div>

                      {/* Canvas */}
                      <div className="flex-1 bg-[#383838] flex items-center justify-center gap-3 p-3">
                        {/* Mini frames */}
                        {[0, 1, 2].map(i => (
                          <div
                            key={i}
                            className="rounded-lg bg-white shadow-md flex-shrink-0"
                            style={{
                              width: 36,
                              height: 62,
                              border: i === 1 ? `2px solid ${CERISE}` : "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <div className="h-3 rounded-t-lg" style={{ backgroundColor: i === 1 ? CERISE : TNG_BLUE, opacity: i === 1 ? 1 : 0.8 }} />
                            <div className="p-1 space-y-0.5 mt-0.5">
                              {[100, 70, 90, 60].map((w, j) => (
                                <div
                                  key={j}
                                  className="rounded-sm h-1"
                                  style={{ width: `${w}%`, backgroundColor: "#152055", opacity: 0.08 + j * 0.04 }}
                                />
                              ))}
                              <div className="rounded-sm h-2 mt-1" style={{ backgroundColor: i === 1 ? CERISE : TNG_BLUE, opacity: 0.5 }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Right panel */}
                      <div className="w-24 bg-[#2C2C2C] border-l border-white/5 px-2 py-2">
                        <div className="text-[7px] text-white/30 uppercase tracking-wider mb-2">Properties</div>
                        {[
                          ["Fill", CERISE],
                          ["W", "375"],
                          ["H", "812"],
                          ["R", "12"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between mb-1">
                            <span className="text-[7px] text-white/30">{k}</span>
                            <span className="text-[7px] font-mono text-white/60">{v}</span>
                          </div>
                        ))}
                        <div
                          className="mt-2 rounded px-1.5 py-1 text-[6px] font-bold text-white text-center"
                          style={{ backgroundColor: `${CERISE}40` }}
                        >
                          ⚡ AI Suggest
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-[#152055]/30 mt-2 text-center font-medium">
                    Figma workspace · AI-assisted component generation
                  </p>
                </div>
              </div>

              {/* Connector dot */}
              <div className="hidden lg:flex items-center gap-3 pl-[3.75rem]">
                <div className="h-px flex-1 max-w-[4rem]" style={{ backgroundColor: `${NAVY}15` }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CERISE }} />
              </div>

              {/* ── PHASE 3 ───────────────────────────────────── */}
              <div className="grid lg:grid-cols-[6rem_1fr_1fr] gap-6 lg:gap-10 items-start">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg text-white shadow-md z-10"
                    style={{ backgroundColor: NAVY }}
                  >
                    03
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#152055]/30 text-center leading-tight">
                    Fase<br />Tiga
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: CERISE }}>
                    Structured Handoff
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#152055] mb-4 leading-tight">
                    Technical Bridge<br />& Design Documentation
                  </h3>
                  <p className="text-sm text-[#152055]/55 leading-relaxed mb-4">
                    Proses berakhir dengan dokumentasi keputusan desain yang terlacak — berbasis framework tesis M.MT. Setiap pilihan desain punya rationale tertulis, bukan sekadar vibes.
                  </p>
                  <div className="space-y-2">
                    {[
                      { icon: "📐", text: "Aset SVG bersih siap pakai, memenuhi spesifikasi teknis mini-program TNG" },
                      { icon: "🧩", text: "Komponen HTML/CSS siap pakai untuk developer — memperpendek gap desain ke kode" },
                      { icon: "📋", text: "Decision log terstruktur: setiap keputusan desain memiliki justifikasi bisnis dan teknis yang terdokumentasi" },
                    ].map(item => (
                      <div key={item.text} className="flex items-start gap-2.5">
                        <span className="text-sm shrink-0 mt-0.5">{item.icon}</span>
                        <span className="text-xs text-[#152055]/55 leading-relaxed">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual: HTML code snippet */}
                <div>
                  <div className="rounded-2xl overflow-hidden border border-[#152055]/8 shadow-md">
                    {/* Code header bar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A2E] border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <span className="text-[9px] text-white/30 font-mono ml-1">product-card.html</span>
                      <div
                        className="ml-auto text-[8px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${CERISE}25`, color: CERISE }}
                      >
                        Dev-Ready
                      </div>
                    </div>

                    {/* Code body */}
                    <div className="bg-[#0F1117] px-4 py-4 font-mono text-[10px] leading-relaxed">
                      <div className="text-[#6272A4]">{`<!-- TNG × GEGM: Product Card -->`}</div>
                      <div className="mt-2">
                        <span className="text-[#FF79C6]">{`<div `}</span>
                        <span className="text-[#50FA7B]">class</span>
                        <span className="text-white">=</span>
                        <span className="text-[#F1FA8C]">"product-card"</span>
                        <span className="text-[#FF79C6]">{`>`}</span>
                      </div>
                      <div className="pl-4">
                        <div>
                          <span className="text-[#FF79C6]">{`<span `}</span>
                          <span className="text-[#50FA7B]">class</span>
                          <span className="text-white">=</span>
                          <span className="text-[#F1FA8C]">"badge--ptv"</span>
                          <span className="text-[#FF79C6]">{`>`}</span>
                          <span className="text-white">PTV ✓</span>
                          <span className="text-[#FF79C6]">{`</span>`}</span>
                        </div>
                        <div className="mt-1">
                          <span className="text-[#FF79C6]">{`<h3`}</span>
                          <span className="text-[#FF79C6]">{`>`}</span>
                          <span className="text-white">Great Tenang Madani</span>
                          <span className="text-[#FF79C6]">{`</h3>`}</span>
                        </div>
                        <div>
                          <span className="text-[#FF79C6]">{`<p `}</span>
                          <span className="text-[#50FA7B]">class</span>
                          <span className="text-white">=</span>
                          <span className="text-[#F1FA8C]">"price--free"</span>
                          <span className="text-[#FF79C6]">{`>`}</span>
                          <span style={{ color: CERISE }}>RM 0.00</span>
                          <span className="text-[#FF79C6]">{`</p>`}</span>
                        </div>
                        <div className="mt-1">
                          <span className="text-[#FF79C6]">{`<button `}</span>
                          <span className="text-[#50FA7B]">class</span>
                          <span className="text-white">=</span>
                          <span className="text-[#F1FA8C]">"btn-primary"</span>
                          <span className="text-[#FF79C6]">{`>`}</span>
                        </div>
                        <div className="pl-4 text-white">Buy Now →</div>
                        <div>
                          <span className="text-[#FF79C6]">{`</button>`}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#FF79C6]">{`</div>`}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] text-[#152055]/30 mt-2 text-center font-medium">
                    HTML aset siap handoff · Zero ambiguity untuk developer
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom thesis callout */}
          <div
            className="mt-14 rounded-2xl p-6 lg:p-8 border flex flex-col lg:flex-row gap-6 items-start"
            style={{ backgroundColor: `${NAVY}05`, borderColor: `${NAVY}10` }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: `${NAVY}10` }}
            >
              🎓
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: CERISE }}>
                M.MT Thesis Foundation
              </div>
              <h4 className="font-display font-bold text-[#152055] text-lg mb-2">
                Workflow ini adalah output nyata dari riset tesis S2 di ITS Surabaya.
              </h4>
              <p className="text-sm text-[#152055]/55 leading-relaxed max-w-2xl">
                The High-Efficiency Framework — diuji secara empiris selama masa studi Manajemen Teknologi — membuktikan bahwa integrasi AI (Claude + Gemini) dalam alur kerja desain dapat memangkas waktu delivery rata-rata{" "}
                <strong style={{ color: CERISE }}>hingga 70%</strong>{" "}
                tanpa mengorbankan kualitas atau keterlacakan keputusan desain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          3. PROCESS & SYSTEM THINKING
      ════════════════════════════════════ */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: CERISE }}>
              The Core Logic
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#152055]">
              My Approach & System Thinking
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
            {/* Left: process steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="relative pl-8 border-l-2 border-[#152055]/8">
                <div
                  className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: CERISE }}
                />
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: CERISE }}>
                  01 · Research & Constraints
                </div>
                <h4 className="font-display font-bold text-[#152055] mb-2 text-[1rem]">
                  Menelusuri Ekosistem TNG dari Dalam
                </h4>
                <ul className="space-y-2">
                  {[
                    "Menelusuri seluruh flow yang sudah ada dalam TNG App — registrasi, OCR scanning, pembelian produk lain.",
                    "Membaca dokumentasi API mini-program TNG: data yang bisa didapat selama pembelian, transisi app → PWA, dan flow payment.",
                    "Mempelajari design system mini-program yang sudah disediakan tim TNG untuk menjaga konsistensi.",
                  ].map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full mt-2 shrink-0 bg-[#152055]/25" />
                      <span className="text-sm text-[#152055]/60 leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step 2 */}
              <div className="relative pl-8 border-l-2 border-[#152055]/8">
                <div
                  className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: CERISE }}
                />
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: CERISE }}>
                  02 · Data Mapping
                </div>
                <h4 className="font-display font-bold text-[#152055] mb-2 text-[1rem]">
                  Peta Data yang Tersedia vs. yang Harus Di-input
                </h4>
                <ul className="space-y-2">
                  {[
                    "Memetakan semua field yang bisa di-prefill dari SSO TNG: nama, email, NRIC, usia, nomor HP.",
                    "Menentukan logic pengecekan usia (eligibilitas asuransi) dan PTV eligibility berdasarkan NRIC secara real-time.",
                    "Merancang logika untuk mencegah pembelian silang — memastikan pemegang polis = pembeli.",
                  ].map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full mt-2 shrink-0 bg-[#152055]/25" />
                      <span className="text-sm text-[#152055]/60 leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step 3 */}
              <div className="relative pl-8 border-l-2 border-[#152055]/8">
                <div
                  className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: CERISE }}
                />
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: CERISE }}>
                  03 · Cross-Border Collaboration
                </div>
                <h4 className="font-display font-bold text-[#152055] mb-2 text-[1rem]">
                  Sinkronisasi Lintas Tim & Negara
                </h4>
                <ul className="space-y-2">
                  {[
                    "Sinkronisasi harian dengan developer Indonesia dan Malaysia untuk memvalidasi data yang tersedia vs. yang perlu di-collect.",
                    "Konsultasi langsung dengan tim TNG terkait constraints mini-program — resolusi cepat tanpa memperlambat timeline.",
                    <>
                      Seluruh proses desain-ke-handoff diselesaikan dalam{" "}
                      <strong style={{ color: CERISE }}>3 bulan</strong>{" "}
                      dengan zero revision pass dari TNG review.
                    </>,
                  ].map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1 h-1 rounded-full mt-2 shrink-0 bg-[#152055]/25" />
                      <span className="text-sm text-[#152055]/60 leading-relaxed">
                        {typeof pt === "string" ? pt : pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: flow diagram + API note */}
            <div className="space-y-5 lg:sticky lg:top-24">
              <FlowDiagram />

              {/* API doc snippet card */}
              <div className="rounded-2xl border border-[#152055]/8 bg-[#F8F8F6] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileCode2 size={14} style={{ color: CERISE }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: CERISE }}>
                    API Layer — Data Available
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { key: "user.name", source: "SSO", color: TNG_BLUE },
                    { key: "user.nric", source: "eKYC", color: TNG_BLUE },
                    { key: "user.email", source: "SSO", color: TNG_BLUE },
                    { key: "user.age", source: "eKYC derived", color: TNG_BLUE },
                    { key: "ptv.eligible", source: "Gov API → TNG", color: CERISE },
                    { key: "wallet.balance", source: "e-Wallet", color: TNG_BLUE },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between rounded-lg px-3 py-1.5 bg-white border border-[#152055]/5 font-mono text-[10px]"
                    >
                      <span className="text-[#152055]/70">{item.key}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        {item.source}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-[#152055]/35 mt-3 font-medium">
                  Semua field di atas di-prefill otomatis — user tidak perlu mengetik ulang data yang sudah ada.
                </p>
              </div>

              {/* Efficiency callout */}
              <div
                className="rounded-2xl p-5 text-white"
                style={{ backgroundColor: NAVY }}
              >
                <div className="flex items-start gap-3">
                  <Zap size={16} className="text-white/50 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-1">
                      AI-Augmented Process
                    </div>
                    <p className="text-sm leading-relaxed text-white/70">
                      Dokumentasi API dianalisis menggunakan Claude untuk mengekstrak semua
                      field data yang tersedia dalam{" "}
                      <strong style={{ color: CERISE }}>70% lebih cepat</strong>{" "}
                      dibanding pembacaan manual konvensional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          4. SOLUTION SCREENS
      ════════════════════════════════════ */}
      <section className="px-6 lg:px-12 py-20 bg-[#F8F8F6]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: CERISE }}>
              The Execution
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#152055]">
              Solution Screens
            </h2>
          </div>

          <div className="space-y-24">
            <SolutionBlock
              number="01"
              title="Seamless Third-Party Checkout"
              screen={0}
              points={[
                "Embedded PWA yang membuka langsung dari TNG App — tanpa redirect browser, tanpa friction app-switch.",
                "Tiga tier plan ditampilkan dalam satu layar dengan clear visual hierarchy: harga, coverage, dan rekomendasi.",
                "Data user (nama, NRIC, usia) sudah ter-load otomatis dari SSO sehingga checkout form terasa seperti 1-tap action.",
                "Tombol CTA mengikuti warna brand TNG untuk menjaga user tetap merasa berada dalam ekosistem yang familiar.",
              ]}
            />

            <SolutionBlock
              number="02"
              title="PTV Diskon — Real-Time Eligibility"
              screen={1}
              isReversed
              points={[
                "NRIC user divalidasi secara real-time terhadap database penerima PTV pemerintah Malaysia — tanpa input manual.",
                "Jika eligible: breakdown harga menunjukkan <strong style=\"color:#DB3E8C\">diskon 100%</strong> yang langsung teraplikasi. Jika tidak: flow pembelian normal berjalan seamless.",
                "Visual konfirmasi eligibilitas menggunakan warna Cerise (#DB3E8C) sebagai positive reinforcement — 'Anda beruntung!'",
                "Desain ini mengeliminasi potensi fraud PTV karena NRIC terikat langsung ke akun TNG yang sudah terverifikasi eKYC.",
              ]}
            />

            <SolutionBlock
              number="03"
              title="SSO + eKYC Data Confirmation"
              screen={2}
              points={[
                "Layar konfirmasi menampilkan semua data dari TNG eKYC — user hanya perlu mereview, bukan mengisi ulang.",
                "Status verifikasi eKYC dan SSO ditampilkan eksplisit sebagai trust signal sebelum user melanjutkan ke pembayaran.",
                "Satu tombol 'Confirm & Buy' langsung mentrigger e-wallet payment — end-to-end flow selesai dalam kurang dari 4 langkah.",
                "Desain mengikuti component library mini-program TNG sehingga tidak memerlukan custom approval tambahan dari tim TNG.",
              ]}
            />
          </div>

          {/* Screen selector (mobile) */}
          <div className="mt-16 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setActiveScreen(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: activeScreen === i ? CERISE : `${NAVY}20`,
                  width: activeScreen === i ? 24 : 8,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          5. MY PART & IMPACT — NAVY BG
      ════════════════════════════════════ */}
      <section className="px-6 lg:px-12 py-24 bg-[#152055] relative overflow-hidden">
        {/* Background geometry */}
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ backgroundColor: CERISE }}
        />
        <div className="absolute top-1/3 left-0 w-px h-64 bg-white/5 rotate-[15deg]" />
        <div className="absolute top-1/4 right-1/3 w-px h-48 bg-white/5 -rotate-[10deg]" />

        <div className="max-w-5xl mx-auto relative">
          <div className="mb-12">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: CERISE }}>
              The Designer's Role
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
              My Part as a Designer<br />& The Impact
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Execution */}
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${CERISE}25` }}
                >
                  <Users size={14} style={{ color: CERISE }} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: CERISE }}>
                  Aspek Eksekusi
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-4">
                Solo Designer, End-to-End
              </h3>
              <ul className="space-y-3">
                {[
                  "Bertanggung jawab penuh atas seluruh UX research, information architecture, wireframing, hingga high-fidelity prototype.",
                  "Menyediakan aset SVG siap pakai yang memenuhi spesifikasi mini-program TNG — zero revision dari tim engineering TNG.",
                  "Merapikan user flow berdasarkan analisis dokumen API dan constraint PTV — menekan potensi edge case 73%.",
                  "Mempercepat waktu prototyping dengan AI-augmented workflow (analisis doc + generasi aset) — timeline tetap terjaga.",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: CERISE }} />
                    <span className="text-sm text-white/60 leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${CERISE}25` }}
                >
                  <Zap size={14} style={{ color: CERISE }} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: CERISE }}>
                  Business Impact
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-4">
                Go-Live Regional, On-Time
              </h3>
              <ul className="space-y-3">
                {[
                  "Produk berhasil go-live di pasar Malaysia sesuai timeline — menjadi salah satu integrasi mini-program asuransi pertama di ekosistem TNG.",
                  "Mendapatkan persetujuan SOW dari manajemen TNG dan GEGM tanpa iterasi ulang di fase akhir.",
                  "Flow PTV Diskon menghilangkan hambatan entry bagi segmen menengah bawah — meningkatkan konversi di segmen yang sebelumnya tidak terjangkau.",
                  "Prototype high-fidelity dipakai langsung sebagai referensi developer — memperpendek gap desain-ke-code sebesar estimasi 40%.",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: CERISE }} />
                    <span className="text-sm text-white/60 leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key metrics row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { num: "3 mo", label: "Concept to Go-Live" },
              { num: "0", label: "Revision Rounds from TNG" },
              { num: "2", label: "Purchase Flows Shipped" },
              { num: "100%", label: "PTV Auto-Calc Accuracy" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl p-4 bg-white/5 border border-white/8 text-center">
                <div className="font-display text-3xl font-bold mb-1" style={{ color: CERISE }}>
                  {m.num}
                </div>
                <div className="text-[10px] text-white/35 font-medium leading-snug">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Navigation CTAs */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 flex-wrap">
            <div className="flex gap-3 flex-wrap">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white border-2 border-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <ArrowLeft size={14} /> Previous Project
                </button>
              )}
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white border-2 border-white/20 hover:border-white/50 transition-all duration-300"
              >
                Back to Portfolio
              </button>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="mailto:adinagayo@gmail.com"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white border-2 border-white/20 hover:border-white/50 transition-all duration-300"
              >
                <ExternalLink size={14} /> Discuss This Work
              </a>
              {onNext && (
                <button
                  onClick={onNext}
                  className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(219,62,140,0.5)] hover:opacity-90"
                  style={{ backgroundColor: CERISE }}
                >
                  Next Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
