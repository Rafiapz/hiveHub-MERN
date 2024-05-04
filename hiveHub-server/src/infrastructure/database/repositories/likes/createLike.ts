import Likes from "../../models/likesModel";
import { LikesEntity } from "../../../../domain/entities";
import { Posts } from "../../models";


export const createLike = async (data: LikesEntity): Promise<any> => {

    try {
        const likes = await Likes.findOne({ postId: data.postId, userId: data.userId })

        if (likes) {

            const status = await Likes.deleteOne({ postId: data.postId, userId: data.userId })

            if (status.deletedCount !== 1) {

                throw new Error('Failed to unlike post')
            }
            const post = await Posts.findOneAndUpdate({ _id: data.postId }, { $inc: { likes: -1 } }, { new: true })

            return { post }

        } else {
            const newLike = await Likes.create(data)


            const post = await Posts.findOneAndUpdate({ _id: newLike.postId }, { $inc: { likes: 1 } }, { new: true }).populate('userId')

            const posts = await Posts.find({})

            const allLikes = await Likes.find({ postId: data.postId })



            return { posts, allLikes, post }
        }


    } catch (error: any) {
        throw new Error(error.message)
    }

}