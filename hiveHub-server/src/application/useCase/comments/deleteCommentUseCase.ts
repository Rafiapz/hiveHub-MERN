import { ICommentsDependencies } from "../../interface/comments/IDependencies"


export const deleteCommentUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { deleteComment } } = dependencies

    return {

        execute: async (commentId: string) => {

            try {

                return await deleteComment(commentId)

            } catch (error: any) {
                throw new Error(error.message)
            }
        }
    }
}