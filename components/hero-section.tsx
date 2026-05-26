"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={textVariants} className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/80 text-sm font-medium text-muted-foreground border border-border">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              variants={textVariants}
              className="text-lg text-muted-foreground mb-2"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={textVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-balance"
            >
              <span className="gradient-text">Neil Justin</span>
              <br />
              <span className="text-foreground">Marcelo</span>
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="text-xl sm:text-2xl text-primary font-medium mb-6"
            >
              BS Computer Science Student
            </motion.p>

            <motion.p
              variants={textVariants}
              className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              A passionate developer crafting modern web experiences with clean code and creative solutions. 
              Specializing in React, Next.js, and full-stack development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={buttonVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full px-8 group"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-border hover:bg-secondary group"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={buttonVariants}
              className="flex justify-center lg:justify-start gap-4"
            >
              {[
                { icon: Github, href: "https://github.com/neiljustinmarcelo-tech", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/neil-justin-marcelo-0b46453b8/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:neiljustinmarcelo@email.com", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Animated Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 blur-xl opacity-50"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Profile Image Container */}
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden animate-pulse-glow"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    {/* Profile Image filling the circle */}
                    <div className="w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full overflow-hidden flex items-center justify-center border border-border/50 relative">
                      <Image
                        src="/images/profile.png"
                        alt="Neil Justin Marcelo"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 p-3 glass rounded-xl"
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 p-3 glass rounded-xl"
                animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-2xl">💻</span>
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-8 p-3 glass rounded-xl"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-2xl">⚡</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-xs font-medium">Scroll Down</span>
            <div className="w-5 h-8 border-2 border-muted-foreground rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-1.5"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
