import { useRef } from 'react'
import { m, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Building2, LayoutTemplate, Rocket, ShoppingCart, Wrench, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { processSteps, services } from '../../data/content'
import { buttonClass } from '../ui/buttonClass'
import { Magnetic } from '../ui/Magnetic'
import { SectionHeading } from '../ui/SectionHeading'

const icons: LucideIcon[] = [LayoutTemplate, Building2, ShoppingCart, Rocket, Wrench]

export function Services() {
  const stackRef = useRef<HTMLUListElement>(null)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-surface pt-20 pb-32 sm:pt-28 sm:pb-40">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="servicos"
            title="Como posso ajudar o seu negócio"
            intro="Você não precisa entender de tecnologia. Eu cuido do design, do código e da publicação, e você recebe um site pronto para trazer clientes."
          />
        </div>

        {/* Cada card gruda no topo e o seguinte se empilha por cima */}
        <ul ref={stackRef} className="flex flex-col gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              index={i}
              total={services.length}
              progress={scrollYProgress}
              title={service.title}
              text={service.text}
              Icon={icons[i]}
            />
          ))}
        </ul>
      </div>

      <Process />
    </section>
  )
}

type ServiceCardProps = {
  index: number
  total: number
  progress: MotionValue<number>
  title: string
  text: string
  Icon: LucideIcon
}

function ServiceCard({ index, total, progress, title, text, Icon }: ServiceCardProps) {
  // Os cards de trás encolhem um pouco à medida que os próximos chegam
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index - 1) * 0.035])

  return (
    <li className="sticky" style={{ top: `calc(7rem + ${index * 1.25}rem)` }}>
      <m.div
        style={{ scale }}
        className="origin-top rounded-3xl border border-white bg-white p-7 shadow-[0_24px_60px_-30px_rgb(16_18_44/0.4)] sm:p-9"
      >
        <div className="flex items-start gap-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-blue text-white shadow-[0_10px_24px_-10px_rgb(52_78_173/0.8)]">
            <Icon size={22} aria-hidden />
          </span>
          <div>
            <h3 className="text-2xl leading-snug font-semibold">{title}</h3>
            <p className="mt-3 leading-relaxed text-text-muted">{text}</p>
          </div>
        </div>
      </m.div>
    </li>
  )
}

function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="container-page mt-28">
      <SectionHeading id="processo" title="Do primeiro contato ao site no ar" />
      <div className="relative mt-12">
        <div aria-hidden className="absolute top-6 right-0 left-0 hidden h-0.5 bg-border lg:block">
          <m.div className="h-full origin-left bg-gradient-blue" style={{ scaleX: fill }} />
        </div>
        <ol ref={ref} className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <m.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <span className="grid size-12 place-items-center rounded-full border-4 border-surface bg-ink font-display font-semibold text-white">
                {i + 1}
              </span>
              <h4 className="mt-5 text-xl font-semibold">{step.title}</h4>
              <p className="mt-2 leading-relaxed text-text-muted">{step.text}</p>
            </m.li>
          ))}
        </ol>
      </div>
      <div className="mt-14">
        <Magnetic>
          <Link to={{ hash: 'contato' }} className={buttonClass('cta')}>
            Pedir orçamento
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}
