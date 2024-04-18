import { IStoryDependencies } from "../../interface/story/IDependencies";

export const deleteStoryUseCase = (dependencies: IStoryDependencies) => {

    const { storyRepositories: { deleteStory } } = dependencies

    return {

        execute: async (id: any) => {
            try {

                return await deleteStory(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}