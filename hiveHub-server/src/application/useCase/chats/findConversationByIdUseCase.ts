import { IChatsDependencies } from "../../interface/chats/IDependencies";

export const findConversationByIdUseCase = (dependencies: IChatsDependencies) => {

    const { chatsRepositories: { findConversationById } } = dependencies

    return {

        execute: async (userId: any) => {

            try {

                return await findConversationById(userId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}