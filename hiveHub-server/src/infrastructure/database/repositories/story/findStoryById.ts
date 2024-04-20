import Story from "../../models/storyModel"

export const findStoryById = async (id: any) => {

    try {


        const stories = await Story.find({ userId: id }).populate('userId')

        return stories

    } catch (error: any) {
        console.log(error);

        throw new Error(error)
    }
}