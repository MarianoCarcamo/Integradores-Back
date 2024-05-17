import productModel from "../models/product.model.js"

const productNotFound = new Error('Producto no encontrado')

class ProductManager {

    async addProduct(product) {
        try {  
            if (!this.isProductValid(product)) {
                throw new Error('Producto invalido')
            } else if (await this.isCodeDuplicate(product.code)) {
                throw new Error(
                    `El código del producto "${product.title}" ya está en uso`
                )
            } else {
                await productModel.create(product)
            }
        } catch (error) {
            throw error
        }
    }

    async getProducts() {
        try {
            return await productModel.find().lean()
        } catch (error) {
            throw error
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById({_id:id})
            if (product) {
                return product
            } else {
                throw productNotFound
            }
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const product = await productModel.findByIdAndDelete({_id:id})
            if (!product) {
                throw productNotFound
            }
        } catch (error) {
            throw error
        }
    }

    async upDateProduct(id, producto) {
        try {
            if (producto.id !== undefined){
                throw new Error('No se permite actualizar el id')
            }
            let updated_product = this.updateByField( await productModel.findById({_id:id}), producto)
            await productModel.updateOne({_id: id}, updated_product)
        } catch (error) {
            throw error
        }
    }

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.code &&
            product.price &&
            product.category &&
            product.stock !== undefined
        )
    }

    async isCodeDuplicate(code) {
        const products = await productModel.find()
        return products.some((product) => product.code === code)
    }

    updateByField(product, updatedProduct) {
        for (const key of Object.keys(updatedProduct)) {
            product[key] = updatedProduct[key]
        }
        return product
    }
}

export default ProductManager
