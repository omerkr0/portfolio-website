import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'

function LoadMore() {
  const { handleLoadMore, loading } = useContext(PortfolioContext)

  return (
    <button
      type="button"
      onClick={handleLoadMore}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-sky-400 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-sky-500 dark:hover:text-sky-400"
    >
      {loading ? 'Loading…' : 'Load more'}
    </button>
  )
}

export default LoadMore
