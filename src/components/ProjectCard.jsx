import { FaExternalLinkAlt, FaGithub, FaRegStar } from 'react-icons/fa'

const formatDate = (isoDate) => {
  if (!isoDate) {
    return ''
  }

  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const ProjectCard = ({ project }) => {
  const { title, summary, technologies, githubUrl, liveUrl, image, imageAlt, stars, updatedAt, category } = project
  const starLabel = `GitHub stars: ${stars}`
  const formattedDate = formatDate(updatedAt)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt={imageAlt || `${title} cover`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-7">
        <header className="space-y-2 text-left">
          {category && (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">{category}</p>
          )}
          <h3 className="text-xl font-semibold text-slate-900 transition duration-300 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
            {title}
          </h3>
          {summary && <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{summary}</p>}
        </header>

        {technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Used technologies">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition group-hover:bg-sky-50 group-hover:text-sky-700 dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-sky-900/30"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1" aria-label={starLabel} title={starLabel}>
            <FaRegStar aria-hidden="true" />
            <span>{stars}</span>
          </span>
          {formattedDate && <span>{`Updated ${formattedDate}`}</span>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} GitHub repository`}
          >
            <FaGithub aria-hidden="true" />
            GitHub
          </a>
          {liveUrl && (
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-sky-400 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-700 dark:text-white dark:hover:border-sky-500 dark:hover:text-sky-400"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo`}
            >
              <FaExternalLinkAlt aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
