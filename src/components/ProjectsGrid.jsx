import { useMemo } from 'react'
import ProjectCard from './ProjectCard'

const CATEGORY_ORDER = [
  'Full-Stack / Next.js',
  'Frontend / React',
  'Backend / Go & Node',
  'UI/UX Odaklı',
  'Featured',
]

const ProjectsGrid = ({ projects, loading }) => {
  const groupedProjects = useMemo(() => {
    const groups = new Map()

    projects.forEach((project) => {
      const category = project.category || 'Featured'
      if (!groups.has(category)) {
        groups.set(category, [])
      }
      groups.get(category).push(project)
    })

    return CATEGORY_ORDER
      .map((category) => ({
        category,
        items: groups.get(category) || [],
      }))
      .filter((group) => group.items.length > 0)
  }, [projects])

  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <div
      key={`skeleton-${index}`}
      className="h-full animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-6 aspect-[4/3] w-full rounded-2xl bg-slate-200 dark:bg-slate-700" />
      <div className="mb-3 h-3 w-1/4 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="mb-2 h-5 w-3/4 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="mb-6 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700" />
      <div className="flex flex-wrap gap-2">
        <span className="h-7 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
        <span className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
        <span className="h-7 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  ))

  if (!projects.length && loading) {
    return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">{skeletonCards}</div>
  }

  return (
    <div className="space-y-16">
      {groupedProjects.map((group) => {
        const anchorId = `projects-${group.category.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`

        return (
          <section key={group.category} aria-labelledby={anchorId}>
          <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 id={anchorId} className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-300">
              {group.category}
            </h3>
            {loading && <span className="text-xs text-slate-400 dark:text-slate-500">Güncelleniyor…</span>}
          </header>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          </section>
        )
      })}
      {!groupedProjects.length && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">{skeletonCards}</div>
      )}
    </div>
  )
}

export default ProjectsGrid
