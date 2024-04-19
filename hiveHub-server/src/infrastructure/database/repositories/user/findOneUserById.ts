import { User } from "../../models"

export const findOneUserById = async (id: any) => {

    try {

        const user = await User.findOne({ _id: id })

        return user

    } catch (error: any) {
        throw new Error(error)
    }
}