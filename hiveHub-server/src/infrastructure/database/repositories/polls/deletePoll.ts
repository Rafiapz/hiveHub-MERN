import Polls from "../../models/pollsModel"

export const deletePoll = async (id: any) => {

    try {

        return await Polls.deleteOne({ _id: id })

    } catch (error: any) {
        throw new Error(error)
    }
}