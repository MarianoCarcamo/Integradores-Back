import express from 'express'
import ProductManager from '../dao/mongoDB/productManager.js'
import {productsListUpdate} from './realTimeProducts.router.js' // Funcion para actualizar la lista de la vista realTimeProducts utilizando webSocket

const router = express.Router()

const productManager = new ProductManager()

// FUNCIONES
async function getProducts(quantity) {
    if (quantity) {
        return (await productManager.getProducts()).slice(0, quantity)
    } else {
        return await productManager.getProducts()
    }
}

// ENDPOINTS
router.get('/', (req, res) => {
    const { limit } = req.query
    getProducts(limit).then((products) => {
        res.send(products)
    })
})

router.get('/:idProduct', (req, res) => {
    const pid = req.params.idProduct
    productManager
        .getProductById(pid)
        .then((product) => res.send(product))
        .catch((error) => {
            res.status(404).json({
                ERROR: `${error.message}`,
            })
        })
})

router.post('/', (req, res) => {
    const newProduct = req.body
    productManager
        .addProduct(newProduct)
        .then((result) => {
            res.send({result: "succes", payload: result})
            productsListUpdate(req,res)
        })
        .catch((error) => {
            res.status(400).json({ ERROR: `${error.message}` })
        })
})

router.put('/:productId', (req, res) => {
    const id = req.params.productId
    const updatedProduct = req.body
    productManager
        .upDateProduct(id, updatedProduct)
        .then(() => {
            res.json({ message: 'Producto actualizado con exito' })
            productsListUpdate(req,res)
        })
        .catch((error) => res.status(400).json({ ERROR: `${error.message}` }))
})

router.delete('/:productId', (req, res) => {
    const id = req.params.productId
    productManager
        .deleteProduct(id)
        .then(() => {
            res.json({ message: 'Producto eliminado con exito' })
            productsListUpdate(req,res)
        })
        .catch((error) => {
            res.status(404).json({ ERROR: `${(error, message)}` })
        })
})

export default router
