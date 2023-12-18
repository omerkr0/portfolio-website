import { createContext, useState } from 'react'
import { projectsData } from '../data'

const PortfolioContext = createContext()

const PortfolioContextProvider = ({ children }) => {
  const [projects, setProjects] = useState(projectsData.slice(0, 2))

  const handleLoadMore = async () => {
    setTimeout(() => {
      const currenProjects = projects.length
      const newProjects = projectsData.slice(currenProjects, currenProjects + 2)
      setProjects([...projects, ...newProjects])
    }, 1000)
  }

  const ProjectContextValue = {
    projects,
    handleLoadMore,
  }

  return (
    <PortfolioContext.Provider value={ProjectContextValue}>
      {children}
    </PortfolioContext.Provider>
  )
}

export { PortfolioContext, PortfolioContextProvider }
