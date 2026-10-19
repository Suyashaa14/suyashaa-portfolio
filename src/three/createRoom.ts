import * as THREE from 'three'
import { isSmall, prefersReducedMotion } from '../lib/env'
import { ktm } from '../lib/time'

export type RoomState = 'room' | 'zooming' | 'os' | 'leaving'

export interface RoomOptions {
  canvas: HTMLCanvasElement
  bubble: HTMLElement
  onZoomStart: () => void
  onOS: () => void
}

export interface Room {
  zoomIn: () => void
  zoomOut: () => void
  getState: () => RoomState
  dispose: () => void
}

interface Anim {
  p: number
  dur: number
  fromP: THREE.Vector3
  fromL: THREE.Vector3
  toP: THREE.Vector3
  toL: THREE.Vector3
  done: () => void
}

/** Builds the 3D room. Throws if WebGL is unavailable. */
export function createRoom({ canvas, bubble, onZoomStart, onOS }: RoomOptions): Room {
  const reduce = prefersReducedMotion()
  const small = isSmall()

  let state: RoomState = 'room'
  let running = true
  let disposed = false
  let raf = 0
  let stopTimer = 0
  let last = 0

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(innerWidth, innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const col = (h: string) => new THREE.Color(h).convertSRGBToLinear()
  const scene = new THREE.Scene()
  scene.background = col('#CDEBFF')
  const camera = new THREE.PerspectiveCamera(small ? 64 : 44, innerWidth / innerHeight, 0.1, 120)
  const START = { pos: new THREE.Vector3(2.1, 3.0, 2.9), look: new THREE.Vector3(0.6, 2.3, -2.85) }
  const ZOOM = { pos: new THREE.Vector3(0.6, 2.44, -1.6), look: new THREE.Vector3(0.6, 2.44, -2.76) }
  if (small) START.pos.set(1.8, 3.1, 4.2)
  camera.position.copy(START.pos)
  camera.lookAt(START.look)

  const mat = (c: string, o: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial(Object.assign({ color: col(c), roughness: 0.85, metalness: 0 }, o))
  function mesh(
    geo: THREE.BufferGeometry,
    c: string,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = scene,
    o?: THREE.MeshStandardMaterialParameters,
  ) {
    const m = new THREE.Mesh(geo, mat(c, o))
    m.position.set(x, y, z)
    m.castShadow = true
    m.receiveShadow = true
    parent.add(m)
    return m
  }
  const box = (w: number, h: number, d: number, c: string, x: number, y: number, z: number, p?: THREE.Object3D) =>
    mesh(new THREE.BoxGeometry(w, h, d), c, x, y, z, p)
  function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D, w: number, h: number) => void) {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    const g = c.getContext('2d')!
    draw(g, w, h)
    const t = new THREE.CanvasTexture(c)
    t.encoding = THREE.sRGBEncoding
    t.anisotropy = 4
    return { t, g, c }
  }

  // lights
  scene.add(new THREE.HemisphereLight(col('#EAF7FF'), col('#FFD6E2'), 0.75))
  const fill = new THREE.DirectionalLight(col('#FFF4F7'), 0.45)
  fill.position.set(6, 6, 8)
  scene.add(fill)
  const sun = new THREE.DirectionalLight(col('#FFF1C9'), 1.35)
  sun.position.set(-9, 10, -13)
  sun.target.position.set(0, 0, 0)
  scene.add(sun.target)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 11, bottom: -11, near: 1, far: 45 })
  sun.shadow.bias = -0.0008
  scene.add(sun)

  // floor with planks
  const floorT = canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#F7DDC4'
    g.fillRect(0, 0, w, h)
    for (let i = 0; i < 8; i++) {
      g.fillStyle = i % 2 ? '#F4D5B9' : '#F8E1CA'
      g.fillRect(0, i * 64, w, 62)
      g.fillStyle = '#E8C3A2'
      g.fillRect(((i * 157) % 400) + 40, i * 64, 3, 64)
    }
    g.fillStyle = '#E8C3A2'
    for (let i = 0; i < 8; i++) g.fillRect(0, i * 64 + 62, w, 2)
  }).t
  floorT.wrapS = floorT.wrapT = THREE.RepeatWrapping
  floorT.repeat.set(3, 3)
  const floor = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 12), new THREE.MeshStandardMaterial({ map: floorT, roughness: 0.9 }))
  floor.position.set(0, -0.05, 2)
  floor.receiveShadow = true
  scene.add(floor)
  const rug = mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.03, 48), '#FFC7D6', 1.2, 0.015, -0.6)
  rug.castShadow = false
  const rug2 = mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.035, 48), '#FFE59A', 1.2, 0.02, -0.6)
  rug2.castShadow = false

  // back wall with window opening
  const W = '#FFE3EA'
  const WZ = -4
  box(2.6, 5.5, 0.2, W, -5.7, 2.75, WZ)
  box(8.4, 5.5, 0.2, W, 2.8, 2.75, WZ)
  box(3, 1.5, 0.2, W, -2.9, 0.75, WZ)
  box(3, 1.5, 0.2, W, -2.9, 4.75, WZ)
  box(0.2, 5.5, 12, '#FFEFF3', -7, 2.75, 2)
  box(14, 0.1, 0.06, '#B8EBD3', 0, 1.2, WZ + 0.12) // wall trim
  box(14, 0.22, 0.06, '#FFFFFF', 0, 0.11, WZ + 0.12) // skirting
  // window frame
  box(3.5, 0.1, 0.5, '#FFFFFF', -2.9, 1.5, WZ + 0.15)
  box(3.2, 0.12, 0.26, '#FFFFFF', -2.9, 4.0, WZ)
  box(0.12, 2.5, 0.26, '#FFFFFF', -4.4, 2.75, WZ)
  box(0.12, 2.5, 0.26, '#FFFFFF', -1.4, 2.75, WZ)
  box(0.06, 2.5, 0.06, '#FFFFFF', -2.9, 2.75, WZ)
  box(3, 0.06, 0.06, '#FFFFFF', -2.9, 2.75, WZ)
  const rod = mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.9, 12), '#F07A9C', -2.9, 4.22, WZ + 0.32)
  rod.rotation.z = Math.PI / 2

  // curtains (wind)
  const curtains: { m: THREE.Mesh; base: Float32Array; ph: number }[] = []
  ;[-4.15, -1.65].forEach((x, i) => {
    const geo = new THREE.PlaneGeometry(0.8, 2.75, 10, 18)
    const m = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({ color: col('#FFB7C9'), side: THREE.DoubleSide, roughness: 0.95 }),
    )
    m.position.set(x, 2.82, WZ + 0.3)
    m.castShadow = true
    scene.add(m)
    curtains.push({ m, base: Float32Array.from((geo.attributes.position as THREE.BufferAttribute).array), ph: i * 1.7 })
  })

  // outside world
  const skyT = canvasTex(64, 512, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h)
    gr.addColorStop(0, '#6FC3FF')
    gr.addColorStop(0.6, '#B7E3FF')
    gr.addColorStop(1, '#E6F7FF')
    g.fillStyle = gr
    g.fillRect(0, 0, w, h)
  }).t
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(90, 40), new THREE.MeshBasicMaterial({ map: skyT }))
  sky.position.set(-6, 8, -22)
  scene.add(sky)
  const sunBall = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), new THREE.MeshBasicMaterial({ color: col('#FFE680') }))
  sunBall.position.set(-12.2, 4.6, -17)
  scene.add(sunBall)
  const haloT = canvasTex(256, 256, (g, w) => {
    const gr = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2)
    gr.addColorStop(0, 'rgba(255,240,170,.9)')
    gr.addColorStop(1, 'rgba(255,240,170,0)')
    g.fillStyle = gr
    g.fillRect(0, 0, w, w)
  }).t
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({ map: haloT, transparent: true, depthWrite: false }),
  )
  halo.position.set(-12.2, 4.6, -16.9)
  scene.add(halo)
  const grass = new THREE.Mesh(new THREE.PlaneGeometry(60, 30), mat('#A8E6A3'))
  grass.rotation.x = -Math.PI / 2
  grass.position.set(-6, -0.02, -19.2)
  grass.receiveShadow = true
  scene.add(grass)
  ;([
    [-12, -2.6, -17, 7, '#93DC9E'],
    [-4, -3.2, -18, 8, '#A5E7AC'],
    [-17, -3, -14, 6, '#86D695'],
  ] as const).forEach(([x, y, z, r, c]) => {
    const h = mesh(new THREE.SphereGeometry(r, 32, 16), c, x, y, z)
    h.scale.y = 0.55
    h.castShadow = false
  })
  // tree
  const tree = new THREE.Group()
  tree.position.set(-6.4, 0, -10.5)
  scene.add(tree)
  mesh(new THREE.CylinderGeometry(0.13, 0.2, 2.2, 10), '#C79A78', 0, 1.1, 0, tree)
  const crown = new THREE.Group()
  crown.position.y = 2.2
  tree.add(crown)
  ;([
    [0, 0.5, 0, 0.9],
    [0.6, 0.2, 0.1, 0.65],
    [-0.6, 0.25, 0, 0.7],
    [0.1, 1.1, 0, 0.6],
  ] as const).forEach(([x, y, z, r]) => mesh(new THREE.SphereGeometry(r, 18, 14), '#7ED69B', x, y, z, crown))
  // kite
  const kite = new THREE.Group()
  kite.position.set(-9.2, 3.9, -13)
  scene.add(kite)
  const kGeo = new THREE.BufferGeometry()
  kGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0.55, 0, -0.4, 0, 0, 0, -0.75, 0, 0, 0.55, 0, 0, -0.75, 0, 0.4, 0, 0], 3))
  kGeo.computeVertexNormals()
  const kMesh = new THREE.Mesh(kGeo, new THREE.MeshBasicMaterial({ color: col('#FF8FB1'), side: THREE.DoubleSide }))
  kite.add(kMesh)
  const tailBits: THREE.Mesh[] = []
  for (let i = 0; i < 6; i++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color: col(i % 2 ? '#FFE59A' : '#B8EBD3') }))
    kite.add(b)
    tailBits.push(b)
  }
  // clouds
  const clouds: THREE.Group[] = []
  for (let i = 0; i < 6; i++) {
    const g = new THREE.Group()
    ;([
      [0, 0, 0, 0.6],
      [0.6, -0.05, 0, 0.45],
      [-0.55, -0.08, 0, 0.42],
      [0.2, 0.3, 0, 0.42],
    ] as const).forEach(([x, y, z, r]) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }))
      s.position.set(x, y, z)
      g.add(s)
    })
    g.position.set(-18 + i * 3.6, 3.2 + Math.random() * 1.6, -14 - Math.random() * 2)
    g.scale.setScalar(0.8 + Math.random() * 0.6)
    g.userData.v = 0.55 + Math.random() * 0.5
    scene.add(g)
    clouds.push(g)
  }

  // desk
  const DY = 1.5
  box(3.9, 0.12, 1.7, '#B8EBD3', 0.6, DY, -3.05)
  ;[[-1.25, -0.7], [2.45, -0.7], [-1.25, 0.7], [2.45, 0.7]].forEach(([x, z]) =>
    box(0.12, DY - 0.06, 0.12, '#96D9BC', x + 0, (DY - 0.06) / 2, -3.05 + z),
  )
  box(1.1, 0.95, 1.45, '#FFE59A', 2.1, 0.55, -3.05)
  box(0.5, 0.06, 0.04, '#F07A9C', 2.1, 0.75, -2.31)

  // monitor
  const mon = new THREE.Group()
  mon.position.set(0.6, DY + 0.06, -3.2)
  scene.add(mon)
  box(0.7, 0.06, 0.5, '#FFE59A', 0, 0.03, 0, mon)
  box(0.2, 0.26, 0.16, '#F7D57C', 0, 0.18, 0, mon)
  const monBody = box(1.6, 1.22, 0.9, '#FFE59A', 0, 0.88, 0, mon)
  box(1.15, 0.92, 0.55, '#F7D57C', 0, 0.86, -0.6, mon)
  const scr = canvasTex(640, 470, () => {})
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.32, 0.97), new THREE.MeshBasicMaterial({ map: scr.t, toneMapped: false }))
  screen.position.set(0, 0.88, 0.452)
  mon.add(screen)
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 10), new THREE.MeshBasicMaterial({ color: col('#4FD18B') }))
  led.position.set(0.66, 0.34, 0.455)
  mon.add(led)
  const glow = new THREE.PointLight(col('#FFD6E6'), 0.6, 3)
  glow.position.set(0.6, DY + 0.9, -2.3)
  scene.add(glow)

  function rr(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    g.beginPath()
    g.moveTo(x + r, y)
    g.arcTo(x + w, y, x + w, y + h, r)
    g.arcTo(x + w, y + h, x, y + h, r)
    g.arcTo(x, y + h, x, y, r)
    g.arcTo(x, y, x + w, y, r)
    g.closePath()
  }
  function drawScreen(t: number) {
    const g = scr.g
    const w = 640
    const h = 470
    const gr = g.createLinearGradient(0, 0, 0, h)
    gr.addColorStop(0, '#C6EBFF')
    gr.addColorStop(1, '#FFE1EB')
    g.fillStyle = gr
    g.fillRect(0, 0, w, h)
    g.fillStyle = 'rgba(255,255,255,.9)'
    ;[[110, 90, 40], [150, 84, 30], [500, 130, 44], [540, 124, 30]].forEach(([x, y, r]) => {
      g.beginPath()
      g.ellipse(x + ((t * 12) % 60), y, r, r * 0.55, 0, 0, 7)
      g.fill()
    })
    g.fillStyle = '#FFB7C9'
    g.fillRect(0, 0, w, 40)
    g.fillStyle = '#5A3E4B'
    g.font = '700 24px "Baloo 2", sans-serif'
    g.fillText('suyashaa.os', 18, 29)
    g.textAlign = 'right'
    g.font = '600 20px "Baloo 2", sans-serif'
    g.fillText(ktm(), w - 18, 28)
    g.textAlign = 'left'
    const icons = [['#FFE59A', 'Projects'], ['#B8EBD3', 'Terminal'], ['#BFE6FF', 'Resume'], ['#FFB7C9', 'Hello']]
    icons.forEach(([c, l], i) => {
      const y = 70 + i * 92
      g.fillStyle = c
      rr(g, 30, y, 62, 62, 16)
      g.fill()
      g.lineWidth = 4
      g.strokeStyle = '#5A3E4B'
      g.stroke()
      g.fillStyle = '#5A3E4B'
      g.font = '700 18px "Baloo 2", sans-serif'
      g.fillText(l, 24, y + 84)
    })
    g.fillStyle = '#FFFDFB'
    rr(g, 170, 110, 400, 230, 22)
    g.fill()
    g.lineWidth = 5
    g.strokeStyle = '#5A3E4B'
    g.stroke()
    g.fillStyle = '#FFE59A'
    rr(g, 170, 110, 400, 46, 22)
    g.fill()
    g.stroke()
    g.fillStyle = '#5A3E4B'
    g.font = '800 22px "Baloo 2", sans-serif'
    g.fillText('hello.txt', 192, 141)
    g.font = '800 36px "Baloo 2", sans-serif'
    g.fillText('Hi, I’m Suyashaa', 196, 212)
    g.font = '600 24px "Baloo 2", sans-serif'
    g.fillText('software developer', 196, 252)
    if (Math.floor(t * 2) % 2 === 0) g.fillRect(196, 276, 14, 28)
    scr.t.needsUpdate = true
  }

  // keyboard
  const kb = new THREE.Group()
  kb.position.set(0.6, DY + 0.06, -2.42)
  scene.add(kb)
  box(1.42, 0.07, 0.5, '#FFFFFF', 0, 0.035, 0, kb)
  const keys: THREE.Mesh[] = []
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 12; c++) {
      const colr = r === 1 && c === 11 ? '#B8EBD3' : (c + r) % 5 === 0 ? '#FFB7C9' : '#FFF6F9'
      const k = box(0.085, 0.05, 0.085, colr, -0.578 + c * 0.105, 0.095, -0.16 + r * 0.105, kb)
      k.userData.y = 0.095
      keys.push(k)
    }
  const space = box(0.62, 0.05, 0.085, '#FFB7C9', 0, 0.095, 0.155, kb)
  space.userData.y = 0.095
  keys.push(space)
  box(0.55, 0.015, 0.5, '#FFC7D6', 1.75, DY + 0.065, -2.45)
  const mouseM = mesh(new THREE.SphereGeometry(0.07, 16, 12), '#FFFFFF', 1.75, DY + 0.1, -2.45)
  mouseM.scale.set(1, 0.55, 1.45)

  // wall clock (real Kathmandu time)
  const clockG = new THREE.Group()
  clockG.position.set(1.75, 3.8, WZ + 0.13)
  scene.add(clockG)
  const face = mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 40), '#FFFFFF', 0, 0, 0, clockG)
  face.rotation.x = Math.PI / 2
  mesh(new THREE.TorusGeometry(0.43, 0.05, 12, 40), '#FFB7C9', 0, 0, 0.02, clockG)
  for (let i = 0; i < 12; i++) {
    const d = box(0.03, 0.07, 0.02, '#5A3E4B', Math.sin((i / 12) * Math.PI * 2) * 0.34, Math.cos((i / 12) * Math.PI * 2) * 0.34, 0.035, clockG)
    d.rotation.z = (-i / 12) * Math.PI * 2
  }
  const hourH = new THREE.Group()
  const minH = new THREE.Group()
  clockG.add(hourH, minH)
  box(0.045, 0.2, 0.02, '#5A3E4B', 0, 0.1, 0.05, hourH)
  box(0.03, 0.3, 0.02, '#F07A9C', 0, 0.15, 0.06, minH)
  const secH = new THREE.Group()
  clockG.add(secH)
  box(0.012, 0.34, 0.015, '#4FB88A', 0, 0.13, 0.07, secH)
  mesh(new THREE.SphereGeometry(0.035, 12, 12), '#5A3E4B', 0, 0, 0.08, clockG)

  // plants
  function plant(x: number, y: number, z: number, s: number, potC: string, leafC: string) {
    const g = new THREE.Group()
    g.position.set(x, y, z)
    g.scale.setScalar(s)
    scene.add(g)
    mesh(new THREE.CylinderGeometry(0.18, 0.13, 0.32, 20), potC, 0, 0.16, 0, g)
    mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 20), '#8A6553', 0, 0.31, 0, g)
    const leaves = new THREE.Group()
    leaves.position.y = 0.3
    g.add(leaves)
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      const l = mesh(new THREE.SphereGeometry(0.07, 12, 10), leafC, Math.cos(a) * 0.08, 0.22, Math.sin(a) * 0.08, leaves)
      l.scale.set(1, 4.2, 0.45)
      l.rotation.set(Math.sin(a) * 0.5, -a, Math.cos(a) * -0.5)
    }
    return leaves
  }
  const deskPlant = plant(1.95, DY + 0.06, -3.45, 1, '#FFB7C9', '#6ACB8C')
  const floorPlant = plant(-5.6, 0, -2.9, 3.2, '#FFE59A', '#5FC384')
  const sillPlant = plant(-3.6, 1.55, -3.85, 0.7, '#BFE6FF', '#7ED69B')

  // Momo (original dumpling mascot)
  const momo = new THREE.Group()
  momo.position.set(-0.55, DY + 0.06, -2.7)
  momo.rotation.y = 0.45
  scene.add(momo)
  const mBody = new THREE.Group()
  momo.add(mBody)
  const dough = mesh(new THREE.SphereGeometry(0.28, 32, 24), '#FFF4E4', 0, 0.2, 0, mBody)
  dough.scale.set(1, 0.72, 1)
  mesh(new THREE.ConeGeometry(0.11, 0.13, 16), '#F6E3CB', 0, 0.43, 0, mBody)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const p = mesh(new THREE.SphereGeometry(0.035, 10, 8), '#F6E3CB', Math.cos(a) * 0.09, 0.37, Math.sin(a) * 0.09, mBody)
    p.scale.set(0.6, 1.6, 0.6)
    p.rotation.set(Math.sin(a) * 0.6, 0, -Math.cos(a) * 0.6)
  }
  const eyes: THREE.Mesh[] = []
  ;[-0.085, 0.085].forEach((x) => {
    const e = mesh(new THREE.SphereGeometry(0.03, 12, 12), '#3A2A31', x, 0.24, 0.245, mBody)
    e.castShadow = false
    eyes.push(e)
  })
  ;[-0.15, 0.15].forEach((x) => {
    const b = mesh(new THREE.SphereGeometry(0.045, 12, 10), '#FF9DB8', x, 0.19, 0.222, mBody)
    b.scale.set(1, 0.55, 0.35)
    b.castShadow = false
  })
  const mouth = mesh(new THREE.TorusGeometry(0.025, 0.007, 8, 16, Math.PI), '#3A2A31', 0, 0.205, 0.262, mBody)
  mouth.rotation.z = Math.PI
  mouth.castShadow = false
  const steam: THREE.Mesh[] = []
  for (let i = 0; i < 3; i++) {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }),
    )
    s.userData.o = i / 3
    momo.add(s)
    steam.push(s)
  }

  /* ---------------- interaction ---------------- */
  const ray = new THREE.Raycaster()
  const ptr = new THREE.Vector2()
  const mouse = { x: 0, y: 0 }
  const hitScreen: THREE.Object3D[] = [screen, monBody]
  const hitMomo: THREE.Object3D[] = []
  momo.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) hitMomo.push(o)
  })
  let momoJump = 0
  let bubbleT = 0
  const lines = [
    'Hi! I’m Momo.',
    'Tap the screen to see Suyashaa’s work!',
    'It’s windy today — hold on to your kite.',
    'I’m 100% dumpling, 0% bugs.',
  ]
  let li = 0
  const pick = (e: PointerEvent | MouseEvent) => {
    ptr.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1)
    ray.setFromCamera(ptr, camera)
  }
  const say = (t: string) => {
    bubble.textContent = t
    bubble.classList.add('on')
    bubbleT = 2.8
  }

  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = (e.clientY / innerHeight) * 2 - 1
    if (state !== 'room') return
    pick(e)
    canvas.style.cursor = ray.intersectObjects([...hitScreen, ...hitMomo]).length ? 'pointer' : 'default'
  }
  const onClick = (e: MouseEvent) => {
    if (state !== 'room') return
    pick(e)
    if (ray.intersectObjects(hitMomo).length) {
      momoJump = 1
      say(lines[li++ % lines.length])
      return
    }
    if (ray.intersectObjects(hitScreen).length) zoomIn()
  }
  const onResize = () => {
    renderer.setSize(innerWidth, innerHeight)
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
  }
  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('click', onClick)
  addEventListener('resize', onResize)

  const curLook = START.look.clone()
  let anim: Anim | null = null

  function zoomIn() {
    if (state !== 'room') return
    state = 'zooming'
    onZoomStart()
    bubble.classList.remove('on')
    anim = {
      p: 0,
      dur: reduce ? 0.01 : 1.5,
      fromP: camera.position.clone(),
      fromL: curLook.clone(),
      toP: ZOOM.pos,
      toL: ZOOM.look,
      done: showOS,
    }
  }
  function zoomOut() {
    if (state !== 'os') return
    state = 'leaving'
    clearTimeout(stopTimer)
    start()
    anim = {
      p: 0,
      dur: reduce ? 0.01 : 1.3,
      fromP: ZOOM.pos.clone(),
      fromL: ZOOM.look.clone(),
      toP: START.pos,
      toL: START.look,
      done: () => {
        state = 'room'
      },
    }
  }
  function showOS() {
    state = 'os'
    onOS()
    stopTimer = window.setTimeout(() => {
      if (state === 'os') running = false
    }, 650)
  }
  function start() {
    if (running && raf) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }

  /* ---------------- loop ---------------- */
  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
  let t = 0
  let scrT = 0
  let keyT = 0
  let blinkT = 2
  const tmp = new THREE.Vector3()

  function tick(now: number) {
    if (!running || disposed) {
      raf = 0
      return
    }
    const dt = Math.min((now - (last || now)) / 1000, 0.05)
    last = now
    t += dt
    const wind = 1 + Math.sin(t * 0.7) * 0.5 + Math.max(0, Math.sin(t * 0.23)) * 1.2 // gusts

    // camera
    if (state === 'room') {
      tmp.set(START.pos.x + mouse.x * 0.45, START.pos.y - mouse.y * 0.25, START.pos.z)
      camera.position.lerp(tmp, reduce ? 1 : 0.05)
      curLook.lerp(START.look, 0.1)
      camera.lookAt(curLook)
    } else if (anim) {
      anim.p = Math.min(1, anim.p + dt / anim.dur)
      const e = ease(anim.p)
      camera.position.lerpVectors(anim.fromP, anim.toP, e)
      curLook.lerpVectors(anim.fromL, anim.toL, e)
      camera.lookAt(curLook)
      if (anim.p >= 1) {
        const d = anim.done
        anim = null
        d()
      }
    }

    // wind world
    clouds.forEach((c) => {
      c.position.x += c.userData.v * wind * dt * (reduce ? 0.3 : 1)
      if (c.position.x > 4) c.position.x = -20
    })
    crown.rotation.z = Math.sin(t * 2.1) * 0.05 * wind
    crown.rotation.x = Math.sin(t * 1.7) * 0.03 * wind
    kite.position.y = 3.9 + Math.sin(t * 1.3) * 0.35
    kite.position.x = -9.2 + Math.sin(t * 0.9) * 0.6
    kMesh.rotation.z = Math.sin(t * 2) * 0.25
    tailBits.forEach((b, i) => b.position.set(Math.sin(t * 3 - i * 0.7) * 0.12 * (i + 1) * 0.5, -0.85 - i * 0.18, 0))
    curtains.forEach((cu) => {
      const p = cu.m.geometry.attributes.position as THREE.BufferAttribute
      const b = cu.base
      const arr = p.array as Float32Array
      for (let i = 0; i < p.count; i++) {
        const x = b[i * 3]
        const y = b[i * 3 + 1]
        const amp = (1.375 - y) / 2.75
        arr[i * 3 + 2] = (Math.sin(y * 2.2 + t * 3.2 + x * 4 + cu.ph) * 0.07 + 0.12) * amp * wind
        arr[i * 3] = x + Math.sin(t * 2.4 + y * 1.5 + cu.ph) * 0.03 * amp * wind
      }
      p.needsUpdate = true
      cu.m.geometry.computeVertexNormals()
    })
    floorPlant.rotation.z = Math.sin(t * 1.8) * 0.035 * wind
    sillPlant.rotation.z = Math.sin(t * 2.2 + 1) * 0.06 * wind
    deskPlant.rotation.z = Math.sin(t * 1.1) * 0.015

    // typing
    keyT -= dt
    if (keyT <= 0) {
      keyT = 0.08 + Math.random() * 0.18
      const k = keys[(Math.random() * keys.length) | 0]
      k.position.y = k.userData.y - 0.025
    }
    keys.forEach((k) => {
      k.position.y += (k.userData.y - k.position.y) * 0.25
    })

    // momo
    momoJump = Math.max(0, momoJump - dt * 1.6)
    const jump = Math.sin((1 - momoJump) * Math.PI) * (momoJump > 0 ? 0.35 : 0)
    mBody.position.y = jump + Math.abs(Math.sin(t * 2)) * 0.02
    mBody.scale.set(1 + Math.sin(t * 4) * 0.015, 1 - Math.sin(t * 4) * 0.015, 1)
    blinkT -= dt
    const blink = blinkT < 0 && blinkT > -0.12
    if (blinkT < -0.12) blinkT = 2 + Math.random() * 3
    eyes.forEach((e) => (e.scale.y = blink ? 0.12 : 1))
    steam.forEach((s) => {
      const k = (t * 0.45 + s.userData.o) % 1
      s.position.set(Math.sin(k * 6 + s.userData.o * 5) * 0.06, 0.52 + k * 0.45 + mBody.position.y, 0)
      ;(s.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - k)
      s.scale.setScalar(0.6 + k)
    })
    if (bubbleT > 0) {
      bubbleT -= dt
      if (bubbleT <= 0) bubble.classList.remove('on')
      momo.getWorldPosition(tmp)
      tmp.y += 0.75
      tmp.project(camera)
      bubble.style.left = ((tmp.x + 1) / 2) * innerWidth + 'px'
      bubble.style.top = ((1 - tmp.y) / 2) * innerHeight + 'px'
    }

    // clock + screen
    const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
    minH.rotation.z = (-(d.getMinutes() + d.getSeconds() / 60) / 60) * Math.PI * 2
    hourH.rotation.z = (-((d.getHours() % 12) + d.getMinutes() / 60) / 12) * Math.PI * 2
    secH.rotation.z = (-d.getSeconds() / 60) * Math.PI * 2
    scrT -= dt
    if (scrT <= 0) {
      scrT = 0.5
      drawScreen(t)
    }
    ;(led.material as THREE.MeshBasicMaterial).color.setHSL(0.4, 0.6, 0.5 + Math.sin(t * 3) * 0.12)

    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }

  if (document.fonts) void document.fonts.ready.then(() => drawScreen(0))
  drawScreen(0)
  raf = requestAnimationFrame(tick)

  return {
    zoomIn,
    zoomOut,
    getState: () => state,
    dispose() {
      disposed = true
      running = false
      cancelAnimationFrame(raf)
      clearTimeout(stopTimer)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('click', onClick)
      removeEventListener('resize', onResize)
      renderer.dispose()
    },
  }
}
