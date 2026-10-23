import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

const format = (n: number) => Math.round(n).toLocaleString('pt-BR')

/** Número que conta de 0 até o valor quando entra na tela. */
export function CountUp({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || reduce) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value, duration])

  // O valor final já vem no HTML: quem não vê a animação (ou leitores de tela) lê o número certo
  return <span ref={ref}>{format(value)}</span>
}
