import Lenis from 'lenis'

/** Instância única do Lenis. Fica nula com prefers-reduced-motion: aí vale a rolagem nativa. */
let lenis: Lenis | null = null

export function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 })
}

export function stopSmoothScroll() {
  lenis?.destroy()
  lenis = null
}

/**
 * Rola até uma posição ou elemento. Para elementos, o desconto do header vem do
 * scroll-padding-top do CSS, que tanto o Lenis quanto o scrollIntoView respeitam.
 */
export function scrollToTarget(target: HTMLElement | number, { immediate = false } = {}) {
  if (lenis) {
    // Depois de trocar de página a altura muda: atualiza antes de rolar
    lenis.resize()
    lenis.scrollTo(target, { immediate, force: true })
    return
  }
  const behavior = immediate ? 'instant' : 'smooth'
  if (typeof target === 'number') window.scrollTo({ top: target, behavior })
  else target.scrollIntoView({ behavior })
}

/** Trava a rolagem enquanto o menu mobile está aberto. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.body.style.overflow = locked ? 'hidden' : ''
}
