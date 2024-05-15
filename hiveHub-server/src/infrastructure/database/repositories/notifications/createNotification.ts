import { NotificationsEntity } from "../../../../domain/entities/notificationsEntity";
import Notifications from "../../models/notifications";

export const createNotification = async (data: NotificationsEntity) => {

    try {

        let notification = await Notifications.create(data)

        await notification.populate('actionOn')

        return notification

    } catch (error: any) {
        throw new Error(error)
    }
}