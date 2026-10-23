import { useRef, useState } from 'react'
import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { CheckCircle2, Code2, Gauge, MousePointer2, MousePointerClick, Palette, type LucideIcon } from 'lucide-react'
import { RevealText } from '../ui/RevealText'

// Código de exemplo, com cada trecho já classificado para o realce de sintaxe
type Token = [text: string, kind: 'kw' | 'tag' | 'attr' | 'str' | 'txt' | 'fn']
const code: Token[][] = [
  [
    ['export function ', 'kw'],
    ['Hero', 'fn'],
    ['() {', 'txt'],
  ],
  [['  return (', 'kw']],
  [
    ['    <', 'txt'],
    ['section ', 'tag'],
    ['className', 'attr'],
    ['=', 'txt'],
    ['"bg-ink py-24"', 'str'],
    ['>', 'txt'],
  ],
  [
    ['      <', 'txt'],
    ['h1 ', 'tag'],
    ['className', 'attr'],
    ['=', 'txt'],
    ['"text-6xl"', 'str'],
    ['>', 'txt'],
  ],
  [['        Seu negócio no topo', 'txt']],
  [
    ['      </', 'txt'],
    ['h1', 'tag'],
    ['>', 'txt'],
  ],
  [
    ['      <', 'txt'],
    ['Button ', 'tag'],
    ['onClick', 'attr'],
    ['={', 'txt'],
    ['abrirWhatsApp', 'fn'],
    ['}>', 'txt'],
  ],
  [['        Falar agora', 'txt']],
  [
    ['      </', 'txt'],
    ['Button', 'tag'],
    ['>', 'txt'],
  ],
  [
    ['    </', 'txt'],
    ['section', 'tag'],
    ['>', 'txt'],
  ],
  [['  )', 'kw']],
  [['}', 'txt']],
]
const totalChars = code.reduce((sum, line) => sum + line.reduce((s, [t]) => s + t.length, 0), 0)

const colors: Record<Token[1], string> = {
  kw: 'text-accent',
  tag: 'text-ice',
  attr: 'text-[#f0c674]',
  str: 'text-cta',
  txt: 'text-white/80',
  fn: 'text-[#9ecbff]',
}

const steps: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: 'Estrutura', text: 'HTML semântico e componentes reutilizáveis em React e TypeScript.', Icon: Code2 },
  { title: 'Estilo', text: 'Layout fiel ao design, com Tailwind e os tokens da marca.', Icon: Palette },
  {
    title: 'Interação',
    text: 'Cada botão leva a uma ação: WhatsApp, formulário ou orçamento.',
    Icon: MousePointerClick,
  },
  { title: 'Performance', text: 'Imagens otimizadas, código enxuto e nota alta no Lighthouse.', Icon: Gauge },
]

// Limites de cada fase na rolagem: estrutura, estilo, interação e performance
const bounds = [0, 0.3, 0.5, 0.75, 1]
const stepAt = (v: number) => (v >= bounds[3] ? 3 : v >= bounds[2] ? 2 : v >= bounds[1] ? 1 : 0)

// Notas reais do case BCRS no Lighthouse (celular, outubro de 2026)
const scores = [
  { label: 'Desempenho', value: 97 },
  { label: 'Acessibilidade', value: 96 },
  { label: 'Boas práticas', value: 100 },
  { label: 'SEO', value: 100 },
]

export function BuildShowcase() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const done = useMotionValue(1)
  // Com movimento reduzido a seção não fica presa: mostra direto o resultado final
  const p = reduce ? done : scrollYProgress

  const [chars, setChars] = useState(() => (reduce ? totalChars : 0))
  const [step, setStep] = useState(reduce ? 3 : 0)
  useMotionValueEvent(p, 'change', (v) => {
    setChars(Math.round(Math.min(1, v / 0.3) * totalChars))
    setStep(stepAt(v))
  })

  return (
    <section
      ref={ref}
      aria-labelledby="construcao-titulo"
      className={`relative bg-ink text-white ${reduce ? 'py-24' : 'h-[420vh]'}`}
    >
      <div className={reduce ? '' : 'sticky top-0 flex h-svh items-center overflow-hidden'}>
        <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative container-page grid w-full items-center gap-8 pt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <RevealText
              id="construcao-titulo"
              text="Antes de abrir o editor, pergunto o que a página precisa fazer pelo negócio."
              className="max-w-[20ch] text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white"
            />
            <ol className="mt-8 hidden space-y-2 lg:block">
              {steps.map((s, i) => (
                <StepItem key={s.title} index={i} active={i === step} done={i < step} progress={p} {...s} />
              ))}
            </ol>
            <div className="mt-5 flex items-start gap-3 lg:hidden">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 font-display text-sm font-semibold">
                {step + 1}
              </span>
              <p className="text-sm leading-snug text-ice/80">
                <span className="font-display font-semibold text-white">{steps[step].title}.</span> {steps[step].text}
              </p>
            </div>
          </div>

          <div className="relative grid gap-4">
            <Editor chars={chars} />
            <Preview p={p} />
          </div>
        </div>
      </div>
    </section>
  )
}

function StepItem({
  index,
  active,
  done,
  progress,
  title,
  text,
  Icon,
}: {
  index: number
  active: boolean
  done: boolean
  progress: MotionValue<number>
  title: string
  text: string
  Icon: LucideIcon
}) {
  const fill = useTransform(progress, [bounds[index], bounds[index + 1]], [0, 1])
  return (
    <li
      className={`relative overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${
        active ? 'border-white/20 bg-white/[0.06]' : 'border-transparent'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors ${
            active || done ? 'bg-gradient-blue text-white' : 'bg-white/5 text-white/40'
          }`}
        >
          {done ? <CheckCircle2 size={18} aria-hidden /> : <Icon size={18} aria-hidden />}
        </span>
        <div>
          <p className={`font-display font-semibold ${active || done ? 'text-white' : 'text-white/40'}`}>{title}</p>
          <p
            className={`text-sm leading-relaxed transition-[max-height,opacity] duration-300 ${
              active ? 'max-h-20 text-ice/80 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {text}
          </p>
        </div>
      </div>
      {active && (
        <m.span
          aria-hidden
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-blue"
          style={{ scaleX: fill }}
        />
      )}
    </li>
  )
}

// Offset em caracteres onde cada linha começa: permite saber o que já foi "digitado"
const lineStarts = code.reduce<number[]>(
  (acc, _line, i) => [...acc, i === 0 ? 0 : acc[i - 1] + code[i - 1].reduce((s, [t]) => s + t.length, 0)],
  [],
)

function visibleTokens(line: Token[], budget: number) {
  return line.reduce<{ out: Token[]; left: number }>(
    ({ out, left }, [text, kind]) => ({
      out: left > 0 ? [...out, [text.slice(0, left), kind]] : out,
      left: left - text.length,
    }),
    { out: [], left: budget },
  )
}

function Editor({ chars }: { chars: number }) {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d22] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)]"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/50">Hero.tsx</span>
      </div>
      <pre className="h-[9.5rem] overflow-hidden px-4 py-3 font-mono text-[0.7rem] leading-[1.45] sm:h-[15.5rem] sm:text-[0.78rem]">
        {code.map((line, li) => {
          const budget = chars - lineStarts[li]
          if (budget <= 0 && li > 0) return null
          const { out, left } = visibleTokens(line, budget)
          // Cursor piscando na linha que está sendo digitada
          const typing = left < 0 || (li === 0 && chars === 0)
          return (
            <div key={li} className="flex">
              <span className="mr-4 inline-block w-4 text-right text-white/25 select-none">{li + 1}</span>
              <span>
                {out.map(([text, kind], ti) => (
                  <span key={ti} className={colors[kind]}>
                    {text}
                  </span>
                ))}
                {typing && (
                  <span className="ml-px inline-block h-[1.1em] w-[2px] animate-pulse bg-accent align-middle" />
                )}
              </span>
            </div>
          )
        })}
      </pre>
    </div>
  )
}

function Preview({ p }: { p: MotionValue<number> }) {
  // Fase 1 (0–0,3): esqueleto aparece enquanto o código é digitado
  const navIn = useTransform(p, [0.04, 0.1], [0, 1])
  const titleIn = useTransform(p, [0.12, 0.2], [0, 1])
  const buttonIn = useTransform(p, [0.2, 0.28], [0, 1])
  // Fase 2 (0,3–0,5): o estilo entra por cima do esqueleto
  const styled = useTransform(p, [0.3, 0.45], [0, 1])
  const wire = useTransform(styled, [0, 1], [1, 0])
  // Fase 3 (0,5–0,75): cursor vai até o botão, clica e chega um contato
  const cursorX = useTransform(p, [0.5, 0.64], ['85%', '27%'])
  const cursorY = useTransform(p, [0.5, 0.64], ['15%', '74%'])
  const cursorOpacity = useTransform(p, [0.48, 0.52, 0.74, 0.78], [0, 1, 1, 0])
  const press = useTransform(p, [0.64, 0.66, 0.69], [1, 0.92, 1])
  const toastIn = useTransform(p, [0.68, 0.72], [0, 1])
  const toastY = useTransform(toastIn, [0, 1], [16, 0])
  // Fase 4 (0,75–1): notas do Lighthouse
  const scoresIn = useTransform(p, [0.76, 0.82], [0, 1])

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)]"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-[0.7rem] text-text-muted">
          seunegocio.com.br
        </span>
      </div>

      <div className="relative h-[13rem] sm:h-[17rem]">
        {/* Esqueleto */}
        <m.div style={{ opacity: wire }} className="absolute inset-0 flex flex-col gap-4 p-6">
          <m.div style={{ opacity: navIn }} className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-border" />
            <div className="flex gap-2">
              <div className="h-3 w-10 rounded bg-border" />
              <div className="h-3 w-10 rounded bg-border" />
            </div>
          </m.div>
          <m.div style={{ opacity: titleIn }} className="mt-4 space-y-2">
            <div className="h-6 w-3/4 rounded bg-border" />
            <div className="h-6 w-1/2 rounded bg-border" />
          </m.div>
          <m.div
            style={{ opacity: buttonIn }}
            className="mt-2 h-9 w-32 rounded-full border-2 border-dashed border-border"
          />
        </m.div>

        {/* Versão com estilo */}
        <m.div style={{ opacity: styled }} className="absolute inset-0 flex flex-col bg-ink p-6">
          <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary/50 blur-3xl" />
          <div className="relative flex items-center justify-between">
            <span className="font-display text-sm font-bold text-white">Seu Negócio</span>
            <div className="flex gap-3 text-[0.65rem] text-white/60">
              <span>Serviços</span>
              <span>Contato</span>
            </div>
          </div>
          <p className="relative mt-6 max-w-[14ch] font-display text-2xl leading-tight font-semibold text-white sm:text-[1.9rem]">
            Seu negócio no topo
          </p>
          <m.span
            style={{ scale: press }}
            className="relative mt-5 inline-flex w-fit items-center rounded-full bg-gradient-cta px-5 py-2 font-display text-sm font-semibold text-ink"
          >
            Falar agora
          </m.span>
        </m.div>

        {/* Cursor e notificação */}
        <m.div
          style={{ left: cursorX, top: cursorY, opacity: cursorOpacity }}
          className="absolute z-10 text-white drop-shadow"
        >
          <MousePointer2 size={22} className="fill-white text-ink" />
        </m.div>
        <m.div
          style={{ opacity: toastIn, y: toastY }}
          className="absolute right-4 bottom-4 z-10 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-medium text-ink shadow-lg"
        >
          <span className="grid size-6 place-items-center rounded-full bg-whatsapp text-white">✓</span>
          Novo contato pelo WhatsApp
        </m.div>

        {/* Notas */}
        <m.div
          style={{ opacity: scoresIn }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink/85 p-4 backdrop-blur-md"
        >
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {scores.map((s) => (
              <Score key={s.label} p={p} {...s} />
            ))}
          </div>
          <p className="text-center text-[0.7rem] text-ice/70 sm:text-xs">
            Notas reais do case BCRS no Lighthouse (celular)
          </p>
        </m.div>
      </div>
    </div>
  )
}

function Score({ p, label, value }: { p: MotionValue<number>; label: string; value: number }) {
  const progress = useTransform(p, [0.8, 0.95], [0, value / 100])
  const number = useTransform(progress, (v) => Math.round(v * 100))
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-14 sm:size-20">
        <svg viewBox="0 0 48 48" className="size-full -rotate-90">
          <circle cx="24" cy="24" r="20" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="4" />
          <m.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--color-cta)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />
        </svg>
        <m.span className="absolute inset-0 grid place-items-center font-display text-base font-semibold text-white sm:text-xl">
          {number}
        </m.span>
      </div>
      <span className="text-center text-[0.62rem] leading-tight text-ice/80 sm:text-xs">{label}</span>
    </div>
  )
}
