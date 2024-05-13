import Polls from "../../models/pollsModel"

export const fetchAllPolls = async () => {

    try {

        return await Polls.find({}).populate('userId')

    } catch (error: any) {
        throw new Error(error)
    }
}