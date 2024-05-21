import { genereateToken } from "../../../_lib/jwt";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { Request, Response, NextFunction } from 'express'


export const verifyController = (dependencies: IDependencies) => {

    const { useCases: { verifyUserUseCase } } = dependencies

    return async (req: Request, res: Response, next: NextFunction) => {

        try {

            const data = req.body
            if (!data.email || !data.otp) {
                throw new Error('verification failed')
            }

            const user = await verifyUserUseCase(dependencies).execute(data)

            if (user) {
                const token = genereateToken({ id: user?._id, email: user?.email })
                res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

                res.json({ status: 'ok', message: "You have successfully verified you account", userData: user }).status(200)
            }


        } catch (error: any) {

            res.json({ status: 'failed', message: error.message }).status(400)

        }

    }
}