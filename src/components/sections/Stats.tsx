import { stats } from '../../data/content'
import { WithPending } from '../ui/Pending'

export function Stats() {
  return (
    <section aria-label="Resultados em números" className="relative z-10 bg-surface-blue">
      <dl className="container-page grid grid-cols-1 divide-y divide-primary/15 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse gap-2 py-8 sm:py-10 lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <dt className="max-w-[24ch] text-[0.95rem] leading-snug text-primary-dark/80">{stat.label}</dt>
            <dd className="font-display text-[clamp(1.9rem,2.7vw,2.5rem)] leading-none font-semibold tracking-tight whitespace-nowrap text-primary-dark">
              <WithPending text={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
