import { CommentsEntity } from "../../../domain/entities";
import { ReplyCommentsEntity } from "../../../domain/entities/replyCommentsEntity";
import { ICommentsDependencies } from "../../interface/comments/IDependencies";

export const createReplyCommentUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { createReplyComment } } = dependencies

    return {

        execute: async (data: ReplyCommentsEntity) => {

            try {

                return await createReplyComment(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}