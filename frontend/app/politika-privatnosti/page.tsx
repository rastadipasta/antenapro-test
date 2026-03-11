import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika privatnosti – AntenaPro",
  description: "Politika privatnosti i obrada osobnih podataka tvrtke AntenaPro.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <nav className="navbar" style={{ position: "relative" }}>
        <div className="navbar-inner">
          <Link href="/" className="logo">
            <img src="/images/logo.png" alt="AntenaPro logo" />
            AntenaPro
          </Link>
          <ul className="nav-links">
            <li><Link href="/">Povratak na naslovnicu</Link></li>
          </ul>
        </div>
      </nav>

      <main className="container" style={{ padding: "4rem 1.5rem", maxWidth: "800px", minHeight: "70vh" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "2rem" }}>Politika privatnosti</h1>
        
        <div className="content-prose" style={{ lineHeight: 1.7, color: "var(--text)" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Zaštita vaše privatnosti i vaših osobnih podataka od velike nam je važnosti. 
            Ova Politika privatnosti objašnjava kako <strong>AntenaPro</strong> prikuplja, koristi i štiti vaše osobne podatke prilikom korištenja naše web stranice antenapro.hr.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>1. Prikupljanje podataka</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Prikupljamo samo one osobne podatke koje nam vi dobrovoljno pružite putem naše kontakt forme (poput imena, prezimena, e-mail adrese i broja telefona te sadržaja poruke) kako bismo mogli obraditi vaš upit i pružiti zatraženu uslugu.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>2. Korištenje podataka</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Prikupljene podatke koristimo isključivo u svrhu:
          </p>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li>Odgovaranja na vaše upite i pružanja tehničke podrške.</li>
            <li>Realizacije usluga za koje ste iskazali interes.</li>
            <li>Komunikacije vezane za daljnju suradnju i održavanje sustava.</li>
          </ul>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>3. Zaštita i čuvanje podataka</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Vaše podatke čuvamo sukladno visokim sigurnosnim standardima te ih nećemo prodavati, ustupati niti dijeliti s trećim stranama, osim ako to nije zakonski propisano ili neophodno za izvršenje zatražene usluge. Vaši podaci čuvaju se onoliko dugo koliko je potrebno za ostvarenje svrhe za koju su prikupljeni, odnosno sukladno zakonskim rokovima.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>4. Vaša prava</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Kao korisnik imate pravo zatražiti informaciju o tome koje vaše podatke čuvamo, zatražiti njihov ispravak ili brisanje te povući privolu za obradu istih. Za sva pitanja u vezi privatnosti obratite nam se putem e-maila na info@antenapro.hr.
          </p>
        </div>
      </main>

      <footer>
        <div style={{ textAlign: "center", padding: "2rem 1.5rem", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} AntenaPro. Sva prava pridržana.
        </div>
      </footer>
    </>
  );
}
