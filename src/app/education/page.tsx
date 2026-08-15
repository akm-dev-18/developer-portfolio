import { Metadata } from 'next';
import { getEducation } from '@/data/db';
import { Education } from '@/types';
import { Badge } from '@/components/ui/badge';
import { GraduationCap } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Education | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
  description: 'Educational background and academic history of Akshat Kumar Mishra.',
  keywords: ['Education', 'Degree', 'University', 'B.Tech', 'Computer Science', 'Akshat Kumar Mishra'],
  openGraph: {
    title: 'Education | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Educational background and academic history of Akshat Kumar Mishra.',
    type: 'website',
    url: 'https://akshatmishra.dev/education',
    siteName: 'Akshat Kumar Mishra Portfolio',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Akshat Kumar Mishra Portfolio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Educational background and academic history of Akshat Kumar Mishra.',
    images: ['/images/og-default.jpg']
  },
  alternates: {
    canonical: 'https://akshatmishra.dev/education'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default async function EducationPage() {
  const educationList = await getEducation();

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-6 w-full max-w-[1200px] mx-auto relative z-10 min-h-screen">
      <div className="mb-16 md:mb-24 text-center md:text-left">
        <h1 className="text-4xl md:text-[64px] leading-tight font-bold font-[family-name:var(--font-headline)] text-heading mb-4 tracking-tight">Academic Ledger.</h1>
        <p className="text-lg md:text-[18px] text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
          A chronological record of formal engineering education, highlighting theoretical foundations and practical application milestones.
        </p>
      </div>
      
      <div className="relative max-w-4xl mx-auto md:mx-0">
        {/* Timeline Line */}
        <div className="absolute left-[15px] md:left-[39px] top-0 bottom-0 w-px bg-border"></div>
        
        {educationList.map((edu: Education, index: number) => {
          const period = `${edu.startDate} - ${edu.endDate}`;
          const isLatest = index === 0;
          
          return (
            <div key={index} className={`relative pl-12 md:pl-24 mb-16 last:mb-0 group`}>
              {/* Timeline Dot */}
              <div className={`absolute left-0 md:left-6 top-1.5 w-8 h-8 rounded-full bg-background border-2 flex items-center justify-center z-10 transition-transform ${isLatest ? 'border-primary shadow-[0_0_15px_rgba(var(--color-primary),0.2)] group-hover:scale-110' : 'border-border group-hover:border-primary'}`}>
                <div className={`w-2 h-2 rounded-full ${isLatest ? 'bg-primary' : 'bg-border group-hover:bg-primary transition-colors'}`}></div>
              </div>
              
              <div className={`glass border border-border rounded-xl p-6 md:p-8 hover:shadow-[0_10px_40px_rgba(var(--color-primary),0.05)] transition-all duration-300 ${!isLatest ? 'opacity-90' : ''}`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <div className={`inline-block px-3 py-1 rounded-full mb-3 font-mono text-xs font-semibold tracking-wide ${isLatest ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-muted text-muted-foreground border border-border'}`}>
                      {period}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-headline)] text-heading mb-2">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground font-medium">
                      <span>🎓</span>
                      <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                    </div>
                  </div>
                  {edu.cgpa && (
                    <div className="mt-2 md:mt-0 text-left md:text-right">
                      <span className={`inline-block px-3 py-1 font-mono text-xs uppercase tracking-widest rounded-full border ${isLatest ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-heading border-border'}`}>
                        {edu.cgpa.includes('%') || edu.cgpa.toLowerCase().includes('score') ? edu.cgpa : `CGPA: ${edu.cgpa}`}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-border pt-6 mt-6">
                  <h4 className="font-mono text-xs font-semibold text-muted-foreground mb-4 tracking-widest uppercase">
                    {isLatest ? 'Key Coursework' : 'Focus Areas'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(isLatest 
                      ? ['Data Structures', 'Algorithms', 'Operating Systems', 'Database Management', 'Computer Networks']
                      : ['Physics', 'Mathematics', 'Chemistry', 'Computer Science']
                    ).map(course => (
                      <span key={course} className="px-3 py-1.5 bg-muted text-heading font-mono text-xs font-medium tracking-wide rounded-md border border-border">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
