import { ReplyCommentsEntity } from "../../entities/replyCommentsEntity";

export interface ICreateReplyCommentUseCase {
    execute: (data: ReplyCommentsEntity) => Promise<ReplyCommentsEntity | null>
}