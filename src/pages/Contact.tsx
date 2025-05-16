import React, { useRef } from 'react'
import emailjs from 'emailjs-com'

const Contact = () => {
  const form = useRef<any>(null)

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(() => alert('Message sent successfully'))
      .catch(() => alert('Failed to send message'))
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gray-950 text-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input type="text" name="name" placeholder="Name" required className="w-full p-2 bg-gray-800 rounded" />
          <input type="email" name="email" placeholder="Email" required className="w-full p-2 bg-gray-800 rounded" />
          <textarea name="message" placeholder="Message" required className="w-full p-2 bg-gray-800 rounded" rows={5} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">Send</button>
        </form>
      </div>
    </section>
  )
}

export default Contact