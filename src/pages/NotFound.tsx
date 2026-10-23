import { ButtonLink } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Página não encontrada')
  return (
    <section className="container-page flex min-h-[80vh] flex-col justify-center pt-28 pb-20">
      <p className="font-display text-sm font-semibold text-primary">Erro 404</p>
      <h1 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] font-semibold tracking-tight">
        Essa página não existe, mas meus projetos sim.
      </h1>
      <div className="mt-10">
        <ButtonLink href="/">Voltar para o início</ButtonLink>
      </div>
    </section>
  )
}
