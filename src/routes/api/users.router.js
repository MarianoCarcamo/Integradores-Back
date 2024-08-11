import { Router } from 'express'
import * as controller from '../../controllers/user.controller.js'

const router = Router()

router.put('/premium/:uid', controller.changeRol)

export default router
