import { StoryEntity } from "../../../domain/entities/storyEntity";
import { IStoryDependencies } from "../../interface/story/IDependencies";

export const createStoryUseCase = (dependencies: IStoryDependencies) => {

    const { storyRepositories: { createStory } } = dependencies

    return {
        execute: async (data: StoryEntity) => {

            try {

                return await createStory(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}