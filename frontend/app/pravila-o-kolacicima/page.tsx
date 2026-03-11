import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pravila o kolačićima – AntenaPro",
  description: "Pravila i informacije o korištenju kolačića (cookies) na stranici AntenaPro.",
};

export default function CookiePolicy() {
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
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "2rem" }}>Pravila o kolačićima</h1>
        
        <div className="content-prose" style={{ lineHeight: 1.7, color: "var(--text)" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Naša web stranica antenapro.hr koristi kolačiće (eng. <em>cookies</em>) kako bismo vam omogućili najbolje korisničko iskustvo, osigurali ispravan rad stranice te poboljšali njezine funkcionalnosti.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>Što su kolačići?</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Kolačići su male tekstualne datoteke koje vaš preglednik sprema na vaše računalo ili mobilni uređaj prilikom posjeta web stranici. Pomažu web stranici da &quot;zapamti&quot; vaše radnje i postavke kroz određeno razdoblje, čime olakšavaju vaše ponovno korištenje stranice.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>Koje vrste kolačića koristimo?</h2>
          <p style={{ marginBottom: "0.5rem" }}><strong>1. Nužni (Funkcionalni) kolačići</strong></p>
          <p style={{ marginBottom: "1.5rem" }}>
            Ovi kolačići ključni su za ispravno funkcioniranje naše web stranice. Služe za pohranu preferencija (primjerice vaše privole o korištenju kolačića u <code>localStorage</code>) te za sigurnosne mjere aplikacije, uključujući alat <strong>Google reCAPTCHA</strong>. reCAPTCHA prikuplja određene tehničke informacije za prepoznavanje je li korisnik čovjek ili &quot;bot&quot;, kako bismo spriječili spam preplavljivanje naše kontakt forme. Ovi kolačići ne mogu se onemogućiti kroz naše sustave jer su ključni za rad web mjesta.
          </p>

          <p style={{ marginBottom: "0.5rem" }}><strong>2. Analitički i marketinški kolačići (ukoliko ih odobrite)</strong></p>
          <p style={{ marginBottom: "1.5rem" }}>
            Služe nam za analiziranje posjećenosti stranice te bolje razumijevanje korisničkih navika kako bismo mogli nadograditi našu uslugu. Trenutno se ne koriste analitički alati bez vaše prethodne privole (npr. Google Analytics).
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>Kako upravljati kolačićima?</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Postavke kolačića i privola koje se odnose na korištenje ove stranice možete u bilo kojem trenutku obrisati ili promijeniti unutar postavki vašeg web preglednika. Imajte na umu da blokiranje nužnih kolačića može onemogućiti neke osnove funkcije na web stranici (primjerice slanje upita putem kontakt forme zbog reCAPTCHA provjere).
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
