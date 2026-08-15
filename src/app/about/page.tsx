import { Metadata } from 'next';
import AboutContent from './AboutContent';
import { getProfile } from '@/data/db';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About | Akshat Kumar Mishra — Senior Full-Stack Developer',
  description: 'Learn more about Akshat Kumar Mishra and his engineering excellence.',
  keywords: ['About', 'Profile', 'Software Engineer', 'Full-Stack Developer', 'Akshat Kumar Mishra'],
  openGraph: {
    title: 'About | Akshat Kumar Mishra — Senior Full-Stack Developer',
    description: 'Learn more about Akshat Kumar Mishra and his engineering excellence.',
    type: 'website',
    url: 'https://akshatmishra.dev/about',
    siteName: 'Akshat Kumar Mishra Portfolio',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Akshat Kumar Mishra Portfolio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Akshat Kumar Mishra — Senior Full-Stack Developer',
    description: 'Learn more about Akshat Kumar Mishra and his engineering excellence.',
    images: ['/images/og-default.jpg']
  },
  alternates: {
    canonical: 'https://akshatmishra.dev/about'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <main className="min-h-screen pt-16">
      <AboutContent profile={profile} />
    </main>
  );
}
