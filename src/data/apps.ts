export type AppId = 'about' | 'projects' | 'terminal' | 'resume' | 'contact'

export const APPS: Record<AppId, { title: string; icon: string; color: string }> = {
  about: { title: 'About me', icon: '🥟', color: 'c-pink' },
  projects: { title: 'Projects', icon: '📁', color: 'c-butter' },
  terminal: { title: 'Terminal', icon: '⌨️', color: 'c-mint' },
  resume: { title: 'Resume', icon: '📄', color: 'c-sky' },
  contact: { title: 'Say hello', icon: '💌', color: 'c-pink' },
}
