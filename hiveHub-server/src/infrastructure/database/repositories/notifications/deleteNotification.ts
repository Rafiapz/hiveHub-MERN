import Notifications from "../../models/notifications"

export const deleteNotification = async (id: any) => {

    try {

        const result = await Notifications.deleteOne({ _id: id })

        return result

    } catch (error: any) {
        throw new Error(error)
    }
}