import { useState, type FormEvent } from 'react'
import { ME } from '../data/content'

export default function Contact() {
  const [note, setNote] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setNote('Preview only: the form gets connected to email in the real build.')
  }
  return (
    <>
      <h3>Let’s build something.</h3>
      <p>Hiring, freelance work or just a hello — all welcome.</p>
      <form className="contact" onSubmit={submit}>
        <label>
          Your name
          <input name="n" required />
        </label>
        <label>
          Your email
          <input name="e" type="email" required />
        </label>
        <label>
          What’s on your mind?
          <textarea name="m" rows={4} required />
        </label>
        <button className="btn pink" type="submit">
          Send message
        </button>
        <p className="note" aria-live="polite">
          {note}
        </p>
      </form>
      <div className="links">
        <span>{ME.email}</span>
        <span>{ME.github}</span>
        <span>{ME.linkedin}</span>
        <a href={ME.businessSite} target="_blank" rel="noreferrer">
          luneraonlinestore.com
        </a>
      </div>
    </>
  )
}
