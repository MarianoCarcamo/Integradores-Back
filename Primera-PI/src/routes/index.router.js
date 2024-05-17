import express from 'express'
import ProductManager from '../dao/mongoDB/productManager.js'

const router = express.Router()
const productManager = new ProductManager()

router.get('/', (req,res) => {
    productManager.getProducts().then( products => {
        res.render('index',{products: products})
    })
})
export default router