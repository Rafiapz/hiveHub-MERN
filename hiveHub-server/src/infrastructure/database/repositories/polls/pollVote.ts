import Polls from "../../models/pollsModel"

export const pollVote = async (data: any) => {
    try {


        const id = parseInt(data?.optionId)

        const poll = await Polls.findOneAndUpdate(
            { _id: data?.pollId, "options.id": id },
            { "$inc": { "options.$.votes": 1 }, $addToSet: { voters: data?.userId } },
            { new: true }
        );


        return poll

    } catch (error: any) {
        throw new Error(error)
    }
}