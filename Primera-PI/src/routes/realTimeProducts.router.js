import express from 'express'
import ProductManager from '../dao/mongoDB/productManager.js'

const router = express.Router()
const productManager = new ProductManager()

router.get('/', (req,res) => {
        const socketServer = req.app.get('socketServer')
        socketServer.on('connection', socket => {
                console.log("Cliente conectado")
                productManager.getProducts().then( products =>{
                        socket.emit('products', products)
                })
        })
        res.render('realTimeProducts',{})
})

function productsListUpdate(req,res){
        const socketServer = req.app.get('socketServer')
        productManager.getProducts().then( products =>{
                socketServer.emit('products', products)
        })
}
export {productsListUpdate}
export default router