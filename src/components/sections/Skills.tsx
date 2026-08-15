"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { TechnicalSkills } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Skills({ skills }: { skills: TechnicalSkills }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    { title: "Frontend", items: skills.frontend || [] },
    { title: "Backend", items: skills.backend || [] },
    { title: "Databases", items: skills.databases || [] },
    { title: "Cloud & DevOps", items: skills.cloudAndDevOps || [] }
  ];

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-4"
        >
          <div>
            <span className="text-xs font-[family-name:var(--font-mono)] text-primary-light tracking-widest uppercase">
              // Skills
            </span>
            <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold mt-3 tracking-tight">
              Technical <span className="gradient-text">Proficiency</span>
            </h2>
          </div>
          <Link 
            href="/skills" 
            className="text-sm font-semibold flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
          >
            View Full Arsenal <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass p-6 rounded-xl border border-border flex flex-col"
            >
              <h3 className="text-lg font-bold font-[family-name:var(--font-headline)] mb-5 text-heading border-b border-border/50 pb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.slice(0, 8).map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="font-mono text-xs bg-surface-container text-muted-foreground border-outline-variant/50 h-6">
                    {skill}
                  </Badge>
                ))}
                {category.items.length > 8 && (
                   <Badge variant="secondary" className="font-mono text-xs bg-primary/10 text-primary border-transparent h-6">
                     +{category.items.length - 8}
                   </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
