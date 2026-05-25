"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import {
  X,
  Github,
  ExternalLink,
  ChevronUp,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Wallet,
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
  PieChart,
  List,
  Target,
  Settings,
  LogOut,
  Search,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
  Plus,
  Sliders,
  Calendar,
  Grid,
  Percent,
  Check,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Interfaces ─── */
interface MoneyTrackShowcaseProps {
  isVisible: boolean
  onClose: () => void
}

/* ─── Type Definitions for Simulator ─── */
interface Transaction {
  id: string
  date: string
  description: string
  category: string
  type: "income" | "expense"
  amount: number
}

interface Budget {
  category: string
  spent: number
  limit: number
  color: string
}

interface Goal {
  id: string
  title: string
  icon: string
  current: number
  target: number
  deadline: string
  color: string
}

/* ─── Mock Data for Live Sandbox ─── */
const initialTransactions: Transaction[] = [
  { id: "1", date: "5/7/2026", description: "Starbucks Coffee", category: "Food & Dining", type: "expense", amount: 45.50 },
  { id: "2", date: "5/6/2026", description: "Uber Ride", category: "Transport", type: "expense", amount: 18.75 },
  { id: "3", date: "5/3/2026", description: "Monthly Salary", category: "Salary", type: "income", amount: 2500.00 },
  { id: "4", date: "5/2/2026", description: "Nike Shoes", category: "Shopping", type: "expense", amount: 120.00 },
  { id: "5", date: "5/1/2026", description: "Internet Bill", category: "Bills & Utilities", type: "expense", amount: 89.99 },
  { id: "6", date: "4/30/2026", description: "Movie Tickets", category: "Entertainment", type: "expense", amount: 35.00 },
  { id: "7", date: "4/29/2026", description: "Restaurant Dinner", category: "Food & Dining", type: "expense", amount: 62.40 },
  { id: "8", date: "4/28/2026", description: "Gas", category: "Transport", type: "expense", amount: 25.00 },
  { id: "9", date: "4/26/2026", description: "Target Shopping", category: "Shopping", type: "expense", amount: 150.00 },
  { id: "10", date: "4/24/2026", description: "Pizza Hut", category: "Food & Dining", type: "expense", amount: 55.00 },
  { id: "11", date: "4/18/2026", description: "McDonald's", category: "Food & Dining", type: "expense", amount: 45.00 },
  { id: "12", date: "4/17/2026", description: "Electric Bill", category: "Bills & Utilities", type: "expense", amount: 200.00 },
  { id: "13", date: "4/13/2026", description: "Concert Tickets", category: "Entertainment", type: "expense", amount: 75.00 },
  { id: "14", date: "4/10/2026", description: "Freelance Work", category: "Freelance", type: "income", amount: 150.00 },
  { id: "15", date: "4/8/2026", description: "Amazon Purchase", category: "Shopping", type: "expense", amount: 300.00 }
]

const initialBudgets: Budget[] = [
  { category: "Food & Dining", spent: 238.65, limit: 500.00, color: "from-orange-500 to-amber-500" },
  { category: "Transport", spent: 68.75, limit: 300.00, color: "from-blue-500 to-cyan-500" },
  { category: "Shopping", spent: 570.00, limit: 400.00, color: "from-pink-500 to-rose-500" },
  { category: "Bills & Utilities", spent: 289.99, limit: 400.00, color: "from-yellow-500 to-amber-500" },
  { category: "Entertainment", spent: 110.00, limit: 200.00, color: "from-purple-500 to-indigo-500" }
]

const initialGoals: Goal[] = [
  { id: "1", title: "Emergency Fund", icon: "🚨", current: 2350.00, target: 5000.00, deadline: "Target by Dec 2024", color: "from-rose-500 to-orange-500" },
  { id: "2", title: "Vacation", icon: "✈️", current: 1200.00, target: 3000.00, deadline: "Target by Jun 2024", color: "from-sky-500 to-blue-500" },
  { id: "3", title: "New Laptop", icon: "💻", current: 800.00, target: 1500.00, deadline: "Target by Aug 2024", color: "from-emerald-500 to-teal-500" }
]

export function MoneyTrackShowcase({ isVisible, onClose }: MoneyTrackShowcaseProps) {
  const showcaseRef = useRef<HTMLDivElement>(null)
  
  /* Scroll & Spring configurations for premium custom progress indicators */
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  /* Lightbox Zoom States */
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null)
  const [activeLightboxTitle, setActiveLightboxTitle] = useState<string>("")

  /* Active Sandbox State */
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currency, setCurrency] = useState("₱")
  
  /* Sandbox Transaction State */
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [txSearch, setTxSearch] = useState("")
  const [txFilter, setTxFilter] = useState<"all" | "income" | "expense">("all")
  const [txCategory, setTxCategory] = useState("all")

  /* Sandbox Login State */
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  /* Sandbox Goals State */
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [contributeAmount, setContributeAmount] = useState("")
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)

  /* Budget State */
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)

  /* Sticky Navigation Section Tracker */
  const [activeSection, setActiveSection] = useState("banner")

  /* Scroll Listener for Sticky indicator */
  useEffect(() => {
    if (!isVisible) return
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const bannerEl = document.getElementById("showcase-banner")
      const sandboxEl = document.getElementById("showcase-sandbox")
      const galleryEl = document.getElementById("showcase-gallery")
      const techEl = document.getElementById("showcase-tech")

      if (techEl && scrollPos >= techEl.offsetTop - 200) {
        setActiveSection("tech")
      } else if (galleryEl && scrollPos >= galleryEl.offsetTop - 200) {
        setActiveSection("gallery")
      } else if (sandboxEl && scrollPos >= sandboxEl.offsetTop - 200) {
        setActiveSection("sandbox")
      } else if (bannerEl) {
        setActiveSection("banner")
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible])

  /* Scroll down automatically on mount if visible */
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        showcaseRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [isVisible])

  /* Action Handlers for Live Sandbox */
  const handleDemoLogin = () => {
    setEmail("demo@moneytrack.com")
    setPassword("demo123")
    setLoginError("")
    setIsLoggedIn(true)
    setActiveTab("dashboard")
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "demo@moneytrack.com" && password === "demo123") {
      setIsLoggedIn(true)
      setActiveTab("dashboard")
      setLoginError("")
    } else {
      setLoginError("Invalid credentials. Try using the Demo Account.")
    }
  }

  const handleGoalContribution = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGoalId || !contributeAmount) return
    const amt = parseFloat(contributeAmount)
    if (isNaN(amt) || amt <= 0) return

    setGoals(prev => prev.map(g => {
      if (g.id === selectedGoalId) {
        const nextAmt = Math.min(g.current + amt, g.target)
        return { ...g, current: nextAmt }
      }
      return g
    }))
    
    // Also inject a dynamic transaction record!
    const targetGoal = goals.find(g => g.id === selectedGoalId)
    if (targetGoal) {
      const newTx: Transaction = {
        id: Math.random().toString(),
        date: new Date().toLocaleDateString(),
        description: `Saved for ${targetGoal.title}`,
        category: "Savings & Investments",
        type: "expense",
        amount: amt
      }
      setTransactions(prev => [newTx, ...prev])
      
      // Update overall balance values in state!
      // In a real app we'd bind this, but for sandbox we reflect immediately
    }

    setContributeAmount("")
    setSelectedGoalId(null)
  }

  /* Calculations for Sandbox metrics */
  const totalIncomeVal = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenseVal = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balanceVal = totalIncomeVal - totalExpenseVal
  const savingsVal = goals.reduce((sum, g) => sum + g.current, 0)

  /* Transaction Filtering Logic */
  const filteredTxs = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(txSearch.toLowerCase()) || 
                          t.category.toLowerCase().includes(txSearch.toLowerCase())
    const matchesType = txFilter === "all" ? true : t.type === txFilter
    const matchesCategory = txCategory === "all" ? true : t.category === txCategory
    return matchesSearch && matchesType && matchesCategory
  })

  const uniqueCategories = ["all", ...Array.from(new Set(transactions.map(t => t.category)))]

  if (!isVisible) return null

  return (
    <div
      ref={showcaseRef}
      id="moneytrack-showcase"
      className="relative min-h-screen bg-[#09090b] text-zinc-100 overflow-x-hidden font-sans border-t border-zinc-800/80 z-40"
    >
      {/* Premium Apple Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Sticky Navigation Progress Sidebar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5 z-40 bg-zinc-950/60 backdrop-blur-md px-3.5 py-6 rounded-full border border-zinc-800/60">
        {[
          { id: "banner", label: "Overview" },
          { id: "sandbox", label: "Live Simulator" },
          { id: "gallery", label: "Screenshots" },
          { id: "tech", label: "Tech Stack" }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => {
              document.getElementById(`showcase-${item.id}`)?.scrollIntoView({ behavior: "smooth" })
            }}
            className="group relative flex items-center justify-center"
            aria-label={`Scroll to ${item.label}`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === item.id 
                  ? "bg-emerald-500 scale-125 glow-purple" 
                  : "bg-zinc-600 group-hover:bg-zinc-400"
              }`}
            />
            {/* Tooltip */}
            <span className="absolute right-7 py-1 px-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Close Showcase Navigation Header */}
      <nav className="sticky top-0 z-30 w-full glass border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-black font-extrabold text-sm font-sans tracking-tighter">N</span>
          </div>
          <span className="text-sm tracking-wider uppercase font-bold text-zinc-300">
            MoneyTrack <span className="text-emerald-500 font-normal">Showcase</span>
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 transition-all text-zinc-300 hover:text-zinc-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Close & Back to Top
        </motion.button>
      </nav>

      {/* ─── SECTION 1: CINEMATIC BANNER ─── */}
      <section
        id="showcase-banner"
        className="relative py-28 lg:py-36 flex flex-col items-center justify-center text-center overflow-hidden px-4"
      >
        {/* Cinematic Backdrop Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute top-10 right-10 w-96 h-96 bg-zinc-900/20 grid-pattern opacity-60" />
        </div>

        {/* Project Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-6"
        >
          Featured Enterprise Case Study
        </motion.div>

        {/* Big Neon Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10 text-5xl sm:text-7xl lg:text-8xl font-black font-sans leading-none tracking-tight mb-8"
        >
          Money<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]">Track</span>
        </motion.h1>

        {/* Cinematic description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 text-zinc-400 text-lg sm:text-xl max-w-3xl leading-relaxed mb-12 text-balance"
        >
          A high-fidelity SaaS financial dashboard integrating transaction ledger filters,
          interactive category analysis metrics, multi-tier budget limit alerts, and deadline-tracked savings milestones in a breathtaking dark UI.
        </motion.p>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full p-8 glass rounded-3xl border border-zinc-800/50 mb-14"
        >
          {[
            { label: "Role & Position", val: "Lead UI/UX Engineer" },
            { label: "Timeline", val: "6 Weeks (Q2 2026)" },
            { label: "Primary Stack", val: "Next.js 16 + React 19" },
            { label: "UI System", val: "Tailwind 4 + shadcn/ui" }
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <span className="block text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</span>
              <span className="block text-zinc-200 text-sm sm:text-base font-bold">{stat.val}</span>
            </div>
          ))}
        </motion.div>

        {/* Call to actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 flex gap-4 flex-wrap justify-center"
        >
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-zinc-950 font-bold px-8 shadow-lg shadow-emerald-500/20"
            onClick={() => document.getElementById("showcase-sandbox")?.scrollIntoView({ behavior: "smooth" })}
          >
            Open Live Sandbox
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-300"
            onClick={() => document.getElementById("showcase-gallery")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Screenshots
          </Button>
        </motion.div>
      </section>

      {/* ─── SECTION 2: THE LIVE INTERACTIVE SIMULATOR (SANDBOX) ─── */}
      <section
        id="showcase-sandbox"
        className="py-24 border-t border-zinc-900 bg-zinc-950/20 relative"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3 inline-block">
              Tactile Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight mb-4">
              Live MoneyTrack Sandbox
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Interact directly with the functional components of the app. Toggle views, filter transactions, log in, switch currencies, and check savings target updates.
            </p>
          </div>

          {/* Sandbox Wrapper with Laptop Mockup Frame */}
          <div className="w-full relative glass rounded-3xl border border-zinc-800/80 overflow-hidden shadow-2xl shadow-black/80 flex flex-col md:flex-row min-h-[580px]">
            
            {/* 1. Sidebar Nav (Visible only when Logged In) */}
            {isLoggedIn && (
              <div className="w-full md:w-56 bg-zinc-950/90 border-r border-zinc-900 p-4 flex flex-col justify-between shrink-0">
                <div className="space-y-6">
                  {/* Brand */}
                  <div className="flex items-center gap-2.5 px-2">
                    <div className="w-6.5 h-6.5 rounded-md bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <span className="text-emerald-400 text-xs font-black">M</span>
                    </div>
                    <span className="text-xs font-black tracking-widest text-zinc-300">MONEYTRACK</span>
                  </div>

                  {/* Nav */}
                  <nav className="flex flex-col gap-1.5">
                    {[
                      { id: "dashboard", label: "Dashboard", icon: Grid },
                      { id: "transactions", label: "Transactions", icon: List },
                      { id: "budgets", label: "Budgets", icon: Sliders },
                      { id: "categories", label: "Categories", icon: Grid },
                      { id: "reports", label: "Reports", icon: PieChart },
                      { id: "goals", label: "Goals", icon: Target },
                      { id: "settings", label: "Settings", icon: Settings }
                    ].map(item => {
                      const Icon = item.icon
                      const isActive = activeTab === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id)
                            setSelectedGoalId(null)
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                            isActive
                              ? "bg-emerald-500/15 border border-emerald-500/20 text-emerald-400"
                              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </button>
                      )
                    })}
                  </nav>
                </div>

                {/* Profile Widget */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between px-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    <div className="truncate">
                      <span className="block text-[11px] font-bold text-zinc-200 truncate">demo</span>
                      <span className="block text-[9px] text-zinc-500 truncate">demo@moneytrack.com</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false)
                      setEmail("")
                      setPassword("")
                    }}
                    className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-rose-400 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. Main Content Frame Viewport */}
            <div className="flex-1 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto relative max-h-[640px]">
              
              <AnimatePresence mode="wait">
                {/* ── CASE A: NOT LOGGED IN (AUTH SCREEN) ── */}
                {!isLoggedIn && (
                  <motion.div
                    key="auth-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-md w-full mx-auto my-auto space-y-6"
                  >
                    <div className="text-center space-y-2">
                      <div className="inline-flex w-10 h-10 rounded-xl bg-emerald-500/10 items-center justify-center border border-emerald-500/20 mb-2">
                        <Lock className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-100">Welcome Back</h3>
                      <p className="text-zinc-500 text-xs">Sign in to your dashboard to review transactions</p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="glass p-6 rounded-2xl border border-zinc-800/80 space-y-4">
                      {loginError && (
                        <div className="flex items-center gap-2 p-3 text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{loginError}</span>
                        </div>
                      )}
                      
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          placeholder="demo@moneytrack.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-lg px-3.5 py-2 text-xs text-zinc-200 outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-lg px-3.5 py-2 text-xs text-zinc-200 outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                      >
                        Sign In
                      </button>

                      <div className="relative flex items-center justify-center py-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-zinc-900" />
                        </div>
                        <span className="relative bg-zinc-950 px-3 text-[10px] uppercase font-semibold text-zinc-600 tracking-wider">or continue as</span>
                      </div>

                      <button
                        type="button"
                        onClick={handleDemoLogin}
                        className="w-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-bold py-2 rounded-lg text-xs transition-all"
                      >
                        Use Demo Account
                      </button>
                    </form>

                    {/* Quick helper info */}
                    <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/40 text-center text-[10px] text-zinc-500 leading-relaxed max-w-sm mx-auto">
                      💡 Click <strong className="text-emerald-500 hover:underline cursor-pointer" onClick={handleDemoLogin}>Use Demo Account</strong> to log in instantly and review the interactive components.
                    </div>
                  </motion.div>
                )}

                {/* ── CASE B: LOGGED IN VIEWS ── */}
                {isLoggedIn && (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    
                    {/* ── TAB 1: DASHBOARD ── */}
                    {activeTab === "dashboard" && (
                      <div className="space-y-6">
                        {/* Title & Date */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2">
                          <div>
                            <h3 className="text-xl font-bold text-zinc-100">Dashboard</h3>
                            <p className="text-zinc-500 text-xs">Overview for May 1 – May 31, 2026</p>
                          </div>
                          <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-medium">
                            Currency: {currency === "₱" ? "PHP (₱)" : currency === "$" ? "USD ($)" : "EUR (€)"}
                          </span>
                        </div>

                        {/* Top Metrics Cards Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          {[
                            { label: "Total Balance", val: balanceVal, trend: "+12.5% from last month", isTrendUp: true, color: "text-zinc-100", icon: Wallet },
                            { label: "Income", val: totalIncomeVal, trend: "+8.2% from last month", isTrendUp: true, color: "text-emerald-400", icon: ArrowUpRight },
                            { label: "Expenses", val: totalExpenseVal, trend: "-5.4% from last month", isTrendUp: false, color: "text-rose-400", icon: ArrowDownRight },
                            { label: "Savings Goals", val: savingsVal, trend: "+15.3% from last month", isTrendUp: true, color: "text-sky-400", icon: Target }
                          ].map(metric => {
                            const Icon = metric.icon
                            return (
                              <div key={metric.label} className="glass p-4 rounded-xl border border-zinc-900 flex items-start justify-between">
                                <div className="space-y-1.5 min-w-0">
                                  <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{metric.label}</span>
                                  <span className={`block text-base sm:text-lg font-black tracking-tight truncate ${metric.color}`}>
                                    {currency}{metric.val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </span>
                                  <span className={`block text-[9px] truncate font-medium ${metric.isTrendUp ? "text-emerald-500" : "text-rose-500"}`}>
                                    {metric.trend}
                                  </span>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-800 shrink-0">
                                  <Icon className="w-4 h-4 text-zinc-400" />
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Middle Charts & Data Section */}
                        <div className="grid lg:grid-cols-12 gap-5">
                          {/* 1. Category Breakdown Donut Mockup */}
                          <div className="glass p-5 rounded-2xl border border-zinc-900 lg:col-span-6 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Expense Overview</h4>
                            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                              {/* Glowing CSS Pie Chart Ring */}
                              <div className="relative w-32 h-32 rounded-full border-8 border-purple-500/20 flex items-center justify-center shadow-lg">
                                <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-pink-500 border-r-orange-400 border-b-yellow-400 rotate-45" />
                                <div className="text-center">
                                  <span className="block text-[9px] uppercase font-bold text-zinc-500">Expenses</span>
                                  <span className="block text-sm font-black text-zinc-200">
                                    {currency}{totalExpenseVal.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                                  </span>
                                </div>
                              </div>
                              {/* Legends List */}
                              <div className="space-y-1.5 text-xs w-full sm:w-auto">
                                {[
                                  { cat: "Shopping", val: 570, color: "bg-pink-500" },
                                  { cat: "Bills & Utilities", val: 290, color: "bg-yellow-500" },
                                  { cat: "Food & Dining", val: 208, color: "bg-orange-500" },
                                  { cat: "Entertainment", val: 110, color: "bg-purple-500" }
                                ].map(legend => (
                                  <div key={legend.cat} className="flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2.5 h-2.5 rounded-full ${legend.color}`} />
                                      <span className="text-zinc-400 text-[11px]">{legend.cat}</span>
                                    </div>
                                    <span className="font-bold text-zinc-200 text-[11px]">{currency}{legend.val}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* 2. Spending Trend Neon Graphic */}
                          <div className="glass p-5 rounded-2xl border border-zinc-900 lg:col-span-6 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Spending Trend</h4>
                            {/* Interactive glowing Neon Line graph mockup */}
                            <div className="h-32 w-full relative pt-4 flex items-end">
                              {/* Horizontal Grid lines */}
                              <div className="absolute inset-x-0 top-4 border-t border-zinc-900" />
                              <div className="absolute inset-x-0 top-1/2 border-t border-zinc-900" />
                              <div className="absolute inset-x-0 bottom-0 border-t border-zinc-900" />

                              {/* Neon Line Graphic inside SVG */}
                              <svg className="w-full h-full absolute inset-0 z-10 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id="neon-glow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                {/* Area path */}
                                <path d="M 0 40 L 10 10 L 25 35 L 45 15 L 60 38 L 80 20 L 100 40 Z" fill="url(#neon-glow)" />
                                {/* Line path */}
                                <path d="M 0 40 L 10 10 L 25 35 L 45 15 L 60 38 L 80 20 L 100 40" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_#10b981]" />
                              </svg>

                              {/* Graph labels */}
                              <div className="absolute bottom-1.5 left-2 text-[8px] font-bold text-zinc-600">Apr 28</div>
                              <div className="absolute bottom-1.5 right-2 text-[8px] font-bold text-zinc-600">May 25</div>
                            </div>
                          </div>
                        </div>

                        {/* Recent Transactions & Budgets Grid */}
                        <div className="grid lg:grid-cols-12 gap-5">
                          {/* Recent Transactions */}
                          <div className="glass p-5 rounded-2xl border border-zinc-900 lg:col-span-7 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Recent Transactions</h4>
                              <button onClick={() => setActiveTab("transactions")} className="text-[10px] font-bold text-emerald-400 hover:underline">
                                View Ledger →
                              </button>
                            </div>
                            <div className="space-y-3">
                              {transactions.slice(0, 3).map(tx => (
                                <div key={tx.id} className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                                      tx.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                                    }`}>
                                      {tx.type === "income" ? "+" : "-"}
                                    </div>
                                    <div>
                                      <span className="block text-xs font-bold text-zinc-200">{tx.description}</span>
                                      <span className="block text-[9px] text-zinc-500">{tx.category} • {tx.date}</span>
                                    </div>
                                  </div>
                                  <span className={`text-xs font-extrabold ${tx.type === "income" ? "text-emerald-400" : "text-zinc-300"}`}>
                                    {tx.type === "income" ? "+" : "-"}{currency}{tx.amount.toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Budget Status Quick Widget */}
                          <div className="glass p-5 rounded-2xl border border-zinc-900 lg:col-span-5 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Budget Status</h4>
                            <div className="space-y-3.5">
                              {budgets.slice(0, 2).map(b => {
                                const pct = Math.min((b.spent / b.limit) * 100, 100)
                                return (
                                  <div key={b.category} className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-semibold text-zinc-400">
                                      <span>{b.category}</span>
                                      <span>{currency}{b.spent.toFixed(0)} / {currency}{b.limit.toFixed(0)}</span>
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                                      <div className={`h-full rounded-full bg-gradient-to-r ${b.color}`} style={{ width: `${pct}%` }} />
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── TAB 2: TRANSACTIONS (FULL LEDGER WITH SEARCH) ── */}
                    {activeTab === "transactions" && (
                      <div className="space-y-5">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <h3 className="text-xl font-bold text-zinc-100">All Transactions</h3>
                            <p className="text-zinc-500 text-xs">Comprehensive accounting ledger and record filter</p>
                          </div>
                          <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-bold">
                            Total Records: {filteredTxs.length}
                          </span>
                        </div>

                        {/* Search & Filter Toolbar */}
                        <div className="grid sm:grid-cols-12 gap-3 p-4 glass rounded-2xl border border-zinc-900">
                          {/* Search */}
                          <div className="sm:col-span-5 relative">
                            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                            <input
                              type="text"
                              placeholder="Search description..."
                              value={txSearch}
                              onChange={(e) => setTxSearch(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-lg pl-9 pr-4 py-2 text-xs outline-none text-zinc-200 transition-colors"
                            />
                          </div>

                          {/* Type Filter */}
                          <div className="sm:col-span-4 flex gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                            {(["all", "income", "expense"] as const).map(type => (
                              <button
                                key={type}
                                onClick={() => setTxFilter(type)}
                                className={`flex-1 text-[10px] font-bold py-1.5 rounded-md capitalize transition-all ${
                                  txFilter === type 
                                    ? "bg-emerald-500/15 border border-emerald-500/20 text-emerald-400" 
                                    : "text-zinc-500 hover:text-zinc-350"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>

                          {/* Category select */}
                          <div className="sm:col-span-3">
                            <select
                              value={txCategory}
                              onChange={(e) => setTxCategory(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold rounded-lg px-3 py-2 text-xs outline-none cursor-pointer"
                            >
                              {uniqueCategories.map(cat => (
                                <option key={cat} value={cat} className="capitalize">
                                  {cat === "all" ? "All Categories" : cat}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Transaction Ledger Table */}
                        <div className="glass rounded-2xl border border-zinc-900 overflow-hidden overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-zinc-900 bg-zinc-950 text-zinc-500 font-bold uppercase tracking-wider text-[9px]">
                                <th className="p-3.5 pl-5">Date</th>
                                <th className="p-3.5">Description</th>
                                <th className="p-3.5">Category</th>
                                <th className="p-3.5">Type</th>
                                <th className="p-3.5 text-right pr-5">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/50">
                              {filteredTxs.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="text-center p-8 text-zinc-500">
                                    No records found matching filters
                                  </td>
                                </tr>
                              ) : (
                                filteredTxs.map(tx => (
                                  <tr key={tx.id} className="hover:bg-zinc-900/15 transition-colors group">
                                    <td className="p-3.5 pl-5 text-zinc-400 font-medium">{tx.date}</td>
                                    <td className="p-3.5 font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">{tx.description}</td>
                                    <td className="p-3.5 text-zinc-400 font-medium">{tx.category}</td>
                                    <td className="p-3.5">
                                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${
                                        tx.type === "income" 
                                          ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" 
                                          : "bg-zinc-900 border-zinc-800 text-zinc-400"
                                      }`}>
                                        {tx.type}
                                      </span>
                                    </td>
                                    <td className={`p-3.5 text-right pr-5 font-black text-sm ${
                                      tx.type === "income" ? "text-emerald-400" : "text-zinc-300"
                                    }`}>
                                      {tx.type === "income" ? "+" : "-"}{currency}{tx.amount.toFixed(2)}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* ── TAB 3: BUDGETS ── */}
                    {activeTab === "budgets" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-zinc-100">Budget Limits</h3>
                          <p className="text-zinc-500 text-xs">Maintain category spending caps and check alerts</p>
                        </div>

                        {/* Overall Budget Progress */}
                        <div className="glass p-6 rounded-2xl border border-zinc-900 space-y-4">
                          <div className="flex justify-between items-end">
                            <div>
                              <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Overall Budget Status</span>
                              <span className="block text-2xl font-black text-emerald-400">
                                {currency}{totalExpenseVal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                <span className="text-zinc-500 text-xs font-semibold"> spent out of {currency}3,000.00</span>
                              </span>
                            </div>
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                              {((totalExpenseVal / 3000) * 100).toFixed(0)}% Utilized
                            </span>
                          </div>
                          
                          <div className="w-full h-3 rounded-full bg-zinc-900 overflow-hidden border border-zinc-850">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500" style={{ width: `${Math.min((totalExpenseVal / 3000) * 100, 100)}%` }} />
                          </div>
                        </div>

                        {/* Category Budgets Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          {budgets.map(b => {
                            const pct = Math.min((b.spent / b.limit) * 100, 100)
                            const isOver = b.spent > b.limit
                            return (
                              <div key={b.category} className="glass p-5 rounded-2xl border border-zinc-900 space-y-3.5 relative overflow-hidden">
                                {isOver && (
                                  <div className="absolute top-0 right-0 bg-rose-500 text-[8px] font-extrabold text-black uppercase tracking-wider px-2 py-0.5 rounded-bl">
                                    Overspent
                                  </div>
                                )}
                                <div className="flex justify-between items-start">
                                  <div>
                                    <span className="block text-xs font-bold text-zinc-200">{b.category}</span>
                                    <span className="block text-[10px] text-zinc-500">{currency}{b.spent.toFixed(0)} spent of {currency}{b.limit.toFixed(0)} cap</span>
                                  </div>
                                  <span className={`text-[10px] font-bold ${isOver ? "text-rose-500" : "text-zinc-400"}`}>
                                    {pct.toFixed(0)}% Used
                                  </span>
                                </div>

                                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                                  <div className={`h-full rounded-full bg-gradient-to-r ${b.color}`} style={{ width: `${pct}%` }} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* ── TAB 4: CATEGORIES ── */}
                    {activeTab === "categories" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-zinc-100">Expense Categories</h3>
                          <p className="text-zinc-500 text-xs">Visualize customized card buckets representing areas of cashflow</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { title: "Food & Dining", emoji: "🍔", spent: 207.90, color: "border-orange-500/20 text-orange-400" },
                            { title: "Transport", emoji: "🚗", spent: 43.75, color: "border-blue-500/20 text-blue-400" },
                            { title: "Shopping", emoji: "🛍️", spent: 570.00, color: "border-pink-500/20 text-pink-400" },
                            { title: "Bills & Utilities", emoji: "📄", spent: 289.99, color: "border-yellow-500/20 text-yellow-400" },
                            { title: "Entertainment", emoji: "🎬", spent: 110.00, color: "border-purple-500/20 text-purple-400" },
                            { title: "Others", emoji: "📌", spent: 0.00, color: "border-zinc-800 text-zinc-400" }
                          ].map(cat => (
                            <div key={cat.title} className={`glass p-5 rounded-2xl border ${cat.color} hover:shadow-lg transition-all duration-300 group`}>
                              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{cat.emoji}</div>
                              <span className="block text-xs font-bold text-zinc-200 mb-1">{cat.title}</span>
                              <span className="block text-[10px] text-zinc-500">
                                Spent this month: <strong className="text-zinc-300 font-semibold">{currency}{cat.spent.toFixed(2)}</strong>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── TAB 5: REPORTS & ANALYTICS ── */}
                    {activeTab === "reports" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-zinc-100">Reports & Analytics</h3>
                          <p className="text-zinc-500 text-xs">Visual statistical insights tracking income versus expenses</p>
                        </div>

                        {/* Top comparative highlights */}
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: "Total Income", val: totalIncomeVal, color: "text-emerald-400" },
                            { label: "Total Expenses", val: totalExpenseVal, color: "text-rose-500" },
                            { label: "Net Balance", val: balanceVal, color: "text-zinc-100 bg-zinc-900/40" }
                          ].map(card => (
                            <div key={card.label} className="glass p-4 rounded-xl border border-zinc-900 text-center space-y-1">
                              <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{card.label}</span>
                              <span className={`block text-xs sm:text-base font-black tracking-tight ${card.color}`}>
                                {currency}{card.val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Column Comparative Bar Mockup */}
                        <div className="glass p-6 rounded-2xl border border-zinc-900 space-y-5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Income vs Expenses</h4>
                          
                          {/* Comparative Graph Bars Layout */}
                          <div className="h-44 w-full relative flex items-end justify-center gap-12 pt-6">
                            {/* Income Column */}
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-[10px] font-bold text-emerald-400">{currency}{totalIncomeVal.toFixed(0)}</span>
                              <div className="w-16 bg-emerald-500/80 rounded-t-lg drop-shadow-[0_0_8px_#10b981] h-32" />
                              <span className="text-[9px] uppercase font-bold text-zinc-500">Income</span>
                            </div>

                            {/* Expenses Column */}
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-[10px] font-bold text-rose-400">{currency}{totalExpenseVal.toFixed(0)}</span>
                              <div className="w-16 bg-rose-500/80 rounded-t-lg drop-shadow-[0_0_8px_#f43f5e] h-16" />
                              <span className="text-[9px] uppercase font-bold text-zinc-500">Expenses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── TAB 6: GOALS (INTERACTIVE TARGETS) ── */}
                    {activeTab === "goals" && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-xl font-bold text-zinc-100">Savings Goals</h3>
                            <p className="text-zinc-500 text-xs">Set and fund financial landmarks with real-time feedback</p>
                          </div>
                        </div>

                        {/* Goals Grid */}
                        <div className="grid sm:grid-cols-3 gap-4">
                          {goals.map(g => {
                            const pct = Math.min((g.current / g.target) * 100, 100)
                            return (
                              <div key={g.id} className="glass p-5 rounded-2xl border border-zinc-900 flex flex-col justify-between min-h-[200px] hover:border-zinc-800 transition-colors">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-start">
                                    <div className="text-2xl">{g.icon}</div>
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                                      {pct.toFixed(0)}% Saved
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-bold text-zinc-200">{g.title}</h4>
                                    <p className="text-[9px] text-zinc-500">{g.deadline}</p>
                                  </div>
                                </div>

                                <div className="space-y-3.5 pt-4">
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold text-zinc-400">
                                      <span>{currency}{g.current.toLocaleString()}</span>
                                      <span>of {currency}{g.target.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden border border-zinc-850">
                                      <div className={`h-full rounded-full bg-gradient-to-r ${g.color}`} style={{ width: `${pct}%` }} />
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => setSelectedGoalId(g.id)}
                                    className="w-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-200 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                                  >
                                    Contribute Funds
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Interactive Contribution Form Overlay Modal */}
                        {selectedGoalId && (
                          <div className="p-5 glass rounded-2xl border border-emerald-500/25 bg-emerald-500/5 space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                Fund Goal: {goals.find(g => g.id === selectedGoalId)?.title}
                              </h4>
                              <button onClick={() => setSelectedGoalId(null)} className="text-zinc-400 hover:text-zinc-200">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <form onSubmit={handleGoalContribution} className="flex gap-3">
                              <input
                                type="number"
                                placeholder="Amount (e.g. 500)"
                                value={contributeAmount}
                                onChange={(e) => setContributeAmount(e.target.value)}
                                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-lg px-3.5 py-1.5 text-xs text-zinc-200 outline-none transition-all"
                                min="1"
                                required
                              />
                              <button
                                type="submit"
                                className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                              >
                                Submit Contribution
                              </button>
                            </form>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ── TAB 7: SETTINGS (CURRENCY CONFIG) ── */}
                    {activeTab === "settings" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-zinc-100">Preferences & Settings</h3>
                          <p className="text-zinc-500 text-xs">Configure localized parameters reflecting globally across tabs</p>
                        </div>

                        <div className="glass p-5 rounded-2xl border border-zinc-900 space-y-6">
                          {/* Currency selector */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-900/50">
                            <div>
                              <label className="block text-xs font-bold text-zinc-200 mb-1">Base Currency</label>
                              <span className="block text-[10px] text-zinc-500">Alters the transaction symbol in real-time across tabs</span>
                            </div>
                            <div className="flex gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800 w-full sm:w-auto">
                              {[
                                { id: "₱", label: "PHP (₱)" },
                                { id: "$", label: "USD ($)" },
                                { id: "€", label: "EUR (€)" }
                              ].map(cur => (
                                <button
                                  key={cur.id}
                                  onClick={() => setCurrency(cur.id)}
                                  className={`flex-1 sm:flex-none text-[10px] font-bold px-3 py-1.5 rounded-md transition-all ${
                                    currency === cur.id 
                                      ? "bg-emerald-500/15 border border-emerald-500/20 text-emerald-400" 
                                      : "text-zinc-500 hover:text-zinc-350"
                                  }`}
                                >
                                  {cur.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Account credentials display */}
                          <div className="flex justify-between items-center py-2 text-xs">
                            <div>
                              <span className="block font-bold text-zinc-200">Account Type</span>
                              <span className="block text-[10px] text-zinc-500">Security privilege context</span>
                            </div>
                            <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                              Active Demo Account
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SCREENSHOT TOUR ─── */}
      <section
        id="showcase-gallery"
        className="py-24 border-t border-zinc-900 bg-zinc-950/40"
      >
        <div className="container mx-auto px-4 max-w-5xl space-y-24">
          {/* Section Header */}
          <div className="text-center">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3 inline-block">
              Architectural Case Study
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Production Screenshots Breakdown
            </h2>
            <p className="text-zinc-400 mt-2 max-w-xl mx-auto">
              A deep-dive overview detailing design decisions, state patterns, and user experience workflows.
            </p>
          </div>

          {/* Tour Blocks */}
          {[
            {
              title: "Authentication & Login Gateway",
              img: "/projects/moneytrack/auth.png",
              tag: "Entrypoint Security",
              desc: "A clean, dark-themed login terminal focused on accessibility and effortless user experience. Includes direct credential authentication, one-click demo entrypoints, and high-visibility inputs to prevent sign-in friction."
            },
            {
              title: "Central Financial Command Center (Dashboard)",
              img: "/projects/moneytrack/dashboard.png",
              tag: "Aggregated Analytics",
              desc: "Provides real-time indicators showcasing overall financial balances, monthly earnings, expenditures, and net ratios. Coordinates custom line charts representing day-by-day spend ratios, detailed category donut breakdown representations, and budget limits alerts."
            },
            {
              title: "Full Transaction Ledger",
              img: "/projects/moneytrack/transactions.png",
              tag: "Data Tables & Sorting",
              desc: "A high-performance transaction listing layout featuring real-time client-side search indexing and categorized tab filters. Supports complex rows containing dates, tags, and badge indicators showing transaction state."
            },
            {
              title: "Expense Categories Management",
              img: "/projects/moneytrack/categories.png",
              tag: "Visual Categorization",
              desc: "Utilizes emoji representations and harmonized colors to bucket transaction flows. Hover states trigger subtle card glows and scaling animations to reinforce feedback loops."
            },
            {
              title: "Financial Reports & Insights",
              img: "/projects/moneytrack/reports.png",
              tag: "Analytics Engine",
              desc: "A visualization-first statistics page using clean column bar charts for comparing earnings against expenses, combined with reactive progress limits demonstrating monthly spending ratios."
            },
            {
              title: "Savings Goal Milestones",
              img: "/projects/moneytrack/goals.png",
              tag: "Target Planning",
              desc: "A gamified goal metric manager supporting incremental targets (Emergency Fund, Gadget upgrades). Features visual completing indicators, deadline indicators, and real-time funding modals."
            }
          ].map((tour, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={tour.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-14 items-center`}
              >
                {/* Visual Image */}
                <div 
                  className="flex-1 w-full relative group cursor-zoom-in"
                  onClick={() => {
                    setActiveLightboxImage(tour.img)
                    setActiveLightboxTitle(tour.title)
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl shadow-black/60 aspect-[16/9] w-full group-hover:border-emerald-500/30 transition-all duration-500">
                    <img
                      src={tour.img}
                      alt={tour.title}
                      className="w-full h-full object-cover object-top hover:scale-[1.025] transition-transform duration-700 select-none"
                      loading="lazy"
                    />
                    
                    {/* Zoom Indicator Icon Overlay on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-all duration-300 pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 rounded-full bg-black/60 border border-zinc-800 text-[10px] font-bold text-zinc-200">
                        Click to Zoom 🔍
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Explanation */}
                <div className="flex-1 space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center border border-emerald-500/25 shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-widest">
                      {tour.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-100 leading-tight">
                    {tour.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed text-pretty">
                    {tour.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─── SECTION 4: TECHNICAL SPECIFICATIONS & FEATURES ─── */}
      <section
        id="showcase-tech"
        className="py-24 border-t border-zinc-900 bg-[#09090b]"
      >
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          
          {/* Tech stack grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Technologies Used */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <div className="w-1.5 h-5 rounded-full bg-emerald-500" />
                Technologies Used
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Next.js 16.2.4 App Router", desc: "Framework & Routing" },
                  { name: "React 19", desc: "Interactive UI Layer" },
                  { name: "TypeScript 5.7.3", desc: "Typed Application Code" },
                  { name: "Tailwind CSS 4.2.0", desc: "Utility Styling System" },
                  { name: "shadcn/ui + Radix UI", desc: "Accessible Components" },
                  { name: "Recharts", desc: "Dashboard Visualizations" },
                  { name: "React Hook Form + Zod", desc: "Forms & Validation" },
                  { name: "localStorage + Context API", desc: "Mock Data & Auth State" }
                ].map(tech => (
                  <div key={tech.name} className="glass p-4 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-colors">
                    <span className="block text-xs font-bold text-zinc-200 mb-1">{tech.name}</span>
                    <span className="block text-[10px] text-zinc-500">{tech.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <div className="w-1.5 h-5 rounded-full bg-emerald-500" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  "Secure Credentials & Instant Demo Login Gateway",
                  "Aggregated Earnings, Spending, and Savings Overview",
                  "Categorized Tab Sorting and Transaction Ledger Filter",
                  "Custom Neon Trendlines and Glowing Analytical Charts",
                  "Visual Progress Limits indicating Monthly Cap Warnings",
                  "Funding Milestones with Live Contribution Increments",
                  "Interactive Currency Configures dynamically changing symbols"
                ].map(feature => (
                  <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-zinc-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing callout */}
          <div className="w-full text-center py-10">
            <h3 className="text-xl font-extrabold text-zinc-200 mb-4">Completed reviewing the project?</h3>
            <h5 className="text-xl font-extrabold text-zinc-200 mb-4">SOON TO BE PUBLISHED</h5>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={onClose}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-zinc-950 font-bold px-8 shadow-lg shadow-emerald-500/10"
              >
                Close Showcase
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="rounded-full border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-300 gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Lightbox Image Zoom Viewer ─── */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setActiveLightboxImage(null)}
          >
            {/* Close Button top right */}
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-150 hover:bg-zinc-805 transition-all shadow-lg z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative max-w-5xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <img
                src={activeLightboxImage}
                alt={activeLightboxTitle}
                className="max-h-[80vh] max-w-full rounded-2xl border border-zinc-805 shadow-2xl object-contain select-none cursor-zoom-out"
                onClick={() => setActiveLightboxImage(null)}
              />
              <div className="px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/50 text-[10px] font-bold text-zinc-300 shadow-md uppercase tracking-wider">
                {activeLightboxTitle}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
