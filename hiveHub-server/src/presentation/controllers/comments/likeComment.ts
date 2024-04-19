import { ICommentsDependencies } from "../../../application/interface/comments/IDependencies";
import { Request, Response } from 'express'

export const likeCommentController = (dependencies: ICommentsDependencies) => {

    return async (req: Request, res: Response) => {

        try {

        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.mssage })
        }
    }
}