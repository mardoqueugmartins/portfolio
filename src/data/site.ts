/** Marca de conteúdo que ainda precisa ser preenchido antes de publicar. */
export const PENDENTE = 'PENDENTE'

export const isPendente = (value: string) => value === PENDENTE

const whatsappNumber = '5582999401648'
const whatsappMessage = 'Olá, Mardoqueu! Vi seu portfólio e quero conversar sobre um projeto.'
const email = 'dev.mardoqueumartins@gmail.com'
const emailSubject = 'Projeto de site — via portfólio'

export const site = {
  name: 'Mardoqueu Martins',
  role: 'Desenvolvedor Front-End',
  location: 'Maceió, AL',
  url: 'https://portfolio.mardoqueumartins.com.br',
  email,
  phoneDisplay: '(82) 99940-1648',
  languages: 'Português (nativo), Inglês (básico)',
  links: {
    whatsapp: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    email: `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`,
    github: 'https://github.com/mardoqueugmartins',
    linkedin: PENDENTE,
    cv: '/mardoqueu-martins-cv.pdf',
  },
} as const

/** Dados do controlador para as páginas legais (LGPD). */
export const legal = {
  controller: 'Mardoqueu Martins Gonzaga',
  cnpj: '64.782.697/0001-82',
  email,
  city: 'Maceió/AL',
  updatedAt: '23 de outubro de 2026',
  /** Muda quando os termos mudam: obriga o visitante a consentir de novo. */
  version: '2026-10-23',
} as const

export const nav = [
  { label: 'Projetos', hash: 'projetos' },
  { label: 'Serviços', hash: 'servicos' },
  { label: 'Para recrutadores', hash: 'recrutadores' },
  { label: 'Sobre', hash: 'sobre' },
  { label: 'Contato', hash: 'contato' },
] as const
