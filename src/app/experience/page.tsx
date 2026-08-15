import { Metadata } from 'next';
import { getExperience } from '@/data/db';
import Experience from '@/components/sections/Experience';
import { Experience as ExperienceType } from '@/types';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Experience | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
  description: 'Professional work history and internships of Akshat Kumar Mishra, Senior Full-Stack Developer.',
  keywords: ['Experience', 'Work History', 'Career', 'Akshat Kumar Mishra', 'Senior Full-Stack Developer', 'Developer Roles'],
  openGraph: {
    title: 'Experience | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Professional work history and internships of Akshat Kumar Mishra.',
    type: 'website',
    url: 'https://akshatmishra.dev/experience',
    siteName: 'Akshat Kumar Mishra Portfolio',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Akshat Kumar Mishra Portfolio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Professional work history and internships of Akshat Kumar Mishra.',
    images: ['/images/og-default.jpg']
  },
  alternates: {
    canonical: 'https://akshatmishra.dev/experience'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default async function ExperiencePage() {
  const data = await getExperience();
  const allExperience = [...(data?.experience || []), ...(data?.internships || [])];

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-6 max-w-[1200px] mx-auto w-full relative z-10 min-h-screen">
      <header className="mb-24 text-center md:text-left">
        <h1 className="text-4xl md:text-[64px] leading-tight font-bold font-[family-name:var(--font-headline)] text-heading mb-4 tracking-tight">
          Professional Experience
        </h1>
        <p className="text-lg md:text-[18px] text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
          A detailed timeline of engineering roles, focusing on system architecture, performance optimization, and scalable solutions.
        </p>
      </header>

      <div className="relative border-l border-border ml-4 md:ml-[150px] space-y-12">
        {allExperience.map((exp: ExperienceType, i: number) => {
          const current = exp.endDate === "Present";
          const period = `${exp.startDate} - ${exp.endDate}`;
          return (
            <div key={`${exp.company}-${exp.role}`} className="relative pl-8 md:pl-12 group">
              <div className={`absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full transition-all duration-300 ${
                current 
                  ? 'bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.5)] scale-125' 
                  : 'bg-border group-hover:bg-primary'
              }`}></div>
              
              <div className="md:absolute md:-left-[175px] md:top-1 font-mono text-xs font-semibold text-muted-foreground mb-2 md:mb-0 tracking-widest uppercase">
                {period}
              </div>
              
              <div className="glass border border-border rounded-[16px] p-6 lg:p-8 hover:shadow-[0_10px_40px_rgba(var(--color-primary),0.05)] transition-all duration-300">
                <h3 className="font-[family-name:var(--font-headline)] text-2xl md:text-3xl font-bold text-heading mb-1">
                  {exp.role}
                </h3>
                
                <div className="font-mono text-xs font-semibold tracking-wide text-primary mb-6 flex items-center gap-2 uppercase">
                  <span>🏢</span> {exp.company} {exp.location ? `• ${exp.location}` : ''}
                </div>
                
                <ul className="space-y-4 text-base text-muted-foreground leading-relaxed mb-6">
                  {exp.highlights?.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1 flex-shrink-0">▹</span>
                      <span className="text-justify">{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                {exp.projectSlugs && exp.projectSlugs.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.projectSlugs.map((tag: string) => (
                      <span key={tag} className="font-mono text-xs font-semibold tracking-wide bg-muted text-muted-foreground px-3 py-1.5 rounded-full border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
