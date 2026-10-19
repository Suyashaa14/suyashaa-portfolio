import { EDU, EXPERIENCE, ME, SKILL_GROUPS } from '../data/content'

const H = ({ children }: { children: string }) => <h4 style={{ margin: '18px 0 4px', fontWeight: 800 }}>{children}</h4>

export default function Resume() {
  return (
    <>
      <h3>{ME.name}</h3>
      <p className="muted">
        {ME.role} · {ME.place}
      </p>
      <div className="links">
        <a className="btn pink" href={ME.cv} download="Suyashaa_Vaidya_CV.pdf" style={{ textDecoration: 'none', color: '#5A3E4B' }}>
          Download CV (PDF)
        </a>
        <a className="btn" href={ME.businessSite} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          Lunera online store ↗
        </a>
      </div>
      <H>Summary</H>
      <p>{ME.about}</p>
      <H>Experience</H>
      {EXPERIENCE.map((x) => (
        <div key={x.role + x.org}>
          <p style={{ margin: '10px 0 0' }}>
            <strong>{x.role}</strong>, {x.org}
            <br />
            <span className="muted">
              {x.when} · {x.where}
            </span>
          </p>
          <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
            {x.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
      <H>Education</H>
      <p>{EDU}</p>
      <H>Technical skills</H>
      {SKILL_GROUPS.map(([k, v]) => (
        <p key={k} style={{ margin: '4px 0' }}>
          <strong>{k}:</strong> {v}
        </p>
      ))}
    </>
  )
}
