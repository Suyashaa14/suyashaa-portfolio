import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { AppId } from '../data/apps'
import { ME, PROJECTS, SKILLS } from '../data/content'
import { ktm } from '../lib/time'

const PROMPT = 'momo@suyashaa:~$'

export default function Terminal({ onOpen }: { onOpen: (id: AppId) => void }) {
  const [out, setOut] = useState<string[]>(['suyashaa.os — type “help” to see what I can do.'])
  const inp = useRef<HTMLInputElement>(null)
  const wrap = useRef<HTMLDivElement>(null)

  // the window body is the scroll container; clicking anywhere in it focuses the prompt
  useEffect(() => {
    const body = wrap.current!.parentElement!
    const focus = () => inp.current?.focus()
    body.addEventListener('click', focus)
    const t = setTimeout(() => inp.current?.focus({ preventScroll: true }), 50)
    return () => {
      body.removeEventListener('click', focus)
      clearTimeout(t)
    }
  }, [])
  useEffect(() => {
    const body = wrap.current!.parentElement!
    body.scrollTop = body.scrollHeight
  }, [out])

  const later = (id: AppId) => setTimeout(() => onOpen(id), 300)
  const CMDS: Record<string, () => string> = {
    help: () => 'whoami · projects · stack · hire · contact · cv · date · momo · clear',
    whoami: () => `${ME.name} — ${ME.role}, ${ME.place}.`,
    projects: () => {
      later('projects')
      return PROJECTS.map((p) => `  ${p.name} — ${p.kind}`).join('\n') + '\nOpening Projects…'
    },
    stack: () => SKILLS.join(', '),
    hire: () => {
      later('contact')
      return 'Great choice. Opening the contact form…'
    },
    contact: () => `email: ${ME.email}\ngithub: ${ME.github}\nlinkedin: ${ME.linkedin}`,
    cv: () => {
      setTimeout(() => {
        const a = document.createElement('a')
        a.href = ME.cv
        a.download = 'Suyashaa_Vaidya_CV.pdf'
        a.click()
      }, 300)
      return 'Downloading Suyashaa_Vaidya_CV.pdf…'
    },
    date: () => 'Kathmandu: ' + ktm(true),
    momo: () => '   ( ˘ ω ˘ )\n  steaming gently. Momo says hi.',
    'sudo hire-me': () => {
      later('contact')
      return 'Permission granted ✨'
    },
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const c = e.currentTarget.value.trim()
    e.currentTarget.value = ''
    const lines = [`${PROMPT} ${c}`]
    if (!c) return setOut((o) => [...o, ...lines])
    if (c === 'clear') return setOut([])
    const run = CMDS[c.toLowerCase()]
    lines.push(run ? run() : `command not found: ${c}. Try “help”.`)
    setOut((o) => [...o, ...lines])
  }

  return (
    <div ref={wrap}>
      <div className="out">
        {out.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div className="line">
        <span className="prompt">{PROMPT}</span>
        <input ref={inp} aria-label="Terminal command" autoComplete="off" spellCheck={false} onKeyDown={onKey} />
      </div>
    </div>
  )
}
