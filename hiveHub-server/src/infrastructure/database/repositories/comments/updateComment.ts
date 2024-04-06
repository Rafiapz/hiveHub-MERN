import { CommentsEntity } from "../../../../domain/entities"
import Comments from "../../models/commentsModel"

export const updateComment = async (commentId: any, comment: string): Promise<CommentsEntity | null> => {

    try {

        const updatedComment = await Comments.findOneAndUpdate({ _id: commentId }, { $set: { comment: comment } }, { new: true })

        return updatedComment

    } catch (error: any) {
        throw new Error(error)
    }
}