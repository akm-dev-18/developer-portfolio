"use client";

import { Share2, Database, HardDrive, Box, Cloud, Braces, TerminalSquare, Code, Server } from "lucide-react";

const technologies = [
  { name: "NestJS", icon: Share2 },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: HardDrive },
  { name: "Docker", icon: Box },
  { name: "AWS", icon: Cloud },
  { name: "React", icon: Braces },
  { name: "Next.js", icon: TerminalSquare },
  { name: "Angular", icon: Code },
  { name: "Node.js", icon: Server },
];

export default function TechMarquee({ skills }: { skills?: Record<string, string[]> }) {
  // If skills are passed, we flat map them.
  const flatSkills = skills
    ? Array.from(new Set(Object.values(skills).flat()))
    : technologies.map(t => t.name);

  // We can just use the Code icon for all if using dynamic strings,
  // or fall back to the predefined ones if not provided.
  const displayItems = skills
    ? flatSkills.map(name => ({ name, icon: Code }))
    : technologies;

  return (
    <section className="relative overflow-hidden bg-surface-dim/30 border-y border-border py-4 xl:py-10  mt-8 md:mt-0 flex items-center">
      {/* 
        To make the marquee infinite and seamless, we duplicate the list of technologies twice.
        The container will animate its transform by -50%.
      */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] [animation-duration:60s]">
        {/* First Half */}
        <div className="flex shrink-0 justify-around items-center gap-8 px-4 sm:gap-12 sm:px-6">
          {displayItems.map((tech) => (
            <div key={tech.name} className="flex items-center gap-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300">
              <tech.icon size={20} strokeWidth={1.5} />
              <span className="text-sm font-[family-name:var(--font-mono)] font-medium text-justify">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        {/* Second Half (duplicate) */}
        <div className="flex shrink-0 justify-around items-center gap-8 px-4 sm:gap-12 sm:px-6">
          {displayItems.map((tech) => (
            <div key={`${tech.name}-dup`} className="flex items-center gap-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300">
              <tech.icon size={20} strokeWidth={1.5} />
              <span className="text-sm font-[family-name:var(--font-mono)] font-medium text-justify">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Optional: Add gradient fades to the left and right edges for a seamless look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-background to-transparent z-10" />
    </section>
  );
}
