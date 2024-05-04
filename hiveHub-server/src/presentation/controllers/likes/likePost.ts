import { Request, Response } from 'express'
import { LikesEntity } from '../../../domain/entities/likesEntity'
import mongoose from "mongoose";
import { ILikesDependencies } from "../../../application/interface/likes/IDependencies";


export const likePostController = (dependencies: ILikesDependencies) => {

    const { likesUseCases: { likePostUseCase, } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userIdData = (user as any)?.id;
            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(userIdData)

            const postIdData: string = req?.params?.postId
            const postId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(postIdData)


            const likeData: LikesEntity = { postId: postId, userId: userId }

            const { posts, likes, post } = await likePostUseCase(dependencies).execute(likeData)



            if (post) {

                res.status(200).json({ status: 'ok', message: 'Succesfully disliked post', post })


            } else {
                throw new Error('Unable to like the post')
            }


        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'Failed', message: error.message })
        }

    }
}