import { ChatsEntity } from "../../../../domain/entities/chatsEntity";
import Chats from "../../models/chatsModel";

export const createChat = async (data: ChatsEntity) => {

    try {

        const chat = await Chats.create(data)

        return chat

    } catch (error: any) {
        throw new Error(error);

    }
}