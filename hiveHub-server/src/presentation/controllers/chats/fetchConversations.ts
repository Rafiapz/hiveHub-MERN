import { IChatsDependencies } from "../../../application/interface/chats/IDependencies";
import { Request, Response } from 'express'

export const fetchAllConversationsByIdController = (dependencies: IChatsDependencies) => {

    const { chatsUseCases: { findConversationByIdUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const userId = req?.params?.userId


            const conversations = await findConversationByIdUseCase(dependencies).execute(userId)


            res.status(200).json({ status: 'ok', conversations })

        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}