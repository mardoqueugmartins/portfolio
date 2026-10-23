import { m } from 'motion/react'
import { Mail } from 'lucide-react'
import { site } from '../../data/site'
import { ButtonLink } from '../ui/Button'
import { WhatsappIcon } from '../ui/Icons'
import { Magnetic } from '../ui/Magnetic'
import { RevealText } from '../ui/RevealText'

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative isolate -mt-10 overflow-hidden rounded-t-[2.5rem] bg-primary-dark py-28 text-white sm:-mt-14 sm:rounded-t-[3.5rem] sm:py-40"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-1/4 -bottom-1/2 size-[70vmax] animate-drift rounded-full bg-gradient-blue opacity-60 blur-[140px]" />
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="container-page">
        <RevealText
          id="contato-titulo"
          text="Vamos tirar seu projeto do papel?"
          stagger={0.06}
          className="max-w-[14ch] text-[clamp(2.8rem,8vw,7rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-white"
        />
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ice">
            Me conte o que você precisa. Respondo em até 1 dia útil com os próximos passos.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <ButtonLink href={site.links.whatsapp} variant="cta">
                <WhatsappIcon size={18} /> Conversar no WhatsApp
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href={site.links.email} variant="outline-light">
                <Mail size={18} aria-hidden /> Enviar e-mail
              </ButtonLink>
            </Magnetic>
          </div>

          <p className="mt-12 text-sm text-ice/80">
            Recrutador? Meu currículo está{' '}
            <a href={site.links.cv} download className="font-semibold text-white underline underline-offset-4">
              aqui (PDF)
            </a>
            , e também estou no{' '}
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline underline-offset-4"
            >
              LinkedIn
            </a>
            .
          </p>
        </m.div>
      </div>
    </section>
  )
}
