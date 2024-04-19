import { ObjectId } from "mongodb";
import Comments from "../../models/commentsModel";

export const findAllComments = async (postId: any) => {

    try {

        const comments = await Comments.find({ postId: postId }).sort({ createdAt: -1 }).populate('userId')

        return comments

    } catch (error) {

    }
}