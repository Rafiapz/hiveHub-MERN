import { User } from "../../models"

export const blockUnblockUser = (userId: any, toStatus: boolean) => {

    try {

        const updated = User.findOneAndUpdate({ _id: userId }, { $set: { isBlocked: toStatus } }, { new: true })

        return updated
    } catch (error: any) {
        throw new Error(error)
    }
}