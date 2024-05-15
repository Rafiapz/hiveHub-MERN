import { INotificationsDependencies } from "../../../application/interface/notifications/IDependencies";
import { Request, Response } from 'express'

export const deleteNotificationController = (dependencies: INotificationsDependencies) => {

    const { notificationsUseCases: { deleteNotificationUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.query?.id

            const result = await deleteNotificationUseCase(dependencies).execute(id)

            if (result?.deletedCount === 1) {
                res.status(200).json({ status: 'ok' })
            } else {
                throw new Error('Failed to delete')
            }


        } catch (error: any) {
            console.log(error);

            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}