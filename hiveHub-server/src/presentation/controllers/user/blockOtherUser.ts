import { Request, Response } from 'express'
import { IDependencies } from '../../../application/interface/user/IDependencies'
import { User } from '../../../infrastructure/database/models'


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

export const isUserBlockedController = (dependencies: IDependencies) => {

    return async (req: Request, res: Response) => {

        try {

            const userId: any = req?.params?.id

            const target: any = req?.query?.target


            const user = await User.findOne({ _id: userId })

            const blockedUsers = user?.blockedUsers

            if (blockedUsers?.includes(target)) {

                res.status(200).json({ status: 'ok', data: 'blockedByMe' })
                return
            } else {
                const hisDocument = await User.findOne({ _id: target })
                const hisBlocked = hisDocument?.blockedUsers

                if (hisBlocked?.includes(userId)) {

                    res.status(200).json({ status: 'ok', data: 'blockedByHim' })
                    return
                } else {
                    res.status(200).json({ status: 'ok', data: 'notBlocked' })

                    return
                }
            }
        } catch (error) {
            console.log(error);

            res.status(400).json({ status: 'failed' })
        }

    }
}