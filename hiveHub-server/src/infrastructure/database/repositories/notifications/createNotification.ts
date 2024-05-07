import { NotificationsEntity } from "../../../../domain/entities/notificationsEntity";
import Notifications from "../../models/notifications";

export const createNotification = async (data: NotificationsEntity) => {

    try {

        const notification = await Notifications.create(data)

        return notification

    } catch (error: any) {
        throw new Error(error)
    }
}