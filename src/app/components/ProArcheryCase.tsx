import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe,
  FileCode2, LayoutGrid, Zap, ShoppingCart, Package, Users, MessageSquare,
  RefreshCw, FileText, ShieldCheck, GitBranch, ChevronDown, ListFilter
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
    <div id={id} className="mb-8 pt-4 scroll-mt-24">
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
  { id: "summary", num: "01", label: "Executive Summary" },
  { id: "challenge", num: "02", label: "The Strategic Challenge" },
  { id: "pipeline", num: "03", label: "AI-First Pipeline & System Architecture" },
  { id: "suite", num: "04", label: "The Dual-Portal Suite" },
  { id: "process", num: "05", label: "AI-First Design Process" },
  { id: "sustaining", num: "06", label: "Sustaining an Evolving System" },
  { id: "impact-metrics", num: "07", label: "Business Impact & Workflow Efficiency" },
  { id: "so-what", num: "08", label: "Impact & \"So What\"" },
]

export default function ProArcheryCase({ onBack, onNext, onPrev }: Props) {
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

      {/* Sticky top nav */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-200"
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
          <ArrowLeft size={12} /> Back
        </button>
        <MonoTag>Pro Archery · 4-Portal Digital Ecosystem</MonoTag>
      </div>

      {/* Mobile Collapsible Quick Jump Bar */}
      <div className="block lg:hidden sticky top-[53px] z-40 bg-[#0e1635] text-white border-b border-white/10 shadow-lg">
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

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 07</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>AI-FIRST DEVELOPMENT & E-COMMERCE SYSTEM</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>PRO ARCHERY JAKARTA · NOV 2025 – PRESENT</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            Digital Transformation & AI-Driven Retail Ecosystem
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            An ongoing, sole-designer engagement turning Indonesia's premier physical archery retailer into a 4-portal digital ecosystem, starting with a 24-hour AI-built landing page and evolving through real business pivots ever since.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-sm">
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E]">
              Sole Freelance Product Designer & AI Systems Integrator
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Region
            </span>
            <span className="font-semibold text-[#19244E]">
              Pro Archery Shop (Jakarta, Indonesia) · SG & MY Support
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Timeline
            </span>
            <span className="font-semibold text-[#19244E]">
              Nov 2025 – Present (Ongoing Engagement)
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Integrated Portals
            </span>
            <span className="font-semibold text-[#19244E]">
              4 Portals (B2C, Warranty, Admin POS, Profile)
            </span>
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
              { label: "Client & Scope", val: "Pro Archery (Jakarta, Indonesia), with storefront support built for their existing Singapore and Malaysia clientele" },
              { label: "Role & Responsibility", val: "Sole Freelance Product Designer & AI Systems Integrator, the only designer on the project since it began" },
              { label: "Core Product Suite", val: "B2C E-Commerce Storefront · Customer Warranty Portal · Admin POS & Inventory · Corporate Landing Page" },
              { label: "Core Stack", val: "Claude AI · Gemini · VS Code · Antigravity · HTML/CSS Code-Driven Prototyping (no Figma)" },
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
          <p className="font-display font-light leading-relaxed mb-10" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: N, letterSpacing: "-0.005em", lineHeight: 1.65, maxWidth: "780px" }}>
            Transitioning a brick-and-mortar archery retailer into a regional e-commerce operation meant designing four interconnected portals under real business complexity, starting with an urgent partner presentation deadline that a traditional Figma-to-code cycle wouldn't fit.
          </p>
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Business Constraints]
          </p>
          <div className="space-y-3">
            {[
              { Icon: Zap, title: "Ultra-Fast Landing Page Needed for Partner POC", desc: "An investor and partner presentation deadline required a working landing page fast enough that a traditional Figma design cycle wouldn't fit the timeline, prompting a direct AI prompt-to-code approach instead." },
              { Icon: Package, title: "Complex Inventory Mechanics", desc: "Archery gear needed granular tracking, from individual serial numbers on high-value compound bows to multi-tier member pricing, with the pricing logic itself needing to function correctly in the prototype, not just look right." },
              { Icon: RefreshCw, title: "A Business That Kept Changing Underneath the Design", desc: "This wasn't a fixed-scope project. Over the course of the engagement, Pro Archery simplified its business model from a multi-role system (Customer, Dealer, Reseller, Distributor, Dropshipper) to Customer-only, restructured how warranty and pricing worked, and cut the Admin Portal's dependency on scattered, siloed screens, all of which meant the design had to keep pace with a business still figuring itself out." },
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

        {/* 03 AI-First Pipeline & System Architecture */}
        <div>
          <SectionTag id="pipeline" num="03" label="AI-First Pipeline & System Architecture" />

          {/* Flow diagram */}
          <div className="mb-8 p-6 overflow-x-auto" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <MonoTag>[AI-First Product Pipeline]</MonoTag>
            <div className="flex items-center mt-5 min-w-max">
              {[
                { label: "AI-First Prompt-to-Code", sub: "Claude/Gemini → VS Code & Antigravity direct output", icon: Zap },
                { label: "Embedded Scenario Tester", sub: "Live grid & user-state toggle widget in prototype", icon: LayoutGrid },
                { label: "Working Lifecycle Tracking", sub: "Serial numbers, order fulfillment & POS sync", icon: ShoppingCart },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-start gap-3 min-w-[220px]">
                      <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: i === 1 ? `${C}10` : `${N}06`, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
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
              { num: "1.", title: "AI-First Prompt-to-Code Pipeline", desc: "Bypassed manual Figma layout work entirely, using AI prompting (Claude/Gemini) to generate functional frontend code directly in VS Code and Antigravity. The landing page specifically was taken from prompt to a live, working POC in a single working day, ahead of an urgent partner presentation, the origin point for the rest of the engagement. The other three portals followed the same no-wireframe, code-first approach, but on a longer timeline that included analyzing the existing business flow and identifying where it needed to improve before building." },
              { num: "2.", title: "Embedded \"Scenario Tester\" Widget", desc: "This wasn't planned from the start. During an internal review, the PM asked to compare 3, 4, and 5-column product grid layouts. Because an HTML prototype doesn't have Figma's frame-based states, jumping to a specific screen (like a logged-in checkout flow) meant restarting the whole user journey from scratch every time. Building a toggle widget directly into the prototype solved that: the PM could switch between Guest and Silver Member pricing views, or jump straight into any staged screen across the Customer and Admin portals, without walking the full flow each time." },
              { num: "3.", title: "Working Serial Number & Order Lifecycle Tracking", desc: "Designed a complete flow for the Admin Portal covering serial number input for high-value bows, warranty claim status, order fulfillment timelines, and point-of-sale integration, fully mapped out rather than left as a described requirement." },
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

        {/* 04 The Dual-Portal Suite */}
        <div>
          <SectionTag id="suite" num="04" label="The Dual-Portal Suite" />
          <div className="grid lg:grid-cols-2 gap-6">

            {/* B2C */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
                <div className="flex items-center gap-2">
                  <ShoppingCart size={12} style={{ color: C }} />
                  <MonoTag accent>[A] B2C E-Commerce & Customer Self-Service Portal</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Custom Bow & Gear Builder", desc: "Interactive product catalog supporting customized archery equipment configurations with integrated payment gateways, and international address, phone number, and shipping fields built in to support Pro Archery's existing Singapore and Malaysia customers." },
                  { title: "Customer Warranty & Order Tracking", desc: "Dedicated portal for tracking order timelines, viewing serial number certificates, managing loyalty points, and lodging warranty claims." },
                  { title: "Warranty Claims: From a Simple Flow to Four Resolution Paths", desc: "The claim review flow didn't stay simple for long. After presenting an initial straightforward version (submit → review → resolve), client feedback revealed the reality was more complex: a claim could end in four different ways depending on store conditions at the time, rejected, resolved by swapping in store stock, held pending a factory restock, or a hybrid resolution using both store stock and a pending factory claim together. Each path needed its own resolution UI and its own audit trail, including tracking the original serial number against any replacement one issued during the swap." },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                      <p className="text-sm font-semibold" style={{ color: N }}>{title}</p>
                    </div>
                    <p className="text-sm leading-relaxed pl-3.5" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${N}04` }}>
                <div className="flex items-center gap-2">
                  <Package size={12} style={{ color: C }} />
                  <MonoTag accent>[B] Back-Office Admin & POS Management Console</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Inventory & Serial Number Management", desc: "Individual serial number tracking for high-tier stock, such as Hoyt Altus compound bows, with real-time sync events (create, update, delete) designed to propagate product, pricing, and stock changes across both POS and e-commerce." },
                  { title: "Working Multi-Tier Pricing Logic", desc: "Real pricing logic, not just a visual mockup, was implemented for the two most significant tiers (Guest and Silver Member), automatically adjusting storefront rates based on which tier was active." },
                  { title: "Scenario Tester: Built Into the Prototype", desc: "Stakeholders could switch live between Guest and Silver Member pricing views, and toggle grid layouts (3/4/5 columns), directly inside the prototype during review meetings, instead of waiting for separate design revisions to see each variation." },
                  { title: "A Second Scenario Tester, Built the Same Way", desc: "The same pattern from the e-commerce prototype showed up again here. A \"Demo Controller\" widget was built directly into the claim review screen, letting stakeholders jump straight to any claim state, New, Under Review, Rejected, Store Stock Swap, Awaiting Factory, Hybrid, Resolved, without walking through the full claim lifecycle each time. It solved the same problem the original Scenario Tester did: reviewing every branch of a multi-state flow without restarting from the beginning in an HTML prototype." },
                  { title: "Manual Claims for Walk-In Customers", desc: "Not every claim starts online. A separate manual claim flow was designed for staff to search a purchase by SO number or serial number and generate a claim on the spot for walk-in or direct-contact customers, without requiring them to go through the customer portal first." },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                      <p className="text-sm font-semibold" style={{ color: N }}>{title}</p>
                    </div>
                    <p className="text-sm leading-relaxed pl-3.5" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 AI-First Design Process */}
        <div>
          <SectionTag id="process" num="05" label="AI-First Design Process" />
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-8" style={{ color: `${N}99` }}>
            [WORKFLOW: RESEARCH → PROTOTYPE → REVISE → CONSOLIDATE] · [NO TRADITIONAL WIREFRAME PHASE]
          </p>

          <div className="relative">
            <div className="hidden lg:block absolute left-[calc(3rem-1px)] top-8 bottom-8 w-px" style={{ backgroundColor: HAIR }} />
            <div className="space-y-6">
              {[
                {
                  phase: "PHASE 01", tag: "RESEARCH & DOCS",
                  title: "Research & Requirement Documentation",
                  items: [
                    { title: "Formal Spec & Business Analysis", desc: "Before any prototyping started, business requirements were researched and written up as a formal document in the team's repo, the same starting point a Figma-based project would have, just skipping the wireframe stage that would normally follow it." },
                  ],
                },
                {
                  phase: "PHASE 02", tag: "AI BUILD & REVISE",
                  title: "AI-Accelerated Prototype Build",
                  items: [
                    { title: "Prompt-to-Code Execution", desc: "Built the prototype directly from the requirement doc using Claude and Gemini for prompt-to-code generation in VS Code and Antigravity." },
                    { title: "Direct Prototype Revisions", desc: "Revisions during this phase were made directly in the prototype, bypassing the original doc for speed, with a consolidated document written up afterward summarizing the finalized flow for that module." },
                  ],
                },
                {
                  phase: "PHASE 03", tag: "HANDOFF & GAP",
                  title: "Handoff & The Annotation Gap",
                  items: [
                    { title: "Navigating Handoff Friction", desc: "This was the one part of the AI-first workflow that didn't fully match Figma's convenience. In Figma, notes and annotations sit directly on each screen. With a code prototype meant to be pulled directly by developers, there wasn't yet a clear system for that kind of inline annotation, so developers often had to read through the prototype itself to understand intent, even with supporting documentation provided alongside it." },
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

        {/* 06 Sustaining an Evolving System */}
        <div>
          <SectionTag id="sustaining" num="06" label="Sustaining an Evolving System" />
          <p className="font-display font-light leading-relaxed mb-8" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)", color: N, lineHeight: 1.6, maxWidth: "780px" }}>
            This engagement didn't end after the initial build. As the sole designer, staying on meant designing through changes that reshaped the product's foundations, not just adding features on top of a settled system.
          </p>
          <div className="space-y-4">
            {[
              {
                title: "A Mid-Engagement Business Model Pivot",
                desc: "Partway through, Pro Archery simplified its business model, moving away from a multi-role system (Customer, Dealer, Reseller, Distributor, Dropshipper) to a Customer-only model built around simple membership tiers (Regular, Silver, Gold, Platinum). Dealer status stopped affecting anything in the system; it became just a label. Pricing was decoupled from it entirely and now depends purely on membership tier, work that meant revisiting warranty activation rules, pricing logic, and catalog access that had been designed around the old model.",
                icon: GitBranch
              },
              {
                title: "Requirements That Grew More Complex After Being Seen",
                desc: "The warranty claim flow is one clear example of this pattern: what started as a simple submit-review-resolve flow became a four-path resolution system once the client saw the initial version and recognized the real operational complexity behind it, different store stock conditions meant different outcomes needed different handling. That kind of requirement growth, driven by seeing something concrete rather than speaking in the abstract, showed up more than once over the course of the engagement.",
                icon: ShieldCheck
              },
              {
                title: "Living Documentation",
                desc: "Every module carries a version history (v1.0, v2.0, sometimes v3.0) with explicit changelogs recording what changed, why, and what broke as a result, a habit that came out of necessity: a system evolving this much needed a paper trail development could follow without re-litigating old decisions.",
                icon: FileText
              },
            ].map(({ title, desc, icon: Icon }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}08`, border: `1px solid ${C}20`, borderRadius: "4px" }}>
                  <Icon size={14} style={{ color: C }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 07 Business Impact & Workflow Efficiency */}
        <div>
          <SectionTag id="impact-metrics" num="07" label="Business Impact & Workflow Efficiency" />
          <div className="grid lg:grid-cols-2 gap-4 mb-10">
            {[
              { Icon: Zap, title: "24-Hour Landing Page Deployment", desc: "Used the AI-first pipeline to ship a fully functional landing page in one day for an urgent partner presentation, the starting point for what became a long-running engagement." },
              { Icon: CheckCircle2, title: "A Working Prototype, Not Just a Mockup", desc: "The landing page prototype was solid enough that when the development team's implementation wasn't ready ahead of a fee disbursement milestone, the HTML prototype was deployed live in its place, invisible to end users. That was a one-off, specific to the landing page rather than the customer or admin portals, but a real signal of how production-ready the AI-first output actually was." },
              { Icon: Globe, title: "Regional-Ready Storefront", desc: "Built the B2C storefront to support Pro Archery's existing regional clientele in Singapore and Malaysia from day one, with international address formats, phone fields, and cross-border shipping options." },
              { Icon: RefreshCw, title: "Designed to Survive a Changing Business", desc: "When the business model pivoted mid-engagement, the warranty, pricing, and catalog systems already in place could be revised rather than rebuilt, work made possible by documentation that tracked why each decision was made in the first place." },
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
          <div id="so-what" className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl scroll-mt-24">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SECTION 08 · AI-FIRST ECOSYSTEM IMPACT & "SO WHAT"
              </span>
            </div>
            <h3 className="font-display text-xl lg:text-2xl font-semibold leading-relaxed">
              What started as a 24-hour landing page sprint has become a 4-portal e-commerce ecosystem sustained solo for close to a year, through a business model pivot, evolving warranty logic, and a pricing system that had to keep working while its foundations changed underneath it.
            </h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed max-w-3xl">
              By combining AI-driven, code-first prototyping with disciplined changelog documentation, the system could absorb real business change without losing its design logic, while staying honest about where the workflow still has friction, particularly at developer handoff.
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-sm text-[#22c55e] mb-1">24h Landing Page</span>
                <p className="text-white/60">Delivered for an urgent partner presentation, later deployed live as a stand-in for the dev build.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <span className="block font-bold text-sm text-white mb-1">Nov 2025 – Present</span>
                <p className="text-white/60">An ongoing solo engagement, not a single sprint.</p>
              </div>
              <div className="bg-[#DB3E8C]/20 p-4 rounded-lg border border-[#DB3E8C]/40">
                <span className="block font-bold text-sm text-[#DB3E8C] mb-1">Survived a Business Pivot</span>
                <p className="text-white/80 font-medium">Warranty, pricing, and catalog logic revised, not rebuilt, when the business model changed.</p>
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
                "This project shows I can move fast with AI-assisted, code-first prototyping when a deadline demands it, and that the output can be solid enough to stand in for a live build in a pinch. It also shows I can sustain a system as the sole designer over close to a year, including through a business model pivot that touched pricing, warranty, and catalog logic, and that I document decisions well enough for that kind of change to be manageable instead of a rebuild."
              </p>
            </div>
          </div>
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
