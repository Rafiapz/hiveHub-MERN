import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies";
import { Request, Response } from 'express'

export const fetchCommentLikesController = (dependencies: ICommentsDependencies) => {

    const { commentsUseCases: { findAllCommentLikesUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const data = { postId: req?.params?.postId, commentId: req?.query?.commentId }

            const likes = await findAllCommentLikesUseCase(dependencies).execute(data)

            // console.log(likes);


            res.status(200).json({ status: 'ok', data: likes })

        } catch (error: any) {
            res.status(200).json({ status: 'failed', message: error.message })
        }
    }
}