import { useEffect, useRef, type RefObject } from 'react'
import { createRoom, type Room as RoomController } from '../three/createRoom'

interface Props {
  controllerRef: RefObject<RoomController | null>
  onZoomStart: () => void
  onOS: () => void
  onFail: () => void
}

export default function Room({ controllerRef, onZoomStart, onOS, onFail }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const cb = useRef({ onZoomStart, onOS, onFail })
  cb.current = { onZoomStart, onOS, onFail }

  useEffect(() => {
    let room: RoomController
    try {
      room = createRoom({
        canvas: canvasRef.current!,
        bubble: bubbleRef.current!,
        onZoomStart: () => cb.current.onZoomStart(),
        onOS: () => cb.current.onOS(),
      })
    } catch {
      cb.current.onFail()
      return
    }
    controllerRef.current = room
    return () => {
      room.dispose()
      controllerRef.current = null
    }
  }, [controllerRef])

  return (
    <>
      <canvas
        id="scene"
        ref={canvasRef}
        aria-label="A bright 3D room with a desk, a retro computer, plants and a small dumpling mascot"
      />
      <div id="bubble" ref={bubbleRef} role="status" />
    </>
  )
}
