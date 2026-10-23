import { useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}=+*#'

/**
 * Ao passar o mouse, as letras viram símbolos aleatórios e se "decodificam"
 * da esquerda para a direita. O leitor de tela sempre lê o texto original.
 */
export function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const reduce = useReducedMotion()

  const run = () => {
    if (reduce) return
    cancelAnimationFrame(frame.current)
    const start = performance.now()
    const duration = 450
    const tick = (now: number) => {
      const revealed = Math.floor(((now - start) / duration) * text.length)
      setDisplay(
        text
          .split('')
          .map((ch, i) => (ch === ' ' || i < revealed ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(''),
      )
      if (revealed < text.length) frame.current = requestAnimationFrame(tick)
      else setDisplay(text)
    }
    frame.current = requestAnimationFrame(tick)
  }

  return (
    <span onPointerEnter={run} onFocus={run} className="relative inline-block">
      <span className="sr-only">{text}</span>
      {/* O texto original, invisível, segura a largura enquanto os símbolos mudam */}
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0 whitespace-nowrap">
        {display}
      </span>
    </span>
  )
}
