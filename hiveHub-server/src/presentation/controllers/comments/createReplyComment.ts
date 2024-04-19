import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies";
import { Request, Response } from 'express'
import { ReplyCommentsEntity } from "../../../domain/entities/replyCommentsEntity";

export const createReplyCommentController = (dependencies: ICommentsDependencies) => {

    const { commentsUseCases: { createReplyCommentUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const data: ReplyCommentsEntity = {
                commentId: req?.body?.commentId,
                content: req?.body?.content,
                userId: req?.body?.userId
            }

            const reply = await createReplyCommentUseCase(dependencies).execute(data)

            if (!reply) {
                throw new Error('Unable to submit reply')
            } else {
                res.status(200).json({ status: 'ok', message: 'Reply submitted successfully', data: reply })
            }

        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}