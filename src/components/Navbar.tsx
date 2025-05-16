import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 fixed w-full z-50">
      <h1 className="text-xl font-bold">Suyashaa.dev</h1>
      <ul className="flex space-x-6">
        {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className="hover:text-blue-400 transition">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
