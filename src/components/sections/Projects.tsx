"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProjectIndex } from "@/types";

export default function Projects({
  projects,
  title = "Featured",
  subtitle = "work",
}: {
  projects: ProjectIndex[];
  title?: string;
  subtitle?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultGradients = [
    "from-primary to-secondary",
    "from-secondary to-tertiary",
    "from-tertiary to-primary",
  ];

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-[family-name:var(--font-mono)] text-primary-light tracking-widest uppercase">
            // Projects
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            {title} <span className="gradient-text">{subtitle}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const gradient =
              project.gradient || defaultGradients[i % defaultGradients.length];
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="gradient-border h-full">
                  <div className="bg-card rounded-xl p-6 h-full flex flex-col">
                    <div
                      className={`h-1 w-12 rounded-full bg-gradient-to-r ${gradient} mb-5`}
                    />
                    <h3 className="font-[family-name:var(--font-headline)] text-xl font-semibold mb-3">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 text-justify">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {(project.techStack || [])
                        .slice(0, 4)
                        .map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[10px] font-[family-name:var(--font-mono)] bg-surface-container-high text-muted-foreground border-outline-variant/50"
                          >
                            {tag}
                          </Badge>
                        ))}
                      {(project.techStack || []).length > 4 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-surface-container text-muted-foreground border-none"
                        >
                          +{(project.techStack || []).length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-1.5 text-xs bg-primary text-white hover:bg-primary/90 shadow-sm"
                        asChild
                      >
                        <Link href={`/projects/${project.slug}`}>
                          Details <ArrowRight size={14} strokeWidth={1.5} />
                        </Link>
                      </Button>
                      {project.githubUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-xs text-muted-foreground hover:text-tertiary-light"
                          asChild
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={14} strokeWidth={1.5} /> Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5 text-xs text-muted-foreground hover:text-tertiary-light"
                          asChild
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={14} strokeWidth={1.5} /> Live
                          </a>
                        </Button>
                      )}
                    </div>
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
