"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { MoneyTrackShowcase } from "@/components/moneytrack-showcase"
import { NevexShowcase } from "@/components/nevex-showcase"
import { CertificatesSection } from "@/components/certificates-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  const [showMoneyTrack, setShowMoneyTrack] = useState(false)
  const [showNevex, setShowNevex] = useState(false)

  const handleShowShowcase = (name: string) => {
    if (name === "moneytrack") {
      setShowMoneyTrack(true)
      setTimeout(() => {
        const el = document.getElementById("moneytrack-showcase")
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else if (name === "nevex") {
      setShowNevex(true)
      setTimeout(() => {
        const el = document.getElementById("nevex-showcase")
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  const handleCloseShowcase = () => {
    const el = document.getElementById("projects")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
    setTimeout(() => {
      setShowMoneyTrack(false)
      setShowNevex(false)
    }, 900)
  }

  return (
    <>
      <LoadingScreen />
      <Navbar
        showcaseActive={showMoneyTrack || showNevex}
        onCloseShowcase={handleCloseShowcase}
      />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ProjectsSection onViewShowcase={handleShowShowcase} />
        
        {/* MoneyTrack Immersive Showcase Section */}
        <MoneyTrackShowcase
          isVisible={showMoneyTrack}
          onClose={handleCloseShowcase}
        />

        {/* Nevex Immersive Showcase Section */}
        <NevexShowcase
          isVisible={showNevex}
          onClose={handleCloseShowcase}
        />

        <CertificatesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
