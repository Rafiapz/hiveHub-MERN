import { NotificationsEntity } from "../../../domain/entities/notificationsEntity"
import { INotificationsDependencies } from "../../interface/notifications/IDependencies"

export const createNotificationUseCase = (dependencies: INotificationsDependencies) => {

    const { notificationsRepositories: { createNotification } } = dependencies

    return {
        execute: async (data: NotificationsEntity) => {

            try {

                return await createNotification(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}