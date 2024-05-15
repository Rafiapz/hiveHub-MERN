import { CommentsEntity } from "../../../../domain/entities";
import { Posts } from "../../models";
import Comments from "../../models/commentsModel";

export const createComment = async (data: any) => {

    try {

        let comment = await Comments.create(data)

        await comment.populate('postId');

        await Posts.updateOne({ _id: data.postId }, { $inc: { comments: 1 } })

        return comment

    } catch (error: any) {
        throw new Error(error.message)
    }
}