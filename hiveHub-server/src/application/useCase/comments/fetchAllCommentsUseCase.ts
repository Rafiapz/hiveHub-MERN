import { ICommentsDependencies } from "../../interface/comments/IDependencies"


export const findAllCommentsUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { findAllComments } } = dependencies

    return {

        execute: (postId: any) => {

            try {

                return findAllComments(postId)
            } catch (error: any) {
                throw new Error(error.message)
            }
        }
    }
}