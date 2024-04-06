import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../../_lib/jwt'


export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    try {



        const userToken = req?.cookies?.userToken

        if (userToken) {

            const user: any = verifyToken(userToken)
            req.user = user

            next()

        } else {
            throw new Error('Please login and try again')
        }


    } catch (error: any) {
        console.log(error.message);

        res.json({ status: 'failed', message: error.message })

    }

}