import Link from "next/link";
import Icon from "@/components/Icon";

type ActionCardProps = {
  href: string;
  title: string;
  primary?: boolean;
};

export default function ActionCard({
  href,
  title,
  primary = false,
}: ActionCardProps) {
  return (
    <Link
      href={href}
      className={`group flex min-h-22 items-center justify-between gap-5 rounded-ui border p-5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-6 ${primary ? "border-accent bg-accent text-white hover:bg-accent-hover selection:bg-surface selection:text-ink" : "border-line bg-surface text-ink hover:border-accent selection:bg-soft-strong selection:text-ink"}`}
    >
      <span className="min-w-0 text-lg font-bold underline-offset-4 group-hover:underline group-focus-visible:underline">
        {title}
      </span>
      <Icon name="arrow" className="h-6 w-6" />
    </Link>
  );
}
