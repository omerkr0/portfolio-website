import ProjectItem from './ProjectItem'
import LoadMore from './LoadMore'
import { useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'

function Projects() {
  const { projects } = useContext(PortfolioContext)

  return (
    <div id="projects" className="my-28">
      <div className="container mx-auto px-4 md:px-10">
        <h1 className="text-xl font-bold mb-10 text-center lg:text-start lg:mx-12 xl:mx-28">
          PROJECTS
        </h1>
        <div className="">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
        <LoadMore />
      </div>
    </div>
  )
}

export default Projects
