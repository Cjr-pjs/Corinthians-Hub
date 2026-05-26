type SectionHeadingProps = {
  kicker: string;
  title: string;
  description: string;
};

export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="section-heading__kicker">{kicker}</p>
      <h1 className="section-heading__title">{title}</h1>
      <p className="section-heading__description">{description}</p>
    </header>
  );
}
