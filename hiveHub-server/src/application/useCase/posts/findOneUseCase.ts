import { IPostDependencies } from "../../interface/posts/IDependencies";

export const findOneUseCase = (dependencies: IPostDependencies) => {

    const { postRepositories: { findOne } } = dependencies

    return {
        execute: async (postId: any) => {

            try {

                return await findOne(postId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}