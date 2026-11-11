import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react"

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  alt: string
  beforeAlt?: string
}

// Drag or use the arrow keys to reveal the "after" state. Both images share the same width.
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  beforeAlt = "Standard white-label dashboard before the chart was added",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX)
  }

  const handlePointerUp = () => setDragging(false)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5))
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5))
  }

  return (
    <>
      <div className="space-y-4 sm:hidden">
        {[
          { label: "Before", src: beforeSrc, alt: beforeAlt },
          { label: "After", src: afterSrc, alt },
        ].map((view) => (
          <div key={view.label}>
            <span className="font-sans text-[10px] font-bold tracking-wider uppercase text-[#19244E]">{view.label}</span>
            <div className="mt-2 overflow-x-auto rounded-2xl border border-slate-200/80 bg-[#f5f6f8] shadow-xl">
              <img src={view.src} alt={view.alt} className="block w-[820px] max-w-none h-auto" />
            </div>
          </div>
        ))}
        <p className="font-sans text-[11px] text-gray-500">Scroll sideways to read the dashboard.</p>
      </div>

    <div
      ref={containerRef}
      className="relative hidden sm:block w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-[#f5f6f8] shadow-xl select-none touch-none cursor-ew-resize"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <img src={afterSrc} alt={alt} className="block w-full h-auto" draggable={false} />
      <div
        className="absolute inset-0 bg-[#f5f6f8]"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt=""
          aria-hidden="true"
          className="block w-full h-auto"
          draggable={false}
        />
        <span className="absolute left-4 bottom-4 px-3 py-1.5 rounded-lg bg-white/80 font-sans text-xs text-gray-500 pointer-events-none">
          No chart in the standard dashboard
        </span>
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none"
        style={{ left: `${position}%` }}
      />
      <div
        role="slider"
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center text-[#19244E] font-bold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C]"
        style={{ left: `${position}%` }}
      >
        &lsaquo; &rsaquo;
      </div>

      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 font-sans text-[10px] font-bold tracking-wider uppercase text-[#19244E] pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 font-sans text-[10px] font-bold tracking-wider uppercase text-[#DB3E8C] pointer-events-none">
        After
      </span>
    </div>
    </>
  )
}
