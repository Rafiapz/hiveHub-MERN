import { PollsEntity } from "../../../../domain/entities/pollsEntity";
import Polls from "../../models/pollsModel";

export const createPoll = async (data: PollsEntity) => {

    try {

        const poll = await Polls.create(data)

        return poll

    } catch (error: any) {
        throw new Error(error)
    }
}