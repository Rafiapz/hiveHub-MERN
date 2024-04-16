import { StoryEntity } from "../../../../domain/entities/storyEntity";
import Story from "../../models/storyModel";

export const createStory = async (data: StoryEntity) => {

    try {

        const story = await Story.create(data)

        return story

    } catch (error: any) {
        throw new Error(error)
    }
}