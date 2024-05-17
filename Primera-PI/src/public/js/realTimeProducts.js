const socket  = io()
const productsContainer = document.getElementById('productsContainer')

socket.on('products', products =>{
    productsContainer.innerHTML = ""
    products.forEach(product => {
        productsContainer.innerHTML = productsContainer.innerHTML + `
            <h2>${product.title}</h2>
            <div>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
            </div>
        `
    });
})
