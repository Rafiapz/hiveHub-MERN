import { IPostDependencies } from "../../interface/posts/IDependencies";

export const findOneUseCase = (dependencies: IPostDependencies) => {

    const { postRepositories: { findOne } } = dependencies

    return {
        execute: async (id: any) => {

            try {

                return await findOne(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}