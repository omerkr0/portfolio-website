#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import process from 'process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'omerkr0'
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/projects.json')
const PREFERRED_TECH = ['React', 'Next.js', 'Go', 'Node.js', 'Tailwind CSS', 'SQLite', 'PostgreSQL', 'TypeScript']

const buildOpenGraphImage = (slug) =>
  slug ? `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${slug}` : '/assets/projects/placeholder.svg'

const formatProjectTitle = (value = '') =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())

const extractTechnologies = (repo) => {
  const techSet = new Set()
  const baseKeywords = [repo.language, repo.description, repo.name, ...(repo.topics || [])]
    .join(' ')
    .toLowerCase()

  const mappings = [
    { label: 'React', keywords: ['react'] },
    { label: 'Next.js', keywords: ['next'] },
    { label: 'TypeScript', keywords: ['typescript', 'ts'] },
    { label: 'JavaScript', keywords: ['javascript'] },
    { label: 'Go', keywords: ['golang', ' go '] },
    { label: 'Node.js', keywords: ['node', 'express', 'nestjs'] },
    { label: 'Tailwind CSS', keywords: ['tailwind'] },
    { label: 'PostgreSQL', keywords: ['postgres', 'postgresql'] },
    { label: 'SQLite', keywords: ['sqlite'] },
    { label: 'Prisma', keywords: ['prisma'] },
    { label: 'Docker', keywords: ['docker'] },
    { label: 'GraphQL', keywords: ['graphql', 'apollo'] },
    { label: 'Redux', keywords: ['redux'] },
    { label: 'REST', keywords: ['rest', 'api'] },
  ]

  mappings.forEach(({ label, keywords }) => {
    if (keywords.some((keyword) => baseKeywords.includes(keyword))) {
      techSet.add(label)
    }
  })

  if (repo.language) {
    techSet.add(repo.language)
  }

  return Array.from(techSet)
}

const inferCategory = (technologies) => {
  const tech = technologies.map((item) => item.toLowerCase())

  if (tech.some((value) => value.includes('next'))) {
    return 'Full-Stack / Next.js'
  }

  if (tech.some((value) => value.includes('react'))) {
    return 'Frontend / React'
  }

  if (tech.some((value) => value.includes('go')) || tech.some((value) => value.includes('node'))) {
    return 'Backend / Go & Node'
  }

  if (tech.some((value) => value.includes('tailwind')) || tech.some((value) => value.includes('ui'))) {
    return 'UI/UX Odaklı'
  }

  return 'Featured'
}

const computeProjectScore = ({ stars = 0, updatedAt, technologies }) => {
  const starScore = stars * 2
  const techMatch = technologies.filter((tech) => PREFERRED_TECH.includes(tech)).length * 10

  let recencyScore = 0

  if (updatedAt) {
    const daysSinceUpdate = Math.abs((Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24))
    recencyScore = Math.max(0, 120 - daysSinceUpdate)
  }

  return starScore + techMatch + recencyScore
}

const loadFallback = async () => {
  try {
    const raw = await fs.readFile(OUTPUT_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch (error) {
    return []
  }
}

const normaliseProject = (project, index = 0) => {
  const slug = project.slug || project.id || `project-${index}`
  const title = project.title || formatProjectTitle(slug)

  return {
    id: slug,
    slug,
    title,
    summary: project.summary || '',
    category: project.category || 'Featured',
    technologies: project.technologies || [],
    githubUrl: project.githubUrl || `https://github.com/${GITHUB_USERNAME}/${slug}`,
    liveUrl: project.liveUrl || null,
    image: project.image || buildOpenGraphImage(slug),
    imageAlt: project.imageAlt || `${title} cover image`,
    stars: project.stars ?? 0,
    updatedAt: project.updatedAt || null,
  }
}

const run = async () => {
  const fallback = await loadFallback()
  const fallbackMap = new Map(fallback.map((project, index) => [project.slug || `project-${index}`, project]))

  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-projects-fetcher-script',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`)
  }

  const repos = await response.json()

  const candidates = repos
    .filter((repo) => !repo.fork && !repo.archived)
    .map((repo) => {
      const technologies = extractTechnologies(repo)
      const category = inferCategory(technologies)

      const baseProject = {
        slug: repo.name,
        title: formatProjectTitle(repo.name),
        summary: repo.description || '',
        category,
        technologies,
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || null,
        image: buildOpenGraphImage(repo.name),
        imageAlt: `${formatProjectTitle(repo.name)} GitHub cover image`,
        stars: repo.stargazers_count || 0,
        updatedAt: repo.pushed_at || repo.updated_at || null,
      }

      return {
        ...baseProject,
        score: computeProjectScore(baseProject),
      }
    })
    .filter((project, index, self) => index === self.findIndex((item) => item.slug === project.slug))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }

      if (b.stars !== a.stars) {
        return b.stars - a.stars
      }

      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
    })

  const MIN_VISIBLE_PROJECTS = 6
  const selection = candidates.slice(0, Math.max(MIN_VISIBLE_PROJECTS, candidates.length))

  const merged = selection.map((project, index) => {
    const fallbackProject = fallbackMap.get(project.slug)

    const combined = normaliseProject(
      {
        ...fallbackProject,
        ...project,
        technologies:
          project.technologies && project.technologies.length
            ? project.technologies
            : fallbackProject?.technologies || [],
        category: fallbackProject?.category || project.category,
        summary: project.summary || fallbackProject?.summary || '',
        image: fallbackProject?.image || project.image,
        imageAlt: fallbackProject?.imageAlt || project.imageAlt,
      },
      index
    )

    return {
      ...combined,
      score: computeProjectScore(combined),
    }
  })

  if (merged.length < MIN_VISIBLE_PROJECTS) {
    fallback
      .filter((project) => !merged.some((item) => item.slug === project.slug))
      .slice(0, MIN_VISIBLE_PROJECTS - merged.length)
      .forEach((project) => {
        merged.push({ ...normaliseProject(project, merged.length), score: computeProjectScore(project) })
      })
  }

  const sanitized = merged.map(({ score, ...project }) => project)

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(sanitized, null, 2)}\n`, 'utf-8')
  console.log(`Updated ${OUTPUT_PATH} with ${sanitized.length} projects.`)
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
