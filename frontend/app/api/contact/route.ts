import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ime, prezime, email, telefon, poruka } = await req.json();

    if (!ime || !prezime || !email || !poruka) {
      return NextResponse.json(
        { error: "Molimo ispunite sva obavezna polja." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `Novi upit – ${ime} ${prezime}`,
        from_name: `${ime} ${prezime}`,
        replyto: email,
        ime,
        prezime,
        email,
        telefon: telefon || "Nije uneseno",
        poruka,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ ok: true });
    } else {
      console.error("Web3Forms error:", data);
      return NextResponse.json(
        { error: "Greška pri slanju. Molimo pokušajte ponovo." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Greška pri slanju e-maila. Molimo pokušajte ponovo." },
      { status: 500 }
    );
  }
}
