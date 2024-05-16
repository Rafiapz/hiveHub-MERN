import { Request, Response } from 'express'
import { LikesEntity } from '../../../domain/entities/likesEntity'
import mongoose from "mongoose";
import { ILikesDependencies } from "../../../application/interface/likes/IDependencies";
import { INotificationsDependencies } from '../../../application/interface/notifications/IDependencies';
import { NotificationsEntity } from '../../../domain/entities/notificationsEntity';


export const likePostController = (dependencies: ILikesDependencies, notificationsDependencies: INotificationsDependencies) => {

    const { likesUseCases: { likePostUseCase, } } = dependencies

    const { notificationsUseCases: { createNotificationUseCase } } = notificationsDependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userIdData = (user as any)?.id;
            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(userIdData)

            const postIdData: string = req?.params?.postId
            const postId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(postIdData)


            const likeData: LikesEntity = { postId: postId, userId: userId }

            const { posts, likes, post, liked, unlike } = await likePostUseCase(dependencies).execute(likeData)

            if (liked && post) {

                const data: NotificationsEntity = {
                    actionBy: userIdData,
                    actionOn: post?.userId?._id,
                    message: 'Liked your post',
                    read: false,
                    type: 'like'

                }

                if (post?.userId?._id != userIdData) {
                    await createNotificationUseCase(notificationsDependencies).execute(data)
                }


                res.status(200).json({ status: 'ok', message: 'Succesfully liked post', post })
            } else if (unlike) {

                res.status(200).json({ status: 'ok', message: 'Successfully unlike post', post })
            }

        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'Failed', message: error.message })
        }

    }
}