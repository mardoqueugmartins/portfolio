import { useRef } from 'react'
import { m, useScroll, useTransform, type MotionValue } from 'motion/react'

const text = 'Antes de abrir o editor, pergunto o que a página precisa fazer pelo negócio.'

/** Frase que acende palavra por palavra conforme a rolagem. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  return (
    <section aria-label="Como eu trabalho" className="bg-surface pt-8 pb-24 sm:pb-32">
      <div className="container-page">
        <p
          ref={ref}
          aria-label={text}
          className="max-w-[22ch] font-display text-[clamp(2rem,5.4vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <m.span aria-hidden style={{ opacity }} className="inline-block pr-[0.25em]">
      {children}
    </m.span>
  )
}
