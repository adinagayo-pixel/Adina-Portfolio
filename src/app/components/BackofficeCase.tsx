import { useState, useEffect, useRef } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"
import { BeforeAfterSlider } from "@/app/components/ui/BeforeAfterSlider"
import { ZoomableImage } from "@/app/components/ui/ZoomableImage"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, Shield, Zap, RefreshCw, Users, MessageSquare,
  Lock, Sliders, Database, Layers, ArrowRight, Activity, Filter, BarChart3, ChevronDown, Sparkles,
  ClipboardCheck, Split, CheckSquare, Clock, AlertCircle, FileText, ArrowUpRight,
  Menu, Eye, Check, X, CreditCard, Calendar, UserCheck, ShieldCheck, HelpCircle, FileCheck
} from "lucide-react"

import backofficePortalThumb from "@/imports/backoffice portal thumb.jpg"
import backofficeSalesOverview from "@/imports/backoffice-sales-overview.png"
import backofficeCustomerDetail from "@/imports/backoffice-customer-detail.png"
import backofficeDashboardBefore from "@/imports/backoffice-dashboard-before.png"
import backofficeDashboardAfter from "@/imports/backoffice-dashboard-after.png"
import backofficeClaimTrackA from "@/imports/backoffice-claim-track-a.png"
import backofficeClaimTrackB from "@/imports/backoffice-claim-track-b.png"
import backofficeDetailTrackA from "@/imports/backoffice-detail-track-a.png"
import backofficeDetailTrackB from "@/imports/backoffice-detail-track-b.png"
import backofficePaymentTrackA from "@/imports/backoffice-payment-track-a.png"
import backofficePaymentTrackB from "@/imports/backoffice-payment-track-b.png"

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

// ── Vertical step chain used inside the Two Tracks flowchart (Section 03) ────
function TrackSteps({ steps, color }: { steps: string[]; color: string }) {
  return (
    <ol className="relative space-y-2.5">
      <div className="absolute left-[9px] top-2 bottom-2 w-px" style={{ backgroundColor: `${color}40` }} />
      {steps.map((step, i) => (
        <li key={step} className="relative flex items-start gap-3">
          <span
            className="relative z-10 flex-shrink-0 w-[19px] h-[19px] rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            {i + 1}
          </span>
          <span className="text-xs sm:text-sm text-[#19244E] font-medium leading-snug pt-px">{step}</span>
        </li>
      ))}
    </ol>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

const QUICK_SECTIONS = [
  { id: "context", num: "01", label: "Context" },
  { id: "constraints", num: "02", label: "Constraints" },
  { id: "decisions", num: "03", label: "Key Decisions" },
  { id: "solution", num: "04", label: "Solution & Evidence" },
  { id: "outcome", num: "05", label: "Outcome & Reflection" },
]

export default function BackofficeCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("context")
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

      {/* Sticky top header & mobile quick jump stack */}
      <div className="sticky top-0 z-50 w-full">
        {/* White top nav */}
        <div
          className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-3 sm:py-3.5 transition-all duration-200"
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : W,
            backdropFilter: "blur(16px)",
            borderBottom: `1px solid ${HAIR}`,
          }}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              onBack()
            }}
            className="flex items-center gap-1.5 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-150 hover:opacity-75 cursor-pointer group"
            style={{ color: N }}
            title="Back to Home Portfolio"
          >
            <Home size={16} className="group-hover:scale-110 transition-transform" />
            <span>HOME</span>
          </a>

          <CaseStudyHeaderBadge caseNum="01" />
        </div>

        {/* Mobile Collapsible Quick Jump Bar - Flush underneath */}
        <div className="block lg:hidden bg-[#0e1635] text-white border-b border-white/10 shadow-lg">
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="w-full px-6 py-3 flex items-center justify-between text-xs font-sans cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-bold text-[#DB3E8C] uppercase tracking-wider shrink-0">QUICK JUMP:</span>
              <span className="font-semibold text-white/90 truncate">
                {activeSectionObj.num}. {activeSectionObj.label}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-white/70 transition-transform duration-200 shrink-0 ml-2 ${mobileMenuOpen ? "rotate-180" : ""}`}
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
      </div>


      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="space-y-6 mb-10 lg:mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 01</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>WHITE LABEL BACKOFFICE</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>MULTIPLE ENTERPRISE PARTNERSHIPS · 2024 to 2025</MonoTag>
          </div>
          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", color: N }}
          >
            One Base, Many Partners: Designing a Reusable White Label Backoffice
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-6">


            <p
              className="font-display font-medium leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              I found the shared foundation across partner portals, then spent my design time only on the parts where partners genuinely differed.
            </p>


            {/* Confidentiality Notice */}
            <div className="flex items-start gap-3 text-xs leading-relaxed text-gray-500">
              <Lock size={15} className="shrink-0 mt-0.5 text-gray-400" />
              <div>
                <strong className="font-bold text-[#19244E] block">Confidentiality Note:</strong>
                Client names, logos, and data have been sanitized to respect NDAs. Screens reflect the real design process, not real production data.
              </div>
            </div>

            <CaseStudyFacts
              facts={[
                {
                  label: "My contribution",
                  value: "Sole product designer. I mapped the shared base and designed new modules end to end.",
                },
                {
                  label: "Team & scope",
                  value: "Backend engineers and partner teams, across insurance, mobility, and affiliate.",
                },
                {
                  label: "Verified impact",
                  value: "Standard portals deployed by developers without new designs. A ride-hailing partner's portals are live.",
                  tone: "verified",
                },
                {
                  label: "Not measured here",
                  value: "Pitch turnaround. \"A few days\" is my estimate, not a tracked figure.",
                  tone: "muted",
                },
              ]}
            />
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">
            <img
              src={backofficePortalThumb}
              alt="White Label Backoffice Architecture Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 30 SECOND TAKEAWAYS: the five-stage story at a glance */}
      <div className="px-8 lg:px-16 py-8 bg-[#F9FAFB] border-t border-b border-[#19244E]/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]/60">
            30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs sm:text-sm font-sans">
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">01 · Context</span>
            <p className="text-xs sm:text-sm leading-relaxed text-[#2E3A5C]">
              Each new partner needed its own portals, with no formal design system.
            </p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-[#2E3A5C]">
              One designer across several partners, often working from open briefs.
            </p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-xs sm:text-sm leading-relaxed text-[#2E3A5C]">
              Reuse what fits, redesign what differs, and keep the chart off the date filter.
            </p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-xs sm:text-sm font-semibold text-[#19244E] leading-relaxed">
              A two-track model, a two-column claim review, and a chart with its own time control.
            </p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-xs sm:text-sm font-semibold text-[#19244E] leading-relaxed">
              Standard portals shipped without new designs. Design time went to complex claims.
            </p>
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

            {/* SECTION 01: Context */}
            <div>
              <SectionTag id="context" num="01" label="Context: The Pattern I Noticed" />

              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  My company kept getting requests for pitch proposals from new partners, and each one seemed to need its own set of portals. After designing several, the foundation looked the same every time. The terminology and data changed from client to client, but the core needs did not: monitoring performance, managing customers, and handling transactions and claims.
                </p>
                <p>
                  The system was already built for this. The admin portal handled users and roles, and every new partner was added as a new channel in the same system, with its own partner and insurance portals.
                </p>

                {/* System Architecture Diagram */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-4 my-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#DB3E8C] block font-mono">
                    UNIFIED CHANNEL ARCHITECTURE
                  </span>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#0e1635] text-white space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-[#DB3E8C]" />
                        <h4 className="font-bold text-sm">1. Central Admin Portal</h4>
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed">
                        Manages roles, permissions, system audit logs, and controls multi-tenant channel deployments.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0e1635] text-white space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#10B981]" />
                        <h4 className="font-bold text-sm">2. Partner Portal</h4>
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed">
                        Channel-level operations: customer list, transaction monitoring, and standard claims management.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0e1635] text-white space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-[#3B82F6]" />
                        <h4 className="font-bold text-sm">3. Insurance & Custom Portals</h4>
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed">
                        Specialized modules tailored for underwriting, eligibility assessment, or end-customer driver filing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Hairline />

            {/* SECTION 02: Constraints */}
            <div>
              <SectionTag id="constraints" num="02" label="Constraints: One Base, Different Partners" />

              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-6" style={{ lineHeight: 1.8 }}>
                Partners ranged from mobility and delivery to regional InsurTech and affiliate commerce, each with different users and priorities. Four constraints shaped how I worked across them:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    Icon: Users,
                    title: "One designer, several partners",
                    desc: "I was the only product designer, supporting several partners in parallel.",
                  },
                  {
                    Icon: FileText,
                    title: "Briefs with open decisions",
                    desc: "Some briefs left key decisions open. The chart brief, for example, left open whether to show transactions or policies sold, and over what time period.",
                  },
                  {
                    Icon: Database,
                    title: "Data that differed from the system",
                    desc: "Partner B's claim eligibility needed data structures that differed significantly from the existing system.",
                  },
                  {
                    Icon: Layers,
                    title: "No formal design system",
                    desc: "Partner portals were built without a formal design system in place.",
                  },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-[#DB3E8C]/10 border border-[#DB3E8C]/20 flex items-center justify-center text-[#DB3E8C]">
                      <Icon size={18} />
                    </div>
                    <h4 className="font-bold text-[#19244E] text-base">{title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <Hairline />

            {/* SECTION 03: Key Decisions */}
            <div>
              <SectionTag id="decisions" num="03" label="Key Decisions: Reuse, Claim Review, and the Chart Filter" />

              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-8" style={{ lineHeight: 1.8 }}>
                Three decisions shaped the work. Each one is shown with its evidence in Section 04.
              </p>

              <div className="space-y-6">
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">Decision 01 · Reuse first, redesign only what differs</span>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#19244E]">The question:</strong> Does the partner need a new module, or different data and claim review logic?
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#19244E]">What I did:</strong> Partner A's document-completeness flow fit the existing codebase, so it went to Track A. Partner B's four-party eligibility logic did not, so it went to Track B.
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#19244E]">Why it held:</strong> Standard portals only needed colors, logo, and terminology changes, so developers could ship them without new designs.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider block">Decision 02 · Claim data and review actions side by side</span>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#19244E]">The pressure:</strong> Partner B's eligibility check spans four parties and the policy's conditions. In the standard tab layout, staff switch back and forth between data and documents.
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#19244E]">What I did:</strong> A two-column claim detail page, with details on the left and review actions always visible on the right. I designed it with the backend team, because the data structures differed from the existing system.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block">Decision 03 · Keep the chart off the date range filter</span>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#19244E]">The pressure:</strong> Tying the chart to the dashboard's date range could make data retrieval very slow, as my backend engineer pointed out.
                  </p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    <strong className="text-[#19244E]">What I did:</strong> The chart follows the product filter, ignores the date range, and has its own monthly or yearly toggle.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <CaseStudyDisclosure label="Trade-off I accepted" summary="Why reuse comes first, and what it costs later">
                  <p>
                    Reuse is fast to start and easy to present to a client. A company that does not yet know what it wants customized can begin with a standard portal, and the flow stays largely the same. The cost comes later. When a client changes its inputs or flow, the change can ripple into other flows, so I have to check the logic and the impact of each change on the rest of the system before it ships.
                  </p>
                </CaseStudyDisclosure>
              </div>
            </div>

            <Hairline />

            {/* SECTION 04: Solution & Evidence */}
            <div>
              <SectionTag id="solution" num="04" label="Solution & Evidence: Two Tracks in Practice" />

              {/* Flowchart: partner request → decision → Track A / Track B */}
              <h3 className="font-display text-xl font-bold text-[#19244E] mb-6">The two-track model</h3>
              <div className="flex flex-col items-center">
                <div className="px-4 py-2 rounded-full bg-[#19244E] text-white text-xs font-bold uppercase tracking-wider">
                  New Partner Request
                </div>
                <div className="w-px h-6 bg-[#19244E]/25" />
                <div className="max-w-md w-full px-5 py-4 bg-white border-2 border-dashed border-[#DB3E8C]/50 rounded-xl text-center shadow-xs">
                  <span className="text-[10px] font-bold text-[#DB3E8C] uppercase tracking-wider block mb-1">Decision</span>
                  <p className="text-sm font-semibold text-[#19244E] leading-snug">
                    Does the partner need a new module, or different data and claim review logic?
                  </p>
                </div>
                <div className="w-px h-6 bg-[#19244E]/25" />
              </div>

              {/* Branch connector (desktop) */}
              <div className="relative hidden md:block h-10">
                <div className="absolute top-0 h-px bg-[#19244E]/25" style={{ left: "calc(25% - 6px)", right: "calc(25% - 6px)" }} />
                <div className="absolute top-0 bottom-0 w-px bg-[#10B981]/60" style={{ left: "calc(25% - 6px)" }} />
                <div className="absolute top-0 bottom-0 w-px bg-[#3B82F6]/60" style={{ right: "calc(25% - 6px)" }} />
                <span className="absolute top-2 text-[10px] font-bold text-[#10B981] uppercase tracking-wider" style={{ left: "calc(25% + 4px)" }}>No</span>
                <span className="absolute top-2 text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider" style={{ right: "calc(25% + 4px)" }}>Yes</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-white border border-[#10B981]/40 rounded-xl space-y-4 shadow-xs">
                  <span className="md:hidden text-[10px] font-bold text-[#10B981] uppercase tracking-wider block">If no ↓</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block font-mono">TRACK A</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] uppercase">Reuse</span>
                  </div>
                  <h4 className="font-bold text-lg text-[#19244E]">Standard Portals & Theming</h4>
                  <TrackSteps
                    color="#10B981"
                    steps={[
                      "Duplicate the Figma file from a previous project",
                      "Swap colors, logo, and terminology",
                      "Engineers reuse the codebase, enabling the partner's menus",
                      "Ship without new designs",
                    ]}
                  />
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Components and page structures stayed consistent across partners, so standard portals could move forward without new designs.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#3B82F6]/40 rounded-xl space-y-4 shadow-xs">
                  <span className="md:hidden text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider block">If yes ↓</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider block font-mono">TRACK B</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3B82F6]/15 text-[#3B82F6] uppercase">Real Design Work</span>
                  </div>
                  <h4 className="font-bold text-lg text-[#19244E]">Deep Custom Modules</h4>
                  <TrackSteps
                    color="#3B82F6"
                    steps={[
                      "Map how the partner differs beyond visuals",
                      "Redesign the data shown in customer tables",
                      "Design the partner's claim review flow",
                      "Hand off new module designs",
                    ]}
                  />
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    This is where my design process began. The most significant difference was how claims were reviewed, as the two cases below show.
                  </p>
                </div>
              </div>

              {/* Evidence 01: Claim review */}
              <h3 className="font-display text-xl font-bold text-[#19244E] mb-2">Case 1: Same Menu, Different Logic</h3>
              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-10" style={{ lineHeight: 1.8 }}>
                <p>
                  On paper, every partner needed the same thing: a Claim menu in their backoffice. In practice, two partners meant completely different things by "reviewing a claim."
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-4">
                  {/* Partner A */}
                  <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-mono">
                      PARTNER A · DOCUMENT COMPLETENESS
                    </span>
                    <h4 className="font-bold text-[#19244E] text-base">Standard Verification Flow</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Built around document completeness. A claim moves forward when its documents are complete and valid:
                    </p>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs font-mono text-[#19244E] space-y-1">
                      <div className="font-semibold text-[#DB3E8C]">Submitted → Acknowledged → Document Review → Reupload or Lack of Documents → Accepted, Rejected, or Paid</div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Operations staff handle every state. This partner fit the existing codebase, so developers could configure it without new designs.
                    </p>
                  </div>

                  {/* Partner B */}
                  <div className="p-6 bg-white rounded-xl border border-[#DB3E8C]/30 shadow-xs space-y-3">
                    <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block font-mono">
                      PARTNER B · 4-PARTY ELIGIBILITY
                    </span>
                    <h4 className="font-bold text-[#19244E] text-base">Complex Multi-User Logic</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Claims were judged on eligibility, not paperwork, and a single claim could involve four parties: the participant, the person covered, the claimant, and the nominee. Each stage was handled by a different user.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      The client gave me a business requirement specification (BRS) defining the rules and requirements. The question of how to turn those rules into a usable interface was mine to answer.
                    </p>
                  </div>
                </div>

                <p>
                  Because this flow touched data structures that differed significantly from the existing system, I worked through it with the client's team and our backend engineers before designing. The result is a claim detail page with a side panel that changes at each stage:
                </p>

                {/* 3 Stages Cards */}
                <div className="grid md:grid-cols-3 gap-4 my-4">
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck size={16} className="text-[#DB3E8C]" />
                      <h5 className="font-bold text-sm text-[#19244E]">1. Investigation</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      An assessment checklist where each item (identity of each party, event date within the policy or grace period, waiting period, exclusions, fraud check) is marked Pass, Fail, or Not Applicable, with remarks.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <Split size={16} className="text-[#3B82F6]" />
                      <h5 className="font-bold text-sm text-[#19244E]">2. Approval & Payee Split</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      The net payable is calculated by deducting any overdue contribution from the gross amount, then split across multiple beneficiaries by share and role, with a sanction check before submitting for payment.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#10B981]" />
                      <h5 className="font-bold text-sm text-[#19244E]">3. Disbursement</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Tracking per beneficiary, including handling failed payments with mandatory remarks and editable bank details.
                    </p>
                  </div>
                </div>

                <CaseStudyDisclosure label="Technical detail" summary="Full comparison: how the two claim screens differ">
                  <div className="-mx-5 rounded-b-xl border-t border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-mono border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-4 w-1/4">Aspect</th>
                            <th className="py-2.5 px-4 w-[37.5%] text-teal-800 bg-teal-50/50">Track A: Standard Portal (Reused)</th>
                            <th className="py-2.5 px-4 w-[37.5%] text-[#DB3E8C] bg-pink-50/40">Track B: Custom Module (Redesigned)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-semibold text-slate-900">What Staff Check</td>
                            <td className="py-2.5 px-4 text-slate-600">Are all documents complete and valid?</td>
                            <td className="py-2.5 px-4 font-medium text-slate-900">Is the claim eligible? Checked across 4 parties and the policy's conditions</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-semibold text-slate-900">Screen Layout</td>
                            <td className="py-2.5 px-4 text-slate-600">One column, with summary and documents on separate tabs</td>
                            <td className="py-2.5 px-4 font-medium text-slate-900">Two columns: claim details on the left, review actions always visible on the right</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-semibold text-slate-900">How Staff Review</td>
                            <td className="py-2.5 px-4 text-slate-600">Switch tabs back and forth to compare data with documents</td>
                            <td className="py-2.5 px-4 font-medium text-emerald-700 font-semibold">No tab switching. Data and documents sit side by side</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-semibold text-slate-900">Who Handles It</td>
                            <td className="py-2.5 px-4 text-slate-600">One operations staff member handles every step</td>
                            <td className="py-2.5 px-4 font-medium text-slate-900">Three roles in turn: Investigator → Underwriter → Finance (payout)</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-semibold text-slate-900">Design &amp; Build Effort</td>
                            <td className="py-2.5 px-4 text-slate-600"><strong>Reuse</strong>: Only colors and logo change. No new design work</td>
                            <td className="py-2.5 px-4 font-medium text-slate-900"><strong>Full redesign</strong>: The whole review flow, designed together with the backend team</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CaseStudyDisclosure>

                {/* Track A vs Track B, screen by screen */}
                <div className="space-y-10">
                  {[
                    {
                      stage: "Claim list",
                      a: backofficeClaimTrackB,
                      b: backofficeClaimTrackA,
                      captionA: "Claims grouped by stage, with requested and approved amounts visible.",
                      captionB: "One table of claims, keyed by person covered and certificate number.",
                    },
                    {
                      stage: "Claim detail",
                      a: backofficeDetailTrackA,
                      b: backofficeDetailTrackB,
                      captionA: "One column, with Summary and Documents on separate tabs.",
                      captionB: "Status changes are confirmed in a dialog that shows the amounts first.",
                    },
                    {
                      stage: "Assessment and payment",
                      a: backofficePaymentTrackA,
                      b: backofficePaymentTrackB,
                      captionA: "Each party and policy condition is checked in a side panel beside the claim details.",
                      captionB: "Net payable is calculated first, then split across beneficiaries by share.",
                    },
                  ].map((row) => (
                    <div key={row.stage}>
                      <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C] mb-3">{row.stage}</span>
                      <div className="grid md:grid-cols-2 gap-4">
                        <figure className="space-y-2">
                          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-xs bg-white">
                            <ZoomableImage src={row.a} alt={`${row.stage}, Track A`} />
                          </div>
                          <figcaption className="font-sans text-xs text-gray-600">
                            <strong className="text-[#19244E]">Track A.</strong> {row.captionA}
                          </figcaption>
                        </figure>
                        <figure className="space-y-2">
                          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-xs bg-white">
                            <ZoomableImage src={row.b} alt={`${row.stage}, Track B`} />
                          </div>
                          <figcaption className="font-sans text-xs text-gray-600">
                            <strong className="text-[#19244E]">Track B.</strong> {row.captionB}
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-sans text-xs text-gray-500">Recreated with dummy data.</p>
              </div>

              {/* Evidence 02: Chart */}
              <h3 className="font-display text-xl font-bold text-[#19244E] mb-2">Case 2: A Chart From an Open Brief</h3>
              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  The client asked for a new "Product Performance" indicator on their reporting dashboard, but the brief left most of it open: whether it should show transactions or policies sold, and over what time period. There were no requirements for the chart type either, so I explored and chose a grouped bar chart with one color per product, letting managers compare products side by side within each period.
                </p>
                <p>
                  Deciding how the chart should respond to the dashboard's filters took more thought. While discussing data needs with our backend engineer, I learned that tying this chart to the date range filter could make data retrieval very slow. So I proposed a filter system that separates the two:
                </p>

                <div className="grid md:grid-cols-3 gap-4 my-4">
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider block font-mono">
                      FILTER 1 (SHARED)
                    </span>
                    <h5 className="font-bold text-sm text-[#19244E]">Product Filter</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      The dashboard's product selection also applies to this chart, so the legend and bars update to match.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block font-mono">
                      FILTER 2 (EXCLUDED)
                    </span>
                    <h5 className="font-bold text-sm text-[#19244E]">Date Range Filter</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This chart ignores it, so changing the dashboard's date range doesn't trigger heavy queries.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider block font-mono">
                      FILTER 3 (LOCAL)
                    </span>
                    <h5 className="font-bold text-sm text-[#19244E]">Monthly / Yearly Toggle</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      The chart gets its own time control, defaulting to Monthly.
                    </p>
                  </div>
                </div>

                <p>
                  The result keeps the chart readable as a trend view and avoids slow loading, without adding complexity to the rest of the dashboard.
                </p>

                {/* Before and after: the chart is the addition that sets this dashboard apart from the standard white-label one */}
                <div className="my-8">
                  <BeforeAfterSlider
                    beforeSrc={backofficeDashboardBefore}
                    afterSrc={backofficeDashboardAfter}
                    alt="Dashboard before and after the Product Performance chart was added"
                  />
                  <p className="font-sans text-xs text-gray-500 mt-3">
                    Before: the standard white-label dashboard. After: the same dashboard with the Product Performance chart added. Drag to compare. Recreated with dummy data.
                  </p>
                </div>

              </div>
            </div>

            <Hairline />

            {/* SECTION 05: Outcome & Reflection */}
            <div>
              <SectionTag id="outcome" num="05" label="Outcome & Reflection" />

              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#10B981] font-mono block">Shipped</span>
                    <h5 className="font-bold text-sm text-[#19244E]">Standard portals</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Deployed by developers from the existing codebase, without design bottlenecks or redrawing.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#DB3E8C] font-mono block">Designed</span>
                    <h5 className="font-bold text-sm text-[#19244E]">Partner B's claim flow</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Multi-stage eligibility review, explored in depth and designed with the backend team.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#3B82F6] font-mono block">Estimated, not tracked</span>
                    <h5 className="font-bold text-sm text-[#19244E]">Pitch turnaround</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      A complete set of pitch portals for a new partner in a few days, based on my experience.
                    </p>
                  </div>
                </div>

                <div className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] space-y-5" style={{ lineHeight: 1.8 }}>
                  <p>
                    Separating reuse from real design work changed where my time went. Standard portals moved through the existing codebase, and my design time went to the modules that needed it, such as Partner B's claim assessment. The two-track split was not something I planned upfront. It became clear only after several projects had shipped.
                  </p>
                  <p>
                    Reusable components are a good starting point. They let a company begin with a standard portal, and they make it faster to present to a client. The lesson I take is to stay alert when a client changes its inputs or flow: every change needs its logic checked, and its impact traced to the other flows before it goes live.
                  </p>
                </div>

                {/* WHAT I LEARNED Box */}
                <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#19244E]">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">
                      WHAT I LEARNED
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                    "Designing across many partners taught me that reusability isn't about forcing every client into the same mold. The real skill is knowing which parts to keep consistent, like navigation, page structures, and common components, and which problems need to be designed from scratch together with the client and engineers."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
