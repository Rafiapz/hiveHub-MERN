import { IPostDependencies } from "../interface/IDependencies";

export const updateCommentUseCase = (dependencies: IPostDependencies) => {

    const { postRepositories: { updateComment } } = dependencies

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