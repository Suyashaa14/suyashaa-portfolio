import React from 'react'

const projects = [
  {
    title: 'Communication Management System',
    stack: ['React.js', 'TypeScript', 'Agora SDK', 'Firebase'],
    description: 'Real-time chat and calling platform with scalable UI.',
    link: '#'
  },
  {
    title: 'Logistics and Transport Management System',
    stack: ['React.js', 'TypeScript'],
    description: 'Track shipment requests with Google Maps integration.',
    link: '#'
  },
  {
    title: 'Learning Portal',
    stack: ['React.js', 'TypeScript', 'Nest.js', 'WordPress'],
    description: 'Educational platform with course content and login system.',
    link: '#'
  },
  {
    title: 'Movie Recommendation System',
    stack: ['React.js', 'Nest.js', 'Python'],
    description: 'Suggests movies based on user preferences.',
    link: '#'
  },
  {
    title: 'Online Bakery Management System',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    description: 'E-commerce for bakery items with ordering features.',
    link: '#'
  }
]

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{project.description}</p>
              <div className="text-xs text-gray-400 mb-2">{project.stack.join(', ')}</div>
              <a href={project.link} className="text-blue-400 hover:underline">Live Demo</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects