import { useCallback, useEffect, useRef, useState } from 'react'
import About from './apps/About'
import Contact from './apps/Contact'
import Projects from './apps/Projects'
import Resume from './apps/Resume'
import Terminal from './apps/Terminal'
import ClassicView from './components/ClassicView'
import Clock from './components/Clock'
import Room from './components/Room'
import Window from './components/Window'
import { APPS, type AppId } from './data/apps'
import { isSmall, prefersReducedMotion } from './lib/env'
import type { Room as RoomController } from './three/createRoom'

interface Win {
  id: AppId
  left: number
  top: number
  z: number
}

export default function App() {
  const room = useRef<RoomController | null>(null)
  const [osOn, setOsOn] = useState(false)
  const [noRoom, setNoRoom] = useState(false)
  const [hintGone, setHintGone] = useState(false)
  const [classic, setClassic] = useState(false)
  const [wins, setWinsState] = useState<Win[]>([])
  const winsRef = useRef<Win[]>([])
  const zTop = useRef(10)
  const cascade = useRef(0)

  const setWins = useCallback((next: Win[]) => {
    winsRef.current = next
    setWinsState(next)
  }, [])

  const focusWin = useCallback(
    (id: AppId) => {
      setWins(winsRef.current.map((w) => (w.id === id ? { ...w, z: ++zTop.current } : w)))
    },
    [setWins],
  )

  const openApp = useCallback(
    (id: AppId) => {
      if (winsRef.current.some((w) => w.id === id)) return focusWin(id)
      const left = Math.min(130 + cascade.current * 34, Math.max(20, innerWidth - 620))
      const top = Math.min(80 + cascade.current * 30, Math.max(70, innerHeight - 520))
      cascade.current = (cascade.current + 1) % 5
      setWins([...winsRef.current, { id, left, top, z: ++zTop.current }])
    },
    [focusWin, setWins],
  )

  const closeApp = (id: AppId) => setWins(winsRef.current.filter((w) => w.id !== id))

  const showOS = useCallback(() => {
    setOsOn(true)
    if (!winsRef.current.length) {
      openApp('about')
      if (!isSmall()) setTimeout(() => openApp('projects'), 180)
    }
  }, [openApp])

  // fly into the monitor on its own after a moment
  useEffect(() => {
    const t = setTimeout(() => room.current?.zoomIn(), isSmall() ? 2600 : 4200)
    return () => clearTimeout(t)
  }, [])

  const onResume = () => {
    const r = room.current
    if (r?.getState() === 'room') {
      r.zoomIn()
      setTimeout(() => openApp('resume'), (prefersReducedMotion() ? 0 : 1550) + 250)
    } else openApp('resume')
  }

  const onBack = () => {
    setOsOn(false)
    room.current?.zoomOut()
  }

  const body = (id: AppId) => {
    switch (id) {
      case 'about':
        return <About onOpen={openApp} />
      case 'projects':
        return <Projects />
      case 'terminal':
        return <Terminal onOpen={openApp} />
      case 'resume':
        return <Resume />
      case 'contact':
        return <Contact />
    }
  }

  return (
    <>
      <Room
        controllerRef={room}
        onZoomStart={() => setHintGone(true)}
        onOS={showOS}
        onFail={() => {
          setNoRoom(true)
          showOS()
        }}
      />

      <header className="topbar">
        <div className="brand">
          Suyashaa<small>software developer</small>
        </div>
        <div className="top-actions">
          <button className="btn" onClick={() => setClassic(true)}>
            Classic view
          </button>
          <button className="btn pink" onClick={onResume}>
            Resume
          </button>
        </div>
      </header>

      <div id="hint" className={hintGone ? 'gone' : ''}>
        Click the glowing screen to look inside
      </div>

      <div id="os" className={osOn ? 'on' : ''} aria-hidden={!osOn}>
        <div className="icons">
          {(Object.entries(APPS) as [AppId, (typeof APPS)[AppId]][]).map(([id, a]) => (
            <button key={id} className="icon" onClick={() => openApp(id)}>
              <div className={`tile ${a.color}`} aria-hidden="true">
                {a.icon}
              </div>
              <span>{a.title}</span>
            </button>
          ))}
        </div>
        <div>
          {wins.map((w) => (
            <Window key={w.id} {...w} onClose={() => closeApp(w.id)} onFocus={() => focusWin(w.id)}>
              {body(w.id)}
            </Window>
          ))}
        </div>
        <nav className="dock" aria-label="Dock">
          {!noRoom && (
            <button className="btn" onClick={onBack}>
              Back to the room
            </button>
          )}
          <div id="dockApps">
            {wins.map((w) => (
              <button
                key={w.id}
                className={APPS[w.id].color}
                aria-label={`Show ${APPS[w.id].title}`}
                onClick={() => focusWin(w.id)}
              >
                {APPS[w.id].icon}
              </button>
            ))}
          </div>
          <Clock />
        </nav>
      </div>

      <ClassicView on={classic} onClose={() => setClassic(false)} />
    </>
  )
}
