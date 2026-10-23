import { useEffect } from 'react'

const DEFAULT_TITLE = 'Mardoqueu Martins — Desenvolvedor Full Stack | Sites e Landing Pages'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Mardoqueu Martins` : DEFAULT_TITLE
  }, [title])
}
