"use client"

import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useScrollDirection } from "@/hooks/use-scroll-direction"

const techStack = [
  { name: "HTML", icon: "html5", color: "#E34F26" },
  { name: "CSS", icon: "css3", color: "#1572B6" },
  { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
  { name: "React", icon: "react", color: "#61DAFB" },
  { name: "Next.js", icon: "nextjs", color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: "tailwind", color: "#06B6D4" },
  { name: "Python", icon: "python", color: "#3776AB" },
  { name: "Flask", icon: "flask", color: "#FFFFFF" },
  { name: "SQLite", icon: "sqlite", color: "#003B57" },
  { name: "Supabase", icon: "supabase", color: "#3ECF8E" },
  { name: "GitHub", icon: "github", color: "#FFFFFF" },
]

const TechIcon = ({ tech }: { tech: (typeof techStack)[0] }) => {
  const iconPaths = {
    html5: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
      </svg>
    ),
    css3: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531l-.232-2.718 10.059.003.232-2.623z" />
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
    react: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
      </svg>
    ),
    nextjs: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M14.25 2.25H9.6c-2.98 0-4.35 1.3-4.35 4.09v3.41h6.55v1.5H3.94C2.21 11.25.75 12.72.75 14.5v3.02c0 1.74 1.42 3.23 3.16 3.23h3.02v-3.91c0-1.75 1.43-3.09 3.27-3.09h4.6c2.8 0 4.2-1.38 4.2-4.12V6.34c0-2.73-1.46-4.09-4.75-4.09ZM8.62 5.28a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
        <path d="M20.06 12.75H12.2v-1.5h6.55V6.63c0-.66-.08-1.25-.24-1.77 2.55.5 4.74 2.08 4.74 4.64v.02h.01v3.98c0 1.78-1.46 3.25-3.2 3.25h-3.49v.09c0 1.75-1.43 3.09-3.27 3.09H8.7c-.65 0-1.22-.06-1.72-.19.5 1.82 2.06 2.01 3.66 2.01h4.65c2.98 0 4.35-1.3 4.35-4.09v-3.41h.42c1.73 0 3.19-1.47 3.19-3.25v-1.33c-.53 1.82-2.18 3.08-3.19 3.08Zm-4.68 3.67a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
      </svg>
    ),
    flask: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M9 2.75A.75.75 0 0 1 9.75 2h4.5a.75.75 0 0 1 0 1.5H13.5v5.18l5.78 9.43A2.55 2.55 0 0 1 17.1 22H6.9a2.55 2.55 0 0 1-2.18-3.89l5.78-9.43V3.5h-.75A.75.75 0 0 1 9 2.75Zm3 7.02-5.99 9.78a1.05 1.05 0 0 0 .89 1.6h10.2a1.05 1.05 0 0 0 .89-1.6L12 9.77Z" />
        <path d="M8.4 17.25h7.2l1.06 1.73a.42.42 0 0 1-.36.65H7.7a.42.42 0 0 1-.36-.65l1.06-1.73Z" />
      </svg>
    ),
    sqlite: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M5.5 4.75C5.5 3.23 8.41 2 12 2s6.5 1.23 6.5 2.75v14.5C18.5 20.77 15.59 22 12 22s-6.5-1.23-6.5-2.75V4.75Zm1.5 0c0 .21.38.73 1.45 1.16.95.38 2.2.59 3.55.59s2.6-.21 3.55-.59C16.62 5.48 17 4.96 17 4.75s-.38-.73-1.45-1.16C14.6 3.21 13.35 3 12 3s-2.6.21-3.55.59C7.38 4.02 7 4.54 7 4.75Zm10 2.07C15.82 7.55 13.98 8 12 8s-3.82-.45-5-1.18v3.43c0 .21.38.73 1.45 1.16.95.38 2.2.59 3.55.59s2.6-.21 3.55-.59c1.07-.43 1.45-.95 1.45-1.16V6.82Zm0 5.5C15.82 13.05 13.98 13.5 12 13.5s-3.82-.45-5-1.18v3.43c0 .21.38.73 1.45 1.16.95.38 2.2.59 3.55.59s2.6-.21 3.55-.59c1.07-.43 1.45-.95 1.45-1.16v-3.43Zm0 5.5C15.82 18.55 13.98 19 12 19s-3.82-.45-5-1.18v1.43c0 .21.38.73 1.45 1.16.95.38 2.2.59 3.55.59s2.6-.21 3.55-.59c1.07-.43 1.45-.95 1.45-1.16v-1.43Z" />
      </svg>
    ),
    supabase: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  }

  return iconPaths[tech.icon as keyof typeof iconPaths] || null
}

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-80px" })
  const scrollDirection = useScrollDirection()
  const slideY = scrollDirection === "up" ? -40 : 40

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: slideY },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  }

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/80 text-sm font-medium text-muted-foreground border border-border mb-4">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Passionate About <span className="gradient-text">Creating</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Building the future one line of code at a time
            </p>
          </motion.div>

          {/* About Card */}
          <motion.div variants={itemVariants} className="glass rounded-3xl p-8 lg:p-12 mb-16">
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3 space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I&apos;m a <span className="text-foreground font-medium">BS Computer Science student</span> with a deep passion for programming and web development. My journey began with curiosity about how websites work, and it has evolved into a commitment to building elegant, user-friendly digital experiences.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I specialize in modern web technologies and constantly explore new tools and frameworks to stay at the cutting edge. Whether it&apos;s crafting responsive interfaces or building robust backend systems, I approach each project with dedication and attention to detail.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  When I&apos;m not coding, you&apos;ll find me learning new technologies, contributing to open-source projects, or exploring creative solutions to complex problems.
                </p>
              </div>
              <div className="lg:col-span-2 flex justify-center">
                <motion.div
                  className="relative w-48 h-48 lg:w-56 lg:h-56"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30" />
                  <div className="absolute inset-4 rounded-full border-2 border-dashed border-blue-500/30" style={{ animationDirection: "reverse" }} />
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold text-center mb-8">
              Technologies I Work With
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer group hover:border-primary/30 transition-all duration-300"
                >
                  <div
                    className="transition-all duration-300 group-hover:scale-110"
                    style={{ color: tech.color }}
                  >
                    <TechIcon tech={tech} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
