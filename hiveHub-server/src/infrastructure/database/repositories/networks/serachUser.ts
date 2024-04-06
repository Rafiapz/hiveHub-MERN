import { User } from "../../models"

export const searchUser = async (query: string) => {

    try {

        const regx = new RegExp(`^${query}`, "i")

        const users = await User.find({ fullName: { $regex: regx } })

        return users
    } catch (error: any) {
        throw new Error(error)
    }
}