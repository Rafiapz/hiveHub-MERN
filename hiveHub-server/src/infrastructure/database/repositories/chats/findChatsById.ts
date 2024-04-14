import Chats from "../../models/chatsModel"

export const findChatsById = (id: any) => {

    try {


        const chats = Chats.find({ conversationId: id })

        return chats

    } catch (error: any) {
        throw new Error(error)
    }
}