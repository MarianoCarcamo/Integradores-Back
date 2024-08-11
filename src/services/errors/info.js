export const generateUserErrorInfo = (user) => {
    return `Una o mas propiedades estan incompletas o son inválidas.
    Propiedades requeridas:
        * first_name: Debe ser un string, se recibio ${user.first_name}
        * last_name: Debe ser un string, se recibio ${user.last_name}
        * email: Debe ser un string, se recibio ${user.email}
        * age: Debe ser tipo Number, se recibio ${user.age}
        * password: Debe ser tipo String, se recibio ${user.password} [Hasheada]`
}

export const generateProductErrorInfo = (product) => {
    return `Una o mas propiedades estan incompletas o son inválidas.
    Propiedades requeridas:
        * title: Debe ser un string, se recibio ${product.title} (obligatorio)
        * description: Debe ser un string, se recibio ${product.description} (obligatorio)
        * code: Debe ser un string, se recibio ${product.code} (obligatorio)
        * price: Debe ser tipo Number, se recibio ${product.price} (obligatorio)
        * status: Debe ser tipo booleano, se recibio ${product.status} (opcional, valor por defecto "true")
        * stock: Debe ser tipo Number, se recibio ${product.stock} (obligatorio)
        * category: Debe se un string, se recibio ${product.category} (obligatorio)
        * thumbnail: Debe ser un array de strings, se recibio ${product.thumbnail} (opcional, valor por defecto "[]")`
        
}