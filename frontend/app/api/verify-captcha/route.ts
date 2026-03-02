import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({ success: false, error: "No token provided" }, { status: 400 });
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        if (!secretKey) {
            console.warn("RECAPTCHA_SECRET_KEY is not set in environment variables");
            // If the user hasn't set up the key yet, we'll let it pass so the form isn't completely broken, 
            // but warn them in the console. Remove this bypass in production once keys are set.
            return NextResponse.json({ success: true, warning: "Bypassed verification (No secret key set)" });
        }

        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

        const response = await fetch(verifyUrl, {
            method: "POST",
        });

        const data = await response.json();

        if (data.success && data.score >= 0.5) {
            return NextResponse.json({ success: true, score: data.score });
        } else {
            console.error("reCAPTCHA failed:", data);
            return NextResponse.json({ success: false, error: "reCAPTCHA verification failed" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error verifying reCAPTCHA:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
