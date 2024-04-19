import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies";
import { Request, Response } from 'express'

export const deleteReplyCommentController = (dependencies: ICommentsDependencies) => {

    const { commentsUseCases: { deleteReplyCommentUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.params?.id

            const result = await deleteReplyCommentUseCase(dependencies).execute(id)

            if (result?.deletedCount !== 1) {
                throw new Error('Unable to delete try again later')
            }
            res.status(200).json({ status: 'ok', message: 'Delete Successfully' })


        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}