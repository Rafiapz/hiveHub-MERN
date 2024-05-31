import { verifyToken } from "../../../_lib/jwt";
import { getObjectSignedUrl } from "../../../_lib/s3";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { Request, Response } from 'express'


export const fetchUserController = (dependencies: IDependencies) => {

    const { useCases: { findOneUserByIdUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const token = req.cookies.userToken

            if (token) {
                const authorized = verifyToken(token)

                if (authorized) {

                    const id = authorized.id

                    let userData = await findOneUserByIdUseCase(dependencies).execute(id)


                    res.json({ status: 'ok', userData })
                } else {
                    throw new Error('User not authorized')
                }
            } else {
                throw new Error("Please login and try again");

            }

        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}


export const fetchOtherUserController = (dependencies: IDependencies) => {

    const { useCases: { findOneUserUseCase } } = dependencies
    return async (req: Request, res: Response) => {

        try {

            const email = req?.query?.email

            if (typeof email === 'string') {

                const userData = await findOneUserUseCase(dependencies).execute({ email })
                res.status(200).json({ status: 'ok', data: userData })
            } else {
                throw new Error('Something went wrong')
            }

        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}