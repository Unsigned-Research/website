"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import BeamsBackground from "@/components/kokonutui/beams-background"
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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const sections = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "mission", label: "Mission" },
  { id: "values", label: "Values" },
  { id: "promise", label: "Promise" },
  { id: "connect", label: "Connect" },
]

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero")
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" })
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
    <div className={`${montserrat.className} relative`}>
      {/* Fixed BeamsBackground */}
      <div className="fixed inset-0 w-full h-full">
        <BeamsBackground />
      </div>

      {/* Scrollable Content */}
      <div ref={contentRef} className="relative z-10">
        {/* Hero Section with centered text */}
        <section
          ref={(el) => (sectionRefs.current.hero = el)}
          id="hero"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tighter drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              unsigned
            </motion.h1>
            <motion.p
              className="text-sm md:text-base lg:text-xl text-white/90 tracking-tighter drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Science-backed Proprietary Trading
            </motion.p>
            <motion.p
              className="mt-4 max-w-lg text-xs md:text-sm text-white/80 drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Institutional‑grade risk management and proprietary technology capturing edge in digital‑asset markets.
            </motion.p>
          </div>
        </section>

        {/* Content Sections */}
        <div>
          {/* About Section */}
          <section
            ref={(el) => (sectionRefs.current.about = el)}
            id="about"
            className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center bg-transparent"
          >
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tighter drop-shadow-lg text-white">
                About Unsigned Research
              </h2>
              <div className="space-y-4">
                <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                  Unsigned Research Ltd is a UK proprietary trading company specialising in systematic crypto‑derivative strategies. Our team of quantitative researchers, engineers, and risk specialists design, test, and deploy code‑driven strategies on a vertically integrated stack that spans data ingestion, research, order execution, and real‑time risk. Capital is 100% owned by the firm; no external assets are managed.
                </p>
                <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                  We treat markets as data streams. Robust research pipelines translate signal discovery into production code, and automated controls enforce position limits, scenario stress tests, and kill‑switches. Continuous monitoring and post‑trade analytics close the feedback loop for iterative improvement.
                </p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section
            ref={(el) => (sectionRefs.current.mission = el)}
            id="mission"
            className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center bg-transparent"
          >
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tighter drop-shadow-lg text-white">
                Commitment
              </h2>
              <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                We advance market efficiency and safeguard capital by applying disciplined risk management, transparent reporting, and incentive‑aligned trading. Each strategy is built to preserve capital first and deliver repeatable, risk‑adjusted returns without hidden costs or unintended exposures.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section
            ref={(el) => (sectionRefs.current.values = el)}
            id="values"
            className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center bg-transparent"
          >
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tighter drop-shadow-lg text-white">
                Values
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <Shield size={18} className="text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-white/90 drop-shadow-md">Risk First</h3>
                    <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                      Every decision begins with rigorous identification, measurement and management of risk.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <Compass size={18} className="text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-white/90 drop-shadow-md">Future Driven</h3>
                    <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                      We build sustainable strategies and infrastructure that align with our long‑term outlook.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <Award size={18} className="text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-white/90 drop-shadow-md">Meritocracy</h3>
                    <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                      Ideas and outcomes outweigh hierarchy; performance and innovation shape our culture.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <Crosshair size={18} className="text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-white/90 drop-shadow-md">Precision</h3>
                    <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                      We pursue depth over breadth, valuing accuracy, specialisation and technical excellence.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <Lightbulb size={18} className="text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-white/90 drop-shadow-md">First Principles</h3>
                    <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                      We deconstruct complexity to fundamental truths before designing solutions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <CheckCircle size={18} className="text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-white/90 drop-shadow-md">Integrity</h3>
                    <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                      We uphold unwavering ethical standards of transparency, accountability and fairness.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Promise Section */}
          <section
            ref={(el) => (sectionRefs.current.promise = el)}
            id="promise"
            className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center bg-transparent"
          >
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tighter drop-shadow-lg text-white">
                Promise
              </h2>
              <p className="text-xs md:text-sm text-white/90 drop-shadow-md">
                Unsigned Research delivers world‑class systematic strategies that never impose hidden costs or
                unnecessary risks on partners. Incentives are fully aligned, embedding accountability and responsible
                risk‑taking into every trade.
              </p>
            </div>
          </section>

          {/* Connect Section */}
          <section
            ref={(el) => (sectionRefs.current.connect = el)}
            id="connect"
            className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center bg-transparent"
          >
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tighter drop-shadow-lg text-white">
                Connect
              </h2>
              <p className="text-xs md:text-sm text-white/90 drop-shadow-md mb-6">
                For technical due diligence, strategy discussion, or career interest.
              </p>
              <a
                href="mailto:enquiries@unsigned-research.com"
                className="inline-block px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors backdrop-blur-sm text-xs"
              >
                enquiries@unsigned-research.com
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-6 md:px-12 lg:px-24 bg-black/30 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-white text-sm font-medium mb-4">Unsigned Research</h3>
                  <p className="text-white/70 text-xs">Precision‑Built Systematic Alpha in digital‑asset markets.</p>
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium mb-4">Contact</h3>
                  <p className="text-white/70 text-xs mb-2">
                    <a href="mailto:enquiries@unsigned-research.com" className="hover:text-white transition-colors">
                      enquiries@unsigned-research.com
                    </a>
                  </p>
                  <p className="text-white/70 text-xs">London, United Kingdom</p>
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://x.com/unsignedre" className="text-white/70 hover:text-white transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                      <span className="sr-only">X (Twitter)</span>
                    </a>
                    <a href="https://github.com/Unsigned-Research" className="text-white/70 hover:text-white transition-colors">
                      <Github size={18} />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
                <p className="text-white/50 text-xs">
                  &copy; {new Date().getFullYear()} Unsigned Research Ltd. All rights reserved.
                </p>
                <div className="mt-4 md:mt-0 flex space-x-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <a href="#" className="text-white/50 hover:text-white text-xs transition-colors">
                        Privacy Policy
                      </a>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Privacy Policy</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 text-xs text-muted-foreground">
                        <p><strong>Unsigned Research Ltd.</strong> is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website.</p>
                        <p className="font-semibold text-foreground">Information We Collect</p>
                        <ul className="list-disc pl-5">
                          <li>We do not collect personal information unless you voluntarily provide it (e.g., by contacting us via email).</li>
                          <li>We may collect non-personal information such as browser type, device, and usage statistics for analytics purposes.</li>
                        </ul>
                        <p className="font-semibold text-foreground">How We Use Information</p>
                        <ul className="list-disc pl-5">
                          <li>To respond to your inquiries or requests.</li>
                          <li>To improve our website and services.</li>
                          <li>We do not sell or share your information with third parties except as required by law.</li>
                        </ul>
                        <p className="font-semibold text-foreground">Contact</p>
                        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:enquiries@unsigned-research.com" className="underline">enquiries@unsigned-research.com</a>.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Scroll indicator for hero section - only shown when not at bottom */}
      {showScrollIndicator && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/70 animate-bounce pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={32} />
        </motion.div>
      )}

      {/* Sticky Navigation */}
      <div className="fixed top-0 right-0 h-screen flex items-center z-50 px-4">
        <nav className="py-4 px-2 bg-neutral-900/30 backdrop-blur-lg rounded-lg">
          <ul className="space-y-6">
            {sections.map(({ id, label }) => (
              <li key={id} className="flex items-center">
                <button
                  onClick={() => scrollToSection(id)}
                  className={cn(
                    "text-sm transition-all duration-300 relative flex items-center",
                    activeSection === id ? "text-white font-medium" : "text-white/50 hover:text-white/80",
                  )}
                >
                  {activeSection === id && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -left-2 inset-y-0 my-auto w-1 bg-white rounded-full"
                    />
                  )}
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
