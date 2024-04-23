import { ChatsEntity } from "../../../../domain/entities/chatsEntity";
import Chats from "../../models/chatsModel";
import conversation from "../../models/conversationModel";

export const createChat = async (data: ChatsEntity) => {

    try {

        const chat = await Chats.create(data)

        await conversation.updateOne({ _id: data?.conversationId }, { updatedAt: new Date() })

        return chat

    } catch (error: any) {
        throw new Error(error);

    }
}