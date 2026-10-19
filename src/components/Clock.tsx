import { useEffect, useState } from 'react'
import { ktm } from '../lib/time'

export default function Clock() {
  const [now, setNow] = useState(() => ktm())
  useEffect(() => {
    const id = setInterval(() => setNow(ktm()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span id="clock">Kathmandu {now}</span>
}
