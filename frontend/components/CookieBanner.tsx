"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const subscribeConsent = (callback: () => void) => {
  window.addEventListener("consentUpdated", callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener("consentUpdated", callback); window.removeEventListener("storage", callback); };
};
const getConsentSnapshot = () => localStorage.getItem("antenapro-cookie-consent") === null;

export default function CookieBanner() {
  const show = useSyncExternalStore(subscribeConsent, getConsentSnapshot, () => false);

  const acceptAll = () => {
    localStorage.setItem("antenapro-cookie-consent", "all");
    window.dispatchEvent(new Event("consentUpdated"));
  };

  const acceptNecessary = () => {
    localStorage.setItem("antenapro-cookie-consent", "necessary");
    window.dispatchEvent(new Event("consentUpdated"));
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
