import Link from "next/link";
import Icon from "@/components/Icon";

type ActionCardProps = {
  href: string;
  title: string;
  description: string;
  actionLabel: string;
  primary?: boolean;
};

export default function ActionCard({
  href,
  title,
  description,
  actionLabel,
  primary = false,
}: ActionCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-ui p-5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-8 ${primary ? "bg-accent text-white hover:bg-accent-hover selection:bg-surface selection:text-ink" : "border border-line bg-surface text-ink hover:border-accent selection:bg-soft-strong selection:text-ink"}`}
    >
      <h2 className="text-balance text-2xl font-normal">{title}</h2>
      <p className={`mt-2 max-w-md text-pretty leading-relaxed ${primary ? "text-white" : "text-muted"}`}>{description}</p>
      <span className={`mt-auto flex items-center gap-3 pt-4 font-bold underline-offset-4 group-hover:underline group-focus-visible:underline ${primary ? "text-white" : "text-accent"}`}>
        {actionLabel}
        <Icon name="arrow" />
      </span>
    </Link>
  );
}
