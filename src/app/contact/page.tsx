import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Contact | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
  description: 'Get in touch with Akshat Kumar Mishra for freelance opportunities or full-time roles.',
  keywords: ['Contact', 'Hire', 'Email', 'LinkedIn', 'Akshat Kumar Mishra'],
  openGraph: {
    title: 'Contact | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Get in touch with Akshat Kumar Mishra.',
    type: 'website',
    url: 'https://akshatmishra.dev/contact',
    siteName: 'Akshat Kumar Mishra Portfolio',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Akshat Kumar Mishra Portfolio' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Akshat Kumar Mishra \u2014 Senior Full-Stack Developer',
    description: 'Get in touch with Akshat Kumar Mishra.',
    images: ['/images/og-default.jpg']
  },
  alternates: {
    canonical: 'https://akshatmishra.dev/contact'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function ContactPage() {
  redirect('/#contact');
}
