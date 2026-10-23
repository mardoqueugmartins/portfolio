import { useId, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Plus } from 'lucide-react'
import { faq } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { WithPending } from '../ui/Pending'

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section aria-labelledby="perguntas-titulo" className="pt-20 pb-32 sm:pt-28 sm:pb-40">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading id="perguntas" title="Perguntas frequentes" />
        <ul className="border-t border-border">
          {faq.map((item, i) => (
            <FaqItem
              key={item.q}
              question={item.q}
              answer={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

type FaqItemProps = { question: string; answer: string; open: boolean; onToggle: () => void }

function FaqItem({ question, answer, open, onToggle }: FaqItemProps) {
  const id = useId()
  return (
    <li className="border-b border-border">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold text-ink transition-colors hover:text-primary sm:text-xl"
        >
          {question}
          <Plus
            aria-hidden
            size={22}
            className={`shrink-0 text-primary transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] pb-6 leading-relaxed text-text-muted">
              <WithPending text={answer} />
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}
