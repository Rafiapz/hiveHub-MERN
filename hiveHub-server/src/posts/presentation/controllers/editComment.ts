import { IPostDependencies } from "../../application/interface/IDependencies";
import { Request, Response } from 'express'

export const updateCommentController = (dependencies: IPostDependencies) => {

    const { postUseCases: { updateCommentUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const commentId = req?.params?.commentId
            const comment = req?.body?.comment

            const updatedComment = await updateCommentUseCase(dependencies).execute(commentId, comment)

            if (updatedComment) {

                res.status(200).json({ status: 'ok', message: 'Comment edited successfully' })
            } else {

                throw new Error('Something went wrong')
            }




        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}