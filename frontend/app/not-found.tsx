import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="inner-hero editorial-hero"><div className="hero-grid" /><div className="shell inner-hero-content"><p className="eyebrow"><span /> 404</p><h1>Signal nije pronađen.</h1><p>Stranica koju tražite ne postoji ili je premještena.</p><Link className="button button-primary" href="/">Povratak na početnu ↗</Link></div></main>;
}
