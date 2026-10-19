import ContactLinks from './ContactLinks'
import { ME, PROJECTS, SKILLS } from '../data/content'

export default function ClassicView({ on, onClose }: { on: boolean; onClose: () => void }) {
  return (
    <div id="classic" className={on ? 'on' : ''} aria-hidden={!on}>
      <div className="wrap">
        <h1>{ME.name}</h1>
        <p className="lead">
          {ME.role} in {ME.place}. {ME.tagline}
        </p>
        <p>{ME.about}</p>
        <div className="links">
          <button className="btn" onClick={onClose}>
            Back to the 3D desk
          </button>
          <a className="btn pink" href={ME.cv} download="Suyashaa_Vaidya_CV.pdf" style={{ textDecoration: 'none', color: '#5A3E4B' }}>
            Download CV (PDF)
          </a>
        </div>
        <section>
          <h2>Projects</h2>
          {PROJECTS.map((p) => (
            <article key={p.id}>
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
              <p>{p.is}</p>
              <ul>
                {p.did.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p>
                <strong>Outcome:</strong> {p.outcome}
              </p>
              <div className="chips">
                {p.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
        <section>
          <h2>Skills</h2>
          <div className="chips">
            {SKILLS.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </section>
        <section>
          <h2>Contact</h2>
          <ContactLinks />
        </section>
      </div>
    </div>
  )
}
