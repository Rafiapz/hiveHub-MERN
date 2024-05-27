import { Posts } from "../../models"

export const findOne = async (id: any) => {

    try {

        return await Posts.findOne({ _id: id })

    } catch (error: any) {
        throw new Error(error)
    }

}