import Link from "next/link";

export function RouteCard({
  href,
  title,
  description,
  label,
}: {
  href: string;
  title: string;
  description: string;
  label: string;
}) {
  return (
    <Link href={href} className="route-card">
      <span className="route-card__label">{label}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="route-card__arrow">→</span>
    </Link>
  );
}
