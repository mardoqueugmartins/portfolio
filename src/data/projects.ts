import ezzos from '../assets/projects/ezzos.webp'
import tigrao from '../assets/projects/tigrao.webp'
import vasconcelos from '../assets/projects/vasconcelos.webp'
import bcrs from '../assets/projects/bcrs.webp'
import nuvemcore from '../assets/projects/nuvemcore.webp'
import newsletter from '../assets/projects/newsletter.webp'
import previsao from '../assets/projects/previsao-do-tempo.webp'
import taskflow from '../assets/projects/taskflow.webp'
import { PENDENTE } from './site'

export type ProjectCategory = 'landing' | 'institucional' | 'ecommerce' | 'laboratorio'

export const categories: { value: ProjectCategory | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'landing', label: 'Landing pages' },
  { value: 'institucional', label: 'Sites institucionais' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'laboratorio', label: 'Laboratório' },
]

export const categoryLabel: Record<ProjectCategory, string> = {
  landing: 'Landing page',
  institucional: 'Site institucional',
  ecommerce: 'E-commerce',
  laboratorio: 'Laboratório',
}

/** Conteúdo da página de case (modelo 4.1 da copy). */
export type CaseStudy = {
  client: string
  role: string
  year: string
  challenge: string
  decisions: string[]
  result: string
  testimonial: { quote: string; author: string }
}

export type Project = {
  slug: string
  category: ProjectCategory
  name: string
  kind: string
  summary: string
  tags: string[]
  cover?: string
  liveUrl?: string
  codeUrl?: string
  caseStudy?: CaseStudy
}

const pendingCase = (client: string): CaseStudy => ({
  client,
  role: PENDENTE,
  year: PENDENTE,
  challenge: PENDENTE,
  decisions: [PENDENTE, PENDENTE, PENDENTE],
  result: PENDENTE,
  testimonial: { quote: PENDENTE, author: PENDENTE },
})

/** Projetos de clientes primeiro, depois o laboratório. */
export const projects: Project[] = [
  {
    slug: 'ezzos',
    category: 'landing',
    name: 'Ezzos',
    kind: 'agência de marketing digital',
    summary:
      'Landing page para uma agência de tráfego pago apresentar o método de trabalho, os cases e captar empresas interessadas em parceria.',
    tags: ['WordPress', 'Elementor', 'CSS', 'JavaScript', 'UI/UX'],
    cover: ezzos,
    liveUrl: 'https://ezzos.com.br/',
    caseStudy: pendingCase('Ezzos'),
  },
  {
    slug: 'tigrao-acabamentos',
    category: 'institucional',
    name: 'Tigrão Acabamentos',
    kind: 'loja de materiais de construção',
    summary:
      'Site institucional para uma empresa familiar que atua desde a década de 70. Organiza marcas, unidades e catálogos e leva o visitante a pedir orçamento.',
    tags: ['WordPress', 'Elementor', 'CSS', 'JavaScript', 'UI/UX'],
    cover: tigrao,
    liveUrl: 'https://tigraoacabamentos.com.br/',
    caseStudy: pendingCase('Tigrão Acabamentos'),
  },
  {
    slug: 'cafe-vasconcelos',
    category: 'ecommerce',
    name: 'Café Vasconcelos',
    kind: 'loja virtual',
    summary:
      'Loja virtual para venda direta de cafés e cápsulas, com catálogo, carrinho e checkout pensados para comprar em poucos toques no celular.',
    tags: ['WordPress', 'WooCommerce', 'Elementor', 'MySQL', 'CSS', 'UI/UX'],
    cover: vasconcelos,
    liveUrl: 'https://lojavasconcelos.com.br/',
    caseStudy: pendingCase('Café Vasconcelos'),
  },
  {
    slug: 'bcrs-advocacia',
    category: 'landing',
    name: 'Barreto, Carlos, Rossoni e Souza',
    kind: 'escritório de advocacia',
    summary:
      'Landing page para um escritório de advocacia multidisciplinar, construída com React e Tailwind a partir de um design system extraído da identidade do escritório.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Design System'],
    cover: bcrs,
    liveUrl: 'https://bcrs-lp-civel.vercel.app',
    caseStudy: pendingCase('Barreto, Carlos, Rossoni e Souza'),
  },
  {
    slug: 'nuvemcore',
    category: 'laboratorio',
    name: 'NuvemCore',
    kind: 'landing page de hospedagem',
    summary:
      'Landing page para um serviço fictício de hospedagem, feita para praticar layout responsivo, componentes de interface e boas práticas de front-end.',
    tags: ['HTML', 'CSS', 'UI/UX'],
    cover: nuvemcore,
    liveUrl: 'https://nuvem-core-host.vercel.app/',
    codeUrl: 'https://github.com/mardoqueugmartins/NuvemCoreHost',
  },
  {
    slug: 'taskflow',
    category: 'laboratorio',
    name: 'TaskFlow',
    kind: 'gerenciador de tarefas full stack',
    summary:
      'Aplicação de gerenciamento de tarefas com front-end em React e TypeScript consumindo uma API REST própria em Node.js e Express.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'API REST'],
    cover: taskflow,
    liveUrl: 'https://task-manager-web-umber-five.vercel.app/',
    codeUrl: 'https://github.com/mardoqueugmartins/task-manager-web',
  },
  {
    slug: 'newsletter',
    category: 'laboratorio',
    name: 'Newsletter com tema claro/escuro',
    kind: 'formulário de inscrição',
    summary:
      'Formulário de inscrição com alternância de tema e validação de e-mail, construído para praticar manipulação do DOM e acessibilidade.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    cover: newsletter,
    liveUrl: 'https://newletter-toggle.vercel.app/',
    codeUrl: 'https://github.com/mardoqueugmartins/NewletterToggle',
  },
  {
    slug: 'previsao-do-tempo',
    category: 'laboratorio',
    name: 'Previsão do tempo',
    kind: 'interface de clima',
    summary:
      'Interface de uma plataforma de previsão do tempo, com foco em HTML semântico, hierarquia visual e layout responsivo.',
    tags: ['HTML', 'CSS', 'UI/UX'],
    cover: previsao,
    liveUrl: 'https://weather-forecast-tawny-nine.vercel.app/',
    codeUrl: 'https://github.com/mardoqueugmartins/Weather-Forecast',
  },
]

export const caseProjects = projects.filter((p) => p.caseStudy)
