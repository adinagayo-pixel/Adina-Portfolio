import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  Smartphone, BarChart2, Camera, MessageSquare,
  Shield, Database, MapPin, AlertCircle, Users, WifiOff, RefreshCw, Layers, CheckSquare, ChevronDown, Sparkles
} from "lucide-react"

import heroImg from "@/imports/image-9.png"
import eSaksiThumb from "@/imports/e-saksi thumb.jpg"

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
      className="font-sans text-xs font-semibold tracking-wider uppercase"
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
      <div className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#DB3E8C]">
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
  { id: "challenge", num: "02", label: "The Strategic Challenge" },
  { id: "pilar1", num: "03", label: "Pillar 1: AI + Human Hybrid Verification" },
  { id: "pilar2", num: "04", label: "Pillar 2: Offline First Mode & Sync" },
  { id: "pilar3", num: "05", label: "Pillar 3: Sainte Laguë Table & Alerts" },
  { id: "supporting", num: "06", label: "Supporting Systems" },
  { id: "process", num: "07", label: "Design Process & Pipeline" },
  { id: "impact-business", num: "08", label: "Business Impact & Deliverables" },
  { id: "impact", num: "09", label: "Closing & Key Impact" },
]

export default function ElectionCase({ onBack, onNext, onPrev }: Props) {
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

          <CaseStudyHeaderBadge caseNum="04" />
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
      <div className="px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <MonoTag accent>CASE STUDY 04</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>CIVIC TECH & ELECTION SYSTEMS</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>NATIONAL POLITICAL PARTY · 2024</MonoTag>
            </div>

            <h1
              className="font-display font-bold leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
            >
              Designing for the Unpredictable: Election Monitoring System for 38 Provinces
            </h1>

            <p
              className="font-display font-light leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              Indonesian Political Party (National) · 2024 Presidential & Legislative Elections
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              A multi platform system for real time vote monitoring, designed for the party's national witness network: 820,000 plus TPS across 38 provinces where the party had registered witnesses, each submitting through the same monitoring system: built to hold up under the exact conditions a national election guarantees: unreliable signal, tight time windows, and data that has to be right the first time. I worked as solo UX UI Designer & Systems Architect across four connected platforms: a web admin dashboard, a web verification portal, a mobile app for TPS witnesses, and a web data entry tool, all within a fixed 48 hour live tabulation window.
            </p>
          </div>

          {/* Right Column: Hero Dummy Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={eSaksiThumb}
              alt="Election System Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Real time vote monitoring for 820,000+ TPS across 38 provinces under zero signal & 48 hour deadlines.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Non-negotiable election date, offline first field conditions, AI handwriting OCR fallback, Sainte Laguë seat logic.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Solo Designer: architected 4 connected platforms, offline sync mode, AI human hybrid review, and Sainte Laguë alert engine.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">System ran live across 38 provinces with zero downtime during the 48 hour 2024 election tabulation window.</p>
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
          <SectionTag id="summary" num="01" label="Executive Overview" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Scale", val: "Indonesian National Political Party · 38 Provinces · 820,000+ Polling Stations (TPS)" },
              { label: "Role & Ownership", val: "Sole Product Designer" },
              { label: "Product Ecosystem", val: "Mobile Witness App · Web AI Verification Portal · Web Data Entry Tool · Web Admin Dashboard" },
              { label: "Core Stack", val: "Figma Live Co Design · Offline Sync Engine · Sainte Laguë Alert Matrix · Emergency Backup App" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 02 The Strategic Challenge */}
        <div>
          <SectionTag id="challenge" num="02" label="The Strategic Challenge" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              An election doesn't wait for good conditions. The system had to work whether a witness was in a city with full signal or a village with none, whether a form was filled out neatly or scrawled in a rush during vote counting, and whether the AI reading a handwritten tally got it right or needed a human to step in.
            </p>
            <p>
              Four separate election types: President, DPR RI, DPRD Provinsi, DPRD Kabupaten or Kota: each required separate vote entry, verification, and seat allocation logic, all racing against the same 48 hour clock, on infrastructure I couldn't control: signal dead zones, WhatsApp numbers that could go down without warning, and thousands of witnesses with varying comfort levels with technology.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 03 Pillar 1 — AI + Human Hybrid Verification */}
        <div>
          <SectionTag id="pilar1" num="03" label="Pillar 1: AI + Human Hybrid Verification" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Vote tallies in Indonesia are handwritten on physical forms (C Hasil), then photographed and submitted by TPS witnesses. An AI model reads the handwriting and auto fills the digital form, but handwriting isn't always legible, and the system needed a real fallback, not just a best effort guess.
            </p>
            <p>
              Party order on every ballot paper follows the same official KPU numbering nationwide. Rather than treating this as a fixed constraint, it became the foundation of the verification flow: reviewers first select which parties appear on the form they're looking at, then move through numbered tabs matching the physical layout of the paper: letting a reviewer under time pressure jump straight to the relevant section instead of scrolling through an unfamiliar list. The system also distinguishes between two paper types, Plano and Berita Acara, each with a slightly different verification path, and includes a built in reject path for photos that are duplicates, unreadable, or the wrong form entirely.
            </p>
            <p>
              Witnesses submit photos from a mobile app in the field. A separate web tool handles verification and manual correction, staffed by a dedicated entry team whose job is specifically to catch and fix what the AI got wrong before results are finalized. This wasn't designing for the ideal case and hoping the AI held up: it meant building two parallel experiences, one fast and automated, one manual and deliberate, making sure a human could always step in without the system falling apart around them.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 04 Pillar 2 — Offline-First Mode & Sync */}
        <div>
          <SectionTag id="pilar2" num="04" label="Pillar 2: Offline First Mode & Sync" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              This feature didn't exist in the original scope. It came from the client physically traveling across Indonesia ahead of the election and finding regions with limited or no signal, then requesting an offline mode close to launch.
            </p>
            <p>
              Rather than treating offline as an error state, the interface treats it as expected: a persistent "Mode di luar jaringan" label stays visible, and TPS entries split into two clear tabs, "Belum diinput" and "Sudah diinput," pulled automatically from each witness's pre assigned region. Instead of requiring users to sync each entry individually, a single "Sinkron Semua Data" button handles everything at once when connection returns, reducing the risk of a witness syncing nine out of ten records and forgetting the tenth. Entries waiting to sync are marked with a recycle plus alert icon: a convention chosen after looking at how similar pending state indicators are used elsewhere, rather than inventing a new pattern users would have to learn from scratch. This mode covers the Tanda Terima and Manual Entry flows, the two places where data capture couldn't afford to simply stop because a witness had no signal.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 05 Pillar 3 — Sainte-Laguë Table & Alert System */}
        <div>
          <SectionTag id="pilar3" num="05" label="Pillar 3: Sainte Laguë Table & Alert System" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Seat allocation in Indonesian elections uses the Sainte Laguë method, dividing each party's vote count by a sequence of odd numbers to determine who wins each seat. It's mathematically sound and visually unreadable to almost everyone outside election administration.
            </p>
            <p>
              Understanding it well enough to explain to developers meant going past a surface definition: reading official sources on how and why the method works, then studying how existing third party election tracking sites had solved the same visualization problem for the 2019 election. That research became the basis for a table format showing each party's vote count against its sequence of divisors side by side, so anyone from the party, not just someone fluent in the math, could see how seat allocation was playing out. On top of the raw table, five alert categories translated the numbers into plain language risk signals: from "Menang Telak" to "Kalah Telak": based on vote margin thresholds. This wasn't just displaying a formula; it meant learning an unfamiliar domain well enough to make independent design decisions about what mattered to surface, then defending that logic to the development team building it.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 06 Supporting Systems */}
        <div>
          <SectionTag id="supporting" num="06" label="Supporting Systems" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Submissions originally ran through 12 regional WhatsApp numbers, tied to a custom system for tracking whether each number was actively connected. As data started coming in scattered across a dozen separate channels, the team moved primary submission to a centralized web app instead. When the WhatsApp system genuinely went down close to the election, the previously built Emergency App became the fallback channel, letting witnesses keep submitting without a working WA connection.
            </p>
            <p>
              Witness verification checked whether a submitted phone number was already a member of the relevant WhatsApp group: a cheaper, faster proxy for identity than a costly SMS OTP flow, and one that fit how these regional groups already operated. A separate system tracked the physical handover of election documents (Tanda Terima), recording who was responsible and which TPS the documents came from, with multiple design alternatives explored before landing on the final version, including a photo only variant for cases where full manual entry wasn't practical.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 07 Design Process & Workflow Pipeline */}
        <div>
          <SectionTag id="process" num="07" label="Design Process & Workflow Pipeline" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              <strong>Domain Research</strong>: Learned Sainte Laguë from official sources and studied existing third party visualizations before designing the internal seat allocation tables and alert system.
            </p>
            <p>
              <strong>Core Flow Design</strong>: Designed the AI assisted verification flow across mobile and web, including the party selection and tabbed review system built around the fixed KPU ballot order.
            </p>
            <p>
              <strong>Field Driven Iteration</strong>: Added Offline Mode and the Emergency App in response to real conditions the client encountered in the field: low signal regions and a WhatsApp outage: rather than assumptions made at the planning stage.
            </p>
            <p>
              <strong>Scope Discipline Under Deadline</strong>: Several planned modules (Admin, Profile, TPS Prioritas) were deliberately shelved to protect the timeline for higher priority flows, since an election date isn't a deadline that moves.
            </p>
            <p>
              <strong>Live Co Design Agility</strong>: Much of the client facing work happened in real time. Rather than presenting only finished mockups, sessions often involved designing directly in Figma while the client watched, adjusting flows and layouts on the spot based on their feedback. This was before AI assisted design tools were common, so it meant thinking and building at the same pace as the conversation. The client's feedback throughout these sessions was directly positive, often remarking on how quickly the work moved from discussion to something visible.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 08 Business Impact & Key Deliverables */}
        <div>
          <SectionTag id="impact-business" num="08" label="Business Impact & Key Deliverables" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Every major design decision: the verification fallback, the offline mode, the emergency channel: existed because the happy path alone wasn't going to hold up on election day. Seat allocation logic and alert thresholds were researched and designed independently, then translated into specifications a development team could build against. Major features were added mid project based on direct observations from the client's own fieldwork, not a fixed brief handed down at the start.
            </p>
            <p>
              An honest note on results data: TPS level submission and accuracy data does exist from election day, but wasn't something I had direct access to at the time. What I can speak to directly is that the systems ran, and the team was on standby throughout the tabulation window supporting live operations.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 09 Closing & Key Impact */}
        <div>
          <SectionTag id="impact" num="09" label="Closing & Key Impact" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & PRODUCT VALIDATION (2024)
              </span>
            </div>
            
            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
              Four interconnected platforms, built and evolved under a fixed, non negotiable deadline, covering witness submission, AI assisted verification, offline data capture, and seat allocation reporting. By designing dual path flows for every failure point: AI verification with human fallback, online submission with an offline mode, WhatsApp with an emergency backup: the system was built to keep functioning when any single piece failed, which mattered more in this context than almost anywhere else.
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
                "This project taught me that designing for conditions I don't control: bad signal, tight deadlines, a domain I didn't start out understanding: means building in fallbacks from the start, not patching them in after something breaks."
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
                "This project shows I can design for conditions I don't control, a domain I didn't start out understanding, and still deliver systems the team could rely on during the live window. Much of the client relationship was built live, designing directly in Figma during meetings and adjusting on the spot rather than only presenting finished work. It also shows I know the difference between what I can confidently claim and what I can't, which matters as much as the design work itself."
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

