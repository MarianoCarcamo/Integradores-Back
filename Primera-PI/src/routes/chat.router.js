import { Router } from "express"

// Import modelo de usuario

const router = Router()

router.get('/', (req,res) => {
    res.render('chat',{})
})

export default router