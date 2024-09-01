import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcryptjs'
import {faker} from '@faker-js/faker'
import multer from 'multer'
import fs from 'fs'

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

if (!fs.existsSync(__dirname+'/documents')){
    fs.mkdirSync(__dirname+'/documents');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,__dirname+'/documents')
    },
    filename: function( req, file, cb){
        const uid = req.session.user._id
        const originalName = file.originalname
        cb(null,`${uid}-${originalName}`)
    }
})

export const uploader = multer({storage})

export default __dirname
