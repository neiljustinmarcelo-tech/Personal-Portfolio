"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useCallback, useState } from "react"
import { X, Github, ExternalLink, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Types ─── */
export interface ProjectScreenshot {
  src: string
  title: string
  description: string
}

export interface ProjectModalData {
  title: string
  description: string
  screenshots: ProjectScreenshot[]
  features: string[]
  technologies: string[]
  githubUrl: string
  liveUrl?: string
}

/* ─── Screenshot Section (scroll-triggered animation) ─── */
function ScreenshotBlock({
  screenshot,
  index,
}: {
  screenshot: ProjectScreenshot
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className="group/shot"
    >
      {/* Number + Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-bold shrink-0 shadow-lg shadow-purple-500/20">
          {index + 1}
        </div>
        <h4 className="text-lg font-semibold">{screenshot.title}</h4>
      </div>

      {/* Image */}
      <div className="relative rounded-xl overflow-hidden border border-border/40 mb-4 shadow-xl shadow-black/10">
        <img
          src={screenshot.src}
          alt={screenshot.title}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover/shot:scale-[1.015]"
          loading="lazy"
          draggable={false}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover/shot:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed pl-11">
        {screenshot.description}
      </p>
    </motion.div>
  )
}

/* ─── Main Modal ─── */
export function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: ProjectModalData | null
  isOpen: boolean
  onClose: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  /* Lock body scroll */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  /* ESC key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  /* Reset scroll on open */
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0
      setShowScrollTop(false)
    }
  }, [isOpen])

  /* Track scroll position for "back to top" button */
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !isOpen) return
    const handleScroll = () => {
      setShowScrollTop(el.scrollTop > 400)
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ── Backdrop ── */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* ── Modal Container ── */}
          <motion.div
            className="relative w-full h-full sm:w-[94vw] sm:h-[90vh] sm:max-w-4xl sm:rounded-2xl overflow-hidden bg-background/95 backdrop-blur-2xl border border-border/30 shadow-2xl shadow-purple-500/5"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 320,
              mass: 0.8,
            }}
          >
            {/* ── Sticky Header ── */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border/30">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-6 rounded-full bg-gradient-to-b from-purple-500 to-blue-500 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold truncate">
                  {project.title}
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-secondary/80 transition-colors shrink-0 ml-3"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* ── Scrollable Content ── */}
            <div
              ref={scrollRef}
              className="overflow-y-auto h-[calc(100%-57px)] scroll-smooth modal-scrollbar"
            >
              <div className="px-5 sm:px-8 py-8 space-y-10 max-w-3xl mx-auto">
                {/* ── Project Info ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="space-y-5"
                >
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        asChild
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    </motion.div>
                    {project.liveUrl && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                          asChild
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* ── Scroll hint ── */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center gap-2 py-2"
                >
                  <span className="text-xs text-muted-foreground/60 uppercase tracking-widest font-medium">
                    Scroll to explore
                  </span>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
                  </motion.div>
                </motion.div>

                {/* ── Section Divider: Screenshots ── */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Screenshots
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                {/* ── Screenshots (vertically stacked) ── */}
                <div className="space-y-14">
                  {project.screenshots.map((screenshot, index) => (
                    <ScreenshotBlock
                      key={screenshot.title}
                      screenshot={screenshot}
                      index={index}
                    />
                  ))}
                </div>

                {/* ── Section Divider: Features ── */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Key Features
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                {/* ── Features Grid ── */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30 hover:border-purple-500/20 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* ── Section Divider: Technologies ── */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Technologies Used
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                {/* ── Technology Badges ── */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* ── Bottom: Back to Top ── */}
                <div className="flex justify-center pt-6 pb-10">
                  <motion.button
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToTop}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-full border border-border/50 hover:border-border hover:bg-secondary/40 transition-all duration-300"
                  >
                    <ChevronUp className="w-4 h-4" />
                    Back to top
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ── Floating "Back to Top" pill (appears on scroll) ── */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToTop}
                  className="absolute bottom-6 right-6 z-30 p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
                  aria-label="Scroll to top"
                >
                  <ChevronUp className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
