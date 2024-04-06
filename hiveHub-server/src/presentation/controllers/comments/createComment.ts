import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies"
import { IPostDependencies } from "../../../application/interface/posts/IDependencies"
import { Request, Response } from 'express'

export const createCommentController = (dependencies: ICommentsDependencies) => {

    const { commentsUseCases: { createCommentUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user

            const userId = (user as any)?.id;
            const comment: string = req?.body?.comment
            const createdAt: Date = new Date()
            const postId = req?.params?.postId
            console.log(req?.params);

            const newComment = await createCommentUseCase(dependencies).execute({ userId, comment, postId, createdAt })

            if (!newComment) throw new Error('Unable to submit comment')
            else res.json({ status: 'ok', data: newComment, message: 'successfully added comment' }).status(200)


        } catch (error: any) {
            console.log(error.message);

            res.json({ status: 'failed', message: error.message })
        }

    }
}