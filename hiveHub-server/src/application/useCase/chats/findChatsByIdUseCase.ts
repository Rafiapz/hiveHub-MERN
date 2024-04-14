import { IChatsDependencies } from "../../interface/chats/IDependencies";

export const findChatsByIdUseCase = (dependencies: IChatsDependencies) => {

    const { chatsRepositories: { findChatsById } } = dependencies

    return {
        execute: async (id: any) => {

            try {

                return await findChatsById(id)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}