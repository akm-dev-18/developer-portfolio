"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-card" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-2.5 font-[family-name:var(--font-headline)] text-xl font-bold tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/portfolio_logo_light.svg"
            alt="AKM Logo"
            width={32}
            height={32}
            className="drop-shadow-sm rounded-sm dark:hidden"
          />
          <Image
            src="/portfolio_logo_dark.svg"
            alt="AKM Logo"
            width={32}
            height={32}
            className="drop-shadow-sm rounded-sm hidden dark:block"
          />
          <div>
            <span className="gradient-text">AKM</span>
            <span className="text-muted-foreground">.</span>
            <span className="text-black dark:text-white ">DEV</span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-[family-name:var(--font-mono)] text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-3">
            <ThemeToggle />
            <Button variant="outline" className="gap-2 h-10" asChild>
              <a
                href="/Akshat_Mishra_Fullstack.pdf"
                download="Akshat_Mishra_Fullstack.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} /> Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="block px-3 py-2 text-sm font-[family-name:var(--font-mono)] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  asChild
                >
                  <a
                    href="/Akshat_Mishra_Fullstack.pdf"
                    download="Akshat_Mishra_Fullstack.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={14} /> Resume
                  </a>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
