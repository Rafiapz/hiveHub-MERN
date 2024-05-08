import { Request, Response } from 'express'
import { ILikesDependencies } from '../../../application/interface/likes/IDependencies'

export const fetchPostLikedUsersController = (dependencies: ILikesDependencies) => {

    const { likesUseCases: { findLikedUsersUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            if (!req?.query?.postId) {
                throw new Error('PostId not found')
            }

            const data = {
                postId: req?.query?.postId
            }

            const users = await findLikedUsersUseCase(dependencies).execute(data)

            res.status(200).json({ status: 'ok', data: users })
        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}