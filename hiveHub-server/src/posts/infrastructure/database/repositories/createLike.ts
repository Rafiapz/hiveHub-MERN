import Likes from "../models/likesModel";
import { LikesEntity } from "../../../domain/entities/likesEntity";
import { Posts } from "../models";
import { PostEntity } from "../../../domain/entities";

export const createLike = async (data: LikesEntity): Promise<any> => {

    try {
        const likes = await Likes.findOne({ postId: data.postId, userId: data.userId })

        if (likes) {

            const status = await Likes.deleteOne({ postId: data.postId, userId: data.userId })

            if (status.deletedCount !== 1) {

                throw new Error('Failed to unlike post')
            }
            await Posts.updateOne({ _id: data.postId }, { $inc: { likes: -1 } })

            return null

        } else {
            const newLike = await Likes.create(data)


             await Posts.findOneAndUpdate({ _id: newLike.postId }, { $inc: { likes: 1 } }, { new: true }).populate('userId')
            
             const posts=await Posts.find({})

            const allLikes=await Likes.find({postId:data.postId})



            return {posts,allLikes}
        }


    } catch (error: any) {
        throw new Error(error.message)
    }

}