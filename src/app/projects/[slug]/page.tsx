import { Metadata } from 'next';
import { getProjectBySlug, getProjectsData } from '@/data/db';
import { ProjectDetail, ImpactMetric } from '@/types';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { ArrowDown, ExternalLink, CheckCircle2 } from 'lucide-react';

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjectsData();
  return projects.map((project: ProjectDetail) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Akshat Kumar Mishra',
      description: 'The requested project could not be found.',
    };
  }

  const flattenedTechStack = [
    ...(project.techStack.frontend || []),
    ...(project.techStack.backend || []),
    ...(project.techStack.database || []),
    ...(project.techStack.devopsAndTools || []),
    ...(project.techStack.other || []),
  ];

  return {
    title: `${project.name} | Projects | Akshat Kumar Mishra`,
    description: project.tagline || project.overview.substring(0, 155),
    keywords: flattenedTechStack,
    openGraph: {
      title: `${project.name} | Projects | Akshat Kumar Mishra`,
      description: project.tagline || project.overview.substring(0, 155),
      type: 'article',
      url: `https://akshatmishra.dev/projects/${slug}`,
      siteName: 'Akshat Kumar Mishra Portfolio',
      images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: project.name }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Projects | Akshat Kumar Mishra`,
      description: project.tagline || project.overview.substring(0, 155),
      images: ['/images/og-default.jpg']
    },
    alternates: {
      canonical: `https://akshatmishra.dev/projects/${slug}`
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const flattenedTechStack = [
    ...(project.techStack.frontend || []),
    ...(project.techStack.backend || []),
    ...(project.techStack.database || []),
    ...(project.techStack.devopsAndTools || []),
    ...(project.techStack.other || []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.name,
    "description": project.overview,
    "dateCreated": project.startDate,
    "keywords": flattenedTechStack.join(', '),
    "author": {
      "@type": "Person",
      "name": "Akshat Kumar Mishra"
    }
  };

  return (
    <main className="pt-24 pb-24">
      <Script id={`json-ld-project-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Section 1: Hero */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 md:pt-32 pb-24 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="font-display-lg text-[40px] leading-[48px] md:text-[64px] md:leading-[72px] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold tracking-[-0.02em] font-[family-name:var(--font-headline)]">
            {project.name}
          </h1>
          <p className="font-body-lg text-lg leading-[28px] text-muted-foreground max-w-2xl">
            {project.tagline || project.overview}
          </p>
          <div className="pt-4 flex gap-4 justify-center md:justify-start">
            <a 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-lg transition-transform hover:scale-[0.98] inline-flex items-center gap-2 shadow-md" 
              href="#details"
            >
              View Details
              <ArrowDown className="text-sm font-semibold" size={16} strokeWidth={2.5} />
            </a>
            {project.link && (
               <a 
                 href={project.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-transparent border border-border hover:bg-muted text-foreground font-medium px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
               >
                 Live App
                 <ExternalLink className="text-sm font-semibold" size={16} strokeWidth={2.5} />
               </a>
            )}
          </div>
        </div>
        
        {/* Placeholder for project image */}
        <div className="flex-1 w-full max-w-xl mx-auto md:max-w-none relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full -z-10"></div>
          <div className="glass rounded-xl p-2 relative overflow-hidden aspect-[4/3] shadow-card">
            <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center border border-border/50">
              <span className="text-muted-foreground/50 font-mono text-sm tracking-widest uppercase">Project Visualization</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Metadata */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24" id="details">
        <div className="glass rounded-xl py-6 px-8 flex flex-wrap gap-8 justify-between items-center border border-border">
          <div className="space-y-1">
            <p className="text-[12px] leading-[16px] tracking-[0.05em] text-muted-foreground uppercase font-semibold font-mono">Type</p>
            <p className="text-base font-medium text-foreground">{project.type === 'professional' ? 'Professional' : 'Personal'}</p>
          </div>
          <div className="w-px h-10 bg-border hidden md:block"></div>
          
          <div className="space-y-1">
            <p className="text-[12px] leading-[16px] tracking-[0.05em] text-muted-foreground uppercase font-semibold font-mono">Timeline</p>
            <p className="text-base font-medium text-foreground">{project.startDate} — {project.endDate || 'Present'}</p>
          </div>
          
          <div className="w-px h-10 bg-border hidden md:block"></div>
          
          <div className="space-y-1">
            <p className="text-[12px] leading-[16px] tracking-[0.05em] text-muted-foreground uppercase font-semibold font-mono">Stack Highlights</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {flattenedTechStack.slice(0, 4).map(tech => (
                <span key={tech} className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-mono text-[14px]">
                  {tech}
                </span>
              ))}
              {flattenedTechStack.length > 4 && (
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full font-mono text-[14px]">
                  +{flattenedTechStack.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Overview & Metrics */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h2 className="text-[32px] leading-[40px] font-semibold text-heading tracking-[-0.01em] font-[family-name:var(--font-headline)]">Overview</h2>
          <p className="text-base leading-[24px] text-muted-foreground">
            {project.overview}
          </p>
        </div>
        
        {project.impactMetrics && project.impactMetrics.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-[32px] leading-[40px] font-semibold text-heading tracking-[-0.01em] font-[family-name:var(--font-headline)]">Key Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              {project.impactMetrics.map((metric: ImpactMetric, idx: number) => {
                const colors = ['text-primary', 'text-secondary', 'text-tertiary', 'text-primary-container'];
                const colorClass = colors[idx % colors.length];
                
                return (
                  <div key={idx} className="glass p-6 rounded-xl border border-border transition-all duration-300">
                    <p className={`text-[32px] leading-[40px] font-semibold tracking-[-0.01em] ${colorClass} font-[family-name:var(--font-headline)]`}>{metric.value}</p>
                    <p className="text-[12px] leading-[16px] tracking-[0.05em] text-muted-foreground mt-2 font-mono uppercase font-semibold">{metric.metric}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Section 4: Key Features */}
      {project.features && project.features.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 pb-24">
          <h2 className="text-[32px] leading-[40px] font-semibold text-heading tracking-[-0.01em] mb-12 text-center font-[family-name:var(--font-headline)]">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.features.map((feature: string, idx: number) => (
              <div key={idx} className="glass p-8 rounded-xl border border-border hover:border-primary/50 transition-colors duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <CheckCircle2 className="text-primary" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg leading-[28px] font-semibold text-heading mb-3">Feature {idx + 1}</h3>
                <p className="text-base leading-[24px] text-muted-foreground">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Full Tech Stack */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <h2 className="text-[32px] leading-[40px] font-semibold text-heading tracking-[-0.01em] mb-8 text-center font-[family-name:var(--font-headline)]">Full Technology Stack</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {Object.entries(project.techStack).map(([category, techs]) => {
            const techList = techs as string[];
            if (!Array.isArray(techList) || techList.length === 0) return null;
            return (
              <div key={category} className="glass p-6 rounded-xl border border-border">
                <h3 className="font-semibold mb-4 capitalize text-heading">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 bg-muted text-muted-foreground text-[14px] font-mono rounded-md border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
