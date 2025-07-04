// === src/pages/Contact.tsx ===
import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import Popup from '../components/Popup'
import { SectionTitle } from '../components/SectionTitle '

const Contact = () => {
  const form = useRef<HTMLFormElement>(null)
  const [popupMessage, setPopupMessage] = useState<string | null>(null)
  const [popupType, setPopupType] = useState<'success' | 'error'>('success')

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.current) return

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setPopupType('success')
        setPopupMessage('Message sent successfully!')
        form.current?.reset()
        setTimeout(() => setPopupMessage(null), 3000)
      })
      .catch(() => {
        setPopupType('error')
        setPopupMessage('Failed to send message.')
        setTimeout(() => setPopupMessage(null), 3000)
      })
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gray-950 text-white">
      <div className="max-w-xl mx-auto text-center">
        <SectionTitle>Contact Me</SectionTitle>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full p-2 bg-gray-800 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 bg-gray-800 rounded"
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            className="w-full p-2 bg-gray-800 rounded"
            rows={5}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
          >
            Send
          </button>
        </form>
      </div>

      {/* Popup */}
      {popupMessage && <Popup message={popupMessage} type={popupType} />}
    </section>
  )
}

export default Contact
