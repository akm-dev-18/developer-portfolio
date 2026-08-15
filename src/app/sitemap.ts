import { MetadataRoute } from 'next';
import { getSitemapData } from '@/data/db';
import { SitemapEntry } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://akshatmishra.dev';
  
  const staticRoutes = [
    '',
    '/experience',
    '/education',
    '/skills',
    '/projects',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const dynamicProjects = await getSitemapData();
  const projectRoutes = dynamicProjects.map((project: SitemapEntry) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
