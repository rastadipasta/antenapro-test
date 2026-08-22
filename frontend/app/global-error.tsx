"use client";

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
                    <h2 style={{ color: "red" }}>Nešto je pošlo po zlu (Global Error)</h2>
                    <p style={{ marginTop: "1rem" }}>Pokušajte ponovno. Ako se problem nastavi, javite nam se telefonom.</p>
                    <button
                        style={{
                            marginTop: "1rem",
                            padding: "0.5rem 1rem",
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                        onClick={() => reset()}
                    >
                        Pokušaj ponovno
                    </button>
                </div>
            </body>
        </html>
    );
}
