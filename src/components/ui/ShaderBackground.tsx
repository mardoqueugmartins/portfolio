import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const vertex = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

// Ruído fractal com distorção de domínio, pintado nas cores da marca.
// O cursor deforma o campo e acende um brilho em volta dele.
const fragment = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);
  float t = u_time * 0.04;

  float d = distance(p, m);
  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.1));
  vec2 r = vec2(fbm(p * 1.8 + 4.0 * q + vec2(1.7, 9.2) + t * 1.5),
                fbm(p * 1.8 + 4.0 * q + vec2(8.3, 2.8) - t));
  r += 0.25 * exp(-d * 3.0) * (p - m);
  float f = fbm(p * 1.8 + 3.0 * r);

  vec3 ink = vec3(0.063, 0.071, 0.173);
  vec3 navy = vec3(0.031, 0.122, 0.357);
  vec3 blue = vec3(0.204, 0.306, 0.678);
  vec3 light = vec3(0.435, 0.588, 0.816);

  vec3 col = mix(ink, navy, smoothstep(0.25, 0.65, f));
  col = mix(col, blue, smoothstep(0.45, 0.85, f * length(q) * 1.4));
  col = mix(col, light, smoothstep(0.7, 1.0, f * r.x * 1.3) * 0.55);
  col += light * 0.22 * exp(-d * 4.5);

  // Escurece o canto do texto para manter a leitura
  float shade = smoothstep(0.0, 1.0, (1.0 - uv.x) * 0.55 + (1.0 - uv.y) * 0.45);
  col = mix(col, ink, shade * 0.6);

  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.035;
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

/**
 * Fundo animado em WebGL puro. Renderiza em meia resolução (é um gradiente),
 * pausa fora da tela ou com a aba oculta e não monta com movimento reduzido.
 */
export function ShaderBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    // No celular ficam os blobs em CSS: poupa bateria e a thread principal
    const capable = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches
    if (!canvas || reduce || !capable) return

    let cleanup: (() => void) | undefined
    // Só começa quando o navegador está ocioso, depois do primeiro conteúdo
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200))
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout
    const handle = idle(() => {
      cleanup = init(canvas, () => setReady(true))
    })
    return () => {
      cancelIdle(handle)
      cleanup?.()
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}

/** Monta o programa WebGL e o loop de desenho. Devolve a função de limpeza. */
function init(canvas: HTMLCanvasElement, onReady: () => void): (() => void) | undefined {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
  if (!gl) return

  const vs = compile(gl, gl.VERTEX_SHADER, vertex)
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragment)
  if (!vs || !fs) return
  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
  gl.useProgram(program)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const pos = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(program, 'u_res')
  const uTime = gl.getUniformLocation(program, 'u_time')
  const uMouse = gl.getUniformLocation(program, 'u_mouse')

  const scale = Math.min(window.devicePixelRatio, 1.5) * 0.5
  const resize = () => {
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * scale))
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * scale))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uRes, canvas.width, canvas.height)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)

  // O mouse anda até o alvo com suavização, como um imã
  const mouse = { x: 0.75, y: 0.6, tx: 0.75, ty: 0.6 }
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect()
    mouse.tx = (e.clientX - r.left) / r.width
    mouse.ty = 1 - (e.clientY - r.top) / r.height
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  let visible = true
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
  io.observe(canvas)

  let frame = 0
  let first = true
  const start = performance.now()
  const loop = (now: number) => {
    frame = requestAnimationFrame(loop)
    if (!visible || document.hidden) return
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05
    gl.uniform1f(uTime, (now - start) / 1000)
    gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    if (first) {
      first = false
      onReady()
    }
  }
  frame = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(frame)
    ro.disconnect()
    io.disconnect()
    window.removeEventListener('pointermove', onMove)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}
