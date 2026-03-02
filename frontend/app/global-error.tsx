"use client";

import { useEffect, useState } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <html>
            <body>
                <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
                    <h2 style={{ color: "red" }}>Nešto je pošlo po zlu (Global Error)</h2>
                    {mounted && (
                        <pre
                            style={{
                                background: "#f4f4f4",
                                padding: "1rem",
                                overflow: "auto",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-all"
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
