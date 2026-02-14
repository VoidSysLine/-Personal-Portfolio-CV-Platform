# Personal Portfolio & CV Platform

A professional, dynamic portfolio and CV website built with React, TypeScript, and Vite. Data-driven architecture — all content is managed via JSON files and Markdown.

## Tech Stack

- **React 18+** with **TypeScript** (strict mode)
- **Vite** (build tool)
- **Tailwind CSS v4** with custom design tokens
- **React Router v6** (client-side routing)
- **Framer Motion** (animations)
- **react-hook-form** + **Zod** (form validation)
- **react-markdown** + **remark-gfm** + **rehype-highlight** (blog rendering)
- **react-to-print** (CV print/export)
- **Lucide React** (icons)

## Getting Started

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Project Structure

```
src/
├── app/          # App shell: Router, Providers, Layout
├── layouts/      # MainLayout, PageLayout
├── features/     # Feature modules (one page = one feature)
├── components/   # Shared UI components
├── hooks/        # Global custom hooks
├── lib/          # Utilities, helpers, services
├── types/        # Global TypeScript types
├── styles/       # CSS (Tailwind, design tokens)
├── data/         # ALL content (Single Source of Truth)
└── assets/       # Images, documents, PDFs
```

## Pages

| Page          | Route            | Description                              |
|---------------|------------------|------------------------------------------|
| Profile       | `/`              | Hero, stats, bio, skills                 |
| Career        | `/career`        | Vertical timeline with company favicons  |
| Education     | `/education`     | Academic timeline                        |
| Projects      | `/projects`      | Filterable project grid                  |
| Certificates  | `/certificates`  | Category-filtered certificate cards      |
| Blog          | `/blog`          | Markdown-rendered articles               |
| Testimonials  | `/testimonials`  | Reference/testimonial cards              |
| Contact       | `/contact`       | Contact form with validation             |
| Print View    | `/print`         | A4-optimized printable CV                |
| Imprint       | `/imprint`       | Legal notice                             |
| Privacy       | `/privacy`       | Privacy policy                           |

## Adding Content

All content lives in `src/data/`. No code changes needed:

- **New career entry** → add to `career.json`
- **New certificate** → add PDF + entry in `certificates.json`
- **New project** → add thumbnail + entry in `projects.json`
- **New blog post** → add `.md` file + entry in `blog.json`

## Internationalization

Bilingual (DE/EN). UI translations in `src/data/i18n/`. Content fields are localized in each JSON file.

## Theming

Light/Dark mode with system preference detection. Design tokens defined in `src/styles/theme.css`.
