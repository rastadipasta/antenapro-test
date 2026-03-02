"use client";

import { useEffect, useState } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Log the error to an error reporting service
        console.error("Local Error boundary caught:", error);
    }, [error]);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", background: "#fee2e2", minHeight: "100vh" }}>
            <h2 style={{ color: "red" }}>Dogodila se greška prilikom učitavanja (Route Error)</h2>
            {mounted && (
                <pre
                    style={{
                        background: "#fff",
                        padding: "1rem",
                        overflow: "auto",
                        borderRadius: "5px",
                        border: "1px solid #fca5a5",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                        margin: "1rem 0"
                    }}
                >
                    {error.message}
                    {"\n\n"}
                    {error.stack}
                </pre>
            )}
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
