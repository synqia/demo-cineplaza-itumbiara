export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQs do Cineplaza para a página institucional e JSON-LD. */
export const faqs: FaqItem[] = [
  {
    question: "Como funciona a compra de ingressos neste site?",
    answer:
      "Neste protótipo, o fluxo de compra é simulado até o resumo. A integração com pagamento será adicionada em uma próxima etapa.",
  },
  {
    question: "O Cineplaza aceita meia-entrada?",
    answer:
      "Sim. No fluxo demonstrativo há opções de inteira, meia-entrada e ingresso promocional. As regras oficiais serão validadas na operação real.",
  },
  {
    question: "Quais salas têm acessibilidade?",
    answer:
      "Há assentos reservados, rampas, banheiros acessíveis e sessões com indicação de acessibilidade na programação.",
  },
  {
    question: "Posso comprar itens do cardápio online?",
    answer:
      "O cardápio online é uma simulação do protótipo. A retirada e o pagamento dos produtos acontecem presencialmente no cinema.",
  },
  {
    question: "Onde fica o estacionamento?",
    answer:
      "Há estacionamento conveniado a cerca de 50 metros. Consulte a validação disponível na bilheteria.",
  },
];
