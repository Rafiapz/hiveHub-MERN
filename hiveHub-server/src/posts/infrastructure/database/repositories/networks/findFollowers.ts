import Networks from "../../models/networkModel"

export const findFollowers = async (userId: any) => {

    try {

        const followers = await Networks.find({ targetUserId: userId }).populate('sourceUserId')

        return followers

    } catch (error: any) {
        throw new Error(error)
    }
}