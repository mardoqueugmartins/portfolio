import { Suspense, useEffect } from 'react'
import { domAnimation, LazyMotion, m, MotionConfig } from 'motion/react'
import { Outlet, useLocation } from 'react-router'
import { site } from '../../data/site'
import { ConsentProvider } from '../../lib/consent'
import { scrollToTarget, startSmoothScroll, stopSmoothScroll } from '../../lib/smooth-scroll'
import { WhatsappIcon } from '../ui/Icons'
import { ConsentBanner } from './ConsentBanner'
import { Footer } from './Footer'
import { Header } from './Header'

/** Rola para a âncora (#projetos etc.) ou para o topo a cada navegação. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    startSmoothScroll()
    return stopSmoothScroll
  }, [])

  useEffect(() => {
    if (!hash) {
      scrollToTarget(0, { immediate: true })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    // Espera o React pintar a página de destino antes de procurar a seção
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) scrollToTarget(el)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}

/** Cada página entra com um fade curto. */
function PageFade() {
  const { pathname } = useLocation()
  return (
    <m.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Outlet />
    </m.div>
  )
}

export function Layout() {
  return (
    <ConsentProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <ScrollManager />
          <Header />
          <main id="conteudo">
            <Suspense fallback={<div className="min-h-screen bg-ink" />}>
              <PageFade />
            </Suspense>
          </main>
          <Footer />
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com Mardoqueu no WhatsApp"
            className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.6)] transition-colors hover:bg-whatsapp-hover sm:right-6 sm:bottom-6"
          >
            <WhatsappIcon size={28} />
          </a>
          <ConsentBanner />
        </MotionConfig>
      </LazyMotion>
    </ConsentProvider>
  )
}
