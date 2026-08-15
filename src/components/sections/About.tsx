"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProfileData } from "@/types";

export default function About({ profile }: { profile: ProfileData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-4"
        >
          <div>
            <span className="text-xs font-[family-name:var(--font-mono)] text-primary-light tracking-widest uppercase">
              // About
            </span>
            <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold mt-3 tracking-tight">
              Engineering <span className="gradient-text">Philosophy</span>
            </h2>
          </div>
          <Link 
            href="/about" 
            className="text-sm font-semibold flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
          >
            Full Profile <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/3 w-full"
          >
            <div className="relative aspect-square w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src={profile?.personalInfo?.avatarUrl || "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80"}
                alt="Profile photo"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:w-2/3"
          >
            <div className="glass p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-headline)] mb-4 text-heading">
                Building Robust Systems
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
                <p>
                  {profile?.personalInfo?.summary || 
                    "With over a decade of experience in software engineering, I specialize in architecting high-performance web applications. My approach blends rigorous technical standards with an acute awareness of product goals."
                  }
                </p>
                <p>
                  I believe in the power of clean, maintainable code and the importance of continuous learning in a rapidly evolving technological landscape. Whether it's designing scalable backends or crafting intuitive user interfaces, I prioritize quality and user experience above all else.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
