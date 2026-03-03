import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://antenapro.hr"),
  title: "AntenaPro - Profesionalna montaža antena, videonadzora i internet rješenja | Hrvatska",
  description:
    "Stručna montaža zemaljskih i satelitskih antena, videonadzora, alarma, internet i Wi-Fi mreža. 20+ godina iskustva. Ovlašteni A1 i Telemach partner. Brzi odaziv 24h.",
  keywords: [
    "montaža antena",
    "satelitske antene",
    "zemaljske antene",
    "videonadzor",
    "alarmi",
    "internet montaža",
    "Wi-Fi",
    "A1 podrška",
    "Telemach",
    "EON TV",
    "montaža televizora",
    "optika",
    "5G",
    "antenski sustavi",
    "servis antena",
    "Hrvatska",
  ],
  authors: [{ name: "AntenaPro" }],
  creator: "AntenaPro",
  publisher: "AntenaPro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AntenaPro - Profesionalna montaža antena, videonadzora i internet rješenja",
    description:
      "Stručna montaža zemaljskih i satelitskih antena, videonadzora, alarma, internet i Wi-Fi mreža. 20+ godina iskustva. Ovlašteni A1 i Telemach partner.",
    type: "website",
    locale: "hr_HR",
    siteName: "AntenaPro",
    url: "https://antenapro.hr",
    images: [
      {
        url: "/images/IMG_8108.JPG",
        width: 1200,
        height: 630,
        alt: "AntenaPro - Profesionalna montaža antena",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AntenaPro - Profesionalna montaža antena, videonadzora i internet rješenja",
    description:
      "Stručna montaža zemaljskih i satelitskih antena, videonadzora, alarma, internet i Wi-Fi mreža. 20+ godina iskustva.",
    images: ["/images/IMG_8108.JPG"],
  },
  alternates: {
    canonical: "https://antenapro.hr",
  },
  other: {
    "geo.region": "HR",
    "geo.placename": "Hrvatska",
    language: "Croatian",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
