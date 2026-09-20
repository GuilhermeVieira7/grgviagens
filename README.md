# GRG Viagens: site

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Sem bibliotecas de animação nem de 3D: tudo é CSS e um pouco de IntersectionObserver.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Páginas

- `/` página inicial (abertura com cartão-postal, destinos com filtros, serviços, galeria, planejador, como funciona, Instagram, institucional, guias, dúvidas, encerramento)
- `/destinos/[slug]` guia de cada destino (Gramado, Maceió, Cancún, Paris, Lisboa, Buenos Aires) com o planejador já preenchido
- `/dicas/[slug]` guias de viagem completos
- `/sitemap.xml` e `/robots.txt` gerados automaticamente

## Configuração

Tudo em [src/config/site.ts](src/config/site.ts). Cada valor também aceita variável de ambiente.

| Item | Valor atual | Variável |
| --- | --- | --- |
| WhatsApp (mensagem do planejador) | `5594999099386` | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| WhatsApp (botões de contato) | `https://wa.link/fj7dxp` | `NEXT_PUBLIC_WHATSAPP_CONTACT_URL` |
| Instagram | `https://www.instagram.com/grgviagens` | `NEXT_PUBLIC_INSTAGRAM_URL` |
| Domínio (canonical, sitemap, Open Graph) | `https://grgviagens.com.br` | `NEXT_PUBLIC_SITE_URL` |
| Cadastur | vazio (não aparece) | `NEXT_PUBLIC_CADASTUR` |
| Analytics Plausible | desligado | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |
| Analytics Umami | desligado | `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (+ `NEXT_PUBLIC_UMAMI_SRC`) |

Se o número do WhatsApp ficar vazio ou inválido, o planejador não gera link: o visitante vê e copia a mensagem.

## Analytics (sem cookies, opcional)

Sem configuração, **nada é carregado nem enviado**. Ao configurar Plausible ou Umami, o site registra: `hero_planejar`, `header_planejar`, `destino_quero_conhecer` (com o destino), `destino_cotar`, `filtro_destino`, `form_submit_valido`, `whatsapp_abrir`, `mensagem_copiada`, `whatsapp_contato` (com o local), `instagram_click`, `guia_aberto` e `guia_planejar`. Para rastrear um novo botão, basta `data-track="nome"` nele.

## Pendências antes de publicar

1. **Domínio**: já configurado como `https://grgviagens.com.br`. Ao publicar, aponte o DNS do domínio para a hospedagem e ative HTTPS.
2. **Cadastur**: preencha `NEXT_PUBLIC_CADASTUR` só quando o registro estiver aprovado.
3. **Depoimentos**: [src/content/testimonials.ts](src/content/testimonials.ts) está vazio e a seção não aparece. Adicione apenas depoimentos reais e autorizados.
4. **Serviços não publicados**: "Seguro viagem" e "Cruzeiros" só entram quando a GRG confirmar (`services` em [src/content/text.ts](src/content/text.ts)).
5. **Guias e destinos** ([src/content/guides.ts](src/content/guides.ts), [src/content/places.ts](src/content/places.ts)): textos gerais, sem preços, datas, disponibilidade nem regras de bagagem. Revisar com a GRG e fontes oficiais.
6. **Dados institucionais** (endereço, CNPJ, anos de atuação): não fornecidos, ficam fora do site.
7. **Fotografias**: reais, do Wikimedia Commons (CC BY, CC BY-SA, CC0 ou domínio público), com créditos no rodapé, na ampliação da galeria e nas páginas de destino ([src/content/photos.ts](src/content/photos.ts)). Fotos próprias da GRG podem substituí-las em `public/images/fotos/`.
8. **Google Meu Negócio**: criar e verificar o perfil (fora do site).

## Estrutura

- `src/content/`: textos, destinos, guias, galeria, faixa de inspirações, créditos das fotos
- `src/config/site.ts`: contatos, navegação, analytics
- `src/lib/whatsapp.ts`: validação, mensagem e link `wa.me`; `src/lib/analytics.ts`: eventos
- `src/components/`: uma seção por arquivo (`About.tsx` é a seção institucional aprovada e não deve ser alterada)
- `src/app/globals.css`: tokens de cor/tipografia, hovers e animações

## Fotos

Cards de destino e a faixa do Instagram usam fontes já cortadas em 4:5 (até 1600×2000); a galeria e as páginas de destino usam fontes maiores, com `sizes` calculado pela largura realmente renderizada (com `object-cover` a foto aparece maior que o quadro). O Next serve AVIF/WebP no tamanho certo para cada tela.
