import { useEffect, useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { nav, site } from '../../data/site'
import { buttonClass } from '../ui/buttonClass'

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))

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
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        // Sem backdrop-blur com o menu aberto: o filtro prenderia o menu fixo dentro do header
        open
          ? 'bg-white shadow-[0_1px_0_var(--color-border)]'
          : scrolled
            ? 'bg-white/90 shadow-[0_1px_0_var(--color-border)] backdrop-blur-md'
            : 'bg-transparent'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-primary-dark">
          {site.name}
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.hash}>
                <Link
                  to={{ pathname: '/', hash: item.hash }}
                  className="text-[0.95rem] font-medium text-text-muted transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to={{ pathname: '/', hash: 'contato' }} className={`${buttonClass()} min-h-10 py-2 max-sm:hidden`}>
            Fale comigo
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="grid size-11 place-items-center rounded-md text-primary-dark lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <m.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {open && (
          <m.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-white lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 pt-6">
              {nav.map((item) => (
                <li key={item.hash}>
                  <Link
                    to={{ pathname: '/', hash: item.hash }}
                    className="block border-b border-border py-4 font-display text-2xl font-medium text-primary-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <Link to={{ pathname: '/', hash: 'contato' }} className={`${buttonClass()} w-full`}>
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
