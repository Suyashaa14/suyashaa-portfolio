import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="hero" className="h-screen w-full relative overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4"
      >
        <h1 className="text-6xl font-bold text-white mb-4">Hi, I’m <span className="text-blue-400">Suyashaa</span></h1>
        <p className="text-xl max-w-2xl text-gray-300">Frontend Developer building stunning, user-focused web experiences with React & TypeScript.</p>
      </motion.div>
    </section>
  )
}

export default Hero