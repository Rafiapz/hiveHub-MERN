import { CommentsEntity } from "../../../../domain/entities"
import { ReplyCommentsEntity } from "../../../../domain/entities/replyCommentsEntity"
import Comments from "../../models/commentsModel"
import ReplyComments from "../../models/replyCommentsModel"


export const createReplyComment = async (data: ReplyCommentsEntity): Promise<ReplyCommentsEntity | null> => {

    try {

        const reply = await ReplyComments.create(data)

        return reply

    } catch (error: any) {
        throw new Error(error)
    }
}