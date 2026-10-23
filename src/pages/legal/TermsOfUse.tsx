import { Link } from 'react-router'
import { legal, site } from '../../data/site'
import { LegalLayout } from './LegalLayout'

export default function TermsOfUse() {
  return (
    <LegalLayout title="Termos de Uso">
      <p>
        Estes Termos regulam o uso do site <strong>{site.url.replace('https://', '')}</strong> (o “Site”), mantido por{' '}
        <strong>{legal.controller}</strong>, CNPJ <strong>{legal.cnpj}</strong>, que usa o nome profissional “
        {site.name}”.
      </p>

      <h2>1. Aceitação</h2>
      <p>
        Ao escolher uma opção no aviso de privacidade, você declara que leu e concorda com estes Termos e com a{' '}
        <Link to="/politica-de-privacidade">Política de Privacidade</Link>. A data, a versão aceita e a sua escolha
        ficam registradas no seu navegador. Se não concordar, não use o Site.
      </p>

      <h2>2. O que é o Site</h2>
      <p>
        O Site é um portfólio profissional. Ele apresenta projetos, serviços de desenvolvimento web e a trajetória de{' '}
        {site.name}, para clientes interessados em contratar e para recrutadores. O Site não vende produtos, não
        processa pagamentos e não fecha contratos: toda contratação acontece por proposta escrita, enviada depois de uma
        conversa.
      </p>

      <h2>3. Uso permitido</h2>
      <p>Você pode navegar, ler o conteúdo, baixar o currículo e entrar em contato. Não é permitido:</p>
      <ul>
        <li>copiar, reproduzir ou redistribuir o design, os textos, as fotos ou o código do Site sem autorização;</li>
        <li>usar robôs ou ferramentas automáticas para coletar dados ou sobrecarregar o Site;</li>
        <li>tentar acessar áreas restritas, explorar falhas ou interferir no funcionamento do Site;</li>
        <li>usar os dados de contato do Site para enviar spam ou mensagens não solicitadas em massa.</li>
      </ul>

      <h2>4. Propriedade intelectual</h2>
      <p>
        Textos, fotos pessoais, identidade visual e código do Site pertencem a {legal.controller}. Os nomes, marcas e
        imagens dos projetos de clientes pertencem aos respectivos titulares e aparecem aqui só para fins de portfólio.
        O titular que quiser a remoção de algum material pode pedir pelo e-mail{' '}
        <a href={`mailto:${legal.email}`}>{legal.email}</a>. Os projetos do Laboratório que têm código público no GitHub
        seguem a licença indicada em cada repositório.
      </p>

      <h2>5. Informações e resultados</h2>
      <p>
        Os números apresentados, como valores em vendas e faturamento, se referem a projetos já realizados e servem para
        ilustrar a experiência profissional. Eles não são promessa nem garantia de resultado para novos projetos, que
        dependem de fatores fora do controle do desenvolvedor, como produto, oferta, mercado e investimento em
        divulgação.
      </p>

      <h2>6. Orçamentos e contratação</h2>
      <p>
        Prazos, valores e condições citados no Site são informativos e não constituem oferta vinculante. Escopo, prazo,
        investimento, forma de pagamento e garantias de cada projeto são definidos na proposta escrita e no contrato
        firmados entre as partes.
      </p>

      <h2>7. Links para outros sites</h2>
      <p>
        O Site tem links para sites de clientes, projetos publicados, GitHub, LinkedIn e WhatsApp. Esses serviços têm
        termos e políticas próprios, e {site.name} não responde pelo conteúdo ou pelo funcionamento deles.
      </p>

      <h2>8. Disponibilidade e responsabilidade</h2>
      <p>
        O Site é oferecido como está. Ele pode ficar fora do ar para manutenção ou por falhas da hospedagem, e o
        conteúdo pode mudar sem aviso. Na extensão permitida pela lei, {legal.controller} não responde por danos
        causados pelo uso indevido do Site ou por indisponibilidade temporária.
      </p>

      <h2>9. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a <Link to="/politica-de-privacidade">Política de Privacidade</Link> e a
        página <Link to="/lgpd">LGPD: seus direitos</Link>, que fazem parte destes Termos.
      </p>

      <h2>10. Mudanças nestes Termos</h2>
      <p>
        Estes Termos podem ser atualizados. A data e a versão no topo da página indicam a última mudança. Quando a
        mudança for relevante, o aviso de privacidade aparecerá de novo para você confirmar a leitura da nova versão.
      </p>

      <h2>11. Lei aplicável e foro</h2>
      <p>
        Estes Termos seguem as leis do Brasil. Fica eleito o foro da comarca de {legal.city} para resolver qualquer
        controvérsia, ressalvado o direito do consumidor de propor ação no foro do seu domicílio, conforme o Código de
        Defesa do Consumidor.
      </p>

      <h2>12. Contato</h2>
      <p>
        Dúvidas sobre estes Termos: <a href={`mailto:${legal.email}`}>{legal.email}</a>.
      </p>
    </LegalLayout>
  )
}
