import { ConversationEntity } from "../../../../domain/entities/conversationEntity";
import conversation from "../../models/conversationModel";



export const createConversation = async (data: ConversationEntity) => {

    try {

        const result = (await conversation.create(data)).populate('members')

        return result

    } catch (error: any) {
        throw new Error(error)
    }
}