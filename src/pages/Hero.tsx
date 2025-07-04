// === src/pages/Hero.tsx ===
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="hero" className="h-screen w-full relative overflow-hidden">
      {/* 3D Starfield Background */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>

      {/* Foreground Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4 z-10"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Hi, I’m <span className="text-blue-400">Suyashaa</span>
        </motion.h1>
        <motion.p
          className="text-base md:text-xl max-w-2xl text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Frontend Developer building stunning, user-focused web experiences using modern technologies like React, TypeScript & Three.js.
        </motion.p>
        <motion.a
          href="#projects"
          className="mt-10 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          View My Work
        </motion.a>
      </motion.div>

      {/* Overlay gradient for better text contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 to-transparent z-0" />
    </section>
  )
}

export default Hero