import { Request, Response } from 'express'
import { getOnlineUsers } from '../../../_boot/socket'


export const fetchOnlineUsersController = (req: Request, res: Response) => {

    try {

        const users = getOnlineUsers()
        let onlineUsers: string[] = []
        for (let [key] of users) {
            onlineUsers.push(key)
        }

        res.status(200).json({ status: 'ok', data: onlineUsers })


    } catch (error: any) {
        res.status(400).json({ status: 'ok', message: error?.message })
    }
}