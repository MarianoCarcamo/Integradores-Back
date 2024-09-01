import {expect} from 'chai'
import supertest from 'supertest'

const requester = supertest('http://localhost:8080')

describe('Testing Server de ecommerce - Cárcamo Mariano', () => {
    describe('Test de usuario regular', () => {
        let cookie
        let mockUser = {
            first_name: "Nombre_Test_1",
            last_name: "Apellido_test_1",
            email: "email@test.com",
            age: "45",
            password: "Test",
            cartId: "66c4f92d5896c18fe02a1831",
            productId: "664e8085254b30f2090406e2"
        }

        it('Debe loguear correctamente a un usuario y devolver una cookie', async () => {
            const result = await requester.post('/api/sessions/login').send({email:mockUser.email, password: mockUser.password})
            let cookieResult = result.headers['set-cookie'][0]
            expect(cookieResult).to.be.ok
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }
            expect(cookie.name).to.be.equal('connect.sid')
            expect(cookie.value).to.be.ok
        })

        it('Debe enviar la cookie que contiene al usuario e identificar el mismo por /api/sessions/current', async () => {
            const {_body} = await requester.get('/api/sessions/current').set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(_body.first_name).to.be.equal(mockUser.first_name)
        })

        it('Debe obtener lo productos de la base de datos - SIN QUERY', async () => {
            const { statusCode, _body} = await requester.get('/api/products').set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(_body).to.be.ok
            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.be.an('Array').lengthOf(10)
            expect(_body.status).to.be.equal('success')
        })

        it('Debe obtener lo productos de la base de datos - CON QUERY LIMIT = 2', async () => {
            const { statusCode, _body} = await requester.get('/api/products?limit=2').set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(_body).to.be.ok
            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.be.an('Array').lengthOf(2)
            expect(_body.status).to.be.equal('success')
        })

        it('Debe obtener los productos del carrito - debe ser un array vacio', async () => {
            const { _body } = await requester.get(`/api/carts/${mockUser.cartId}`).set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(_body).to.be.an('array').lengthOf(0)
        })

        it('Debe agregar un producto al carrito', async () => {
            const { statusCode } = await requester.post(`/api/carts/${mockUser.cartId}/product/${mockUser.productId}`).set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(statusCode).to.be.not.equal(400)
        })

        it('Debe obtener los productos del carrito - debe ser un array de un unico elemento', async () => {
            const { _body } = await requester.get(`/api/carts/${mockUser.cartId}`).set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(_body).to.be.an('array').lengthOf(1)
        })

        it('Debe eliminar un producto al carrito', async () => {
            const { _body } = await requester.delete(`/api/carts/${mockUser.cartId}/product/${mockUser.productId}`).set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(_body.status).to.be.equal('success')
        })
        
        it('Debe realizar el logout correctamente', async () => {
            const {statusCode} = await requester.post('/api/sessions/logout').set('Cookie',[`${cookie.name}=${cookie.value}`])
            expect(statusCode).to.be.not.eql(500)
        })
    })
});
