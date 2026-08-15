# Akshat Kumar Mishra Portfolio

A modern, high-performance, and dynamic portfolio built with Next.js 15, Supabase, Tailwind CSS, and Framer Motion. This project is designed to be highly reusable, modular, and easy to customize for any developer looking to create a premium online presence. 

The application's visual architecture and features were built based on design wireframes developed on **Google Stitch**, and seamlessly brought to life utilizing the **Antigravity IDE** integration.

## 🚀 Features

- **Next.js 15 App Router**: Leveraging the latest Next.js features for optimized server-side rendering, static site generation, and seamless client-side navigation.
- **Dynamic Content with Supabase**: Fully integrated with a Supabase PostgreSQL database for dynamic data fetching. Manages projects, experience, education, skills, and handles secure contact form submissions.
- **Stunning UI & Aesthetics**: Built with a "Precision Engineering Light" theme (alongside dark mode support), focusing on high contrast, readability, and modern glassmorphism effects.
- **Component Library**: Utilizes **Shadcn UI** for standardized, accessible, and easily customizable UI components (buttons, dialogs, form elements).
- **Smooth Animations**: Incorporates **Framer Motion** for micro-interactions, page transitions, and a dynamic marquee banner in the hero section.
- **Contact Form & Notifications**: Server-side secured contact API route with global toast notifications using **Sonner**.
- **SEO Optimized**: Includes dynamic sitemap generation, `robots.txt`, custom 404 page, and comprehensive metadata management.
- **Fully Responsive**: Carefully crafted to look perfect on mobile, tablet, and desktop devices.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Database & Backend**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Package Manager**: [Yarn](https://yarnpkg.com/)

## 📂 Project Structure

```text
akshat-portfolio/
├── src/
│   ├── app/            # Next.js App Router (Pages, API routes, Layouts)
│   ├── components/     # Reusable UI components (Shadcn, custom components)
│   ├── data/           # Static data fallbacks and mock data
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and Supabase client config
│   └── types/          # TypeScript definitions
├── public/             # Static assets (images, fonts, favicon)
├── .env.example        # Example environment variables
├── package.json        # Project dependencies and scripts
└── next.config.ts      # Next.js configuration
```

## ♻️ Reusability & Customization

This portfolio is built with reusability at its core. If you want to use this template for your own portfolio:

1. **Supabase Integration**: The project abstracts data fetching into robust API routes. You can easily connect your own Supabase instance by running the migration scripts (if provided) to set up the `portfolio_content` table, or swap it out with a CMS of your choice by updating the endpoints in `src/app/api/`.
2. **Shadcn UI Modular Components**: All UI elements are located in `src/components/ui/`. You can modify their styles globally or replace them without breaking the layout.
3. **Theming**: Colors, typography, and spacing are controlled via CSS variables in the global stylesheet (`src/app/globals.css` or equivalent) and Tailwind config. Switching the primary colors will instantly reflect across the entire application.
4. **Environment Variables**: Social links, contact emails, and sensitive keys are managed via environment variables to ensure no hardcoded personal info is leaked.

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn package manager
- A Supabase account (for database and contact form backend)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd akshat-portfolio
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file and fill in your Supabase credentials and social links.
   ```bash
   cp .env.example .env.local
   ```
   *Make sure to add your `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and any required admin service roles.*

4. **Run the Development Server:**
   ```bash
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

To create an optimized production build:
```bash
yarn build
```

To start the production server:
```bash
yarn start
```

## 📄 License

The underlying source code of this project is open-source and available under the [MIT License](LICENSE).

**Design & Content Authorship:**
The visual design, UI/UX layout, aesthetic choices, and personal content (text, images, and project details) are the original work and intellectual property of **Akshat Kumar Mishra**. 

- No entity or individual may falsely claim ownership or authorship of this specific design and aesthetic layout.
- If you intend to use this repository as a template for your own portfolio, you are highly encouraged to modify the colors, typography, and layout significantly to reflect your own unique brand and prevent exact visual duplication.
