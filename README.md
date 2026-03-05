# Portfolio — Next.js + Tailwind CSS + Framer Motion

A minimalist, **Git-driven** developer portfolio. Zero images. Pure kinetic
typography on a black canvas. Fully static — deployed automatically to
**GitHub Pages** on every `git push`.

**Live URL (after deployment):**

```
https://<your-github-username>.github.io/<repo-name>/
```

---

## Table of contents

1. [Stack overview](#stack-overview)
2. [Prerequisites](#prerequisites)
3. [Getting started (local development)](#getting-started-local-development)
4. [Project structure](#project-structure)
5. [How the content layer works](#how-the-content-layer-works)
6. [Updating your portfolio](#updating-your-portfolio)
7. [Deploying to GitHub Pages (one-time setup)](#deploying-to-github-pages-one-time-setup)
8. [Personalising metadata and SEO](#personalising-metadata-and-seo)
9. [Adding a custom domain](#adding-a-custom-domain)
10. [Design decisions](#design-decisions)
11. [Troubleshooting](#troubleshooting)
12. [License](#license)

---

## Stack overview

| Layer        | Technology                                          |
| ------------ | --------------------------------------------------- |
| Framework    | Next.js 14.2 (App Router, `output: 'export'`)        |
| Styling      | Tailwind CSS v3                                     |
| Animation    | Framer Motion 11 (spring physics, staggered reveal) |
| Fonts        | Inter + JetBrains Mono (`next/font/google`)         |
| Content      | **`data.json`** — single source of truth            |
| Type safety  | TypeScript (strict mode)                            |
| CI/CD        | GitHub Actions → GitHub Pages                       |

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

| Tool    | Minimum version | Check command         |
| ------- | --------------- | --------------------- |
| Node.js | 18.17+          | `node -v`             |
| npm     | 9+              | `npm -v`              |
| Git     | 2.30+           | `git --version`       |

> **Recommended:** Use Node.js **20 LTS** or later. The GitHub Actions
> workflow uses Node 20.

---

## Getting started (local development)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies

```bash
npm install
```

This creates `node_modules/` and generates `package-lock.json`.

> **Important:** `package-lock.json` **must** be committed to Git.
> The CI pipeline uses `npm ci`, which requires it. Without it, your
> GitHub Actions build will fail.

### 3. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. The dev server hot-reloads
whenever you save a file — edits to `data.json`, components, or CSS are
reflected instantly.

### 4. Build locally (optional, for testing)

```bash
npm run build
```

This runs the full Next.js static export and outputs the site to the `./out/`
directory. You can serve it locally with:

```bash
npx serve out
```

### 5. Type-check (optional)

```bash
npx tsc --noEmit
```

Runs the TypeScript compiler without emitting files — catches type errors
across the entire project.

---

## Project structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: build → deploy to Pages
├── .vscode/
│   └── settings.json               # Suppresses false Tailwind CSS warnings
├── app/
│   ├── globals.css                 # Tailwind base + typographic utilities
│   ├── layout.tsx                  # Root layout: fonts, metadata, JSON-LD
│   └── page.tsx                    # Main page: reads data.json at build time
├── components/
│   ├── AnimatedSection.tsx         # Framer Motion wrappers (container + item)
│   ├── Header.tsx                  # Name, tagline, links
│   ├── About.tsx                   # Professional summary
│   ├── Education.tsx               # Academic credentials
│   ├── Experience.tsx              # Work / open-source experience
│   ├── Projects.tsx                # Technical projects with hover effects
│   ├── Skills.tsx                  # Categorised skill tags
│   ├── Achievements.tsx            # Numbered achievement list
│   ├── CurrentLearnings.tsx        # Currently exploring section
│   └── Footer.tsx                  # Copyright + tech credit
├── public/
│   ├── .nojekyll                   # Tells GitHub Pages to skip Jekyll
│   └── robots.txt                  # Search engine crawl permissions
├── types/
│   └── portfolio.ts                # TypeScript interfaces for data.json
├── data.json                       # ← ALL portfolio content lives here
├── next.config.mjs                 # Static export + basePath for Pages
├── tailwind.config.ts              # Font families, custom colours
├── postcss.config.mjs              # PostCSS: Tailwind + Autoprefixer
├── tsconfig.json                   # TypeScript strict config
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Lockfile (MUST be committed)
└── .gitignore                      # Excludes node_modules, .next, out
```

---

## How the content layer works

```
┌──────────────┐     git push     ┌────────────────┐     npm run build
│  data.json   │ ───────────────▶ │  GitHub Actions │ ──────────────────▶
│  (your edits)│                  │  (triggered)    │
└──────────────┘                  └────────────────┘
                                                          │
                                          ┌───────────────┘
                                          ▼
                                  ┌────────────────┐
                                  │  Next.js reads  │
                                  │  data.json via  │
                                  │  fs.readFileSync│
                                  └───────┬────────┘
                                          │
                                          ▼
                                  ┌────────────────┐     deploy
                                  │ Static HTML/CSS│ ──────────▶  GitHub Pages
                                  │ in ./out/      │             (global CDN)
                                  └────────────────┘
```

- **No database.** No CMS. No API.
- `data.json` is read at **build time** via Node.js `fs` in a React Server
  Component (`app/page.tsx`). The file system call never runs in the browser.
- The result is pure static HTML + CSS + minimal JS (for Framer Motion
  animations only).

---

## Updating your portfolio

### Edit content

All portfolio content lives in **one file**: `data.json`.

| What to change              | Where in `data.json`            |
| --------------------------- | ------------------------------- |
| Your name / email / links   | `personal_information`          |
| Bio paragraph               | `professional_summary`          |
| Degrees                     | `academic_education[]`          |
| Jobs / open-source roles    | `professional_experience[]`     |
| Projects                    | `technical_projects[]`          |
| Programming languages, etc. | `technical_skills.languages` …  |
| Awards, ratings, rankings   | `key_achievements[]`            |
| What you're learning now    | `current_learnings[]`           |

### Commit and push

```bash
git add data.json
git commit -m "feat: add new project — My Cool Project"
git push
```

The GitHub Actions workflow fires automatically. Within ~60–90 seconds your
live site is updated. Zero manual deployment steps.

### `data.json` schema reference

```jsonc
{
  "personal_information": {
    "name": "string",
    "email": "string",
    "location": "string",
    "github": "string (URL)",
    "linkedin": "string (URL)",
    "leetcode": "string (URL, optional)"
  },
  "professional_summary": "string (one paragraph)",
  "academic_education": [
    {
      "institution": "string",
      "location": "string",
      "degree": "string",
      "major": "string",
      "minor": "string (optional)",
      "start_date": "string",
      "end_date": "string",
      "cgpa": "string"
    }
  ],
  "professional_experience": [
    {
      "organization": "string",
      "role": "string",
      "type": "string",
      "start_date": "string",
      "end_date": "string",
      "contributions": ["string"]
    }
  ],
  "technical_projects": [
    {
      "title": "string",
      "status": "string",
      "stack": ["string"],
      "description": ["string"]
    }
  ],
  "technical_skills": {
    "languages": ["string"],
    "concepts": ["string"],
    "frameworks": ["string"],
    "tools": ["string"]
  },
  "key_achievements": ["string"],
  "current_learnings": ["string"]
}
```

---

## Deploying to GitHub Pages (one-time setup)

### Step 1 — Create a GitHub repository

1. Go to https://github.com/new
2. Name it (e.g. `portfolio`)
3. Set visibility to **Public** (required for free GitHub Pages)
4. Do **not** initialise with a README (you already have one)

### Step 2 — Push your code

```bash
cd /path/to/portfolio

# Initialise git (skip if already done)
git init
git add .
git commit -m "feat: initial portfolio"

# Link to your GitHub repo
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

> **Critical:** Make sure `package-lock.json` is committed. The CI runs
> `npm ci` which requires it. If you see it in `.gitignore`, remove that line.

### Step 3 — Enable GitHub Pages via Actions

1. Open your repository on GitHub
2. Click **Settings** (top bar)
3. Click **Pages** (left sidebar, under "Code and automation")
4. Under **Build and deployment → Source**, select **GitHub Actions**
5. Click **Save**

### Step 4 — Verify the deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for the green checkmark (typically 60–90 seconds)
4. Your site is now live at:

```
https://<your-username>.github.io/<repo-name>/
```

### What happens on each `git push`

1. GitHub Actions checks out the latest code
2. Installs dependencies with `npm ci`
3. Runs `npm run build` (Next.js static export → `./out/`)
4. Automatically sets `basePath` to `/<repo-name>` so all asset URLs resolve
5. Uploads `./out/` as a Pages artifact
6. Deploys to GitHub Pages global CDN
7. Atomically swaps the old version with the new one (zero downtime)

---

## Personalising metadata and SEO

### `app/layout.tsx` — things to update

1. **`metadata` object** — Update `title`, `description`, `authors`, and
   `openGraph` / `twitter` fields with your real name and bio.

2. **`jsonLd` object** — Update `name`, `url`, `email`, and `sameAs` array
   with your actual GitHub/LinkedIn profile URLs. This is the structured data
   that search engines use to understand who you are.

3. **Favicon** — Drop a `favicon.ico` or `icon.png` into the `app/` directory.
   Next.js will pick it up automatically via the App Router metadata convention.

### `public/robots.txt`

Uncomment and update the `Sitemap:` line with your actual deployed URL:

```
Sitemap: https://yourusername.github.io/portfolio/sitemap.xml
```

---

## Adding a custom domain

If you own a domain (e.g. `yourname.dev`):

1. Create a file `public/CNAME` containing just your domain:
   ```
   yourname.dev
   ```

2. In `.github/workflows/deploy.yml`, change the `NEXT_PUBLIC_BASE_PATH` line
   to an empty string:
   ```yaml
   env:
     NEXT_PUBLIC_BASE_PATH: ''
   ```
   (Since the site will be at the root of a custom domain, no basePath is needed.)

3. Configure your DNS:
   - **A records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME record** pointing to `<your-username>.github.io`

4. In GitHub repository **Settings → Pages**, enter your custom domain and
   check "Enforce HTTPS".

---

## Design decisions

| Decision | Rationale |
| --- | --- |
| Zero images | Typography is the entire UI; forces content quality |
| `#080808` background | True-black adjacent; reduces halation vs pure `#000` |
| `neutral-300` body text | Counteracts light-on-dark glare on OLED screens |
| `font-mono` for metadata | Subconsciously signals code-editor aesthetic |
| Framer Motion springs (`stiffness: 100, damping: 20`) | Snappy, weighty feel; never cartoonish |
| `max-w-3xl` content width | 65–75 chars/line — optimal reading comprehension |
| Custom `::selection` | White bg + black text preserve the monochrome illusion |
| `staggerChildren: 0.12` | Sections cascade in sequentially on page load |
| Static export (`output: 'export'`) | No server needed; pure CDN delivery |

---

## Troubleshooting

### Build fails in GitHub Actions with "`npm ci` can only install with an existing lockfile"

**Cause:** `package-lock.json` is not committed to Git.

**Fix:**
```bash
git add package-lock.json
git commit -m "chore: add package-lock.json"
git push
```

### Site loads but all assets (CSS/JS) are 404

**Cause:** `basePath` mismatch. The site is served at
`username.github.io/repo-name/` but the asset URLs don't include `/repo-name/`.

**Fix:** The GitHub Actions workflow automatically sets
`NEXT_PUBLIC_BASE_PATH=/<repo-name>`. If you renamed the repo, re-push to
trigger a fresh build, or manually set the env var.

### VS Code shows "Unknown at rule @tailwind" CSS warnings

**Not a real error.** These are VS Code's built-in CSS validator not
understanding Tailwind directives. The `.vscode/settings.json` file in this
project disables the CSS validator and uses the Tailwind CSS IntelliSense
extension instead.

**Recommended VS Code extension:** [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### `_next/` directory returns 404 on GitHub Pages

**Cause:** GitHub Pages runs Jekyll by default, which ignores directories
starting with `_`.

**Fix:** The `public/.nojekyll` file tells GitHub Pages to skip Jekyll
processing. It's already included in this project. If somehow missing,
create an empty file:
```bash
touch public/.nojekyll
```

### `Bus error (core dumped)` when running `npm run dev` or `npm run build`

**Cause:** Next.js 15+ ships SWC compiler binaries that are incompatible
with Node.js 18.x on certain Linux systems, producing a SIGBUS crash.

**Fix:** This project uses **Next.js 14.2** specifically to avoid this issue.
If you accidentally upgrade to Next.js 15+, either:
- Downgrade: `npm install next@14.2.21`
- Or upgrade Node.js to **20 LTS** or later: `nvm install 20 && nvm use 20`

### Local dev server works but `npm run build` fails with memory errors

**Cause:** Next.js build can be memory-intensive.

**Fix:**
```bash
NODE_OPTIONS='--max-old-space-size=4096' npm run build
```

### Animations feel janky on mobile

**Cause:** Framer Motion spring animations can be computationally
expensive on low-end devices.

**Fix:** In `components/AnimatedSection.tsx`, you can simplify the variants:
```tsx
export const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}
```

---

## Available npm scripts

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start local development server (http://localhost:3000) |
| `npm run build`   | Static export → `./out/` directory                |
| `npm run start`   | Start production server (not used for static)     |
| `npm run lint`    | Run Next.js ESLint checks                         |
| `npx tsc --noEmit`| Type-check without building                       |

---

## License

MIT — use the code however you like. Replace the content in `data.json` with
your own information before deploying.
