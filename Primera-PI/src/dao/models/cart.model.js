import mongoose from "mongoose"

//Crea la coleccion con el nombre 
const cartCollection = "carts"

//Declara el esquema
const cartSchema = new mongoose.Schema({
    "products": [{
        "product": Number,
        "quantity": Number
    }]
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel
