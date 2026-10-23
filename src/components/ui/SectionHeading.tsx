import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { RevealText } from './RevealText'

type Props = {
  id: string
  title: string
  intro?: ReactNode
  tone?: 'light' | 'dark'
}

export function SectionHeading({ id, title, intro, tone = 'light' }: Props) {
  const dark = tone === 'dark'
  return (
    <div className="max-w-2xl">
      <RevealText
        id={`${id}-titulo`}
        text={title}
        className={`text-[clamp(2.1rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.03em] ${dark ? 'text-white' : ''}`}
      />
      {intro && (
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={`mt-5 text-lg leading-relaxed ${dark ? 'text-ice' : 'text-text-muted'}`}
        >
          {intro}
        </m.p>
      )}
    </div>
  )
}
