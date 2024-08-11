import { Router } from "express"
import { generateProduct } from "../utils.js"

const router = Router()

router.get('/', (req, res) => {
    let products = []
    try {
        for(let i = 0 ; i < 100 ; i++ ){
            products.push( generateProduct() )
        }
        res.send({status: "Success", payload: products})
    } catch (error) {
        res.send({status: "error", error})
    }
})

export default router