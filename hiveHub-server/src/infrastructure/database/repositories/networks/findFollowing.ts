import Networks from "../../models/networkModel"


export const findFollowing = async (userId: any) => {

    try {

        const following = await Networks.find({ sourceUserId: userId }).populate('targetUserId')

        return following

    } catch (error: any) {
        throw new Error(error)
    }
}