import { Request, Response } from 'express'
import { getOnlineUsers } from '../../../_boot/socket'

export const getOnlineUsersController = (req: Request, res: Response) => {

    try {

        let onlineUsers = getOnlineUsers()

        onlineUsers = onlineUsers.map((ob: any) => {
            return ob.userId
        })

        res.status(200).json({ status: 'ok', data: onlineUsers })

    } catch (error: any) {
        res.status(error.status || 500).json({ status: 'failed', message: error.message })
    }
}