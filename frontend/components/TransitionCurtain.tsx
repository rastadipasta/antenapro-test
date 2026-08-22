import Image from "next/image";

type TransitionCurtainProps = {
  title: string;
  showLogo?: boolean;
};

export default function TransitionCurtain({ title, showLogo = false }: TransitionCurtainProps) {
  return (
    <div className="transition-curtain">
      <div className="transition-curtain__grid" aria-hidden="true" />
      <div className="transition-curtain__content">
        <span className="transition-curtain__kicker">
          <i aria-hidden="true" /> AntenaPRO
        </span>
        {showLogo ? (
          <div className="transition-curtain__logo">
            <Image
              src="/images/logo-nav-transparent.png"
              alt="AntenaPRO"
              width={330}
              height={302}
              priority
              sizes="(max-width: 640px) 190px, 280px"
            />
          </div>
        ) : (
          <strong className="transition-curtain__title">{title}</strong>
        )}
        <span className="transition-curtain__index" aria-hidden="true">
          SIGNAL / ONLINE
        </span>
      </div>
    </div>
  );
}
