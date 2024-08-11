import nodeMailer from 'nodemailer'
import config from '../config/config.js'

//Agregar conexion con el sericio de correo electrónico
const transport = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.email,
        pass: config.emailPassword,
    },
})

export async function sendTicket(ticket) {
    await transport.sendMail({
        from: config.email,
        to: ticket.purchaser,
        subject: 'Confirmacion de compra',
        html: `
        <div>
            <h1>Gracias por su compra</h1>
            <div>
                <h2>Monto abonado: $${ticket.amount}</h2>
            </div>
        </div>
        `,
        attachments: [],
    })
}

export async function sendRecovery(clientEmail) {
    await transport.sendMail({
        from: config.email,
        to: clientEmail,
        subject: 'Mail de restablecimiento de contraseña',
        html: `
        <h3>Haga click <a href="http://localhost:${config.port}/recovery-password">aquí</a> para restablecer su contraseña</h3>
        `,
        attachments: [],
    })
}
