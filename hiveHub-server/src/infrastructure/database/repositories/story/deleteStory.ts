import Story from "../../models/storyModel"

export const deleteStory = (id: any) => {

    try {

        const result = Story.deleteOne({ _id: id })

        return result

    } catch (error: any) {
        throw new Error(error)
    }
}