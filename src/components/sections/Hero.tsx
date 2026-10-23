import { useRef, type ReactNode } from 'react'
import { m, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { Link } from 'react-router'
import { site } from '../../data/site'
import { buttonClass } from '../ui/buttonClass'
import { Magnetic } from '../ui/Magnetic'
import { Marquee } from '../ui/Marquee'
import { ShaderBackground } from '../ui/ShaderBackground'

const ease = [0.16, 1, 0.3, 1] as const
const title = 'Sites e landing pages que carregam rápido e transformam visitantes em clientes.'

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
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  // Posição do cursor normalizada (-0,5 a 0,5) para a profundidade dos cards
  const px = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })
  const py = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titulo"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-white"
    >
      {/* Fundo: blobs em CSS como base e o shader WebGL por cima quando disponível */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-1/4 -left-1/4 size-[70vmax] animate-drift rounded-full bg-primary/35 blur-[120px]" />
        <div className="absolute -right-1/4 -bottom-1/3 size-[60vmax] animate-drift-slow rounded-full bg-accent/25 blur-[120px]" />
        <ShaderBackground className="absolute inset-0 size-full" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <m.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="container-page grid flex-1 items-center gap-12 pt-32 pb-16 sm:pt-36 xl:grid-cols-[1fr_20rem]"
      >
        <div>
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

          <KineticTitle text={title} />

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.2 }}
          >
            <p className="mt-9 max-w-[58ch] text-lg leading-relaxed text-ice/90">
              Sou Mardoqueu Martins. Desde 2021 desenvolvo sites, landing pages e lojas virtuais para empresas e marcas,
              unindo design, código e foco em conversão. Hoje curso Engenharia de Software e trabalho com React,
              Node.js, Tailwind, JavaScript e WordPress.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
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

            <p className="mt-6 text-sm text-white/60">
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
          </m.div>
        </div>

        <FloatingCards px={px} py={py} />
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
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

/**
 * Título que entra letra por letra, girando em 3D. A animação é CSS puro
 * (sem custo de JavaScript no carregamento). As palavras não quebram no meio.
 */
function KineticTitle({ text }: { text: string }) {
  let index = 0
  return (
    <h1
      id="hero-titulo"
      aria-label={text}
      className="mt-7 max-w-[20ch] text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[1] font-semibold tracking-[-0.04em] text-white [perspective:800px]"
    >
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {word.split('').map((char) => {
            const i = index++
            return (
              <span
                key={i}
                className="inline-block origin-bottom animate-flip-in"
                style={{ animationDelay: `${0.35 + i * 0.014}s` }}
              >
                {char}
              </span>
            )
          })}
          {' '}
        </span>
      ))}
    </h1>
  )
}

function FloatingCards({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  return (
    <div aria-hidden className="relative hidden h-[26rem] xl:block">
      <Floating px={px} py={py} depth={40} delay={1.4} className="top-0 right-0">
        <div className="flex items-center gap-4">
          <ScoreRing value={100} />
          <div>
            <p className="font-display text-sm font-semibold text-white">Performance</p>
            <p className="text-xs text-ice/70">Lighthouse, case BCRS</p>
          </div>
        </div>
      </Floating>
      <Floating px={px} py={py} depth={-30} delay={1.55} className="top-36 left-0">
        <p className="font-display text-3xl font-semibold text-white">+R$ 5 mi</p>
        <p className="mt-1 text-xs text-ice/70">em vendas por páginas que desenvolvi</p>
      </Floating>
      <Floating px={px} py={py} depth={60} delay={1.7} className="right-2 bottom-0">
        <pre className="font-mono text-[0.78rem] leading-relaxed text-ice">
          <span className="text-accent">const</span> stack = [{'\n'}
          {'  '}
          <span className="text-cta">'React'</span>, <span className="text-cta">'Node.js'</span>,{'\n'}
          {'  '}
          <span className="text-cta">'TypeScript'</span>,{'\n'}]
        </pre>
      </Floating>
    </div>
  )
}

function Floating({
  children,
  px,
  py,
  depth,
  delay,
  className,
}: {
  children: ReactNode
  px: MotionValue<number>
  py: MotionValue<number>
  depth: number
  delay: number
  className: string
}) {
  const x = useTransform(px, (v) => v * depth)
  const y = useTransform(py, (v) => v * depth)
  return (
    <m.div style={{ x, y }} className={`absolute ${className}`}>
      <m.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.8, delay },
          scale: { duration: 0.8, ease, delay },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
        }}
        className="rounded-3xl border border-white/15 bg-white/[0.07] p-5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] backdrop-blur-xl"
      >
        {children}
      </m.div>
    </m.div>
  )
}

function ScoreRing({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 48 48" className="size-14 -rotate-90">
      <circle cx="24" cy="24" r="20" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="4" />
      <m.circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        stroke="var(--color-cta)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: value / 100 }}
        transition={{ duration: 1.6, ease, delay: 1.6 }}
      />
      <text
        x="24"
        y="24"
        transform="rotate(90 24 24)"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white font-display text-[13px] font-semibold"
      >
        {value}
      </text>
    </svg>
  )
}
