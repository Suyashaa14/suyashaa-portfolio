// === src/pages/Skills.tsx ===
import { motion } from 'framer-motion'
import React from 'react'
import { FaCode, FaCogs, FaProjectDiagram, FaUserFriends } from 'react-icons/fa'
import { SectionTitle } from '../components/SectionTitle '

const skills = [
  {
    icon: <FaCode className="text-blue-500 text-2xl" />,
    title: 'Languages & Styling',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap']
  },
  {
    icon: <FaProjectDiagram className="text-blue-500 text-2xl" />,
    title: 'Frameworks & Libraries',
    items: ['React.js', 'Redux Toolkit', 'Context API', 'Node.js', 'Express.js', 'Nest.js', 'Three.js']
  },
  {
    icon: <FaCogs className="text-blue-500 text-2xl" />,
    title: 'Tools & Platforms',
    items: ['Firebase', 'Agora SDK', 'MySQL', 'Git (GitHub/Bitbucket)', 'Figma', 'Trello', 'Jira']
  },
  {
    icon: <FaUserFriends className="text-blue-500 text-2xl" />,
    title: 'Soft Skills',
    items: ['Team Collaboration', 'Analytical Thinking', 'Time Management', 'Adaptability']
  }
]

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <SectionTitle>Tech Stack & Skills</SectionTitle>
        {/* <h2 className="text-4xl font-bold mb-4 border-b-2 border-blue-400 inline-block">Tech Stack & Skills</h2> */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
          A comprehensive blend of modern technologies and soft skills enabling me to build scalable, user-first web applications.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skills.map(({ title, items, icon }, index) => (
            <motion.div
              key={title}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-blue-400 transition duration-300 text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="text-2xl font-semibold text-blue-300">{title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="bg-blue-500/10 border border-blue-500 text-blue-300 text-sm px-3 py-1 rounded-full hover:bg-blue-500/20 transition"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
