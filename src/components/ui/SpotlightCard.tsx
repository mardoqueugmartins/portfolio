import type { ReactNode } from 'react'

/** Card com um brilho que segue o cursor. A posição vai em variáveis CSS, sem re-render. */
export function SpotlightCard({
  children,
  className = '',
  glow = 'rgb(111 150 208 / 0.18)',
}: {
  children: ReactNode
  className?: string
  glow?: string
}) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <div onPointerMove={onMove} className={`group/spot relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${glow}, transparent 60%)` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
