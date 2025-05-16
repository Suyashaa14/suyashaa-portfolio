import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import Hero from './pages/Hero'
import Projects from './pages/Projects'
import Skills from './pages/Skills'

const App = () => {
  return (
    <div className="bg-gray-950 text-white font-sans">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  )
}

export default App
