import { cn } from "@/lib/cn";

type SectionLabelProps = {
  index: string;
  children: string;
  tone?: "paper" | "ink";
  className?: string;
};

/** Editorial section marker, e.g. "02 — Sobre". */
export function SectionLabel({ index, children, tone = "paper", className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "paper" ? "text-teal" : "text-teal-light",
        className,
      )}
    >
      <span className="tabular-nums">{index}</span>
      <span aria-hidden className={cn("h-px w-8", tone === "paper" ? "bg-teal/50" : "bg-teal-light/50")} />
      <span>{children}</span>
    </p>
  );
}
