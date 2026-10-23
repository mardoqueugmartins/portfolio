import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router'
import photo from '../../assets/mardoqueu-hero.webp'
import { site } from '../../data/site'
import { buttonClass } from '../ui/buttonClass'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // A foto sobe mais devagar que a página; o arco atrás dela, mais devagar ainda
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const archY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section ref={ref} aria-labelledby="hero-titulo" className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="container-page grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
        <div className="pb-4 lg:pb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="font-display text-base font-medium text-primary"
          >
            Desenvolvedor Front-End em {site.location}
          </motion.p>

          <motion.h1
            id="hero-titulo"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-5 max-w-[19ch] text-[clamp(2.4rem,4.6vw,4.1rem)] leading-[1.02] font-semibold tracking-[-0.03em]"
          >
            Sites e landing pages que carregam rápido e transformam visitantes em clientes.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            <p className="mt-7 max-w-[60ch] text-lg leading-relaxed text-text-muted">
              Sou Mardoqueu Martins. Desde 2021 desenvolvo sites, landing pages e lojas virtuais para empresas e marcas,
              unindo design, código e foco em conversão. Hoje curso Engenharia de Software e trabalho com React,
              Tailwind, JavaScript e WordPress.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to={{ hash: 'projetos' }} className={buttonClass()}>
                Ver projetos
              </Link>
              <Link to={{ hash: 'contato' }} className={buttonClass('secondary')}>
                Pedir orçamento
              </Link>
            </div>

            <p className="mt-6 text-sm text-text-muted">
              É recrutador?{' '}
              <a href={site.links.cv} download className="font-medium text-primary underline underline-offset-2">
                Baixe meu currículo (PDF)
              </a>{' '}
              ou{' '}
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2"
              >
                veja meu GitHub
              </a>
              .
            </p>
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none">
          <motion.div
            aria-hidden
            style={{ y: archY }}
            className="absolute inset-x-0 top-[12%] bottom-0 rounded-t-full bg-primary-dark"
          />
          <motion.div
            aria-hidden
            style={{ y: archY }}
            className="absolute inset-x-[14%] top-[30%] bottom-0 rounded-t-full border border-white/15"
          />
          <motion.img
            src={photo}
            alt="Mardoqueu Martins, desenvolvedor front-end"
            width={760}
            height={952}
            fetchPriority="high"
            style={{ y: photoY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="relative z-10 h-full w-full object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  )
}
