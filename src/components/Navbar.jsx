import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { Link, animateScroll as scroll } from 'react-scroll'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleScrollTop = () => {
    scroll.scrollToTop({
      duration: 1000,
      delay: 0,
      smooth: 'true',
    })
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white shadow p-4 flex flex-wrap items-center justify-between px-14 font-semibold">
      <div className="flex items-center flex-shrink-0 mr-6">
        <p className='text-xl'>Omer.dev</p>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-gray-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <FaBars />
        </button>
      </div>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="text-sm lg:flex-grow lg:flex lg:justify-end">
          <li>
            <Link
              onClick={handleScrollTop}
              className="block mt-4 lg:inline-block lg:mt-0 px-3 py-2 border-spacing-0 rounded-lg text-black hover:text-white hover:bg-gray-600 mr-4"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="about"
              smooth={true}
              className="block mt-4 lg:inline-block lg:mt-0 px-3 py-2 border-spacing-0 rounded-lg text-black hover:text-white hover:bg-gray-600 mr-4"
            >
              About me
            </Link>
          </li>
          <li>
            <Link
              to="skills"
              smooth={true}
              className="block mt-4 lg:inline-block lg:mt-0 px-3 py-2 border-spacing-0 rounded-lg text-black hover:text-white hover:bg-gray-600 mr-4"
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="projects"
              smooth={true}
              className="block mt-4 lg:inline-block lg:mt-0 px-3 py-2 border-spacing-0 rounded-lg text-black hover:text-white hover:bg-gray-600 mr-4"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth={true}
              className="block mt-4 lg:inline-block lg:mt-0 px-3 py-2 border-spacing-0 rounded-lg text-black hover:text-white hover:bg-gray-600"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
