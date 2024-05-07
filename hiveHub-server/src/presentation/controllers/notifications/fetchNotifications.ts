import { INotificationsDependencies } from "../../../application/interface/notifications/IDependencies";
import { Request, Response } from 'express'

export const fetchNotificationsController = (dependencies: INotificationsDependencies) => {

    const { notificationsUseCases: { findAllNotificationsUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const userId = req?.params?.id
            const pageSize = 6
            const pageNumber: any = req?.query?.page

            const skip = (pageNumber - 1) * pageSize
            const limit = pageSize;

            const data = {
                userId,
                skip,
                limit
            }


            const allNotifications = await findAllNotificationsUseCase(dependencies).execute(data)

            res.status(200).json({ status: 'ok', data: allNotifications })

        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'failed' })
        }
    }
}