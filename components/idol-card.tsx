import Image from "next/image";

export function IdolCard({
  image,
  name,
  epoca,
  resumo,
}: {
  image: string;
  name: string;
  epoca: string;
  resumo: string;
}) {
  return (
    <article className="idol-card">
      <div className="idol-card__media">
        <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 25vw" />
      </div>
      <div className="idol-card__body">
        <p className="idol-card__epoca">{epoca}</p>
        <h2>{name}</h2>
        <p className="idol-card__summary">{resumo}</p>
      </div>
    </article>
  );
}
