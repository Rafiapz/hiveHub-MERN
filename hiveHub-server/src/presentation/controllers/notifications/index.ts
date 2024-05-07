import { INotificationsDependencies } from "../../../application/interface/notifications/IDependencies";
import { deleteNotificationController } from "./deleteNotification";
import { fetchNotificationsController } from "./fetchNotifications";

export const controllers = (dependencies: INotificationsDependencies) => {

    return {

        fetchNotifications: fetchNotificationsController(dependencies),
        deleteNotification: deleteNotificationController(dependencies)
    }
}