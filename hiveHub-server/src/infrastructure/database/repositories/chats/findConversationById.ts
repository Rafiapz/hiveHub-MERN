import conversation from "../../models/conversationModel"

export const findConversationById = async (userId: any) => {

    try {

        const allConversations = await conversation.find({ members: { $in: [userId] } }).sort({ updatedAt: -1 }).populate('members')

        return allConversations

    } catch (error: any) {
        console.log(error);

        throw new Error(error)
    }
}