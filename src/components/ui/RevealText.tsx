import { m, type Variants } from 'motion/react'

const container: Variants = {
  hidden: {},
  visible: ({ stagger, delay }: { stagger: number; delay: number }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
}

const word: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  id?: string
  stagger?: number
  /** Anima ao montar (hero) em vez de ao entrar na tela. */
  onMount?: boolean
  delay?: number
}

/** Texto que sobe palavra por palavra por trás de uma máscara. O leitor de tela lê a frase inteira. */
export function RevealText({ text, as = 'h2', className, id, stagger = 0.04, onMount = false, delay = 0 }: Props) {
  const Tag = m[as]
  const words = text.split(' ')
  const trigger = onMount
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <Tag
      id={id}
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      variants={container}
      custom={{ stagger, delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <m.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 && ' '}
          </m.span>
        </span>
      ))}
    </Tag>
  )
}
