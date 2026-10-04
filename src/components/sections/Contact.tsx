import { site } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight, WhatsApp } from "@/components/ui/Icons";
import { QuoteForm } from "@/components/contact/QuoteForm";
import { revealDelay } from "@/lib/style";

const channels = [
  { label: "Telefone", value: site.contact.phoneDisplay, href: telUrl },
  { label: "E-mail", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Instagram", value: site.contact.instagram.handle, href: site.contact.instagram.url, external: true },
];

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      data-surface="ink"
      className="bg-ink text-on-ink"
    >
      <div className="container-page pb-20 pt-24 lg:pb-28 lg:pt-40">
        <SectionLabel index="07" tone="ink" className="mb-8">
          Contato
        </SectionLabel>
        <h2
          id="contato-titulo"
          data-reveal
          className="max-w-[12ch] font-display text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.9] tracking-[-0.02em]"
        >
          Vamos trabalhar <em className="italic text-teal-light">juntos?</em>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-20 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal className="max-w-[38ch] text-[1.125rem] leading-relaxed text-on-ink-muted text-pretty">
              Conte um pouco sobre o seu evento — data, local e formato — e eu retorno com disponibilidade e
              proposta.
            </p>

            <a
              data-reveal
              style={revealDelay(80)}
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex min-h-16 items-center justify-between gap-4 bg-paper px-6 text-ink transition-colors duration-300 hover:bg-teal-light"
            >
              <span className="flex items-center gap-3 text-[0.9375rem] font-medium tracking-[0.02em]">
                <WhatsApp className="text-xl" />
                Solicitar orçamento pelo WhatsApp
              </span>
              <ArrowUpRight className="text-xl transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <ul className="mt-12 border-b border-[var(--line-on-ink)]">
              {channels.map((channel, i) => (
                <li key={channel.label} data-reveal style={revealDelay(120 + i * 60)}>
                  <a
                    href={channel.href}
                    {...(channel.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex min-h-20 items-center justify-between gap-4 border-t border-[var(--line-on-ink)] py-4 transition-colors duration-300 hover:text-teal-light"
                  >
                    <span className="min-w-0">
                      <span className="eyebrow block text-on-ink-muted">{channel.label}</span>
                      <span className="mt-1.5 block break-words text-[1.0625rem] sm:text-[1.1875rem]">
                        {channel.value}
                      </span>
                    </span>
                    <ArrowUpRight className="shrink-0 text-lg text-on-ink-muted transition-[transform,color] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-light" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
