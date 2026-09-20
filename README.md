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
- `/servicos` e `/servicos/[slug]`: uma página por serviço (passagens aéreas, hospedagem, pacotes, passeios e ingressos, aluguel de veículos, assessoria para passaporte, check-in)
- `/destinos` e `/destinos/[slug]`: guia de cada destino (Gramado, Maceió, Cancún, Paris, Lisboa, Buenos Aires) com o planejador já preenchido
- `/viagens-nacionais` e `/viagens-internacionais`: páginas de turismo no Brasil e no exterior
- `/dicas` e `/dicas/[slug]`: 11 guias de viagem (como planejar, agência vale a pena?, primeira viagem internacional, lua de mel, escolher destino de férias, viajar em família, pacotes, passagens, hospedagem, primeira viagem de avião, durante o voo)
- `/sitemap.xml`, `/robots.txt` e página 404 (sem indexar) gerados automaticamente

## Configuração

Tudo em [src/config/site.ts](src/config/site.ts). Cada valor também aceita variável de ambiente.

| Item | Valor atual | Variável |
| --- | --- | --- |
| WhatsApp (mensagem do planejador) | `5594999099386` | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| WhatsApp (botões de contato) | `https://wa.link/fj7dxp` | `NEXT_PUBLIC_WHATSAPP_CONTACT_URL` |
| Instagram | `https://www.instagram.com/grgviagens` | `NEXT_PUBLIC_INSTAGRAM_URL` |
| Domínio (canonical, sitemap, Open Graph) | `https://grgviagens.com.br` | `NEXT_PUBLIC_SITE_URL` |
| Cadastur | vazio (não aparece) | `NEXT_PUBLIC_CADASTUR` |
| Google Search Console (tag HTML) | vazio | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| Analytics Plausible | desligado | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |
| Analytics Umami | desligado | `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (+ `NEXT_PUBLIC_UMAMI_SRC`) |

Se o número do WhatsApp ficar vazio ou inválido, o planejador não gera link: o visitante vê e copia a mensagem.

## Analytics (sem cookies, opcional)

Sem configuração, **nada é carregado nem enviado**. Ao configurar Plausible ou Umami, o site registra: `hero_planejar`, `header_planejar`, `destino_quero_conhecer` (com o destino), `destino_cotar`, `filtro_destino`, `form_submit_valido`, `whatsapp_abrir`, `mensagem_copiada`, `whatsapp_contato` (com o local), `instagram_click`, `guia_aberto` e `guia_planejar`. Para rastrear um novo botão, basta `data-track="nome"` nele.

## SEO

Tudo o que o código pode fazer por SEO já está feito e é verificado automaticamente:

- **Títulos e descrições únicos** em todas as 23 páginas do sitemap, com canonical, Open Graph e Twitter card.
- **Dados estruturados (JSON-LD):** `TravelAgency` e `WebSite` em todo o site, `FAQPage` na página inicial e nas páginas de serviço, `Service` nos serviços, `TouristDestination` nos destinos, `Article` nos guias e `BreadcrumbList` (migalhas) em todas as subpáginas.
- **Conteúdo indexável** para as buscas principais: uma página própria para cada serviço, destino e guia (agência de viagens, passagens aéreas, hotéis e hospedagem, pacotes de viagem, passeios, aluguel de carro, viajar em família).
- **Links internos** entre home, serviços, destinos e guias; imagens com texto alternativo; `lang="pt-BR"`.
- **`www.grgviagens.com.br` redireciona (308) para `grgviagens.com.br`**, mantendo o caminho. Configurado em `next.config.ts`.
- **Prévia ao compartilhar o link** (WhatsApp, Facebook, Instagram, LinkedIn): imagem 1200×630 com a logo da GRG em destaque (`public/images/og.jpg`, 79 KB) e título/descrição do site. Ícone para iPhone em `src/app/apple-icon.png`. Se uma prévia antiga aparecer, é cache: o WhatsApp guarda por um tempo; para forçar, compartilhe o link com `?v=2` no final.
- **Palavras e sinônimos de busca** (viagem, viagens, viajar, turismo, agência de viagens, pacotes, destinos, primeira viagem, lua de mel, férias…) estão no texto visível, nos títulos, nas descrições, nos guias e nas páginas de viagens nacionais/internacionais.
- Desempenho: Core Web Vitals no verde (CLS 0, LCP real ~0,4 s); Lighthouse SEO 100.

O que precisa ser feito **fora do código** (a parte que mais pesa para aparecer bem no Google):

1. **Domínio e `www`:** na Vercel, adicione `grgviagens.com.br` e `www.grgviagens.com.br` em *Settings > Domains*. No DNS do domínio, crie o registro do `www` (CNAME para `cname.vercel-dns.com`, ou o valor que a Vercel indicar). Mantenha o domínio **sem www como principal** e não configure o redirecionamento inverso na Vercel, para não criar um laço.
2. **Google Search Console:** crie a propriedade do domínio (verificação por DNS) e envie `https://grgviagens.com.br/sitemap.xml`. Se preferir a verificação por tag HTML, defina `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` na Vercel com o código informado.
3. **Google Meu Negócio:** crie e verifique o perfil da agência (endereço ou área de atendimento, telefone, horário, fotos). É o que mais influencia buscas como "agência de viagens" perto de quem procura.
4. **Bing Webmaster Tools:** importe o site do Search Console (leva 2 minutos).
5. **Instagram e links externos:** o perfil já aponta para o site; peça que parceiros e perfis locais também apontem.
6. **Conteúdo contínuo:** um guia novo por mês (roteiros, épocas, documentos) em `src/content/guides.ts` e novos destinos em `src/content/places.ts` aparecem automaticamente no sitemap.

Expectativa realista: termos genéricos como "viagens" ou "hotéis" são disputados por grandes sites do país inteiro. O caminho é ganhar posição primeiro em buscas específicas e locais (nome da agência, "agência de viagens em <sua cidade>", "pacote para Gramado", "viajar com crianças") e crescer a partir delas. Resultados de SEO levam semanas a meses depois da indexação.

## Pendências antes de publicar

1. **Domínio**: `https://grgviagens.com.br` já é o padrão do site. Falta só o registro DNS do `www` (veja a seção SEO).
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
