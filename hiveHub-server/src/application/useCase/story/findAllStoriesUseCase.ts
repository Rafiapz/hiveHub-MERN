import { IStoryDependencies } from "../../interface/story/IDependencies";

export const findAllStoryUseCase = (dependencies: IStoryDependencies) => {


    const { storyRepositories: { findAllStories } } = dependencies

    return {

        execute: async () => {

            try {

                return await findAllStories()

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}