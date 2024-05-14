import { Request, Response } from 'express'
import { getOnlineUsers } from '../../../_boot/socket'


export const fetchOnlineUsersController = (req: Request, res: Response) => {

    try {

        const onlineUsers = getOnlineUsers().map((ob: any) => {
            return ob.userId
        })

        res.status(200).json({ status: 'ok', data: onlineUsers })


    } catch (error: any) {
        res.status(400).json({ status: 'ok', message: error?.message })
    }
}