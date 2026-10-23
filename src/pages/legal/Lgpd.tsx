import { Link } from 'react-router'
import { legal } from '../../data/site'
import { LegalLayout, ManageConsentButton } from './LegalLayout'

const rights = [
  ['Confirmação', 'saber se seus dados pessoais são tratados.'],
  ['Acesso', 'receber uma cópia dos dados tratados.'],
  ['Correção', 'corrigir dados incompletos, inexatos ou desatualizados.'],
  ['Anonimização, bloqueio ou eliminação', 'de dados desnecessários, excessivos ou tratados em desacordo com a LGPD.'],
  ['Portabilidade', 'receber seus dados em formato estruturado para levar a outro fornecedor.'],
  ['Eliminação', 'apagar os dados tratados com base no seu consentimento.'],
  ['Informação sobre compartilhamento', 'saber com quais empresas e órgãos seus dados foram compartilhados.'],
  ['Informação sobre o consentimento', 'saber o que acontece se você não der consentimento.'],
  ['Revogação do consentimento', 'retirar, a qualquer momento, uma permissão dada antes.'],
  ['Oposição', 'se opor a um tratamento feito sem consentimento, se ele descumprir a LGPD.'],
  ['Petição à ANPD', 'reclamar à Autoridade Nacional de Proteção de Dados.'],
] as const

export default function Lgpd() {
  return (
    <LegalLayout title="LGPD: seus direitos">
      <p>
        A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) garante a você controle sobre os seus dados. Esta
        página resume esses direitos e explica como exercê-los junto a <strong>{legal.controller}</strong>, CNPJ{' '}
        <strong>{legal.cnpj}</strong>, controlador dos dados tratados por este site. Os detalhes sobre quais dados são
        tratados estão na <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>

      <h2>Canal de atendimento ao titular</h2>
      <p>
        Como agente de tratamento de pequeno porte (Resolução CD/ANPD nº 2/2022), o próprio controlador atende os
        titulares de dados. O canal oficial é o e-mail <a href={`mailto:${legal.email}`}>{legal.email}</a>.
      </p>

      <h2>Seus direitos (art. 18 da LGPD)</h2>
      <ul>
        {rights.map(([name, text]) => (
          <li key={name}>
            <strong>{name}:</strong> {text}
          </li>
        ))}
      </ul>
      <p>
        Este site não toma decisões automatizadas com base nos seus dados. Se isso mudar, você poderá pedir a revisão
        dessas decisões, conforme o art. 20 da LGPD.
      </p>

      <h2>Como fazer um pedido</h2>
      <ol>
        <li>
          Envie um e-mail para{' '}
          <a href={`mailto:${legal.email}?subject=LGPD%20-%20pedido%20de%20titular`}>{legal.email}</a> com o assunto
          “LGPD - pedido de titular”.
        </li>
        <li>Diga qual direito quer exercer e informe o nome, telefone ou e-mail usado no contato.</li>
        <li>
          Se for preciso confirmar sua identidade para proteger seus dados, você receberá um pedido de confirmação antes
          da resposta.
        </li>
      </ol>
      <p>
        <strong>Prazos:</strong> a confirmação de existência ou o acesso em formato simplificado são respondidos
        imediatamente. A declaração completa, com origem dos dados, critérios e finalidade, é enviada em até 15 dias a
        partir do pedido (art. 19 da LGPD). O atendimento é gratuito.
      </p>

      <h2>Consentimento: como dar, mudar ou revogar</h2>
      <p>
        No primeiro acesso, o aviso de privacidade pede que você escolha entre aceitar, recusar os itens opcionais ou
        personalizar. A escolha fica salva no seu navegador com data e versão dos termos. Recusar não impede o uso do
        site. Você pode mudar de ideia quando quiser:
      </p>
      <ManageConsentButton />
      <p>
        Também é possível apagar a escolha limpando os dados do site nas configurações do seu navegador. Revogar o
        consentimento não torna ilegal o tratamento feito antes da revogação.
      </p>

      <h2>Incidentes de segurança</h2>
      <p>
        Se ocorrer um incidente de segurança que possa causar risco ou dano relevante aos titulares, a ANPD e as pessoas
        afetadas serão comunicadas em prazo razoável, com a descrição do ocorrido e das medidas tomadas (art. 48 da
        LGPD).
      </p>

      <h2>Autoridade Nacional de Proteção de Dados</h2>
      <p>
        Se o seu pedido não for atendido, você pode apresentar reclamação à ANPD pelo site{' '}
        <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
          gov.br/anpd
        </a>
        .
      </p>
    </LegalLayout>
  )
}
