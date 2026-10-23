import { useRef } from 'react'
import {
  m,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react'

/**
 * Texto gigante que desliza sem parar. Rolar a página acelera a faixa
 * e rolar para cima inverte o sentido.
 */
export function VelocityMarquee({ text, baseVelocity = -2 }: { text: string; baseVelocity?: number }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    let move = direction.current * baseVelocity * (delta / 1000)
    move += move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  const copy = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i} className="flex items-center gap-8">
          {text}
          <span className="inline-block size-4 rounded-full bg-gradient-blue sm:size-6" />
        </span>
      ))}
    </span>
  )

  return (
    <div aria-hidden className="overflow-hidden py-6 select-none">
      <m.div
        style={{ x }}
        className="flex w-max font-display text-[clamp(3rem,10vw,9rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_var(--color-primary)]"
      >
        {copy}
        {copy}
      </m.div>
    </div>
  )
}
