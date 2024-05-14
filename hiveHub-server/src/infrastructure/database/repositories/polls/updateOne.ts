import { PollsEntity } from "../../../../domain/entities/pollsEntity"
import Polls from "../../models/pollsModel"

export const updatePoll = async (data: any) => {

    try {

        return await Polls.findOneAndUpdate({ _id: data?._id }, { $set: data })

    } catch (error: any) {
        throw new Error(error)
    }
}