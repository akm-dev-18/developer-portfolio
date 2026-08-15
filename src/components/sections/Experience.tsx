"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

import { Experience as ExperienceType, ExperienceData } from "@/types";

export default function Experience({ experience }: { experience: ExperienceData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allExperience = [...(experience?.experience || []), ...(experience?.internships || [])];

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-[family-name:var(--font-mono)] text-primary-light tracking-widest uppercase">
            // Experience
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            Career <span className="gradient-text">trajectory</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {allExperience.map((exp: ExperienceType, i: number) => {
            const current = exp.endDate === "Present";
            const period = `${exp.startDate} - ${exp.endDate}`;
            return (
              <motion.div
                key={`${exp.company || 'independent'}-${exp.role}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 top-1 z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      current
                        ? "border-primary bg-primary shadow-glow-primary"
                        : "border-outline-variant bg-surface-container"
                    }`}
                  />
                </div>

                {/* Content card */}
                <div className="ml-12 md:ml-0 md:w-[calc(50%-40px)]">
                  <div className="glass rounded-xl p-6 glass-hover transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase size={14} strokeWidth={1.5} className="text-primary-light" />
                      <span className="text-xs font-[family-name:var(--font-mono)] text-primary-light tracking-wide">
                        {period}
                      </span>
                      {current && (
                        <Badge className="ml-auto text-xs bg-primary/10 text-primary border-transparent h-6">
                          Current
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-[family-name:var(--font-headline)] text-lg font-semibold mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">{exp.company} • {exp.location}</p>
                    <div className="text-sm text-on-surface-variant leading-relaxed mt-3 space-y-2 text-justify">
                      <ul className="list-disc pl-4 space-y-1">
                        {exp.highlights?.map((highlight: string, index: number) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    {exp.projectSlugs && exp.projectSlugs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.projectSlugs.map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs font-[family-name:var(--font-mono)] bg-surface-container-high text-muted-foreground border-outline-variant/50 h-6"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

