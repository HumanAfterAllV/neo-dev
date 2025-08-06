/**
 ** FooterEmail.tsx
 ** Componente para el formulario de correo electrónico en el pie de página.
 ** Permite a los usuarios ingresar su correo electrónico y enviarlo.
 ** Utiliza el estado local para manejar el resultado del envío.
 ** 
 */

"use client";

import { useState } from "react";

export default function FooterEmail(): React.JSX.Element {

    const [result, setResult] = useState<string>("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setResult("Sending...");

        const formData = new FormData(e.currentTarget);

        formData.append("access_key", process.env.EMAIL_API_KEY || "");

        const objectData = Object.fromEntries(formData);
        const json = JSON.stringify(objectData);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: json,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }

            });
            
            const data = await response.json();
            if (data.success) {
                setResult("Email sent successfully!");
                e.currentTarget.reset();
            } else {
                setResult("Failed to send email.");
            }
        } 
        catch (error) {
            setResult("Error sending email");
        }
    }

    return (
        <div className="footer-top">
            <div className="footer-col">
                <p className="mono"><span>&#9654;</span> Pon tu email aquí para ponerme en contacto contigo</p>
                <div className="footer-email-container">
                   <div className="footer-email-row">
                        <input type="text" placeholder="your@email.com" />
                        <button>
                        <img src="/global/footer-right-arrow.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="footer-col"></div>
        </div>
    )
}