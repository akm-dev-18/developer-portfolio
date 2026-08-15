import { Metadata } from 'next';
import { getProfile } from '@/data/db';
import Skills from '@/components/sections/Skills';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Skills | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
  description: 'Technical skills and expertise of Akshat Kumar Mishra, covering Frontend, Backend, Databases, and Cloud technologies.',
  keywords: ['Skills', 'Technologies', 'React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'PostgreSQL', 'Akshat Kumar Mishra'],
  openGraph: {
    title: 'Skills | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Technical skills and expertise of Akshat Kumar Mishra.',
    type: 'website',
    url: 'https://akshatmishra.dev/skills',
    siteName: 'Akshat Kumar Mishra Portfolio',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Akshat Kumar Mishra Portfolio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Technical skills and expertise of Akshat Kumar Mishra.',
    images: ['/images/og-default.jpg']
  },
  alternates: {
    canonical: 'https://akshatmishra.dev/skills'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default async function SkillsPage() {
  const profile = await getProfile();
  const { technicalSkills } = profile;

  const getProficiency = (skill: string) => {
    const expert = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'AWS', 'PostgreSQL'];
    const advanced = ['MongoDB', 'Python', 'Django', 'GraphQL', 'Docker', 'Kubernetes'];
    
    if (expert.some(e => skill.includes(e))) return { level: 'Expert', width: '95%', isCore: true };
    if (advanced.some(e => skill.includes(e))) return { level: 'Advanced', width: '85%', isCore: true };
    return { level: 'Proficient', width: '70%', isCore: false };
  };

  const renderSkillBar = (skill: string) => {
    const { level, width, isCore } = getProficiency(skill);
    return (
      <div key={skill} className="mb-6 last:mb-0">
        <div className="flex justify-between items-end mb-2">
          <span className="font-mono text-sm text-heading font-semibold">{skill}</span>
          <span className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">{level}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${isCore ? 'bg-primary' : 'bg-outline-variant'}`} 
            style={{ width }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <main className="flex-grow pt-[120px] pb-24 px-6 md:px-6 max-w-[1200px] mx-auto w-full relative z-10 min-h-screen">
      <div className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-[64px] leading-tight font-bold font-[family-name:var(--font-headline)] text-heading mb-4 tracking-tight">
            Technical Arsenal
          </h1>
          <p className="text-lg md:text-[18px] text-muted-foreground max-w-2xl leading-relaxed mx-auto md:mx-0">
            An overview of the technologies, frameworks, and infrastructure tools I utilize to engineer scalable, high-performance software systems.
          </p>
        </div>
        
        <div className="flex justify-center md:justify-end gap-4">
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="font-mono text-xs font-semibold tracking-wide uppercase text-heading">Core Stack</span>
          </div>
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
            <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
            <span className="font-mono text-xs font-semibold tracking-wide uppercase text-heading">Familiar</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Frontend Card */}
        <div className="glass border border-border rounded-[16px] p-6 md:p-8 hover:shadow-[0_10px_40px_rgba(var(--color-primary),0.05)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
            <span className="text-primary text-2xl">💻</span>
            <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-heading">Frontend</h2>
          </div>
          <div>
            {(technicalSkills.frontend || []).map(renderSkillBar)}
          </div>
        </div>

        {/* Backend Card */}
        <div className="glass border border-border rounded-[16px] p-6 md:p-8 hover:shadow-[0_10px_40px_rgba(var(--color-primary),0.05)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
            <span className="text-primary text-2xl">🗄️</span>
            <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-heading">Backend &amp; DB</h2>
          </div>
          <div>
            {[...(technicalSkills.backend || []), ...(technicalSkills.databases || [])].map(renderSkillBar)}
          </div>
        </div>

        {/* DevOps & Cloud Card */}
        <div className="glass border border-border rounded-[16px] p-6 md:p-8 hover:shadow-[0_10px_40px_rgba(var(--color-primary),0.05)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
            <span className="text-primary text-2xl">☁️</span>
            <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-heading">DevOps &amp; Cloud</h2>
          </div>
          <div>
            {(technicalSkills.cloudAndDevOps || []).map(renderSkillBar)}
          </div>
        </div>

        {/* Architecture & Ecosystem Card */}
        <div className="glass border border-border border-t-4 border-t-primary rounded-[16px] p-6 md:p-8 hover:shadow-[0_10px_40px_rgba(var(--color-primary),0.05)] transition-all duration-300">
          <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
            <span className="text-primary text-2xl">🏗️</span>
            <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-heading">Architecture &amp; Ecosystem</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {[...(technicalSkills.practices || []), ...(technicalSkills.languages || [])].map(skill => (
              <span key={skill} className="font-mono text-sm tracking-wide bg-muted text-muted-foreground px-3 py-1.5 rounded-full border border-border">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
