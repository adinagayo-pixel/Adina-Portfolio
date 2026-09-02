import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"


import coverTng from "@/imports/Cover TNG.jpg"
import tngThumb4 from "@/imports/TNG thumb4.png"
import tngThumb5 from "@/imports/TNG thumb5.png"
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
  { id: "summary", num: "01", label: "Executive Overview" },
  { id: "beforev1", num: "02", label: "Before V1: Reading the System" },
  { id: "v1", num: "03", label: "V1: Laying the Foundation" },
  { id: "v2", num: "04", label: "V2: Testing the Pricing Logic" },
  { id: "v3", num: "05", label: "V3: Refining the Details" },
  { id: "v4", num: "06", label: "V4: Meeting the Real Design System" },
  { id: "v5", num: "07", label: "V5: The Exit Flow & Finish Line" },
  { id: "impact", num: "08", label: "Closing & Key Impact" },
]

export default function TngCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("summary")
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
            <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse shrink-0" />
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
              <MonoTag accent>CASE STUDY 01</MonoTag>
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
              Great Tenang Madani is a micro insurance product integrated directly into Touch 'n Go eWallet: an ecosystem with over 20 million users: via an embedded PWA leveraging native TNG SSO and eKYC data.
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              I served as the sole UI UX Designer on this project under a 3 month deadline. This project progressed through 5 design iterations before its final release: and each version tells its own story about what changed and why.
            </p>
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

      {/* EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS */}
      <div className="px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Complex multi party eKYC data mapping & insurance checkout inside Malaysia's top eWallet (20M+ users).</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">3 month deadline, native eWallet webview constraints, PTV government subsidy voucher validation APIs.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Sole UI UX Designer (PWA Architecture, Data Flows, UI Specs & Handoff).</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Refined through 5 iterative versions before shipping the final zero defect release live to 20M+ TNG users in 2025.</p>
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
                <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
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

        {/* 01 Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Initiative", val: "Touch 'n Go eWallet x Great Eastern Life (GEGM) · 2025" },
              { label: "Role & Scope", val: "Sole Product Designer" },
              { label: "Core Product Suite", val: "Embedded PWA Insurance Checkout · Native SSO & eKYC Data Pipeline · PTV Subsidy Verification" },
              { label: "Core Stack", val: "Figma · FigJam · Embedded PWA Webview · TNG SSO & eKYC Schema" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 02 Before V1: Reading the System Before Designing It */}
        <div>
          <SectionTag id="beforev1" num="02" label="Before V1: Reading the System Before Designing It" />
          
          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Before the first sketch was created, I mapped out existing flows within the TNG app: registration processes, OCR scanning, and purchase flows for other products: while studying TNG mini program API documentation to identify accessible data fields. Because official TNG UI kits were unavailable initially, I constructed a mirrored UI kit based on the live TNG app to secure first round approvals: taking a real risk that this reverse engineered kit might not align once official assets arrived. However, waiting meant wasting valuable time against a tight deadline, so I proceeded forward.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 03 V1: Laying the Foundation */}
        <div>
          <SectionTag id="v1" num="03" label="V1: Laying the Foundation" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              I built this initial version on the mirrored UI kit. I mapped accessible data parameters from the TNG app through direct testing, included a manual address field because system data availability was unconfirmed, and created a UI that auto detected age ranges for monthly or yearly pricing since costs varied by age group. I also added a mandatory transition page for moving from app to webview based on platform rules, plus an NRIC eligibility check flow for PTV government vouchers.
            </p>
            <p>
              Two foundational decisions emerged here that held through project completion. First, health declarations: the TNG team asked repeatedly why "No" answers were not pre filled to reduce cognitive load. I intentionally avoided pre filling: health declarations must be read and consciously accepted rather than bypassed as a formality. The solution was not a middle compromise, but a "Select No for All" button that still required explicit user action. Second, the TNG team proposed merging this declaration step with the preceding personal details step to remove one screen. After checking with our internal engineering team, combining them would impact the existing backend architecture: so I maintained two separate steps despite continued pressure regarding drop off rates.
            </p>
            <p>
              Gross premium calculations were also unprovided by the client in V1, so I proceeded using dummy values while awaiting calculation rules: and the "ineligible PTV" status initially used red with a cross icon, a common pattern for negative states that I later revised.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 04 V2: Testing the Pricing Logic */}
        <div>
          <SectionTag id="v2" num="04" label="V2: Testing the Pricing Logic" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              In V2, I introduced insurance duration options ranging from 8 to 12 months based on age eligibility, and detailed edge case scenarios for when PTV vouchers were already claimed, unregistered, or NRIC details mismatched. At this stage, I questioned the requested direction: offering that many duration choices felt unnatural for an insurance product, and unclear communication regarding price display made me suspect the concept was unrefined. My intuition proved correct: the TNG team ultimately streamlined all choices down to just two: monthly or yearly: after data revealed over 90% of users chose monthly payments.
            </p>
            <p>
              In this version, I also revised the "ineligible PTV" status color from red to yellow, after the TNG team highlighted that red with a cross conveyed user rejection or system error, whereas ineligibility for a government subsidy did not imply a mistake.
            </p>

            <div className="mt-6 rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#111836]">
              <img src={tngThumb4} alt="TNG eKYC Data Mapping & Pricing Logic Screen" className="w-full h-auto object-cover max-h-[480px]" />
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 V3: Refining the Details */}
        <div>
          <SectionTag id="v3" num="05" label="V3: Refining the Details" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Changes in V3 were more granular: adding post health declaration terms, a summary review popup prior to payment, automatic resets with a reappearing "Check Eligibility" button whenever NRIC fields were edited, and replacing floating error popups with full page screens for technical issues. During this iteration, the TNG team suggested moving plan selection to the data entry screen: I maintained plan selection on the landing page so users were not distracted by additional decisions once focused on data entry.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 06 V4: Meeting the Real Design System */}
        <div>
          <SectionTag id="v4" num="06" label="V4: Meeting the Real Design System" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              This was a major milestone: I finally received official TNG UI kits, adapting all components: input fields, illustrations, typography, buttons, colors, and icons: to align with the system. I designed two landing page alternatives, with the first concept selected by stakeholders. Structurally, the official UI kit matched what I had constructed: a validating sign that the early reverse engineering approach was accurate. Compliance requirements also expanded here: incorporating regulatory commission statements and explicit consent checkboxes.
            </p>

            <div className="mt-6 rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-[#111836]">
              <img src={tngThumb5} alt="TNG Policy Checkout & Design System Integration" className="w-full h-auto object-cover max-h-[480px]" />
            </div>
          </div>
        </div>

        <Hairline />

        {/* 07 V5: The Exit Flow & Finish Line */}
        <div>
          <SectionTag id="v5" num="07" label="V5: The Exit Flow & Finish Line" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Near final release, a design issue emerged not from technical constraints, but from conflicting client expectations and native platform behavior. Following payment completion, our web page could not return users to the purchase flow because the transaction was finished. GEGM requested an explicit "Back to App" or "Close" button, but TNG mini programs already featured a native X header icon, though subtle. Adding a custom button posed greater risk: users might assume they could return to re select products when the transaction was already final. Following discussions, we relied on the platform's native X icon: trusting native patterns recognized by users.
            </p>
            <p>
              This final release also finalized platform copy, streamlined premium choices down to monthly or yearly as anticipated in V2, and established auto debit flows, push notifications, emails, and insufficient balance handling.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 08 Closing & Key Impact */}
        <div>
          <SectionTag id="impact" num="08" label="Closing & Key Impact" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & PRODUCT VALIDATION (2025)
              </span>
            </div>
            
            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
              Across these five design iterations toward one final release, most revisions focused on wording and pricing adjustments rather than major UX overhauls. Yet at critical junctures, my role was defending sound decisions despite repeated questioning, accepting genuine technical constraints, and trusting my instincts when requested directions felt unrefined until data ultimately validated those views.
            </p>

            {/* What I Learned */}
            <div className="mt-6 p-6 rounded-xl bg-white/5 border border-white/10 text-white space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#DB3E8C]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                "Working inside the TNG ecosystem taught me that enterprise design is not about creative freedom: it is about building trust fast enough that teams allow you to make decisions without re checking every pixel. By version 5, the TNG team stopped asking for layout revisions and only reviewed copy: that shift in trust was the true milestone of this project."
              </p>
            </div>

            {/* Why This Matters to a Hiring Manager */}
            <div className="mt-6 p-6 rounded-xl bg-[#DB3E8C]/15 border border-[#DB3E8C]/40 text-white space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-[#DB3E8C]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHY THIS MATTERS TO A HIRING MANAGER
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                "This project demonstrates my ability to navigate enterprise complexity within an ecosystem of 20 million plus users: balancing strict eKYC compliance and government API constraints, while preserving defensible design decisions despite repeated client pushback."
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

