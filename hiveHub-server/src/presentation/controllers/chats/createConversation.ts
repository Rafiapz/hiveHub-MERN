import { IChatsDependencies } from "../../../application/interface/chats/IDependencies";
import { Request, Response } from 'express'
import { ConversationEntity } from "../../../domain/entities/conversationEntity";

export const createConversationController = (dependencies: IChatsDependencies) => {

    const { chatsUseCases: { createConversationUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {



            const data: ConversationEntity = {
                members: [req?.body?.senderId, req?.body?.recieverId]
            }

            createConversationUseCase(dependencies).execute(data)

            res.json({ status: 'ok' })
        } catch (error: any) {
            res.status(error.status || 500)
        }
    }
}