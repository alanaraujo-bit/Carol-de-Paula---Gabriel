import Link from "next/link";
import { navigation, site } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="rodape" data-surface="ink" className="bg-ink text-on-ink">
      <div className="container-page border-t border-[var(--line-on-ink)] pb-[max(env(safe-area-inset-bottom),2rem)] pt-12 lg:pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/#inicio" className="text-[2rem] lg:text-[2.5rem]" aria-label="Carol de Paula — voltar ao início">
              <Wordmark />
            </Link>
            <p className="mt-3 text-[0.875rem] text-on-ink-muted">
              {site.tagline} · {site.location.city}, {site.location.regionCode}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[0.875rem]">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={`/${item.href}`} className="link-reveal inline-flex min-h-11 items-center text-on-ink-muted hover:text-on-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.contact.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-reveal inline-flex min-h-11 items-center text-on-ink-muted hover:text-on-ink"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-4 border-t border-[var(--line-on-ink)] pt-6 text-[0.75rem] text-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <Link href="/#inicio" className="link-reveal inline-flex min-h-11 items-center self-start hover:text-on-ink sm:self-auto">
            Voltar ao topo ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
