import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ConsentContext, type ConsentRecord } from './consent-context'
import { legal } from '../data/site'

const STORAGE_KEY = 'mm-consentimento'

function readStored(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    return parsed.version === legal.version ? parsed : null
  } catch {
    return null
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentRecord | null>(readStored)
  const [forcedOpen, setForcedOpen] = useState(false)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  const decide = useCallback(({ analytics }: { analytics: boolean }) => {
    const record: ConsentRecord = {
      version: legal.version,
      decidedAt: new Date().toISOString(),
      termsAccepted: true,
      analytics,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
    } catch {
      // Navegação privada ou armazenamento bloqueado: a escolha vale só para esta visita.
    }
    setConsent(record)
    setForcedOpen(false)
    setPreferencesOpen(false)
  }, [])

  const openPreferences = useCallback(() => {
    setForcedOpen(true)
    setPreferencesOpen(true)
  }, [])

  const value = useMemo(
    () => ({
      consent,
      bannerOpen: consent === null || forcedOpen,
      preferencesOpen,
      decide,
      openPreferences,
      setPreferencesOpen,
    }),
    [consent, forcedOpen, preferencesOpen, decide, openPreferences],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
