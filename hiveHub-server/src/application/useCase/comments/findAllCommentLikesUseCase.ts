import { ICommentsDependencies } from "../../interface/comments/IDependencies";

export const findAllCommentLikesUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { findAllCommentLikes } } = dependencies

    return {
        execute: async (data: any) => {
            try {

                return await findAllCommentLikes(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}