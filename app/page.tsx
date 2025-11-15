"use client"

import { useEffect, useRef, useState } from "react"
import { motion, easeInOut } from "framer-motion"
import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import { ChevronDown, Shield, Compass, Award, Crosshair, Lightbulb, CheckCircle, Github, Linkedin } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/theme-toggle"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "ethos", label: "Ethos" },
  { id: "values", label: "Values" },
  { id: "connect", label: "Connect" },
]

const highlights = [
  { label: "Live Trading", value: "5+ Years" },
  { label: "Data Driven", value: "100M+ data points/day" },
  { label: "Capital at Work", value: "Proprietary & Partner" },
  { label: "Risk Controls", value: "24/7 Programmatic" },
]

const ethosPoints = [
  "We interrogate every idea for correctness, not hierarchy.",
  "We invest in research pathways that compound over cycles.",
  "We advocate for decentralised market rails and resilient infrastructure.",
  "We align incentives with measurable, collective performance.",
]

const values = [
  {
    title: "Risk Management First",
    description: "Capital is only deployed once risks are quantified, bounded, and continuously observed.",
    icon: Shield,
  },
  {
    title: "Future Driven",
    description: "We anticipate structural shifts in microstructure, liquidity, and regulation, not short-term noise.",
    icon: Compass,
  },
  {
    title: "Meritocracy",
    description: "Execution precision outweighs tenure; the best idea supported by data advances.",
    icon: Award,
  },
  {
    title: "Precision",
    description: "We maintain disciplined scope, instrumenting every component for clarity and auditability.",
    icon: Crosshair,
  },
  {
    title: "First Principles",
    description: "We deconstruct complex systems to fundamentals before rebuilding robust solutions.",
    icon: Lightbulb,
  },
  {
    title: "Integrity",
    description: "Transparency, accountability, and fairness are non-negotiable across partners and trades.",
    icon: CheckCircle,
  },
]

export default function Page() {
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const scrollToSection = (sectionId: string) => {
    const target = sectionRefs.current[sectionId]
    if (!target) return
    const headerOffset = 72
    const startY = window.scrollY
    const endY = target.getBoundingClientRect().top + window.scrollY - headerOffset
    const duration = 220
    const startTime = performance.now()

    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeInOut(progress)
      window.scrollTo(0, startY + (endY - startY) * ease)
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }
    requestAnimationFrame(animateScroll)
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const element = sectionRefs.current[id]
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
              // Update URL hash without scrolling
              history.replaceState(null, "", `#${id}`)
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // Handle scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're near the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight
      const nearBottom = scrollPosition > document.body.scrollHeight - 300

      if (nearBottom) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className={`${montserrat.className} relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]`}>
      <div className="grid-overlay" aria-hidden="true" />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-base)]">
        <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-4 px-6 py-4 lg:px-0">
          <div className="col-span-12 md:col-span-6">
            <p className="text-[1rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Unsigned Research</p>
            <p className="mt-0.8 text-xs text-[var(--text-muted)]">Institutional-grade systematic alpha in digital-asset markets</p>
          </div>
          <div className="col-span-12 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)] md:col-span-6 md:justify-end">
            <div className="text-[var(--text-muted)]">London, United Kingdom</div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 lg:px-0">
        <nav className="flex items-center gap-4 overflow-x-auto border-b border-[var(--border)] py-4 text-[0.7rem] uppercase tracking-[0.35em] text-[var(--text-muted)] md:hidden">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap transition-colors",
                activeSection === id ? "text-[var(--accent)]" : "hover:text-[var(--accent)]",
              )}
            >
              <span className="h-px w-6 bg-[var(--border)]" />
              {label}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-16">
          <aside className="hidden md:col-span-3 md:block">
            <div className="sticky top-32 border-r border-[var(--border)] pr-6">
              <ul className="space-y-5 text-[0.7rem] uppercase tracking-[0.35em] text-[var(--text-muted)]">
                {sections.map(({ id, label }) => (
                  <li key={id} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-px flex-1 bg-[var(--border)] transition-all duration-200",
                        activeSection === id && "w-8 bg-[var(--accent)]",
                      )}
                    />
                    <button
                      onClick={() => scrollToSection(id)}
                      className={cn(
                        "text-left transition-colors",
                        activeSection === id ? "text-[var(--accent)]" : "hover:text-[var(--accent)]",
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="md:col-span-9">
            <section
              ref={(el: HTMLDivElement | null) => { sectionRefs.current.home = el }}
              id="home"
              className="space-y-12 border-b border-[var(--border)] pb-16"
            >
              <div className="grid grid-cols-12 items-end gap-6">
                <div className="col-span-12 space-y-6 md:col-span-7">
                  <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[var(--accent)]">Science-backed proprietary trading</p>
                  <motion.h1
                    className="text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Risk-engineered trading systems built with institutional discipline.
                  </motion.h1>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                    Unsigned Research is a proprietary trading firm specialising in medium-frequency, quantitatively engineered strategies.
                    We operate a vertically integrated stack that couples research, execution, and risk surveillance into a single, resilient platform.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
                    <span className="flex items-center gap-2">
                      <span className="h-px w-6 bg-[var(--accent)]" />
                      Systematic Alpha
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-px w-6 bg-[var(--border)]" />
                      Full-Stack Infrastructure
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => scrollToSection("connect")}
                      className="border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:bg-[var(--accent-strong)]"
                    >
                      Contact
                    </button>
                    <a
                      href="https://github.com/Unsigned-Research"
                      target="_blank"
                      rel="noreferrer"
                      className="border border-[var(--text-primary)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[var(--text-primary)] transition-colors hover:text-[var(--bg-base)] hover:bg-[var(--text-primary)]"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="col-span-12 border-l border-[var(--border)] pl-6 md:col-span-5">
                  <ul className="space-y-4">
                    {highlights.map(({ label, value }) => (
                      <li key={label} className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">{label}</span>
                        <span className="text-2xl font-medium text-[var(--text-primary)]">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section
              ref={(el: HTMLDivElement | null) => { sectionRefs.current.about = el }}
              id="about"
              className="space-y-6 border-b border-[var(--border)] py-16"
            >
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[var(--accent)]">About</p>
                </div>
                <div className="col-span-12 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] md:col-span-8 md:text-base">
                  <p>
                    Unsigned Research unites quantitative scientists, engineers, and risk professionals with deep experience in high-performance computing,
                    doctoral research, and institutional trading environments. We treat strategy research, software engineering, and operations as a single,
                    integrated discipline.
                  </p>
                  <p>
                    Our platform revisits enduring methods from traditional finance through a first-principles lens, codifying them into algorithms and supporting infrastructure
                    that has been tested over multiple market regimes. We combine deterministic engineering with pragmatic discretion to manage liquidity,
                    counterparty exposure, and execution cost.
                  </p>
                  <p>
                    As a crypto-native firm, we hold Bitcoin on our balance sheet to ensure the company&rsquo;s long-term sustainability, pairing that conviction with conservative risk parameters that prioritise drawdown control and capital preservation without sacrificing innovation.
                  </p>
                </div>
              </div>
            </section>

            <section
              ref={(el: HTMLDivElement | null) => { sectionRefs.current.ethos = el }}
              id="ethos"
              className="space-y-6 border-b border-[var(--border)] py-16"
            >
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[var(--accent)]">Ethos</p>
                </div>
                <div className="col-span-12 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] md:col-span-8 md:text-base">
                  {ethosPoints.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
              </div>
            </section>

            <section
              ref={(el: HTMLDivElement | null) => { sectionRefs.current.values = el }}
              id="values"
              className="space-y-8 border-b border-[var(--border)] py-16"
            >
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[var(--accent)]">Values</p>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {values.map(({ title, description, icon: Icon }) => (
                      <li key={title} className="flex flex-col gap-4 border border-[var(--border)] bg-[var(--panel)] p-6">
                        <Icon size={20} className="text-[var(--accent)]" />
                        <div>
                          <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section
              ref={(el: HTMLDivElement | null) => { sectionRefs.current.connect = el }}
              id="connect"
              className="space-y-8 py-16"
            >
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[var(--accent)]">Connect</p>
                </div>
                <div className="col-span-12 space-y-6 text-sm leading-relaxed text-[var(--text-secondary)] md:col-span-8 md:text-base">
                  <p>
                    For technical due diligence, strategy discussions, or talent conversations, contact the partners’ office directly.
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <a
                      href="mailto:enquiries@unsigned-research.com"
                      className="border border-[var(--text-primary)] px-5 py-3 text-xs uppercase tracking-[0.3em] text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg-base)]"
                    >
                      enquiries@unsigned-research.com
                    </a>
                    <div className="flex items-center gap-4 text-[var(--text-primary)]">
                      <a
                        href="https://github.com/Unsigned-Research"
                        aria-label="Unsigned Research on GitHub"
                        className="transition-colors hover:text-[var(--accent)]"
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href="https://x.com/unsignedre"
                        aria-label="Unsigned Research on X"
                        className="transition-colors hover:text-[var(--accent)]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 120 120"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M87.6 20H104L72.8 57.1L109 100H84.2L62.7 75.1L38.6 100H22.2L55.1 60.9L20 20H45.6L65.7 42.9L87.6 20ZM83.1 92.2H90.9L47.3 27.2H39.1L83.1 92.2Z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/unsigned-research"
                        aria-label="Unsigned Research on LinkedIn"
                        className="transition-colors hover:text-[var(--accent)]"
                      >
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="border-t border-[var(--border)] py-12">
              <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-5 space-y-2">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Unsigned Research</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Institutional-grade systematic alpha in digital-asset markets.
                  </p>
                </div>
                <div className="md:col-span-4 space-y-2">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Contact</p>
                  <a href="mailto:enquiries@unsigned-research.com" className="text-sm text-[var(--text-primary)] underline-offset-4 hover:underline">
                    enquiries@unsigned-research.com
                  </a>
                  <p className="text-sm text-[var(--text-secondary)]">London, United Kingdom</p>
                </div>
                <div className="md:col-span-3 space-y-2">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Updates</p>
                  <div className="flex gap-4 text-[var(--text-primary)]">
                    <a
                      href="https://github.com/Unsigned-Research"
                      aria-label="Unsigned Research on GitHub"
                      className="transition-colors hover:text-[var(--accent)]"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href="https://x.com/unsignedre"
                      aria-label="Unsigned Research on X"
                      className="transition-colors hover:text-[var(--accent)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 120 120"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M87.6 20H104L72.8 57.1L109 100H84.2L62.7 75.1L38.6 100H22.2L55.1 60.9L20 20H45.6L65.7 42.9L87.6 20ZM83.1 92.2H90.9L47.3 27.2H39.1L83.1 92.2Z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/unsigned-research"
                      aria-label="Unsigned Research on LinkedIn"
                      className="transition-colors hover:text-[var(--accent)]"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border)] pt-4 text-xs text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
                <span>&copy; {new Date().getFullYear()} Unsigned Research Ltd. All rights reserved.</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">
                      Privacy Policy
                    </button>
                  </DialogTrigger>
                  <DialogContent
                    className="max-w-lg bg-[var(--panel)]"
                    style={{ backgroundColor: "color-mix(in srgb, var(--panel) 92%, transparent)" }}
                  >
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold text-[var(--text-primary)]">Privacy Policy</DialogTitle>
                    </DialogHeader>
                  <DialogDescription asChild>
                    <div className="space-y-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                      <p>
                        <strong>Unsigned Research Ltd.</strong> is committed to protecting your privacy. This statement outlines how we collect, use, and safeguard information when you interact with this site.
                      </p>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">Information We Collect</p>
                        <ul className="list-disc space-y-2 pl-5">
                          <li>We only collect personal information that you voluntarily share (e.g., via email correspondence).</li>
                          <li>We may capture aggregated, non-personal analytics (browser, device, or session data) to improve site performance.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--text-primary)]">Use of Information</p>
                        <ul className="list-disc space-y-2 pl-5">
                          <li>To respond to technical or partnership enquiries.</li>
                          <li>To evaluate and improve our digital presence and security posture.</li>
                          <li>We never sell data and only disclose information when legally required.</li>
                        </ul>
                      </div>
                      <p>
                        For privacy questions contact <a href="mailto:enquiries@unsigned-research.com" className="underline">enquiries@unsigned-research.com</a>.
                      </p>
                    </div>
                  </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </footer>
          </div>
        </div>
      </main>

      {showScrollIndicator && (
        <motion.div
          className="pointer-events-none fixed bottom-8 left-1/2 z-30 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span>Scroll</span>
            <span className="inline-flex h-12 w-px bg-[var(--indicator)]" />
            <ChevronDown size={16} />
          </div>
        </motion.div>
      )}
    </div>
  )
}
