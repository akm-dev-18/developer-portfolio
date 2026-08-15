/* ─── Personal & Profile ──────────────────────────────── */

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phoneNumbers: string[];
  linkedin: string | null;
  location: string;
  summary: string;
  avatarUrl?: string;
}

export interface TechnicalSkills {
  [key: string]: string[];
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  authenticationAndSecurity: string[];
  storageAndIntegrations: string[];
  dataVisualizationAndReporting: string[];
  testing: string[];
  cloudAndDevOps: string[];
  practices: string[];
}

export interface ProfileData {
  personalInfo: PersonalInfo;
  technicalSkills: TechnicalSkills;
}

/* ─── Experience ──────────────────────────────────────── */

export interface Experience {
  company: string | null;
  location: string | null;
  role: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  projectSlugs?: string[];
  type?: "professional" | "internship";
}

export interface ExperienceData {
  experience: Experience[];
  internships: Experience[];
}

/* ─── Education ───────────────────────────────────────── */

export interface Education {
  institution: string;
  location: string;
  degree: string;
  cgpa?: string;
  startDate: string;
  endDate: string;
}

/* ─── Projects ────────────────────────────────────────── */

export interface ProjectIndex {
  slug: string;
  name: string;
  tagline: string;
  techStack: string[];
  duration: string;
  company: string | null;
  type: "professional" | "personal";
  gradient?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface DetailedTechStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  devopsAndTools?: string[];
  other?: string[];
}

export interface ImpactMetric {
  metric: string;
  value: string;
}

export interface ProjectDetail {
  link: any;
  slug: string;
  name: string;
  type: "professional" | "personal";
  company: string | null;
  role: string | null;
  startDate: string;
  endDate: string;
  tagline: string;
  overview: string;
  techStack: DetailedTechStack;
  features: string[];
  impactMetrics: ImpactMetric[];
  categories: string[];
}

/* ─── Testimonials ────────────────────────────────────── */

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

/* ─── Sitemap ─────────────────────────────────────────── */

export interface SitemapEntry {
  slug: string;
  lastModified: string;
}

/* ─── Portfolio (top-level shape returned by Supabase) ── */

export interface PortfolioData {
  personalInfo: PersonalInfo;
  technicalSkills: TechnicalSkills;
  experience: Experience[];
  internships: Experience[];
  education: Education[];
  projectsIndex: ProjectIndex[];
  testimonials: Testimonial[];
}
