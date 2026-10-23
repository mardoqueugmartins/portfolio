import { testimonials } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { WithPending } from '../ui/Pending'

export function Testimonials() {
  return (
    <section aria-labelledby="depoimentos-titulo" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="depoimentos" title="O que dizem os clientes" />
        <ul className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          {testimonials.map((t) => (
            <li key={t.company}>
              <figure className="border-l-2 border-accent pl-6">
                <blockquote className="font-display text-xl leading-snug font-medium text-primary-dark sm:text-2xl">
                  “<WithPending text={t.quote} />”
                </blockquote>
                <figcaption className="mt-5 text-sm text-text-muted">
                  — <WithPending text={t.name} />, <WithPending text={t.role} />, {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
