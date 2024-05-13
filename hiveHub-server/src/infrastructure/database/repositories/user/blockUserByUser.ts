import { User } from "../../models"

export const blockUserByUser = async (data: any) => {

    try {


        const user = await User.findOneAndUpdate({ _id: data.userId }, { $addToSet: { blockedUsers: data.targetUserId } }, { new: true })


        return user

    } catch (error: any) {
        throw new Error(error)
    }
}

export const unblockUserByUser = async (data: any) => {

    try {

        const user = await User.findOneAndUpdate({ _id: data?.userId }, { $pull: { blockedUsers: data.targetUserId } }, { new: true })

        return user
    } catch (error: any) {
        throw new Error(error)
    }
}