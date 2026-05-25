"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Facebook, Linkedin, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "neiljustinmarcelo@gmail.com",
    href: "mailto:neiljustinmarcelo@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 95 131 4521",
    href: "tel:+639511314521",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Calbayog City, Philippines",
    href: "#",
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/neiljustinmarcelo",
    color: "hover:text-white hover:bg-[#333]",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/share/17eYjyJ8hS/",
    color: "hover:text-white hover:bg-[#1877F2]",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/neil-justin-marcelo-0b46453b8/",
    color: "hover:text-white hover:bg-[#0A66C2]",
  },
]

type SubmitStatus = "idle" | "loading" | "success" | "error" | "rate-limited"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-80px" })
  const scrollDirection = useScrollDirection()
  const slideY = scrollDirection === "up" ? -40 : 40
  const headerY = scrollDirection === "up" ? -30 : 30

  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [remainingHours, setRemainingHours] = useState(0)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    console.log("📤 Submitting contact form...", formData)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      console.log("📨 Response status:", res.status)

      const data = await res.json()
      console.log("📨 Response body:", data)

      if (!res.ok) {
        if (res.status === 429) {
          setRemainingHours(data.remainingHours ?? 24)
          setStatus("rate-limited")
        } else {
          setErrorMessage(data.error || "Something went wrong. Please try again.")
          setStatus("error")
        }
        return
      }

      // Only show success if the API confirmed delivery with an email ID
      if (!data.success || !data.emailId) {
        console.error("❌ API returned 200 but no confirmed emailId:", data)
        setErrorMessage("Email delivery could not be confirmed. Please try again.")
        setStatus("error")
        return
      }

      console.log("✅ Email confirmed! ID:", data.emailId)
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      // Reset to idle after 4 seconds
      setTimeout(() => setStatus("idle"), 4000)
    } catch (err) {
      console.error("❌ Network error:", err)
      setErrorMessage("Network error. Please check your connection and try again.")
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 animated-gradient opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: headerY }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: headerY }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/80 text-sm font-medium text-muted-foreground border border-border mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: slideY }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -50, y: slideY }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-all">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 glass rounded-xl transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Decorative */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative h-48 hidden lg:block"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-8xl"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  💬
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: slideY }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 50, y: slideY }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

              {/* Success State */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  </motion.div>
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you soon!
                  </p>
                </motion.div>
              )}

              {/* Rate Limited State */}
              {status === "rate-limited" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                  >
                    <Clock className="w-16 h-16 text-amber-400 mb-4" />
                  </motion.div>
                  <h4 className="text-xl font-semibold mb-2">Already Sent Today</h4>
                  <p className="text-muted-foreground max-w-xs">
                    You&apos;ve already sent a message from this email address. Please wait{" "}
                    <span className="text-amber-400 font-semibold">
                      {remainingHours} hour{remainingHours !== 1 ? "s" : ""}
                    </span>{" "}
                    before sending again.
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-6 text-sm"
                    onClick={() => setStatus("idle")}
                  >
                    Go back
                  </Button>
                </motion.div>
              )}

              {/* Form */}
              {(status === "idle" || status === "loading" || status === "error") && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Banner */}
                  {status === "error" && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
                    >
                      <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                      <p className="text-sm">{errorMessage}</p>
                    </motion.div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        className="bg-secondary/50 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Project Inquiry"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="bg-secondary/50 border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="bg-secondary/50 border-border focus:border-primary resize-none"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      {status === "loading" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
