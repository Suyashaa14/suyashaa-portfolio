import { useState } from 'react'
import { PROJECTS } from '../data/content'

export default function Projects() {
  const [sel, setSel] = useState(PROJECTS[0].id)
  const p = PROJECTS.find((x) => x.id === sel)!
  return (
    <div className="proj">
      <div className="proj-list" role="tablist" aria-label="Projects">
        {PROJECTS.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === sel} onClick={() => setSel(x.id)}>
            {x.name}
            <small>{x.kind}</small>
          </button>
        ))}
      </div>
      <div className="proj-detail" role="tabpanel">
        <h3>
          {p.icon} {p.name}
        </h3>
        <p className="muted">{p.kind}</p>
        {p.links && (
          <div className="links">
            {p.links.map((l) => (
              <a key={l.url} className="btn pink" href={l.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#5A3E4B' }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
        <h4>What it is</h4>
        <p>{p.is}</p>
        <h4>What I built</h4>
        <ul>
          {p.did.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <h4>Outcome</h4>
        <p>{p.outcome}</p>
        <div className="chips">
          {p.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
