import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'

function LoadMore() {
  const { handleLoadMore } = useContext(PortfolioContext)

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-white hover:bg-slate-300 border-2 border-gray-900 hover:border-gray-600 border-solid rounded-md shadow-gray-700 shadow-sm hover:shadow-lg hover:shadow-gray-700 text-center w-28 h-11 mt-10 ml-2 font-semibold"
        onClick={handleLoadMore}
      >
        Load More
      </button>
    </div>
  )
}

export default LoadMore
