import { m } from 'motion/react'
import { Download } from 'lucide-react'
import { education, stack, teamValues } from '../../data/content'
import { site } from '../../data/site'
import { ButtonLink } from '../ui/Button'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import { Magnetic } from '../ui/Magnetic'
import { SectionHeading } from '../ui/SectionHeading'
import { SpotlightCard } from '../ui/SpotlightCard'
import { buttonClass } from '../ui/buttonClass'

const ease = [0.16, 1, 0.3, 1] as const

export function Recruiters() {
  return (
    <section
      id="recrutadores"
      aria-labelledby="recrutadores-titulo"
      className="relative isolate -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink py-24 text-white sm:-mt-14 sm:rounded-t-[3.5rem] sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-1/3 right-[-10%] size-[50vmax] animate-drift-slow rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="container-page">
        <SectionHeading
          id="recrutadores"
          tone="dark"
          title="Para recrutadores"
          intro="Busco minha primeira posição como Desenvolvedor Full Stack Júnior ou estágio em desenvolvimento. Trago mais de cinco anos entregando projetos reais para clientes, com prazo, escopo e resultado. Agora quero crescer dentro de um time, com code review, boas práticas e produto."
        />

        <h3 className="mt-20 text-2xl font-semibold text-white">O que levo para um time</h3>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {teamValues.map((v, i) => (
            <m.li
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
            >
              <SpotlightCard
                glow="rgb(111 150 208 / 0.22)"
                className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
              >
                <p className="font-display text-lg font-semibold text-white">{v.title}</p>
                <p className="mt-2 leading-relaxed text-ice/85">{v.text.charAt(0).toUpperCase() + v.text.slice(1)}</p>
              </SpotlightCard>
            </m.li>
          ))}
        </ul>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div>
            <h3 className="text-2xl font-semibold text-white">Stack</h3>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {stack.map((group) => (
                <div key={group.group} className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr]">
                  <dt className="pt-1 font-display text-sm font-semibold text-accent">{group.group}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white transition-colors hover:border-accent hover:bg-accent/15"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">Formação</h3>
            <dl className="mt-6 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <dt className="font-display text-lg font-semibold text-white">{education.course}</dt>
                <dd className="mt-1 text-ice/85">
                  {education.institution}, previsão de conclusão em {education.conclusion}
                </dd>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <dt className="font-display text-lg font-semibold text-white">Idiomas</dt>
                <dd className="mt-1 text-ice/85">{education.languages}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Magnetic>
            <a href={site.links.cv} download className={buttonClass('cta')}>
              <Download size={18} aria-hidden /> Baixar currículo (PDF)
            </a>
          </Magnetic>
          <ButtonLink href={site.links.linkedin} variant="outline-light">
            <LinkedinIcon size={18} /> LinkedIn
          </ButtonLink>
          <ButtonLink href={site.links.github} variant="outline-light">
            <GithubIcon size={18} /> GitHub
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
