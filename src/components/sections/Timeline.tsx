import { useRef } from 'react'
import { m, useScroll } from 'motion/react'
import { timeline } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { WithPending } from '../ui/Pending'

export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null)
  // A linha se preenche conforme a trajetória passa pelo meio da tela
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 55%'] })

  return (
    <section aria-labelledby="trajetoria-titulo" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading id="trajetoria" title="Trajetória" />
        </div>

        <div className="relative pl-10">
          <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-border">
            <m.div
              className="h-full w-full origin-top bg-gradient-to-b from-primary to-accent"
              style={{ scaleY: scrollYProgress }}
            />
          </div>
          <ol ref={listRef} className="space-y-12">
            {timeline.map((item) => (
              <m.li
                key={item.title}
                className="relative"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-10 size-4 rounded-full border-[3px] border-primary bg-white shadow-[0_0_0_6px_rgb(52_78_173/0.12)]"
                />
                <p className="font-display text-sm font-semibold text-primary">
                  <WithPending text={item.period} />
                </p>
                <h3 className="mt-1 text-xl font-semibold sm:text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-[62ch] leading-relaxed text-text-muted">{item.text}</p>
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
