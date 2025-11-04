import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import fallbackProjects from '../data/projects.json'

const GITHUB_USERNAME = 'omerkr0'
const MIN_VISIBLE_PROJECTS = 6
const LOAD_MORE_STEP = 3
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

const PortfolioContext = createContext()

const PortfolioContextProvider = ({ children }) => {
  const fallbackSelection = useMemo(
    () => fallbackProjects.map((project, index) => normaliseProject(project, index)),
    []
  )

  const [projects, setProjects] = useState(() => fallbackSelection)
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(Math.max(MIN_VISIBLE_PROJECTS, LOAD_MORE_STEP), fallbackSelection.length)
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const enrichWithGithub = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const githubToken = import.meta.env?.VITE_GITHUB_TOKEN

      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'portfolio-projects-fetcher',
            ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
          },
        }
      )

      if (!response.ok) {
        throw new Error(`GitHub API yanıtı başarısız oldu: ${response.status}`)
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

      const sortedCandidates = candidates
        .sort((a, b) => {
          if (b.score !== a.score) {
            return b.score - a.score
          }

          if (b.stars !== a.stars) {
            return b.stars - a.stars
          }

          return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
        })
        .filter((project, index, self) => index === self.findIndex((item) => item.slug === project.slug))

      const selection = sortedCandidates.slice(0, Math.max(MIN_VISIBLE_PROJECTS, sortedCandidates.length))

      const fallbackMap = new Map(fallbackSelection.map((project) => [project.slug, project]))

      const mergedProjects = selection.map((project, index) => {
        const fallbackProject = fallbackMap.get(project.slug)

        const merged = normaliseProject(
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
          ...merged,
          score: computeProjectScore(merged),
        }
      })

      if (mergedProjects.length < MIN_VISIBLE_PROJECTS) {
        fallbackSelection
          .filter((project) => !mergedProjects.some((item) => item.slug === project.slug))
          .slice(0, MIN_VISIBLE_PROJECTS - mergedProjects.length)
          .forEach((project) => {
            mergedProjects.push({ ...project, score: computeProjectScore(project) })
          })
      }

      setProjects(mergedProjects)
      setVisibleCount((prev) => Math.min(Math.max(MIN_VISIBLE_PROJECTS, prev), mergedProjects.length))
      setLoading(false)
      setError(null)
    } catch (err) {
      console.error(err)
      setProjects(fallbackSelection)
      setVisibleCount((prev) => Math.min(Math.max(MIN_VISIBLE_PROJECTS, prev), fallbackSelection.length))
      setError('GitHub verileri şu anda alınamıyor. Öne çıkan projeler listeleniyor.')
      setLoading(false)
    }
  }, [fallbackSelection])

  useEffect(() => {
    enrichWithGithub()
  }, [enrichWithGithub])

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, projects.length))
  }

  const refreshProjects = enrichWithGithub

  const displayedProjects = useMemo(
    () => projects.slice(0, Math.min(visibleCount, projects.length)),
    [projects, visibleCount]
  )

  const hasMore = visibleCount < projects.length

  const value = useMemo(
    () => ({
      projects: displayedProjects,
      allProjects: projects,
      displayedProjects,
      loading,
      error,
      handleLoadMore,
      hasMore,
      refreshProjects,
    }),
    [projects, displayedProjects, loading, error, hasMore, refreshProjects]
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export { PortfolioContext, PortfolioContextProvider }
