import { StoryEntity } from "../../../../domain/entities/storyEntity"
import Story from "../../models/storyModel"

export const findAllStories = async () => {

    try {

        const allStories = await Story.find({}).populate('userId')

        return allStories

    } catch (error) {

    }
}