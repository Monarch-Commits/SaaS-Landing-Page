'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 border-border/50 border-b backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-300 items-center justify-between px-2">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/FlowAI.svg"
              alt="FlowAI Logo"
              width={32}
              height={32}
              className="rounded-lg"
              priority
            />

            <span className="text-foreground text-lg font-semibold">
              FlowAI
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Product
            </Link>
            <Link
              href="#product"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Docs
            </Link>
          </div>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
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
          className="text-foreground md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div className="bg-background/95 border-border border-b backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-4 py-4">
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
            <div className="border-border flex flex-col gap-2 border-t pt-4">
              <Button
                variant="ghost"
                className="text-muted-foreground justify-start"
              >
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
  );
}
