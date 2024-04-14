import conversation from "../../models/conversationModel"

export const findConversationById = async (userId: any) => {

    try {

        const allConversations = await conversation.find({ members: { $in: [userId] } }).populate('members')

        return allConversations

    } catch (error: any) {
        console.log(error);

        throw new Error(error)
    }
}