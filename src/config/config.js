import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program.option('--mode <mode>', 'Modo de trabajo', 'prod')
program.parse()

//Solo tengo un entorno de trabajo
dotenv.config({
    path: program.opts().mode === 'dev' ? './.env' : './.env',
})

//Se verifica el "cambio de entorno" por consola
program.opts().mode === 'dev'
    ? console.log('ENTORNO DE DESARROLLO')
    : console.log('ENTORNO DE PRODUCCION')

export default {
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT,
    secret: process.env.SECRET,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    email: process.env.EMAIL,
    emailPassword: process.env.EMAIL_PASSWORD,
}
