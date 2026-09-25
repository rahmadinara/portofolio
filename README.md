# Rahma Dinara Safia Ardianti — Technical Portfolio

A static personal portfolio for GitHub Pages.

This version intentionally combines:

- **Porto-1 content structure:** Home, About, Skills, Projects, Technical Labs, Experience, Certifications, Achievements, Courses & Badges, Organizations, Contact, plus individual project case-study pages.
- **Porto-2 visual direction:** technical dark-grid interface, terminal-style hero, compact infrastructure cards, monospace labels, architecture-oriented visual hierarchy, and responsive technical UI.

## Career Focus

Internet Engineering Student | Aspiring Cloud Engineer & System Administrator

Core story:

**Network Engineering → Linux & System Administration → Cloud Infrastructure**

## Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts: Roboto + Fira Code
- No backend
- No Node.js requirement
- No API keys / secrets

## Structure

```text
Rahma_Dinara_Web_Portfolio/
├── index.html
├── README.md
├── favicon.svg
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── cv/Rahma-Dinara-Safia-Ardianti-CV.pdf
│   └── images/
│       ├── profile/
│       ├── projects/
│       ├── certifications/
│       └── courses/
├── projects/
│   ├── boxguardai.html
│   ├── smart-agro-melon.html
│   ├── aeris-gama.html
│   └── project-template.html
└── docs/
    ├── labs/
    └── projects/
```

## Run Locally

From the project root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Add a New Project Manually

1. Duplicate `projects/project-template.html`.
2. Rename the copy, e.g. `projects/my-project.html`.
3. Replace every `TODO:` with verified project information.
4. Add a project card to the `#projects` section in `index.html`.
5. Use only confirmed technology, role, result, repository, and documentation data.

## Add Technical Lab Documentation

1. Save the PDF under `docs/labs/`.
2. Duplicate the commented lab item template in `index.html`.
3. Add the correct `data-category`, title, environment, technologies, and PDF path.
4. Do not list a lab as professional experience.

## Add Courses & Badges

The current course section is intentionally a placeholder because no verified course/badge list has been supplied yet. Replace it only with confirmed records.

## GitHub Pages Deployment

```bash
git init
git add .
git commit -m "Initial technical portfolio"
git branch -M main
git remote add origin <REPOSITORY_URL>
git push -u origin main
```

Then in GitHub:

1. Repository → **Settings**
2. **Pages**
3. Source: **Deploy from a branch**
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

All local paths in this project are relative and GitHub Pages compatible.

## Update Workflow

```bash
git status
git add .
git commit -m "Update portfolio"
git push
```

## Content Rules

- Accuracy over visual impact.
- No fabricated technology, achievements, credentials, dates, or results.
- Academic/lab work stays labeled as academic/lab work.
- Cloud Engineer and System Administrator are career directions, not overstated current job titles.
- IoT is supporting technical experience, not the portfolio's primary career identity.
