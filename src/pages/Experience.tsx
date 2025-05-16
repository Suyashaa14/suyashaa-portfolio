import React from 'react'

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Experience & Education</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-300">Cellapp Thapathali (Feb 2025 – Present)</h3>
            <ul className="list-disc list-inside ml-4 text-gray-300">
              <li>Led frontend for a real-time communication and booking platform.</li>
              <li>Integrated Agora SDK and Firebase for calls and chat.</li>
              <li>Multi-payment gateway support with user-centric UI.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-300">Wolfmatrix Pvt. Ltd. (June 2022 – June 2024)</h3>
            <ul className="list-disc list-inside ml-4 text-gray-300">
              <li>Frontend dev for a logistics platform with Google Maps tracking.</li>
              <li>Modernized legacy React/WordPress projects.</li>
              <li>Built full-stack solutions with React, Node, MySQL.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-300">Bachelor of Computer Application (2018–2023)</h3>
            <p className="text-gray-400 ml-4">National College, Kathmandu, GPA: 3.49/4.0</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience