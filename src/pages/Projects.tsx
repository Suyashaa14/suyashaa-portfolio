// === src/pages/Projects.tsx ===
import { motion } from 'framer-motion'
import { FaShoppingCart, FaVideo, FaGraduationCap, FaMapMarkedAlt, FaChartLine } from 'react-icons/fa'
import { SectionTitle } from '../components/SectionTitle '

const projects = [
  {
    icon: <FaVideo className="text-blue-400 text-2xl" />,
    title: 'Communication Management System',
    stack: ['React.js', 'TypeScript', 'Agora SDK', 'Firebase'],
    description: 'Real-time chat and video/audio calling platform with responsive and scalable UI.'
  },
  {
    icon: <FaMapMarkedAlt className="text-blue-400 text-2xl" />,
    title: 'Logistics & Transport Management System',
    stack: ['React.js', 'TypeScript'],
    description: 'Platform for real-time shipment tracking with Google Maps integration.'
  },
  {
    icon: <FaGraduationCap className="text-blue-400 text-2xl" />,
    title: 'Learning Portal',
    stack: ['React.js', 'TypeScript', 'Nest.js', 'WordPress'],
    description: 'Educational system with course modules, authentication, and instructor dashboards.'
  },
  {
    icon: <FaChartLine className="text-blue-400 text-2xl" />,
    title: 'Movie Recommendation System',
    stack: ['React.js', 'Nest.js', 'Python'],
    description: 'A recommendation engine suggesting movies based on user preferences and ratings.'
  },
  {
    icon: <FaShoppingCart className="text-blue-400 text-2xl" />,
    title: 'Online Bakery Management System',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    description: 'E-commerce platform for bakery items with order tracking and admin panel.'
  },
  {
    icon: <FaShoppingCart className="text-blue-400 text-2xl" />,
    title: 'Custom E-Commerce Platform',
    stack: ['React.js', 'TypeScript', 'Redux Toolkit', 'Firebase'],
    description: 'Developed for a local brand to manage products, track orders, and process payments securely.'
  }
]

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto text-center">
         <SectionTitle>Projects</SectionTitle>
        {/* <h2 className="text-4xl font-bold mb-6 text-center border-b border-blue-400 inline-block pb-2">Projects</h2> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-3">
                {project.icon}
                <h3 className="text-xl font-semibold text-blue-300">{project.title}</h3>
              </div>
              <p className="text-sm text-gray-300 mb-2">{project.description}</p>
              <div className="text-xs text-gray-400">{project.stack.join(', ')}</div>
              <div className="text-sm text-gray-500 italic mt-2">* Private deployment – developed for client use</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects