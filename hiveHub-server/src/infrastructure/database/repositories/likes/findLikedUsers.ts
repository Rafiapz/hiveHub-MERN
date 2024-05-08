import Likes from "../../models/likesModel"

export const findLikedUsers = async (data: any) => {

    try {

        const result = await Likes.find({ postId: data?.postId }).populate('userId')

        return result

    } catch (error: any) {
        throw new Error(error)
    }
}