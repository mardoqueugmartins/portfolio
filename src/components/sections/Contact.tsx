import { Mail } from 'lucide-react'
import { isPendente, site } from '../../data/site'
import { ButtonLink } from '../ui/Button'
import { WhatsappIcon } from '../ui/Icons'
import { Pending } from '../ui/Pending'

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="bg-primary py-20 text-white sm:py-28">
      <div className="container-page">
        <h2
          id="contato-titulo"
          className="max-w-[16ch] text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-white"
        >
          Vamos tirar seu projeto do papel?
        </h2>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-surface-blue">
          Me conte o que você precisa. Respondo em até 1 dia útil com os próximos passos.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={site.links.whatsapp} variant="on-dark">
            <WhatsappIcon size={18} /> Conversar no WhatsApp
          </ButtonLink>
          <ButtonLink href={site.links.email} variant="outline-on-dark">
            <Mail size={18} aria-hidden /> Enviar e-mail
          </ButtonLink>
        </div>

        <p className="mt-10 text-sm text-surface-blue">
          Recrutador? Meu currículo está{' '}
          <a href={site.links.cv} download className="font-semibold text-white underline underline-offset-2">
            aqui (PDF)
          </a>
          , e também estou no{' '}
          {isPendente(site.links.linkedin) ? (
            <>
              LinkedIn <Pending />
            </>
          ) : (
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline underline-offset-2"
            >
              LinkedIn
            </a>
          )}
          .
        </p>
      </div>
    </section>
  )
}
