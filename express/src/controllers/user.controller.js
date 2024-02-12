import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/user.service.js"
export const getUserController = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.status(200).send({ message: 'Data Users', users })
    } catch (error) {
        if (error) {
            res.status(400).send(error.message)
        }
    }
}

export const getDetailUserController = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await getUserById(userId)
        res.status(200).send({ message: 'Detail User', user })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const postUserController = async (req, res) => {
    try {
        await createUser(req.body)
        res.status(201).send({ message: 'New user has been added.' })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const putUserController = async (req, res) => {
    if (!(req.body.name && req.body.email && req.body.phone && req.body.password)) {
        return res.status(500).send({ message: "Missing some fields" })
    }
    try {
        await updateUser(req.body, req.params.id)
        res.status(201).send({ message: "User updated." })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const patchUserController = async (req, res) => {
    try {
        await updateUser(req.body, req.params.id)
        res.status(201).send({ message: "User updated." })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const deleteUserController = async (req, res) => {
    try {
        await deleteUser(req.params.id)
        res.status(201).send('User deleted.')
    } catch (error) {
        res.status(400).send(error.message)
    }
}