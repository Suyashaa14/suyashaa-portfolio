import { motion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle '

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* <h2 className="text-4xl font-bold mb-6 border-b border-blue-400 inline-block">About Me</h2> */}
         <SectionTitle>About Me</SectionTitle>
        <p className="text-lg leading-8 text-gray-300">
          I’m a frontend developer with over 2 years of experience in building responsive and interactive web
          applications. With React.js, TypeScript, and Three.js, I create clean UIs and fast, engaging user experiences.
          I also work with backend systems like Node.js and MySQL, integrating real-time features using Firebase and Agora.
        </p>
      </motion.div>
    </section>
  )
}

export default About