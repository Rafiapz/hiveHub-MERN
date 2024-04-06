import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies"
import { IPostDependencies } from "../../../application/interface/posts/IDependencies"
import { Request, Response } from 'express'

export const fetChAllCommentsController = (dependencies: ICommentsDependencies) => {

    const { commentsUseCases: { findAllCommentsUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {


            const postId = req?.params?.postId

            let comments = await findAllCommentsUseCase(dependencies).execute(postId)

            res.json({ status: 'ok', data: comments })

        } catch (error: any) {
            res.json({ status: 'failed', message: error.message }).status(error.status)
        }

    }
}   