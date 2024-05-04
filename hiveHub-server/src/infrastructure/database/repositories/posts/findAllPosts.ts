import { Posts } from "../../models";
import Likes from "../../models/likesModel";

export const findAllPosts = async (data: any) => {

    try {

        const posts = await Posts.find({}).sort({ createdAt: -1 }).skip(data?.skip).limit(data?.limit).populate('userId')
        const likes = await Likes.find({ userId: data?.userId })

        return { posts, likes }

    } catch (error: any) {
        throw new Error(error.message)
    }

}