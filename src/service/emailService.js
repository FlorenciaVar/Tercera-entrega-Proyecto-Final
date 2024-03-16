import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "pruebamenichini@gmail.com",
        pass: process.env.EMAIL_PASS,
        authMethod: 'LOGIN'
    }
});

export const sendResetMail = async (token, email) => {
    try {
        await transporter.sendMail({
            from: 'pruebamenichini@gmail.com',
            to: email,
            subject: "Cervecería Menichini - Recuperación de contraseña",
            html: `
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="http://localhost:3000/resetpassword?token=${token}">Restablecer contraseña</a>
            `,
            attachments: []
        })
    } catch (error) {
        throw error
    }
}