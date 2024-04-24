import Likes from "../../models/likesModel"

export const findByUserId = async (userId: any) => {

    try {


        const posts = await Likes.find({ userId: userId }).populate({
            path: 'postId',
            populate: {
                path: 'userId',
                model: 'users'
            }
        });

        const likes = await Likes.find({ userId: userId })

        return { posts, likes }

    } catch (error: any) {
        console.log(error);

        throw new Error(error)
    }
}