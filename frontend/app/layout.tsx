import type { Metadata, Viewport } from "next";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/700.css";
import "@fontsource/metropolis/800.css";
import "charter-webfont/charter.css";
import "./globals.css";
import CookieBanner from "../components/CookieBanner";
import GoogleAnalytics from "../components/GoogleAnalytics";
import PageTransitionProvider from "@/components/PageTransitionProvider";
import ScrollMotionProvider from "@/components/ScrollMotionProvider";
import SitePreloader from "@/components/SitePreloader";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", colorScheme: "dark light" };

export const metadata: Metadata = {
  metadataBase: new URL("https://antenapro.hr"),
  title: { default: "AntenaPRO – Antene, internet i sigurnosni sustavi", template: "%s | AntenaPRO" },
  description: "Profesionalna montaža antena, Starlinka, Wi-Fi mreža, videonadzora i multimedije. 20+ godina iskustva i odaziv unutar 24 sata.",
  keywords: ["montaža antena", "Starlink montaža", "videonadzor", "Wi-Fi mreže", "Zagreb", "AntenaPRO"],
  alternates: { canonical: "/" },
  openGraph: { title: "AntenaPRO – Pouzdan signal. Stručna izvedba.", description: "Tehnička rješenja za stabilan signal, povezivost i sigurnost.", type: "website", locale: "hr_HR", siteName: "AntenaPRO", images: [{ url: "/images/IMG_8108.JPG", width: 1200, height: 630, alt: "AntenaPRO antenski sustav u Zagrebu" }] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <SiteNav />
        <PageTransitionProvider>
          <SitePreloader />
          <ScrollMotionProvider>{children}</ScrollMotionProvider>
        </PageTransitionProvider>
        <SiteFooter />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <CookieBanner />
      </body>
    </html>
  );
}
