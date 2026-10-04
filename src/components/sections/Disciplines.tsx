import { disciplines } from "@/content/profile";
import { revealDelay } from "@/lib/style";

/** Quiet editorial break: the four pillars of Carol's work, set as type. */
export function Disciplines() {
  return (
    <div className="border-y border-[var(--line)]">
      <ul
        aria-label="Áreas de atuação"
        className="container-page grid grid-cols-2 gap-y-1 py-8 text-center font-display text-[clamp(1.875rem,8vw,4rem)] italic leading-tight text-ink/85 sm:flex sm:items-center sm:justify-between sm:text-left lg:py-10"
      >
        {disciplines.map((word, i) => (
          <li key={word} data-reveal="fade" style={revealDelay(i * 90)}>
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}
