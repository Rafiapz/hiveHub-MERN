import { StoryEntity } from "../../../../domain/entities/storyEntity";
import Story from "../../models/storyModel";

export const createStory = async (data: StoryEntity) => {

    try {

        const exising = await Story.findOne({ userId: data?.userId })

        if (!exising) {
            const story = await Story.create(data)

            return story
        } else {

            const updated = await Story.findOneAndUpdate({ userId: exising.userId }, { $push: { media: data.media } }, { new: true })

            return updated
        }


    } catch (error: any) {
        throw new Error(error)
    }
}