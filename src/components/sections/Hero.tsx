import { useRef } from 'react'
import { m, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { Link } from 'react-router'
import { site } from '../../data/site'
import { buttonClass } from '../ui/buttonClass'
import { Magnetic } from '../ui/Magnetic'
import { Marquee } from '../ui/Marquee'
import { RevealText } from '../ui/RevealText'

const ease = [0.16, 1, 0.3, 1] as const

const technologies = [
  'React',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'JavaScript',
  'Express',
  'WordPress',
  'WooCommerce',
  'Figma',
  'Vite',
  'Git',
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Ao rolar, o conteúdo recua e some enquanto a próxima seção sobe
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  // Brilho que acompanha o cursor
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgb(111 150 208 / 0.16), transparent 70%)`

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titulo"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-white"
    >
      {/* Fundo: blobs nas cores da marca, grade e o brilho do cursor */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-1/4 -left-1/4 size-[70vmax] animate-drift rounded-full bg-primary/35 blur-[120px]" />
        <div className="absolute -right-1/4 -bottom-1/3 size-[60vmax] animate-drift-slow rounded-full bg-accent/25 blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 size-[30vmax] animate-drift rounded-full bg-primary-dark/80 blur-[100px]" />
        <div className="absolute inset-0 bg-grid" />
        <m.div className="absolute inset-0" style={{ background: spotlight }} />
      </div>

      <m.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="container-page flex flex-1 flex-col justify-center pt-32 pb-16 sm:pt-36"
      >
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-display text-sm font-medium text-ice backdrop-blur"
        >
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cta opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-cta" />
          </span>
          {site.role} em {site.location}
        </m.p>

        <RevealText
          as="h1"
          id="hero-titulo"
          onMount
          delay={0.3}
          stagger={0.05}
          text="Sites e landing pages que carregam rápido e transformam visitantes em clientes."
          className="mt-7 max-w-[18ch] text-[clamp(2.6rem,7.2vw,6.25rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-white"
        />

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1 }}
          className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <p className="max-w-[58ch] text-lg leading-relaxed text-ice/90">
              Sou Mardoqueu Martins. Desde 2021 desenvolvo sites, landing pages e lojas virtuais para empresas e marcas,
              unindo design, código e foco em conversão. Hoje curso Engenharia de Software e trabalho com React,
              Node.js, Tailwind, JavaScript e WordPress.
            </p>
            <p className="mt-5 text-sm text-white/60">
              É recrutador?{' '}
              <a href={site.links.cv} download className="font-medium text-white underline underline-offset-4">
                Baixe meu currículo (PDF)
              </a>{' '}
              ou{' '}
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline underline-offset-4"
              >
                veja meu GitHub
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Link to={{ hash: 'projetos' }} className={buttonClass('cta')}>
                Ver projetos
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to={{ hash: 'contato' }} className={buttonClass('outline-light')}>
                Pedir orçamento
              </Link>
            </Magnetic>
          </div>
        </m.div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative border-t border-white/10"
      >
        <div className="container-page flex items-center gap-6 py-5">
          <Link
            to={{ hash: 'projetos' }}
            aria-label="Rolar até os projetos"
            className="hidden size-11 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:text-white sm:grid"
          >
            <m.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowDown size={18} />
            </m.span>
          </Link>
          <Marquee items={technologies} className="font-display text-lg font-medium text-white/50" />
        </div>
      </m.div>
    </section>
  )
}
