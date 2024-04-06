import { IPostDependencies } from "../../interface/posts/IDependencies"

export const findUsersPostUseCase = (dependencies: IPostDependencies) => {

    const { postRepositories: { findUsersPost } } = dependencies

    return {

        execute: async (id: any) => {
            try {
                return await findUsersPost(id)
            } catch (error: any) {
                throw new Error(error.message)
            }
        }
    }
}