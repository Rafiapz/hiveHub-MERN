import { ChatsEntity } from "../../../domain/entities/chatsEntity";
import { IChatsDependencies } from "../../interface/chats/IDependencies";

export const createChatUseCase = (dependencies: IChatsDependencies) => {

    const { chatsRepositories: { createChat } } = dependencies

    return {

        execute: async (data: ChatsEntity) => {

            try {

                return await createChat(data)

            } catch (error: any) {
                throw new Error(error)
            }

        }
    }
}   