import { INotificationsDependencies } from "../../interface/notifications/IDependencies";

export const findAllNotificationsUseCase = (dependencies: INotificationsDependencies) => {

    const { notificationsRepositories: { findAllNotifications } } = dependencies

    return {

        execute: async (data: any) => {
            try {

                return await findAllNotifications(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }

}