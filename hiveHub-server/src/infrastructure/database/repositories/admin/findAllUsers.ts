import { Posts, User } from "../../models"

export const findAllUsers = async (id: any) => {

    try {

        const allUsers = await User.find({ _id: { $ne: id } })


        return allUsers

    } catch (error: any) {
        throw new Error(error)
    }
}