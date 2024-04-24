import { Posts } from "../../models"

export const findOne = async (postId: any) => {

    try {

        const post = await Posts.findOneAndUpdate({ _id: postId }, { $inc: { shares: 1 } })

        return post

    } catch (error: any) {
        throw new Error(error)
    }
}