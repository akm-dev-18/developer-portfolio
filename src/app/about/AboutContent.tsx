"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Layers, Zap, Code, Users } from "lucide-react";
import { ProfileData } from "@/types";

const principles = [
  {
    icon: Layers,
    title: "Architecture First",
    description: "Designing scalable foundations before writing a single line of business logic.",
  },
  {
    icon: Zap,
    title: "Performance Focus",
    description: "Optimizing for speed and efficiency to deliver seamless user experiences.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Maintaining strict coding standards for long-term maintainability.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Fostering cross-functional communication to align engineering with product goals.",
  },
];

export default function About({ profile }: { profile: ProfileData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <div className="flex-grow pb-24 px-6 md:px-6 max-w-[1200px] mx-auto w-full" ref={ref}>
        {/* Mission Statement */}
      <section className="mb-24 text-center max-w-3xl mx-auto mt-12 md:mt-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-headline)] text-heading mb-4 tracking-tight"
        >
          Engineering with Precision.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          I build robust, scalable systems that translate complex technical requirements into seamless user experiences. Quality code is just the beginning.
        </motion.p>
      </section>

      {/* Behind the Code (Bento Grid) */}
      <section className="mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold font-[family-name:var(--font-headline)] text-heading mb-6"
        >
          Behind the Code
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Bio Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 glass border border-border rounded-xl p-6 md:p-8 hover:border-primary transition-colors duration-300"
          >
            <h3 className="font-mono text-xs font-semibold tracking-widest text-primary mb-4 uppercase">Biography</h3>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                {profile?.personalInfo?.summary || 
                  "With over a decade of experience in software engineering, I specialize in architecting high-performance web applications. My approach blends rigorous technical standards with an acute awareness of product goals."
                }
              </p>
              <p>
                I believe in the power of clean, maintainable code and the importance of continuous learning in a rapidly evolving technological landscape.
              </p>
            </div>
          </motion.div>
          
          {/* Image Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass border border-border rounded-xl overflow-hidden h-64 md:h-auto relative"
          >
            <Image 
              src={profile?.personalInfo?.avatarUrl || "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80"}
              alt="Profile image"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </div>
      </section>

      </div>

      {/* Values/Interests Grid */}
      <section className="py-24 bg-muted/30 border-t border-border w-full">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-3xl font-bold font-[family-name:var(--font-headline)] text-heading mb-12 text-center"
          >
            Core Principles
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {principles.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass border border-border rounded-xl p-6 hover:border-primary transition-colors duration-300 group"
              >
                <item.icon className="text-primary mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
                <h4 className="text-base font-bold text-heading mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
