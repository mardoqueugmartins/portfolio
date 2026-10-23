import { createContext, useContext } from 'react'

export type ConsentRecord = {
  /** Versão dos termos aceita. Se os termos mudarem, o aviso volta a aparecer. */
  version: string
  /** Data e hora (ISO 8601) em que o visitante fez a escolha. */
  decidedAt: string
  /** O visitante declarou ter lido os Termos de Uso e a Política de Privacidade. */
  termsAccepted: true
  /** Categoria opcional. Nenhuma ferramenta de métricas está ativa hoje. */
  analytics: boolean
}

export type ConsentContextValue = {
  consent: ConsentRecord | null
  bannerOpen: boolean
  preferencesOpen: boolean
  decide: (choices: { analytics: boolean }) => void
  openPreferences: () => void
  setPreferencesOpen: (open: boolean) => void
}

export const ConsentContext = createContext<ConsentContextValue | null>(null)

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent precisa estar dentro de <ConsentProvider>')
  return ctx
}
