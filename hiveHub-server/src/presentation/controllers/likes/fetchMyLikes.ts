import { ILikesDependencies } from "../../../application/interface/likes/IDependencies";
import { Request, Response } from 'express'

export const fetchMyLikesController = (dependencies: ILikesDependencies) => {

    const { likesUseCases: { findUsersLikesUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userId = (user as any)?.id


            let { posts, likes } = await findUsersLikesUseCase(dependencies).execute(userId)

            posts = posts.map((ob: any) => ob.postId)

            res.status(200).json({ status: 'ok', data: { posts, likes: likes } })


        } catch (error: any) {
            console.log(error);

            res.json({ status: 'failed', message: error.message })
        }
    }
}