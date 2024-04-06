import { ICommentsDependencies } from "../../interface/comments/IDependencies"


export const updateCommentUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { updateComment } } = dependencies

    return {

        execute: async (commentId: any, comment: string) => {

            try {

                return await updateComment(commentId, comment)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}