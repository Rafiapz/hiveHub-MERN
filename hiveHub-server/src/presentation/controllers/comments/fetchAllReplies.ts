import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies";
import { Request, Response } from 'express'

export const fetchAllRepliesController = (dependencies: ICommentsDependencies) => {

    const { commentsUseCases: { findAllRepliesUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.params?.commentId

            const allReplies = await findAllRepliesUseCase(dependencies).execute(id)

            res.status(200).json({ status: 'ok', data: allReplies })


        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}