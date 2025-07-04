
import {  FaBriefcase, FaGraduationCap, FaLaptopCode } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle '

const experiences = [
  {
    icon: <FaBriefcase className="text-blue-400 text-3xl" />,
    title: 'Cellapp Thapathali',
    date: 'Feb 2025 – Present',
    details: [
      'Led frontend for a real-time communication and booking platform.',
      'Integrated Agora SDK and Firebase for seamless calls and live chat.',
      'Implemented secure, intuitive multi-payment gateway support.',
    ]
  },
  {
    icon: <FaLaptopCode className="text-blue-400 text-3xl" />,
    title: 'Freelance Web Developer & UI/UX Consultant',
    date: 'July 2024 – Jan 2025',
    details: [
      'Designed and launched interactive websites for non-profits, including a Children’s Home website with a donation portal and activity gallery.',
      'Built custom e-commerce platforms for small businesses using Wix, tailored for bakery shops and clothing stores with integrated payment systems.',
      'Created dynamic blog websites for food, travel, and company product showcases with SEO-optimized content.',
      'Collaborated directly with clients to plan, architect, and execute full project lifecycles—from wireframes in Figma to deployment.',
      'Provided UI/UX consultations and software architecture strategies to streamline user flow and maximize impact.'
    ]
  },
  {
    icon: <FaBriefcase className="text-blue-400 text-3xl" />,
    title: 'Wolfmatrix Pvt. Ltd.',
    date: 'June 2022 – June 2024',
    details: [
      'Led frontend development for logistics and order-tracking platforms.',
      'Transformed legacy systems with modern React and WordPress architecture.',
      'Built full-stack features using React, Node.js, and MySQL with API integration.'
    ]
  },
  {
    icon: <FaGraduationCap className="text-blue-400 text-3xl" />,
    title: 'Bachelor of Computer Application',
    date: '2018 – 2023',
    details: ['National College, Kathmandu', 'GPA: 3.49/4.0']
  }
]

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <SectionTitle>Experience & Education</SectionTitle>
        {/* <h2 className="text-4xl font-bold mb-10 text-center border-b border-blue-400 inline-block pb-2">Experience & Education</h2> */}
        <div className="space-y-10 mt-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="flex items-start space-x-6 bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mt-1">{exp.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-blue-300">{exp.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{exp.date}</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {exp.details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
