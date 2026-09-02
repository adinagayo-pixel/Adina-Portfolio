import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ArrowRight, ChevronUp, X, Check } from "lucide-react"


export interface CaseStudyMeta {
  id: string
  num: string
  name: string
  client: string
  thumb?: string
}

interface CaseStudySwipeWrapperProps {
  children: React.ReactNode
  currentProject: CaseStudyMeta
  nextProject?: CaseStudyMeta | null
  prevProject?: CaseStudyMeta | null
  totalCount: number
  currentIndex: number
  allProjects?: CaseStudyMeta[]
  onNavigateNext?: () => void
  onNavigatePrev?: () => void
  onNavigateTo?: (projectId: string) => void
  onBackToHome: () => void
}

export function CaseStudySwipeWrapper({
  children,
  currentProject,
  nextProject,
  prevProject,
  totalCount,
  currentIndex,
  allProjects = [],
  onNavigateNext,
  onNavigatePrev,
  onNavigateTo,
}: CaseStudySwipeWrapperProps) {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Scroll-Aware Dock Visibility Logic
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY || window.pageYOffset : 0
    let ticking = false

    const updateScrollState = () => {
      if (typeof window === "undefined") return
      const scrollY = window.scrollY || window.pageYOffset || 0
      const windowHeight = window.innerHeight || 0
      const docHeight = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0
      )

      // Always show when near bottom of page (natural end of case study trigger)
      const atBottom = scrollY + windowHeight >= docHeight - 120
      // Always show when near top of page
      const atTop = scrollY <= 50

      if (atBottom || atTop) {
        setIsVisible(true)
      } else {
        const diff = scrollY - lastScrollY
        if (diff > 6) {
          // Scroll Down (Reading Mode): slide-down & hide dock
          setIsVisible(false)
        } else if (diff < -6) {
          // Scroll Up (Navigation Intent): slide-up & show dock (~200ms)
          setIsVisible(true)
        }
      }

      lastScrollY = scrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    updateScrollState()
    return () => window.removeEventListener("scroll", onScroll)
  }, [currentProject.id])

  return (
    <div className="relative min-h-screen w-full bg-[#F9FAFB] text-[#19244E]">
      {/* Main Case Study Article Content */}
      <motion.main
        key={currentProject.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full pb-28 sm:pb-32"
      >
        {children}
      </motion.main>

      {/* ── FLOATING MEDIA PLAYER STYLE DOCK (SCROLL-AWARE) ───────────────────── */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isVisible ? 0 : 100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        style={{
          pointerEvents: isVisible ? "auto" : "none",
        }}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-md sm:max-w-xl"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-2.5 bg-[#0D111F]/90 backdrop-blur-xl border border-[#2A2F45] rounded-full shadow-2xl shadow-black/80 text-white select-none">

          {/* Previous Button (Left) */}
          <button
            onClick={onNavigatePrev}
            disabled={!prevProject}
            aria-label="Previous Case Study"
            title={prevProject ? `Previous: ${prevProject.name}` : "First Case Study"}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/80 hover:bg-white/15 hover:text-white transition-all cursor-pointer shrink-0 ${
              !prevProject
                ? "opacity-30 pointer-events-none"
                : "hover:scale-105 active:scale-95"
            }`}
          >
            <ArrowLeft size={18} />
          </button>


          {/* Center Track Info (Clickable Area to Open Catalog Switcher Drawer) */}
          <button
            onClick={() => setIsSwitcherOpen(true)}
            aria-label="Open Case Study Catalog Switcher"
            className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-3 py-1 rounded-full hover:bg-white/5 transition-all cursor-pointer flex-1 min-w-0 text-left group"
          >
            {/* Tiny Thumbnail Preview */}
            {currentProject.thumb && (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-white/15 shrink-0 bg-black/40 shadow-sm">
                <img
                  src={currentProject.thumb}
                  alt={currentProject.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}

            {/* Metadata Column */}
            <div className="min-w-0 flex flex-col justify-center">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#9CA3AF] uppercase block leading-none mb-1">
                NOW READING
              </span>

              <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[130px] sm:max-w-[210px] leading-tight group-hover:text-[#E62E85] transition-colors">
                {currentProject.name}
              </span>
            </div>

            {/* Subtle Chevron Up Indicator */}
            <div className="shrink-0 ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-white/50 group-hover:text-[#E62E85] group-hover:bg-[#E62E85]/15 transition-all">
              <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>

          {/* Next Button (Right) */}
          <button
            onClick={onNavigateNext}
            disabled={!nextProject}
            aria-label="Next Case Study"
            title={nextProject ? `Next: ${nextProject.name}` : "Last Case Study"}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#E62E85] text-white shadow-lg shadow-[#E62E85]/30 transition-all cursor-pointer shrink-0 ${
              !nextProject
                ? "opacity-30 pointer-events-none"
                : "hover:scale-105 active:scale-95 hover:bg-[#d42777]"
            }`}
          >
            <ArrowRight size={18} />
          </button>

        </div>
      </motion.div>


      {/* ── PROJECT SWITCHER DRAWER MODAL ────────────────────────────────────── */}
      <AnimatePresence>
        {isSwitcherOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSwitcherOpen(false)}
              className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[100] max-w-2xl mx-auto bg-[#0D111F] border-t border-[#2A2F45] rounded-t-3xl p-5 sm:p-6 shadow-2xl text-white max-h-[85vh] flex flex-col"
            >
              {/* Drawer Top Bar & Close Button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#E62E85] uppercase block">
                    CASE STUDY CATALOG
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">
                    Select a Project to Jump ({allProjects.length || totalCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsSwitcherOpen(false)}
                  aria-label="Close Switcher"
                  className="p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Project List */}
              <div className="overflow-y-auto space-y-2.5 pr-1 max-h-[55vh] scrollbar-thin">
                {allProjects.map((project, idx) => {
                  const isActive = project.id === currentProject.id
                  return (
                    <button
                      key={project.id}
                      onClick={() => {
                        if (onNavigateTo) {
                          onNavigateTo(project.id)
                        }
                        setIsSwitcherOpen(false)
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                        isActive
                          ? "bg-[#E62E85]/15 border-[#E62E85] shadow-md shadow-[#E62E85]/10"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Thumbnail */}
                        {project.thumb && (
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-black/40">
                            <img
                              src={project.thumb}
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Title & Metadata */}
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono font-semibold text-white/50 block uppercase tracking-wider mb-0.5">
                            CASE {project.num} · {project.client}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                            {project.name}
                          </h4>
                        </div>
                      </div>

                      {/* Active Indicator Badge / Chevron */}
                      {isActive ? (
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E62E85] text-white text-[10px] font-mono font-bold shrink-0 ml-2">
                          <Check size={12} />
                          <span>READING</span>
                        </div>
                      ) : (
                        <span className="text-xs font-mono font-bold text-white/40 group-hover:text-white shrink-0 ml-2">
                          #{project.num}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
