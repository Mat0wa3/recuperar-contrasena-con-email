export function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000)
}

import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email, code, message) {
    const { data, error } = await resend.emails.send({
        from: 'Mateo <noreply@resend.dev>',
        to: [email],
        subject: 'Código de verificación',
        html: `
            <h1>Verificación de cuenta</h1>
            <p>Tu código de verificación es: <strong>${code}</strong></p>
            <p>${message}</p>
        `
    })

    if (error) {
        console.error("Error al enviar el correo de verificación:", error)
        throw new Error("Error al enviar el correo de verificación")
    }
}   