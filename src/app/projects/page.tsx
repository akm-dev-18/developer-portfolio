import { Metadata } from 'next';
import { getProjectsIndex } from '@/data/db';
import Projects from '@/components/sections/Projects';
import Link from 'next/link';
import { ProjectIndex } from '@/types';
import { ArrowUpRight } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Projects | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
  description: 'Explore the portfolio of case studies and personal projects built by Akshat Kumar Mishra.',
  keywords: ['Projects', 'Portfolio', 'Case Studies', 'Akshat Kumar Mishra', 'Web Applications', 'Development'],
  openGraph: {
    title: 'Projects | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Explore the portfolio of case studies and personal projects.',
    type: 'website',
    url: 'https://akshatmishra.dev/projects',
    siteName: 'Akshat Kumar Mishra Portfolio',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Akshat Kumar Mishra Portfolio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Explore the portfolio of case studies and personal projects.',
    images: ['/images/og-default.jpg']
  },
  alternates: {
    canonical: 'https://akshatmishra.dev/projects'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const type = typeof params.type === 'string' ? params.type : undefined;
  
  const projects = await getProjectsIndex(category, type);

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-6 max-w-[1200px] mx-auto w-full relative z-10 min-h-screen">
      <header className="mb-24 text-center md:text-left">
        <h1 className="text-4xl md:text-[64px] leading-tight font-bold font-[family-name:var(--font-headline)] text-heading mb-4 tracking-tight">
          Projects Archive
        </h1>
        <p className="text-lg md:text-[18px] text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
          A comprehensive index of engineering systems, architectural explorations, and technical documentation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => {
          const isFeatured = i === 0;
          const isWide = isFeatured || (i === 3); // Emulating the stitch layout (1st and 4th are wide)
          
          return (
            <article
              key={project.slug}
              className={`glass border border-border rounded-[16px] p-6 lg:p-8 relative overflow-hidden group hover:shadow-[0_10px_40px_rgba(var(--color-primary),0.05)] transition-all duration-300 flex flex-col h-full ${
                isWide ? 'lg:col-span-2' : ''
              }`}
            >
              {isFeatured && (
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-primary to-secondary"></div>
              )}
              
              <div className={`flex flex-col h-full justify-between gap-6 ${isWide ? 'lg:flex-row lg:items-end' : ''}`}>
                <div className={isWide ? 'lg:max-w-[70%]' : ''}>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className={`font-[family-name:var(--font-headline)] font-bold text-heading ${isFeatured ? 'text-3xl' : 'text-2xl'} ${isWide ? 'pr-12' : ''}`}>
                      {project.name}
                    </h2>
                    {isFeatured && (
                      <span className="text-primary group-hover:rotate-45 transition-transform flex items-center justify-center absolute top-6 right-6 lg:top-8 lg:right-8">
                        <ArrowUpRight size={28} strokeWidth={1.5} />
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-base text-muted-foreground leading-relaxed text-justify ${isWide ? 'mb-8' : 'mb-6'}`}>
                    {project.tagline}
                  </p>
                  
                  <div className={`flex flex-wrap gap-2 ${isWide ? 'mb-2' : 'mb-6'}`}>
                    {(project.techStack || []).slice(0, 4).map((tag: string) => (
                      <span key={tag} className="font-mono text-xs font-semibold tracking-wide bg-muted text-muted-foreground px-3 py-1.5 rounded-full border border-border">
                        [{tag}]
                      </span>
                    ))}
                    {(project.techStack || []).length > 4 && (
                      <span className="font-mono text-xs font-semibold tracking-wide bg-muted text-muted-foreground px-3 py-1.5 rounded-full border border-border">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                
                <Link
                  href={`/projects/${project.slug}`}
                  className={`w-fit flex items-center gap-2 border border-border text-heading px-4 py-2 rounded-lg hover:bg-muted transition-colors font-mono text-xs font-semibold uppercase tracking-wide ${!isWide ? 'mt-auto' : 'shrink-0 mb-2'}`}
                >
                  View System
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
