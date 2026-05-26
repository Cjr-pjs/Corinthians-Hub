import Image from "next/image";

export function ProfileCard({
  image,
  name,
  subtitle,
  bio,
}: {
  image: string;
  name: string;
  subtitle: string;
  bio: string;
}) {
  return (
    <article className="profile-card">
      <div className="profile-card__media">
        <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="profile-card__body">
        <p className="profile-card__subtitle">{subtitle}</p>
        <h2>{name}</h2>
        <p className="profile-card__bio">{bio}</p>
      </div>
    </article>
  );
}
