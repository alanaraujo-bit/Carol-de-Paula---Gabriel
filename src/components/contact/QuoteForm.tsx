"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";

import { formatQuoteMessage, mailtoUrl, whatsappUrl, type QuoteRequest } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";

const eventTypes = [
  "Cerimônia ou solenidade",
  "Evento corporativo",
  "Feira ou festival",
  "Evento institucional",
  "Gravação ou conteúdo em vídeo",
  "Outro",
];

const empty: QuoteRequest = { name: "", eventType: "", date: "", city: "", details: "" };

/**
 * Builds a ready-to-send quote request and hands it to WhatsApp (or
 * e-mail). Nothing is stored or sent by the site itself.
 */
export function QuoteForm() {
  const id = useId();
  const [values, setValues] = useState<QuoteRequest>(empty);
  const [nameError, setNameError] = useState(false);

  const update = (field: keyof QuoteRequest) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field === "name" && value.trim()) setNameError(false);
  };

  const validate = () => {
    const valid = values.name.trim().length > 0;
    setNameError(!valid);
    if (!valid) document.getElementById(`${id}-name`)?.focus();
    return valid;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    window.open(whatsappUrl(formatQuoteMessage(values)), "_blank", "noopener,noreferrer");
  };

  const sendByEmail = () => {
    if (!validate()) return;
    window.location.href = mailtoUrl(
      `Orçamento — ${values.eventType || "evento"}`,
      formatQuoteMessage(values),
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`} className="flex flex-col">
      <p id={`${id}-title`} className="eyebrow text-teal-light">
        Monte seu pedido
      </p>

      <div className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <Field label="Seu nome" htmlFor={`${id}-name`} className="sm:col-span-2" error={nameError ? "Informe seu nome para continuar." : undefined}>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={nameError || undefined}
            aria-describedby={nameError ? `${id}-name-error` : undefined}
            value={values.name}
            onChange={(e) => update("name")(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Tipo de evento" htmlFor={`${id}-type`}>
          <select
            id={`${id}-type`}
            name="eventType"
            value={values.eventType}
            onChange={(e) => update("eventType")(e.target.value)}
            className={cn(inputClass, "appearance-none [color-scheme:dark] bg-[length:12px] bg-[right_0.25rem_center] bg-no-repeat pr-8", !values.eventType && "text-on-ink-muted")}
            style={{ backgroundImage: chevron }}
          >
            <option value="">Selecione</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Data prevista" htmlFor={`${id}-date`}>
          <input
            id={`${id}-date`}
            name="date"
            type="date"
            value={values.date}
            onChange={(e) => update("date")(e.target.value)}
            className={cn(inputClass, "[color-scheme:dark]", !values.date && "text-on-ink-muted")}
          />
        </Field>

        <Field label="Cidade ou local" htmlFor={`${id}-city`} className="sm:col-span-2">
          <input
            id={`${id}-city`}
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => update("city")(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Conte um pouco sobre o evento" htmlFor={`${id}-details`} className="sm:col-span-2">
          <textarea
            id={`${id}-details`}
            name="details"
            rows={3}
            value={values.details}
            onChange={(e) => update("details")(e.target.value)}
            className={cn(inputClass, "resize-none py-3 leading-relaxed")}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <button
          type="submit"
          className="group/btn inline-flex min-h-14 items-center justify-center gap-3 bg-paper px-7 text-[0.875rem] font-medium tracking-[0.04em] text-ink transition-colors duration-300 hover:bg-teal-light"
        >
          <WhatsApp className="text-lg" />
          Enviar pelo WhatsApp
        </button>
        <button
          type="button"
          onClick={sendByEmail}
          className="group inline-flex min-h-12 items-center justify-center gap-3 text-[0.8125rem] font-medium tracking-[0.04em] text-on-ink sm:justify-start"
        >
          <span className="link-underline">Prefiro enviar por e-mail</span>
          <ArrowRight className="text-base transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
        </button>
      </div>

      <p className="mt-6 max-w-[52ch] text-[0.75rem] leading-relaxed text-on-ink-muted">
        A mensagem abre pronta no seu WhatsApp ou e-mail para você revisar antes de enviar. Nenhum dado fica
        armazenado neste site.
      </p>
    </form>
  );
}

const inputClass =
  "block min-h-12 w-full border-0 border-b border-[var(--line-on-ink)] bg-transparent px-0 text-[1rem] text-on-ink outline-none transition-colors duration-300 placeholder:text-on-ink-muted hover:border-on-ink-muted focus:border-teal-light focus-visible:outline-none aria-[invalid]:border-[#f0a39b]";

const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a39e97' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`;

function Field({
  label,
  htmlFor,
  className,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("group/field pt-5", className)}>
      <label
        htmlFor={htmlFor}
        className="eyebrow block text-on-ink-muted transition-colors group-focus-within/field:text-teal-light"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-[0.8125rem] text-[#f0a39b]">
          {error}
        </p>
      )}
    </div>
  );
}
