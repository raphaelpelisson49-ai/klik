'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * La máquina de la agenda — escena 3D interactiva de klik.
 *
 * Cinco estaciones sobre una placa de metal cuentan lo que hace klik:
 * llamada → respuesta → cita en la agenda → reseña → cobro. Cuatro modos
 * (montada, por dentro, estaciones, sigue a un cliente). Todo procedural:
 * sin modelos ni imágenes; los textos de las pantallas se pintan en canvas
 * con la tipografía de la web y llegan por la prop `copy` (es/en/fr).
 *
 * Rendimiento: animada siempre a 60 fps y con calidad completa mientras está en
 * pantalla; fuera de ella el bucle se apaga.
 *
 * Basado en "Agentic Factory 3D" (Eugene Shilow · vibecoding.tech, construido
 * con OpenAI Codex y portado a React por Claude), adaptado a la marca klik:
 * paleta marino/champagne, fondo transparente, sin paneles de depuración ni
 * objetos globales, sombras horneadas y bucle bajo demanda.
 */

export type MachineMode = 'assembled' | 'cutaway' | 'stations' | 'order'
export type StationId = 'engine' | 'admin' | 'storefront' | 'cabinet' | 'cashdesk'

export type MachineApi = {
  setMode: (mode: MachineMode) => void
  focusStation: (id: StationId) => void
  play: () => void
  pause: () => void
}

/** Textos de la escena. Las pantallas son ilustrativas: "Tu negocio", importes de ejemplo. */
export type MachineCopy = {
  ariaLabel: string
  loading: string
  errorTitle: string
  errorBody: string
  errorWebgl: string
  errorContext: string
  retry: string
  step: string
  stations: Record<StationId, { name: string; output: string; desc: string }>
  /** Cinco pasos [título, detalle] en orden: llamada, respuesta, cita, reseña, cobro. */
  journey: string[][]
  screens: {
    plateTitle: string
    plateLine: string
    plateSub: string
    chatHeader: string
    chatClient: string
    chatReplies: string[]
    agendaTitle: string
    agendaCount: string
    agendaRows: string[][]
    profileName: string
    profileMeta: string
    profileTabs: string
    profileBadge: string
    profileReview: string
    profileReviewer: string
    profileCta: string
    callsTitle: string
    callsSub: string
    calls: string[][]
    incomingName: string
    incomingLine: string
    cashLabel: string
    cashAmount: string
    receiptTitle: string
    receiptSub: string
    receiptItem: string
    receiptQty: string
    receiptPaid: string
    receiptThanks: string
    currency: string
    callCard: string[]
    replyCard: string[]
    apptCard: string[]
    reviewCard: string
  }
}

export type AgendaMachine3DProps = {
  copy: MachineCopy
  /** Alto de la caja, p. ej. 720 o '100%'. */
  height?: number | string
  className?: string
  /** Modo portada: en marcos de más de 900 px la máquina se va al 58 % derecho. */
  embed?: boolean
  onStation?: (id: StationId) => void
  onReady?: () => void
  onApi?: (api: MachineApi | null) => void
}

export default function AgendaMachine3D({
  copy,
  height = '100%',
  className,
  embed = false,
  onStation,
  onReady,
  onApi,
}: AgendaMachine3DProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const handlers = useRef({ onStation, onReady, onApi })
  useEffect(() => {
    handlers.current = { onStation, onReady, onApi }
  }, [onStation, onReady, onApi])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose: (() => void) | undefined
    let cancelled = false
    let idle = 0
    // Montar la escena (geometría, texturas, shaders) cuesta unos cientos de ms:
    // se hace cuando el navegador está libre para no dar un tirón en mitad del scroll.
    // Safari no tiene requestIdleCallback: ahí basta con un setTimeout corto.
    const hasIdle = typeof window.requestIdleCallback === 'function'
    const whenIdle = (cb: () => void) =>
      hasIdle ? window.requestIdleCallback(cb, { timeout: 1200 }) : window.setTimeout(cb, 60)
    // Las pantallas de la escena se pintan en canvas: primero, las fuentes.
    document.fonts.ready.then(() => {
      if (cancelled) return
      idle = whenIdle(() => {
        if (cancelled) return
        dispose = initMachineScene(root, getComputedStyle(root).fontFamily, copy, {
          embedded: embed,
          onStation: (id) => handlers.current.onStation?.(id),
          onReady: () => handlers.current.onReady?.(),
          onApi: (api) => handlers.current.onApi?.(api),
        })
      })
    })
    return () => {
      cancelled = true
      if (hasIdle) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      dispose?.()
      handlers.current.onApi?.(null)
    }
  }, [embed, copy])

  return (
    <div
      ref={rootRef}
      className={['agenda-machine-3d', embed && 'embed', className].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div data-part="scene" role="img" aria-label={copy.ariaLabel} />
      <div className="vignette" />
      <div data-part="journey">
        <div className="journey-icon" aria-hidden>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10v9H3zM6 4V2h4v2m-5 4h6" stroke="currentColor" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <strong data-part="journey-title">{copy.journey[0][0]}</strong>
          <small data-part="journey-detail">{copy.journey[0][1]}</small>
        </div>
        <div className="track">
          <i data-part="journey-progress" />
        </div>
      </div>
      <div data-part="labels" />
      <div data-part="tooltip" role="tooltip">
        <strong />
        <p />
      </div>
      <div data-part="loading">
        <i />
        <span>{copy.loading}</span>
      </div>
      <div data-part="error" role="alert">
        <strong>{copy.errorTitle}</strong>
        <p>{copy.errorBody}</p>
        <button type="button" onClick={() => location.reload()}>
          {copy.retry}
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// La escena
// ---------------------------------------------------------------------------

type SceneOptions = {
  /** Portada: el scroll y el dedo mueven la página, no la escena. */
  embedded: boolean
  onStation?: (id: StationId) => void
  onReady?: () => void
  onApi?: (api: MachineApi | null) => void
}

const GOLD = '#cdb07a'
const GOLD_DEEP = '#b08d52'
const IVORY = '#f4f0e8'
const NAVY = '#0b1a3d'
const NAVY_DEEP = '#061230'
const NAVY_SOFT = '#16295a'
const SLATE = '#9aa6c0'

/**
 * Sin aceleración por hardware (Chrome con la aceleración gráfica apagada, máquinas virtuales…)
 * WebGL se dibuja por software y la escena completa va a pocos fps. Se mira con un contexto de
 * prueba, antes de crear el renderer, para poder quitar el antialiasing (lo más caro ahí).
 */
function isSoftwareGpu(): boolean {
  const probe = document.createElement('canvas').getContext('webgl')
  if (!probe) return false
  const info = probe.getExtension('WEBGL_debug_renderer_info')
  const name = info ? String(probe.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
  probe.getExtension('WEBGL_lose_context')?.loseContext()
  return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(name)
}

function initMachineScene(
  root: HTMLElement,
  fontFamily: string,
  copy: MachineCopy,
  options: SceneOptions
): () => void {
  const cleanups: Array<() => void> = []
  const frameWidth = () => root.clientWidth
  const frameHeight = () => root.clientHeight
  const listen = (target: EventTarget, type: string, handler: (event: never) => void) => {
    const fn = handler as unknown as EventListener
    target.addEventListener(type, fn)
    cleanups.push(() => target.removeEventListener(type, fn))
  }
  function part<T extends HTMLElement = HTMLElement>(name: string): T {
    const el = root.querySelector<T>(`[data-part="${name}"]`)
    if (!el) throw new Error(`Falta [data-part="${name}"] en la escena`)
    return el
  }
  function showError(message?: string) {
    part('loading').classList.add('done')
    part('error').style.display = 'block'
    if (message) part('error').querySelector('p')!.textContent = message
  }
  const dispose = () => {
    for (const fn of cleanups.reverse()) fn()
    cleanups.length = 0
  }
  try {
    const TAU = Math.PI * 2
    const S = copy.screens
    const embedded = options.embedded
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, frameWidth() / frameHeight(), 0.1, 150)
    // Por software, sin antialiasing y a 1x: nítida y lo más ligera posible (bajar la resolución
    // apenas gana fluidez ahí y la deja borrosa).
    const softwareGpu = isSoftwareGpu()
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !softwareGpu, alpha: true, powerPreference: 'high-performance' })
    } catch (e) {
      showError(copy.errorWebgl)
      throw e
    }
    renderer.setClearColor(0x000000, 0)
    // Nítida: hasta 1,25x en escritorio y 1x en móvil (si el equipo no va fluido, baja sola)
    renderer.setPixelRatio(softwareGpu ? 1 : Math.min(devicePixelRatio, frameWidth() < 900 ? 1 : 1.25))
    renderer.setSize(frameWidth(), frameHeight())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    // Sombras horneadas: solo se recalculan cuando las estaciones se mueven (modos)
    renderer.shadowMap.autoUpdate = false
    renderer.shadowMap.needsUpdate = true
    renderer.localClippingEnabled = true
    part('scene').appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 7
    controls.maxDistance = 55
    controls.minPolarAngle = 0.09
    controls.maxPolarAngle = Math.PI * 0.475
    controls.rotateSpeed = 0.48
    controls.zoomSpeed = 0.7
    // Vista fija: no se gira ni se acerca con el ratón o el dedo. La cámara solo la mueven
    // los modos y el clic en una estación; la rueda y el dedo siempre desplazan la página.
    controls.enableRotate = false
    controls.enableZoom = false
    // OrbitControls pone touch-action:none y el dedo quedaría atrapado: devolvemos el scroll.
    renderer.domElement.style.touchAction = 'pan-y'
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.75
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xdbe5f4, 0x101a33, 2))
    const key = new THREE.DirectionalLight(0xfff1d8, 4.2)
    key.position.set(-4, 12, 7)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    Object.assign(key.shadow.camera, { left: -10, right: 10, top: 9, bottom: -9, near: 0.5, far: 35 })
    key.shadow.normalBias = 0.035
    key.shadow.bias = -0.0002
    key.shadow.radius = 4
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xc4d4ed, 3.1)
    rim.position.set(3, 7, -8)
    scene.add(rim)
    // Dos luces menos (la puntual cálida y la frontal): cada luz se calcula en cada píxel.
    // Su aporte lo recogen la luz principal, algo más cálida, y el ambiente.
    key.color.set(0xffe9c8)
    key.intensity = 4.6

    const mat = (color: number, metalness = 0.1, roughness = 0.4, extra: THREE.MeshStandardMaterialParameters = {}) =>
      new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra })
    // Acero azul marino, latón champagne y marfil: la paleta de klik en metal.
    const M = {
      body: mat(0x1c2b4d, 0.75, 0.29),
      base: mat(0x15213d, 0.85, 0.32),
      edge: mat(0x6b7a96, 0.85, 0.24),
      chrome: mat(0xc3cad6, 0.92, 0.18),
      dark: mat(0x0a1330, 0.45, 0.38),
      rubber: mat(0x070d1e, 0.1, 0.6),
      gold: mat(0xcdb07a, 0.62, 0.28),
      ivory: mat(0xe9e4d6, 0.4, 0.28),
      brass: mat(0xb08d52, 0.85, 0.3),
      light: mat(0xe9c37f, 0.2, 0.25, { emissive: 0xe9c37f, emissiveIntensity: 1.5 }),
      green: mat(0xc6d9a1, 0.1, 0.3, { emissive: 0x91b364, emissiveIntensity: 0.7 }),
    }
    type Vec3 = [number, number, number]
    type Material = THREE.Material
    const geometries = new Map<string, THREE.BufferGeometry>()
    function boxGeo(w: number, h: number, d: number, r = 0.04) {
      const k = `b${w},${h},${d},${r}`
      if (!geometries.has(k))
        geometries.set(
          k,
          r ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3)) : new THREE.BoxGeometry(w, h, d)
        )
      return geometries.get(k)!
    }
    function box(
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.body,
      r = 0.04
    ) {
      const o = new THREE.Mesh(boxGeo(w, h, d, r), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function cyl(
      parent: THREE.Object3D,
      r: number,
      h: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.chrome,
      r2: number = r,
      segments = 24
    ) {
      const k = `c${r},${r2},${h},${segments}`
      if (!geometries.has(k)) geometries.set(k, new THREE.CylinderGeometry(r, r2, h, segments))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function ball(parent: THREE.Object3D, r: number, x: number, y: number, z: number, m: Material = M.chrome) {
      const k = `s${r}`
      if (!geometries.has(k)) geometries.set(k, new THREE.SphereGeometry(r, 12, 8))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    function tube(parent: THREE.Object3D, pts: Vec3[], r: number, m: Material = M.chrome) {
      const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))
      const o = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(12, pts.length * 7), r, 8, false), m)
      o.castShadow = true
      parent.add(o)
      return o
    }
    function screw(parent: THREE.Object3D, x: number, y: number, z: number) {
      cyl(parent, 0.055, 0.026, x, y, z, M.chrome, undefined, 12)
      box(parent, 0.068, 0.005, 0.009, x, y + 0.014, z, M.dark, 0)
    }
    type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void
    function canvasTexture(w: number, h: number, draw: Draw) {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      draw(ctx, w, h)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
      return { texture: t, canvas: c, ctx }
    }
    function print(ctx: CanvasRenderingContext2D, txt: string, x: number, y: number, size = 20, color = IVORY, weight = 500) {
      ctx.fillStyle = color
      ctx.font = `${weight} ${size}px ${fontFamily}`
      ctx.fillText(txt, x, y)
    }
    /** Texto en varias líneas dentro de un ancho máximo; devuelve la y de la última línea. */
    function wrap(
      ctx: CanvasRenderingContext2D,
      txt: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      size = 20,
      color = IVORY,
      weight = 500
    ) {
      ctx.font = `${weight} ${size}px ${fontFamily}`
      let line = ''
      for (const word of txt.split(' ')) {
        const test = line ? `${line} ${word}` : word
        if (ctx.measureText(test).width > maxWidth && line) {
          print(ctx, line, x, y, size, color, weight)
          line = word
          y += lineHeight
        } else line = test
      }
      if (line) print(ctx, line, x, y, size, color, weight)
      return y
    }
    function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, color: string) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.roundRect(x, y, w, h, r)
      ctx.fill()
    }
    function stars(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color = GOLD) {
      print(ctx, '★★★★★', x, y, size, color, 500)
    }
    type Painted = THREE.Texture | { texture: THREE.Texture }
    function screen(parent: THREE.Object3D, w: number, h: number, x: number, y: number, z: number, tex: Painted) {
      const map = 'texture' in tex ? tex.texture : tex
      const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map, toneMapped: false }))
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    const machine = new THREE.Group()
    scene.add(machine)
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), new THREE.ShadowMaterial({ opacity: 0.3 }))
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.43
    floor.receiveShadow = true
    scene.add(floor)
    const shadow = canvasTexture(128, 128, (c, w, h) => {
      const g = c.createRadialGradient(64, 64, 12, 64, 64, 64)
      g.addColorStop(0, 'rgba(0,4,16,.85)')
      g.addColorStop(0.55, 'rgba(0,4,16,.45)')
      g.addColorStop(1, 'rgba(0,4,16,0)')
      c.fillStyle = g
      c.fillRect(0, 0, w, h)
    })
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 13),
      new THREE.MeshBasicMaterial({ map: shadow.texture, transparent: true, depthWrite: false, opacity: 0.65 })
    )
    contact.rotation.x = -Math.PI / 2
    contact.position.y = -0.415
    scene.add(contact)

    // Placa base con chaflanes, tornillería y la placa grabada con la marca.
    box(machine, 12.8, 0.38, 8.25, 0, -0.09, 0, M.base, 0.17)
    box(machine, 12.6, 0.055, 8.08, 0, 0.13, 0, M.edge, 0.11)
    box(machine, 12.49, 0.09, 7.96, 0, 0.19, 0, M.body, 0.1)
    box(machine, 12.55, 0.027, 8.02, 0, -0.19, 0, M.dark, 0.06)
    box(machine, 11.9, 0.026, 0.032, 0, -0.17, 4.115, M.light, 0.01)
    for (const x of [-5.6, 5.6])
      for (const z of [-3.35, 3.35]) {
        cyl(machine, 0.39, 0.25, x, -0.31, z, M.rubber)
        cyl(machine, 0.29, 0.09, x, -0.4, z, M.dark)
        screw(machine, x, 0.253, z)
      }
    for (const x of [-6.02, 6.02]) for (const z of [-3.73, 3.73]) screw(machine, x, 0.255, z)
    const engraving = canvasTexture(1536, 176, (c, w, h) => {
      c.fillStyle = '#12203f'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#3b4c72'
      c.lineWidth = 2
      c.strokeRect(2, 2, w - 4, h - 4)
      print(c, S.plateTitle, 45, 82, 46, IVORY, 600)
      print(c, S.plateLine, 190, 79, 30, '#b9c3d8', 450)
      print(c, S.plateSub, 47, 135, 19, '#7887a6', 500)
      print(c, 'Nº 001', 1370, 132, 23, GOLD)
    })
    const plate = screen(machine, 7.35, 0.84, -0.4, 0.25, 3.51, engraving)
    plate.rotation.x = -Math.PI / 2
    for (let i = 0; i < 16; i++)
      box(machine, 0.015, 0.009, 0.11 + (i % 4) * 0.035, -5.6 + i * 0.09, 0.249, 3.5, M.edge, 0)
    // Trazos de plano alrededor de la máquina
    const drafting = new THREE.Group()
    scene.add(drafting)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x8fa3c8, transparent: true, opacity: 0.14 })
    const draftingPoints = []
    for (const r of [7.5, 8.1])
      for (let i = 0; i < 120; i++)
        for (const j of [i, i + 1]) {
          const a = (j / 120) * TAU
          draftingPoints.push(new THREE.Vector3(Math.cos(a) * r, -0.4, Math.sin(a) * r * 0.72))
        }
    for (let i = 0; i < 52; i++) {
      const a = (i / 52) * TAU,
        r = 8.1,
        tick = i % 4 === 0 ? 0.16 : 0.07
      draftingPoints.push(
        new THREE.Vector3(Math.cos(a) * r, -0.395, Math.sin(a) * r * 0.72),
        new THREE.Vector3(Math.cos(a) * (r + tick), -0.395, Math.sin(a) * (r + tick) * 0.72)
      )
    }
    drafting.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(draftingPoints), lineMat))

    // Las cinco estaciones. `step` es su lugar en el recorrido del cliente.
    type StationDef = { id: StationId; step: number; pos: Vec3 }
    type Station = StationDef & {
      name: string
      output: string
      desc: string
      group: THREE.Group
      base: THREE.Vector3
      glowMat: THREE.MeshStandardMaterial
      label: HTMLDivElement
      index: number
      anchor: THREE.Vector3
    }
    const definitions: StationDef[] = [
      { id: 'engine', step: 2, pos: [-4.15, 0.29, -0.65] },
      { id: 'admin', step: 3, pos: [-1.65, 0.29, -2.03] },
      { id: 'storefront', step: 4, pos: [1.5, 0.29, -2.08] },
      { id: 'cabinet', step: 1, pos: [4.03, 0.29, 0.12] },
      { id: 'cashdesk', step: 5, pos: [0.93, 0.29, 1.85] },
    ]
    const stations: Station[] = [],
      cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10)
    function shell<T extends THREE.Material>(m: T): T {
      const s = m.clone() as T
      s.clippingPlanes = [cutPlane]
      s.clipShadows = true
      s.side = THREE.DoubleSide
      return s
    }
    const SH = { body: shell(M.body), ivory: shell(M.ivory), gold: shell(M.gold) }
    const gears: THREE.Group[] = []
    function gear(parent: THREE.Object3D, x: number, y: number, z: number, r = 0.3) {
      const g = new THREE.Group()
      g.position.set(x, y, z)
      parent.add(g)
      cyl(g, r, 0.09, 0, 0, 0, M.brass)
      cyl(g, r * 0.66, 0.105, 0, 0, 0, M.dark)
      cyl(g, r * 0.22, 0.14, 0, 0, 0, M.chrome)
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU,
          b = box(g, r * 0.26, 0.085, r * 0.2, Math.cos(a) * r, 0, Math.sin(a) * r, M.brass, 0.008)
        b.rotation.y = -a
      }
      g.userData.moving = true
      gears.push(g)
      return g
    }
    definitions.forEach((d, i) => {
      const text = copy.stations[d.id]
      const group = new THREE.Group()
      group.position.fromArray(d.pos)
      machine.add(group)
      const glowMat = M.light.clone()
      glowMat.emissiveIntensity = 0.5
      box(group, 2.05, 0.12, 1.78, 0, 0.03, 0, M.dark, 0.1)
      box(group, 1.97, 0.03, 1.7, 0, 0.12, 0, glowMat, 0.09)
      box(group, 2.03, 0.17, 1.75, 0, 0.215, 0, M.body, 0.1)
      for (const x of [-0.85, 0.85]) for (const z of [-0.7, 0.7]) screw(group, x, 0.311, z)
      // Mecánica interior: se ve al cortar la carcasa (modo "por dentro").
      gear(group, -0.35, 0.45, 0, 0.27)
      gear(group, 0.22, 0.45, 0.12, 0.21)
      box(group, 0.6, 0.15, 0.36, 0.52, 0.47, -0.33, M.dark)
      for (let j = 0; j < 6; j++) box(group, 0.025, 0.16, 0.37, 0.3 + j * 0.08, 0.47, -0.33, M.edge, 0.004)
      tube(group, [[-0.7, 0.4, -0.4], [-0.55, 0.48, 0.4], [0.35, 0.45, 0.6], [0.7, 0.58, 0.23]], 0.023, M.light)
      const plaque = canvasTexture(512, 116, (c, w, h) => {
        c.fillStyle = NAVY_DEEP
        c.fillRect(0, 0, w, h)
        print(c, String(i + 1).padStart(2, '0'), 24, 76, 42, GOLD, 550)
        print(c, text.name.toUpperCase(), 111, 73, 35, '#dfe4ee', 550)
      })
      screen(group, 1.54, 0.345, 0, 0.27, 0.891, plaque)
      const label = document.createElement('div')
      label.className = 'station-label'
      const num = String(i + 1).padStart(2, '0')
      label.innerHTML = `<div class="stem"></div><div class="label-card"><div class="label-title"><span>${num}</span></div><div class="label-meta"></div></div>`
      label.querySelector('.label-title')!.append(text.name)
      label.querySelector('.label-meta')!.textContent = `${copy.step} ${d.step} · ${text.output}`
      part('labels').appendChild(label)
      cleanups.push(() => label.remove())
      stations.push({
        ...d,
        ...text,
        group,
        base: new THREE.Vector3(...d.pos),
        glowMat,
        label,
        index: i,
        anchor: new THREE.Vector3(0, 2.5, 0),
      })
    })

    // 1 · Respuesta: un móvil que contesta al momento.
    const engine = stations[0].group
    box(engine, 1.74, 0.62, 1.33, 0, 0.65, -0.05, SH.ivory, 0.13)
    box(engine, 1.5, 0.1, 1.16, 0, 0.99, -0.04, SH.body, 0.025)
    for (const x of [-0.68, 0.68]) {
      cyl(engine, 0.065, 1.73, x, 1.35, -0.18, M.chrome)
      box(engine, 0.22, 1.8, 0.22, x, 1.37, -0.44, SH.ivory, 0.035)
    }
    box(engine, 1.82, 0.27, 0.4, 0, 2.28, -0.35, SH.gold, 0.045)
    box(engine, 1.55, 0.06, 0.06, 0, 2.13, -0.115, M.chrome, 0.01)
    const printhead = new THREE.Group()
    engine.add(printhead)
    printhead.position.set(0, 1.9, -0.08)
    printhead.userData.moving = true
    box(printhead, 0.45, 0.36, 0.44, 0, 0, 0, M.body, 0.05)
    cyl(printhead, 0.11, 0.13, 0, -0.24, 0.03, M.chrome, 0.04)
    box(printhead, 0.24, 0.045, 0.022, 0, 0.09, 0.23, M.light, 0.01)
    tube(engine, [[-0.68, 2.1, -0.35], [-0.42, 2.52, -0.4], [0.25, 2.5, -0.4], [0.35, 2.01, -0.12]], 0.032, M.dark)
    const reels: THREE.Group[] = []
    for (const [x, y] of [
      [-1.03, 1.82],
      [-0.94, 2.78],
    ]) {
      const reel = new THREE.Group()
      reel.position.set(x, y, -0.48)
      engine.add(reel)
      reel.userData.moving = true
      const core = cyl(reel, 0.4, 0.22, 0, 0, 0, M.dark)
      core.rotation.x = Math.PI / 2
      for (const z of [-0.14, 0.14]) {
        const disc = cyl(reel, 0.46, 0.045, 0, 0, z, M.chrome)
        disc.rotation.x = Math.PI / 2
        for (let j = 0; j < 6; j++) {
          const a = (j / 6) * TAU
          const hole = cyl(reel, 0.1, 0.006, Math.cos(a) * 0.29, Math.sin(a) * 0.29, z + (z > 0 ? 0.026 : -0.026), M.dark, undefined, 14)
          hole.rotation.x = Math.PI / 2
        }
      }
      const axle = cyl(reel, 0.095, 0.37, 0, 0, 0, M.gold)
      axle.rotation.x = Math.PI / 2
      reels.push(reel)
    }
    tube(engine, [[-1.36, 2.66, -0.48], [-1.5, 2.34, -0.48], [-1.34, 1.92, -0.48]], 0.045, M.dark)
    const chat = canvasTexture(384, 640, () => {})
    function drawChat(t: number) {
      const c = chat.ctx,
        w = 384,
        h = 640
      c.fillStyle = NAVY
      c.fillRect(0, 0, w, h)
      c.fillStyle = NAVY_SOFT
      c.fillRect(0, 0, w, 78)
      c.fillStyle = '#7fd19b'
      c.beginPath()
      c.arc(34, 39, 9, 0, TAU)
      c.fill()
      print(c, S.chatHeader, 56, 48, 24, IVORY, 600)
      roundRect(c, 20, 104, 300, 132, 16, '#e9e4d6')
      wrap(c, S.chatClient, 40, 146, 260, 32, 23, '#0b1a3d', 550)
      const n = Math.floor(t * 0.45) % S.chatReplies.length
      roundRect(c, 64, 266, 300, 168, 16, GOLD)
      wrap(c, S.chatReplies[n], 84, 308, 260, 32, 23, '#0b1a3d', 600)
      for (let i = 0; i < 3; i++) {
        c.fillStyle = `rgba(244,240,232,${0.25 + 0.6 * Math.max(0, Math.sin(t * 5 - i * 0.7))})`
        c.beginPath()
        c.arc(48 + i * 22, 486, 7, 0, TAU)
        c.fill()
      }
      c.fillStyle = '#e9c37f'
      c.fillRect(24, 600, Math.max(10, ((t * 0.13) % 1) * 336), 5)
      chat.texture.needsUpdate = true
    }
    drawChat(0)
    const outputPhone = new THREE.Group()
    outputPhone.userData.moving = true
    engine.add(outputPhone)
    box(outputPhone, 0.62, 1.08, 0.055, 0, 1.36, 0.61, M.dark, 0.035)
    screen(outputPhone, 0.56, 0.98, 0, 1.36, 0.641, chat)
    box(engine, 1.14, 0.12, 0.2, 0, 0.83, 0.66, M.dark, 0.025)
    for (const x of [-0.42, 0.42]) {
      const r = cyl(engine, 0.115, 0.18, x, 0.92, 0.6, M.chrome)
      r.rotation.z = Math.PI / 2
    }
    for (let i = 0; i < 5; i++) box(engine, 0.08, 0.03, 0.22, -0.38 + i * 0.19, 1.011, -0.02, M.edge, 0.005)

    // 2 · Agenda: la consola con las citas del día.
    const admin = stations[1].group
    box(admin, 1.9, 0.66, 1.36, 0, 0.67, -0.04, SH.body, 0.11)
    const consoleTop = new THREE.Group()
    consoleTop.position.set(0, 1.01, -0.08)
    consoleTop.rotation.x = -0.32
    admin.add(consoleTop)
    box(consoleTop, 1.76, 0.12, 1.27, 0, 0, 0, SH.ivory, 0.04)
    const agenda = canvasTexture(640, 340, () => {})
    function drawAgenda(t: number) {
      const c = agenda.ctx
      c.fillStyle = NAVY_DEEP
      c.fillRect(0, 0, 640, 340)
      print(c, S.agendaTitle, 25, 45, 21, SLATE, 550)
      print(c, S.agendaCount, 520, 45, 20, GOLD, 500)
      for (let i = 0; i < 3; i++) {
        const y = 74 + i * 76
        roundRect(c, 21, y, 598, 61, 6, '#13254f')
        c.fillStyle = i === 0 ? GOLD : '#4f6390'
        c.fillRect(34, y + 10, 8, 41)
        print(c, S.agendaRows[i][0], 58, y + 29, 19, '#dfe4ee')
        print(c, S.agendaRows[i][1], 58, y + 50, 11, i === 0 ? GOLD : '#8a9bc0', 600)
        c.fillStyle = '#22386b'
        c.fillRect(397, y + 26, 194, 7)
        c.fillStyle = i === 0 ? '#e9c37f' : '#5d74a6'
        c.fillRect(397, y + 26, i === 0 ? ((t * 0.15) % 1) * 194 : 60 + i * 34, 7)
      }
      agenda.texture.needsUpdate = true
    }
    drawAgenda(0)
    const as = screen(consoleTop, 1.53, 0.79, 0, 0.067, -0.17, agenda)
    as.rotation.x = -Math.PI / 2
    const toggles: THREE.Mesh[] = []
    for (let i = 0; i < 4; i++) {
      const x = -0.57 + i * 0.38
      cyl(consoleTop, 0.074, 0.035, x, 0.1, 0.45, M.dark)
      const t = cyl(consoleTop, 0.025, 0.15, x, 0.19, 0.45, M.chrome)
      t.rotation.x = -0.4
      t.userData.moving = true
      toggles.push(t)
      ball(consoleTop, 0.04, x, 0.275, 0.421, M.ivory)
    }
    cyl(admin, 0.075, 0.06, 0.77, 1.05, -0.62, M.green)
    for (let i = 0; i < 7; i++) box(admin, 0.55, 0.027, 0.02, 0, 0.46 + i * 0.05, 0.655, M.dark, 0.003)

    // 3 · Reseñas: la ficha del negocio en Google con la reseña nueva.
    const storefront = stations[2].group
    box(storefront, 1.35, 0.18, 0.88, 0, 0.44, 0, SH.ivory, 0.045)
    cyl(storefront, 0.095, 1.04, 0, 0.93, -0.31, M.chrome)
    box(storefront, 0.56, 0.91, 0.14, 0, 0.99, -0.34, SH.body, 0.04)
    box(storefront, 2.42, 1.72, 0.2, 0, 1.94, -0.17, SH.ivory, 0.08)
    box(storefront, 2.28, 1.59, 0.1, 0, 1.94, -0.044, M.dark, 0.045)
    const profile = canvasTexture(896, 592, (c, w, h) => {
      c.fillStyle = '#f4f0e8'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#e6e0d2'
      c.fillRect(0, 0, w, 56)
      c.fillStyle = '#b3ac9c'
      for (let i = 0; i < 3; i++) {
        c.beginPath()
        c.arc(26 + i * 19, 27, 4, 0, TAU)
        c.fill()
      }
      roundRect(c, 32, 84, 287, 448, 12, '#001f54')
      c.strokeStyle = GOLD
      c.lineWidth = 6
      c.beginPath()
      c.arc(175, 270, 92, 0, TAU)
      c.stroke()
      print(c, '★', 128, 316, 120, GOLD, 500)
      print(c, S.profileBadge, 58, 470, 30, IVORY, 650)
      print(c, S.profileName, 352, 128, 42, '#001f54', 650)
      stars(c, 354, 172, 30)
      print(c, S.profileMeta, 354, 210, 19, '#4c5468')
      print(c, S.profileTabs, 354, 254, 17, '#7a8296', 500)
      c.fillStyle = '#d9d2c3'
      c.fillRect(354, 268, 500, 2)
      roundRect(c, 352, 290, 510, 150, 10, '#ffffff')
      stars(c, 376, 330, 22)
      wrap(c, S.profileReview, 376, 368, 460, 30, 22, '#001f54', 550)
      print(c, S.profileReviewer, 376, 424, 16, '#7a8296')
      roundRect(c, 352, 466, 260, 62, 31, '#001f54')
      print(c, S.profileCta, 384, 505, 22, IVORY, 550)
    })
    screen(storefront, 2.16, 1.43, 0, 1.95, 0.011, profile)
    ball(storefront, 0.024, 0, 2.747, -0.05, M.dark)
    box(storefront, 0.21, 0.019, 0.008, 0, 1.149, 0.013, M.light, 0.003)
    const reviewCard = canvasTexture(220, 290, (c, w, h) => {
      c.fillStyle = '#f4f0e8'
      c.fillRect(0, 0, w, h)
      roundRect(c, 15, 16, 190, 168, 8, '#001f54')
      print(c, '★', 64, 140, 110, GOLD, 500)
      print(c, S.reviewCard, 17, 225, 23, '#001f54', 600)
      stars(c, 17, 258, 22)
    })
    const flyReview = new THREE.Group()
    flyReview.userData.moving = true
    storefront.add(flyReview)
    box(flyReview, 0.59, 0.77, 0.045, 0.94, 0.81, 0.55, M.ivory, 0.025)
    screen(flyReview, 0.55, 0.72, 0.94, 0.81, 0.575, reviewCard)

    // 4 · Llamadas: el panel donde entran los clientes nuevos.
    const cabinet = stations[3].group
    box(cabinet, 1.75, 1.77, 1.02, 0, 1.24, -0.13, SH.body, 0.12)
    box(cabinet, 1.58, 0.13, 1.09, 0, 2.16, -0.13, SH.gold, 0.04)
    box(cabinet, 1.47, 1.38, 0.055, 0, 1.31, 0.405, M.dark, 0.025)
    const callsTex = canvasTexture(480, 460, (c, w, h) => {
      c.fillStyle = NAVY_DEEP
      c.fillRect(0, 0, w, h)
      print(c, S.callsTitle, 30, 51, 27, '#e6eaf2', 600)
      print(c, S.callsSub, 30, 81, 16, '#8a9bc0')
      S.calls.forEach(([name, status], i) => {
        const y = 110 + i * 100
        roundRect(c, 22, y, 436, 83, 8, '#13254f')
        c.fillStyle = [GOLD, '#c9cfdd', '#6f84b3'][i]
        c.beginPath()
        c.arc(58, y + 40, 19, 0, TAU)
        c.fill()
        print(c, name[0], 50, y + 47, 20, '#0b1a3d', 600)
        print(c, name, 93, y + 33, 23, '#e6eaf2', 550)
        print(c, status, 93, y + 58, 15, '#9aa6c0')
        print(c, '↗', 410, y + 49, 25, GOLD_DEEP)
      })
    })
    screen(cabinet, 1.31, 1.255, 0, 1.37, 0.44, callsTex)
    box(cabinet, 1.27, 0.075, 0.29, 0, 0.57, 0.55, M.chrome, 0.02)
    for (let i = 0; i < 3; i++) box(cabinet, 1.15, 0.021, 0.12, 0, 0.58 + i * 0.15, -0.35, M.brass, 0.006)
    tube(cabinet, [[0.69, 0.43, -0.2], [0.89, 0.65, -0.2], [0.89, 1.8, -0.2], [0.65, 1.99, -0.2]], 0.033, M.chrome)
    const incoming = new THREE.Group()
    incoming.userData.moving = true
    cabinet.add(incoming)
    box(incoming, 0.86, 0.42, 0.043, 0, 0, 0, M.light, 0.035)
    const incomingTex = canvasTexture(432, 204, (c, w, h) => {
      c.fillStyle = GOLD
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#001f54'
      c.beginPath()
      c.arc(58, 98, 32, 0, TAU)
      c.fill()
      print(c, S.incomingName[0], 45, 112, 34, GOLD, 550)
      print(c, S.incomingName, 108, 91, 38, '#001f54', 650)
      print(c, S.incomingLine, 108, 138, 23, '#2b3a63', 550)
    })
    screen(incoming, 0.82, 0.39, 0, 0, 0.026, incomingTex)

    // 5 · Cobro: trabajo hecho, factura impresa y moneda en la caja.
    const cashdesk = stations[4].group
    box(cashdesk, 1.91, 0.63, 1.32, 0, 0.65, -0.06, SH.ivory, 0.12)
    box(cashdesk, 1.96, 0.19, 1.38, 0, 0.42, -0.04, SH.body, 0.04)
    box(cashdesk, 1.37, 0.09, 0.038, 0, 0.44, 0.66, M.dark, 0.01)
    box(cashdesk, 0.37, 0.042, 0.03, 0, 0.45, 0.687, M.chrome, 0.009)
    box(cashdesk, 1.02, 0.25, 0.91, -0.33, 1.04, -0.03, SH.body, 0.045)
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        box(cashdesk, 0.19, 0.085, 0.17, -0.62 + col * 0.27, 1.21, 0.27 - row * 0.24, col === 2 && row === 2 ? M.gold : M.ivory, 0.022)
    box(cashdesk, 0.64, 0.6, 0.52, 0.58, 1.04, -0.15, SH.body, 0.045)
    box(cashdesk, 0.48, 0.07, 0.09, 0.59, 1.37, -0.1, M.dark, 0.01)
    cyl(cashdesk, 0.06, 0.65, -0.35, 1.6, -0.56, M.chrome)
    box(cashdesk, 1.13, 0.46, 0.19, -0.35, 1.98, -0.56, SH.body, 0.045)
    const cashTex = canvasTexture(512, 176, (c) => {
      c.fillStyle = '#0e2433'
      c.fillRect(0, 0, 512, 176)
      print(c, S.cashLabel, 22, 44, 23, '#9fc4a8', 550)
      print(c, S.cashAmount, 26, 131, 64, '#eef0d9', 500)
    })
    screen(cashdesk, 1.015, 0.349, -0.35, 1.98, -0.459, cashTex)
    const receipt = new THREE.Group()
    receipt.position.set(0.59, 1.37, -0.1)
    receipt.userData.moving = true
    cashdesk.add(receipt)
    const receiptTex = canvasTexture(280, 540, (c, w, h) => {
      c.fillStyle = '#f4f0e8'
      c.fillRect(0, 0, w, h)
      print(c, S.receiptTitle, 25, 52, 21, '#001f54', 650)
      print(c, S.receiptSub, 25, 87, 19, '#4c5468')
      c.strokeStyle = '#9aa1b2'
      c.setLineDash([5, 6])
      c.beginPath()
      c.moveTo(22, 115)
      c.lineTo(258, 115)
      c.stroke()
      wrap(c, S.receiptItem, 25, 154, 230, 26, 21, '#001f54')
      print(c, S.receiptQty, 25, 214, 21, '#001f54')
      print(c, S.receiptPaid, 25, 275, 31, '#001f54', 650)
      print(c, S.receiptThanks, 25, 322, 23, '#4c5468')
      for (let i = 0; i < 44; i++) {
        c.fillStyle = '#001f54'
        c.fillRect(25 + i * 5, 370, 1 + (i % 3), 83)
      }
      print(c, 'Nº 0001', 81, 496, 17, '#4c5468')
    })
    const rp = screen(receipt, 0.41, 0.83, 0, 0.415, 0.01, receiptTex)
    ;(rp.material as THREE.MeshBasicMaterial).side = THREE.DoubleSide
    receipt.rotation.x = -0.16
    const coin = new THREE.Group()
    coin.userData.moving = true
    cashdesk.add(coin)
    const coinDisc = cyl(coin, 0.22, 0.065, 0, 0, 0, M.gold, undefined, 32)
    coinDisc.rotation.x = Math.PI / 2
    const coinRing = new THREE.Mesh(new THREE.TorusGeometry(0.174, 0.014, 6, 32), M.light)
    coinRing.position.z = 0.037
    coin.add(coinRing)
    const currencyTex = canvasTexture(128, 128, (c) => {
      c.textAlign = 'center'
      print(c, S.currency, 64, 95, 91, '#6e5427', 650)
    })
    const currency = screen(coin, 0.28, 0.28, 0, 0, 0.04, currencyTex)
    ;(currency.material as THREE.MeshBasicMaterial).transparent = true
    cyl(cashdesk, 0.33, 0.09, 1.04, 0.39, 0.55, M.dark)
    cyl(cashdesk, 0.26, 0.025, 1.04, 0.445, 0.55, M.brass)

    // Cinta transportadora: spline cerrada, eslabones instanciados y carga sincronizada.
    const path = new THREE.CatmullRomCurve3(
      (
        [
          [-3.95, 0.84, 0.65],
          [-3.1, 0.84, -0.12],
          [-1.45, 0.84, -0.79],
          [1.32, 0.84, -0.8],
          [3.3, 0.84, 0.19],
          [3.43, 0.84, 1.21],
          [1.35, 0.84, 2.7],
          [-1.4, 0.84, 2.52],
          [-3.54, 0.84, 1.65],
        ] as Vec3[]
      ).map((p) => new THREE.Vector3(...p)),
      true,
      'catmullrom',
      0.25
    )
    const belt = new THREE.Group()
    machine.add(belt)
    const frameMesh = new THREE.Mesh(new THREE.TubeGeometry(path, 150, 0.35, 8, true), M.dark)
    frameMesh.scale.y = 0.3
    frameMesh.position.y = 0.51
    belt.add(frameMesh)
    const beltCount = 148,
      beltSlats = new THREE.InstancedMesh(boxGeo(0.135, 0.065, 0.63, 0.012), M.body, beltCount)
    beltSlats.receiveShadow = true
    belt.add(beltSlats)
    beltSlats.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    const dummy = new THREE.Object3D(),
      pVec = new THREE.Vector3(),
      tVec = new THREE.Vector3()
    function updateBelt(t: number) {
      for (let i = 0; i < beltCount; i++) {
        const u = (i / beltCount + t * 0.012) % 1
        path.getPointAt(u, pVec)
        path.getTangentAt(u, tVec)
        dummy.position.copy(pVec)
        dummy.rotation.set(0, -Math.atan2(tVec.z, tVec.x), 0)
        dummy.updateMatrix()
        beltSlats.setMatrixAt(i, dummy.matrix)
      }
      beltSlats.instanceMatrix.needsUpdate = true
    }
    updateBelt(0)
    for (const side of [-1, 1]) {
      const pts = []
      for (let i = 0; i <= 160; i++) {
        path.getPointAt(i / 160, pVec)
        path.getTangentAt(i / 160, tVec)
        pts.push(pVec.clone().add(new THREE.Vector3(-tVec.z * 0.36 * side, 0.09, tVec.x * 0.36 * side)))
      }
      belt.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.028, 6, false), M.chrome))
    }
    for (let i = 0; i < 16; i++) {
      const p = path.getPointAt(i / 16)
      cyl(belt, 0.045, 0.43, p.x, 0.53, p.z, M.chrome)
    }
    // Tuberías de latón entre las bases de las estaciones.
    const pipes = new THREE.Group()
    machine.add(pipes)
    for (let i = 0; i < 4; i++) {
      const a = stations[i].base,
        b = stations[i + 1].base
      const curve = new THREE.CatmullRomCurve3([
        a.clone().add(new THREE.Vector3(0.4, 0.12, 0)),
        a.clone().lerp(b, 0.35).add(new THREE.Vector3(0, 0.1, -0.6)),
        a.clone().lerp(b, 0.65).add(new THREE.Vector3(0, 0.1, -0.6)),
        b.clone().add(new THREE.Vector3(-0.4, 0.12, 0)),
      ])
      pipes.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.054, 8, false), M.brass))
    }
    // Tarjetas que viajan por la cinta: llamada → respuesta → cita → reseña → factura.
    const callCard = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = GOLD
      c.fillRect(0, 0, w, h)
      print(c, S.callCard[0], 21, 48, 24, '#001f54', 650)
      print(c, S.callCard[1], 21, 79, 24, '#001f54', 650)
      c.strokeStyle = '#6e5427'
      c.lineWidth = 2
      c.strokeRect(23, 112, 210, 139)
      print(c, S.callCard[2], 42, 190, 37, '#001f54', 550)
      print(c, S.callCard[3], 23, 320, 17, '#4a3a1c')
    })
    const replyCard = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#eef0f6'
      c.fillRect(0, 0, w, h)
      print(c, S.replyCard[0], 24, 47, 22, '#001f54', 650)
      print(c, S.replyCard[1], 24, 85, 15, '#6a7590')
      for (let i = 0; i < 9; i++) {
        c.fillStyle = i === 4 ? GOLD_DEEP : '#b6bdcd'
        c.fillRect(24, 111 + i * 21, 190 - (i % 3) * 24, 6)
      }
      print(c, S.replyCard[2], 24, 327, 17, '#2f6b48', 600)
    })
    const apptCard = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#001f54'
      c.fillRect(0, 0, w, h)
      print(c, S.apptCard[0], 24, 50, 24, GOLD, 650)
      c.strokeStyle = 'rgba(205,176,122,.5)'
      c.lineWidth = 2
      c.strokeRect(24, 78, 208, 150)
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 4; j++) {
          c.fillStyle = i === 1 && j === 2 ? GOLD : 'rgba(244,240,232,.18)'
          c.fillRect(36 + j * 48, 92 + i * 44, 38, 32)
        }
      wrap(c, S.apptCard[1], 24, 268, 210, 26, 22, IVORY, 550)
      print(c, S.apptCard[2], 24, 327, 17, '#9fc4a8', 600)
    })
    const packetTextures = [callCard, replyCard, apptCard, reviewCard, receiptTex]
    const packets: Array<{
      group: THREE.Group
      faces: THREE.Mesh[]
      halo: THREE.Mesh
      stage: number
      phase: number
    }> = []
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group()
      g.userData.moving = true
      machine.add(g)
      box(g, 0.47, 0.71, 0.04, 0, 0, 0, M.ivory, 0.022)
      const faces = packetTextures.map((tex) => {
        const s = screen(g, 0.43, 0.665, 0, 0, 0.024, tex)
        ;(s.material as THREE.MeshBasicMaterial).side = THREE.DoubleSide
        s.visible = false
        return s
      })
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.414, 40),
        new THREE.MeshBasicMaterial({ color: 0xe9c37f, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false })
      )
      halo.rotation.x = -Math.PI / 2
      halo.position.y = -0.37
      g.add(halo)
      halo.visible = false
      packets.push({ group: g, faces, halo, stage: -1, phase: 0 })
    }
    // Puertos por longitud de arco: la carga llega justo a cada estación.
    function nearestPort(x: number, z: number) {
      let best = 0,
        dist = Infinity
      for (let i = 0; i < 300; i++) {
        const p = path.getPointAt(i / 300),
          d = (p.x - x) ** 2 + (p.z - z) ** 2
        if (d < dist) {
          dist = d
          best = i / 300
        }
      }
      return best
    }
    const adminU = nearestPort(-1.65, -0.7),
      storeU = nearestPort(1.5, -0.7),
      cashU = nearestPort(0.93, 2.65)

    // Fusiona la geometría estática por material; las piezas que se mueven quedan aparte.
    function compact(group: THREE.Object3D) {
      for (const child of [...group.children]) if ((child as THREE.Group).isGroup) compact(child)
      const buckets = new Map<string, THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]>()
      for (const object of group.children) {
        const child = object as THREE.Mesh<THREE.BufferGeometry, THREE.Material> & { isInstancedMesh?: boolean }
        if (!child.isMesh || child.isInstancedMesh || child.userData.moving || Array.isArray(child.material)) continue
        const key = child.material.uuid
        if (!buckets.has(key)) buckets.set(key, [])
        buckets.get(key)!.push(child)
      }
      for (const list of buckets.values()) {
        if (list.length < 2) continue
        const geos = list.map((m) => {
          m.updateMatrix()
          const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()
          return g.applyMatrix4(m.matrix)
        })
        const merged = mergeGeometries(geos, false)
        for (const geo of geos) geo.dispose()
        if (!merged) continue
        const mesh = new THREE.Mesh(merged, list[0].material)
        mesh.castShadow = list.some((x) => x.castShadow)
        mesh.receiveShadow = list.some((x) => x.receiveShadow)
        for (const m of list) group.remove(m)
        group.add(mesh)
      }
    }
    compact(machine)
    // Las piezas que se mueven no proyectan sombra: el mapa de sombras está horneado.
    machine.traverse((o) => {
      if (o.userData.moving) o.traverse((c) => (c.castShadow = false))
    })
    stations.forEach((s) =>
      s.group.traverse((o) => {
        o.userData.station = s.id
      })
    )
    const pickables = stations.map((s) => s.group)

    let mode: MachineMode = 'assembled',
      cameraMode: 'overview' | 'station' = 'overview',
      playing = !reduceMotion,
      simTime = 0,
      spread = 0,
      selected: StationId = 'engine',
      hovered: StationId | null = null
    let width = frameWidth(),
      height = frameHeight(),
      mobile = width <= 900,

      dragging = false,
      wasDragged = false,
      downX = 0,
      downY = 0
    let cameraAnimating = true,
      lastDraw = -1,
      visible = true,
      contextLost = false
    const desiredPosition = new THREE.Vector3(),
      desiredTarget = new THREE.Vector3(0, 1, 0)
    const viewDirection = new THREE.Vector3(10.5, 10.8, 17).normalize()
    let baseDistance = 25,
      sized = false,
      readySent = false
    // Un marco de tamaño 0 dejaba la cámara en el infinito: se espera a un tamaño real.
    function layoutCamera() {
      if (!frameWidth() || !frameHeight()) return
      const first = !sized
      sized = true
      width = frameWidth()
      height = frameHeight()
      mobile = width <= 900
      renderer.setSize(width, height)
      camera.aspect = width / height
      // En portada ancha, el frustum desplazado centra la máquina en el 58 % derecho.
      camera.setViewOffset(width, height, mobile || !embedded ? 0 : -width * 0.21, mobile || embedded ? 0 : height * 0.025, width, height)
      const aspect = width / height
      const availableWidth = mobile ? 0.91 : Math.min(0.55, aspect > 2 ? 0.54 : 0.57)
      const horizontalFit = 17.3 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect * availableWidth)
      const verticalFit = 11.5 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (embedded ? 0.85 : 0.62))
      baseDistance = (Math.max(horizontalFit, verticalFit) * (mobile ? 0.97 : 1)) / (embedded ? (mobile ? 1.4 : 1.3) : 1)
      controls.maxDistance = Math.max(55, baseDistance * 1.6)
      camera.updateProjectionMatrix()
      setCameraGoal()
      cameraAnimating = true
      if (first) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
      }
      wake()
    }
    function setCameraGoal() {
      const expand = mode === 'stations' ? 1.2 : 1
      if (cameraMode === 'station') {
        const s = stations.find((s) => s.id === selected)!
        desiredTarget.copy(s.group.position).add(new THREE.Vector3(0, 1.25, 0))
        desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 9 : 12)
      } else {
        desiredTarget.set(0, 1, 0)
        desiredPosition.copy(viewDirection).multiplyScalar(baseDistance * expand).add(desiredTarget)
      }
    }
    function setMode(next: MachineMode) {
      mode = next
      cameraMode = 'overview'
      if (mode === 'order') {
        simTime = 0
        lastDraw = -1
        playing = true
      }
      setCameraGoal()
      cameraAnimating = true
      part('journey').classList.toggle('visible', mode === 'order')
      wakeFor(5000)
    }
    function focusStation(id: StationId) {
      if (!stations.some((s) => s.id === id)) return
      selected = id
      if (mode === 'order') {
        mode = 'assembled'
        part('journey').classList.remove('visible')
      }
      cameraMode = 'station'
      setCameraGoal()
      cameraAnimating = true
      wakeFor(5000)
    }
    const api: MachineApi = {
      setMode,
      focusStation,
      play: () => {
        playing = true
        wakeFor(5000)
      },
      pause: () => {
        playing = false
      },
    }
    options.onApi?.(api)
    cleanups.push(() => options.onApi?.(null))

    // Estado del bucle (se declara antes de usarse en layoutCamera/eventos).
    let prevJourney = -1,
      lastFrame = performance.now(),
      frameCount = 0,
      measureTime = 0,
      pixelRatio = renderer.getPixelRatio(),
      rafId = 0,
      running = false,
      shadowSpread = -1,
      shadowCut = -1,
      // Hasta cuándo debe seguir animándose (aparición, ratón encima, modos, giro).
      activeUntil = 0

    layoutCamera()
    camera.position.copy(desiredPosition)
    controls.target.copy(desiredTarget)
    controls.update()
    cameraAnimating = false
    const resizeObserver = new ResizeObserver(() => layoutCamera())
    resizeObserver.observe(root)
    cleanups.push(() => resizeObserver.disconnect())
    controls.addEventListener('start', () => {
      dragging = true
      cameraAnimating = false
      wake()
    })
    controls.addEventListener('end', () => {
      dragging = false
      // El giro sigue un instante por la inercia (damping)
      wakeFor(1500)
    })
    const raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2(),
      tooltip = part('tooltip')
    const local = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top] as const
    }
    function hitStation(x: number, y: number) {
      pointer.set((x / width) * 2 - 1, (-y / height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(pickables, true)
      return hits.length ? stations.find((s) => s.id === hits[0].object.userData.station) : null
    }
    listen(renderer.domElement, 'pointermove', (e: PointerEvent) => {
      // Con el ratón encima la máquina se anima; al irse, se detiene a los pocos segundos.
      wakeFor(2500)
      const [x, y] = local(e)
      if (Math.hypot(x - downX, y - downY) > 5) wasDragged = true
      if (dragging) return
      const s = hitStation(x, y)
      hovered = s ? s.id : null
      renderer.domElement.style.cursor = s ? 'pointer' : 'default'
      tooltip.classList.toggle('visible', !!s)
      if (s) {
        const title = tooltip.querySelector('strong')!
        title.innerHTML = `<span>${String(s.index + 1).padStart(2, '0')}</span>`
        title.append(s.name)
        tooltip.querySelector('p')!.textContent = s.desc
        tooltip.style.left = Math.min(width - 255, Math.max(10, x + 16)) + 'px'
        tooltip.style.top = Math.max(10, Math.min(height - 95, y - 65)) + 'px'
      }
    })
    listen(renderer.domElement, 'pointerleave', () => {
      hovered = null
      tooltip.classList.remove('visible')
      wakeFor(600)
    })
    listen(renderer.domElement, 'pointerdown', (e: PointerEvent) => {
      ;[downX, downY] = local(e)
      wasDragged = false
      tooltip.classList.remove('visible')
    })
    listen(renderer.domElement, 'pointerup', (e: PointerEvent) => {
      if (wasDragged) return
      const s = hitStation(...local(e))
      if (!s) return
      focusStation(s.id)
      options.onStation?.(s.id)
    })
    // Fuera de pantalla (o con la pestaña oculta) el bucle se detiene del todo; vuelve al entrar.
    let inView = false
    listen(document, 'visibilitychange', () => {
      visible = inView && !document.hidden
      wake()
    })
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries[0].isIntersecting && !inView
        inView = entries[0].isIntersecting
        visible = inView && !document.hidden
        // Al aparecer en pantalla se anima unos segundos para que se vea viva; luego, quieta.
        if (entering) wakeFor(5000)
        else wake()
      },
      { threshold: 0.01 }
    )
    observer.observe(renderer.domElement)
    cleanups.push(() => observer.disconnect())
    listen(renderer.domElement, 'webglcontextlost', (e: Event) => {
      e.preventDefault()
      contextLost = true
      showError(copy.errorContext)
    })
    listen(renderer.domElement, 'webglcontextrestored', () => {
      contextLost = false
      part('error').style.display = 'none'
      wake()
    })

    const scratch = new THREE.Vector3(),
      anchor = new THREE.Vector3()
    function wake() {
      if (running || !visible || contextLost) return
      running = true
      lastFrame = performance.now()
      rafId = requestAnimationFrame(animate)
    }
    function wakeFor(ms: number) {
      activeUntil = Math.max(activeUntil, performance.now() + ms)
      wake()
    }
    function animate(now: number) {
      if (!visible || contextLost) {
        running = false
        return
      }
      // 60 fps: un fotograma por cada refresco de pantalla mientras está activa.
      rafId = requestAnimationFrame(animate)
      // Con fotogramas lentos el tiempo avanza igual (hasta 0,25 s por fotograma): a pocos fps
      // la máquina va a saltos, pero se mueve.
      const elapsed = Math.max(0, (now - lastFrame) / 1000)
      const dt = Math.min(elapsed, 0.25)
      lastFrame = now
      if (playing) simTime += dt
      const t = simTime,
        beat = (t / 4) % 1,
        tact = (t * TAU) / 4,
        smooth = 1 - Math.exp(-dt * 5)
      spread = THREE.MathUtils.lerp(spread, mode === 'stations' ? 1 : 0, smooth)
      cutPlane.constant = THREE.MathUtils.lerp(cutPlane.constant, mode === 'cutaway' ? 0.99 : 10, smooth)
      if (Math.abs(spread - shadowSpread) > 0.002 || Math.abs(cutPlane.constant - shadowCut) > 0.01) {
        renderer.shadowMap.needsUpdate = true
        shadowSpread = spread
        shadowCut = cutPlane.constant
      }
      stations.forEach((s, i) => {
        s.group.position.copy(s.base)
        s.group.position.x *= 1 + spread * 0.29
        s.group.position.z *= 1 + spread * 0.37
        s.group.position.y += spread * (i % 2 ? 0.32 : 0.55)
        const pulse = Math.pow(Math.max(0, Math.sin(tact - i * 0.9)), 7)
        s.glowMat.emissiveIntensity = THREE.MathUtils.lerp(
          s.glowMat.emissiveIntensity,
          hovered === s.id || (cameraMode === 'station' && selected === s.id) ? 3.5 : 0.55 + pulse * 0.65,
          smooth
        )
      })
      belt.scale.set(1 + spread * 0.12, 1, 1 + spread * 0.15)
      pipes.scale.set(1 + spread * 0.25, 1, 1 + spread * 0.3)
      gears.forEach((g, i) => (g.rotation.y = t * (i % 2 ? -1 : 1) * 1.1))
      reels.forEach((r, i) => (r.rotation.z = -t * (i ? 0.65 : 0.85)))
      printhead.position.x = Math.sin(tact) * 0.42
      printhead.position.y = 1.91 + Math.sin(tact * 2) * 0.055
      outputPhone.position.y = beat * 0.25
      flyReview.position.y = Math.sin(tact) * 0.04
      const orderPhase = (t / 24) % 1,
        cashBeat = mode === 'order' ? THREE.MathUtils.clamp((orderPhase - 0.88) / 0.12, 0, 1) : beat
      receipt.visible = coin.visible = mode !== 'order' || orderPhase > 0.88
      receipt.scale.y = 0.2 + Math.min(1, cashBeat * 1.5) * 0.8
      coin.position.set(1.04, 2.7 - Math.min(1, cashBeat * 1.7) ** 2 * 2.17, 0.55)
      coin.rotation.y = t * 3.5
      coin.scale.setScalar(cashBeat > 0.9 ? 1 - (cashBeat - 0.9) * 8 : 1)
      const incomingBeat = mode === 'order' ? Math.min(1, orderPhase / 0.15) : beat
      incoming.visible = mode !== 'order' || orderPhase < 0.15
      incoming.position.set(Math.sin(incomingBeat * Math.PI) * 0.24, 2.9 - incomingBeat * 1.9, 1.1 - incomingBeat * 0.55)
      incoming.rotation.z = Math.sin(incomingBeat * Math.PI) * -0.14
      incoming.scale.setScalar(Math.min(1, incomingBeat * 8 + 0.15, (1 - incomingBeat) * 7 + 0.1))
      toggles.forEach((o, i) => (o.rotation.x = Math.sin(tact + i) > 0 ? -0.4 : 0.4))
      // La cinta se mueve en cada fotograma; las pantallas internas (subida de textura a la
      // GPU) se repintan a 10 fps, que para un texto que cambia cada pocos segundos sobra.
      updateBelt(t)
      if (t - lastDraw > 1 / 10 || lastDraw < 0) {
        drawChat(t)
        drawAgenda(t)
        lastDraw = t
      }
      packets.forEach((packet, i) => {
        const phase = (t / 24 + i / 6) % 1
        packet.phase = phase
        let stage
        if (phase < 0.15) {
          stage = 0
          const f = phase / 0.15
          packet.group.position.copy(stations[3].group.position).add(new THREE.Vector3(0, 1.6, 0.6))
          scratch.copy(stations[0].group.position).add(new THREE.Vector3(0, 1.3, 0.65))
          packet.group.position.lerp(scratch, f)
          packet.group.position.y += Math.sin(f * Math.PI) * 2
          packet.group.rotation.set(0, Math.sin(f * Math.PI) * 0.28, Math.sin(f * Math.PI) * -0.1)
        } else {
          const u = ((phase - 0.15) / 0.85) * cashU
          path.getPointAt(u, packet.group.position)
          packet.group.position.x *= 1 + spread * 0.12
          packet.group.position.z *= 1 + spread * 0.15
          packet.group.position.y += 0.43
          packet.group.rotation.set(0, 0.18, 0)
          stage = u < adminU * 0.7 ? 1 : u < storeU * 0.96 ? 2 : u < cashU * 0.83 ? 3 : 4
        }
        if (packet.stage !== stage) {
          packet.faces.forEach((f, j) => (f.visible = j === stage))
          packet.stage = stage
        }
        packet.group.visible = mode !== 'order' || i === 0
        packet.halo.visible = mode === 'order' && i === 0
        packet.group.scale.setScalar(mode === 'order' ? 1.35 : 1)
        if (phase > 0.94) packet.group.scale.multiplyScalar(Math.max(0.05, (1 - phase) / 0.06))
      })
      if (mode === 'order') {
        const packet = packets[0],
          step = packet.stage
        if (step !== prevJourney) {
          part('journey-title').textContent = copy.journey[step][0]
          part('journey-detail').textContent = copy.journey[step][1]
          prevJourney = step
        }
        part('journey-progress').style.width = packet.phase * 100 + '%'
        if (!dragging && playing) {
          desiredTarget.copy(packet.group.position)
          desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 10 : 15)
          cameraAnimating = true
        }
      } else if (cameraMode === 'station' && cameraAnimating) setCameraGoal()
      if (cameraAnimating && !dragging) {
        const speed = 1 - Math.exp(-dt * (mode === 'order' ? 2.2 : 3))
        camera.position.lerp(desiredPosition, speed)
        controls.target.lerp(desiredTarget, speed)
        if (
          mode !== 'order' &&
          camera.position.distanceTo(desiredPosition) < 0.015 &&
          controls.target.distanceTo(desiredTarget) < 0.015
        )
          cameraAnimating = false
      }
      controls.update(dt)
      // Etiquetas de estación proyectadas tras mover la cámara.
      stations.forEach((s, i) => {
        const show = mode === 'stations'
        s.label.classList.toggle('visible', show)
        if (!show) return
        anchor.copy(s.group.position).add(s.anchor).project(camera)
        const offsets = mobile
          ? [[-30, 25], [-27, -50], [15, -65], [16, -1], [-5, 52]]
          : [[-48, -14], [-8, -64], [30, -12], [30, 20], [-12, 40]]
        let x = (anchor.x * 0.5 + 0.5) * width - 40 + offsets[i][0],
          y = (-anchor.y * 0.5 + 0.5) * height - 52 + offsets[i][1]
        // En portada ancha las etiquetas no invaden el lado del titular (42,5 % izquierdo).
        x = THREE.MathUtils.clamp(x, mobile || !embedded ? 9 : width * 0.425, width - (mobile ? 123 : 165))
        y = THREE.MathUtils.clamp(y, 40, height - 120)
        s.label.style.transform = `translate(${x}px,${y}px)`
      })
      renderer.render(scene, camera)
      if (!readySent && sized) {
        readySent = true
        options.onReady?.()
      }
      // Animada siempre mientras está en pantalla; el bucle solo se apaga fuera de ella
      // (ver IntersectionObserver), donde no se ve.
      root.dataset.state = 'running'
      // Si el equipo no llega a ~50 fps, baja solo la resolución (nunca el ritmo), sin pasar de 1x.
      frameCount++
      measureTime += elapsed
      if (measureTime > 2) {
        if (frameCount / measureTime < 50 && pixelRatio > 1) {
          pixelRatio = Math.max(1, pixelRatio - 0.25)
          renderer.setPixelRatio(pixelRatio)
        }
        frameCount = 0
        measureTime = 0
      }
    }
    cleanups.push(() => {
      cancelAnimationFrame(rafId)
      controls.dispose()
      const textures = new Set<THREE.Texture>()
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const list = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : []
        for (const material of list) {
          for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value)
          material.dispose()
        }
      })
      geometries.forEach((g) => g.dispose())
      textures.forEach((t) => t.dispose())
      env.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    })
    renderer.compile(scene, camera)
    part('loading').classList.add('done')
    part('error').style.display = 'none'
    // Primer fotograma (con sombras) aunque aún no se haya visto
    wake()
  } catch (error) {
    console.error('Máquina 3D: no se pudo iniciar', error)
    showError()
  }
  return dispose
}

// ---------------------------------------------------------------------------
// Estilos de la escena (acotados a .agenda-machine-3d)
// ---------------------------------------------------------------------------

const STYLES = String.raw`
.agenda-machine-3d {
  --gold: #cdb07a;
  --ivory: #f4f0e8;
  position: relative;
  width: 100%;
  overflow: hidden;
  contain: layout;
  color: var(--ivory);
  font-family: var(--font-grotesk), system-ui, sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}
.agenda-machine-3d * { box-sizing: border-box; }
.agenda-machine-3d [data-part="scene"] { position: absolute; inset: 0; touch-action: pan-y; outline: none; }
.agenda-machine-3d [data-part="scene"] canvas { display: block; width: 100%; height: 100%; }
.agenda-machine-3d .vignette {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 50% 48%, transparent 40%, rgba(2, 10, 28, 0.35) 100%);
}
.agenda-machine-3d.embed .vignette {
  background: radial-gradient(ellipse at 71% 48%, transparent 40%, rgba(2, 10, 28, 0.3) 100%);
}
.agenda-machine-3d [data-part="labels"] { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.agenda-machine-3d .station-label {
  position: absolute; left: 0; top: 0; opacity: 0; transition: opacity 0.3s;
  will-change: transform; pointer-events: none; min-width: 138px;
}
.agenda-machine-3d .station-label.visible { opacity: 1; }
.agenda-machine-3d .station-label .stem { height: 26px; width: 1px; margin-left: 10px; background: linear-gradient(#cdb07a00, #cdb07a90); }
.agenda-machine-3d .station-label .label-card {
  background: rgba(6, 18, 48, 0.92); border: 1px solid rgba(205, 176, 122, 0.4);
  border-radius: 8px; padding: 10px 13px; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
}
.agenda-machine-3d .station-label .label-title { font-weight: 600; font-size: 12px; display: flex; gap: 10px; align-items: center; white-space: nowrap; }
.agenda-machine-3d .station-label .label-title span { color: var(--gold); font-size: 10px; }
.agenda-machine-3d .station-label .label-meta { font-size: 10px; color: #a9b0c2; margin: 6px 0 0 24px; white-space: nowrap; }
.agenda-machine-3d [data-part="tooltip"] {
  position: absolute; z-index: 10; pointer-events: none; opacity: 0; transition: opacity 0.15s;
  padding: 11px 14px; max-width: 240px; border-radius: 10px;
  border: 1px solid rgba(205, 176, 122, 0.3); background: rgba(6, 18, 48, 0.94);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.35);
}
.agenda-machine-3d [data-part="tooltip"].visible { opacity: 1; }
.agenda-machine-3d [data-part="tooltip"] strong { font-size: 13px; font-weight: 600; }
.agenda-machine-3d [data-part="tooltip"] strong span { font-size: 11px; color: var(--gold); margin-right: 8px; }
.agenda-machine-3d [data-part="tooltip"] p { font-size: 12px; color: #c3cad8; margin: 6px 0 0; line-height: 1.5; }
.agenda-machine-3d [data-part="journey"] {
  position: absolute; left: 46%; right: 5%; top: 96px; z-index: 5;
  display: flex; align-items: center; gap: 13px; pointer-events: none;
  padding: 12px 16px; border-radius: 14px;
  background: rgba(6, 18, 48, 0.75); border: 1px solid rgba(205, 176, 122, 0.25);
  opacity: 0; transform: translateY(-6px); transition: opacity 0.4s, transform 0.4s;
}
.agenda-machine-3d [data-part="journey"].visible { opacity: 1; transform: none; }
.agenda-machine-3d .journey-icon {
  width: 30px; height: 30px; flex-shrink: 0; border-radius: 50%; display: grid; place-items: center;
  border: 1px solid rgba(205, 176, 122, 0.45); color: var(--gold);
}
.agenda-machine-3d [data-part="journey"] strong { display: block; font-size: 13px; font-weight: 600; }
.agenda-machine-3d [data-part="journey"] small { display: block; font-size: 11px; margin-top: 3px; color: #a9b0c2; }
.agenda-machine-3d [data-part="journey"] .track { flex: 1; height: 2px; margin-left: 8px; background: rgba(255, 255, 255, 0.1); }
.agenda-machine-3d [data-part="journey"] .track i { display: block; height: 100%; width: 0; background: var(--gold); }
.agenda-machine-3d [data-part="loading"] {
  position: absolute; left: 50%; top: 48%; transform: translate(-50%, -50%); z-index: 20;
  display: flex; align-items: center; gap: 12px; color: #a9b0c2; font-size: 12px; transition: opacity 0.4s;
}
.agenda-machine-3d [data-part="loading"] i {
  width: 18px; height: 18px; border-radius: 50%;
  border: 1px solid rgba(205, 176, 122, 0.2); border-top-color: var(--gold);
  animation: agenda-machine-spin 1s linear infinite;
}
@keyframes agenda-machine-spin { to { transform: rotate(360deg); } }
.agenda-machine-3d [data-part="loading"].done { opacity: 0; pointer-events: none; }
.agenda-machine-3d [data-part="error"] {
  position: absolute; left: 10%; right: 10%; top: 35%; display: none; z-index: 20;
  padding: 24px; border-radius: 14px; font-size: 13px; line-height: 1.6;
  border: 1px solid rgba(205, 176, 122, 0.3); background: rgba(6, 18, 48, 0.95);
}
.agenda-machine-3d [data-part="error"] strong { color: var(--gold); font-weight: 600; }
.agenda-machine-3d [data-part="error"] p { color: #c3cad8; margin: 8px 0 0; }
.agenda-machine-3d [data-part="error"] button {
  margin-top: 14px; padding: 8px 14px; border-radius: 999px; cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2); background: transparent; color: inherit; font: inherit;
}
@media (min-width: 901px) {
  .agenda-machine-3d.embed [data-part="loading"] { left: 71%; }
  .agenda-machine-3d.embed [data-part="error"] { left: 48%; right: 6%; }
}
@media (max-width: 900px) {
  .agenda-machine-3d [data-part="journey"] { left: 12px; right: 12px; top: 76px; }
  .agenda-machine-3d .station-label { min-width: 100px; }
  .agenda-machine-3d .station-label .label-card { padding: 7px 9px; }
  .agenda-machine-3d .station-label .label-title { font-size: 11px; gap: 7px; }
  .agenda-machine-3d .station-label .label-meta { font-size: 9px; margin-left: 0; }
  .agenda-machine-3d .station-label .stem { height: 17px; }
}
@media (prefers-reduced-motion: reduce) {
  .agenda-machine-3d, .agenda-machine-3d * { transition: none !important; }
  .agenda-machine-3d [data-part="loading"] i { animation: none; }
}
`
