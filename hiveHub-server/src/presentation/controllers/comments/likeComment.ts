import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies";
import { Request, Response } from 'express'
import { CommentsLikesEntity } from "../../../domain/entities/commentsLIkesEntity";

export const likeCommentController = (dependencies: ICommentsDependencies) => {

    const { commentsUseCases: { commentLikeUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const data: CommentsLikesEntity = {
                userId: req?.body?.userId,
                commentId: req?.body?.commentId,
                postId: req?.body?.postId
            }

            const result = await commentLikeUseCase(dependencies).execute(data)


            res.status(200).json({ status: 'ok', data: result })


        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.mssage })
        }
    }
}