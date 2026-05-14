"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full max-w-300 mx-auto  px-2 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-lg text-foreground">FlowAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Product
            </Link>
            <Link
              href="#product"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Sign in
          </Button>
          <Button
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-4"
          >
            Get Started
          </Button>
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className=" py-4 flex flex-col gap-4">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Product
            </Link>
            <Link
              href="#product"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" className="justify-start text-muted-foreground">
                Sign in
              </Button>
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
