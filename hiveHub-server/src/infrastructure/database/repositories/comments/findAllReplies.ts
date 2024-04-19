import ReplyComments from "../../models/replyCommentsModel"

export const findAllReplies = (id: any) => {

    try {

        const allReplies = ReplyComments.find({ commentId: id }).sort({ createdAt: -1 }).populate('userId')

        return allReplies

    } catch (error: any) {
        throw new Error(error)
    }
}