import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { legal } from '../../data/site'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useConsent } from '../../lib/consent-context'

const docs = [
  { to: '/politica-de-privacidade', label: 'Política de Privacidade' },
  { to: '/termos-de-uso', label: 'Termos de Uso' },
  { to: '/lgpd', label: 'LGPD: seus direitos' },
]

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  useDocumentTitle(title)

  return (
    <div className="container-page pt-28 pb-24 lg:pt-36">
      <nav aria-label="Documentos legais">
        <ul className="flex flex-wrap gap-2">
          {docs.map((doc) => (
            <li key={doc.to}>
              <NavLink
                to={doc.to}
                className={({ isActive }) =>
                  `inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-text-muted hover:border-primary hover:text-primary'
                  }`
                }
              >
                {doc.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <h1 className="mt-10 text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 text-sm text-text-muted">
        Última atualização: {legal.updatedAt}. Versão {legal.version}.
      </p>

      <div className="prose-page mt-10">{children}</div>
    </div>
  )
}

/** Botão que reabre o aviso de privacidade para mudar ou revogar a escolha. */
export function ManageConsentButton() {
  const { openPreferences, consent } = useConsent()
  return (
    <div className="my-6 rounded-xl border border-border bg-surface p-5">
      <p className="text-sm text-text-muted">
        {consent
          ? `Sua escolha atual foi registrada em ${new Date(consent.decidedAt).toLocaleString('pt-BR')}. Métricas de audiência: ${
              consent.analytics ? 'permitidas' : 'não permitidas'
            }.`
          : 'Você ainda não registrou uma escolha sobre privacidade neste navegador.'}
      </p>
      <button
        type="button"
        onClick={openPreferences}
        className="mt-3 inline-flex min-h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover"
      >
        Gerenciar preferências de privacidade
      </button>
    </div>
  )
}
