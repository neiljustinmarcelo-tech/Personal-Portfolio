"use client"

import { useState, useEffect, useRef } from "react"

export type ScrollDirection = "up" | "down" | "idle"

export function useScrollDirection(): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("idle")
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > prevScrollY.current + 3) {
        setScrollDirection("down")
      } else if (currentScrollY < prevScrollY.current - 3) {
        setScrollDirection("up")
      }
      prevScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollDirection
}
