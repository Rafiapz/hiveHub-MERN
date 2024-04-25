import Story from "../../models/storyModel"

export const updateStory = async (storyId: any, userId: any) => {

    try {

        const story = await Story.findOneAndUpdate({ _id: storyId }, { $addToSet: { seenBy: userId } }, { new: true })

        return story

    } catch (error: any) {
        throw new Error(error)
    }
}