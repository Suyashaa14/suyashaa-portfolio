
import  { useState } from 'react'
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

  return (
    <nav className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 fixed w-full z-50 shadow-lg transition-colors duration-300">
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <a href="#hero" className="text-xl font-bold hover:text-blue-400 transition text-inherit">
          Suyashaa.dev
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-inherit">
          <ul className="flex space-x-6">
            {links.map(link => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-blue-400 transition text-inherit"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4 text-xl">
            <a
              href="https://github.com/Suyashaa14"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 text-inherit"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/suyashaa-vaidya-469779250/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 text-inherit"
            >
              <FaLinkedin />
            </a>
            {/* <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="hover:text-blue-400 text-inherit"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button> */}
          </div>
        </div>

        {/* Mobile Toggle Icon */}
        <div
          className="md:hidden text-inherit text-2xl cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-6 space-y-6 animate-fade-in shadow-lg transition-colors duration-300">
          <ul className="flex flex-col items-center space-y-4">
            {links.map(link => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={closeMenu}
                  className="hover:text-blue-400 text-lg transition text-inherit"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-6 text-xl mt-4">
            <a
              href="https://github.com/Suyashaa14"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 text-inherit"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/suyashaa-vaidya-469779250/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 text-inherit"
            >
              <FaLinkedin />
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="hover:text-blue-400 text-inherit"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
