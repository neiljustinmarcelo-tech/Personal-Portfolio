"use client"

import { motion } from "framer-motion"
import { Heart, ArrowUp } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-12 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <a href="#home" className="mb-2 inline-block">
              <Image
                src="/images/logo.png"
                alt="NJ Marcelo Logo"
                width={160}
                height={50}
                className="h-10 w-auto dark:invert"
              />
            </a>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Neil Justin Marcelo
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {["Home", "About", "Projects", "Certificates", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.nav>

          {/* Back to Top */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 glass rounded-full hover:border-primary/30 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="sr-only">Back to top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
