import { IPostDependencies } from "../../interface/posts/IDependencies";

export const findOneAndUpdateUseCase = (dependencies: IPostDependencies) => {

    const { postRepositories: { findOneAndUpdate } } = dependencies

    return {
        execute: async (postId: any) => {

            try {

                return await findOneAndUpdate(postId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}