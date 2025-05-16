import { motion } from 'framer-motion'

const skills = {
  'Languages & Styling': ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  'Frameworks & Libraries': ['React.js', 'Redux Toolkit', 'Context API', 'Node.js', 'Express.js', 'Nest.js'],
  'Tools & Platforms': ['Firebase', 'Agora SDK', 'MySQL', 'Git/GitHub', 'Figma'],
  'Soft Skills': ['Teamwork', 'Problem-solving', 'Time management', 'Adaptability']
}

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              className="bg-gray-800 p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-400">{category}</h3>
              <ul className="space-y-1 text-gray-300">
                {items.map((skill) => (
                  <li key={skill} className="before:content-['✔'] before:text-blue-400 before:mr-2">{skill}</li>
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