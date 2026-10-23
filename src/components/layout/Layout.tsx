import { Suspense, useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { Outlet, useLocation } from 'react-router'
import { site } from '../../data/site'
import { ConsentProvider } from '../../lib/consent'
import { WhatsappIcon } from '../ui/Icons'
import { ConsentBanner } from './ConsentBanner'
import { Footer } from './Footer'
import { Header } from './Header'

/** Rola para a âncora (#projetos etc.) ou para o topo a cada navegação. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    // Espera o React pintar a página de destino antes de procurar a seção
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}

export function Layout() {
  return (
    <ConsentProvider>
      <MotionConfig reducedMotion="user">
        <ScrollManager />
        <Header />
        <main id="conteudo">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <a
          href={site.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar com Mardoqueu no WhatsApp"
          className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors hover:bg-whatsapp-hover sm:right-6 sm:bottom-6"
        >
          <WhatsappIcon size={28} />
        </a>
        <ConsentBanner />
      </MotionConfig>
    </ConsentProvider>
  )
}
