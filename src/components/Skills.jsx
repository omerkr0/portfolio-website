import { FaBootstrap, FaCss3, FaHtml5, FaJs, FaReact } from 'react-icons/fa'

function Skills() {
  const skillsList = [
    { id: 1, title: 'HTML', icon: <FaHtml5 className="text-red-500" /> },
    { id: 2, title: 'CSS', icon: <FaCss3 className="text-blue-500" /> },
    { id: 3, title: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
    { id: 4, title: 'React', icon: <FaReact className="text-blue-600" /> },
    { id: 5,title: 'Bootstrap',icon: <FaBootstrap className="text-purple-600" /> }
  ]

  return (
    <div id='skills' className="container mx-auto mt-32 text-center">
      <h2 className="text-2xl font-semibold mb-14">Skills</h2>
      <div className="grid grid-cols-5  midlarge:mx-56 sm:mx-10 gap-0.5 sm:gap-4 ">
        {skillsList.map((skill) => (
          <div key={skill.id} className="flex flex-col items-center">
            <div className="lg:text-4xl md:text-3xl sm:text-2xl text-2xl">
              {skill.icon}
            </div>
            <div className="mt-3 font-semibold">{skill.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
