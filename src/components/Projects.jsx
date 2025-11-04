import { useContext } from 'react'
import ProjectsGrid from './ProjectsGrid'
import LoadMore from './LoadMore'
import { PortfolioContext } from '../context/PortfolioContext'

function Projects() {
  const { displayedProjects, loading, error, hasMore } = useContext(PortfolioContext)

  return (
    <section id="projects" className="my-28 scroll-mt-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-10">
        <div className="mx-auto max-w-2xl text-center lg:max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">Projects</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            Selected work from GitHub and beyond
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            A living collection of shipped products, experiments, and open-source contributions that mirror my daily
            toolbox.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200"
          >
            {error}
          </div>
        )}

        <div className="mt-12">
          <ProjectsGrid projects={displayedProjects} loading={loading} />
        </div>

        <div className="mt-12 flex justify-center">{hasMore && <LoadMore />}</div>
      </div>
    </section>
  )
}

export default Projects
