"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Local Error boundary caught:", error);
    }, [error]);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", background: "#fee2e2", minHeight: "100vh" }}>
            <h2 style={{ color: "red" }}>Dogodila se greška prilikom učitavanja (Route Error)</h2>
            <p style={{ marginTop: "1rem", color: "#7f1d1d" }}>Pokušajte ponovno. Ako se problem ponovi, kontaktirajte nas telefonom.</p>
            <button
                style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    background: "#dc2626",
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
    );
}
