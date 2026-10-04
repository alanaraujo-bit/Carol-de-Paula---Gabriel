# Carol de Paula — Portfólio

Site profissional de Carol de Paula, apresentadora e mestre de cerimônias em Canaã dos Carajás (PA).

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4. Sem bibliotecas de animação: o movimento é feito com CSS e um único `IntersectionObserver`.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

## Variáveis de ambiente

| Variável               | Uso                                                                  |
| ---------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL pública final (canonical, sitemap, Open Graph, schema.org). Ex.: `https://caroldepaula.com.br` |

Sem ela, o site usa `https://caroldepaula.com.br` como padrão. Configure na Vercel assim que o domínio definitivo existir.

## Onde editar o conteúdo

Todo o texto fica em `src/content/`, separado da apresentação:

| Arquivo        | Conteúdo                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| `site.ts`      | Nome, posicionamento, contatos (WhatsApp, e-mail, Instagram), SEO, menu  |
| `profile.ts`   | Sobre, números, trajetória, frentes de atuação, eventos em destaque      |
| `works.ts`     | Trabalhos da galeria                                                     |
| `photos.ts`    | Biblioteca de fotos: arquivo, texto alternativo e ponto focal de corte   |

### Adicionar um trabalho

1. Coloque a foto em `src/assets/photos/` (JPG, idealmente com 1600px+ no maior lado).
2. Registre-a em `src/content/photos.ts` com `alt` descritivo e `focus` (ex.: `"50% 30%"` — onde está o rosto, para cortes nunca o cortarem).
3. Adicione uma entrada em `src/content/works.ts`. Campos opcionais: `event`, `year`, `description`, fotos extras e `video`:

```ts
{
  slug: "abertura-fenecan-2025",
  title: "Abertura da FENECAN",
  event: "Feira de Negócios de Canaã",
  year: 2025,
  category: "Cerimonial",
  description: "Condução da cerimônia de abertura.",
  photos: [photos.minhaFoto, photos.outraFoto],
  video: { type: "youtube", id: "ID_DO_VIDEO", title: "Abertura da FENECAN 2025" },
}
```

A galeria alterna os trabalhos entre duas colunas; intercalar fotos horizontais e verticais mantém a composição equilibrada. O lightbox mostra todas as fotos e o vídeo de cada trabalho.

## Pontos a confirmar com a Carol

As legendas da galeria foram escritas a partir do que aparece nas fotos do PDF original. Vale ela confirmar:

- títulos e descrições dos trabalhos em `works.ts` (ex.: "Gravação em campo", "Reportagem de obra", "Cobertura externa");
- anos dos trabalhos que ainda não têm ano;
- fotos em resolução maior: as imagens extraídas do PDF têm entre 585 e 1386px de largura. Originais em alta deixam o site visivelmente mais nítido em telas retina.

## Estrutura

```
src/
  app/            rotas, metadata, sitemap, robots, manifest, ícones e imagem Open Graph gerados
  components/
    layout/       header, menu mobile, rodapé, barra de contato mobile
    sections/     uma seção da página por arquivo
    gallery/      galeria, lightbox e tile
    contact/      formulário que monta o pedido para WhatsApp/e-mail
    ui/           botões, ícones, rótulos de seção
  content/        conteúdo editável
  hooks/          useModalDialog (base do menu e do lightbox, sobre <dialog> nativo)
  lib/            contato, schema.org, utilitários
  assets/         fotos e fonte display (Instrument Serif, OFL)
```
