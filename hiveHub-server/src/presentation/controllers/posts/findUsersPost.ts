import { IPostDependencies } from "../../../application/interface/posts/IDependencies"
import { Request, Response } from 'express'

export const findUsersPostController = (dependencies: IPostDependencies) => {

    const { postUseCases: { findUsersPostUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.params?.id

            const { posts, likes } = await findUsersPostUseCase(dependencies).execute(id)

            if (posts) {
                res.status(200).json({ status: 'ok', data: { posts, likes }, message: 'success' })
            } else {
                throw new Error('Unable to fetch posts')
            }

        } catch (error: any) {
            res.status(error.status || 400)
        }
    }
}