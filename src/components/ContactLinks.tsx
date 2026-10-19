import { ME } from '../data/content'

const external = { target: '_blank', rel: 'noreferrer' } as const

export default function ContactLinks() {
  return (
    <div className="links">
      <a href={`mailto:${ME.email}`}>{ME.email}</a>
      <a href={ME.githubUrl} {...external}>
        {ME.github}
      </a>
      <a href={ME.linkedinUrl} {...external}>
        {ME.linkedin}
      </a>
      <a href={ME.businessSite} {...external}>
        luneraonlinestore.com
      </a>
    </div>
  )
}
