import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"


import coverTng from "@/imports/Cover TNG.jpg"
import tngThumb4 from "@/imports/TNG thumb4.jpg"
import tngThumb5 from "@/imports/TNG thumb5.jpg"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, Shield, Zap, RefreshCw, GitBranch, Users, MessageSquare, Sparkles, AlertTriangle, ChevronDown
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

export default function TngCase({ onBack, onNext, onPrev }: Props) {
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

          <CaseStudyHeaderBadge caseNum="02" />
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
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <MonoTag accent>CASE STUDY 02</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>FINTECH & EMBEDDED MICRO INSURANCE</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>TOUCH 'N GO x GEGM · 2025</MonoTag>
            </div>

            <h1
              className="font-display font-bold leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
            >
              Seamless Micro Insurance & Government Subsidy Integration
            </h1>

            <p
              className="font-display font-light leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              Great Tenang Madani, embedded in the Touch 'n Go eWallet, where a government subsidy's eligibility decides the premium a user pays.
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              I was the sole product designer on a 3 month deadline. The design went through five versions before the final release, and each version shows what changed and why.
            </p>

            <CaseStudyFacts
              facts={[
                {
                  label: "My contribution",
                  value: "Sole UI/UX designer: PWA architecture, data flows, UI specs, and developer handoff. I built a mirrored TNG UI kit so design could start before official assets arrived.",
                },
                {
                  label: "Team & scope",
                  value: "Touch 'n Go and GEGM product and design teams, plus our engineering team. Scope: embedded PWA checkout, SSO and eKYC pre-fill, and PTV voucher verification.",
                },
                {
                  label: "Verified impact",
                  value: "V5 released to production inside the Touch 'n Go eWallet in 2025.",
                  tone: "verified",
                },
                {
                  label: "Not measured here",
                  value: "Adoption and conversion figures. The monthly plan share in Section 03 is client data, not my own measurement.",
                  tone: "muted",
                },
              ]}
            />
          </div>

          {/* Right Column: Hero Cover Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={coverTng}
              alt="Touch 'n Go x GEGM Cover"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 30 SECOND TAKEAWAYS: the five-stage story at a glance */}
      <div className="px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Context</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">A micro insurance checkout inside Malaysia's leading eWallet, with over 20 million users in the ecosystem.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">A 3 month deadline, eWallet webview rules, PTV voucher checks, and NRIC matching to stop purchases on behalf of others.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Explicit health declarations, two pricing options instead of many, and the platform's native X to close the flow.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">An embedded PWA with SSO and eKYC pre-fill. Eligible PTV users see a RM 0 premium; others pay through e-wallet debit.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">V5 released to production in 2025. By V5, the TNG team reviewed copy instead of requesting layout changes.</p>
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

        {/* 01 Context */}
        <div>
          <SectionTag id="context" num="01" label="Context: Reading the System Before Designing" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Touch 'n Go's eWallet was the channel, so the first task was understanding what the app could already do. I mapped the registration, OCR scanning, and purchase flows, and studied the TNG mini program API docs to find which data fields I could access.
            </p>
            <p>
              Official TNG UI kits were not available at the start. I rebuilt a mirrored kit from the live app so stakeholders could approve the first round. That was a calculated risk: if the official kit differed, the work would need rework. Waiting would have spent time the three month deadline did not have.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 02 Constraints */}
        <div>
          <SectionTag id="constraints" num="02" label="Constraints: Platform, Data, and Compliance" />

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                Icon: Globe,
                title: "Embedded platform",
                desc: "The checkout ran as an embedded PWA inside an eWallet webview. Moving from the app to the webview required a mandatory transition page under platform rules.",
              },
              {
                Icon: FileCode2,
                title: "Limited identity data",
                desc: "SSO and eKYC fields were limited to what the TNG mini program API exposed. Where availability was unconfirmed, I kept a manual address field.",
              },
              {
                Icon: Shield,
                title: "Fraud and compliance",
                desc: "The policyholder's NRIC had to match the authenticated TNG account, so no one could buy a subsidized policy for a third party. Regulatory commission statements and explicit consent were added in V4.",
              },
              {
                Icon: Zap,
                title: "Subsidy-driven pricing",
                desc: "PTV eligibility was checked per user, and each user's premium depended on it. Gross premium rules were not provided in V1, so I used dummy values until the client confirmed them.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#DB3E8C]/10 border border-[#DB3E8C]/20 flex items-center justify-center text-[#DB3E8C]">
                  <Icon size={18} />
                </div>
                <h4 className="font-bold text-[#19244E] text-base">{title}</h4>
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 03 Key Decisions */}
        <div>
          <SectionTag id="decisions" num="03" label="Key Decisions: Three Calls That Shaped the Flow" />

          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-8" style={{ lineHeight: 1.8 }}>
            Most revisions were wording and pricing changes. These three calls changed how the product behaved, and each one held through release.
          </p>

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 01 · Health declarations stay explicit</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> The TNG team asked repeatedly why "No" answers were not pre-filled to reduce cognitive load.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I did not pre-fill them. The "Select No for All" button I added still needed explicit user action.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> Health declarations have to be read and accepted, not bypassed as a formality.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 02 · Two pricing options instead of many</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> V2 introduced 8 to 12 month durations based on age eligibility. The choices felt unnatural for an insurance product, and the price display was unclear.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I questioned the requested direction and said the concept felt unrefined, rather than treating the choices as a finished brief.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> The TNG team streamlined to monthly or yearly after its data showed over 90% of users chose monthly payments (client data).
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 03 · Native X over a custom Back button</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> After payment, GEGM requested an explicit "Back to App" or "Close" button.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> A custom button risked suggesting a return path after the transaction was final. After discussion, we relied on the native X in the mini program header.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> It is a platform pattern users already recognize, and it does not imply they can re-select products.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <CaseStudyDisclosure label="Trade-off I accepted" summary="Why two separate steps and not one">
              <p>
                Personal details and health declarations stayed as two steps. Merging them would have changed the existing backend architecture, so I kept them separate despite continued pressure about drop-off rates. Plan selection also stayed on the landing page, so users were not making extra decisions once they reached data entry.
              </p>
            </CaseStudyDisclosure>
          </div>
        </div>

        <Hairline />

        {/* 04 Solution & Evidence */}
        <div>
          <SectionTag id="solution" num="04" label="Solution & Evidence: The Embedded Checkout" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              The flow has three parts: identity pre-fill from SSO and eKYC, a PTV eligibility check, and a payment split. Eligible users reach a RM 0 premium. Everyone else continues to standard e-wallet debit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {
                Icon: Users,
                title: "1. Pre-fill identity",
                desc: "SSO and eKYC data pre-fill NRIC, name, and age, so users do not retype their identity.",
              },
              {
                Icon: CheckCircle2,
                title: "2. Check PTV eligibility",
                desc: "An inline NRIC check tells users whether they qualify. Ineligibility shows a yellow status, not red, because it is not an error.",
              },
              {
                Icon: Sparkles,
                title: "3. Pay with e-wallet",
                desc: "Standard purchases debit the TNG e-wallet, with auto-debit, notifications, emails, and insufficient balance handling.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-[#DB3E8C]" />
                  <h5 className="font-bold text-sm text-[#19244E]">{title}</h5>
                </div>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#111836]">
                <img src={tngThumb4} alt="TNG eKYC Data Mapping & Pricing Logic Screen" className="w-full h-auto object-cover max-h-[480px]" />
              </div>
              <p className="font-sans text-xs text-gray-500 mt-3">V2: eKYC data mapping and pricing logic.</p>
            </div>

            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#111836]">
                <img src={tngThumb5} alt="TNG Policy Checkout & Design System Integration" className="w-full h-auto object-cover max-h-[480px]" />
              </div>
              <p className="font-sans text-xs text-gray-500 mt-3">V4: policy checkout built on the official TNG design system.</p>
            </div>
          </div>

          <div className="mt-10">
            <CaseStudyDisclosure label="Technical detail" summary="Iteration history: V1 to V5">
              <ul className="space-y-3 list-none">
                <li><strong className="text-[#19244E]">V1 · Foundation.</strong> Built on the mirrored kit. Mapped accessible data parameters through direct testing, added a manual address field, auto-detected age ranges for monthly or yearly pricing, and added the app-to-webview transition page and the NRIC eligibility check for PTV vouchers.</li>
                <li><strong className="text-[#19244E]">V2 · Pricing logic.</strong> Introduced 8 to 12 month durations and edge cases for vouchers already claimed, unregistered, or mismatched. Streamlined to monthly or yearly, and changed the ineligible status from red to yellow.</li>
                <li><strong className="text-[#19244E]">V3 · Details.</strong> Added post-declaration terms, a summary popup before payment, and an eligibility reset whenever NRIC fields change. Replaced floating error popups with full-page error screens.</li>
                <li><strong className="text-[#19244E]">V4 · Design system.</strong> Adapted inputs, illustrations, typography, buttons, colors, and icons to the official TNG kit. Designed two landing page options; stakeholders chose the first. Added regulatory commission statements and explicit consent checkboxes.</li>
                <li><strong className="text-[#19244E]">V5 · Exit flow & release.</strong> Relied on the native X to close the flow after payment, finalized platform copy, and established auto-debit, notifications, emails, and insufficient balance handling.</li>
              </ul>
            </CaseStudyDisclosure>
          </div>
        </div>

        <Hairline />

        {/* 05 Outcome & Reflection */}
        <div>
          <SectionTag id="outcome" num="05" label="Outcome & Reflection" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                VERIFIED OUTCOME (2025)
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
              V5 was released to production inside the Touch 'n Go eWallet. Most revisions across the five versions focused on wording and pricing rather than major UX overhauls. My role was defending decisions under repeated questioning, accepting genuine technical constraints, and trusting my read when a requested direction felt unrefined. The monthly plan data later supported that read.
            </p>

            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
              The same discipline applies to any product in a regulated, high-traffic ecosystem: balance compliance and platform limits, and be ready to defend the decisions that protect users.
            </p>

            {/* What I Learned */}
            <div className="mt-6 p-6 rounded-xl bg-white/5 border border-white/10 text-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                "Working inside the TNG ecosystem taught me that enterprise design is not about creative freedom: it is about building trust fast enough that teams allow you to make decisions without re checking every pixel. By version 5, the TNG team stopped asking for layout revisions and only reviewed copy: that shift in trust was the true milestone of this project."
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
