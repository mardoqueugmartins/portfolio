import { Link } from 'react-router'
import { legal, site } from '../../data/site'
import { LegalLayout, ManageConsentButton } from './LegalLayout'

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Política de Privacidade">
      <p>
        Esta Política explica quais dados pessoais são tratados quando você visita{' '}
        <strong>{site.url.replace('https://', '')}</strong> (o “Site”) ou entra em contato pelos canais indicados nele,
        por que eles são tratados e como você pode exercer seus direitos. Ela segue a Lei Geral de Proteção de Dados
        Pessoais (Lei nº 13.709/2018, “LGPD”) e o Marco Civil da Internet (Lei nº 12.965/2014).
      </p>

      <h2>1. Quem é o controlador dos dados</h2>
      <p>
        O controlador é <strong>{legal.controller}</strong>, inscrito no CNPJ sob o nº <strong>{legal.cnpj}</strong>,
        com atuação em {legal.city}, que usa o nome profissional “{site.name}”. Para qualquer assunto sobre seus dados,
        escreva para <a href={`mailto:${legal.email}`}>{legal.email}</a>.
      </p>

      <h2>2. Quais dados são tratados</h2>
      <h3>2.1. Dados que você decide enviar</h3>
      <p>
        O Site não tem formulário de cadastro nem de contato. Quando você clica em “Conversar no WhatsApp” ou “Enviar
        e-mail”, a conversa acontece no aplicativo que você escolheu. Nesse caso, são tratados os dados que você enviar,
        como nome, telefone, e-mail, empresa, o conteúdo da mensagem e informações sobre o seu projeto ou sobre a vaga.
      </p>
      <h3>2.2. Registros de acesso</h3>
      <p>
        Como em qualquer site, o servidor de hospedagem registra automaticamente dados técnicos de cada acesso: endereço
        IP, data e hora, página acessada, navegador e sistema operacional. Esses registros são exigidos pelo art. 15 do
        Marco Civil da Internet.
      </p>
      <h3>2.3. Armazenamento local no seu navegador</h3>
      <p>
        O Site guarda no seu navegador (localStorage) apenas a sua escolha no aviso de privacidade: a versão dos termos,
        a data da escolha e se você permite métricas de audiência. Essa informação fica no seu dispositivo e não é
        enviada para nenhum servidor.
      </p>
      <h3>2.4. O que o Site não faz</h3>
      <ul>
        <li>Não usa cookies de publicidade, de rastreamento ou de redes sociais.</li>
        <li>
          Não usa ferramentas de métricas no momento. Se alguma for adicionada, ela só será ativada para quem permitir
          no aviso de privacidade, e esta Política será atualizada antes.
        </li>
        <li>Não carrega fontes, scripts ou imagens de servidores de terceiros: tudo é servido pelo próprio Site.</li>
        <li>Não vende nem aluga dados pessoais.</li>
      </ul>

      <h2>3. Para que os dados são usados e com qual base legal</h2>
      <ul>
        <li>
          <strong>Responder seu contato, entender seu projeto e enviar proposta:</strong> procedimentos preliminares
          relacionados a contrato, a seu pedido (art. 7º, V, da LGPD).
        </li>
        <li>
          <strong>Prestar o serviço contratado:</strong> execução de contrato (art. 7º, V).
        </li>
        <li>
          <strong>Conversar sobre oportunidades de trabalho, quando você é recrutador:</strong> legítimo interesse em
          participar de processos seletivos (art. 7º, IX), sempre dentro do que você espera desse contato.
        </li>
        <li>
          <strong>Guardar registros de acesso:</strong> cumprimento de obrigação legal (art. 7º, II, e art. 15 do Marco
          Civil da Internet).
        </li>
        <li>
          <strong>Manter o Site seguro e funcionando:</strong> legítimo interesse (art. 7º, IX).
        </li>
        <li>
          <strong>Métricas de audiência, se um dia forem usadas:</strong> consentimento (art. 7º, I), que pode ser
          revogado a qualquer momento.
        </li>
      </ul>

      <h2>4. Com quem os dados são compartilhados</h2>
      <ul>
        <li>
          <strong>Provedor de hospedagem do Site</strong>, que armazena os registros de acesso.
        </li>
        <li>
          <strong>Plataformas de comunicação que você escolher</strong>, como WhatsApp (Meta) e Gmail (Google). Elas
          tratam seus dados segundo as próprias políticas de privacidade.
        </li>
        <li>
          <strong>Autoridades públicas</strong>, somente quando houver obrigação legal ou ordem judicial.
        </li>
      </ul>
      <p>
        Algumas dessas empresas guardam dados em servidores fora do Brasil. Essa transferência internacional segue o
        art. 33 da LGPD, com base nas garantias contratuais oferecidas por esses fornecedores.
      </p>

      <h2>5. Por quanto tempo os dados são guardados</h2>
      <ul>
        <li>
          <strong>Mensagens de contato e propostas:</strong> enquanto a conversa ou o contrato estiver ativo e, depois,
          pelo prazo necessário para cumprir obrigações legais e defender direitos em eventual processo.
        </li>
        <li>
          <strong>Registros de acesso:</strong> 6 meses, conforme o Marco Civil da Internet.
        </li>
        <li>
          <strong>Escolha de privacidade no navegador:</strong> até você limpar os dados do navegador, mudar a escolha
          ou os termos serem atualizados, quando o aviso aparece de novo.
        </li>
      </ul>
      <p>Encerrado o prazo, os dados são eliminados ou anonimizados.</p>

      <h2>6. Armazenamento local e cookies</h2>
      <p>O Site usa um único item de armazenamento local, classificado como essencial:</p>
      <ul>
        <li>
          <strong>mm-consentimento</strong>: guarda a sua escolha sobre privacidade para o aviso não aparecer em toda
          página. Fica apenas no seu navegador.
        </li>
      </ul>
      <p>Você pode mudar ou revogar sua escolha a qualquer momento:</p>
      <ManageConsentButton />

      <h2>7. Segurança</h2>
      <p>
        O Site usa conexão criptografada (HTTPS), não coleta dados por formulários e mantém o acesso às mensagens de
        contato restrito ao controlador. Nenhum sistema é totalmente imune a falhas; se ocorrer um incidente de
        segurança que possa causar risco ou dano relevante, a Autoridade Nacional de Proteção de Dados (ANPD) e os
        titulares afetados serão comunicados, conforme o art. 48 da LGPD.
      </p>

      <h2>8. Seus direitos</h2>
      <p>
        Você pode confirmar se seus dados são tratados, acessá-los, corrigi-los, pedir a eliminação, a portabilidade,
        informações sobre compartilhamento e revogar o consentimento, entre outros direitos. Veja a lista completa e
        como fazer o pedido na página <Link to="/lgpd">LGPD: seus direitos</Link>.
      </p>

      <h2>9. Links para outros sites</h2>
      <p>
        O Site tem links para sites de clientes, GitHub, LinkedIn e WhatsApp. Ao abri-los, vale a política de
        privacidade de cada um deles.
      </p>

      <h2>10. Crianças e adolescentes</h2>
      <p>
        O Site é voltado a empresas, profissionais e recrutadores. Ele não é direcionado a menores de 18 anos e não
        coleta dados deles de forma intencional.
      </p>

      <h2>11. Mudanças nesta Política</h2>
      <p>
        Esta Política pode ser atualizada para refletir mudanças no Site ou na lei. A data e a versão no topo da página
        mostram a última atualização. Quando a mudança for relevante, o aviso de privacidade aparecerá de novo para você
        confirmar sua escolha.
      </p>

      <h2>12. Contato</h2>
      <p>
        Dúvidas ou pedidos sobre seus dados: <a href={`mailto:${legal.email}`}>{legal.email}</a>.
      </p>
    </LegalLayout>
  )
}
