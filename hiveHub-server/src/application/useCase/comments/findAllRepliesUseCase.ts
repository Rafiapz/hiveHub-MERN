import { ICommentsDependencies } from "../../interface/comments/IDependencies";

export const findAllRepliesUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { findAllReplies } } = dependencies

    return {
        execute: async (id: any) => {
            try {

                return await findAllReplies(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}