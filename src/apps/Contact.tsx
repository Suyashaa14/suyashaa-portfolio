import { useState, type FormEvent } from 'react'
import ContactLinks from '../components/ContactLinks'
import { ME } from '../data/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [note, setNote] = useState('')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (!KEY) {
      setStatus('error')
      setNote(`The form isn’t configured yet. Please email me at ${ME.email}.`)
      return
    }

    setStatus('sending')
    setNote('Sending…')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: KEY,
          subject: `Portfolio message from ${data.get('name')}`,
          from_name: 'Portfolio contact form',
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          botcheck: data.get('botcheck') ?? '',
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Request failed')
      form.reset()
      setStatus('sent')
      setNote('Thanks! Your message is on its way. I’ll reply soon.')
    } catch {
      setStatus('error')
      setNote(`Something went wrong. Please try again or email me at ${ME.email}.`)
    }
  }

  return (
    <>
      <h3>Let’s build something.</h3>
      <p>Hiring, freelance work or just a hello — all welcome.</p>
      <form className="contact" onSubmit={submit}>
        <label>
          Your name
          <input name="name" required />
        </label>
        <label>
          Your email
          <input name="email" type="email" required />
        </label>
        <label>
          What’s on your mind?
          <textarea name="message" rows={4} required />
        </label>
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
        <button className="btn pink" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className="note" aria-live="polite">
          {note}
        </p>
      </form>
      <ContactLinks />
    </>
  )
}
