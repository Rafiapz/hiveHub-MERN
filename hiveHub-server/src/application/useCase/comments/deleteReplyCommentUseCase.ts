import { ICommentsDependencies } from "../../interface/comments/IDependencies";

export const deleteReplyCommentUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { deleteReplyComment } } = dependencies

    return {

        execute: async (id: any) => {

            try {

                return deleteReplyComment(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}