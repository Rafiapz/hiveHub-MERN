import { CommentsLikesEntity } from "../../../../domain/entities/commentsLIkesEntity";
import CommentsLikes from "../../models/commentsLikesModel";
import Comments from "../../models/commentsModel";

export const commentLike = async (data: CommentsLikesEntity) => {

    try {



        const likes = await CommentsLikes.findOne({ commentId: data?.commentId, userId: data?.userId })

        if (likes) {

            const status = await CommentsLikes.deleteOne({ commentId: data?.commentId, userId: data.userId })

            if (status.deletedCount !== 1) {

                throw new Error('Failed to unlike comment')
            }
            await Comments.updateOne({ _id: data?.commentId }, { $inc: { likes: -1 } })

            return null

        } else {
            const newLike = await CommentsLikes.create(data)


            await Comments.findOneAndUpdate({ _id: newLike?.commentId }, { $inc: { likes: 1 } }, { new: true }).populate('userId')

            const comments = await Comments.find({})

            const allLikes = await CommentsLikes.find({ commentId: data?.commentId })



            return { comments, allLikes }
        }

    } catch (error: any) {
        throw new Error(error)
    }
}