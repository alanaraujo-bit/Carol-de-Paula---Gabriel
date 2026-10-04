import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "ink" | "paper" | "outline" | "outline-ink";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-paper hover:bg-teal active:bg-ink",
  paper: "bg-paper text-ink hover:bg-teal-light active:bg-paper",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  "outline-ink": "border border-on-ink/40 text-on-ink hover:border-on-ink hover:bg-on-ink hover:text-ink",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
};

/** Anchor styled as a button. Sharp, editorial, generous hit area. */
export function ButtonLink({
  variant = "ink",
  icon,
  external,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "group/btn inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.8125rem] font-medium tracking-[0.04em]",
        "transition-[background-color,color,border-color] duration-300 ease-out-quart select-none",
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      {icon && (
        <span className="text-base transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1">
          {icon}
        </span>
      )}
    </a>
  );
}
