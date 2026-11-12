import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, LayoutGrid, Zap, ShoppingCart, Package, Users, MessageSquare,
  RefreshCw, FileText, ShieldCheck, GitBranch, ChevronDown, ListFilter, Sparkles,
  X, Maximize2
} from "lucide-react"

import heroImg from "@/imports/image-8.jpg"
import proArcheryThumb from "@/imports/proarcherythumb5.jpg"
import proArcheryInventory from "@/imports/proarchery-inventory.jpg"
import proArcheryStockTransaction from "@/imports/proarchery-stock-transaction.jpg"
import proArcheryPricingTiers from "@/imports/proarchery-pricing-tiers.jpg"
import proArcheryOrderTracking from "@/imports/proarchery-order-tracking.jpg"

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
    <div id={id} className="mb-10 scroll-mt-24">
      <span aria-hidden="true" className="block font-display font-medium leading-none text-[#DB3E8C]/30 text-6xl lg:text-7xl mb-4">
        {num}
      </span>
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

export default function ProArcheryCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("context")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    title: string
    badge: string
    desc: string
  } | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
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

          <CaseStudyHeaderBadge caseNum="08" />
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
      <div className="px-6 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="space-y-6 mb-10 lg:mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 08</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>AI FIRST DEVELOPMENT & E COMMERCE SYSTEM</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>PRO ARCHERY JAKARTA · NOV 2025 to PRESENT</MonoTag>
          </div>
          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
          >
            Taking an Archery Shop Online: Four Connected Surfaces, Designed and Built Solo
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-6">


            <p
              className="font-display font-medium leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              A public landing page, a storefront with customer self service, and an admin and POS console for Pro Archery, a physical archery retailer in Jakarta. It started with a landing page built with AI in 24 hours, and has changed with the business ever since.
            </p>
            <CaseStudyFacts
              facts={[
                { label: "My contribution", value: "Sole freelance product designer and AI systems integrator, from the start of the project." },
                { label: "Team & scope", value: "Pro Archery (Jakarta), with storefront support for existing Singapore and Malaysia customers. Four surfaces." },
                { label: "Verified impact", value: "A landing page shipped in one day, and a four surface ecosystem sustained solo for close to a year." },
                { label: "Not measured here", value: "Sales and storefront revenue figures." },
              ]}
            />
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={proArcheryThumb}
              alt="Pro Archery Ecosystem Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 30 SECOND TAKEAWAYS: the five-stage story at a glance */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 bg-[#F9FAFB] border-t border-b border-[#19244E]/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]/60">
            30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm font-sans">
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">01 · Context</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A brick and mortar archery retailer going regional, across four surfaces.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A tight partner deadline, pricing that had to work, and a business model that kept changing.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Prompt to code over a Figma cycle, real pricing logic, and four warranty resolution paths.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Four surfaces: landing page, storefront, customer portal, and admin and POS.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A landing page in one day, then a solo ecosystem sustained for close to a year.</p>
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
                <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
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
                      <span className={`font-mono text-[11px] shrink-0 pt-0.5 ${isActive ? "text-white" : "text-[#DB3E8C]"}`}>
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
          <div className="space-y-20 lg:space-y-28 min-w-0">

        {/* 01 Context */}
        <div>
          <SectionTag id="context" num="01" label="Context: A Brick and Mortar Retailer Going Digital" />
          <div className="space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Transitioning a brick and mortar archery retailer into a regional e commerce operation meant designing four interconnected surfaces under real business complexity, starting with an urgent partner presentation deadline.
            </p>
            <p>
              The ecosystem starts with a public facing Company Profile and Landing Page, built to route into two functional portal groups: a B2C storefront with customer self service, and a back office admin and POS console.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 02 Constraints */}
        <div>
          <SectionTag id="constraints" num="02" label="Constraints: A Tight Deadline, Complex Inventory, a Shifting Business" />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "A partner POC deadline", desc: "A working landing page had to be ready faster than a traditional Figma design cycle would allow." },
              { title: "Complex inventory", desc: "Serial numbers on high value bows, and multi tier member pricing that had to work in the prototype, not just look right." },
              { title: "A business that kept changing", desc: "Pro Archery simplified its business model mid engagement, so warranty, pricing, and catalog logic had to keep moving." },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                <h4 className="font-bold text-[#19244E] text-base">{title}</h4>
                <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 03 Key Decisions */}
        <div>
          <SectionTag id="decisions" num="03" label="Key Decisions: Prompt to Code, Real Logic, Four Resolution Paths" />

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 01 · Prompt to code instead of a Figma cycle</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> The investor and partner deadline did not fit a traditional Figma to code cycle.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I wrote the business requirements as a formal document first, then built the prototype directly from it with Claude and Gemini in VS Code and Antigravity.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> The output was production ready enough to stand in for the dev build, once, while it caught up.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 02 · Real logic, not just screens</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Pricing had to function across tiers, not just look right in a mockup.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I implemented real pricing logic for the two highest priority tiers, Guest and Silver Member, and built scenario testers into the prototype so stakeholders could switch views live.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> Stakeholders saw the logic work during review, without waiting for separate design revisions.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 03 · Four resolution paths, not one simple flow</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> The first warranty flow was submit, review, resolve. The client saw that a claim could end four ways, depending on store stock and factory status.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I designed each path with its own resolution UI and audit trail, tracking the original serial number against any replacement issued during a swap.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> The flow matched the real operational complexity, instead of hiding it.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <CaseStudyDisclosure label="Trade-off I accepted" summary="Documentation instead of Figma annotations">
              <p>
                Without Figma's inline annotations, developers sometimes had to read the prototype itself to understand intent. I compensated with version histories and changelogs for every module, and I still write handover documents by hand.
              </p>
            </CaseStudyDisclosure>
          </div>
        </div>

        <Hairline />

        {/* 04 Solution & Evidence */}
        <div>
          <SectionTag id="solution" num="04" label="Solution & Evidence: Four Surfaces, Working Logic" />

          <div className="mt-2">
            <p className="font-sans text-base leading-relaxed text-[#2E3A5C] mb-6" style={{ lineHeight: 1.8 }}>
              Four screens from the system. Click any screen to zoom in.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "01 · Inventory & SKU Taxonomy", img: proArcheryInventory, badge: "Admin POS Console", desc: "Granular equipment catalog with SKU taxonomy, multi-variant tracking, and Publish, Active, and Draft statuses." },
                { title: "02 · Barcode Stock Transactions", img: proArcheryStockTransaction, badge: "Warehouse Engine", desc: "Barcode scanner interface for incoming shipments, transfers, and warehouse bookings." },
                { title: "03 · Multi-Tier Pricing Categories", img: proArcheryPricingTiers, badge: "Dynamic Markup", desc: "Tier-based markup engine across Retail, Bronze, Silver, Gold, Platinum, and Family member tiers." },
                { title: "04 · Order & Warranty Tracking", img: proArcheryOrderTracking, badge: "B2C Self-Service Portal", desc: "Live order timeline, itemized serial number mapping, and integrated courier delivery tracking." },
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setSelectedImage({ src: item.img, title: item.title, badge: item.badge, desc: item.desc })}
                  className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer shadow-xs"
                >
                  <div className="relative aspect-[16/11] rounded-lg overflow-hidden border border-gray-200 mb-3 bg-gray-50">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top rounded group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase text-white border border-white/20">
                      {item.badge}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-[#19244E] mb-1 tracking-wide">{item.title}</h4>
                    <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Serial number tracking syncs create, update, and delete events across POS and e-commerce, so product, pricing, and stock changes stay consistent. The warranty flow also includes a manual claim path for walk in customers, searched by SO or serial number.
            </p>
            <p>
              The process followed the requirement doc, then prompt to code prototyping, then a comparison against staging once it existed, so the PM could see exactly where the gap was between design and development.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 05 Outcome & Reflection */}
        <div>
          <SectionTag id="outcome" num="05" label="Outcome & Reflection" />

          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Shipped</span>
                <h5 className="font-bold text-base text-[#19244E]">A landing page in one day</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">For an urgent partner presentation, and the start of a long running engagement.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Sustained</span>
                <h5 className="font-bold text-base text-[#19244E]">Solo for close to a year</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">Through a business model pivot, evolving warranty logic, and a pricing system that kept working.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Not measured here</span>
                <h5 className="font-bold text-base text-[#19244E]">Revenue figures</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">This case does not include sales or storefront revenue numbers.</p>
              </div>
            </div>

            <div className="font-sans text-base leading-relaxed text-[#2E3A5C] space-y-5" style={{ lineHeight: 1.8 }}>
              <p>
                Because the documentation tracked why each decision was made, I could revise the warranty, pricing, and catalog systems already in place, instead of rebuilding them.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">WHAT I LEARNED</span>
              <p className="text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                "Working AI first taught me that speed does not have to come at the cost of rigor, but it does shift where that rigor lives. Without Figma's frame based states or inline annotation, I had to build my own tools, like the scenario testers, and my own documentation habits to keep a fast moving, constantly changing system explainable to developers."
              </p>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#0d142d] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-white/10 bg-[#141b36]">
              <div className="flex items-center gap-3">
                <span className="bg-[#DB3E8C]/20 border border-[#DB3E8C]/40 text-[#DB3E8C] text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {selectedImage.badge}
                </span>
                <h3 className="font-display font-bold text-white text-base">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Tutup preview"
                className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Stage */}
            <div className="flex-1 overflow-auto p-3 sm:p-6 flex items-center justify-center bg-[#070b1a]">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-auto h-auto max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Footer with Description */}
            <div className="p-4 sm:px-6 border-t border-white/10 bg-[#141b36] text-sm text-white/80 font-sans leading-relaxed">
              {selectedImage.desc}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

