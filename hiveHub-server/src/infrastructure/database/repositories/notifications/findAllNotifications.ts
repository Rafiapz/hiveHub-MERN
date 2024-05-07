import Notifications from "../../models/notifications"

export const findAllNotifications = async (data: any) => {

    try {

        return await Notifications.find({ actionOn: data?.userId }).sort({ createdAt: -1 }).skip(data?.skip).limit(data?.limit).populate('actionBy')

    } catch (error: any) {
        throw new Error(error)
    }
}