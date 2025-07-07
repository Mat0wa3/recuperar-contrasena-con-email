export function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email, code) {
    const { data, error } = await resend.emails.send({
        from: 'Mateo <noreply@resend.dev>',
        to: [email],
        subject: 'Código de verificación',
        html: `
            <h1>Verificación de cuenta</h1>
            <p>Tu código de verificación es: <strong>${code}</strong></p>
            <p>Por favor, ingresa este código en la aplicación para completar el registro.</p>
        `
    })

    if (error) {
        console.error("Error al enviar el correo de verificación:", error)
        throw new Error("Error al enviar el correo de verificación")
    }
}   