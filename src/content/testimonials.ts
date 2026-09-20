/**
 * Depoimentos REAIS de clientes, sempre com autorização. Enquanto a lista estiver
 * vazia, a seção não aparece no site. Não inclua textos inventados.
 */
export type Testimonial = {
  name: string;
  trip: string; // ex.: "Viagem a Gramado"
  text: string;
};

export const testimonials: Testimonial[] = [];
