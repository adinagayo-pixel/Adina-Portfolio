import { useEffect, useState } from "react"

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
}

// Click to open the image at full size. Close with the button, a click outside, or Esc.
export function ZoomableImage({ src, alt, className = "" }: ZoomableImageProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open ${alt} at full size`}
        className="group block w-full cursor-zoom-in rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C]"
      >
        <img
          src={src}
          alt={alt}
          className={`block w-full h-auto transition-opacity group-hover:opacity-90 ${className}`}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 font-sans text-xs font-bold text-[#19244E]"
          >
            Close
          </button>
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[95vw] max-h-[90vh] w-auto h-auto rounded-lg"
          />
        </div>
      )}
    </>
  )
}
