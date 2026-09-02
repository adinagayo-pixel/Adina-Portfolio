import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronUp, ArrowDown, Check } from "lucide-react"

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
  onNavigateNext?: () => void
  onNavigatePrev?: () => void
  onBackToHome: () => void
}

export function CaseStudySwipeWrapper({
  children,
  currentProject,
  nextProject,
  prevProject,
  totalCount,
  currentIndex,
  onNavigateNext,
  onNavigatePrev,
  onBackToHome,
}: CaseStudySwipeWrapperProps) {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [topPullDistance, setTopPullDistance] = useState(0)
  const [isLoadingPrev, setIsLoadingPrev] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset transition state whenever project changes
  useEffect(() => {
    setIsTransitioning(false)
    setTopPullDistance(0)
    setIsLoadingPrev(false)
  }, [currentIndex, currentProject.id])

  // Cross-browser document height helper
  const getDocHeight = () => {
    return Math.max(
      document.body.scrollHeight || 0,
      document.documentElement.scrollHeight || 0,
      document.body.offsetHeight || 0,
      document.documentElement.offsetHeight || 0
    )
  }

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = getDocHeight()

      const atTop = scrollY <= 30
      setIsAtTop(atTop)
      if (!atTop && !isLoadingPrev) setTopPullDistance(0)

      // Generous 120px bottom tolerance for all screen sizes & zoom levels
      const nearBottom = scrollY + windowHeight >= documentHeight - 120
      setIsAtBottom(nearBottom)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentProject.id, isLoadingPrev])

  // Navigation handlers
  const handleNextClick = () => {
    if (onNavigateNext && !isTransitioning) {
      setIsTransitioning(true)
      onNavigateNext()
    }
  }

  const handlePrevClick = () => {
    if (onNavigatePrev && !isTransitioning) {
      setIsTransitioning(true)
      onNavigatePrev()
    }
  }

  // Execute Previous Navigation with ~300ms Micro-Pause Confirmation
  const triggerPrevWithMicroPause = () => {
    if (isLoadingPrev || isTransitioning) return
    setIsLoadingPrev(true)
    setTimeout(() => {
      handlePrevClick()
      setIsLoadingPrev(false)
      setTopPullDistance(0)
    }, 300)
  }

  // Native Touch Pull-to-Navigate Detection for Mobile
  useEffect(() => {
    let startY = 0
    let startX = 0

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isLoadingPrev) return
      const currentY = e.touches[0].clientY
      const currentX = e.touches[0].clientX
      const diffY = currentY - startY // positive if pulling DOWN
      const diffX = Math.abs(currentX - startX)

      const scrollY = window.scrollY || window.pageYOffset
      if (scrollY <= 30 && diffY > 0 && diffY > diffX * 0.8 && prevProject) {
        const pull = Math.min(180, diffY)
        setTopPullDistance(pull)
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning || isLoadingPrev) return

      const endY = e.changedTouches[0].clientY
      const endX = e.changedTouches[0].clientX
      const diffY = startY - endY // positive if swiped UP, negative if pulled DOWN

      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = getDocHeight()
      const atBottom = scrollY + windowHeight >= documentHeight - 140
      const atTop = scrollY <= 30

      if (topPullDistance >= 160 && atTop && prevProject) {
        triggerPrevWithMicroPause()
      } else {
        setTopPullDistance(0)
      }

      if (diffY > 50 && atBottom && nextProject) {
        handleNextClick()
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isAtBottom, isAtTop, isTransitioning, isLoadingPrev, nextProject, prevProject, topPullDistance])

  // Wheel Overscroll & Pull-Down Detection for Desktop
  useEffect(() => {
    let wheelDelta = 0
    let topWheelAccumulator = 0
    let wheelTimeout: ReturnType<typeof setTimeout>

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || isLoadingPrev) return

      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const documentHeight = getDocHeight()
      const atBottom = scrollY + windowHeight >= documentHeight - 140
      const atTop = scrollY <= 30

      if (atBottom && e.deltaY > 15 && nextProject) {
        wheelDelta += e.deltaY
        if (wheelDelta > 160) {
          wheelDelta = 0
          handleNextClick()
        }
      } else if (atTop && e.deltaY < -6 && prevProject) {
        topWheelAccumulator += Math.abs(e.deltaY)
        const currentPull = Math.min(180, topWheelAccumulator)
        setTopPullDistance(currentPull)

        if (topWheelAccumulator >= 160) {
          topWheelAccumulator = 0
          triggerPrevWithMicroPause()
        }
      } else {
        wheelDelta = 0
        if (!isLoadingPrev) topWheelAccumulator = 0
      }

      clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        wheelDelta = 0
        if (!isLoadingPrev) {
          topWheelAccumulator = 0
          setTopPullDistance(0)
        }
      }, 350)
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      clearTimeout(wheelTimeout)
    }
  }, [isAtBottom, isAtTop, isTransitioning, isLoadingPrev, nextProject, prevProject])

  // SVG Ring Constants for Pull-Down Progress (Threshold = 160px with drag resistance 0.4)
  const PULL_THRESHOLD = 160
  const ringRadius = 8
  const ringCircumference = 2 * Math.PI * ringRadius
  const pullProgressPercent = Math.min(100, Math.max(0, (topPullDistance / PULL_THRESHOLD) * 100))
  const strokeOffset = ringCircumference - (pullProgressPercent / 100) * ringCircumference
  const isThresholdMet = topPullDistance >= PULL_THRESHOLD || isLoadingPrev

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#F9FAFB] text-[#19244E]">
      {/* Interactive Top Pull-Down Indicator Component (Pull-to-Navigate with Micro-Pause) */}
      <AnimatePresence>
        {isAtTop && prevProject && (topPullDistance > 10 || isLoadingPrev) && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: isLoadingPrev ? 28 : Math.min(36, topPullDistance * 0.4),
              opacity: 1,
              scale: isThresholdMet ? 1.05 : 1,
            }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={triggerPrevWithMicroPause}
            className={`fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-2.5 bg-[#0D111F] border rounded-full shadow-2xl text-white cursor-pointer select-none group transition-all duration-200 ${
              isThresholdMet
                ? "border-[#E62E85] shadow-[0_0_24px_rgba(230,46,133,0.5)] bg-[#0D111F]"
                : "border-[#2A2F45]"
            }`}
          >
            {/* Progress Indicator (Left): 20px Circular SVG Ring + Flipping Arrow / Checkmark */}
            <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 -rotate-90 shrink-0" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r={ringRadius} stroke="#2A2F45" strokeWidth="2" fill="none" />
                <circle
                  cx="10"
                  cy="10"
                  r={ringRadius}
                  stroke="#E62E85"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
              </svg>
              {isLoadingPrev ? (
                <Check size={11} className="absolute text-[#E62E85] animate-scale-in" />
              ) : (
                <ArrowDown
                  size={10}
                  className={`absolute text-white transition-transform duration-200 ${
                    isThresholdMet ? "rotate-180 text-[#E62E85]" : ""
                  }`}
                />
              )}
            </div>

            {/* Text Label (Right) with Micro-Pause Loading Confirmation */}
            <span className="text-xs font-bold tracking-wide text-white font-sans">
              {isLoadingPrev
                ? `Loading Case Study ${prevProject.num}...`
                : isThresholdMet
                ? "Release to view previous"
                : "Pull for previous project"}
            </span>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Case Study Article Content with Smooth Entry Animation */}
      <motion.main
        key={currentProject.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full pb-6 sm:pb-8"
      >
        {children}
        {/* Dedicated Bottom Clearance Spacer */}
        <div className="w-full h-24 sm:h-28 pointer-events-none" aria-hidden="true" />
      </motion.main>

      {/* Floating Next Project Drawer / Action Card (Cyber-Modern Dark Theme) */}
      <AnimatePresence>
        {isAtBottom && nextProject && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            drag="y"
            dragConstraints={{ top: -200, bottom: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, info) => {
              if (info.offset.y < -35 || info.velocity.y < -180) {
                handleNextClick()
              }
            }}
            onClick={handleNextClick}
            className="fixed bottom-0 left-0 right-0 z-50 w-full p-4 sm:p-5 bg-[#0D111F]/95 backdrop-blur-xl text-white rounded-t-3xl shadow-[0_-16px_48px_rgba(0,0,0,0.5)] border-t border-[#2A2F45] cursor-pointer group hover:bg-[#13192e] transition-colors duration-200"
          >
            {/* Top Indicator: Center Drag-Handle Pill */}
            <div className="flex justify-center -mt-1 mb-3">
              <div className="w-10 h-1 bg-[#4A516D] rounded-full group-hover:bg-[#E62E85] transition-colors" />
            </div>

            <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 sm:gap-6 px-2 sm:px-4">
              {/* Left & Center Flex Group */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Left: Thumbnail Preview Container */}
                {nextProject.thumb && (
                  <div className="w-16 sm:w-20 aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/20 group-hover:border-[#E62E85]/40 transition-colors">
                    <img
                      src={nextProject.thumb}
                      alt={nextProject.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Center: Metadata & Typography Stack */}
                <div className="min-w-0 flex flex-col justify-center">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#9CA3AF] block mb-0.5">
                    NEXT CASE STUDY · ({String(currentIndex + 1).padStart(2, "0")}/{String(totalCount).padStart(2, "0")})
                  </span>
                  <h4 className="font-display text-xs sm:text-base font-semibold text-white truncate group-hover:text-[#E62E85] transition-colors">
                    {nextProject.num} · {nextProject.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6B7280] font-sans truncate mt-0.5">
                    {nextProject.client}
                  </p>
                </div>
              </div>

              {/* Right: Action Cue Chevron Up */}
              <div className="shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:bg-[#E62E85] group-hover:text-white group-hover:border-[#E62E85] transition-all duration-200 shadow-md">
                <ChevronUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
