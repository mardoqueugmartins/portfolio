import type { ReactNode } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

/** Inclina o conteúdo em 3D na direção do cursor. */
export function Tilt({ children, max = 6, className = '' }: { children: ReactNode; max?: number; className?: string }) {
  const reduce = useReducedMotion()
  const px = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const py = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rotateY = useTransform(px, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(py, [-0.5, 0.5], [max, -max])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <m.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </m.div>
  )
}
