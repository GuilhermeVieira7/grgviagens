# GRG Viagens: site

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Sem bibliotecas de animação nem de 3D: tudo é CSS e um pouco de IntersectionObserver.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Páginas

- `/` página inicial, na ordem de decisão: abertura imersiva (foto em tela cheia), faixa de benefícios, vitrine "Qual vai ser o seu próximo destino?", institucional ("Você escolhe o destino. A gente ajuda com o caminho."), pedido de cotação, serviços, como funciona (3 passos), dúvidas, chamada final e rodapé institucional
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
| Cadastur | `69.217.621/0001-28` (confirmado pela GRG em nov/2026) | `NEXT_PUBLIC_CADASTUR` |
| CNPJ | `69.217.621/0001-28` (confirmado) | — |
| Razão social, endereço, e-mail, horário | vazios (não aparecem) | — |
| Google Search Console (tag HTML) | vazio | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| Analytics Plausible | desligado | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |
| Analytics Umami | desligado | `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (+ `NEXT_PUBLIC_UMAMI_SRC`) |

Se o número do WhatsApp ficar vazio ou inválido, o planejador não gera link: o visitante vê e copia a mensagem.

> **Contatos:** o formulário abre `wa.me/5594999099386`; os botões "Conversar no WhatsApp" usam o link curto `wa.link/fj7dxp`. Os dois devem apontar para o mesmo número, mas o destino do link curto não pôde ser conferido automaticamente. Confirme abrindo-o; se for o mesmo número, dá para trocar por `https://wa.me/5594999099386` e eliminar o intermediário.

## Vitrine de ofertas

Fonte única: [src/content/offers.ts](src/content/offers.ts). Dois tipos de item:

- `cotacao`: destino em destaque, sem preço ("Solicitar cotação"). É o que está publicado, porque não há ofertas vigentes confirmadas.
- `oferta`: pacote com dados **confirmados pela GRG**: saída, período, noites, serviços incluídos, preço por pessoa (opcional) e condições. Botão "Quero esse pacote". Com `validUntil`, a oferta sai do site sozinha depois da data.

O arquivo tem um modelo comentado. Nunca reaproveite valores de artes antigas. Ao escolher um item, o formulário recebe o destino (e, nas ofertas, a cidade de saída) e a mensagem do WhatsApp leva a referência e os dados do pacote.

## Analytics (sem cookies, opcional)

Sem configuração, **nada é carregado nem enviado** (a Vercel Analytics e o Speed Insights continuam como estavam). Ao configurar Plausible ou Umami, o site registra: `hero_planejar`, `header_planejar`, `oferta_selecionada` (id do item e tipo), `vitrine_outro_destino`, `cotacao_personalizar` (abriu a área opcional), `form_submit_valido` (chegou à revisão; leva só o id da oferta, se houver), `whatsapp_abrir`, `mensagem_copiada`, `whatsapp_contato` (com o local do botão), `instagram_click`, `guia_aberto`, `destino_cotar` e `guia_planejar`. **Nenhum evento leva nome, origem, datas ou qualquer dado digitado no formulário.** Para rastrear um novo botão, basta `data-track="nome"` nele.

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

## Segurança

- **Cabeçalhos de segurança** em todas as rotas (`next.config.ts`): Content-Security-Policy (só o próprio site carrega scripts, estilos, fontes e imagens; Plausible/Umami já liberados caso sejam ativados), X-Frame-Options e `frame-ancestors 'none'` (ninguém embute o site), X-Content-Type-Options, Referrer-Policy, Permissions-Policy (câmera, microfone, localização etc. desativados) e Cross-Origin-Opener-Policy. O HSTS (HTTPS obrigatório) já é enviado pela Vercel.
- `X-Powered-By` removido (não anuncia a tecnologia do servidor).
- O site não tem back-end, banco de dados nem coleta de dados: o formulário só monta a mensagem no navegador e abre o WhatsApp.
- Links externos usam `rel="noopener noreferrer"`.
- `public/.well-known/security.txt`: canal para quem encontrar uma falha avisar a GRG.
- `.github/dependabot.yml`: atualizações semanais de dependências (o GitHub abre um PR; revise e faça o merge).
- Ao ativar um novo serviço externo (mapa, chat, outro analytics), inclua o domínio dele no CSP em `next.config.ts`, senão o navegador bloqueia.

## Pendências antes de publicar

1. **Domínio**: `https://grgviagens.com.br` já é o padrão do site. Falta só o registro DNS do `www` (veja a seção SEO).
2. **Cadastur e CNPJ**: publicados (rodapé, seção institucional e `taxID` nos dados estruturados). Não há link de certificado nem selo: só o número informado.
3. **Depoimentos**: [src/content/testimonials.ts](src/content/testimonials.ts) está vazio e a seção não aparece. Adicione apenas depoimentos reais e autorizados.
4. **Serviços não publicados**: "Seguro viagem" e "Cruzeiros" só entram quando a GRG confirmar (`services` em [src/content/text.ts](src/content/text.ts)).
5. **Guias e destinos** ([src/content/guides.ts](src/content/guides.ts), [src/content/places.ts](src/content/places.ts)): textos gerais, sem preços, datas, disponibilidade nem regras de bagagem. Revisar com a GRG e fontes oficiais.
6. **Dados institucionais** (razão social, endereço, e-mail, horário de atendimento, anos de atuação): não fornecidos, ficam fora do site. Preencha em `src/config/site.ts` quando confirmar; aparecem sozinhos.
9. **Ofertas vigentes**: cadastrar em `src/content/offers.ts` quando a GRG confirmar.
10. **Fotos da equipe**: a seção institucional usa a logo e a paleta. Fotos reais e autorizadas da equipe podem entrar depois.
7. **Fotografias**: reais, do Wikimedia Commons (CC BY, CC BY-SA, CC0 ou domínio público), com créditos no rodapé, na ampliação da galeria e nas páginas de destino ([src/content/photos.ts](src/content/photos.ts)). Fotos próprias da GRG podem substituí-las em `public/images/fotos/`.
8. **Google Meu Negócio**: criar e verificar o perfil (fora do site).

## Estrutura

- `src/content/`: textos, destinos, guias, galeria, faixa de inspirações, créditos das fotos
- `src/config/site.ts`: contatos, navegação, analytics
- `src/lib/whatsapp.ts`: validação, mensagem e link `wa.me`; `src/lib/analytics.ts`: eventos
- `src/content/offers.ts`: vitrine da página inicial
- `src/components/`: uma seção por arquivo (`Hero`, `Benefits`, `Offers`, `WhyGrg`, `Planner`, `Services`, `HowItWorks`, `Faq`, `Closing`, `Footer`, `Dock`). A galeria, a faixa "Instagram" (que não mostrava posts reais), a lista de guias e a antiga seção "Prazer, somos a GRG" saíram da home; guias e destinos continuam em `/dicas` e `/destinos`.
- `src/app/globals.css`: tokens de cor/tipografia, hovers e animações

## Fotos

A abertura usa a Praia do Leão (Fernando de Noronha, 3200×2000, CC BY-SA 3.0), com enquadramento próprio para celular e desktop em `globals.css` (`.hero-img`). A vitrine usa as fotos 4:5 dos destinos; as páginas de destino usam fontes maiores, com `sizes` calculado pela largura realmente renderizada (com `object-cover` a foto aparece maior que o quadro). O Next serve AVIF/WebP no tamanho certo para cada tela.

As fotos `gal-*` e `inspira-*` em `public/images/fotos/` não são mais exibidas (e por isso saíram dos créditos). Ficaram no repositório para reaproveitamento; podem ser apagadas.
