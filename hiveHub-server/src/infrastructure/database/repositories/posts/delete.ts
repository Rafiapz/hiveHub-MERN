import { ObjectId } from "mongodb"
import { Posts } from "../../models"

export const deletePost = async (data: { _id: string }) => {

    try {

        const status = await Posts.deleteOne(data)

        return status

    } catch (error: any) {
        throw new Error(error.message)
    }
}