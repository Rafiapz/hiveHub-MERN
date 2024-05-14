import { IChatsDependencies } from "../../../application/interface/chats/IDependencies";
import { createChatController } from "./createChat";
import { createConversationController } from "./createConversation";
import { fetchAllConversationsByIdController } from "./fetchConversations";
import { fetchMessagesController } from "./fetchChats";
import { fetchOnlineUsersController } from "./fetchOnlineUsers";



export const controllers = (dependencies: IChatsDependencies) => {

    return {
        createChat: createChatController(dependencies),
        createConvesation: createConversationController(dependencies),
        fetchConversations: fetchAllConversationsByIdController(dependencies),
        fetchChats: fetchMessagesController(dependencies),
        onlineUsers:fetchOnlineUsersController
    }
}