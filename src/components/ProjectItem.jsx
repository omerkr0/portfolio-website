import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

function ProjectItem({ project, isReversed }) {
  return (
    <div
      className={`flex flex-col lg:flex-row ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } mt-5`}
    >
      <div className="lg:w-1/2 lg:mx-auto flex items-center justify-center mt-2">
        <img
          className="h-64 w-96 object-cover rounded-2xl shadow-slate-600 shadow-lg"
          src={project.image}
          alt={project.name}
        />
      </div>
      <div className="lg:w-1/2 lg:mx-auto flex flex-col justify-center items-center text-center">
        <h3 className="text-xl font-semibold my-4"> {project.name} </h3>
        <p className="text-gray-600 mb-2 w-3/4  md:w-10/12">
          {project.description}
        </p>
        <p className="font-semibold mb-4">{project.tech}</p>
        <div>
          <a href={project.github} target="_blank" rel="noopener  noreferrer">
            <button
              className="bg-white hover:bg-slate-300 border-2 border-gray-900 hover:border-gray-600 border-solid rounded-md shadow-gray-700 shadow-sm hover:shadow-lg hover:shadow-gray-700 text-center w-32 h-11 font-semibold"
              type="button"
            >
              <div className="flex items-center justify-center">
                Github
                <FaGithub className="mx-1" />
              </div>
            </button>
          </a>
          <a href={project.live} target="_blank" rel="noopener  noreferrer">
            <button
              className="bg-white hover:bg-slate-300 border-2 border-gray-900 hover:border-gray-600 border-solid rounded-md shadow-gray-700 shadow-sm hover:shadow-lg hover:shadow-gray-700 text-center w-28 h-11 ml-2 font-semibold"
              type="button"
            >
              <div className="flex items-center justify-center">
                Live
                <FaExternalLinkAlt className="mx-1" />
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
