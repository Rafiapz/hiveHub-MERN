import { ConversationEntity } from "../../entities/conversationEntity";

export interface IFindCoversationByIdUseCase {

    execute: (userId: any) => any
}