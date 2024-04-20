import CommentsLikes from "../../models/commentsLikesModel"

export const findAllCommentLikes = async (data: any) => {

    try {

        const allLikes = await CommentsLikes.find({ postId: data?.postId, commentId: data?.commentId })

        return allLikes

    } catch (error: any) {
        throw new Error(error)
    }
}