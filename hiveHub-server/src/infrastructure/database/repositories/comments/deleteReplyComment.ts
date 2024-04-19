import ReplyComments from "../../models/replyCommentsModel"

export const deleteReplyComment = async (id: any) => {

    try {

        const result = await ReplyComments.deleteOne({ _id: id })

        return result

    } catch (error: any) {
        throw new Error(error)
    }
}