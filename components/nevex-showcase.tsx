"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import {
  X,
  Github,
  ExternalLink,
  ChevronUp,
  ArrowLeft,
  ShoppingBag,
  Laptop,
  Trash2,
  Plus,
  TrendingUp,
  CreditCard,
  User,
  Sliders,
  PieChart,
  LogOut,
  Package,
  Layers,
  Heart,
  DollarSign,
  MapPin,
  CheckCircle,
  AlertCircle,
  Truck
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Interfaces ─── */
interface NevexShowcaseProps {
  isVisible: boolean
  onClose: () => void
}

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image: string
  desc: string
}

interface CartItem {
  product: Product
  quantity: number
}

interface Order {
  id: string
  date: string
  items: CartItem[]
  total: number
  paymentMethod: string
  status: "Processing" | "Out for Delivery" | "Delivered"
}

/* ─── Initial Sandbox Data ─── */
const initialProducts: Product[] = [
  { id: "1", name: "Nevex Spectre G16 Gaming Beast", category: "Gaming Laptops", price: 124999.00, stock: 12, image: "/projects/nevex/homepage.png", desc: "Unmatched mobile performance with Intel Core i9-14900HX, NVIDIA GeForce RTX 4080, and 32GB DDR5." },
  { id: "2", name: "Nevex Carbon Book Pro", category: "Workstations", price: 89999.00, stock: 8, image: "/projects/nevex/homepage.png", desc: "Ultra-portable pro-power featuring AMD Ryzen 9 8945HS, 16-inch 120Hz OLED screen, and 1TB PCIe 4.0 SSD." },
  { id: "3", name: "Nevex Zen Aura Creator", category: "OLED Ultrabooks", price: 74999.00, stock: 15, image: "/projects/nevex/homepage.png", desc: "Sleek and versatile creator workspace equipped with Intel Ultra 7, tactile drawing stylus compatibility, and a gorgeous 3K display." }
]

export function NevexShowcase({ isVisible, onClose }: NevexShowcaseProps) {
  const showcaseRef = useRef<HTMLDivElement>(null)

  /* Scroll Progress for Sticky indicators */
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"]
  })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  /* Lightbox Zoom States */
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null)
  const [activeLightboxTitle, setActiveLightboxTitle] = useState<string>("")

  /* Active Sandbox States */
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState("storefront") // storefront, cart, admin-products, add-product, analytics, user-dashboard
  
  /* Sandbox State Storage */
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [currency, setCurrency] = useState("₱") // ₱ or $

  /* Add Product Form State */
  const [newProdName, setNewProdName] = useState("")
  const [newProdCategory, setNewProdCategory] = useState("Gaming Laptops")
  const [newProdPrice, setNewProdPrice] = useState("")
  const [newProdStock, setNewProdStock] = useState("")
  const [newProdDesc, setNewProdDesc] = useState("")

  /* Checkout Form State */
  const [checkoutName, setCheckoutName] = useState("")
  const [checkoutAddress, setCheckoutAddress] = useState("")
  const [checkoutPayment, setCheckoutPayment] = useState("GCash")

  /* Sticky Navigation Section Tracker */
  const [activeSection, setActiveSection] = useState("banner")

  /* Track scroll coordinates */
  useEffect(() => {
    if (!isVisible) return
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const bannerEl = document.getElementById("nevex-banner")
      const sandboxEl = document.getElementById("nevex-sandbox")
      const galleryEl = document.getElementById("nevex-gallery")
      const techEl = document.getElementById("nevex-tech")

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

  /* Auto Scroll down on Mount */
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        showcaseRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [isVisible])

  /* E-Commerce Sandbox Logic */
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const clearCart = () => setCart([])

  const totalCartCost = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  /* Admin Actions */
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    removeFromCart(id)
  }

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProdName || !newProdPrice || !newProdStock) return
    const priceNum = parseFloat(newProdPrice)
    const stockNum = parseInt(newProdStock)
    if (isNaN(priceNum) || isNaN(stockNum)) return

    const newProd: Product = {
      id: Math.random().toString(),
      name: newProdName,
      category: newProdCategory,
      price: priceNum,
      stock: stockNum,
      image: "/projects/nevex/homepage.png",
      desc: newProdDesc || "High-performance laptops built by Nevex."
    }

    setProducts(prev => [...prev, newProd])
    setNewProdName("")
    setNewProdPrice("")
    setNewProdStock("")
    setNewProdDesc("")
    setActiveTab("storefront")
  }

  /* Checkout Handler */
  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0 || !checkoutName || !checkoutAddress) return

    const newOrder: Order = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: totalCartCost,
      paymentMethod: checkoutPayment,
      status: "Processing"
    }

    setOrders(prev => [newOrder, ...prev])
    clearCart()
    setCheckoutName("")
    setCheckoutAddress("")
    setActiveTab("user-dashboard")
  }

  /* Revenue & Admin Stats calculations */
  const totalRevenueVal = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrdersCount = orders.length

  /* Exchange rates for presentation */
  const formatPrice = (amount: number) => {
    const adjusted = currency === "$" ? amount / 56 : amount
    return currency + adjusted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  if (!isVisible) return null

  return (
    <div
      ref={showcaseRef}
      id="nevex-showcase"
      className="relative min-h-screen bg-[#08080c] text-zinc-100 overflow-x-hidden font-sans border-t border-zinc-800/80 z-40"
    >
      {/* Scroll indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-600 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Section dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5 z-40 bg-zinc-950/60 backdrop-blur-md px-3.5 py-6 rounded-full border border-zinc-800/60">
        {[
          { id: "banner", label: "Overview" },
          { id: "sandbox", label: "Interactive Store" },
          { id: "gallery", label: "Screenshots" },
          { id: "tech", label: "Tech Stack" }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => {
              document.getElementById(`nevex-${item.id}`)?.scrollIntoView({ behavior: "smooth" })
            }}
            className="group relative flex items-center justify-center"
            aria-label={`Scroll to ${item.label}`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSection === item.id 
                  ? "bg-cyan-500 scale-125 glow-blue" 
                  : "bg-zinc-650 group-hover:bg-zinc-400"
              }`}
            />
            {/* Tooltip */}
            <span className="absolute right-7 py-1 px-2.5 rounded bg-zinc-900 border border-zinc-850 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Showcase Sticky Header */}
      <nav className="sticky top-0 z-30 w-full glass border-b border-zinc-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-black font-extrabold text-sm tracking-tighter">N</span>
          </div>
          <span className="text-sm tracking-wider uppercase font-bold text-zinc-300">
            Nevex <span className="text-cyan-400 font-normal">Showcase</span>
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
        id="nevex-banner"
        className="relative py-28 lg:py-36 flex flex-col items-center justify-center text-center overflow-hidden px-4"
      >
        {/* Glowing visual effect background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-zinc-900/20 grid-pattern opacity-60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-450 text-xs font-bold tracking-wider uppercase mb-6"
        >
          Enterprise E-Commerce Case Study
        </motion.div>

        {/* Cinematic title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10 text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-8"
        >
          Nevex <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]">E-Commerce</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 text-zinc-450 text-lg sm:text-xl max-w-3xl leading-relaxed mb-12 text-balance"
        >
          A high-performance computing hardware storefront built with Supabase databases,
          custom admin inventory controls, interactive checkout pipelines, and real-time dashboard analytics.
        </motion.p>

        {/* Quick statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full p-8 glass rounded-3xl border border-zinc-800/50 mb-14"
        >
          {[
            { label: "Engineering Role", val: "Lead Frontend Architect" },
            { label: "Pipeline Duration", val: "8 Weeks (Q1 2026)" },
            { label: "Database Layer", val: "Supabase & Postgres" },
            { label: "Page Load Rating", val: "Under 1.2s Fast" }
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <span className="block text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</span>
              <span className="block text-zinc-200 text-sm sm:text-base font-black">{stat.val}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 flex gap-4 flex-wrap justify-center"
        >
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-zinc-950 font-bold px-8 shadow-lg shadow-blue-500/10"
            onClick={() => document.getElementById("nevex-sandbox")?.scrollIntoView({ behavior: "smooth" })}
          >
            Enter Interactive Sandbox
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-300"
            onClick={() => document.getElementById("nevex-gallery")?.scrollIntoView({ behavior: "smooth" })}
          >
            Review Original Images
          </Button>
        </motion.div>
      </section>

      {/* ─── SECTION 2: THE INTERACTIVE E-COMMERCE SANDBOX ─── */}
      <section
        id="nevex-sandbox"
        className="py-24 border-t border-zinc-900 bg-zinc-950/20 relative"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wider uppercase mb-3 inline-block">
              Interactive Store Simulation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-150 tracking-tight mb-4">
              Tactile E-Commerce Simulator
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Operate a live sandbox simulation of Nevex. Browse laptops, add items to the cart, complete transactions, view order logs, manage the inventory lists as admin, and monitor metrics.
            </p>
          </div>

          {/* Sandbox Wrapper Mockup */}
          <div className="w-full relative glass rounded-3xl border border-zinc-800/85 overflow-hidden shadow-2xl shadow-black/75 flex flex-col md:flex-row min-h-[580px]">
            
            {/* Sandbox sidebar */}
            <div className="w-full md:w-56 bg-zinc-950/90 border-r border-zinc-900 p-4 flex flex-col justify-between shrink-0">
              <div className="space-y-6">
                
                {/* Brand */}
                <div className="flex items-center gap-2.5 px-2">
                  <div className="w-6.5 h-6.5 rounded-md bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <span className="text-cyan-400 text-xs font-black">N</span>
                  </div>
                  <span className="text-xs font-black tracking-widest text-zinc-300">NEVEX HUB</span>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex flex-col gap-1.5">
                  {[
                    { id: "storefront", label: "Shop Front", icon: Laptop },
                    { id: "cart", label: `Shopping Cart (${cartItemCount})`, icon: ShoppingBag },
                    { id: "user-dashboard", label: "My Orders Logs", icon: User }
                  ].map(item => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? "bg-cyan-500/15 border border-cyan-500/20 text-cyan-450"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    )
                  })}

                  <div className="h-px bg-zinc-900 my-2" />
                  
                  {/* Admin specific toggles */}
                  <span className="block px-2 text-[9px] uppercase font-bold tracking-widest text-zinc-650">Admin Interface</span>
                  
                  {[
                    { id: "admin-products", label: "Store Inventory", icon: Sliders },
                    { id: "add-product", label: "Insert Product", icon: Plus },
                    { id: "analytics", label: "Store Analytics", icon: PieChart }
                  ].map(item => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? "bg-indigo-500/15 border border-indigo-500/20 text-indigo-400"
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

              {/* Preferences Settings */}
              <div className="pt-4 border-t border-zinc-900 space-y-3 px-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-zinc-550">Currency:</span>
                  <div className="flex gap-1 bg-zinc-900 p-0.5 rounded border border-zinc-800">
                    {["₱", "$"].map(c => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          currency === c ? "bg-cyan-500/20 text-cyan-400" : "text-zinc-550 hover:text-zinc-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Viewport Frame */}
            <div className="flex-1 bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto relative max-h-[640px]">
              
              <AnimatePresence mode="wait">
                
                {/* ── STOREFRONT ── */}
                {activeTab === "storefront" && (
                  <motion.div
                    key="storefront"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-black text-zinc-150">Laptop Hardware Store</h3>
                        <p className="text-zinc-550 text-xs">Browse our catalogue of high-specification computers</p>
                      </div>
                      <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-bold">
                        Items Catalogued: {products.length}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map(p => (
                        <div key={p.id} className="glass p-4 rounded-xl border border-zinc-900 flex flex-col justify-between min-h-[280px] hover:border-zinc-800 transition-colors">
                          <div className="space-y-3.5">
                            {/* Visual Placeholder laptop */}
                            <div className="w-full h-24 rounded bg-gradient-to-tr from-zinc-900 to-zinc-950 border border-zinc-900 flex items-center justify-center overflow-hidden relative">
                              <Laptop className="w-10 h-10 text-cyan-500/30 group-hover:scale-110 transition-transform duration-500" />
                              <span className="absolute bottom-1 right-2 text-[8px] uppercase tracking-wider font-bold text-zinc-650">{p.category}</span>
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-zinc-250 leading-snug line-clamp-1">{p.name}</h4>
                              <p className="text-[9px] text-zinc-500 leading-normal line-clamp-2 mt-1">{p.desc}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between mt-auto">
                            <span className="text-xs font-black text-zinc-200">{formatPrice(p.price)}</span>
                            <button
                              onClick={() => addToCart(p)}
                              className="bg-cyan-500 hover:bg-cyan-600 text-zinc-950 px-3 py-1.5 rounded text-[10px] font-bold transition-all"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── SHOPPING CART & CHECKOUT ── */}
                {activeTab === "cart" && (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-black text-zinc-150">My Shopping Basket</h3>
                      <p className="text-zinc-550 text-xs">Review computer hardware selected and proceed to payment</p>
                    </div>

                    {cart.length === 0 ? (
                      <div className="text-center py-14 space-y-3 glass rounded-2xl border border-zinc-900">
                        <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto" />
                        <h4 className="text-sm font-bold text-zinc-400">Basket is currently empty</h4>
                        <button
                          onClick={() => setActiveTab("storefront")}
                          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                        >
                          Browse Products
                        </button>
                      </div>
                    ) : (
                      <div className="grid lg:grid-cols-12 gap-6">
                        
                        {/* Basket Items */}
                        <div className="lg:col-span-7 space-y-3">
                          {cart.map(item => (
                            <div key={item.product.id} className="flex justify-between items-center p-3.5 rounded-xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-850 flex items-center justify-center text-cyan-400">
                                  <Laptop className="w-4 h-4" />
                                </div>
                                <div>
                                  <span className="block text-xs font-bold text-zinc-200 line-clamp-1">{item.product.name}</span>
                                  <span className="block text-[9px] text-zinc-500">Qty: {item.quantity} • {formatPrice(item.product.price)} each</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-xs font-black text-zinc-200">
                                  {formatPrice(item.product.price * item.quantity)}
                                </span>
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-zinc-650 hover:text-rose-400 transition-colors p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Checkout Ledger Column */}
                        <form onSubmit={handlePlaceOrderSubmit} className="lg:col-span-5 glass p-5 rounded-2xl border border-zinc-900 space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">Order Checkout</h4>
                          
                          <div className="space-y-1">
                            <span className="block text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Total Bill</span>
                            <span className="block text-2xl font-black text-cyan-450">{formatPrice(totalCartCost)}</span>
                          </div>

                          <div className="h-px bg-zinc-900 my-2" />

                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Customer Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Neil Marcelo"
                              value={checkoutName}
                              onChange={(e) => setCheckoutName(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-500/50 rounded-lg px-3.5 py-1.5 text-xs text-zinc-200 outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Delivery Address</label>
                            <input
                              type="text"
                              required
                              placeholder="Manila, Philippines"
                              value={checkoutAddress}
                              onChange={(e) => setCheckoutAddress(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-850 focus:border-cyan-500/50 rounded-lg px-3.5 py-1.5 text-xs text-zinc-200 outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Payment Gateway</label>
                            <select
                              value={checkoutPayment}
                              onChange={(e) => setCheckoutPayment(e.target.value)}
                              className="w-full bg-zinc-900 border border-zinc-850 text-zinc-350 font-bold rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer"
                            >
                              <option value="GCash">GCash Wallet</option>
                              <option value="Maya">Maya Wallet</option>
                              <option value="Cash on Delivery">Cash on Delivery</option>
                              <option value="Credit Card">Credit/Debit Card</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-zinc-950 font-extrabold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
                          >
                            Place E-Commerce Order
                          </button>
                        </form>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── ADMIN PRODUCTS LIST (INVENTORY EDIT) ── */}
                {activeTab === "admin-products" && (
                  <motion.div
                    key="admin-products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-lg font-black text-zinc-150">Store Inventory Controls</h3>
                      <p className="text-zinc-550 text-xs">Administrate computer lists, prices, stock levels, and delete products</p>
                    </div>

                    <div className="glass rounded-2xl border border-zinc-900 overflow-hidden overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-zinc-900 bg-zinc-950 text-zinc-550 font-bold uppercase tracking-wider text-[9px]">
                            <th className="p-3.5 pl-5">Product Details</th>
                            <th className="p-3.5">Category</th>
                            <th className="p-3.5">Stock Level</th>
                            <th className="p-3.5">Price Tag</th>
                            <th className="p-3.5 text-center pr-5">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900/50">
                          {products.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center p-8 text-zinc-500">
                                Inventory is empty. Insert products above.
                              </td>
                            </tr>
                          ) : (
                            products.map(p => (
                              <tr key={p.id} className="hover:bg-zinc-900/15 transition-colors group">
                                <td className="p-3.5 pl-5 font-bold text-zinc-200 group-hover:text-cyan-400 transition-colors truncate max-w-[200px]">
                                  {p.name}
                                </td>
                                <td className="p-3.5 text-zinc-400 font-medium">{p.category}</td>
                                <td className="p-3.5">
                                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide border ${
                                    p.stock <= 8 
                                      ? "bg-rose-500/10 border-rose-500/25 text-rose-400" 
                                      : "bg-zinc-900 border-zinc-850 text-zinc-400"
                                  }`}>
                                    {p.stock} Units
                                  </span>
                                </td>
                                <td className="p-3.5 font-extrabold text-zinc-200">
                                  {formatPrice(p.price)}
                                </td>
                                <td className="p-3.5 text-center pr-5">
                                  <button
                                    onClick={() => deleteProduct(p.id)}
                                    className="p-1.5 rounded-full hover:bg-rose-500/10 text-zinc-650 hover:text-rose-400 transition-colors"
                                    title="Delete product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* ── ADD PRODUCT SYSTEM FORM ── */}
                {activeTab === "add-product" && (
                  <motion.div
                    key="add-product"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-black text-zinc-150">Add Product System</h3>
                      <p className="text-zinc-550 text-xs">Create new product offerings by compiling the form parameters</p>
                    </div>

                    <form onSubmit={handleAddProductSubmit} className="glass p-6 rounded-2xl border border-zinc-900 space-y-4 max-w-xl mx-auto">
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1.5">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Product Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Nevex Titan G18 Masterclass"
                            value={newProdName}
                            onChange={(e) => setNewProdName(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-850 focus:border-indigo-500/50 rounded-lg px-3.5 py-1.5 text-xs text-zinc-200 outline-none transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Category Category</label>
                          <select
                            value={newProdCategory}
                            onChange={(e) => setNewProdCategory(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-850 text-zinc-350 font-bold rounded-lg px-3 py-1.5 text-xs outline-none cursor-pointer"
                          >
                            <option value="Gaming Laptops">Gaming Laptops</option>
                            <option value="Workstations">Workstations</option>
                            <option value="OLED Ultrabooks">OLED Ultrabooks</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Price Cost (PHP)</label>
                          <input
                            type="number"
                            required
                            placeholder="145000"
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-850 focus:border-indigo-500/50 rounded-lg px-3.5 py-1.5 text-xs text-zinc-200 outline-none transition-colors"
                            min="1000"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Initial Stock Units</label>
                          <input
                            type="number"
                            required
                            placeholder="10"
                            value={newProdStock}
                            onChange={(e) => setNewProdStock(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-850 focus:border-indigo-500/50 rounded-lg px-3.5 py-1.5 text-xs text-zinc-200 outline-none transition-colors"
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Specification Summary</label>
                        <textarea
                          placeholder="Provide computer hardware specifications..."
                          value={newProdDesc}
                          onChange={(e) => setNewProdDesc(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 focus:border-indigo-500/50 rounded-lg px-3.5 py-2.5 text-xs text-zinc-200 outline-none transition-colors min-h-[80px]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-zinc-100 font-extrabold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10"
                      >
                        Create New Listing
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ── STORE ANALYTICS DASHBOARD ── */}
                {activeTab === "analytics" && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-black text-zinc-150">Store Analytics Dashboard</h3>
                      <p className="text-zinc-550 text-xs">Real-time stats tracking transactions, margins, and sales breakdown</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Total Revenue", val: formatPrice(totalRevenueVal), icon: DollarSign, color: "text-cyan-400" },
                        { label: "Orders Logged", val: totalOrdersCount + " Orders", icon: Package, color: "text-zinc-100" },
                        { label: "Items Offered", val: products.length + " Laptops", icon: Laptop, color: "text-indigo-400" },
                        { label: "Delivery Status", val: orders.filter(o => o.status === "Processing").length + " Pending", icon: Truck, color: "text-orange-400" }
                      ].map(card => {
                        const Icon = card.icon
                        return (
                          <div key={card.label} className="glass p-4 rounded-xl border border-zinc-900 flex justify-between items-center">
                            <div className="space-y-1">
                              <span className="block text-[9px] font-bold text-zinc-505 uppercase tracking-wider">{card.label}</span>
                              <span className={`block text-base font-extrabold tracking-tight truncate ${card.color}`}>{card.val}</span>
                            </div>
                            <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-550">
                              <Icon className="w-4 h-4" />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Sales breakdown graph mockup */}
                    <div className="glass p-6 rounded-2xl border border-zinc-900 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Monthly Sales shares</h4>
                      <div className="h-40 w-full relative flex items-end justify-center pt-8">
                        <div className="absolute inset-x-0 top-1/2 border-t border-zinc-900" />
                        <div className="flex gap-14 items-end">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="text-[10px] font-bold text-cyan-400">{orders.length > 0 ? "100%" : "0%"}</span>
                            <div className="w-14 bg-cyan-500/80 rounded-t h-28 drop-shadow-[0_0_8px_#06b6d4]" style={{ height: orders.length > 0 ? "112px" : "4px" }} />
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">May 2026</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── USER ORDERS HISTORY DASHBOARD ── */}
                {activeTab === "user-dashboard" && (
                  <motion.div
                    key="user-dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-lg font-black text-zinc-150">My Purchase Ledger</h3>
                      <p className="text-zinc-550 text-xs">Track active orders, status logistics, and invoices</p>
                    </div>

                    {orders.length === 0 ? (
                      <div className="text-center py-14 space-y-3 glass rounded-2xl border border-zinc-900">
                        <Package className="w-12 h-12 text-zinc-700 mx-auto" />
                        <h4 className="text-sm font-bold text-zinc-400">No purchases logged in sandbox</h4>
                        <span className="text-zinc-500 text-[10px]">Add items in Shop Front and check out to log purchases.</span>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {orders.map(ord => (
                          <div key={ord.id} className="glass p-5 rounded-2xl border border-zinc-900 space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <div>
                                <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-zinc-900 border border-zinc-800 text-zinc-400">{ord.id}</span>
                                <span className="text-[10px] text-zinc-500 ml-2">Ordered on {ord.date}</span>
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
                                {ord.status}
                              </span>
                            </div>

                            <div className="space-y-2">
                              {ord.items.map(item => (
                                <div key={item.product.id} className="flex justify-between items-center text-xs">
                                  <span className="text-zinc-300 font-medium line-clamp-1">{item.product.name} <span className="text-zinc-550">x{item.quantity}</span></span>
                                  <span className="font-extrabold text-zinc-200">{formatPrice(item.product.price * item.quantity)}</span>
                                </div>
                              ))}
                            </div>

                            <div className="pt-3 border-t border-zinc-900/60 flex justify-between items-center text-xs">
                              <span className="text-zinc-500 font-semibold">Payment method: {ord.paymentMethod}</span>
                              <span className="font-black text-cyan-400">Grand Total: {formatPrice(ord.total)}</span>
                            </div>
                          </div>
                        ))}
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
        id="nevex-gallery"
        className="py-24 border-t border-zinc-900 bg-zinc-950/40"
      >
        <div className="container mx-auto px-4 max-w-5xl space-y-24">
          <div className="text-center">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase mb-3 inline-block">
              Visual Portfolio Tour
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-150 tracking-tight">
              Production Screenshots Breakdown
            </h2>
            <p className="text-zinc-400 mt-2 max-w-xl mx-auto">
              Deep-dive examination showcasing components of the e-commerce layout platform.
            </p>
          </div>

          <div className="space-y-24">
            {[
              {
                title: "Storefront Home Page Catalog",
                img: "/projects/nevex/homepage.png",
                tag: "Storefront Landing",
                desc: "A high-fidelity hardware storefront featuring custom glowing cards representing available PCs and laptops. Employs micro-animations, glassmorphic headers, and instant add-to-cart pipelines."
              },
              {
                title: "Admin Inventory Management",
                img: "/projects/nevex/admin-products.png",
                tag: "Admin Product Ledger",
                desc: "A dedicated control panel allowing store operators to search, inspect stock statuses, modify item settings, and delete listings in real-time."
              },
              {
                title: "Add Product Form Gateway",
                img: "/projects/nevex/add-product.png",
                tag: "Admin Product CRUD",
                desc: "A neat and validated creation module where administrators specify product names, categories, descriptions, initial stock numbers, and prices."
              },
              {
                title: "Store Revenue Analytics",
                img: "/projects/nevex/analytics.png",
                tag: "Analytics Dashboard",
                desc: "Aggregates revenue calculations, complete order records, catalog metrics, and logistics statuses. Houses clean bar and comparative pie visuals."
              },
              {
                title: "User Order Logistics & Cart",
                img: "/projects/nevex/user-dashboard.png",
                tag: "User Purchase Panel",
                desc: "Enables customers to inspect order listings, delivery updates, and checkout totals, backed by GCash, Maya, and credit payment models."
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl shadow-black/60 aspect-[16/9] w-full group-hover:border-cyan-500/30 transition-all duration-500">
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

                  <div className="flex-1 space-y-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold flex items-center justify-center border border-blue-500/25 shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10 uppercase tracking-widest">
                        {tour.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-150 leading-tight">
                      {tour.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {tour.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: TECHNICAL SPECIFICATIONS & FEATURES ─── */}
      <section
        id="nevex-tech"
        className="py-24 border-t border-zinc-900 bg-[#08080c]"
      >
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Technologies */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <div className="w-1.5 h-5 rounded-full bg-blue-505 bg-blue-550" />
                Technologies Used
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Python", desc: "Backend Language" },
                  { name: "Flask", desc: "Web Framework" },
                  { name: "Jinja2 Templates", desc: "Server-Side Rendering" },
                  { name: "Supabase & Postgres", desc: "Database & Auth Layer" },
                  { name: "JavaScript", desc: "Client-Side Scripting" },
                  { name: "HTML5 & CSS3", desc: "Web Markup & Styling" }
                ].map(tech => (
                  <div key={tech.name} className="glass p-4 rounded-xl border border-zinc-900 hover:border-zinc-800 transition-colors">
                    <span className="block text-xs font-bold text-zinc-200 mb-1">{tech.name}</span>
                    <span className="block text-[10px] text-zinc-500">{tech.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <div className="w-1.5 h-5 rounded-full bg-blue-550" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  "Secure Supabase Accounts & Postgres Transactions",
                  "Modular Product Catalog Grid with Responsive Spec Panels",
                  "Live Shopping Cart Calculations with State Hooks",
                  "Checkout Integrations with GCash, Maya, and COD",
                  "Admin Inventory CRUD adding and deleting laptops dynamically",
                  "Detailed Analytics tracking Revenue and Monthly shares",
                  "Interactive Currency Configures altering symbols globally"
                ].map(feature => (
                  <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-xs text-zinc-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="w-full text-center py-10">
            <h3 className="text-xl font-extrabold text-zinc-200 mb-4">Completed reviewing Nevex?</h3>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={onClose}
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-zinc-950 font-bold px-8 shadow-lg shadow-blue-500/10"
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
                className="max-h-[80vh] max-w-full rounded-2xl border border-zinc-850 shadow-2xl object-contain select-none cursor-zoom-out"
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
