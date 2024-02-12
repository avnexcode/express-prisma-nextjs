import prisma from "../database/prisma.js"
export const findUsers = async () => {
    const users = await prisma.users.findMany()
    return users

}

export const findUserById = async (id) => {
    const user = await prisma.users.findUnique({ where: { id } })
    return user;
}

export const insertUser = async (newUserData) => {
    const user = await prisma.users.create({
        data: {
            name: newUserData.name,
            email: newUserData.email,
            phone: newUserData.phone,
            password: newUserData.password,
        }
    })
    return user
}

export const editUser = async (userData, id) => {
    const user = await prisma.users.update({
        data: {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
        },
        where: {
            id
        }
    })
    return user
}

export const dropUser = async (id) => {
    const user = await prisma.users.delete({ where: { id } })
    return user
}