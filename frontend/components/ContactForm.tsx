"use client";

import { FormEvent, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setMessage(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const token = captchaRef.current?.getValue();
    if (!token) {
      setMessage({ type: "error", text: "Molimo potvrdite da niste robot." });
      setSending(false);
      return;
    }

    try {
      const verify = await fetch("/api/verify-captcha", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
      const verified = await verify.json();
      if (!verified.success) throw new Error("Bot provjera nije prošla.");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ime: data.get("ime"), prezime: data.get("prezime"), email: data.get("email"), telefon: data.get("telefon"), poruka: data.get("poruka") }),
      });
      if (!response.ok) throw new Error("Poruka nije poslana. Pokušajte ponovno ili nas nazovite.");
      form.reset();
      captchaRef.current?.reset();
      setMessage({ type: "success", text: "Hvala! Vaš upit je poslan. Javit ćemo se u najkraćem roku." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Došlo je do pogreške." });
      captchaRef.current?.reset();
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-pair">
        <label>Ime<input name="ime" autoComplete="given-name" required placeholder="Ivan" /></label>
        <label>Prezime<input name="prezime" autoComplete="family-name" required placeholder="Horvat" /></label>
      </div>
      <div className="form-pair">
        <label>E-mail<input name="email" type="email" autoComplete="email" required placeholder="ivan@email.hr" /></label>
        <label>Telefon<input name="telefon" type="tel" autoComplete="tel" placeholder="09x xxx xxxx" /></label>
      </div>
      <label>Kako vam možemo pomoći?<textarea name="poruka" required rows={6} placeholder="Ukratko opišite lokaciju i potrebnu uslugu..." /></label>
      <div className="captcha-wrap"><ReCAPTCHA ref={captchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} /></div>
      <button className="button button-primary form-submit" disabled={sending}>{sending ? "Slanje…" : "Pošalji upit"}<span aria-hidden="true">↗</span></button>
      {message && <p className={`form-status ${message.type}`} role="status">{message.text}</p>}
    </form>
  );
}
