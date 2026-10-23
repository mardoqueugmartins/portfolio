import { Link } from 'react-router'
import { isPendente, site } from '../../data/site'
import { GithubIcon, LinkedinIcon } from '../ui/Icons'
import { Pending } from '../ui/Pending'

const footerNav = [
  { label: 'Projetos', hash: 'projetos' },
  { label: 'Serviços', hash: 'servicos' },
  { label: 'Para recrutadores', hash: 'recrutadores' },
  { label: 'Contato', hash: 'contato' },
]

export function Footer() {
  return (
    <footer className="bg-primary-dark text-surface-blue">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-white">
            {site.name} — {site.role}
          </p>
          <p className="mt-2 text-sm">{site.location}. Atendimento em todo o Brasil.</p>
          <ul className="mt-6 flex gap-3" aria-label="Redes">
            <li>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Mardoqueu Martins"
                className="grid size-11 place-items-center rounded-md border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                <GithubIcon />
              </a>
            </li>
            <li>
              {isPendente(site.links.linkedin) ? (
                <span className="inline-flex h-11 items-center gap-2 rounded-md border border-white/20 px-3 text-sm text-white">
                  <LinkedinIcon /> <Pending />
                </span>
              ) : (
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de Mardoqueu Martins"
                  className="grid size-11 place-items-center rounded-md border border-white/20 text-white transition-colors hover:bg-white/10"
                >
                  <LinkedinIcon />
                </a>
              )}
            </li>
          </ul>
        </div>

        <nav aria-label="Rodapé">
          <ul className="space-y-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.hash}>
                <Link to={{ pathname: '/', hash: item.hash }} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-1 py-6 text-xs text-surface-blue/80 sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p>PENDENTE</p>
        </div>
      </div>
    </footer>
  )
}
