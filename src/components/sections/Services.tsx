import { Link } from 'react-router'
import { processSteps, services } from '../../data/content'
import { site } from '../../data/site'
import { ButtonLink } from '../ui/Button'
import { buttonClass } from '../ui/buttonClass'
import { SectionHeading } from '../ui/SectionHeading'

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-surface py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="servicos"
            title="Como posso ajudar o seu negócio"
            intro="Você não precisa entender de tecnologia. Eu cuido do design, do código e da publicação, e você recebe um site pronto para trazer clientes."
          />
        </div>

        <ul className="border-t border-primary-dark/15">
          {services.map((service) => (
            <li
              key={service.title}
              className="grid gap-2 border-b border-primary-dark/15 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8"
            >
              <h3 className="text-xl leading-snug font-semibold">{service.title}</h3>
              <p className="leading-relaxed text-text-muted">{service.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page mt-16">
        <div className="grid gap-6 rounded-2xl border border-[#f1e4c9] bg-surface-warm p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-2xl leading-tight font-semibold sm:text-3xl">
              Advogado? Tenho um plano pronto para você.
            </h3>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-text-muted">
              Site profissional para escritórios de advocacia por assinatura mensal: sem investimento inicial alto, com
              hospedagem, manutenção e suporte incluídos.
            </p>
          </div>
          <ButtonLink href={site.links.sitesPorAssinatura}>Conhecer os planos</ButtonLink>
        </div>
      </div>

      <div className="container-page mt-24">
        <h3 className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">
          Do primeiro contato ao site no ar
        </h3>
        <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative border-t-2 border-primary pt-5">
              <span className="font-display text-sm font-semibold text-primary">Etapa {i + 1}</span>
              <h4 className="mt-2 text-lg font-semibold">{step.title}</h4>
              <p className="mt-2 leading-relaxed text-text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <Link to={{ hash: 'contato' }} className={`${buttonClass()} mt-12`}>
          Pedir orçamento
        </Link>
      </div>
    </section>
  )
}
