import { Router } from 'express'
import * as controller from '../../controllers/user.controller.js'
import { uploader } from '../../utils.js'

const router = Router()

router.post('/premium/:uid', controller.changeRol)

router.post('/:uid/documents', uploader.array('docs',3), controller.loadDocs, controller.changeRol)

export default router
