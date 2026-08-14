import { companyData } from "@/data/companyData";
import { escapeHtml } from "@/lib/utils";

/**
 * Conteúdo legal alinhado à LGPD (Lei 13.709/2018).
 * Contexto Cineplaza — protótipo demonstrativo.
 */

const companyName = escapeHtml(companyData.companyName);
const email = escapeHtml(companyData.email);
const phone = escapeHtml(companyData.phone);
const contactLine = email ? `e-mail: ${email}` : `WhatsApp: ${phone}`;

export const privacyPolicyTitle = "Política de Privacidade";

export function getPrivacyPolicyContent(): string {
  return `
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Esta Política de Privacidade descreve como a ${companyName} coleta, usa e protege seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">1. Controlador e Encarregado de Dados (DPO)</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  O controlador dos dados é a ${companyName}. Para exercer seus direitos como titular (acesso, correção, exclusão, portabilidade, revogação do consentimento), entre em contato pelo ${contactLine}.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">2. Dados que Coletamos</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Coletamos apenas os dados estritamente necessários para: (a) responder contatos e dúvidas sobre programação; (b) cumprir obrigações legais; (c) melhorar a experiência de navegação quando você consentir em cookies opcionais. Podem ser coletados: nome, telefone, e-mail de newsletter (quando informado) e dados de navegação. O site pode utilizar cookies essenciais e, com seu consentimento, cookies opcionais.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">3. Base Legal e Finalidade</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  O tratamento baseia-se em: consentimento (quando aplicável), execução de medidas pré-contratuais e legítimo interesse (quando compatível com seus direitos). Os dados são utilizados somente para as finalidades informadas e pelo tempo necessário.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">4. Compartilhamento e Retenção</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Seus dados não são vendidos. Podem ser compartilhados com parceiros técnicos ou autoridades quando exigido por lei. A retenção segue a necessidade da finalidade e dos prazos legais aplicáveis.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">5. Seus Direitos (Art. 18 da LGPD)</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Você tem direito a: confirmação da existência de tratamento; acesso; correção; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; eliminação dos dados tratados com consentimento; revogação do consentimento; e informação sobre compartilhamento.
</p>

<p class="mt-6 text-muted-foreground text-xs font-body">
  Última atualização: referente ao uso do site demonstrativo da ${companyName}. Em caso de dúvidas, entre em contato.
</p>
`.trim();
}

export const termsOfUseTitle = "Termos de Uso";

export function getTermsOfUseContent(): string {
  return `
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Ao acessar e utilizar o site da ${companyName}, você concorda com os presentes Termos de Uso.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">1. Objeto e Aceitação</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Estes termos regem o uso do site e dos recursos disponíveis (programação, filmes, cardápio e fluxos demonstrativos). O uso continuado do site implica aceitação destes termos.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">2. Uso Adequado</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  O usuário compromete-se a utilizar o site de forma lícita, não podendo utilizar recursos para fins ilícitos, ofensivos ou que prejudiquem terceiros ou a infraestrutura do site.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">3. Propriedade Intelectual</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  O conteúdo do site (textos, imagens, marcas, layout) é de propriedade da ${companyName} ou de licenciantes. É proibida a reprodução ou uso comercial sem autorização prévia.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">4. Conteúdo Demonstrativo</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Programação, preços, promoções e o fluxo de compra são ilustrativos neste protótipo e não constituem oferta comercial vinculante até a publicação oficial.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">5. Privacidade e Dados Pessoais</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  O tratamento de dados pessoais é regido pela nossa Política de Privacidade e pela LGPD.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">6. Limitação de Responsabilidade</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  O site é fornecido "como está". A ${companyName} não se responsabiliza por danos indiretos decorrentes do uso ou da impossibilidade de uso do site.
</p>

<h3 class="font-heading font-semibold text-foreground mt-6 mb-2 text-sm">7. Alterações e Lei Aplicável</h3>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Estes termos podem ser alterados a qualquer momento, com vigência a partir da publicação no site. Em caso de conflito, prevalece a lei brasileira.
</p>

<p class="mt-6 text-muted-foreground text-xs font-body">
  Em caso de dúvidas, entre em contato pelo ${contactLine}.
</p>
`.trim();
}

export const cookiesPolicyTitle = "Política de Cookies";

export function getCookiesPolicyContent(): string {
  return `
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Este site utiliza cookies essenciais para funcionamento e, com o seu consentimento, cookies opcionais para analytics.
</p>
<p class="mb-4 text-muted-foreground text-sm font-body leading-relaxed">
  Você pode alterar suas preferências a qualquer momento. Para dúvidas, contate a ${companyName} pelo ${contactLine}.
</p>
`.trim();
}
