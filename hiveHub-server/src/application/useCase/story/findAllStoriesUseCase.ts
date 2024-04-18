import { IStoryDependencies } from "../../interface/story/IDependencies";

export const findAllStoryUseCase = (dependencies: IStoryDependencies) => {


    const { storyRepositories: { findAllStories } } = dependencies

    return {

        execute: async (userId: any) => {

            try {

                return await findAllStories(userId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}