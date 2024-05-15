import { Request, Response, NextFunction } from 'express'
import { User } from '../../infrastructure/database/models'

export const isUserBlocked = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const userId: any = req?.params?.id

        const target: any = req?.query?.target

        const requser = req?.user
        const sourceUserId = (requser as any)?.id;

        if (sourceUserId === userId) {
            next()
            return
        }

        const user = await User.findOne({ _id: userId })

        const blockedUsers = user?.blockedUsers

        if (blockedUsers?.includes(target)) {

            res.status(200).json({ status: 'failed', data: 'blockedByMe', message: 'you have blocked this account' })
            return
        } else {
            const hisDocument = await User.findOne({ _id: target })
            const hisBlocked = hisDocument?.blockedUsers

            if (hisBlocked?.includes(userId)) {
                console.log('returning');

                res.status(200).json({ status: 'failed', data: 'blockedByHim', message: 'The user has blocked you' })
                return
            } else {
                next()
            }
        }
    } catch (error) {
        console.log(error);

        res.status(400).json({ status: 'failed' })
    }
}