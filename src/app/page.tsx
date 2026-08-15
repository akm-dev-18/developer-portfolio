import { Metadata } from 'next';
import { getProfile, getExperience, getProjectsIndex, getPortfolioData } from '@/data/db';
import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Home | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
  description: 'Portfolio of Akshat Kumar Mishra, a Senior Full-Stack Developer with 4+ years of experience designing, building and deploying scalable web applications.',
  keywords: ['Akshat Kumar Mishra', 'Senior Full-Stack Developer', 'MERN', 'MEAN', 'Django', 'React', 'Node.js', 'AWS', 'JavaScript', 'TypeScript'],
  openGraph: {
    title: 'Home | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Portfolio of Akshat Kumar Mishra, a Senior Full-Stack Developer.',
    type: 'profile',
    url: 'https://akshatmishra.dev',
    siteName: 'Akshat Kumar Mishra Portfolio',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Akshat Kumar Mishra Portfolio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Portfolio of Akshat Kumar Mishra, a Senior Full-Stack Developer.',
    images: ['/images/og-default.jpg']
  },
  alternates: {
    canonical: 'https://akshatmishra.dev'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default async function Home() {
  const profile = await getProfile();
  const experienceData = await getExperience();
  const projectsData = await getProjectsIndex();
  const fullData = await getPortfolioData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.personalInfo.fullName,
    "jobTitle": profile.personalInfo.title,
    "url": "https://akshatmishra.dev",
    "sameAs": [
      profile.personalInfo.linkedin || "https://linkedin.com/in/TODO"
    ],
    "knowsAbout": profile.technicalSkills.languages.concat(profile.technicalSkills.frontend, profile.technicalSkills.backend)
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Experience experience={experienceData} />
      <Skills skills={profile.technicalSkills} />
      <Projects projects={projectsData} />
      <Testimonials testimonials={fullData.testimonials || []} />
    </main>
  );
}
