"use client";

import React, {useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Terminal } from "lucide-react";
import TechMarquee from "./TechMarquee";

import { ProfileData } from "@/types";

const codeSnippet = `import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Hello World</h1>
    </motion.div>
  );
}`;

export default function Hero({ profile }: { profile: ProfileData }) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  /* Typing animation for code block */
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < codeSnippet.length) {
        setDisplayedCode(codeSnippet.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 18);
    return () => clearInterval(timer);
  }, []);

  /* Blinking cursor */
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background glow spots */}
        <div className="glow-spot w-[500px] h-[500px] bg-primary/10 -top-24 -left-24" />
        <div className="glow-spot w-[400px] h-[400px] bg-secondary/8 bottom-20 right-0" />
        <div className="glow-spot w-[300px] h-[300px] bg-tertiary/5 top-1/2 left-1/2" />

        {/* Grid background */}
        <div className="absolute inset-0 grid-bg" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-container text-xs font-[family-name:var(--font-mono)] text-primary-light tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AVAILABLE FOR WORK
            </motion.div>

            <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              Building scalable
              <br />
              web applications <span className="gradient-text">end-to-end</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 text-justify">
              {profile?.personalInfo?.title || "Senior Full-Stack Developer"} specializing in React, Node.js, and cloud infrastructure. I architect and build robust digital products that solve complex business problems.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#contact">Contact Me</Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={20} strokeWidth={1.5} />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>

          {/* Right — Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2, ease: "easeOut" },
              x: { duration: 0.8, delay: 0.2, ease: "easeOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="hidden lg:block"
          >
            <div className="glass rounded-xl overflow-hidden shadow-card">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-400/60 bg-gray-200/60 shadow-md dark:bg-transparent dark:border-border">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-[family-name:var(--font-mono)] text-muted-foreground ml-2 flex items-center gap-1.5">
                  <Terminal size={12} strokeWidth={1.5} />
                  Hero.tsx
                </span>
              </div>
              {/* Code body */}
              <pre className="p-5 text-sm font-[family-name:var(--font-mono)] leading-relaxed text-on-surface-variant overflow-x-auto">
                <code>
                  {displayedCode}
                  <span
                    className={`inline-block w-[2px] h-4 bg-primary ml-0.5 align-text-bottom transition-opacity ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
      <TechMarquee skills={profile.technicalSkills} />
    </>
  );
}
