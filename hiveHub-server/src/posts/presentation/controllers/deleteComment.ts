import { IPostDependencies } from "../../application/interface/IDependencies";
import { Request, Response } from 'express'

export const deleteCommentController = (dependencies: IPostDependencies) => {

    const { postUseCases: { deleteCommentUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {



            const commentId: string = req?.params?.commentId

            const status = await deleteCommentUseCase(dependencies).execute(commentId)


            if (status.deletedCount === 1) {
                res.json({ status: 'ok', message: 'Comment succesfully deleted' }).status(200)
            } else {
                throw new Error('Unable to delete comment ')
            }



        } catch (error: any) {
            res.json({ status: 'failed', message: error.message }).status(400)
        }
    }
}