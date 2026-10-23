import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { ButtonLink } from '../components/ui/Button'
import { WithPending } from '../components/ui/Pending'
import { caseProjects } from '../data/projects'
import { isPendente } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

export default function CaseStudy() {
  const { slug } = useParams()
  const index = caseProjects.findIndex((p) => p.slug === slug)
  const project = caseProjects[index]
  useDocumentTitle(project ? `Case ${project.name}` : 'Página não encontrada')

  if (!project?.caseStudy) return <NotFound />

  const next = caseProjects[(index + 1) % caseProjects.length]
  const cs = project.caseStudy

  const facts = [
    { label: 'Cliente', value: cs.client },
    { label: 'Meu papel', value: cs.role },
    { label: 'Stack', value: project.tags.join(', ') },
    { label: 'Ano', value: cs.year },
  ]

  return (
    <article className="pt-28 pb-20 lg:pt-36">
      <div className="container-page">
        <Link
          to={{ pathname: '/', hash: 'projetos' }}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary"
        >
          <ArrowLeft size={16} aria-hidden /> Todos os projetos
        </Link>

        <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,5.5vw,4.25rem)] leading-[1.03] font-semibold tracking-[-0.03em]">
          {project.name} — {project.kind}
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-text-muted">{project.summary}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
          <div className="overflow-hidden rounded-2xl bg-surface">
            {project.cover ? (
              <img
                src={project.cover}
                alt={`Capa do projeto ${project.name} — ${project.kind}`}
                className="aspect-[16/10] w-full object-cover object-top"
              />
            ) : (
              <div className="flex aspect-[16/10] items-end bg-primary-dark p-8">
                <p className="font-display text-3xl font-semibold text-white">{project.name}</p>
              </div>
            )}
          </div>

          <aside aria-label="Ficha do projeto">
            <dl className="divide-y divide-border border-y border-border">
              {facts.map((f) => (
                <div key={f.label} className="py-4">
                  <dt className="text-sm font-semibold text-primary-dark">{f.label}</dt>
                  <dd className="mt-1 text-text-muted">
                    <WithPending text={f.value} />
                  </dd>
                </div>
              ))}
            </dl>
            {project.liveUrl && (
              <ButtonLink href={project.liveUrl} className="mt-6 w-full">
                Ver site no ar <ArrowUpRight size={18} aria-hidden />
              </ButtonLink>
            )}
          </aside>
        </div>

        <div className="prose-page mt-16">
          <h2>O desafio</h2>
          <p>
            <WithPending text={cs.challenge} />
          </p>

          <h2>O que eu fiz</h2>
          <ul>
            {cs.decisions.map((d, i) => (
              <li key={i}>
                <WithPending text={d} />
              </li>
            ))}
          </ul>

          <h2>Resultado</h2>
          <p>
            <WithPending text={cs.result} />
          </p>

          {!isPendente(cs.testimonial.quote) && (
            <>
              <h2>Depoimento do cliente</h2>
              <figure className="border-l-2 border-accent pl-6">
                <blockquote className="font-display text-xl leading-snug text-primary-dark">
                  “<WithPending text={cs.testimonial.quote} />”
                </blockquote>
                <figcaption className="mt-3 text-sm text-text-muted">
                  — <WithPending text={cs.testimonial.author} />
                </figcaption>
              </figure>
            </>
          )}
        </div>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-border pt-10">
          {project.liveUrl && (
            <ButtonLink href={project.liveUrl} variant="secondary">
              Ver site no ar
            </ButtonLink>
          )}
          {next && next.slug !== project.slug && (
            <ButtonLink href={`/projetos/${next.slug}`}>Próximo case: {next.name}</ButtonLink>
          )}
        </div>
      </div>
    </article>
  )
}
