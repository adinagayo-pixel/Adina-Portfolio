import { useEffect, useState } from "react"
import libraryColors from "@/imports/backoffice-library-colors.png"
import libraryTypography from "@/imports/backoffice-library-typography.png"
import libraryButton from "@/imports/backoffice-library-button.png"
import libraryTextField from "@/imports/backoffice-library-text-field.png"
import libraryListPattern from "@/imports/backoffice-library-list-pattern.png"

// Pages exported from the design library in Figma. Each card previews the top of a page;
// clicking opens the full page in a scrollable viewer, because the pages are much taller than a screen.

const PAGES = [
  {
    src: libraryColors,
    group: "Foundations",
    title: "Colors",
    caption: "Primitive scales at the top, and the semantic text and background tokens that point to them.",
  },
  {
    src: libraryTypography,
    group: "Foundations",
    title: "Typography",
    caption: "Two families and thirteen styles, with line heights on a 4-pt grid.",
  },
  {
    src: libraryButton,
    group: "Component",
    title: "Button",
    caption: "Five variants, two sizes, and five states, with anatomy, specs, and usage rules.",
  },
  {
    src: libraryTextField,
    group: "Component",
    title: "Text Field",
    caption: "Six states, with a token for each border state.",
  },
  {
    src: libraryListPattern,
    group: "Pattern",
    title: "List page",
    caption: "How the components assemble into a page, with layout rules.",
  },
]

export function BackofficeLibrary() {
  const [open, setOpen] = useState<number | null>(null)
  const page = open === null ? null : PAGES[open]

  useEffect(() => {
    if (open === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAGES.map((p, i) => (
          <figure key={p.title} className="space-y-2">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open the ${p.title} page at full size`}
              className="group relative flex flex-col justify-start w-full h-56 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C]"
            >
              <img src={p.src} alt={`${p.title} page from the design library`} className="block w-full h-auto transition-opacity group-hover:opacity-90" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
            </button>
            <figcaption className="font-sans text-xs text-gray-600 leading-relaxed">
              <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">{p.group}</span>
              <strong className="text-[#19244E]">{p.title}.</strong> {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {page && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${page.title} page`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] bg-black/85 overflow-y-auto cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="fixed top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-white/90 font-sans text-xs font-bold text-[#19244E]"
          >
            Close
          </button>
          <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl rounded-lg bg-white p-4 sm:p-8 cursor-default">
              <img src={page.src} alt={`${page.title} page from the design library`} className="block w-full h-auto" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
