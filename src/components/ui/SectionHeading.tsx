import type { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  intro?: ReactNode
  tone?: 'light' | 'dark'
}

export function SectionHeading({ id, title, intro, tone = 'light' }: Props) {
  return (
    <div className="max-w-2xl">
      <h2
        id={`${id}-titulo`}
        className={`text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-semibold tracking-tight ${tone === 'dark' ? 'text-white' : ''}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${tone === 'dark' ? 'text-surface-blue' : 'text-text-muted'}`}>
          {intro}
        </p>
      )}
    </div>
  )
}
