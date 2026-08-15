"use client";

import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, MessageCircle, FileText, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    href: process.env.NEXT_PUBLIC_GITHUB_URL || "#",
    icon: Github,
    label: "GitHub",
  },
  {
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL || "#",
    icon: MessageCircle,
    label: "WhatsApp",
  },
  {
    href: "/Akshat_Mishra_Fullstack.pdf",
    icon: FileText,
    label: "Resume",
    download: "Akshat_Mishra_Fullstack.pdf",
  },
];

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 bg-surface-dim/30 border-t border-border mt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Bio */}
          <div className="md:col-span-2">
            <Link href="#" className="flex items-center gap-4 mb-5 w-fit group">
              <Image
                src="/portfolio_logo_light.svg"
                alt="AKM Logo"
                width={100}
                height={100}
                className="drop-shadow-sm rounded-sm transition-transform duration-300 group-hover:scale-105 dark:hidden"
              />
              <Image
                src="/portfolio_logo_dark.svg"
                alt="AKM Logo"
                width={100}
                height={100}
                className="drop-shadow-sm rounded-sm transition-transform duration-300 group-hover:scale-105 hidden dark:block"
              />
              <span className="text-3xl font-bold font-[family-name:var(--font-headline)] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Akshat Mishra
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              A Senior Full-Stack Engineer dedicated to building
              precision-engineered web applications with modern technologies and
              pixel-perfect design.
            </p>
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_PERSONAL_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Mail size={16} />
              {process.env.NEXT_PUBLIC_PERSONAL_EMAIL || ""}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={link.download}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <link.icon size={16} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-border/60 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-[family-name:var(--font-mono)]">
            © 2024 Akshat Kumar Mishra. Built with Precision Engineering.
          </p>
          <p className="text-sm text-muted-foreground font-[family-name:var(--font-mono)] flex items-center gap-1.5">
            Designed & Maintained By{" "}
            <span className="text-secondary">Akshat Mishra</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
