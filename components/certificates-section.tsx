"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Award, Calendar, Building2, ExternalLink, Download } from "lucide-react"
import Image from "next/image"

const certificates = [
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "2026",
    image: "/certificates/Ai-fluency.jpg",
    link: "https://verify.skilljar.com/c/euhxdd375ef7",
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2026",
    image: "/certificates/101.jpg",
    link: "https://verify.skilljar.com/c/qdss99gaz32j",
  },
  {
    title: "Fluent in English",
    issuer: "Jobstreet |ELS Language Centres",
    date: "2026",
    image: "/certificates/english-certificate.JPG",
    link: "https://ph.jobstreet.com/profiles/neiljustin-marcelo-1ztYtqYk2H",
    pdf: "/certificates/Fluent-English.pdf",
  },
  {
    title: "Microsoft Office Word",
    issuer: "Jobstreet | Microsoft",
    date: "2026",
    image: "/certificates/word-work.JPG",
    link: "https://ph.jobstreet.com/profiles/neiljustin-marcelo-1ztYtqYk2H",
    pdf: "/certificates/word-work.pdf",
  },
  {
    title: "Microsoft Excel Work",
    issuer: "Jobstreet | Microsoft",
    date: "2026",
    image: "/certificates/excel-certificate.jpg",
    link: "https://ph.jobstreet.com/profiles/neiljustin-marcelo-1ztYtqYk2H",
    pdf: "/certificates/Excel.pdf",
  },
  {
    title: "Intermediate Python Competition 2025",
    issuer: "CKC - Christ The King College of Calbayog | BS - Computer Science",
    date: "2025",
    image: "/certificates/certificate.jpg",
  },
]

function CertificateCard({
  certificate,
  index,
}: {
  certificate: (typeof certificates)[0] & { pdf?: string }
  index: number
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
    >
      {/* Certificate Image with fallback */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20">
        {!imgError && certificate.image ? (
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Award className="w-12 h-12 text-primary/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
          </div>
        )}
        {/* Decorative elements (only show on fallback or empty image) */}
        {(imgError || !certificate.image) && (
          <>
            <div className="absolute top-4 right-4 w-16 h-16 border border-primary/20 rounded-full" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border border-primary/20 rounded-full" />
          </>
        )}
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        {/* View overlay */}
        <motion.a
          href={certificate.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-primary">
            <ExternalLink className="w-4 h-4" />
            View Certificate
          </span>
        </motion.a>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-1">
          {certificate.title}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4 text-primary/60" />
            <span>{certificate.issuer}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary/60" />
            <span>{certificate.date}</span>
          </div>
        </div>

        {/* Download PDF Button */}
        {certificate.pdf && (
          <a
            href={certificate.pdf}
            download
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors duration-200 border border-primary/20 hover:border-primary/40"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/80 text-sm font-medium text-muted-foreground border border-border mb-4">
            Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Certificates & <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Continuous learning is key to growth. Here are some of my professional certifications.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.title}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
