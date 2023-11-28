import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import profile from '../assets/profile.jpg'

function Header() {
  return (
    <div id="home" className="container mx-auto md:mt-32 lg:mt-36 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
        <div className="w-40 h-40 lg:w-60 lg:h-60 md:mt-auto  md:w-72 md:h-48 rounded-full overflow-hidden mt-24">
          <img
            src={profile}
            alt="Profil Fotoğrafı"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:ml-8 md:mt-0 md:text-left text-center ">
          <h2 className="text-2xl md:mt-11 mt-2 font-semibold ">
            Front-End Developer 👋
          </h2>
          <p className="text-lg mt-5">
            Hi, I am Ömer Karaman, a front-end developer. <br /> I am currently
            interested in HTML, CSS, JavaScript, React, Bootstrap, Tailwind CSS
            technologies.
          </p>
          <div className="flex mt-4 space-x-4 md:justify-start  justify-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-700"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-800 hover:text-gray-700"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-500 hover:text-gray-700"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
