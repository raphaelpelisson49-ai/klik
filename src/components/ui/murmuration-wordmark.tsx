"use client"

// Murmuration Wordmark — una bandada de estorninos que forma una palabra.
//
// Adaptado a klik desde el componente de 21st.dev: por defecto la palabra está
// FORMADA y quieta (el bucle se apaga: coste cero). Al pasar el ratón por encima
// la bandada se "despeina": los pájaros ondulan con una corriente (curl noise)
// y se apartan del puntero, pero siguen atados a su letra y la palabra se lee; al quitarlo
// se recoloca en un segundo y se detiene. En táctil, un toque la despeina un momento.
// Un solo canvas 2D; nada se descarga.

import * as React from "react"

export interface MurmurationPalette {
  /** Cielo arriba. */
  skyTop: string
  /** Cielo en el horizonte. */
  skyLow: string
  /** Resplandor del sol. */
  sun: string
  /** Pájaros y línea de juncos. */
  ink: string
}

export type MurmurationPreset = "klik" | "dusk" | "dawn" | "paper" | "night"

export interface MurmurationWordmarkProps {
  /** La palabra que forma la bandada. Corta y con peso se lee mejor. */
  word?: string
  /** Cuántos estorninos (se reducen en pantallas pequeñas). */
  birds?: number
  preset?: MurmurationPreset
  palette?: Partial<MurmurationPalette>
  /** Juncos en la parte inferior. */
  reeds?: boolean
  /** El puntero dispersa la bandada. */
  interactive?: boolean
  /** Tipografía con la que se muestrea la palabra. */
  fontFamily?: string
  children?: React.ReactNode
  /** Alto de la raíz: una longitud definida, nunca un porcentaje. */
  height?: string
  className?: string
}

const PRESETS: { [K in MurmurationPreset]: MurmurationPalette } = {
  klik: { skyTop: "#020a1c", skyLow: "#0a2a6e", sun: "#cdb07a", ink: "#f4f0e8" },
  dusk: { skyTop: "#1d2b44", skyLow: "#e89a6a", sun: "#ffd2a0", ink: "#14100f" },
  dawn: { skyTop: "#9fb4c9", skyLow: "#f3d6c2", sun: "#fff3df", ink: "#1f2329" },
  paper: { skyTop: "#efe9dd", skyLow: "#e6ddcc", sun: "#ffffff", ink: "#1a1714" },
  night: { skyTop: "#05070d", skyLow: "#1a2236", sun: "#4a5d86", ink: "#dfe6f5" },
}

const SANS_STACK = '"Inter Tight", "Inter", "Helvetica Neue", Arial, system-ui, sans-serif'

/** Duración de la dispersión tras un toque en pantallas táctiles (ms). */
const TOUCH_SCATTER_MS = 1600
/** Fuerza mínima hacia las letras con el ratón encima: la palabra se mueve pero se lee. */
const MIN_PULL = 0.45

// #region bandada — funciones puras

/** PRNG pequeño con semilla (mulberry32). */
export function mmwRandom(seed: number) {
  let a = seed >>> 0 || 1
  return function () {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Corriente sin divergencia en (x, y) en el instante t: el rotacional de una suma
 * de ondas viajeras. Al ser un rotacional nunca amontona ni rompe la bandada: solo la pliega.
 */
export function mmwCurl(x: number, y: number, t: number) {
  const a = 1.7 * x + t
  const b = 1.3 * y - 0.6 * t
  const c = 2.9 * y + 1.1 * x - 0.8 * t
  const d = 4.3 * x - 3.7 * y + 1.3 * t
  const dpdx = 1.7 * Math.cos(a) * Math.cos(b) + 0.6 * 1.1 * Math.cos(c) - 0.35 * 4.3 * Math.sin(d)
  const dpdy = -1.3 * Math.sin(a) * Math.sin(b) + 0.6 * 2.9 * Math.cos(c) + 0.35 * 3.7 * Math.sin(d)
  return [dpdy, -dpdx]
}

/** Centro errante de la bandada en espacio unitario. */
export function mmwCentre(t: number) {
  return [0.42 * Math.sin(t * 0.21) + 0.12 * Math.sin(t * 0.53 + 1), 0.16 * Math.sin(t * 0.33 + 2) - 0.08]
}

/** Asigna a cada pájaro un punto de la palabra, barajado para que se forme desde todas partes. */
export function mmwAssign(birds: number, points: number, seed: number) {
  const out = new Int32Array(birds)
  if (points <= 0) return out.fill(-1)
  const order = new Int32Array(points)
  for (let i = 0; i < points; i++) order[i] = i
  const rand = mmwRandom(seed)
  for (let i = points - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const tmp = order[i]
    order[i] = order[j]
    order[j] = tmp
  }
  for (let i = 0; i < birds; i++) out[i] = order[i % points]
  return out
}

/** Un color #rgb / #rrggbb con alfa. */
export function mmwAlpha(hex: string, alpha: number) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((hex || "").trim())
  if (!m) return hex
  const h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1]
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${alpha})`
}
// #endregion

const MMW_CSS = `
.mmw-root { position: relative; width: 100%; overflow: hidden; isolation: isolate; background: var(--mmw-sky); }
.mmw-root canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; max-width: none; }
.mmw-over { position: relative; z-index: 1; height: 100%; pointer-events: none; }
.mmw-over [data-interactive], .mmw-over a, .mmw-over button { pointer-events: auto; }
.mmw-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
`

export default function MurmurationWordmark({
  word = "flock",
  birds = 4200,
  preset = "dusk",
  palette,
  reeds = true,
  interactive = true,
  fontFamily = SANS_STACK,
  children,
  height = "100svh",
  className = "",
}: MurmurationWordmarkProps) {
  const colors = { ...(PRESETS[preset] || PRESETS.dusk), ...(palette || {}) }
  const { skyTop, skyLow, sun, ink } = colors
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = 1
    let h = 1
    let dpr = 1
    let n = 0
    let raf = 0
    let running = false
    let visible = false
    let settled = false
    // true mientras el puntero está encima (o justo tras un toque): la palabra se deshace.
    let scatter = false
    let touchTimer = 0
    // 0 = vuelo libre, 1 = palabra formada.
    let pull = 1
    let sky: HTMLCanvasElement | null = null
    // Por pájaro: posición, velocidad (px/s), profundidad, fase del aleteo y punto asignado.
    let px = new Float32Array(0)
    let py = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let depth = new Float32Array(0)
    let phase = new Float32Array(0)
    let target = new Int32Array(0)
    let tx = new Float32Array(0)
    let ty = new Float32Array(0)
    let hx = -1e5
    let hy = -1e5
    let last = performance.now()
    let clock = 0
    const rand = mmwRandom(11)

    const setState = (state: "formed" | "flying") => {
      if (root.dataset.state !== state) root.dataset.state = state
    }

    const layout = () => {
      const rect = root.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      // Resolución limitada: el cielo se copia entero en cada fotograma animado.
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

      // Cielo: degradado vertical, resplandor del sol en el horizonte y grano. Se pinta una vez.
      sky = document.createElement("canvas")
      sky.width = canvas.width
      sky.height = canvas.height
      const s = sky.getContext("2d")
      if (s) {
        s.setTransform(dpr, 0, 0, dpr, 0, 0)
        const g = s.createLinearGradient(0, 0, 0, h)
        g.addColorStop(0, skyTop)
        g.addColorStop(0.78, skyLow)
        g.addColorStop(1, skyLow)
        s.fillStyle = g
        s.fillRect(0, 0, w, h)
        const glow = s.createRadialGradient(w * 0.62, h * 0.86, 0, w * 0.62, h * 0.86, Math.max(w, h) * 0.55)
        glow.addColorStop(0, sun)
        glow.addColorStop(0.25, mmwAlpha(sun, 0.5))
        glow.addColorStop(1, mmwAlpha(sun, 0))
        s.globalAlpha = 0.55
        s.fillStyle = glow
        s.fillRect(0, 0, w, h)
        s.globalAlpha = 1
        const gr = mmwRandom(5)
        if (reeds) {
          s.strokeStyle = ink
          s.fillStyle = ink
          const base = h - Math.max(6, h * 0.012)
          s.fillRect(0, base, w, h - base)
          for (let x = -10; x < w + 10; x += 2 + gr() * 9) {
            if (gr() < 0.18) x += gr() * 30
            const tall = Math.pow(gr(), 1.6) * Math.max(34, h * 0.13) + 6
            const lean = (gr() - 0.3) * 10
            s.lineWidth = 0.6 + gr() * 1.2
            s.beginPath()
            s.moveTo(x, base + 2)
            s.quadraticCurveTo(x + lean * 0.3, base - tall * 0.6, x + lean, base - tall)
            s.stroke()
          }
        }
      }

      // La palabra, muestreada en puntos sobre una máscara a 1x.
      const m = document.createElement("canvas")
      m.width = w
      m.height = h
      const mc = m.getContext("2d", { willReadFrequently: true })
      const pts: number[] = []
      if (mc) {
        mc.font = "900 100px " + fontFamily
        const wordW = mc.measureText(word || " ").width || 1
        const size = Math.min(((w * 0.74) / wordW) * 100, (h * 0.4) / 0.72)
        mc.font = "900 " + size + "px " + fontFamily
        mc.textAlign = "center"
        mc.textBaseline = "middle"
        mc.fillText(word || " ", w / 2, h * 0.46)
        const img = mc.getImageData(0, 0, w, h).data
        const step = Math.max(2, Math.round(Math.sqrt((w * h) / 90000)))
        for (let y = 0; y < h; y += step) {
          for (let x = 0; x < w; x += step) {
            if (img[(y * w + x) * 4 + 3] > 128) pts.push(x + (rand() - 0.5) * step, y + (rand() - 0.5) * step)
          }
        }
      }
      tx = new Float32Array(pts.filter((_, i) => i % 2 === 0))
      ty = new Float32Array(pts.filter((_, i) => i % 2 === 1))

      // Bandada a escala de la pantalla, sembrada como una nube suelta.
      const want = Math.round(Math.max(600, Math.min(9000, birds)) * Math.min(1, (w * h) / (1440 * 860)))
      if (want !== n) {
        // Mínimo alto: en móvil la palabra quieta necesita densidad para leerse limpia (y quieta no cuesta nada)
        n = Math.max(900, want)
        px = new Float32Array(n)
        py = new Float32Array(n)
        vx = new Float32Array(n)
        vy = new Float32Array(n)
        depth = new Float32Array(n)
        phase = new Float32Array(n)
        for (let i = 0; i < n; i++) {
          const a = rand() * Math.PI * 2
          const r = Math.sqrt(rand())
          px[i] = w * 0.5 + Math.cos(a) * r * w * 0.3
          py[i] = h * 0.45 + Math.sin(a) * r * h * 0.3
          depth[i] = 0.55 + rand() * 0.45
          phase[i] = rand() * Math.PI * 2
        }
        settled = false
      }
      target = mmwAssign(n, tx.length, 23)
      // Si ya estaba formada, se recoloca directamente en la palabra nueva (sin animación).
      if (settled || reduced) snapToWord()
      else wake()
    }

    const snapToWord = () => {
      for (let i = 0; i < n; i++) {
        const ti = target[i]
        if (ti < 0) continue
        px[i] = tx[ti]
        py[i] = ty[ti]
        vx[i] = 0
        vy[i] = 0
      }
      pull = 1
      settled = true
      setState("formed")
      draw()
    }

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      if (sky) ctx.drawImage(sky, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Dos pasadas por profundidad: los pájaros cercanos se ven más marcados.
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath()
        for (let i = 0; i < n; i++) {
          const near = depth[i] > 0.78
          if ((pass === 1) !== near) continue
          const s = (1.6 + depth[i] * 2.2) * (1 - 0.35 * pull)
          const sp = Math.hypot(vx[i], vy[i])
          // Formada y quieta: todos miran igual (alas abiertas hacia arriba), se lee limpia.
          const dx = sp > 1 ? vx[i] / sp : 0
          const dy = sp > 1 ? vy[i] / sp : -1
          const flap = 0.55 + 0.45 * Math.sin(phase[i])
          const bx = px[i]
          const by = py[i]
          const wx = -dx * s
          const wy = -dy * s
          const nx = -dy * s * flap
          const ny = dx * s * flap
          ctx.moveTo(bx + wx + nx, by + wy + ny)
          ctx.lineTo(bx, by)
          ctx.lineTo(bx + wx - nx, by + wy - ny)
        }
        ctx.strokeStyle = ink
        ctx.globalAlpha = pass === 0 ? 0.55 : 0.92
        ctx.lineWidth = pass === 0 ? 0.9 : 1.25
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const frame = (now: number) => {
      if (!visible) {
        running = false
        return
      }
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      clock += dt

      // Con el ratón encima la palabra se "despeina" pero nunca se va: el muelle hacia
      // las letras baja hasta MIN_PULL (sigue leyéndose) y vuelve rápido al quitarlo.
      pull = scatter ? Math.max(MIN_PULL, pull - dt * 3) : Math.min(1, pull + dt * 2.2)
      const free = 1 - pull
      const u = Math.min(w, h)
      const t = clock * 0.5
      const hawk = interactive && scatter && hx > -1e4
      const hawkR = u * 0.14
      // Muelle firme y casi críticamente amortiguado: los pájaros se posan sin rebotar.
      const k = 30 * pull
      const c = 9 * pull
      let maxErr = 0
      let maxV = 0

      for (let i = 0; i < n; i++) {
        const x = px[i]
        const y = py[i]
        let ax = 0
        let ay = 0
        if (free > 0) {
          const fx = (x - w / 2) / u
          const fy = (y - h / 2) / u
          const cv = mmwCurl(fx * 2.2 + depth[i] * 0.25, fy * 2.2, t)
          // Solo una ondulación local: la corriente mece a los pájaros alrededor de su letra
          ax += cv[0] * 320 * free
          ay += cv[1] * 320 * free
        }
        const ti = target[i]
        if (pull > 0 && ti >= 0) {
          const ex = tx[ti] - x
          const ey = ty[ti] - y
          ax += ex * k - vx[i] * c
          ay += ey * k - vy[i] * c
          const e = Math.abs(ex) + Math.abs(ey)
          if (e > maxErr) maxErr = e
        }
        if (hawk) {
          const dx = x - hx
          const dy = y - hy
          const d2 = dx * dx + dy * dy
          if (d2 < hawkR * hawkR) {
            const d = Math.sqrt(d2) + 0.01
            const f = (1 - d / hawkR) * 2600
            ax += (dx / d) * f
            ay += (dy / d) * f
          }
        }
        let nvx = (vx[i] + ax * dt) * (1 - 1.1 * dt)
        let nvy = (vy[i] + ay * dt) * (1 - 1.1 * dt)
        const sp = Math.hypot(nvx, nvy)
        const cap = 260 + 500 * pull
        if (sp > cap) {
          nvx = (nvx / sp) * cap
          nvy = (nvy / sp) * cap
        }
        vx[i] = nvx
        vy[i] = nvy
        px[i] = x + nvx * dt
        py[i] = y + nvy * dt
        if (sp > maxV) maxV = sp
        phase[i] += dt * (7 + sp * 0.02)
      }

      // Palabra formada y quieta: se fija exacta, se dibuja una vez y el bucle se apaga.
      if (!scatter && pull >= 1 && maxErr < 0.8 && maxV < 8) {
        cancelAnimationFrame(raf)
        running = false
        snapToWord()
        return
      }
      setState("flying")
      draw()
    }

    const wake = () => {
      if (running || !visible || reduced) return
      running = true
      settled = false
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const onEnter = (e: PointerEvent) => {
      if (!interactive || e.pointerType === "touch") return
      scatter = true
      wake()
    }
    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect()
      hx = e.clientX - b.left
      hy = e.clientY - b.top
      if (interactive && e.pointerType !== "touch" && !scatter) {
        scatter = true
        wake()
      }
    }
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") return
      hx = -1e5
      hy = -1e5
      scatter = false
      wake()
    }
    // Táctil: un toque dispersa la bandada un momento y vuelve a formar la palabra sola.
    const onDown = (e: PointerEvent) => {
      if (!interactive || e.pointerType !== "touch") return
      const b = canvas.getBoundingClientRect()
      hx = e.clientX - b.left
      hy = e.clientY - b.top
      scatter = true
      wake()
      window.clearTimeout(touchTimer)
      touchTimer = window.setTimeout(() => {
        scatter = false
        hx = -1e5
        hy = -1e5
      }, TOUCH_SCATTER_MS)
    }

    // Nada se calcula hasta que el bloque está a punto de verse (cielo, máscara de la
    // palabra, bandada); fuera de pantalla no se dibuja. La primera vez, la palabra se forma.
    let laidOut = false
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0] ? entries[0].isIntersecting : true
        if (visible && !laidOut) {
          laidOut = true
          layout()
        }
        if (visible && !settled) wake()
      },
      { rootMargin: "200px 0px" }
    )

    root.addEventListener("pointerenter", onEnter)
    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerleave", onLeave)
    root.addEventListener("pointerdown", onDown)
    const ro = new ResizeObserver(() => {
      if (laidOut) layout()
    })
    ro.observe(root)
    io.observe(root)
    let alive = true
    document.fonts?.ready.then(() => {
      if (alive && laidOut) layout()
    })
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.clearTimeout(touchTimer)
      ro.disconnect()
      io.disconnect()
      root.removeEventListener("pointerenter", onEnter)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
      root.removeEventListener("pointerdown", onDown)
    }
  }, [word, birds, skyTop, skyLow, sun, ink, reeds, interactive, fontFamily])

  return (
    <div
      ref={rootRef}
      className={"mmw-root " + className}
      data-state="formed"
      style={{ height, "--mmw-sky": skyTop } as React.CSSProperties}
    >
      <style>{MMW_CSS}</style>
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="mmw-sr">{word}</span>
      {children ? <div className="mmw-over">{children}</div> : null}
    </div>
  )
}
