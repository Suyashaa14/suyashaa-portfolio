export function ktm(sec = false): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kathmandu',
    hour: 'numeric',
    minute: '2-digit',
    second: sec ? '2-digit' : undefined,
    hour12: true,
  }).format(new Date())
}
