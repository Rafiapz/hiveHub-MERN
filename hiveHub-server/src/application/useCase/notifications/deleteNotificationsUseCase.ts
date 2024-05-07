import { INotificationsDependencies } from "../../interface/notifications/IDependencies";

export const deleteNotificationUseCase = (dependencies: INotificationsDependencies) => {

    const { notificationsRepositories: { deleteNotification } } = dependencies

    return {

        execute: async (id: any) => {

            try {

                return await deleteNotification(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}