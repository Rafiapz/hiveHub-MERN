import { IChatsDependencies } from "../../../application/interface/chats/IDependencies";
import { Request, Response } from 'express'

export const fetchMessagesController = (dependencies: IChatsDependencies) => {

    const { chatsUseCases: { findChatsByIdUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.params?.id

            const chats = await findChatsByIdUseCase(dependencies).execute(id)


            res.status(200).json({ status: 'ok', data: chats })
        } catch (error: any) {
            console.log(error);

            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}