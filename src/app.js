import express from 'express'
import session from 'express-session'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import SwaggerUiExpress from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import config from './config/config.js'
import chatSocket from './services/chatSocket.service.js'
import sessionRouter from './routes/api/session.router.js'
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import usersRouter from './routes/api/users.router.js'
import viewsRouter from './routes/views.js'
import mockRouter from './routes/mock.router.js'
import initializePassport from './config/passport.config.js'
import errorHandler from './middleware/errors/index.js'

import { addLogger } from './logger.js'

const PORT = config.port
const app = express()
const httpServer = app.listen(PORT, () => {
    console.log(`Server's up and running on port ${PORT}`)
})
const socketServer = new Server(httpServer)
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Documentacion del servidor - Cárcamo Mariano",
            description: "API pensada para el manejo elemental de un sitio web de E-commerce"
        }
    },
    apis: [`src/docs/**/*.yaml`]
}
const specs = swaggerJsdoc(swaggerOptions)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.set('socketServer', socketServer)
app.use(express.static(__dirname + '/public/'))

mongoose
    .connect(config.mongoUrl)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error('Error en la conexion', error))

app.use(
    session({
        secret: config.secret,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: config.mongoUrl }),
    })
)

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(addLogger)

app.use('/apidocs',SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs))
app.use('/api/sessions', sessionRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/mockingproducts', mockRouter)
app.use('/', viewsRouter)
app.use('/loggertest', (req, res) => {
    req.logger.debug('DEBUG')
    req.logger.http('HTTP')
    req.logger.info('INFO')
    req.logger.warning('WARNING')
    req.logger.error('ERROR')
    req.logger.fatal('FATAL')
    res.send({ message: 'Prueba de Logger' })
})

chatSocket(socketServer)
