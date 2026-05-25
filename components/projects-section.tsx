"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Folder, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { ProjectModal, type ProjectModalData } from "@/components/project-modal"

/* ─── Screenshot & Project Types ─── */
interface ProjectScreenshot {
  src: string
  title: string
  description: string
}

interface Project {
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  demo: string
  // Extended fields for modal showcase
  screenshots?: ProjectScreenshot[]
  features?: string[]
  technologies?: string[]
  liveUrl?: string
  longDescription?: string
}

/* ─── Project Data ─── */
const projects: Project[] = [
  {
    title: "MoneyTrack",
    description:
      "A personal finance management system designed to help users track balances, income, expenses, and savings with interactive tools.",
    longDescription:
      "MoneyTrack is a comprehensive personal finance tracking and management system designed to empower users with insights into their financial health. It features secure credential/demo authentication, a real-time analytics dashboard, full transaction categorization, dynamic budgeting with indicators, customized expense reports, and progress-tracked savings goals. Built with Next.js 16.2.4 App Router, React 19, TypeScript 5.7.3, Tailwind CSS 4.2.0, shadcn/ui, Radix UI, Recharts, and localStorage-backed mock data.",
    image: "/projects/moneytrack/dashboard.png",
    tech: ["Next.js", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Recharts"],
    github: "https://github.com/neiljustinmarcelo",
    demo: "#",
    screenshots: [
      {
        src: "/projects/moneytrack/dashboard.png",
        title: "Financial Dashboard Overview",
        description:
          "The central financial command center. Provides a real-time high-level view of balance, income, expenses, and savings, combined with interactive categories breakdowns, custom neon line charts tracking spending trends, recent transaction feeds, and monthly budget progression meters."
      },
      {
        src: "/projects/moneytrack/auth.png",
        title: "Secure Authentication",
        description:
          "A sleek and accessible credential gateway supporting standard secure logins alongside one-click Demo Account access for quick trial runs, styled with a modern dark theme and custom green interactive accents."
      },
      {
        src: "/projects/moneytrack/transactions.png",
        title: "Comprehensive Transactions Ledger",
        description:
          "A full-fledged search and filter transaction grid. Includes detailed records indicating timestamps, categories, descriptions, transaction types (income/expense), and localized currency amounts with live-reactive sorting."
      },
      {
        src: "/projects/moneytrack/categories.png",
        title: "Visual Expense Categories",
        description:
          "Organizes spending into custom styled categories such as Food & Dining, Transport, Shopping, Bills & Utilities, and Entertainment. Styled with unique emoji tags and colorful, custom progress highlights."
      },
      {
        src: "/projects/moneytrack/reports.png",
        title: "Advanced Reports & Analytics",
        description:
          "A dedicated analytics engine displaying spending metrics, category distributions via glowing custom donut charts, and an income versus expenses bar chart for comparing historical trends side-by-side."
      },
      {
        src: "/projects/moneytrack/goals.png",
        title: "Savings Goals & Milestones",
        description:
          "Enables users to establish and monitor financial targets like Emergency Funds, Vacations, and Equipment upgrades. Tracks percentage completions, remaining balances, contribution histories, and target dates."
      }
    ],
    features: [
      "Secure Login & Demo Gateway",
      "Interactive Real-Time Financial Dashboard",
      "Robust Transaction Searching & Filtering",
      "Flexible Budget Planning & Alerts",
      "Custom Visual Expense Categories",
      "Interactive Analytical Charts & Reports",
      "Progress-Tracked Savings Goal System",
      "Currencies & Notification Settings",
      "Fully Responsive Dark-Themed UI",
      "Cinematic Motion Animations"
    ],
    technologies: [
      "Next.js 16.2.4 App Router",
      "React 19",
      "TypeScript 5.7.3",
      "Tailwind CSS 4.2.0",
      "@tailwindcss/postcss",
      "tw-animate-css",
      "shadcn/ui",
      "Radix UI",
      "lucide-react",
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
      "Recharts",
      "react-hook-form",
      "@hookform/resolvers",
      "Zod",
      "date-fns",
      "react-day-picker",
      "cmdk",
      "embla-carousel-react",
      "input-otp",
      "react-resizable-panels",
      "Vaul",
      "Sonner",
      "next-themes",
      "localStorage",
      "Context API mock auth"
    ]
  },
  {
    title: "Nevex E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with admin dashboard, product management, analytics, user accounts, and secure multi-payment checkout.",
    longDescription:
      "Nevex is a comprehensive e-commerce platform built for high-performance laptops and PCs. It features a modern storefront with dynamic product listings, a full admin dashboard for inventory and order management, real-time store analytics, user account dashboards, and a secure checkout system supporting multiple payment methods including GCash, Maya, and credit/debit cards.",
    image: "/projects/nevex/homepage.png",
    tech: ["Python", "Flask", "Jinja2", "Supabase", "JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/neiljustinmarcelo",
    demo: "#",
    screenshots: [
      {
        src: "/projects/nevex/homepage.png",
        title: "Home Page",
        description:
          "A modern and visually appealing landing page designed to showcase high-performance laptops and PCs. It includes a responsive navigation bar, featured call-to-action buttons, and a clean hero section that provides users with an engaging shopping experience.",
      },
      {
        src: "/projects/nevex/admin-products.png",
        title: "Admin Product Management",
        description:
          "A dashboard interface that allows administrators to manage store products efficiently. The system displays product images, prices, stock quantities, and includes edit/delete functionality for easy inventory management.",
      },
      {
        src: "/projects/nevex/add-product.png",
        title: "Add Product System",
        description:
          "A product creation interface where administrators can add new products by entering details such as product name, category, price, stock, image URL, and description using a clean and user-friendly form layout.",
      },
      {
        src: "/projects/nevex/analytics.png",
        title: "Store Analytics Dashboard",
        description:
          "An analytics overview page that displays important business statistics including total revenue, total orders, total products, and pending orders to help administrators monitor store performance.",
      },
      {
        src: "/projects/nevex/user-dashboard.png",
        title: "User Dashboard",
        description:
          "A personalized customer dashboard where users can manage their account, monitor orders, track cart activity, and access account-related features within a modern responsive layout.",
      },
      {
        src: "/projects/nevex/checkout.png",
        title: "Checkout & Payment System",
        description:
          "A complete checkout page that allows users to select payment methods such as Cash on Delivery, GCash, Maya, and Credit/Debit Card while reviewing their order summary and delivery information.",
      },
    ],
    features: [
      "Responsive E-Commerce Design",
      "Admin Dashboard Management",
      "Product CRUD Operations",
      "User Authentication",
      "Shopping Cart & Checkout",
      "Multiple Payment Methods",
      "Analytics Dashboard",
      "Modern UI/UX Animations",
      "Mobile-Friendly Design",
    ],
    technologies: [
      "Python",
      "Flask",
      "Jinja2",
      "Supabase",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
  },

  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website showcasing projects and skills with smooth animations.",
    image: "/projects/PortfolioWeb/portfolio.jpg",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Vercel Analytics"],
    github: "https://github.com/neiljustinmarcelo-tech/Personal-Portfolio",
    demo: "#",
  },

]

/* ─── Project Card ─── */
function ProjectCard({
  project,
  index,
  onView,
}: {
  project: Project
  index: number
  onView: (project: Project) => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-50px" })
  const scrollDirection = useScrollDirection()
  const slideY = scrollDirection === "up" ? -50 : 50
  const hasShowcase = !!(project.screenshots && project.screenshots.length > 0)
  const thumbnailSrc = hasShowcase ? project.screenshots![0].src : project.image

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: slideY }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: slideY }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 cursor-pointer hover:shadow-xl hover:shadow-purple-500/10"
    >
      {/* Project Image / Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Folder className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500" />

        {/* "View Project" overlay for showcase projects */}
        {hasShowcase && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-500">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium"
            >
              Click View to explore →
            </motion.div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        {hasShowcase ? (
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[180px]"
            >
              <Button
                size="sm"
                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white group/btn"
                onClick={() => onView(project)}
              >
                <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                View
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full group/btn"
                asChild
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                  Code
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button
                size="sm"
                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white group/btn"
                asChild
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  Demo
                </a>
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface ProjectsSectionProps {
  onViewShowcase?: (name: string) => void
}

export function ProjectsSection({ onViewShowcase }: ProjectsSectionProps = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-80px" })
  const scrollDirection = useScrollDirection()
  const headerY = scrollDirection === "up" ? -30 : 30
  const buttonY = scrollDirection === "up" ? -20 : 20

  /* Modal state */
  const [selectedProject, setSelectedProject] =
    useState<ProjectModalData | null>(null)

  const handleView = (project: Project) => {
    if (project.title === "MoneyTrack" && onViewShowcase) {
      onViewShowcase("moneytrack")
      return
    }
    if (project.title === "Nevex E-Commerce Platform" && onViewShowcase) {
      onViewShowcase("nevex")
      return
    }
    if (project.screenshots) {
      setSelectedProject({
        title: project.title,
        description: project.longDescription || project.description,
        screenshots: project.screenshots,
        features: project.features || [],
        technologies: project.technologies || [],
        githubUrl: project.github,
        liveUrl: project.liveUrl,
      })
    }
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <section
        id="projects"
        className="py-24 lg:py-32 relative overflow-hidden"
        ref={ref}
      >
        {/* Background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: headerY }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: headerY }
            }
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/80 text-sm font-medium text-muted-foreground border border-border mb-4">
              My Work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A collection of projects I&apos;ve built to solve problems and
              explore new technologies
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onView={handleView}
              />
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: buttonY }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: buttonY }
            }
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8"
                asChild
              >
                <a
                  href="https://github.com/neiljustinmarcelo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View All on GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Showcase Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </>
  )
}
