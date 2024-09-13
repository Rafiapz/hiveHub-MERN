import { removeUser } from "../../../_boot/socket";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { Request, Response } from "express";

export const logoutController = () => {

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userId = (user as any)?.id
            removeUser(userId)
            res.cookie('userToken', '', { maxAge: 1, httpOnly: true, sameSite: "none", secure: true })
            res.status(200).json({ status: 'ok', message: 'logout successfull' })

        } catch (error: any) {

            res.json({ status: 'failed' })

        }
    }
}