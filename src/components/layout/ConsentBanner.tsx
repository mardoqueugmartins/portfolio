import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router'
import { useConsent } from '../../lib/consent-context'
import { buttonClass } from '../ui/buttonClass'

export function ConsentBanner() {
  const { bannerOpen } = useConsent()
  return <AnimatePresence>{bannerOpen && <ConsentPanel key="consent" />}</AnimatePresence>
}

/** Monta a cada abertura, então a escolha atual sempre vem do registro salvo. */
function ConsentPanel() {
  const { consent, preferencesOpen, setPreferencesOpen, decide } = useConsent()
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false)
  const titleId = useId()
  const analyticsId = useId()

  return (
    <motion.section
      role="region"
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-3 bottom-3 z-50 max-h-[85vh] overflow-y-auto rounded-xl border border-border bg-white p-5 shadow-[0_20px_60px_rgba(8,31,91,0.18)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md"
    >
      <h2 id={titleId} className="text-lg font-semibold">
        Sua privacidade
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Este site não usa cookies de rastreamento nem de publicidade. Ele guarda no seu navegador apenas a sua escolha
        sobre este aviso. Ao escolher uma opção abaixo, você confirma que leu e concorda com os{' '}
        <Link to="/termos-de-uso" className="font-medium text-primary underline underline-offset-2">
          Termos de Uso
        </Link>{' '}
        e com a{' '}
        <Link to="/politica-de-privacidade" className="font-medium text-primary underline underline-offset-2">
          Política de Privacidade
        </Link>
        . Veja também seus{' '}
        <Link to="/lgpd" className="font-medium text-primary underline underline-offset-2">
          direitos na LGPD
        </Link>
        .
      </p>

      {preferencesOpen && (
        <fieldset className="mt-4 space-y-3 border-t border-border pt-4">
          <legend className="sr-only">Categorias de dados</legend>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary-dark">Essenciais</p>
              <p className="text-xs leading-relaxed text-text-muted">
                Guardam sua escolha de privacidade. Sempre ativos, porque sem eles o aviso apareceria a cada página.
              </p>
            </div>
            <span className="shrink-0 pt-0.5 text-xs font-medium text-text-muted">Sempre ativo</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <label htmlFor={analyticsId}>
              <span className="block text-sm font-semibold text-primary-dark">Métricas de audiência</span>
              <span className="block text-xs leading-relaxed text-text-muted">
                Contariam visitas de forma agregada. Hoje nenhuma ferramenta de métricas está ativa; se for adicionada,
                só vai funcionar com a sua permissão.
              </span>
            </label>
            <input
              id={analyticsId}
              type="checkbox"
              role="switch"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 size-5 shrink-0 accent-primary"
            />
          </div>
        </fieldset>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {preferencesOpen ? (
          <button type="button" onClick={() => decide({ analytics })} className={`${buttonClass()} min-h-10 py-2`}>
            Salvar preferências
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => decide({ analytics: true })}
              className={`${buttonClass()} min-h-10 py-2`}
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={() => decide({ analytics: false })}
              className={`${buttonClass('secondary')} min-h-10 py-2`}
            >
              Recusar opcionais
            </button>
            <button
              type="button"
              onClick={() => setPreferencesOpen(true)}
              className="min-h-10 px-2 text-sm font-medium text-primary underline underline-offset-2"
            >
              Personalizar
            </button>
          </>
        )}
      </div>
    </motion.section>
  )
}
