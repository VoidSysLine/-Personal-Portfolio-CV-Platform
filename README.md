# PROMPT.md — Personal Portfolio & CV Platform

## 1. Projektvision

Baue eine **professionelle, dynamische Portfolio- und Lebenslauf-Webseite** als langfristiges persönliches Projekt. Die Seite dient als lebendiges Dokument meiner beruflichen Laufbahn, Bildung, Projekte, Zertifikate und Kompetenzen. Sie soll über Jahre erweiterbar sein, rein datengetrieben funktionieren (kein Hardcoding von Inhalten) und bei Bedarf schnell für Bewerbungsprozesse gehostet werden können.

**Zielgruppe:** Recruiter, Hiring Manager, Fachkollegen, potenzielle Arbeitgeber.
**Kontext:** Primär localhost-Betrieb als privates Karriere-Dokumentationstool, bei Bedarf schnell deploybar.

---

## 2. Tech-Stack

| Schicht          | Technologie                                                  |
| ---------------- | ------------------------------------------------------------ |
| Framework        | **React 18+** mit **TypeScript** (strict mode)               |
| Build-Tool       | **Vite**                                                     |
| Styling          | **Tailwind CSS 3+** mit Custom Design Tokens                 |
| Routing          | **React Router v6** (Client-Side Routing, BrowserRouter)     |
| State            | **React Context** für globalen State (Theme, Sprache)        |
| i18n             | Eigene JSON-basierte Lösung (`/data/i18n/de.json`, `en.json`) |
| PDF-Viewer       | **react-pdf** (inline) + Custom Modal/Overlay (Lightbox)     |
| Animationen      | **Framer Motion**                                            |
| Icons            | **Lucide React** + dynamische Favicons via DuckDuckGo API    |
| Markdown         | **react-markdown** + **remark-gfm** + **rehype-highlight** (Blog-Rendering) |
| Formulare        | **React Hook Form** + **Zod** (Validierung)                  |
| Print/Export     | **react-to-print** + CSS `@media print` (Druckansicht / CV-Export) |
| Linting          | **ESLint** (strict config) + **Prettier**                    |
| Testing          | **Vitest** + **React Testing Library**                       |
| Package Manager  | **pnpm**                                                     |

---

## 3. Architektur & Software-Engineering-Prinzipien

### 3.1 Architekturstil

Das Projekt folgt einer **Feature-basierten Komponentenarchitektur** mit strikter Trennung von Concerns:

```
src/
├── app/                        # App-Shell: Router, Providers, Layout
│   ├── App.tsx                 # Root-Komponente, Provider-Baum
│   ├── router.tsx              # Zentrale Route-Definitionen
│   └── providers/              # Context Provider (Theme, i18n, etc.)
│       ├── ThemeProvider.tsx
│       ├── I18nProvider.tsx
│       └── index.tsx           # Combined provider export
│
├── layouts/                    # Layout-Komponenten
│   ├── MainLayout.tsx          # Navbar + Footer + Outlet
│   └── PageLayout.tsx          # Gemeinsames Page-Wrapper (Padding, Max-Width)
│
├── features/                   # Feature-Module (eine Page = ein Feature)
│   ├── profile/                # Über-mich / Profil
│   │   ├── components/         # Feature-spezifische Komponenten
│   │   ├── hooks/              # Feature-spezifische Hooks
│   │   ├── types.ts            # Feature-spezifische Typen
│   │   └── ProfilePage.tsx     # Page-Komponente (wird im Router registriert)
│   │
│   ├── career/                 # Beruflicher Werdegang
│   │   ├── components/
│   │   │   ├── Timeline.tsx
│   │   │   ├── TimelineEntry.tsx
│   │   │   └── CompanyCard.tsx
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── CareerPage.tsx
│   │
│   ├── education/              # Bildung / Akademischer Werdegang
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── EducationPage.tsx
│   │
│   ├── projects/               # Projekte & Portfolio
│   │   ├── components/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectDetail.tsx
│   │   │   └── TechBadge.tsx
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── ProjectsPage.tsx
│   │
│   ├── certificates/           # Zertifikate & Zeugnisse
│   │   ├── components/
│   │   │   ├── CertificateCard.tsx
│   │   │   ├── CertificateGrid.tsx
│   │   │   └── DocumentViewer.tsx
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── CertificatesPage.tsx
│   │
│   ├── blog/                   # Blog / Artikel
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── BlogPage.tsx
│   │
│   ├── testimonials/           # Referenzen & Empfehlungen
│   │   ├── components/
│   │   ├── types.ts
│   │   └── TestimonialsPage.tsx
│   │
│   ├── contact/                # Kontakt
│   │   ├── components/
│   │   │   └── ContactForm.tsx
│   │   ├── hooks/
│   │   ├── schemas/            # Zod Validation Schemas
│   │   │   └── contactSchema.ts
│   │   ├── types.ts
│   │   └── ContactPage.tsx
│   │
│   └── legal/                  # Impressum & Datenschutz
│       ├── ImprintPage.tsx
│       └── PrivacyPage.tsx
│
├── components/                 # Shared / Globale UI-Komponenten
│   ├── ui/                     # Atomare UI-Primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Skeleton.tsx        # Loading Skeletons
│   │   └── index.ts            # Barrel Export
│   │
│   ├── navigation/
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSwitch.tsx
│   │   └── Footer.tsx
│   │
│   ├── pdf/
│   │   ├── PdfInlineViewer.tsx     # Embedded inline Ansicht
│   │   ├── PdfModalViewer.tsx      # Lightbox / Overlay Ansicht
│   │   └── PdfThumbnail.tsx        # Thumbnail-Vorschau
│   │
│   └── common/
│       ├── FaviconImage.tsx        # DuckDuckGo Favicon Scraper
│       ├── HeroBackground.tsx      # Animiertes Dot-Grid / Gradient-Mesh für Hero
│       ├── StatsBanner.tsx         # Dynamische Statistik-Leiste (Jahre, Projekte, Certs)
│       ├── SectionHeading.tsx
│       ├── ScrollToTop.tsx
│       ├── AnimatedSection.tsx     # Framer Motion Wrapper
│       ├── PrintableCV.tsx         # Druckoptimierter Lebenslauf (Career + Education)
│       └── ErrorBoundary.tsx
│
├── hooks/                      # Globale Custom Hooks
│   ├── useTheme.ts
│   ├── useI18n.ts
│   ├── useMediaQuery.ts
│   ├── usePdfViewer.ts
│   └── useScrollAnimation.ts
│
├── lib/                        # Utilities, Helper, Services
│   ├── dataLoader.ts           # JSON/PDF Data Loading Logik
│   ├── faviconService.ts       # DuckDuckGo Favicon URL Builder
│   ├── pdfUtils.ts             # PDF Handling Utilities
│   ├── dateUtils.ts            # Datumsformatierung (DE/EN)
│   └── cn.ts                   # Tailwind className Merger (clsx + twMerge)
│
├── types/                      # Globale TypeScript-Typen
│   ├── career.ts
│   ├── education.ts
│   ├── project.ts
│   ├── certificate.ts
│   ├── blog.ts
│   ├── testimonial.ts
│   ├── i18n.ts
│   └── common.ts
│
├── styles/
│   ├── globals.css             # Tailwind Directives + CSS Custom Properties
│   └── theme.css               # Design Tokens (Light/Dark)
│
├── data/                       # ALLE Inhalte (Single Source of Truth)
│   ├── i18n/
│   │   ├── de.json             # Deutsche UI-Texte
│   │   └── en.json             # Englische UI-Texte
│   ├── blog/                   # Blog-Artikel als Markdown
│   │   ├── de/                 # Deutsche Artikel
│   │   │   └── artikel-slug.md
│   │   └── en/                 # Englische Artikel
│   │       └── article-slug.md
│   ├── career.json             # Berufliche Stationen (DE + EN Felder)
│   ├── education.json          # Bildungsweg
│   ├── projects.json           # Projekte mit Links, Tags, PDF-Refs
│   ├── certificates.json       # Zertifikate mit PDF-Refs
│   ├── testimonials.json       # Referenzen
│   ├── blog.json               # Blog-Metadaten (Titel, Datum, Tags, Pfad zur .md)
│   ├── profile.json            # Persönliche Infos, Bio, Skills
│   └── legal.json              # Impressum & Datenschutz Texte
│
├── assets/
│   ├── images/
│   │   ├── profile/            # Profilbilder
│   │   └── projects/           # Projekt-Thumbnails
│   └── documents/
│       ├── certificates/       # Zertifikat-PDFs
│       ├── testimonials/       # Zeugnis-PDFs
│       ├── projects/           # Projektdokumentationen als PDF
│       └── cv/                 # Downloadbarer Gesamt-Lebenslauf PDF
│
└── main.tsx                    # Entrypoint
```

### 3.2 Design Patterns & Entwurfsmuster

Setze folgende Patterns **konsequent** um:

| Pattern                        | Einsatzort                          | Beschreibung                                                                                     |
| ------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Composition Pattern**        | Alle Komponenten                    | Baue UI aus kleinen, zusammensetzbaren Teilen. Keine God-Components.                             |
| **Container/Presentational**   | Feature Pages                       | Page-Komponente (Container) lädt Daten → gibt sie an reine UI-Komponenten (Presentational) weiter. |
| **Provider Pattern**           | Theme, i18n                         | React Context Provider am App-Root für globalen State.                                           |
| **Custom Hook Pattern**        | Datenlogik, Side Effects            | Jede wiederverwendbare Logik in eigenen Hook extrahieren (`useCareerData`, `useI18n`).           |
| **Strategy Pattern**           | PDF-Viewer                          | Inline vs. Modal Darstellung über Strategy-Auswahl je nach Kontext (Zertifikat → Modal, Projekt-Doku → Inline). |
| **Factory Pattern**            | Komponenten-Rendering               | `createTimelineEntry()` oder ähnliche Factory-Funktionen für dynamisches Erstellen von UI-Elementen aus JSON-Daten. |
| **Observer Pattern**           | Scroll-Animationen, Theme-Wechsel   | IntersectionObserver für Scroll-basierte Animationen; Event-basiertes Theme-Switching.           |
| **Adapter Pattern**            | Favicon-Service, Data-Loader        | Adapter-Schicht zwischen externer API (DuckDuckGo) und interner Nutzung.                        |
| **Repository Pattern**         | `lib/dataLoader.ts`                 | Zentralisierter Datenzugriff. Alle Features laden Daten über eine einheitliche Schnittstelle.    |
| **Barrel Exports**             | `components/ui/index.ts`            | Saubere Re-Exports für aufgeräumte Imports.                                                      |

### 3.3 Clean Code Prinzipien

- **SOLID** — insbesondere Single Responsibility (eine Komponente = eine Aufgabe) und Open/Closed (erweiterbar via Props/Composition, nicht durch Modifikation).
- **DRY** — Gemeinsame Logik in Hooks und Utilities extrahieren. Keine Copy-Paste-Komponenten.
- **KISS** — Keine Over-Engineering. Kein Redux, kein GraphQL, kein Backend — es sind JSON-Dateien.
- **YAGNI** — Nur bauen was spezifiziert ist. Keine spekulativen Features.
- **Separation of Concerns** — Daten (`/data`), Logik (`/hooks`, `/lib`), Darstellung (`/components`) strikt trennen.
- **Single Source of Truth** — ALLE Inhalte leben in `/data`. Kein Hardcoding von Texten in Komponenten.
- **Immutability** — State nie direkt mutieren. Immer neue Referenzen erzeugen.

### 3.4 TypeScript-Idiome

```typescript
// ✅ Discriminated Unions für verschiedene Dokument-Typen
type Document =
  | { type: 'certificate'; category: 'professional' | 'academic'; pdfPath: string }
  | { type: 'testimonial'; issuer: string; pdfPath: string }
  | { type: 'projectDoc'; projectId: string; pdfPath: string };

// ✅ Branded Types für IDs
type ProjectId = string & { readonly __brand: 'ProjectId' };
type CertificateId = string & { readonly __brand: 'CertificateId' };

// ✅ Strenge Prop-Typen, keine `any`
interface TimelineEntryProps {
  readonly title: string;
  readonly organization: string;
  readonly period: DateRange;
  readonly description: string;
  readonly logo?: string;
  readonly faviconUrl?: string;
}

// ✅ Utility Types nutzen
type Locale = 'de' | 'en';
type Localized<T> = Record<Locale, T>;

// ✅ Readonly für Daten aus JSON
interface CareerEntry {
  readonly id: string;
  readonly company: Localized<string>;
  readonly role: Localized<string>;
  readonly period: DateRange;
  readonly description: Localized<string>;
  readonly companyUrl: string;
  readonly tags: readonly string[];
}
```

---

## 4. Seiten & Features — Detailspezifikation

### 4.1 Navigation (Navbar)

- **Sticky Navbar** oben, leicht transparent mit Backdrop-Blur bei Scroll.
- Links: Logo/Name (Link zu Profil). Rechts: Nav-Links zu allen Seiten.
- **Language Switch** (DE/EN) als Toggle-Button in der Navbar — wechselt globalen i18n-State.
- **Theme Toggle** (Light/Dark) als Icon-Button.
- **Mobile:** Hamburger-Menü mit Slide-In Drawer (Framer Motion animiert).
- Active Route visuell hervorgehoben.

### 4.2 Profil / Über mich (`/`)

- **Hero-Bereich (Full Viewport):**
  - **Animierter Hintergrund:** Dezentes, performantes Dot-Grid oder Gradient-Mesh (Canvas-basiert oder CSS). Subtil animiert (langsam driftende Punkte/Farbverläufe). Muss zum Corporate-Look passen — keine Partikel-Explosionen, kein Neon-Glow. Im Dark Mode: dunkle Variante mit leicht leuchtenden Akzentpunkten. **Wichtig:** `prefers-reduced-motion` respektieren → statischer Fallback.
  - Profilbild (abgerundet, dezenter Ring-Akzent), Name, aktuelle Position, kurzer Slogan.
  - **CTA-Buttons**: "Lebenslauf herunterladen" (PDF) + "Kontakt" + "Druckansicht" (öffnet PrintableCV).
  - Scroll-Indicator (animierter Chevron/Arrow nach unten).
- **Statistik-Leiste** direkt unter dem Hero:
  - Dynamisch berechnet aus den JSON-Daten: z.B. `X+ Jahre Berufserfahrung · Y Projekte · Z Zertifikate · W Technologien`.
  - Berechnung: Jahre aus `career.json` (Differenz frühester Start bis heute), Anzahl aus `projects.json`, `certificates.json`, unique Tags aggregiert.
  - Darstellung: Horizontal nebeneinander, große Zahl + Label darunter. Animierter Count-Up beim Eintreten in den Viewport (Framer Motion).
  - Responsive: Grid auf Mobile (2x2), inline auf Desktop.
- Bio-Text (aus `profile.json`, lokalisiert DE/EN).
- **Skills-Übersicht**: Gruppiert nach Kategorien (z.B. Programmiersprachen, Frameworks, Tools, Methoden). Darstellung als farbcodierte Badges oder Tag-Cloud.
- Soft Skills / Interessen als dezente Sektion.
- Framer Motion: Staggered Fade-In der Sektionen beim Scrollen.

### 4.3 Karriere (`/career`)

- **Vertikale Timeline** (typisches Lebenslauf-Layout).
- Jeder Eintrag als Card:
  - **Firmen-Favicon** via DuckDuckGo neben dem Firmennamen (FaviconImage-Komponente).
  - Zeitraum, Position, Firma, Standort.
  - Stichpunktartige Beschreibung der Tätigkeiten.
  - Tech-Stack als Badges.
- Daten aus `career.json` — DE und EN Felder, je nach Sprachauswahl gerendert.
- Timeline-Linie mit Dots, animiert beim Scrollen (IntersectionObserver + Framer Motion).

### 4.4 Bildung (`/education`)

- Ähnliches Timeline-Layout wie Karriere.
- Einträge: Schule/Uni, Abschluss, Zeitraum, Schwerpunkte, Abschlussnote.
- **Favicon** der Institution via DuckDuckGo.
- Relevante Zeugnisse direkt verlinkbar (öffnet PDF-Modal).

### 4.5 Projekte (`/projects`)

- **Responsive Grid** aus Projekt-Cards.
- Jede Card zeigt:
  - **Thumbnail** (Bild aus `/assets/images/projects/`).
  - Projekttitel, Kurzbeschreibung.
  - **Tech-Stack Badges**.
  - **GitHub-Link** (Platzhalter-Icon, konfigurierbar in JSON — `githubUrl: ""` wenn noch nicht verfügbar, dann ausgegraut).
  - **PDF-Dokumentation** Button → öffnet PDF-Viewer (Inline oder Modal je nach Konfiguration im JSON).
- Klick auf Card → Detail-Ansicht (eigene Route `/projects/:id` oder Modal) mit ausführlicher Beschreibung, Galerie, PDF-Viewer.
- **Filter** nach Technologie/Kategorie.

### 4.6 Zertifikate & Zeugnisse (`/certificates`)

- **Grid-Layout** mit Cards.
- Jede Card:
  - Titel, Aussteller, Datum.
  - **Favicon** des Ausstellers.
  - **Thumbnail-Vorschau** des PDFs (erste Seite als Bild via react-pdf).
  - Klick → **PDF Modal Viewer** (Lightbox-Overlay, Vollbild-tauglich, Zoom, Seiten-Navigation).
  - Download-Button.
- Kategorisierung: Berufszeugnisse, Akademische Zeugnisse, Fortbildungen, Zertifikate.
- Filter-Tabs nach Kategorie.

### 4.7 Blog / Artikel (`/blog`)

- Liste von Artikeln als Cards mit Titel, Datum, Teaser, Tags.
- Klick → Detail-Seite (`/blog/:slug`) mit gerendertem Markdown.
- **Architektur:** Metadaten in `blog.json`, Artikelinhalte als separate Markdown-Dateien unter `/data/blog/de/` und `/data/blog/en/`. `react-markdown` mit `remark-gfm` (Tabellen, Checklisten) und `rehype-highlight` (Syntax-Highlighting für Code-Blöcke).
- `blog.json` Eintrag referenziert den Markdown-Pfad:
  ```json
  {
    "id": "artikel-slug",
    "title": { "de": "Titel", "en": "Title" },
    "date": "2026-01-15",
    "teaser": { "de": "...", "en": "..." },
    "tags": ["TypeScript", "Architecture"],
    "markdownFile": { "de": "artikel-slug.md", "en": "article-slug.md" },
    "featured": true
  }
  ```
- Markdown wird zur Laufzeit via `fetch()` geladen (nicht gebundelt).
- Kategorien/Tags filterbar.
- Lese-Dauer automatisch berechnet (~200 Wörter/Minute).

### 4.8 Testimonials / Referenzen (`/testimonials`)

- Elegant gestaltete Zitat-Cards mit:
  - Zitat-Text (lokalisiert).
  - Name, Position, Firma des Referenzgebers.
  - Optional: Favicon der Firma.
- Carousel oder Grid-Darstellung.

### 4.9 Kontakt (`/contact`)

- **Kontaktformular** mit React Hook Form + Zod Validierung:
  - Felder: Name, E-Mail, Betreff, Nachricht.
  - Inline-Fehlermeldungen (lokalisiert).
  - Submit-Button mit Loading-State.
  - **Hinweis:** Da kein Backend — Formular zeigt bei Submit eine Info-Nachricht ("Nachricht vorbereitet") und bietet `mailto:`-Link als Fallback. Später erweiterbar mit Backend/API.
- Daneben: Direkte Kontakt-Infos (E-Mail, LinkedIn, GitHub, Standort).
- Optional: Kleine eingebettete Karte (Standort-Region, nicht exakte Adresse).

### 4.10 Impressum & Datenschutz (`/imprint`, `/privacy`)

- Statische Seiten, Inhalte aus `legal.json` (lokalisiert).
- Links im Footer.

### 4.11 Footer

- Kompakter Footer auf allen Seiten.
- Links: Impressum, Datenschutz.
- Social-Icons: GitHub, LinkedIn, E-Mail.
- Copyright-Hinweis mit dynamischem Jahr.
- Sprach- und Theme-Toggle Duplikat optional.

### 4.12 Druckansicht / CV-Export (`/print` oder Modal)

Generiert einen **klassischen, tabellarischen Lebenslauf** direkt aus den JSON-Daten — druckbar und als PDF speicherbar über den Browser-Druckdialog.

- **Zugang:** Button auf der Profil-Seite ("Druckansicht") + optionaler Nav-Link.
- **Layout:** Eigene Route `/print` mit eigenem Layout (ohne Navbar/Footer, ohne Animationen), ODER als Overlay-Komponente die via `react-to-print` gerendert wird.
- **Inhalt** (automatisch aus bestehenden JSONs aggregiert):
  - Persönliche Daten (aus `profile.json`): Name, Kontakt, Standort.
  - Berufserfahrung (aus `career.json`): Tabellarisch, chronologisch absteigend.
  - Bildung (aus `education.json`): Abschlüsse, Institutionen, Zeiträume.
  - Skills (aus `profile.json`): Kompakt als Kategorien + Komma-getrennte Auflistung.
  - Zertifikate (aus `certificates.json`): Kurzliste mit Titel, Aussteller, Datum.
- **Styling:**
  - Dediziertes `@media print` CSS: Keine Schatten, keine Hintergrundfarben, schwarzer Text, saubere Seitenumbrüche (`page-break-inside: avoid`).
  - A4-optimiert (210mm × 297mm).
  - Schrift: Serif oder Clean Sans (z.B. Inter) in 10–11pt.
  - Dezente Linien als Sektions-Trenner.
  - Immer Light Mode, unabhängig vom aktuellen Theme.
- **Sprachabhängig:** Rendert in der aktuell ausgewählten Sprache (DE oder EN).
- **Kein Extra-Package nötig für PDF-Erzeugung:** Browser `Ctrl+P` → "Als PDF speichern" reicht. `react-to-print` steuert nur den Print-Trigger programmatisch.
- **Erweiterbar:** Später Optional ein richtiger PDF-Generator (z.B. `@react-pdf/renderer`) für pixel-perfekte Kontrolle.

---

## 5. Datenmodell — JSON-Strukturen

Alle Inhalte sind **datengetrieben**. Hier die Schemata:

### 5.1 `career.json`

```json
[
  {
    "id": "jti-gps-manager",
    "company": { "de": "JTI (Japan Tobacco International)", "en": "JTI (Japan Tobacco International)" },
    "role": { "de": "GPS Process & Systems Group Manager", "en": "GPS Process & Systems Group Manager" },
    "location": { "de": "Trier, Deutschland", "en": "Trier, Germany" },
    "period": { "start": "2026-04", "end": null },
    "companyUrl": "https://www.jti.com",
    "description": {
      "de": ["Koordination System-Setup mit BTS und GSD Teams", "..."],
      "en": ["Coordinating system setup with BTS and GSD teams", "..."]
    },
    "tags": ["SAP", "Process Management", "Team Leadership"]
  }
]
```

### 5.2 `education.json`

```json
[
  {
    "id": "hs-trier-winf",
    "institution": { "de": "Hochschule Trier", "en": "Trier University of Applied Sciences" },
    "degree": { "de": "B.Sc. Wirtschaftsinformatik", "en": "B.Sc. Business Informatics" },
    "period": { "start": "2021-10", "end": "2026-02" },
    "institutionUrl": "https://www.hochschule-trier.de",
    "description": { "de": "...", "en": "..." },
    "grade": "X.X"
  }
]
```

### 5.3 `projects.json`

```json
[
  {
    "id": "project-slug",
    "title": { "de": "Projekttitel", "en": "Project Title" },
    "shortDescription": { "de": "...", "en": "..." },
    "fullDescription": { "de": "...", "en": "..." },
    "thumbnail": "/assets/images/projects/project-slug.png",
    "tags": ["Python", "React", "TypeScript"],
    "category": "web",
    "githubUrl": "",
    "documentationPdf": "/assets/documents/projects/project-slug-doc.pdf",
    "pdfViewerMode": "inline",
    "date": "2025-06",
    "featured": true
  }
]
```

### 5.4 `certificates.json`

```json
[
  {
    "id": "cert-id",
    "title": { "de": "Zertifikatsname", "en": "Certificate Name" },
    "issuer": { "de": "Aussteller", "en": "Issuer" },
    "issuerUrl": "https://example.com",
    "date": "2025-03",
    "category": "professional",
    "pdfPath": "/assets/documents/certificates/cert-id.pdf",
    "description": { "de": "...", "en": "..." }
  }
]
```

### 5.5 `profile.json`

```json
{
  "name": "Vorname Nachname",
  "title": { "de": "GPS Process & Systems Group Manager", "en": "GPS Process & Systems Group Manager" },
  "tagline": { "de": "...", "en": "..." },
  "bio": { "de": "...", "en": "..." },
  "profileImage": "/assets/images/profile/profile.jpg",
  "cvPdf": "/assets/documents/cv/lebenslauf.pdf",
  "location": { "de": "Trier, Deutschland", "en": "Trier, Germany" },
  "email": "mail@example.com",
  "social": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  },
  "skills": [
    {
      "category": { "de": "Programmiersprachen", "en": "Programming Languages" },
      "items": ["Python", "TypeScript", "Java", "SQL"]
    }
  ],
  "interests": {
    "de": ["..."],
    "en": ["..."]
  }
}
```

### 5.6 `i18n/de.json` / `en.json`

```json
{
  "nav": {
    "profile": "Profil",
    "career": "Karriere",
    "education": "Bildung",
    "projects": "Projekte",
    "certificates": "Zertifikate",
    "blog": "Blog",
    "testimonials": "Referenzen",
    "contact": "Kontakt"
  },
  "common": {
    "readMore": "Weiterlesen",
    "download": "Herunterladen",
    "viewPdf": "PDF ansehen",
    "present": "Heute",
    "backToOverview": "Zurück zur Übersicht",
    "filterAll": "Alle",
    "noResults": "Keine Ergebnisse gefunden."
  },
  "contact": {
    "namePlaceholder": "Ihr Name",
    "emailPlaceholder": "Ihre E-Mail",
    "subjectPlaceholder": "Betreff",
    "messagePlaceholder": "Ihre Nachricht...",
    "submit": "Absenden",
    "successMessage": "Danke! Ihre Nachricht wurde vorbereitet.",
    "validation": {
      "nameRequired": "Name ist erforderlich.",
      "emailInvalid": "Bitte geben Sie eine gültige E-Mail ein.",
      "messageRequired": "Nachricht ist erforderlich."
    }
  },
  "footer": {
    "imprint": "Impressum",
    "privacy": "Datenschutz",
    "copyright": "© {year} — Alle Rechte vorbehalten."
  }
}
```

---

## 6. Design System & Theming

### 6.1 Design Tokens (CSS Custom Properties)

```css
/* theme.css */
:root {
  /* Light Mode — Corporate, professionell, clean */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8FAFC;
  --color-bg-tertiary: #F1F5F9;
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #94A3B8;
  --color-accent: #2563EB;           /* Professionelles Blau */
  --color-accent-hover: #1D4ED8;
  --color-accent-light: #DBEAFE;
  --color-border: #E2E8F0;
  --color-card-bg: #FFFFFF;
  --color-card-shadow: rgba(0, 0, 0, 0.05);
  --color-success: #16A34A;
  --color-error: #DC2626;
  --font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --transition-default: 150ms ease;
}

[data-theme="dark"] {
  --color-bg-primary: #0F172A;
  --color-bg-secondary: #1E293B;
  --color-bg-tertiary: #334155;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #CBD5E1;
  --color-text-muted: #64748B;
  --color-accent: #3B82F6;
  --color-accent-hover: #60A5FA;
  --color-accent-light: #1E3A5F;
  --color-border: #334155;
  --color-card-bg: #1E293B;
  --color-card-shadow: rgba(0, 0, 0, 0.3);
}
```

### 6.2 Design-Richtlinien

- **Farbpalette:** Gedeckt, professionell. Hauptfarbe: Blau (Trust, Corporate). Keine Neonfarben. Keine grellen Akzente.
- **Typografie:** Inter als Hauptschrift (clean, modern, gut lesbar). JetBrains Mono für Code-Snippets/Tags.
- **Spacing:** Konsistentes 4px/8px Grid-System via Tailwind.
- **Karten:** Subtle Schatten, klare Borders, leichte Hover-Effekte (scale, shadow-lift).
- **Dark Mode:** Slate-Farbfamilie (Tailwind). Kein reines Schwarz (#000), sondern dunkles Slate.
- **Responsive:** Mobile-First. Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.
- **Animationen:** Subtil und professionell. Fade-In, Slide-Up beim Scrollen. Keine übertriebenen Bounces oder Spins. Framer Motion mit `duration: 0.3–0.6s`, `ease: easeOut`.

---

## 7. Komponenten-Spezifikation

### 7.1 `FaviconImage` — DuckDuckGo Favicon Scraper

```typescript
// Baut URL: https://icons.duckduckgo.com/ip3/{domain}.ico
// Fallback: Generisches Icon (z.B. Building-Icon aus Lucide) wenn Laden fehlschlägt.

interface FaviconImageProps {
  url: string;          // z.B. "https://www.jti.com"
  alt: string;
  size?: number;        // Default: 24
  className?: string;
  fallbackIcon?: React.ReactNode;
}
```

- Extrahiere Domain aus URL automatisch.
- `onError` Handler: Zeige Fallback-Icon.
- Optional: Caching der geladenen Favicons via `useMemo`.

### 7.2 PDF-Viewer (Dual-Mode)

**Inline-Viewer (`PdfInlineViewer`):**
- Eingebettet in der Seite (z.B. bei Projektdokumentation).
- Seiten-Navigation (vor/zurück), aktuelle Seite / Gesamtseitenanzahl.
- Zoom-Controls.

**Modal-Viewer (`PdfModalViewer`):**
- Overlay/Lightbox über die Seite.
- Dunkler Backdrop mit Blur.
- Close-Button (X) + Escape-Taste.
- Volle Seitennavigation + Zoom.
- Download-Button integriert.
- Framer Motion: AnimatePresence für Ein-/Ausblendung.

**Thumbnail (`PdfThumbnail`):**
- Rendert erste Seite des PDFs als kleines Vorschaubild.
- Klick darauf öffnet den Modal-Viewer.
- Loading-Skeleton während Rendering.

**Viewer-Auswahl (Strategy Pattern):**
```typescript
// In projects.json: "pdfViewerMode": "inline" | "modal"
// Komponente entscheidet basierend auf diesem Feld.
```

### 7.3 Timeline-Komponente

- Vertikale Linie (links auf Desktop, zentriert optional).
- Dots/Nodes auf der Linie pro Eintrag.
- Cards abwechselnd links/rechts (Desktop) oder alle rechts (Mobile).
- IntersectionObserver: Dots und Cards animieren beim Eintreten in den Viewport.
- Wiederverwendbar für Career UND Education.

### 7.4 `HeroBackground` — Animierter Hintergrund

```typescript
interface HeroBackgroundProps {
  variant?: 'dotGrid' | 'gradientMesh';  // Default: 'dotGrid'
  className?: string;
}
```

- **Dot-Grid Variante:** Canvas-Element mit gleichmäßig verteilten Punkten. Dezente, langsame Drift-Animation (Sinuswelle auf Position). Punkte in `--color-text-muted` mit niedriger Opacity (0.15–0.3). Mouse-Proximity-Effekt optional: Punkte in der Nähe des Cursors leuchten leicht heller.
- **Gradient-Mesh Variante:** 2–3 große, weichgezeichnete Farbkreise (CSS `radial-gradient` oder Canvas), die langsam ihre Position wechseln. Farben aus dem Accent-Bereich, stark entsättigt.
- **Performance:** `requestAnimationFrame`-basiert. Canvas bevorzugen über DOM-Manipulation. Max 60fps, `will-change: transform` wo nötig.
- **Reduced Motion:** Bei `prefers-reduced-motion: reduce` → statisches Bild, keine Animation.
- Absolute Positionierung hinter dem Hero-Content (`z-index: 0`).

### 7.5 `StatsBanner` — Dynamische Statistik-Leiste

```typescript
interface StatItem {
  value: number;
  label: Localized<string>;
  suffix?: string;  // z.B. "+"
}

interface StatsBannerProps {
  stats: StatItem[];
  className?: string;
}
```

- Berechnung der Werte in einem eigenen Hook `usePortfolioStats()`:
  - **Jahre Berufserfahrung:** Frühester `period.start` aus `career.json` bis heute, gerundet.
  - **Projekte:** `projects.json.length`.
  - **Zertifikate:** `certificates.json.length`.
  - **Technologien:** Unique Tags aggregiert über alle Projekte und Karriere-Einträge.
- **Count-Up Animation:** Zahlen zählen von 0 auf Zielwert hoch wenn die Komponente in den Viewport scrollt. Dauer: ~1.5s, easeOut. Framer Motion `useInView` + `useMotionValue` oder einfacher `useSpring`.
- **Layout:** Horizontal auf Desktop (4 Spalten), 2×2 Grid auf Mobile. Zentriert, dezente Trennlinien zwischen Items.

### 7.6 `PrintableCV` — Druckoptimierter Lebenslauf

```typescript
interface PrintableCVProps {
  locale: Locale;
}
```

- Rendert einen **klassischen tabellarischen Lebenslauf** aus den JSON-Daten.
- Sektionen: Persönliche Daten → Berufserfahrung → Bildung → Skills → Zertifikate.
- **Kein Tailwind im Print-Bereich** — eigenes, dediziertes CSS für `@media print`:
  ```css
  @media print {
    .printable-cv { font-size: 10.5pt; color: #000; }
    .printable-cv * { box-shadow: none !important; background: none !important; }
    .no-print { display: none !important; }
    section { page-break-inside: avoid; }
    @page { size: A4; margin: 15mm 20mm; }
  }
  ```
- Trigger via `react-to-print`: Button ruft `useReactToPrint` Hook auf → öffnet Browser-Druckdialog.
- Alternativ: Eigene Route `/print` mit `?lang=de|en` Query-Parameter, komplett ohne App-Shell (kein Navbar/Footer).

---

## 8. Querschnittsthemen

### 8.1 Internationalisierung (i18n)

- `I18nProvider` stellt aktuelle Locale und `t()`-Funktion bereit.
- Hook `useI18n()` gibt `{ locale, t, setLocale }` zurück.
- `t('nav.profile')` → liest aus `de.json` oder `en.json`.
- Für Content-Daten (career, projects etc.): Zugriff über `entry.title[locale]`.
- Sprachpräferenz im `localStorage` persistieren.
- HTML `lang` Attribut dynamisch setzen.

### 8.2 Theming

- `ThemeProvider` verwaltet `'light' | 'dark'`.
- `useTheme()` gibt `{ theme, toggleTheme }` zurück.
- Theme-Klasse auf `<html>` Element: `data-theme="dark"`.
- Tailwind konfiguriert mit `darkMode: ['selector', '[data-theme="dark"]']`.
- Theme-Präferenz im `localStorage` persistieren.
- Initiales Theme: `prefers-color-scheme` des Systems respektieren.

### 8.3 Animationen (Framer Motion)

- `AnimatedSection` Wrapper:
  ```tsx
  <AnimatedSection animation="fadeUp" delay={0.1}>
    <SectionContent />
  </AnimatedSection>
  ```
- Vordefinierte Animations-Varianten: `fadeUp`, `fadeIn`, `slideLeft`, `slideRight`, `stagger`.
- Trigger: `whileInView` mit `once: true` (Animation nur einmal).
- Seiten-Transitions via `AnimatePresence` und Route-Wechsel.
- `prefers-reduced-motion` respektieren — Animationen deaktivieren.

### 8.4 SEO & Meta (für späteres Hosting)

- Dynamische `<title>` und `<meta description>` pro Seite via `react-helmet-async`.
- Open Graph Tags vorbereiten (für LinkedIn-Sharing etc.).
- Semantisches HTML: `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`.
- `alt`-Texte auf allen Bildern.

### 8.5 Performance

- **Lazy Loading:** Alle Feature-Pages via `React.lazy()` + `Suspense` mit Skeleton-Fallback.
- **Image Optimization:** Thumbnails in angemessener Größe. WebP bevorzugen.
- **PDF Lazy Loading:** PDFs erst bei Interaktion (Klick) laden, nicht beim Seitenaufruf.
- **Code Splitting:** Vite erledigt das automatisch mit den Lazy-Imports.

### 8.6 Accessibility (a11y)

- ARIA-Labels auf interaktiven Elementen.
- Keyboard-Navigation: Tab-Reihenfolge, Enter/Space für Buttons, Escape für Modals.
- Focus-Visible Styles.
- Farbkontraste: WCAG AA mindestens.
- Skip-to-Content Link.
- Screen-Reader-freundliche Texte für Icons und Bilder.

### 8.7 Error Handling

- `ErrorBoundary` Komponente am App-Root und pro Feature.
- Fallback-UI bei Fehler ("Etwas ist schiefgelaufen").
- Graceful Degradation: Wenn ein PDF nicht lädt → Fehlermeldung + Download-Link als Fallback.
- Wenn Favicon nicht lädt → Fallback-Icon (kein broken image).

---

## 9. Deployment-Readiness (für späteres Hosting)

Obwohl primär localhost, soll die Seite **deployment-ready** sein:

- `vite build` erzeugt optimierten Static Build.
- Konfigurierbare `base`-URL in `vite.config.ts`.
- Environment Variables vorbereitet (`.env.example`): z.B. `VITE_BASE_URL`, `VITE_CONTACT_EMAIL`.
- **Docker-Option:** `Dockerfile` und `docker-compose.yml` vorbereiten (Nginx serving static files).
- **GitHub Pages / Vercel / Netlify:** Kompatibel durch Static Export.
- `robots.txt` und `sitemap.xml` Platzhalter.

---

## 10. Dateikonventionen & Code-Stil

### Naming Conventions

| Typ             | Konvention             | Beispiel                          |
| --------------- | ---------------------- | --------------------------------- |
| Komponenten     | PascalCase             | `ProjectCard.tsx`                 |
| Hooks           | camelCase, `use`-Prefix | `useTheme.ts`                     |
| Utilities       | camelCase              | `faviconService.ts`              |
| Types/Interfaces | PascalCase              | `CareerEntry`, `ProjectData`      |
| JSON-Dateien    | kebab-case oder camelCase | `career.json`, `profile.json`   |
| CSS-Variablen   | kebab-case, `--`-Prefix | `--color-accent`                 |
| Ordner          | kebab-case             | `components/`, `pdf-viewer/`      |

### Code-Regeln

- **Keine `any` Types.** Niemals. Nutze `unknown` + Type Guards wenn nötig.
- **Keine Default Exports** außer für Page-Komponenten (React.lazy-Kompatibilität).
- **Alle Komponenten als Function Components** mit explizitem Return Type.
- **Props als Interface** definieren, nicht inline.
- **Keine Magic Numbers/Strings.** Konstanten auslagern.
- **Kommentare:** Nur wenn "warum", nicht "was". Code soll selbsterklärend sein.
- **Max Dateilänge:** ~200 Zeilen. Darüber hinaus → aufteilen.
- **Imports sortiert:** React → Third-Party → Eigene Module → Typen → Styles.

---

## 11. Entwicklungsworkflow

### Setup

```bash
pnpm create vite portfolio --template react-ts
cd portfolio
pnpm install
pnpm add react-router-dom framer-motion react-pdf react-hook-form zod @hookform/resolvers react-helmet-async lucide-react clsx tailwind-merge react-markdown remark-gfm rehype-highlight react-to-print
pnpm add -D tailwindcss @tailwindcss/vite postcss autoprefixer eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Build-Reihenfolge

1. **Grundgerüst:** Vite Setup, Tailwind Config, Design Tokens, Theme/i18n Provider.
2. **Routing & Layout:** React Router, MainLayout mit Navbar + Footer, PageLayout, Print-Layout (ohne Shell).
3. **Shared Components:** UI-Primitives (Button, Card, Badge, Modal), FaviconImage, PDF-Viewer, HeroBackground, StatsBanner.
4. **Data Layer:** JSON-Dateien erstellen, DataLoader, TypeScript Types, `usePortfolioStats` Hook.
5. **Feature Pages:** Eine nach der anderen — Profil (mit Hero + Stats) → Karriere → Bildung → Projekte → Zertifikate → Blog (mit Markdown-Renderer) → Testimonials → Kontakt → Legal.
6. **Druckansicht:** PrintableCV Komponente, Print-CSS, `/print` Route oder react-to-print Integration.
7. **Animationen:** Framer Motion integrieren, AnimatedSection, Seiten-Transitions, Count-Up Stats.
8. **Polish:** Responsive Feinschliff, a11y Audit, Performance Check, Error Boundaries.
9. **Testing:** Grundlegende Tests für kritische Komponenten und Hooks.
10. **Deployment Prep:** Dockerfile, Build optimieren, `.env.example`.

---

## 12. Erweiterbarkeit

Das System ist so designed, dass neue Inhalte **nur durch JSON-Änderungen und Dateiablage** hinzugefügt werden:

- **Neue Karriere-Station:** → Eintrag in `career.json` hinzufügen. Fertig. Stats aktualisieren sich automatisch.
- **Neues Zertifikat:** → PDF in `/assets/documents/certificates/`, Eintrag in `certificates.json`. Fertig.
- **Neues Projekt:** → Thumbnail + PDF ablegen, Eintrag in `projects.json`. Fertig.
- **Neuer Blog-Artikel:** → Markdown-Datei in `/data/blog/de/` und `/data/blog/en/`, Metadaten-Eintrag in `blog.json`. Fertig.
- **Neue Sprache:** → Neue JSON in `/data/i18n/`, neuer Blog-Ordner, Locale-Type erweitern. Komponenten passen sich automatisch an.
- **Neues Feature/Page:** → Neuer Ordner in `/features/`, Route registrieren, Nav-Link hinzufügen.
- **Druckansicht:** Aktualisiert sich automatisch mit allen Datenänderungen — keine separate Pflege nötig.

---

## 13. Nicht-Funktionale Anforderungen

| Anforderung          | Ziel                                                        |
| -------------------- | ----------------------------------------------------------- |
| Lighthouse Score     | Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 |
| First Contentful Paint | < 1.5s                                                    |
| Bundle Size          | Initial Load < 200KB gzipped                                |
| Browser Support      | Letzte 2 Versionen Chrome, Firefox, Safari, Edge           |
| Responsiveness       | 320px – 2560px flüssig                                      |
| Barrierefreiheit     | WCAG 2.1 AA                                                 |

---

## 14. Zusammenfassung der Kernprinzipien

1. **Datengetrieben** — JSON + Markdown ist die Wahrheit. Kein Hardcoding.
2. **Feature-basierte Architektur** — Jede Seite ist ein eigenständiges Modul.
3. **Clean Code** — SOLID, DRY, KISS, YAGNI.
4. **Type-Safe** — TypeScript strict, keine `any`.
5. **Professionelles Design** — Corporate, clean, trustworthy. Kein Spielplatz.
6. **Erweiterbar** — Neue Inhalte = neue JSON-Einträge + Markdown-Files + Assets.
7. **Deployment-Ready** — Jederzeit hostbar.
8. **Barrierefrei** — A11y ist kein Nachgedanke.
9. **Performant** — Lazy Loading, Code Splitting, optimierte Assets.
10. **Bilingual** — DE/EN komplett, umschaltbar.
11. **Print-Ready** — Druckansicht generiert sich automatisch aus den Daten.
