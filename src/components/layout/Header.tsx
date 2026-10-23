import { useEffect, useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { nav, site } from '../../data/site'
import { lockScroll } from '../../lib/smooth-scroll'
import { buttonClass } from '../ui/buttonClass'
import { ScrambleText } from '../ui/ScrambleText'

const ease = [0.16, 1, 0.3, 1] as const

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  // Fecha o menu ao navegar
  const [lastKey, setLastKey] = useState(location.key)
  if (lastKey !== location.key) {
    setLastKey(location.key)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    lockScroll(true)
    return () => {
      document.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <m.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-blue"
        style={{ scaleX: progress }}
      />

      <div className="container-page pt-3 sm:pt-4">
        <m.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className={`relative z-10 flex h-14 items-center justify-between gap-6 rounded-full border pr-2 pl-5 transition-[background-color,border-color,box-shadow] duration-500 sm:h-16 ${
            // Fora da home não há hero escuro por trás: o header já começa sólido
            scrolled || open || location.pathname !== '/'
              ? 'border-white/10 bg-ink/90 shadow-[0_20px_50px_-20px_rgb(16_18_44/0.6)] backdrop-blur-xl'
              : 'border-white/5 bg-ink/40 backdrop-blur-md'
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold tracking-tight text-white">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-full bg-gradient-blue text-xs font-bold text-white"
            >
              MM
            </span>
            <span className="text-[1.05rem]">{site.name}</span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.hash}>
                  <Link
                    to={{ pathname: '/', hash: item.hash }}
                    className="rounded-full px-4 py-2 text-[0.92rem] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ScrambleText text={item.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to={{ pathname: '/', hash: 'contato' }}
              className={`${buttonClass('cta')} min-h-10 py-2 max-sm:hidden`}
            >
              Fale comigo
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="grid size-11 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </m.div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 overflow-y-auto bg-ink pt-28 lg:hidden"
          >
            <div aria-hidden className="absolute inset-0 bg-grid" />
            <ul className="relative container-page flex flex-col">
              {nav.map((item, i) => (
                <m.li
                  key={item.hash}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.05 }}
                >
                  <Link
                    to={{ pathname: '/', hash: item.hash }}
                    className="block border-b border-white/10 py-5 font-display text-3xl font-medium text-white"
                  >
                    {item.label}
                  </Link>
                </m.li>
              ))}
              <li className="pt-8">
                <Link to={{ pathname: '/', hash: 'contato' }} className={`${buttonClass('cta')} w-full`}>
                  Fale comigo
                </Link>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
