import { updateRol, updateDocs, findUserById } from '../dao/mongoDB/userData.js'

export async function changeRol(req, res) {
    const { uid } = req.params
    try{
        if(req.session.user.rol == "user"){
            const user = await findUserById(uid)
            if(user.documents.length >= 3){
                req.session.user.rol = "premium"
                await updateRol(uid, req.session.user.rol)
            } else {
                throw error
            }
        } else {
            req.session.user.rol = "user"
            await updateRol(uid, req.session.user.rol)
        }
        res.send({
            status: 'success',
            message: 'Rol actualizado con exito',
        })
    } catch (error) {
        res.json({status: "Error", message: "Documentacion insuficiente"})
    }
    
}

//Middleware para cargar archivos a la base de datos
export async function loadDocs(req, res, next) {
    if(!req.files){
        return res.status(400).send({status:"Error", error: "No se pudo guardar la imagen"})
    }
    const docs = req.files.map((file) => {
        return {
            name: file.originalname,
            reference: file.path
        }
    })
    req.session.user.documents = (await updateDocs(req.session.user._id,docs)).documents
    next()
}
