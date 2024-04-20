import { IStoryDependencies } from "../../interface/story/IDependencies";

export const findStoryByIdUseCase = (dependencies: IStoryDependencies) => {

    const { storyRepositories: { findStoryById } } = dependencies

    return {

        execute: async (id: any) => {

            try {

                return await findStoryById(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}