import Image from "next/image";
import Link from "next/link";
import { contact, services } from "@/lib/site-data";
import { ThemeButton } from "./SiteNav";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-brand">
          <Image src="/images/logo-nav-transparent.png" alt="AntenaPRO" width={112} height={102} />
          <p>Tehnička rješenja koja osiguravaju stabilan signal, sigurnost i povezanost.</p>
          <ThemeButton />
        </div>
        <div>
          <h2>Usluge</h2>
          {services.slice(0, 4).map((service) => <Link key={service.slug} href={`/usluge/${service.slug}`}>{service.shortTitle}</Link>)}
        </div>
        <div>
          <h2>AntenaPRO</h2>
          <Link href="/o-nama">O nama</Link>
          <Link href="/projekti">Projekti</Link>
          <Link href="/kontakt">Kontakt</Link>
        </div>
        <div>
          <h2>Kontakt</h2>
          <a href={contact.phoneHref}>{contact.phoneLabel}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <p>{contact.address}<br />OIB: {contact.oib}</p>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} AntenaPRO</span>
        <div><Link href="/politika-privatnosti">Privatnost</Link><Link href="/pravila-o-kolacicima">Kolačići</Link></div>
      </div>
    </footer>
  );
}
