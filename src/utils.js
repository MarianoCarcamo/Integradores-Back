import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcryptjs'
import {faker} from '@faker-js/faker'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password)

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.commerce.isbn(),
        price: faker.number.float({min:100, max: 99999, fractionDigits:2}),
        status: true,
        stock: faker.number.int({max: 999}),
        category: faker.commerce.productAdjective(),
        thumbnail: [faker.image.urlLoremFlickr({ width:320 , height:240 , category: 'food'})],
    }
}

export default __dirname
