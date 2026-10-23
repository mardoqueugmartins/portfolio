import { m } from 'motion/react'
import { stats } from '../../data/content'
import { CountUp } from '../ui/CountUp'

export function Stats() {
  return (
    <section aria-label="Resultados em números" className="relative z-10 -mt-px bg-surface py-16 sm:py-20">
      <dl className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className="relative flex flex-col-reverse gap-3 overflow-hidden rounded-3xl border border-white bg-white/70 p-6 shadow-[0_20px_50px_-30px_rgb(16_18_44/0.35)]"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-blue" />
            <dt className="max-w-[24ch] text-[0.95rem] leading-snug text-text-muted">{stat.label}</dt>
            <dd className="font-display text-[clamp(1.75rem,2.3vw,2.2rem)] leading-none font-semibold tracking-tight whitespace-nowrap text-ink">
              {stat.prefix}
              <CountUp value={stat.value} />
              {stat.suffix}
            </dd>
          </m.div>
        ))}
      </dl>
    </section>
  )
}
