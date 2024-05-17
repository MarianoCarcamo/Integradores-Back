import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import indexRouter from './routes/index.router.js'
import realTimeProductsRouter from './routes/realTimeProducts.router.js'

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Server's up and running on port ${PORT}`))
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.set('socketServer', socketServer)
app.use(express.static(__dirname + '/public/'))

mongoose.connect("mongodb+srv://Mariano:123321@cluster0.jjfvoiv.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("Conectado a la base de datos"))
.catch(error => console.error("Error en la conexion", error))

app.use('/', indexRouter)
app.use('/realTimeProducts', realTimeProductsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
