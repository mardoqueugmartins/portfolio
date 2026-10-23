import { Download } from 'lucide-react'
import { education, stack, teamValues } from '../../data/content'
import { isPendente, site } from '../../data/site'
import { ButtonLink } from '../ui/Button'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import { Pending, WithPending } from '../ui/Pending'
import { SectionHeading } from '../ui/SectionHeading'

export function Recruiters() {
  return (
    <section
      id="recrutadores"
      aria-labelledby="recrutadores-titulo"
      className="bg-primary-dark py-20 text-white sm:py-28"
    >
      <div className="container-page">
        <SectionHeading
          id="recrutadores"
          tone="dark"
          title="Para recrutadores"
          intro="Busco minha primeira posição como Desenvolvedor Front-End Júnior ou estágio em desenvolvimento. Trago mais de cinco anos entregando projetos reais para clientes, com prazo, escopo e resultado. Agora quero crescer dentro de um time, com code review, boas práticas e produto."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 className="text-2xl font-semibold text-white">O que levo para um time</h3>
            <ul className="mt-6 space-y-5">
              {teamValues.map((v) => (
                <li key={v.title} className="border-l-2 border-accent pl-5 leading-relaxed text-surface-blue">
                  <strong className="font-semibold text-white">{v.title}:</strong> {v.text}
                </li>
              ))}
            </ul>

            <h3 className="mt-14 text-2xl font-semibold text-white">Formação</h3>
            <dl className="mt-6 space-y-4 text-surface-blue">
              <div>
                <dt className="font-semibold text-white">{education.course}</dt>
                <dd>
                  <WithPending text={education.institution} />, previsão de conclusão:{' '}
                  <WithPending text={education.conclusion} />
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Idiomas</dt>
                <dd>{education.languages}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">Stack</h3>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {stack.map((group) => (
                <div key={group.group} className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr]">
                  <dt className="font-display text-sm font-semibold text-accent">{group.group}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item} className="rounded-full border border-white/20 px-3 py-1 text-sm text-white">
                          {isPendente(item) ? <Pending /> : item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <a
            href={site.links.cv}
            download
            className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-5 py-3 font-display font-semibold text-primary-dark transition-colors hover:bg-surface-blue"
          >
            <Download size={18} aria-hidden /> Baixar currículo (PDF)
          </a>
          <ButtonLink href={site.links.linkedin} variant="outline-on-dark">
            <LinkedinIcon size={18} /> LinkedIn
          </ButtonLink>
          <ButtonLink href={site.links.github} variant="outline-on-dark">
            <GithubIcon size={18} /> GitHub
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
