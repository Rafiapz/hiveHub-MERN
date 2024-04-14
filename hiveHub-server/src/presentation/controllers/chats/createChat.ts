import { IChatsDependencies } from "../../../application/interface/chats/IDependencies";
import { Request, Response } from 'express'
import { ChatsEntity } from "../../../domain/entities/chatsEntity";

export const createChatController = (dependencies: IChatsDependencies) => {

    const { chatsUseCases: { createChatUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {


            const data: ChatsEntity = {
                message: req?.body?.message,
                senderId: req?.body?.senderId,
                conversationId: req?.body?.conversationId,
            }

            const result = await createChatUseCase(dependencies).execute(data)

            res.status(200).json({ status: 'ok', data: result })

        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}