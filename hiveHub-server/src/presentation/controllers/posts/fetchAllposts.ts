import { IPostDependencies } from "../../../application/interface/posts/IDependencies"
import { Request, Response, NextFunction } from 'express'
import { Posts } from "../../../infrastructure/database/models"
import Likes from "../../../infrastructure/database/models/likesModel"


export const fetchAllposts = (dependencies: IPostDependencies) => {

    const { postUseCases: { findAllPostsUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userId = (user as any)?.id;
            const pageSize = 2
            const pageNumber: any = req?.query?.page

            const skip = (pageNumber - 1) * pageSize
            const limit = pageSize;

            const data = {
                userId,
                skip,
                limit
            }

            const { posts, likes } = await findAllPostsUseCase(dependencies).execute(data)


            res.status(200).json({ status: 'ok', message: 'success', data: { posts, likes } })


        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}

export const fetchCompletePosts = (dependencies: IPostDependencies) => {

    return async (req: Request, res: Response) => {

        try {



            // const { posts, likes } = await findAllPostsUseCase(dependencies).execute(data)
            const user = req?.user

            const userId = (user as any)?.id;

            const posts = await Posts.find({ userId: userId })

            const likes = await Likes.find({ userId: userId })


            res.status(200).json({ status: 'ok', message: 'success', data: { posts, likes } })

        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'failed', message: error.message })
        }
    }

}