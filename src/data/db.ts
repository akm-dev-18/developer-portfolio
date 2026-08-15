import {
  Education,
  ExperienceData,
  PortfolioData,
  ProfileData,
  ProjectDetail,
  ProjectIndex,
  SitemapEntry,
  Testimonial,
} from "@/types";
import { supabaseAdmin } from "@/lib/supabase-admin";
import fs from "fs/promises";
import path from "path";
import { cache } from "react";

const dataDir = path.join(process.cwd(), "src", "data");

/* ─── helpers ──────────────────────────────────────────── */

/**
 * Fetch a section from Supabase `portfolio_content`.
 * Falls back to the local JSON file when Supabase is unavailable
 * or the env vars are not set (e.g. local dev without Supabase).
 */
async function fetchSection<T>(
  section: string,
  fallbackFile: string,
): Promise<T> {
  // If Supabase env vars aren't set, skip network call
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      const { data, error } = await supabaseAdmin
        .from("portfolio_content")
        .select("content")
        .eq("section", section)
        .eq("is_public", true)
        .single();

      if (!error && data?.content) {
        return data.content as T;
      }
      // If Supabase returned an error, fall through to local file
      console.warn(
        `[db] Supabase fetch for "${section}" failed, falling back to local file.`,
      );
    } catch {
      console.warn(
        `[db] Supabase unreachable for "${section}", falling back to local file.`,
      );
    }
  }

  // Fallback: read from local JSON
  const filePath = path.join(dataDir, fallbackFile);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as T;
}

/* ─── public API (unchanged signatures) ────────────────── */

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  return fetchSection<PortfolioData>(
    "portfolio",
    "portfolio-data.json",
  );
});

export const getProjectsData = cache(async (): Promise<ProjectDetail[]> => {
  return fetchSection<ProjectDetail[]>("projects", "projects-data.json");
});

export async function getProfile(): Promise<ProfileData> {
  const data = await getPortfolioData();
  return {
    personalInfo: data.personalInfo,
    technicalSkills: data.technicalSkills,
  };
}

export async function getExperience(): Promise<ExperienceData> {
  const data = await getPortfolioData();
  return {
    experience: data.experience,
    internships: data.internships,
  };
}

export async function getEducation(): Promise<Education[]> {
  const data = await getPortfolioData();
  return data.education;
}

export async function getProjectsIndex(
  category?: string | null,
  type?: string | null,
): Promise<ProjectIndex[]> {
  const data = await getPortfolioData();
  let projects: ProjectIndex[] = data.projectsIndex;

  if (type) {
    projects = projects.filter((p) => p.type === type);
  }

  // To filter by category we need to look into projects-data.json as it has the categories
  if (category) {
    const fullProjects = await getProjectsData();
    const validSlugs = fullProjects
      .filter((p) => p.categories?.includes(category))
      .map((p) => p.slug);
    projects = projects.filter((p) => validSlugs.includes(p.slug));
  }

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const fullProjects = await getProjectsData();
  return fullProjects.find((p) => p.slug === slug) || null;
}

export async function getSitemapData(): Promise<SitemapEntry[]> {
  const projects = await getProjectsData();
  // We don't have lastModified in the data, so we'll use a static date or current date for now
  return projects.map((p) => ({
    slug: p.slug,
    lastModified: new Date().toISOString(),
  }));
}

/**
 * Return portfolio data with phone numbers stripped out.
 * Use this for any public-facing API endpoint.
 */
export async function getPublicPortfolioData(): Promise<Omit<PortfolioData, "personalInfo"> & { personalInfo: Omit<PortfolioData["personalInfo"], "phoneNumbers"> }> {
  const data = await getPortfolioData();

  // Deep clone to avoid mutating cached data
  const publicData = JSON.parse(JSON.stringify(data)) as PortfolioData;

  // Strip phone numbers from public responses
  if (publicData.personalInfo) {
    delete (publicData.personalInfo as Partial<PortfolioData["personalInfo"]>).phoneNumbers;
  }

  return publicData as Omit<PortfolioData, "personalInfo"> & { personalInfo: Omit<PortfolioData["personalInfo"], "phoneNumbers"> };
}
