import { IDependencies } from "../../../application/interface/user/IDependencies";
import { Request, Response } from "express";

export const logoutController = () => {

    return async (req: Request, res: Response) => {

        try {



            res.cookie('userToken', '', { maxAge: 1 })
            res.status(200).json({ status: 'ok', message: 'logout successfull' })

        } catch (error: any) {

            res.json({ status: 'failed' })

        }
    }
}