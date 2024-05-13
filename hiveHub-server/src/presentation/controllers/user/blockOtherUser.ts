import { Request, Response } from 'express'
import { IDependencies } from '../../../application/interface/user/IDependencies'


export const blockOtherUserController = (dependencies: IDependencies) => {

    const { useCases: { blockUserByUserUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {


            const userId = req?.body?.userId
            const targetUserId = req?.body?.targetUserId

            const data = {
                userId,
                targetUserId
            }

            const result = await blockUserByUserUseCase(dependencies).execute(data)


            res.status(200).json({ status: 'ok', message: 'Successfully blocked' })


        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', messag: error?.message })
        }
    }
}

export const unblockOtherUserController = (dependencies: IDependencies) => {

    const { useCases: { unblockUserByUserUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {



            const userId = req?.body?.userId
            const targetUserId = req?.body?.targetUserId

            const data = {
                userId,
                targetUserId
            }

            const result = await unblockUserByUserUseCase(dependencies).execute(data)

            res.status(200).json({ status: 'ok', message: 'Successfully unblocked' })


        } catch (error: any) {
            res.status(error?.status || 500).json({ message: error?.message || 'Something went wrong' })
        }
    }
}