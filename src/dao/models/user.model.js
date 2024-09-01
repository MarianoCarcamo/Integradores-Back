import mongoose from 'mongoose'

const userCollection = 'Users'

const document = new mongoose.Schema({
    name: String,
    reference: String
})

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    rol: { type: String, default: 'user' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    documents: { type: [document], default: [] },
    last_connection: Date
})

const firstCollection = mongoose.model(userCollection, userSchema)

export default firstCollection
