import { ChatsEntity } from "../../entities/chatsEntity";

export interface ICreateChatUseCase {
    execute: (data: ChatsEntity) => Promise<ChatsEntity | null>
}