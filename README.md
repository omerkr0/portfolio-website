# Portfolio Website

A personal portfolio built with Vite + React and Tailwind CSS. The projects section now sources featured repositories
from [github.com/omerkr0](https://github.com/omerkr0) and falls back to a curated list when the GitHub API is not
reachable.

## Getting started

```bash
npm install
npm run dev
```

## Managing the projects data

Project metadata lives in [`src/data/projects.json`](src/data/projects.json). Each entry includes:

- `slug`: GitHub repository name (used to build links and Open Graph images)
- `title`: Human readable project name
- `summary`: 1–2 sentence description shown on the card
- `category`: Display group (e.g. `Frontend / React`)
- `technologies`: Badge labels for the stack
- `githubUrl` / `liveUrl`: Primary links for the CTA buttons
- `image`: Thumbnail path or URL (default is the GitHub Open Graph preview)

### Auto-updating from GitHub

Use the helper script to fetch the latest repositories and update the JSON file with the most relevant entries (sorted by
stars, last activity, and tech stack match):

```bash
npm run update:projects
```

The command calls the GitHub REST API. To avoid hitting anonymous rate limits, export a personal access token before
running the script:

```bash
export GITHUB_TOKEN="ghp_your_token_here"
# Optionally switch to another account
export GITHUB_USERNAME="omerkr0"
npm run update:projects
```

After the script completes, commit the updated `projects.json` file. Manual edits are also welcome — the script preserves
custom titles, descriptions, badges, and thumbnails when it finds matching slugs.

## Notes

- The Projects grid is fully responsive and supports both light and dark themes.
- Images are lazy-loaded and include descriptive alt text for accessibility.
- A “Load more” button appears automatically when additional projects are available.
