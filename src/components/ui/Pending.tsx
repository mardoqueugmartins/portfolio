import { Fragment } from 'react'
import { PENDENTE } from '../../data/site'

/** Destaca cada "PENDENTE" do texto para ficar fácil de achar antes de publicar. */
export function WithPending({ text }: { text: string }) {
  if (!text.includes(PENDENTE)) return text
  const parts = text.split(PENDENTE)
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <Pending />}
    </Fragment>
  ))
}

export function Pending() {
  return (
    <mark className="rounded-sm bg-amber-100 px-1 font-semibold text-amber-900 decoration-amber-500 decoration-dashed">
      {PENDENTE}
    </mark>
  )
}
