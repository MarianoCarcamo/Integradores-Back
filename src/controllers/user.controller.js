import { updateRol } from '../dao/mongoDB/userData.js'

export async function changeRol(req, res) {
    const { uid } = req.params
    const { newRol } = req.body
    const result = await updateRol(uid, newRol)
    res.send({
        status: 'success',
        message: 'Rol actualizado con exito',
    })
}
