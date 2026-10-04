import { cn } from "@/lib/cn";

/** "Carol de Paula" set as a typographic signature. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display whitespace-nowrap leading-none", className)}>
      Carol <em className="italic">de</em> Paula
    </span>
  );
}
