"use client";

import { useState, useEffect, FormEvent, useCallback, useRef } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

// Client-only wrapper for ReCAPTCHA to avoid SSR hydration mismatches
const ClientRecaptcha = ({ recaptchaRef }: { recaptchaRef: any }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div style={{ minHeight: "78px" }} />;

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
    />
  );
};

// SVG Icons
const IconAntenna = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10a7.31 7.31 0 0 0 10 10Z" /><path d="m9 15 3-3" /><path d="M17 13a6 6 0 0 0-6-6" /><path d="M21 13A10 10 0 0 0 11 3" />
  </svg>
);
const IconCamera = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);
const IconWifi = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12" y2="20.01" />
  </svg>
);
const IconTV = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" />
  </svg>
);
const IconPlayCircle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSupport = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const PROJECT_PHOTOS = [
  { src: "/projects/1.JPG", alt: "Završeni projekt montaže antene 1" },
  { src: "/projects/2.png", alt: "Završeni projekt montaže antene 2" },
  { src: "/projects/3.png", alt: "Završeni projekt montaže antene 3" },
  { src: "/projects/4.png", alt: "Završeni projekt montaže antene 4" },
  { src: "/projects/5.JPG", alt: "Završeni projekt montaže antene 5" },
  { src: "/projects/6.png", alt: "Završeni projekt montaže antene 6" },
  { src: "/projects/7.png", alt: "Završeni projekt montaže antene 7" },
  { src: "/projects/8.png", alt: "Završeni projekt montaže antene 8" },
  { src: "/projects/9.JPG", alt: "Završeni projekt montaže antene 9" },
  { src: "/projects/10.JPG", alt: "Završeni projekt montaže antene 10" },
  { src: "/projects/11.JPG", alt: "Završeni projekt montaže antene 11" },
  { src: "/projects/12.png", alt: "Završeni projekt montaže antene 12" },
  { src: "/projects/13.JPG", alt: "Završeni projekt montaže antene 13" },
  { src: "/projects/14.png", alt: "Završeni projekt montaže antene 14" },
  { src: "/projects/15.png", alt: "Završeni projekt montaže antene 15" },
  { src: "/projects/16.JPG", alt: "Završeni projekt montaže antene 16" },
  { src: "/projects/17.JPG", alt: "Završeni projekt montaže antene 17" },
  { src: "/projects/18.JPG", alt: "Završeni projekt montaže antene 18" },
  { src: "/projects/19.JPG", alt: "Završeni projekt montaže antene 19" },
  { src: "/projects/20.JPG", alt: "Završeni projekt montaže antene 20" },
  { src: "/projects/21.JPG", alt: "Završeni projekt montaže antene 21" },
  { src: "/projects/22.JPG", alt: "Završeni projekt montaže antene 22" },
  { src: "/projects/23.JPG", alt: "Završeni projekt montaže antene 23" },
  { src: "/projects/24.JPG", alt: "Završeni projekt montaže antene 24" },
  { src: "/projects/25.JPG", alt: "Završeni projekt montaže antene 25" },
  { src: "/projects/26.JPG", alt: "Završeni projekt montaže antene 26" },
  { src: "/projects/27.JPG", alt: "Završeni projekt montaže antene 27" },
  { src: "/projects/28.JPG", alt: "Završeni projekt montaže antene 28" },
  { src: "/projects/29.JPG", alt: "Završeni projekt montaže antene 29" },
];



export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const recaptchaRef = useRef<any>(null);

  const [formState, setFormState] = useState({
    ime: "", prezime: "", email: "", telefon: "", poruka: ""
  });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // UX States
  const [formSuccess, setFormSuccess] = useState(false);

  const swipeRef = useRef({ startX: null as number | null, endX: null as number | null, isDragging: false, moved: false });

  const prevImage = useCallback(() => {
    setCurrentImgIndex((prev) => (prev === 0 ? PROJECT_PHOTOS.length - 1 : prev - 1));
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImgIndex((prev) => (prev === PROJECT_PHOTOS.length - 1 ? 0 : prev + 1));
  }, []);

  // Scroll listeners & Intersection Observer for animations
  useEffect(() => {
    // Optional placeholder if future scroll logic is needed
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!viewerOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setViewerOpen(false);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        prevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        nextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [viewerOpen, prevImage, nextImage]);

  const handlePointerDown = (e: React.PointerEvent) => {
    swipeRef.current = { startX: e.clientX, endX: null, isDragging: true, moved: false };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (swipeRef.current.isDragging) {
      swipeRef.current.endX = e.clientX;
      if (swipeRef.current.startX !== null && Math.abs(swipeRef.current.startX - e.clientX) > 10) {
        swipeRef.current.moved = true;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const { startX, endX, moved } = swipeRef.current;

    // reset tracking instantly to prevent side-effects
    swipeRef.current = { startX: null, endX: null, isDragging: false, moved: false };

    const isClick = !moved;

    if (isClick && e.target === e.currentTarget) {
      setViewerOpen(false);
      return;
    }

    if (startX !== null && endX !== null && !isClick) {
      const distance = startX - endX;
      if (distance > 50) nextImage();
      else if (distance < -50) prevImage();
    }
  };

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("antenapro-theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "");
      localStorage.setItem("antenapro-theme", next ? "dark" : "light");
      return next;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    // reCAPTCHA verification step
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setResult({ type: "error", msg: "Molimo potvrdite da niste robot." });
      setSending(false);
      return;
    }

    try {
      const verifyRes = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        setResult({ type: "error", msg: "Bot provjera nije prošla. Molimo pokušajte ponovo." });
        setSending(false);
        recaptchaRef.current?.reset();
        return;
      }

      // If reCAPTCHA passed, proceed with sending the actual form
      const formData = {
        _subject: `Novi upit s weba – ${formState.ime} ${formState.prezime}`,
        _replyto: formState.email,
        Ime: formState.ime,
        Prezime: formState.prezime,
        Email: formState.email,
        Telefon: formState.telefon || "Nije uneseno",
        Poruka: formState.poruka
      };

      const formResp = await fetch("https://formsubmit.co/ajax/antenaproivan@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (formResp.ok) {
        setFormSuccess(true);
        setFormState({ ime: "", prezime: "", email: "", telefon: "", poruka: "" });
        recaptchaRef.current?.reset();
      } else {
        setResult({ type: "error", msg: "Došlo je do greške. Pokušajte ponovno." });
        recaptchaRef.current?.reset();
      }
    } catch (err) {
      setResult({ type: "error", msg: "Greška prilikom slanja. Pokušajte ponovno." });
      recaptchaRef.current?.reset();
    } finally {
      setSending(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AntenaPro",
    image: "/images/IMG_8108.JPG",
    description:
      "Stručna montaža zemaljskih, satelitskih i starlink antena, videonadzora, alarma, internet i Wi-Fi mreža. 20+ godina iskustva. Brzi odaziv 24h.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "HR",
    },
    telephone: "+385993330036",
    url: "https://antenapro.hr",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "15",
    },
    serviceArea: [
      {
        "@type": "City",
        name: "Zagreb"
      },
      {
        "@type": "AdministrativeArea",
        name: "Krapinsko-zagorska županija"
      },
      {
        "@type": "AdministrativeArea",
        name: "Zadarska županija"
      },
      {
        "@type": "Country",
        name: "Hrvatska"
      }
    ],
    areaServed: ["Zagreb", "Krapinsko-zagorska županija", "Zadarska županija", "Hrvatska"],
    openingHours: "Mo-Sa 08:00-20:00",
    sameAs: [
      "https://www.facebook.com/antenaproshop/",
      "https://www.instagram.com/antenapro/",
      "https://www.tiktok.com/@antenapro/",
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#" className="logo">
            <img
              src={!mounted || !dark
                ? "/images/logo-white.png"
                : "/images/logo.png"
              }
              alt="AntenaPro logo"
            />
            AntenaPro
          </a>
          <ul className={`nav-links${menuOpen ? " open" : ""}`}>
            <li><a href="#usluge" onClick={() => setMenuOpen(false)}>Usluge</a></li>
            <li><a href="#o-nama" onClick={() => setMenuOpen(false)}>O nama</a></li>
            <li><a href="#projekti" onClick={() => setMenuOpen(false)}>Projekti</a></li>
            <li><a href="#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</a></li>
          </ul>
          <div className="nav-right">
            <button className="theme-btn" onClick={toggleTheme} aria-label="Promijeni temu">
              {mounted && dark ? <IconSun /> : <IconMoon />}
            </button>
            <button className="hamburger" onClick={() => setMenuOpen((m) => !m)} aria-label="Izbornik">
              {menuOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero reveal" id="hero">
          <div className="hero-bg">
            <Image
              src="/images/IMG_8108.JPG"
              alt="Montaža antena i videonadzora"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', filter: 'brightness(0.35)', transform: 'scaleX(-1)' }}
            />
          </div>
          <div className="hero-content">
            <div className="badge reveal reveal-delay-1">
              <span className="badge-dot" />
              Ovlašteni zastupnik A1 &amp; Telemach
            </div>
            <h1 className="reveal reveal-delay-2">Trebate <span>antenu</span>?</h1>
            <p className="reveal reveal-delay-2">Profesionalna montaža i servis antena, videonadzora, alarma i internet rješenja. Brzo, pouzdano, povoljno.</p>
            <div className="hero-buttons reveal reveal-delay-3">
              <a href="tel:+385993330036" className="btn-primary">
                <IconPhone /> 099 333 0036
              </a>
              <a href="#usluge" className="btn-secondary">
                Naše usluge <IconArrowRight />
              </a>
            </div>
            <div className="hero-stats reveal reveal-delay-3">
              <div className="stat-item">
                <div className="stat-num">20+</div>
                <div className="stat-label">Godina iskustva</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">2000+</div>
                <div className="stat-label">Zadovoljnih klijenata</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">24h</div>
                <div className="stat-label">Brzi odaziv</div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section" id="usluge">
          <div className="container">
            <div className="section-header">
              <h2>Naše usluge</h2>
              <p>Kompletna tehnička rješenja za vaš dom i poslovni prostor</p>
            </div>
            <div className="services-grid">
              {[
                { icon: <IconAntenna />, title: "Montaža antena", desc: "Profesionalna ugradnja zemaljskih i satelitskih antenskih sustava za savršen signal." },
                { icon: <IconCamera />, title: "Videonadzor i alarmi", desc: "Kompletna sigurnosna rješenja za vaš dom ili poslovni prostor." },
                { icon: <IconWifi />, title: "Internet i Wi-Fi", desc: "Montaža optike, Starlink internet, Wi-Fi mreža i 5G povezivosti." },
                { icon: <IconTV />, title: "Montaža televizora", desc: "Profesionalno postavljanje TV-a na zid s provlačenjem kablova." },
                { icon: <IconPlayCircle />, title: "EON TV podrška", desc: "Tehnička podrška za Telemach EON TV platformu." },
                { icon: <IconSupport />, title: "A1 podrška", desc: "Ovlašteni zastupnik za A1 tehničku podršku i usluge." },
              ].map((s, i) => (
                <div className="service-card" key={i}>
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O NAMA */}
        <section className="why-section" id="o-nama" style={{ padding: "5rem 0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="section-header">
              <h2>Zašto odabrati <span style={{ color: "var(--accent)" }}>AntenaPro</span>?</h2>
            </div>

            <div className="about-content" style={{ lineHeight: "1.8", color: "var(--text)", textAlign: "left", padding: "0 1rem" }}>
              <p style={{ marginBottom: "1.5rem" }}>
                <strong>AntenaPro</strong> je specijalizirana tvrtka za <strong>montažu i servis TV antena</strong>, <strong>satelitskih i zemaljskih sustava (DVB-T2)</strong>, te instalaciju modernih rješenja za <strong>internet</strong>, <strong>Wi-Fi mreže</strong> i <strong>Starlink sustave</strong>. Pružamo pouzdana tehnička rješenja za privatne i poslovne objekte, s naglaskom na kvalitetu izvedbe i dugoročnu stabilnost signala.
              </p>

              <p style={{ fontWeight: "600", marginBottom: "1rem" }}>Naše usluge uključuju:</p>

              <ul style={{ listStyleType: "none", padding: "0", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent)", marginTop: "4px", flexShrink: 0 }}><IconCheck /></span>
                  <span><strong>montažu i podešavanje TV antena i satelitskih antena</strong></span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent)", marginTop: "4px", flexShrink: 0 }}><IconCheck /></span>
                  <span><strong>montažu i konfiguraciju Starlink sustava</strong></span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent)", marginTop: "4px", flexShrink: 0 }}><IconCheck /></span>
                  <span><strong>instalaciju optičkog interneta i Wi-Fi mreža</strong></span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent)", marginTop: "4px", flexShrink: 0 }}><IconCheck /></span>
                  <span><strong>ugradnju videonadzora i alarmnih sustava</strong></span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent)", marginTop: "4px", flexShrink: 0 }}><IconCheck /></span>
                  <span><strong>montažu televizora</strong> i multimedijskih sustava</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent)", marginTop: "4px", flexShrink: 0 }}><IconCheck /></span>
                  <span><strong>servis antena</strong> i tehničko održavanje sustava</span>
                </li>
              </ul>

              <p style={{ marginBottom: "1.5rem" }}>
                Svaki projekt započinjemo stručnom procjenom lokacije kako bismo osigurali maksimalnu jačinu i stabilnost signala, sigurnost sustava i profesionalnu izvedbu instalacije.
              </p>

              <p style={{ marginBottom: "1rem" }}>
                AntenaPro je pouzdan partner za <strong>antenske sustave</strong>, <strong>Starlink instalacije</strong>, <strong>videonadzor</strong> i internetsku infrastrukturu — rješenja koja osiguravaju stabilnu povezanost bez kompromisa.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="projects-section" id="projekti">
          <div className="container">
            <div className="section-header">
              <h2>Naši projekti</h2>
              <p>Pogledajte primjere naših uspješno realiziranih projekata</p>
            </div>
          </div>
          <div
            style={{ position: "relative", width: "100%", overflow: "hidden", paddingBottom: "3rem" }}
            onClickCapture={(e) => {
              const slider = e.currentTarget.querySelector('[data-slider-track]') as HTMLElement;
              if (slider && slider.dataset.moved === "true") {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
            onMouseDown={(e) => {
              const slider = e.currentTarget.querySelector('[data-slider-track]') as HTMLElement;
              if (!slider) return;
              slider.dataset.dragging = "true";
              slider.dataset.moved = "false";
              slider.dataset.startX = String(e.pageX - slider.offsetLeft);
              slider.dataset.scrollLeft = String(slider.scrollLeft);
              slider.style.cursor = "grabbing";
            }}
            onMouseMove={(e) => {
              const slider = e.currentTarget.querySelector('[data-slider-track]') as HTMLElement;
              if (!slider || slider.dataset.dragging !== "true") return;
              e.preventDefault();
              const x = e.pageX - slider.offsetLeft;
              const walk = (x - Number(slider.dataset.startX)) * 1.5;
              if (Math.abs(walk) > 5) slider.dataset.moved = "true";
              slider.scrollLeft = Number(slider.dataset.scrollLeft) - walk;
            }}
            onMouseUp={(e) => {
              const slider = e.currentTarget.querySelector('[data-slider-track]') as HTMLElement;
              if (!slider) return;
              slider.dataset.dragging = "false";
              slider.style.cursor = "grab";
            }}
            onMouseLeave={(e) => {
              const slider = e.currentTarget.querySelector('[data-slider-track]') as HTMLElement;
              if (!slider) return;
              slider.dataset.dragging = "false";
              slider.style.cursor = "grab";
            }}
          >
            <div
              data-slider-track=""
              style={{
                display: "flex",
                gap: "1rem",
                overflowX: "auto",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                padding: "0 1.5rem",
                userSelect: "none",
                cursor: "grab",
                msOverflowStyle: "none",
                scrollSnapType: "x mandatory",
              }}
            >
              {PROJECT_PHOTOS.map((p, i) => (
                <div
                  key={i}
                  onClick={() => { setCurrentImgIndex(i); setViewerOpen(true); }}
                  className="project-slider-item"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    scrollSnapAlign: "center",
                  }}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    draggable={false}
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      pointerEvents: "none",
                      display: "block",
                    }}
                    onMouseOver={(e: React.MouseEvent<HTMLImageElement>) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e: React.MouseEvent<HTMLImageElement>) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
              <button
                className="slider-arrow"
                aria-label="Prethodna slika"
                onClick={() => {
                  const track = document.querySelector('[data-slider-track]') as HTMLElement;
                  if (track && track.firstElementChild) {
                    const itemWidth = track.firstElementChild.getBoundingClientRect().width;
                    const gap = 16;
                    const snapWidth = itemWidth + gap;
                    const currentIndex = Math.round(track.scrollLeft / snapWidth);
                    track.scrollTo({ left: (currentIndex - 1) * snapWidth, behavior: 'smooth' });
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                className="slider-arrow"
                aria-label="Sljedeća slika"
                onClick={() => {
                  const track = document.querySelector('[data-slider-track]') as HTMLElement;
                  if (track && track.firstElementChild) {
                    const itemWidth = track.firstElementChild.getBoundingClientRect().width;
                    const gap = 16;
                    const snapWidth = itemWidth + gap;
                    const currentIndex = Math.round(track.scrollLeft / snapWidth);
                    track.scrollTo({ left: (currentIndex + 1) * snapWidth, behavior: 'smooth' });
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>AntenaPro — rješenje za signal koji traje.</h2>
            <p>Nazovite nas i dobit ćete besplatnu procjenu za vaš projekt.</p>
            <a href="tel:+385993330036" className="btn-white">
              <IconPhone /> 099 333 0036
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section" id="kontakt">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-info">
                <h2>Kontaktirajte nas</h2>
                <p>Javite nam se s vašim zahtjevom i odgovorit ćemo vam u najkraćem mogućem roku.</p>
                <div className="contact-items">
                  <div className="contact-item">
                    <div className="contact-item-icon"><IconPhone /></div>
                    <div>
                      <h4>Telefon</h4>
                      <a href="tel:+385993330036">099 333 0036</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item-icon"><IconMail /></div>
                    <div>
                      <h4>E-mail</h4>
                      <a href="mailto:info@antenapro.hr">info@antenapro.hr</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item-icon"><IconMapPin /></div>
                    <div>
                      <h4>Adresa</h4>
                      <a href="https://maps.google.com/?q=Banatska+ulica+38,+Zagreb" target="_blank" rel="noopener noreferrer">Banatska ulica 38, Zagreb</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item-icon"><IconClock /></div>
                    <div>
                      <h4>Radno vrijeme</h4>
                      <div style={{ color: "var(--text-muted)" }}>Pon – Pet: 08:00 – 18:00<br />Sub: 08:00 – 12:00</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Ovlašteni partner</p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ padding: "0.5rem 1rem", background: "var(--bg)", borderRadius: "8px", fontWeight: "bold" }}>A1</div>
                    <div style={{ padding: "0.5rem 1rem", background: "var(--bg)", borderRadius: "8px", fontWeight: "bold" }}>Telemach</div>
                  </div>
                </div>
              </div>

              <div className="contact-form-card reveal reveal-delay-1">
                {formSuccess ? (
                  <div className="form-success">
                    <div className="success-icon">
                      <IconCheck />
                    </div>
                    <h4>Uspješno poslano!</h4>
                    <p>Hvala na upitu. Odgovorit ćemo Vam u najkraćem mogućem roku.</p>
                    <button onClick={() => setFormSuccess(false)} className="btn-form-reset">
                      Pošalji novu poruku
                    </button>
                  </div>
                ) : (
                  <>
                    <h3>Pošaljite upit</h3>
                    <form onSubmit={handleSubmit} id="contact-form" suppressHydrationWarning>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="ime">Ime *</label>
                          <input id="ime" name="ime" type="text" required placeholder="Ivan" value={formState.ime} onChange={handleChange} suppressHydrationWarning />
                        </div>
                        <div className="form-group">
                          <label htmlFor="prezime">Prezime *</label>
                          <input id="prezime" name="prezime" type="text" required placeholder="Horvat" value={formState.prezime} onChange={handleChange} suppressHydrationWarning />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="email">E-mail adresa *</label>
                          <input id="email" name="email" type="email" required placeholder="ivan@example.com" value={formState.email} onChange={handleChange} suppressHydrationWarning />
                        </div>
                        <div className="form-group">
                          <label htmlFor="telefon">Broj telefona</label>
                          <input id="telefon" name="telefon" type="tel" placeholder="+385 9x xxx xxxx" value={formState.telefon} onChange={handleChange} suppressHydrationWarning />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="poruka">Poruka *</label>
                        <textarea id="poruka" name="poruka" required placeholder="Opišite vaš zahtjev..." value={formState.poruka} onChange={handleChange} suppressHydrationWarning />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}>
                        <ClientRecaptcha recaptchaRef={recaptchaRef} />
                      </div>
                      <button type="submit" className="form-submit" disabled={sending}>
                        {sending ? "Slanje..." : <><IconSend /> Pošalji poruku</>}
                      </button>
                      {result && result.type === "error" && (
                        <div className="form-msg error">{result.msg}</div>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* GOOGLE REVIEWS */}
        <section className="reviews-section" id="recenzije">
          <div className="container">
            <div className="reviews-header">
              <div className="reviews-header-left">
                <div className="google-logo-text">
                  <svg height="24" viewBox="0 0 74 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4" />
                    <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335" />
                    <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.5 3.1 3.54 0 2.02-1.36 3.5-3.1 3.5z" fill="#4285F4" />
                    <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#FBBC05" />
                    <path d="M58 .24h2.51v17.57H58z" fill="#34A853" />
                    <path d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z" fill="#EA4335" />
                  </svg>
                  <span className="reviews-title">Reviews</span>
                </div>
                <div className="reviews-rating-row">
                  <span className="reviews-rating-num">4.8</span>
                  <div className="reviews-stars">
                    {"★★★★★".split("").map((s, i) => (
                      <span key={i} className={i < 5 ? "star-filled" : "star-empty"}>{s}</span>
                    ))}
                  </div>
                  <span className="reviews-count">(15)</span>
                </div>
              </div>
              <a
                href="https://reviewthis.biz/antenapro"
                target="_blank"
                rel="noopener noreferrer"
                className="review-btn"
              >
                Ocijeni nas
              </a>
            </div>


          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.5rem", marginTop: "1rem" }}>
          <a href="https://www.facebook.com/antenaproshop/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}>
            <img src="/icons/facebook.png" alt="AntenaPro Facebook" className="social-icon" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
          </a>
          <a href="https://www.instagram.com/antenapro/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}>
            <img src="/icons/instagram.png" alt="AntenaPro Instagram" className="social-icon" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
          </a>
          <a href="https://www.tiktok.com/@antenapro/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.8, transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}>
            <img src="/icons/tik-tok.png" alt="AntenaPro TikTok" className="social-icon" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
          </a>
        </div>
        <p>© {new Date().getFullYear()} AntenaPro. Sva prava pridržana.</p>
      </footer>

      {/* IMAGE VIEWER */}
      {viewerOpen && (
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.95)", zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column",
            touchAction: "none"
          }}
        >
          <button
            onClick={() => setViewerOpen(false)}
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "white", cursor: "pointer", padding: "10px", zIndex: 10000 }}
          >
            <IconX />
          </button>

          <button
            onClick={prevImage}
            style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "white", cursor: "pointer", padding: "12px", borderRadius: "50%", zIndex: 10000 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <img
            src={PROJECT_PHOTOS[currentImgIndex].src}
            alt={PROJECT_PHOTOS[currentImgIndex].alt}
            draggable={false}
            style={{ maxWidth: "85vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "8px", pointerEvents: "none" }}
          />

          <button
            onClick={nextImage}
            style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "white", cursor: "pointer", padding: "12px", borderRadius: "50%", zIndex: 10000 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          <div style={{ position: "absolute", bottom: 20, color: "white", fontSize: "14px" }}>
            {currentImgIndex + 1} / {PROJECT_PHOTOS.length}
          </div>
        </div>
      )}
    </>
  );
}
