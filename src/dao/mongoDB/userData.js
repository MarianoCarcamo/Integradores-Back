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

export async function updateRol(id, newRol) {
    return await userModel.findByIdAndUpdate(id, { rol: newRol })
}
