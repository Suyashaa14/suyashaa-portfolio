import { useRef, type ReactNode } from 'react'
import { APPS, type AppId } from '../data/apps'
import { isSmall } from '../lib/env'

interface Props {
  id: AppId
  left: number
  top: number
  z: number
  onClose: () => void
  onFocus: () => void
  children: ReactNode
}

export default function Window({ id, left, top, z, onClose, onFocus, children }: Props) {
  const a = APPS[id]
  const winRef = useRef<HTMLElement>(null)
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null)

  return (
    <section
      ref={winRef}
      className="win"
      aria-label={a.title}
      style={{ left, top, zIndex: z }}
      onPointerDown={onFocus}
    >
      <header
        className={a.color}
        onPointerDown={(e) => {
          const w = winRef.current!
          if ((e.target as HTMLElement).closest('.close') || isSmall()) return
          drag.current = { sx: e.clientX, sy: e.clientY, ox: w.offsetLeft, oy: w.offsetTop }
          e.currentTarget.setPointerCapture(e.pointerId)
          e.currentTarget.style.cursor = 'grabbing'
        }}
        onPointerMove={(e) => {
          const d = drag.current
          if (!d) return
          const w = winRef.current!
          w.style.left = Math.max(-200, Math.min(innerWidth - 120, d.ox + e.clientX - d.sx)) + 'px'
          w.style.top = Math.max(50, Math.min(innerHeight - 80, d.oy + e.clientY - d.sy)) + 'px'
        }}
        onPointerUp={(e) => {
          drag.current = null
          e.currentTarget.style.cursor = 'grab'
        }}
      >
        <h2>{a.title}</h2>
        <button className="close" aria-label={`Close ${a.title}`} onClick={onClose}>
          ×
        </button>
      </header>
      <div className={`body ${id === 'terminal' ? 'term' : ''}`}>{children}</div>
    </section>
  )
}
