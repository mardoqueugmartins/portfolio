import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import photo from '../../assets/mardoqueu-sobre.webp'
import { site } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const figureRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: figureRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="bg-surface py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <m.figure
          ref={figureRef}
          initial={{ clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 1.5rem)' }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl lg:sticky lg:top-28 lg:self-start"
        >
          <m.img
            style={{ y: imageY, scale: 1.18 }}
            src={photo}
            alt="Mardoqueu Martins em um evento de tecnologia"
            width={867}
            height={797}
            loading="lazy"
            decoding="async"
            className="aspect-[867/797] w-full object-cover"
          />
        </m.figure>

        <div>
          <SectionHeading id="sobre" title="Sobre mim" />
          <p className="mt-3 font-display text-xl font-medium text-primary">Prazer, sou Mardoqueu.</p>

          <div className="mt-8 max-w-[64ch] space-y-5 text-lg leading-relaxed text-text-muted">
            <p>
              Sou desenvolvedor full stack em Maceió, Alagoas. Comecei como designer gráfico em 2019 e, em 2021, passei
              a programar as interfaces que desenhava. Desde então, uno design e código para criar sites que não são só
              bonitos: carregam rápido, funcionam bem no celular e ajudam o negócio a vender.
            </p>
            <p>
              Também já estive do lado de quem vende. Criei e comercializei produtos digitais próprios, que faturaram
              mais de R$ 250 mil. Essa experiência mudou meu jeito de desenvolver: antes de abrir o editor, pergunto o
              que a página precisa fazer pelo negócio.
            </p>
            <p>
              Hoje curso Engenharia de Software para dar mais base técnica ao que faço na prática, e sigo atendendo
              clientes enquanto busco minha primeira vaga em um time de desenvolvimento.
            </p>
          </div>

          <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-ink/10 pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-ink">Local</dt>
              <dd className="mt-1 text-text-muted">{site.location}. Atendo todo o Brasil (remoto).</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-ink">E-mail</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="break-all text-primary underline underline-offset-2">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-ink">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href={site.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-ink">Idiomas</dt>
              <dd className="mt-1 text-text-muted">{site.languages}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
