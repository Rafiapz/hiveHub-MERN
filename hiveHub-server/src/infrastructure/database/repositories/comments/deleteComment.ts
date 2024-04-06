import { DeleteResult } from "mongodb"
import Comments from "../../models/commentsModel"
import { Posts } from "../../models"

export const deleteComment = async (commentId: string): Promise<DeleteResult> => {

    try {

        const postIdData = await Comments.findOne({ _id: commentId })

        const status = await Comments.deleteOne({ _id: commentId })

        await Posts.updateOne({ _id: postIdData?.postId }, { $inc: { comments: -1 } })

        return status

    } catch (error: any) {
        throw new Error(error.message)
    }
}