import Link from "next/link";

type ActionCardProps = {
  href: string;
  title: string;
  description: string;
  actionLabel: string;
};

export default function ActionCard({
  href,
  title,
  description,
  actionLabel,
}: ActionCardProps) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:border-blue-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-3 text-slate-600">{description}</p>
      <span className="mt-6 inline-block font-semibold text-blue-700">
        {actionLabel} <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
