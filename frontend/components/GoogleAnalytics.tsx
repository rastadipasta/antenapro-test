"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function GoogleAnalytics({ gaId }: { gaId: string | undefined }) {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Check initial consent status
    const checkConsent = () => {
      const consent = localStorage.getItem("antenapro-cookie-consent");
      if (consent === "all") {
        setConsentGranted(true);
      }
    };

    checkConsent();

    // Listen for custom event from CookieBanner
    const handleConsentUpdate = () => {
      checkConsent();
    };

    window.addEventListener("consentUpdated", handleConsentUpdate);
    return () => window.removeEventListener("consentUpdated", handleConsentUpdate);
  }, []);

  if (!gaId || !consentGranted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
