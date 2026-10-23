import ezzos from '../assets/projects/ezzos.webp'
import tigrao from '../assets/projects/tigrao.webp'
import vasconcelos from '../assets/projects/vasconcelos.webp'
import bcrs from '../assets/projects/bcrs.webp'
import nuvemcore from '../assets/projects/nuvemcore.webp'
import newsletter from '../assets/projects/newsletter.webp'
import previsao from '../assets/projects/previsao-do-tempo.webp'
import taskflow from '../assets/projects/taskflow.webp'

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

/**
 * Conteúdo da página de case (modelo 4.1 da copy).
 * Campos opcionais sem informação confirmada ficam de fora da página.
 */
export type CaseStudy = {
  client: string
  role?: string
  year: string
  challenge?: string
  decisions: string[]
  result?: string
  testimonial?: { quote: string; author: string }
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
    caseStudy: {
      client: 'Ezzos',
      role: 'Design da interface, desenvolvimento em WordPress com Elementor e publicação',
      year: '2023',
      challenge:
        'A Ezzos é uma agência de tráfego pago de Goiânia. Ela precisava de uma página que fizesse o que promete aos próprios clientes: transformar visita em contato. O público são donos de empresa sem tempo, que precisam entender rápido o que a agência faz e confiar nela antes de chamar.',
      decisions: [
        'Organizei a página como um argumento de venda: primeiro o problema que o empresário sente, depois a prova, com quatro casos de setores diferentes (e-commerce, clínica, indústria e pousada), e só então o método. Assim o visitante chega ao método já convencido de que ele funciona.',
        'Dei rosto à agência com uma seção sobre o fundador e uma vitrine de marcas atendidas. Em serviços de marketing, a confiança na pessoa pesa tanto quanto o portfólio.',
        'Repeti a chamada para ação ao longo da página, para quem se convence no meio do caminho não precisar rolar até o fim. A página tem nota 100 em SEO no Lighthouse.',
      ],
    },
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
    caseStudy: {
      client: 'Tigrão Acabamentos',
      role: 'Design da interface, desenvolvimento e publicação',
      year: '2024',
      challenge:
        'Empresa familiar de acabamentos que atua desde a década de 70, com três lojas (Centro, Guarus e Cidade Jardim) e dezenas de marcas, mas sem uma presença digital que organizasse isso. Quem procurava a loja na internet não encontrava os produtos, as unidades nem um jeito fácil de pedir orçamento.',
      decisions: [
        'Coloquei os diferenciais logo no início (qualidade, variedade, atendimento e parceria com arquitetos), porque quem compra acabamento compara lojas antes de decidir aonde ir.',
        'Criei uma seção de inspirações com ambientes prontos, para o cliente se imaginar com o produto, e uma vitrine das marcas revendidas, que já são conhecidas e passam confiança.',
        'Em vez de colocar o catálogo inteiro no site, criei o botão “Quero ver os catálogos”, que leva a conversa direto para o atendimento. Cada unidade ganhou seu próprio botão de contato.',
      ],
      result: 'Nota 90 de desempenho no computador, medida pelo Lighthouse em outubro de 2026.',
    },
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
    caseStudy: {
      client: 'Café Vasconcelos',
      year: '2025',
      decisions: [
        'Organizei o catálogo pelo que o cliente procura (café, cappuccino, cápsulas, máquinas, xícaras e acessórios), com o menu e o carrinho sempre à vista.',
        'Pensei a compra para o celular: do produto ao checkout em poucos toques.',
        'Montei a loja em WooCommerce para a própria equipe cadastrar produtos e preços sem depender de um desenvolvedor.',
      ],
      result:
        'Nota 97 de desempenho no computador, com a página principal carregando em 1 segundo, medida pelo Lighthouse em outubro de 2026.',
    },
  },
  {
    slug: 'bcrs-advocacia',
    category: 'landing',
    name: 'Barreto, Carlos, Rossoni e Souza',
    kind: 'escritório de advocacia',
    summary:
      'Landing page para um escritório de advocacia multidisciplinar, construída com React e Tailwind a partir de um design system extraído da identidade do escritório.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Motion', 'Design System'],
    cover: bcrs,
    liveUrl: 'https://bcrs-lp-civel.vercel.app',
    caseStudy: {
      client: 'Barreto, Carlos, Rossoni e Souza',
      role: 'Design system, design da interface, desenvolvimento e publicação',
      year: '2026',
      challenge:
        'Escritório de advocacia de Atibaia (SP), com atuação em Direito Civil, Família e Sucessões e Direito Imobiliário. A página precisava atender quem está passando por um problema jurídico, muitas vezes num momento difícil: entender rápido se o escritório pode ajudar e falar com ele sem burocracia.',
      decisions: [
        'Extraí um design system da identidade do escritório (cores, tipografia e o monograma BCRS) e construí a página sobre ele, para o site parecer uma extensão do escritório e não um modelo genérico.',
        'Ofereci dois caminhos de contato: WhatsApp para quem prefere conversar e um formulário para quem quer enviar o caso por escrito. O formulário chega no e-mail do escritório e tem proteção contra spam. Ao lado ficam as avaliações reais do Google, que se atualizam sozinhas.',
        'Desenvolvi em React, Vite e Tailwind, com animações ligadas ao scroll que se desligam para quem prefere menos movimento, e com as fontes servidas pelo próprio site.',
      ],
      result:
        'No Lighthouse, a página tem nota 97 de desempenho no celular e 100 no computador, além de 100 em SEO e em boas práticas e 96 em acessibilidade. Foi desenvolvida em 3 dias.',
    },
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
