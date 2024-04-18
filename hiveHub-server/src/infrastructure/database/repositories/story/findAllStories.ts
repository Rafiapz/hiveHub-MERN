import { StoryEntity } from "../../../../domain/entities/storyEntity"
import Story from "../../models/storyModel"

export const findAllStories = async (userId: any) => {

    try {

        const allStories = await Story.find({}).populate('userId')

        const myStories = await Story.find({ userId: userId }).populate('userId')

        return { allStories, myStories }

    } catch (error) {

    }
}