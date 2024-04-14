import { ConversationEntity } from "../../../domain/entities/conversationEntity";
import { IChatsDependencies } from "../../interface/chats/IDependencies";

export const createConversationUseCase = (dependencies: IChatsDependencies) => {

    const { chatsRepositories: { createConversation } } = dependencies

    return {

        execute: async (data: ConversationEntity) => {

            try {

                return await createConversation(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}