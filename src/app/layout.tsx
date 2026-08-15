import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/Contact";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Akshat Kumar Mishra | Senior Full-Stack Developer",
  description:
    "Portfolio of Akshat Kumar Mishra — Senior Full-Stack Developer specializing in React, Node.js, and cloud infrastructure. Architecting high-performance digital solutions.",
  keywords: [
    "Akshat Kumar Mishra",
    "Full-Stack Developer",
    "React Developer",
    "Node.js",
    "Portfolio",
    "Web Developer",
    "MERN Stack",
  ],
  authors: [{ name: "Akshat Kumar Mishra" }],
  openGraph: {
    title: "Akshat Kumar Mishra | Senior Full-Stack Developer",
    description:
      "Building scalable web applications end-to-end. Specializing in React, Node.js, and cloud infrastructure.",
    type: "website",
  },
  icons: {
    icon: "/portfolio_logo_dark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className="absolute inset-0 z-[-1] opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--glass-border) 1px, transparent 1px), linear-gradient(to bottom, var(--glass-border) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
          <TooltipProvider>
            <Navbar />
            {children}
            <Contact />
            <Footer />
          </TooltipProvider>
          <Toaster position="top-right" duration={3000} closeButton richColors   />
        </ThemeProvider>
      </body>
    </html>
  );
}
