import type { AppId } from '../data/apps'
import { ME } from '../data/content'

export default function About({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <>
      <h3>Hi, I’m {ME.name}.</h3>
      <p className="lead">
        {ME.role} in {ME.place}. {ME.tagline}
      </p>
      <p>{ME.about}</p>
      <p className="muted">
        {ME.years} · {ME.current}
      </p>
      <div className="links">
        <button className="btn" onClick={() => onOpen('projects')}>
          See my projects
        </button>
        <button className="btn pink" onClick={() => onOpen('contact')}>
          Work with me
        </button>
      </div>
    </>
  )
}
