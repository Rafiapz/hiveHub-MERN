import { Posts } from "../models";
import Likes from "../models/likesModel";

export const findAllPosts = async (data: any) => {

    try {

        const posts = await Posts.find({}).sort({ createdAt: -1 }).populate('userId')
        const likes = await Likes.find({ userId: data })

        return { posts, likes }

    } catch (error: any) {
        throw new Error(error.message)
    }

}