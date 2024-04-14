import { DeleteResult } from "mongodb";
import { CommentsEntity } from "../../../domain/entities";
import { ChatsEntity } from "../../../domain/entities/chatsEntity";
import { ConversationEntity } from "../../../domain/entities/conversationEntity";


export interface IRepositories {

    createChat: (data: ChatsEntity) => Promise<ChatsEntity | null>;
    createConversation: (data: ConversationEntity) => Promise<ConversationEntity | null>;
    findConversationById: (userId: any) => any,
    findChatsById: (id: any) => any
}