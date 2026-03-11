"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("antenapro-cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("antenapro-cookie-consent", "all");
    window.dispatchEvent(new Event("consentUpdated"));
    setShow(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("antenapro-cookie-consent", "necessary");
    window.dispatchEvent(new Event("consentUpdated"));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner">
        <div className="cookie-text">
          <h3>Postavke kolačića (Cookies)</h3>
          <p>
            Naša web stranica koristi kolačiće kako bismo vam pružili najbolje moguće korisničko iskustvo. 
            Nužni kolačići (npr. Google reCAPTCHA) potrebni su za osnovno funkcioniranje stranice i obranu od spama. 
            Pritiskom na &quot;Prihvati sve&quot; pristajete na upotrebu svih kolačića.{" "}
            <Link href="/pravila-o-kolacicima" className="cookie-link">Saznaj više</Link>.
          </p>
        </div>
        <div className="cookie-actions">
          <button onClick={acceptNecessary} className="btn-cookie btn-cookie-secondary">Samo nužni</button>
          <button onClick={acceptAll} className="btn-cookie btn-cookie-primary">Prihvati sve</button>
        </div>
      </div>
    </div>
  );
}
