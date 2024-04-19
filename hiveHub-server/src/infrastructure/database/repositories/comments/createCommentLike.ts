import { CommentsLikesEntity } from "../../../../domain/entities/commentsLIkesEntity";
import CommentsLikes from "../../models/commentsLikesModel";

export const createLikeComment = async (data: CommentsLikesEntity) => {

    try {

        const like = await CommentsLikes.create(data)

        return like

    } catch (error: any) {
        throw new Error(error)
    }
}