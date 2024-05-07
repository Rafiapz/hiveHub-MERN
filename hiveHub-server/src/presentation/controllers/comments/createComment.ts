import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies"
import { INotificationsDependencies } from "../../../application/interface/notifications/IDependencies"
import { IPostDependencies } from "../../../application/interface/posts/IDependencies"
import { Request, Response } from 'express'
import { NotificationsEntity } from "../../../domain/entities/notificationsEntity"

export const createCommentController = (dependencies: ICommentsDependencies, notificationsDependencies: INotificationsDependencies) => {

    const { commentsUseCases: { createCommentUseCase } } = dependencies

    const { notificationsUseCases: { createNotificationUseCase } } = notificationsDependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user

            const userId = (user as any)?.id;
            const comment: string = req?.body?.comment
            const createdAt: Date = new Date()
            const postId = req?.params?.postId

            const newComment = await createCommentUseCase(dependencies).execute({ userId, comment, postId, createdAt })

            if (newComment) {

                const data: NotificationsEntity = {
                    actionBy: userId,
                    actionOn: newComment?.postId?.userId,
                    message: `Commented on your post "${newComment?.comment}"`,
                    read: false,
                    type: 'comment'
                }

                await createNotificationUseCase(notificationsDependencies).execute(data)
                res.json({ status: 'ok', data: newComment, message: 'successfully added comment' }).status(200)
            }
            else {
                throw new Error('Unable to submit comment')
            }


        } catch (error: any) {
            console.log(error.message);

            res.json({ status: 'failed', message: error.message })
        }

    }
}