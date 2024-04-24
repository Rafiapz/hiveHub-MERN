import { IStoryDependencies } from "../../interface/story/IDependencies";

export const updateStoryUseCase = (dependencies: IStoryDependencies) => {

    const { storyRepositories: { updateStory } } = dependencies

    return {
        execute: async (storyId: any, userId: any) => {

            try {

                return await updateStory(storyId, userId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}