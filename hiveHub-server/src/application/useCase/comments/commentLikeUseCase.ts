import { CommentsLikesEntity } from "../../../domain/entities/commentsLIkesEntity";
import { ICommentsDependencies } from "../../interface/comments/IDependencies";

export const commentLikeUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { commentLike } } = dependencies

    return {
        execute: async (data: CommentsLikesEntity) => {
            try {

                return await commentLike(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}