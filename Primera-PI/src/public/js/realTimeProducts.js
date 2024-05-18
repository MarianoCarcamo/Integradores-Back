const socket  = io()
const productsContainer = document.getElementById('productsContainer')

socket.on('products', products =>{
    productsContainer.innerHTML = ""
    products.forEach(product => {
        productsContainer.innerHTML = productsContainer.innerHTML + `
            <div class="col card m-3" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${product.title}</h5>
                    <p class="card-text fw-semibold">${product.description}</p>
                    <p class="card-text">Precio: $${product.price}</p>
                    <p class="card-text">Stock: ${product.stock}</p>
                </div>
            </div>
        `
    });
})
