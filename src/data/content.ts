export const ME = {
  name: 'Suyashaa Vaidya',
  role: 'Software developer',
  place: 'Kathmandu, Nepal',
  tagline: 'I build and maintain production web apps with React, TypeScript and Node.js.',
  about:
    'Software developer with 3+ years of experience building and maintaining production web applications with JavaScript (ES6+), TypeScript, React.js and Node.js. I work well in review-driven teams: well-scoped components, unit tests, reproducible bug fixes, REST API integrations, and code comments and setup docs kept up to date. I also run my own business, Lunera Online Business Pvt. Ltd., and built its website myself.',
  years: '3+ years of experience',
  current: 'Founder of Lunera Online Business Pvt. Ltd. and freelance frontend engineer',
  github: 'github.com/suyashaa14',
  linkedin: 'linkedin.com/in/suyashaa-vaidya',
  email: 'suyashaa123@gmail.com',
  githubUrl: 'https://github.com/suyashaa14',
  linkedinUrl: 'https://www.linkedin.com/in/suyashaa-vaidya-469779250/',
  business: 'Lunera Online Business Pvt. Ltd.',
  businessSite: 'https://luneraonlinestore.com/',
  cv: '/Suyashaa_Vaidya_CV.pdf',
}

export interface Project {
  id: string
  name: string
  kind: string
  icon: string
  is: string
  did: string[]
  outcome: string
  stack: string[]
  links?: { label: string; url: string }[]
}

export const PROJECTS: Project[] = [
  {
    id: 'lunera',
    name: 'Lunera Silver Store',
    kind: 'My own online business',
    icon: '💍',
    is: 'The online store for Lunera Online Business Pvt. Ltd., my own business selling handcrafted pure silver jewellery (luneraonlinestore.com).',
    did: [
      'Founded and run Lunera Online Business Pvt. Ltd., an online silver business.',
      'Designed and built the store website myself, end to end.',
    ],
    outcome: 'Live at luneraonlinestore.com.',
    stack: ['Web development', 'E-commerce', 'Business ownership'],
    links: [{ label: 'luneraonlinestore.com', url: 'https://luneraonlinestore.com/' }],
  },
  {
    id: 'cms',
    name: 'Communication Management System',
    kind: 'Real-time calls and booking',
    icon: '📞',
    is: 'A communication and appointment-booking platform with real-time video, voice and chat.',
    did: [
      'Led frontend development in React and TypeScript, coordinating a team of up to 6 across design and backend.',
      'Integrated Agora SDK and Firebase for real-time video, voice and chat with sub-second latency.',
      'Built payment flows for eSewa, Khalti, Stripe and PayPal, covering local and international checkout.',
    ],
    outcome: 'Live real-time calls, chat and bookings with payments for both Nepali and international users.',
    stack: ['React', 'TypeScript', 'Firebase', 'Agora SDK', 'Stripe', 'PayPal', 'eSewa', 'Khalti'],
  },
  {
    id: 'log',
    name: 'Logistics and Transport System',
    kind: 'Live fleet tracking',
    icon: '🚚',
    is: 'A logistics and transport platform with a live shipment and fleet tracking dashboard, built at Wolfmatrix.',
    did: [
      'Led frontend development of the platform.',
      'Integrated the Google Maps API for real-time fleet visibility.',
      'Delivered full-stack features with Node.js, MySQL and REST APIs in a remote-first agile team.',
    ],
    outcome: 'Real-time visibility of shipments and vehicles on a live map.',
    stack: ['React', 'TypeScript', 'Google Maps API', 'Node.js', 'MySQL'],
  },
  {
    id: 'web',
    name: 'Client Websites',
    kind: 'Australian B2B sites',
    icon: '🌏',
    is: '5+ production websites for Australian B2B clients, including b2bgorkhaflooring.com.au, nyxneural.com.au and 10xjoinery.com.au.',
    did: [
      'Built an SEO-optimised B2B site, an animated marketing site and a mobile-first business site.',
      'Wrote optimised, accessible markup to lift SEO rankings and page performance.',
      'Wrote setup and handover docs so clients and other developers can maintain each site.',
    ],
    outcome: 'Live sites: b2bgorkhaflooring.com.au, nyxneural.com.au, 10xjoinery.com.au.',
    stack: ['React', 'Tailwind CSS', 'WordPress', 'SEO', 'Accessibility'],
    links: [
      { label: 'b2bgorkhaflooring.com.au', url: 'https://b2bgorkhaflooring.com.au/' },
      { label: 'nyxneural.com.au', url: 'https://nyxneural.com.au/' },
      { label: '10xjoinery.com.au', url: 'https://10xjoinery.com.au/' },
    ],
  },
  {
    id: 'port',
    name: 'Personal Portfolio',
    kind: 'CI-backed personal site',
    icon: '🧪',
    is: 'A personal portfolio built to production standards.',
    did: [
      'Unit and component tests with Vitest and React Testing Library.',
      'A validated contact form.',
      'A GitHub Actions pipeline running lint, type-check, tests and build on every push.',
    ],
    outcome: 'Every push is linted, type-checked, tested and built automatically.',
    stack: ['React', 'TypeScript', 'Vitest', 'GitHub Actions'],
  },
  {
    id: 'movie',
    name: 'Movie Recommendation System',
    kind: 'Recommendation system',
    icon: '🎬',
    is: 'Movie recommendations based on each user’s preferences and ratings.',
    did: ['Built the React front end and a Nest.js API, with the recommendation logic in Python.'],
    outcome: 'Personalised picks that improve as users rate more films.',
    stack: ['React', 'Nest.js', 'Python'],
  },
]

export const SKILL_GROUPS: [string, string][] = [
  ['Programming', 'JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL'],
  ['Frameworks and Libraries', 'React.js, Redux Toolkit, Node.js, Express.js, Nest.js, Tailwind CSS, Bootstrap'],
  ['Testing and Debugging', 'Unit Testing (Vitest, React Testing Library), Chrome DevTools, defect reproduction and root-cause analysis, code reviews'],
  ['Version Control and Workflow', 'Git, GitHub, Bitbucket, branching and pull requests, issue tracking (Jira, Trello), Agile'],
  ['APIs and Integrations', 'REST APIs, Firebase, Agora SDK, Google Maps API, payment gateways (eSewa, Khalti, Stripe, PayPal)'],
  ['Documentation and Tools', 'Technical documentation, README and setup guides, MySQL, Figma, WordPress'],
]

export const SKILLS = [
  'JavaScript', 'TypeScript', 'React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'Nest.js', 'Tailwind CSS',
  'Bootstrap', 'SQL', 'MySQL', 'Firebase', 'Agora SDK', 'Google Maps API', 'Vitest', 'React Testing Library',
  'Git', 'Jira', 'Figma', 'WordPress',
]

export const EXPERIENCE = [
  {
    role: 'Founder and Owner',
    org: 'Lunera Online Business Pvt. Ltd.',
    when: 'Aug 2025 – present',
    where: 'Kathmandu, Nepal',
    points: [
      'Started and run an online silver business selling handcrafted pure silver jewellery (luneraonlinestore.com).',
      'Designed and built the business website myself, end to end.',
    ],
  },
  {
    role: 'Freelance Frontend Engineer and UI/UX Consultant',
    org: 'Independent Contractor',
    when: 'Jul 2024 – present',
    where: 'Remote',
    points: [
      'Built and led frontend development of a real-time communication and appointment-booking platform using React.js and TypeScript, coordinating a team of up to 6 across design and backend.',
      'Integrated Agora SDK and Firebase to deliver real-time video, voice and chat with sub-second latency.',
      'Implemented payment flows for eSewa, Khalti, Stripe and PayPal with client-side validation and error handling, supporting local and international checkout.',
      'Shipped 5+ production websites for Australian B2B clients, improving SEO rankings and page performance through optimized, accessible markup.',
      'Reduced the production bug backlog by reproducing and fixing defects, taking part in code reviews and building reusable component libraries.',
      'Wrote setup instructions and handover documentation so clients and other developers could run and maintain each project.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    org: 'Wolfmatrix Pvt. Ltd.',
    when: 'Jun 2022 – Jun 2024',
    where: 'Sanepa, Kathmandu, Nepal',
    points: [
      'Led frontend development of a logistics and tracking platform with live Google Maps API integration for real-time fleet visibility.',
      'Revamped legacy React and WordPress projects, improving UI/UX consistency and load performance.',
      'Delivered full-stack features with React, TypeScript, Node.js, MySQL and REST APIs in an agile, remote-first team, using Git pull requests and code review.',
    ],
  },
]

export const EDU =
  'Bachelor of Computer Applications (BCA), National College, Kathmandu, Nepal — 2018–2023, GPA 3.49 / 4.0'
