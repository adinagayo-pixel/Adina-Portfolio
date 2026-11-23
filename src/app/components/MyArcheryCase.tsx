import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"

import {
  Home, Users, FileCode2, Clock, Sun, WifiOff, Timer, ChevronDown
} from "lucide-react"

import myArcheryPerpaniThumb from "@/imports/myarchery thumb.jpg"
import myArcheryBeforeField from "@/imports/myarchery-before-field.jpeg"
import myArcheryOrganizer from "@/imports/myarchery-organizer.png"
import myArcheryReleaseTimeline from "@/imports/myarchery-release-timeline.png"
import myArcheryFieldPhotos from "@/imports/myarchery-field-photos.jpg"
import myArcheryUserTraining from "@/imports/myarchery-user-training.jpg"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`

function MonoTag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className="font-sans text-[11px] font-semibold tracking-wider uppercase"
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

function Para({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-sans text-base leading-relaxed text-[#2E3A5C] ${className}`} style={{ lineHeight: 1.8 }}>
      {children}
    </p>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#19244E]/60 font-sans block mb-3">
      {children}
    </span>
  )
}

// Field = what I saw myself on site. Feedback = what organizers and users told us.
type Source = "Field" | "Feedback"

function SourceTag({ source }: { source: Source }) {
  const field = source === "Field"
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
        field ? "bg-[#DB3E8C]/10 text-[#DB3E8C] border border-[#DB3E8C]/25" : "bg-[#19244E]/5 text-[#19244E]/75 border border-[#19244E]/15"
      }`}
    >
      {source}
    </span>
  )
}

interface Version {
  v: string
  title: string
  intro?: string
  built: { text: string; source?: Source }[]
  learned?: { text: string; source: Source }[]
  after?: string
}

function VersionCard({ v, title, intro, built, learned, after }: Version) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-4">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl font-bold text-[#DB3E8C]">{v}</span>
        <h3 className="font-bold text-base lg:text-lg text-[#19244E] leading-snug">{title}</h3>
      </div>
      {intro && <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">{intro}</p>}
      <div>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#19244E]/60 block mb-2">What I built</span>
        <ul className="space-y-2">
          {built.map((b) => (
            <li key={b.text} className="flex gap-2.5 font-sans text-sm text-[#2E3A5C] leading-relaxed">
              {b.source ? <SourceTag source={b.source} /> : <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-[#19244E]/30" />}
              <span>{b.text}</span>
            </li>
          ))}
        </ul>
      </div>
      {learned && learned.length > 0 && (
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#19244E]/60 block mb-2">What we learned</span>
          <ul className="space-y-2">
            {learned.map((l) => (
              <li key={l.text} className="flex gap-2.5 font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <SourceTag source={l.source} />
                <span>{l.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {after && <p className="font-sans text-sm text-[#19244E] leading-relaxed border-l-2 border-[#DB3E8C] pl-4">{after}</p>}
    </div>
  )
}

const WEB_VERSIONS: Version[] = [
  {
    v: "V1",
    title: "Edit scoring results, one participant at a time",
    intro: "I designed V1 from my desk in 2021.",
    built: [
      { text: "A per-participant scoring page with colors matching the target face." },
      { text: "Autosave that calculates the total, X count, and X+10." },
      { text: "Scoring details by category, target face, and distance." },
    ],
    learned: [
      { source: "Feedback", text: "Operators could not see other participants' names." },
      { source: "Feedback", text: "Too many steps to reach the scoring page and enter a score." },
      { source: "Feedback", text: "Not flexible enough for data operators to edit data." },
      { source: "Field", text: "The displayed information was not detailed enough." },
    ],
    after:
      "Then I worked a live event as an operator on my own design. I had to go back and forth between pages for every archer, and once a score was entered I could not change it. The feedback had told me what was wrong. Doing the job showed me why: an operator handles the whole field of archers under time pressure, and my page showed one archer at a time.",
  },
  {
    v: "V2",
    title: "Target bale setup and qualification on one page",
    intro: "Bale assignments were still written by hand on site, so I brought bale setup into the product and put it next to scoring.",
    built: [
      { text: "Scoring and target bale generation on one page." },
      { text: "Better grouping of participant data." },
    ],
    learned: [
      { source: "Field", text: "No indication of which session was being scored." },
      { source: "Field", text: "Scoring steps were still not flexible enough for operators under time pressure." },
      { source: "Feedback", text: "Two participant identifiers, participant number and target bale, caused confusion." },
      { source: "Feedback", text: "Download was only available for the scoresheet." },
      { source: "Feedback", text: "A clearer shoot-off indicator was needed for tied scores." },
    ],
    after:
      "One page cut the travel between pages but crowded the screen. Operators were juggling setup and scoring, and two IDs for one person. The next version had to separate the jobs.",
  },
  {
    v: "V3",
    title: "A table per class and team type, the main redesign",
    intro: "This is where field work changed the structure, not just the details. I designed scoring around the way operators actually check results: a whole class at once, in a table.",
    built: [
      { text: "Scoring separated from bale generation." },
      { text: "Filters by class category and team type." },
      { text: "Columns chosen for the job: bale, rank, name, club, total, session 1, session 2, X, X+10." },
      { text: "Elimination participants decided on the same page." },
      { text: "Scores editable at any time before moving to elimination." },
      { text: "Inactive participants can be deactivated." },
      {
        source: "Field",
        text: "One submit confirmation instead of two. An experienced scoring operator told me the double pop-up slowed him down: \"I'm sure, why ask twice?\" I kept one confirmation.",
      },
    ],
    learned: [
      { source: "Feedback", text: "Add an option to cancel qualification so scores can be edited again." },
      { source: "Field", text: "A coin toss indicator was needed for exactly tied qualification scores." },
      { source: "Field", text: "A downloadable ranking document was needed." },
    ],
    after:
      "The table let operators see everyone and fix a score in place. Editing before elimination made mistakes recoverable. The remaining gaps were about what happens after you think you are done.",
  },
  {
    v: "V4",
    title: "Cancel qualification and download documents",
    intro: "V4 became the version we ran at events from public release 2.0, Jakarta Open, in July 2022.",
    built: [
      { text: "Cancel qualification scoring, so a closed round can be reopened and corrected." },
      { text: "Downloads for the scoresheet and the qualification ranking." },
    ],
    learned: [
      { source: "Feedback", text: "Archers tied on every measure, from total down to X+10, still needed a coin toss." },
    ],
    after: "Cancel was the second safety net. V3 let operators edit before elimination; V4 let them undo the step that locked the round.",
  },
  {
    v: "V5",
    title: "Coin toss by swapping ranking positions",
    built: [
      { text: "When two archers are tied on every measure, the operator records the coin toss result by swapping their ranking positions." },
    ],
    after:
      "Coin toss was used at smaller events. It never made it into the timeline of the big events, which kept running on V4. No further improvement notes were logged after V5.",
  },
]

const MOBILE_VERSIONS: Version[] = [
  {
    v: "V1",
    title: "Scan, confirm, score",
    built: [
      { text: "Log in, then scan the archer's QR code or type the code. A code that was already used shows a notice." },
      { text: "An archer identity screen where only the bale number can be edited. Everything else comes from registration." },
      { text: "A score sheet with participant tabs across the top, each with bale and full name, distance tabs that follow the archer's registration, and ends that unlock in order." },
      { text: "X, X+10, total, and an accumulated score across all distances." },
      { text: "The ring-colored keypad, with layouts for 2, 3, and 6 arrows per end." },
    ],
  },
  {
    v: "V2",
    title: "Bale positions instead of names",
    built: [
      { source: "Field", text: "The participant switcher moved from the top to the bottom, and each tab now shows only the bale position (1A, 1B), with a + to add the next archer." },
      { text: "The archer's name moved into the header, with the other archers on the bale peeking at either side." },
      { text: "Session, participant ID, category, and distance shown as chips under the name." },
      { text: "A \"change bale\" step after scanning, for when the assigned bale is wrong." },
    ],
  },
  {
    v: "V3",
    title: "Follow the paper scoresheet",
    intro: "I rebuilt the score sheet to follow the paper scoresheet, using the one from Victory Purwakarta Open 2022 as the reference.",
    built: [
      { text: "Each end split into rows of three arrows, with a sum per row and a total per end, as on paper." },
      { text: "Arrows per end set by the event: six by default, with layouts for 3, 4, 5, 7, 8, and 12." },
      { text: "A grid keypad (X, 10, 9, 8 / 7, 6, 5, 4 / 3, 2, 1, M) in the same ring colors." },
      { text: "Two save buttons: \"next end\" stays with the archer, \"next archer\" moves along the bale, from 1A to 1B and from the last position to the next bale." },
      { text: "A strip of every bale position that shows which are done." },
      { text: "Closing a bale asks for confirmation and explains that scores are already saved and that scanning the QR code reopens it." },
    ],
  },
]

const KEYPAD = [
  { keys: "X · 10 · 9", ring: "Yellow", bg: "#FACC15", fg: N },
  { keys: "8 · 7", ring: "Red", bg: "#DC2626", fg: W },
  { keys: "6 · 5", ring: "Blue", bg: "#2563EB", fg: W },
  { keys: "4 · 3", ring: "Black", bg: "#111827", fg: W },
  { keys: "2 · 1", ring: "White", bg: W, fg: N },
]

const EVENTS = [
  { when: "Oct 2021", release: "Alpha", name: "The HUB Scoring Games 2021, with The HUB Cibubur" },
  { when: "Mar 2022", release: "Public 1.0", name: "Jakarta Series opener, by PERPANI Jakarta" },
  { when: "Jul 2022", release: "Public 2.0", name: "Jakarta Open 2022, Jakarta Series event 2" },
  { when: "Sep 2022", release: "Public 2.1", name: "Fast Open 3 Pangkoarmada I, Jakarta Series event 3" },
  { when: "Nov 2022", release: "Public 2.2", name: "Queen Archery Competition 2022, Governor DKI Cup, the series finale" },
  { when: "Dec 2022", release: "Public 2.3", name: "BSBC Indoor 2022, regency championship in Sumbawa Barat, NTB" },
  { when: "Dec 2022", release: "Public 2.4", name: "Victory Purwakarta Open 2022, with PERPANI Purwakarta" },
]

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

const QUICK_SECTIONS = [
  { id: "context", num: "01", label: "Context" },
  { id: "field", num: "02", label: "Field Research" },
  { id: "web", num: "03", label: "Web Scoring, V1 to V5" },
  { id: "mobile", num: "04", label: "Mobile Scoring, V1 to V3" },
  { id: "outcome", num: "05", label: "Outcome & Reflection" },
]

export default function MyArcheryCase({ onBack }: Props) {
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

          <CaseStudyHeaderBadge caseNum="05" />
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
                    <span className={`font-mono text-[11px] ${isActive ? "text-white" : "text-[#DB3E8C]"}`}>
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
            <MonoTag accent>CASE STUDY 05</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>SPORTS TECH & FIELD RESEARCH</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>PERPANI · 2021 to 2023</MonoTag>
          </div>
          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", color: N }}
          >
            MyArchery · Scoring Built From the Scoring Table
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <p
              className="font-display font-medium leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              I designed how scores get into MyArchery: the mobile app runners use at the target, and the web page operators use to check every score. Then I sat at the scoring table as an operator, watched my own design fall short, and kept changing it across seven tournaments.
            </p>

            <CaseStudyFacts
              facts={[
                {
                  label: "My contribution",
                  value: "Product designer for qualification scoring: web V1 to V5 and mobile V1 to V3. I started as a junior designer in 2021, became PIC in 2022 after my senior left, and from early 2023 was the only designer on MyArchery, working directly with the CEO.",
                },
                {
                  label: "Team & scope",
                  value: "Four designers, three after my senior resigned. Teammates designed elimination scoring and brackets. I also designed event creation, participant management, ID cards, certificate templates, public scoreboards, the reconciliation dashboard, and official and participant registration.",
                },
                {
                  label: "Verified impact",
                  value: "Used at seven live tournaments, October 2021 to December 2022.",
                  tone: "verified",
                },
                {
                  label: "Not measured here",
                  value: "Before and after timing or error rates. This case rests on field observation and the issue log from each version.",
                  tone: "muted",
                },
              ]}
            />
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">
            <img
              src={myArcheryPerpaniThumb}
              alt="MyArchery System Preview"
              data-case-hero className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm font-sans">
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">01 · Context</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Tournaments ran on Google Forms, WhatsApp, spreadsheets, and IANSEO, which only handles scoring.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">02 · Field Research</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">I worked all seven tournaments as a score input operator, and learned IANSEO hands-on.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">03 · Web Scoring</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">From a page per archer (V1) to one editable table with tie handling (V5).</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">04 · Mobile Scoring</span>
            <p className="text-sm font-semibold text-[#19244E] leading-relaxed">The runner's app moved to bale positions, then to a layout that follows the paper scoresheet.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-sm font-semibold text-[#19244E] leading-relaxed">Every version ran at live events. Web V4 was the standard from July 2022.</p>
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
          <SectionTag id="context" num="01" label="Context: Tournaments Run on Fragmented Tools" />

          <Para className="mb-8">
            Before MyArchery, PERPANI tournaments ran on a patchwork of tools: Google Form signups, WhatsApp bank transfer checks, spreadsheet rosters, and IANSEO for scoring. Paper scoresheets had to be collected and retyped before standings could update, which meant delays every round.
          </Para>

          <div className="mt-10">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#19244E]/60 font-sans block mb-4">How hosting worked before MyArchery</span>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-50 text-[11px] text-gray-500 uppercase font-mono border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Stage</th>
                    <th className="py-2.5 px-4">Tools organizers used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[#2E3A5C]">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-[#19244E]">Create the registration form</td>
                    <td className="py-2.5 px-4">Google Form, event proposal, technical handbook</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-[#19244E]">Broadcast and answer questions</td>
                    <td className="py-2.5 px-4">WhatsApp group</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-[#19244E]">Recap registration data</td>
                    <td className="py-2.5 px-4">Excel, Ianseo</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-[#19244E]">Host the event and score</td>
                    <td className="py-2.5 px-4">Ianseo, Excel, printing devices</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-[#19244E]">Publish results and certificates</td>
                    <td className="py-2.5 px-4">Ianseo, WhatsApp</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <figure className="mt-10">
            <img
              src={myArcheryBeforeField}
              alt="Before MyArchery: registration, results, and coordination across WhatsApp, Google Form, Ianseo, and paper score sheets"
              className="w-full h-auto rounded-xl border border-gray-200 shadow-xs"
            />
            <figcaption className="font-sans text-xs text-gray-500 mt-3">
              Before MyArchery: registration ran on Google Forms and WhatsApp, and results came from printed Ianseo brackets and paper score sheets.
            </figcaption>
          </figure>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                Icon: Users,
                title: "Fragmented Registrations",
                desc: "Manual Google Form signups and bank transfer checks over WhatsApp created heavy operational overhead.",
              },
              {
                Icon: FileCode2,
                title: "A Scoring-Only Tool",
                desc: "IANSEO is mature and trusted, but it only handles scoring. Everything around it stayed manual.",
              },
              {
                Icon: Clock,
                title: "Paper Re-Entry Delays",
                desc: "Standings waited every round while paper scoresheets were collected and typed in by hand.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#DB3E8C]/10 border border-[#DB3E8C]/20 flex items-center justify-center text-[#DB3E8C]">
                  <Icon size={18} />
                </div>
                <h4 className="font-bold text-[#19244E] text-base">{title}</h4>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6">
            <Para>
              MyArchery's bet was the whole process in one place: event creation, registration for individuals, teams through their clubs, and officials, qualification and elimination scoring, target bale setup, brackets, ID cards, certificates, and results. That bet had to hold up against a tool staff already trusted. At some events, staff ran IANSEO in parallel with our app.
            </Para>
            <Para>
              The people around a scoring table are not only athletes. Coaches and parents usually come with them, clubs register teams, organizers run the event, and on-site staff do the scoring: input operators, referees, and scoring runners.
            </Para>
            <div>
              <Label>My role, and how it changed</Label>
              <Para>
                I joined Reka Cipta Digital in August 2021 as a junior designer on a team of four designers, assigned to qualification scoring. My senior worked remotely. When they resigned in 2022, I became PIC, partly because I was based in Jakarta and could attend competitions, and I led the remaining team of three, including daily standups. From early 2023 until I left in May 2023, I was the only designer on MyArchery and worked directly with the CEO on product decisions.
              </Para>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 02 Field Research */}
        <div>
          <SectionTag id="field" num="02" label="Field Research: Working the Scoring Table" />

          <Para className="mb-8">
            Desk design could not show me what scoring felt like on the day, so I went to the events. I attended all seven tournaments where MyArchery ran, and I worked as a score input operator while I observed.
          </Para>

          <figure className="mb-10">
            {/* A wide strip: scrolls sideways inside the frame on small screens instead of shrinking to nothing */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-xs">
              <img
                src={myArcheryFieldPhotos}
                alt="Five photos from MyArchery tournaments: a laptop at the scoring table, our team under the scoring tent with participants, a paper scoresheet held next to a phone, the MyArchery team at the scoring table, and a monthly online training session for users"
                className="block w-full min-w-[880px] h-auto"
              />
            </div>
            <figcaption className="font-sans text-xs text-gray-500 mt-3">
              In the field: the scoring table, a paper scoresheet next to a phone, and our team under the tent with PERPANI staff and participants. Last panel: one of the monthly online training sessions for users, which I usually presented.
            </figcaption>
          </figure>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 text-[11px] text-gray-500 uppercase font-mono border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">When</th>
                  <th className="py-2.5 px-4">Release</th>
                  <th className="py-2.5 px-4">Tournament</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[#2E3A5C]">
                {EVENTS.map((e) => (
                  <tr key={e.release} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-semibold text-[#19244E] whitespace-nowrap">{e.when}</td>
                    <td className="py-2.5 px-4 whitespace-nowrap">{e.release}</td>
                    <td className="py-2.5 px-4">{e.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <figure className="mt-6">
            <img
              src={myArcheryReleaseTimeline}
              alt="MyArchery release timeline, from the alpha release in October 2021 to public release 2.4 in December 2022"
              className="w-full h-auto rounded-xl border border-gray-200 shadow-xs bg-white"
            />
          </figure>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <Label>How I gathered insight</Label>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                All of it was informal: participant observation as an on-site scoring operator, informal interviews with on-site staff, lightweight surveys, small group discussions, and quick usability checks during live events. I talked with input staff while we worked, logged the issues I saw, and stepped in to fix problems on site.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                I watched score input operators, referees, scoring runners, and the parents and coaches waiting on results.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                Between events, MyArchery ran a free online training session every month for coaches, officials, clubs, and event organizers. I usually presented and walked them through the features. The sessions did several jobs at once: teaching the product, announcing updates, and hearing what users struggled with.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <Label>Learning the incumbent tool</Label>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                To understand what staff were comparing us with, I learned IANSEO myself. After the Jakarta Series opener in March 2022, my company ran a workshop with a highly experienced IANSEO operator, who taught us directly. We installed IANSEO on our laptops and learned it from there.
              </p>
            </div>
          </div>

          <figure className="mt-10">
            <img
              src={myArcheryUserTraining}
              alt="Slide from my deck: posters for five monthly MyArchery training sessions from August 2022 to January 2023, a screenshot of an online session, and the sessions' purpose: marketing, training users on features, gaining insights from users, and informing users of upcoming updates"
              className="w-full h-auto rounded-xl border border-gray-200 shadow-xs bg-white"
            />
            <figcaption className="font-sans text-xs text-gray-500 mt-3">
              Posters for five of the monthly training sessions, August 2022 to January 2023, from my own presentation deck.
            </figcaption>
          </figure>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { Icon: Sun, title: "Outdoor glare", desc: "At outdoor events, screens had to stay readable in direct sun." },
              { Icon: WifiOff, title: "Patchy Wi-Fi", desc: "Connections dropped during scoring." },
              { Icon: Timer, title: "Short gaps between ends", desc: "Scores had to be entered and checked before the next end started." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="p-6 bg-[#111836] text-white rounded-2xl space-y-3">
                <Icon size={18} className="text-[#EAB308]" />
                <h4 className="text-base font-bold">{title}</h4>
                <p className="text-sm text-white/75 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Label>The scoring workflow I saw</Label>
            <ol className="space-y-3">
              {[
                "Scoring runners enter each archer's arrows in the mobile app.",
                "The scores appear on the web.",
                "Operators verify them on the web.",
                "When runners fall behind, operators also enter scores on the web themselves.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3 font-sans text-sm text-[#2E3A5C] leading-relaxed">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#19244E] text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <Para className="mt-4">
              In the first release, target bale assignments were still written by hand on site. Bale setup in the product came later, in web V2.
            </Para>
          </div>

          <div className="mt-10 p-6 bg-white rounded-xl border-l-4 border-[#DB3E8C] border-y border-r border-y-gray-200 border-r-gray-200 space-y-3">
            <Label>Why trust mattered as much as speed</Label>
            <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
              My documentation started from a risk assumption: scoring that is not recorded is easy for participants to dispute or interfere with. On site I saw how real that was. At one event, a participant's parents got angry at our team because the score they saw did not match the one they expected, and the CEO stepped in to settle it with them. Operators needed to be fast, but every number also had to be correct and easy to defend.
            </p>
          </div>

          <div className="mt-6">
            <CaseStudyDisclosure label="On site" summary="Two incidents I handled at events">
              <ul className="space-y-3 list-none">
                <li>
                  <strong className="text-[#19244E]">A wrong gender at registration.</strong> A male participant had been registered as female, which would have put him in the women's category and disrupted the competition. I investigated his account myself and worked with the backend team to correct it.
                </li>
                <li>
                  <strong className="text-[#19244E]">A results PDF that didn't match.</strong> A results PDF did not match the scores we had entered. I was the only team member on site, so I cross-checked the numbers and raised it as urgent. The cause turned out to be a logic error on the backend.
                </li>
              </ul>
            </CaseStudyDisclosure>
          </div>

          <Para className="mt-10">
            These moments set the bar for the scoring work that follows: fast for operators, correct for officials, and trustworthy for the families watching.
          </Para>
        </div>

        <Hairline />

        {/* 03 Web Scoring */}
        <div>
          <SectionTag id="web" num="03" label="Web Qualification Scoring, V1 to V5" />

          <Para className="mb-6">
            Qualification is the round that ranks every archer before elimination. Its output decides who goes into the bracket and where, so one wrong score can move the whole elimination bracket. I designed all five versions of the web side, and every one of them ran at live events.
          </Para>

          <div className="flex flex-wrap items-center gap-4 mb-8 font-sans text-xs text-[#2E3A5C]">
            <span className="flex items-center gap-2"><SourceTag source="Field" /> my own observation on site</span>
            <span className="flex items-center gap-2"><SourceTag source="Feedback" /> from organizers and users</span>
          </div>

          <div className="space-y-6">
            {WEB_VERSIONS.map((ver) => (
              <VersionCard key={ver.v} {...ver} />
            ))}
          </div>

          <div className="mt-12">
            <Label>Four threads across the five versions</Label>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "From one archer to the whole field",
                  desc: "V1 was built around a single participant. By V3 the operator saw every archer in a class, with the columns needed to verify and edit fast.",
                },
                {
                  title: "Reversible decisions",
                  desc: "Because qualification feeds the bracket, a wrong score had to be fixable. V3 made scores editable until elimination; V4 added cancelling qualification itself.",
                },
                {
                  title: "Tie handling matured",
                  desc: "Shoot-off was part of tie handling from early on, and V2 feedback asked for a clearer indicator. Coin toss came much later: my V3 field notes flagged exact ties, V4 feedback extended that down to X+10, and V5 shipped coin toss by swapping ranks.",
                },
                {
                  title: "Where the insights came from",
                  desc: "In V1, three of four issues came from feedback. In V2, two of five came from my field notes; in V3, two of three did, plus the confirmation fix. The more time I spent at the scoring table, the less I relied on second-hand reports.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="p-5 bg-white border border-gray-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-base text-[#19244E]">{title}</h4>
                  <p className="text-sm text-[#2E3A5C] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 04 Mobile Scoring */}
        <div>
          <SectionTag id="mobile" num="04" label="The Other Side of the Table: Mobile Scoring, V1 to V3" />

          <Para className="mb-8">
            The web page is only as good as the scores that reach it. Those come from scoring runners, who enter each archer's arrows on a phone at the target. I designed that app too, through three versions, and all three ran at live events.
          </Para>

          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-4 mb-8">
            <Label>The scoring keypad</Label>
            <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
              I researched how archery scoring works, then mapped the keypad colors to the official target rings, with M for a miss. Runners tap the color they see on the target face.
            </p>
            <div className="flex flex-wrap gap-2">
              {KEYPAD.map((k) => (
                <div
                  key={k.ring}
                  className="rounded-lg px-4 py-2.5 border border-[#19244E]/15 text-center min-w-[88px]"
                  style={{ backgroundColor: k.bg, color: k.fg }}
                >
                  <span className="block text-sm font-bold">{k.keys}</span>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider opacity-80">{k.ring}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {MOBILE_VERSIONS.map((ver) => (
              <VersionCard key={ver.v} {...ver} />
            ))}
          </div>

          <Para className="mt-8">
            No one else took mobile scoring over after V3: from early 2023 I was the only designer on the product. Elimination scoring and brackets were designed by teammates.
          </Para>

          <figure className="mt-10">
            <img
              src={myArcheryOrganizer}
              alt="MyArchery organizer app: event management, QR check-in, scoring, and e-certificates"
              className="w-full h-auto rounded-xl border border-gray-200 shadow-xs"
            />
            <figcaption className="font-sans text-xs text-gray-500 mt-3">
              The organizer app: event management, QR check-in for participants, scoring, and e-certificates.
            </figcaption>
          </figure>
        </div>

        <Hairline />

        {/* 05 Outcome & Reflection */}
        <div>
          <SectionTag id="outcome" num="05" label="Outcome & Reflection" />

          <div className="space-y-4 mb-10">
            {[
              {
                tag: "WEB SCORING",
                title: "Five versions, all used at live events",
                desc: "A page per archer, then bale setup on the same page, then the class table with in-place editing, then cancel qualification and downloads, then coin toss. V4 was the standard from public release 2.0 in July 2022; coin toss was used at smaller events.",
              },
              {
                tag: "MOBILE SCORING",
                title: "Three versions, all used at live events",
                desc: "From scan and score, to bale positions, to a layout that follows the paper scoresheet.",
              },
              {
                tag: "BEYOND SCORING",
                title: "Registration, scoreboards, and reconciliation",
                desc: "Self-service registration for participants and officials with payment through Midtrans, public live scoreboards, and a financial reconciliation dashboard for organizing committees, all used at live events.",
              },
            ].map(({ tag, title, desc }) => (
              <div key={tag} className="p-5 bg-white border border-gray-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">{tag}</span>
                <h4 className="font-bold text-base text-[#19244E]">{title}</h4>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                VERIFIED OUTCOME (OCT 2021 TO DEC 2022)
              </span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-light leading-snug">
              Used at seven live tournaments, from The HUB Scoring Games to the Jakarta provincial series and regency and district championships.
            </h3>

            <p className="font-sans text-base text-white/90 leading-relaxed max-w-3xl">
              I have no before and after timing or error rates. The evidence is the issue log for each version and what I saw at the scoring table.
            </p>

            {/* WHAT I LEARNED Box */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-white space-y-2 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-sm font-sans leading-relaxed text-white/90 italic" style={{ lineHeight: 1.8 }}>
                "V1 was my design, and it looked reasonable on a desk. It took one shift as an operator to see that it made people page through archers one at a time and locked scores they might need to fix. Learning IANSEO the same way, hands-on with someone who knew it well, showed me what staff were measuring us against. Since then I test the existing product hands-on before I redesign it, and I design for the people doing the work under pressure, not for the screen."
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
