import { useLayoutEffect, useRef, useState, type FocusEvent } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { categories, categoryLabel, projects, type Project, type ProjectCategory } from '../../data/projects'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { scrollToTarget } from '../../lib/smooth-scroll'
import { GithubIcon } from '../ui/Icons'
import { SpotlightCard } from '../ui/SpotlightCard'
import { SectionHeading } from '../ui/SectionHeading'

type Filter = ProjectCategory | 'todos'

export function Projects() {
  const [filter, setFilter] = useState<Filter>('todos')
  const isDesktop = useMediaQuery('(min-width: 1024px) and (min-height: 720px)')
  const reduceMotion = useReducedMotion()
  const horizontal = isDesktop && !reduceMotion

  const visible = filter === 'todos' ? projects : projects.filter((p) => p.category === filter)

  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const [distance, setDistance] = useState(0)

  // Quanto a trilha precisa andar para mostrar o último card
  useLayoutEffect(() => {
    if (!horizontal) return
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return
      setDistance(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [horizontal, filter])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)

  const changeFilter = (next: Filter) => {
    setFilter(next)
    // Na trilha horizontal, volta ao primeiro card para o filtro fazer sentido
    if (horizontal && sectionRef.current) {
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
      if (window.scrollY > top) scrollToTarget(top)
    }
  }

  // Teclado: ao focar um card fora da tela, rola a página até a trilha mostrá-lo.
  // A rolagem vertical é 1:1 com o deslocamento horizontal.
  const followFocus = (e: FocusEvent<HTMLUListElement>) => {
    if (!horizontal || !sectionRef.current) return
    const card = (e.target as HTMLElement).closest('li')
    if (!card) return
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
    const offset = Math.min(Math.max(card.offsetLeft - 32, 0), distance)
    scrollToTarget(sectionTop + offset, { immediate: true })
  }

  const header = (
    <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeading
        id="projetos"
        title="Projetos"
        intro="Cada projeto começa com um problema de negócio. Aqui está o que eu fiz, por que fiz e o que mudou."
      />
      <div role="group" aria-label="Filtrar projetos" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            type="button"
            aria-pressed={filter === c.value}
            onClick={() => changeFilter(c.value)}
            className={`min-h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
              filter === c.value
                ? 'border-ink bg-ink text-white'
                : 'border-border bg-white text-text-muted hover:border-ink hover:text-ink'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )

  const cards = visible.map((project) => (
    <li key={project.slug} className={horizontal ? 'w-[22rem] shrink-0 xl:w-[25rem]' : ''}>
      <ProjectCard project={project} />
    </li>
  ))

  if (!horizontal) {
    return (
      <section ref={sectionRef} id="projetos" aria-labelledby="projetos-titulo" className="bg-white py-20 sm:py-28">
        {header}
        <ul className="container-page mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-6">{cards}</ul>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="projetos"
      aria-labelledby="projetos-titulo"
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative bg-white"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden pt-20">
        {header}
        <div ref={viewportRef} className="container-page">
          <m.ul ref={trackRef} style={{ x }} onFocus={followFocus} className="flex gap-8">
            {cards}
          </m.ul>
        </div>
        <div className="container-page" aria-hidden>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface">
            <m.div className="h-full origin-left rounded-full bg-gradient-blue" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const isLab = project.category === 'laboratorio'
  const title = `${project.name} — ${project.kind}`

  return (
    <SpotlightCard className="h-full rounded-3xl border border-border bg-white p-3 transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(16_18_44/0.35)]">
      <article className="group flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface">
          {project.cover ? (
            <img
              src={project.cover}
              alt={`Capa do projeto ${project.name} — ${categoryLabel[project.category].toLowerCase()}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-primary-dark p-6">
              <p className="font-display text-2xl leading-tight font-semibold text-white">{project.name}</p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-3 pb-3">
          <p className="mt-5 text-sm font-medium text-primary">{categoryLabel[project.category]}</p>
          <h3 className="mt-1 text-xl leading-snug font-semibold">{title}</h3>
          <p className="mt-2 line-clamp-4 text-[0.95rem] leading-relaxed text-text-muted">{project.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologias">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-[0.95rem] font-semibold">
            {isLab ? (
              <>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-hover"
                  >
                    Ver online <ArrowUpRight size={16} aria-hidden />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover"
                  >
                    <GithubIcon size={16} /> Ver código
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                )}
              </>
            ) : (
              <Link
                to={`/projetos/${project.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-white transition-colors hover:bg-primary"
              >
                Ver case<span className="sr-only">: {title}</span>
                <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:rotate-45" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </SpotlightCard>
  )
}
