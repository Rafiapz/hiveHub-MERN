import { ICommentsDependencies } from "../../interface/comments/IDependencies"


export const createCommentUseCase = (dependencies: ICommentsDependencies) => {

    const { commentsRepositories: { createComment } } = dependencies

    return {
        execute: async (data: any) => {

            return await createComment(data)

        }
    }
}