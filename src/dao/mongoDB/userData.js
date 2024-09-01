import userModel from '../models/user.model.js'

export async function createUser(user) {
    return await userModel.create(user)
}

export async function findUserByEmail(email) {
    return await userModel.findOne({ email })
}

export async function findUserById(id) {
    return await userModel.findById(id)
}

export async function updatePassword(user) {
    return await userModel.findOneAndUpdate(
        { email: user.email },
        { password: user.password }
    )
}

export async function updateLastConnection(user) {
    return await userModel.findOneAndUpdate(
        { email: user.email },
        { last_connection: new Date() }
    )
}

export async function updateRol(id, newRol) {
    return await userModel.findByIdAndUpdate(id, { rol: newRol }, {new: true})
}

export async function updateDocs(id, docs) {
    const user = await findUserById(id)
    user.documents.push(...docs)
    return await userModel.findByIdAndUpdate(id, { documents: user.documents }, {new: true})
}
