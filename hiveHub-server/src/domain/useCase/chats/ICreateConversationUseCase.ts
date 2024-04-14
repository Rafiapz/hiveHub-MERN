import { ConversationEntity } from "../../entities/conversationEntity";

export interface ICreateConversationUseCase {
    execute: (data: ConversationEntity) => Promise<ConversationEntity | null>
}