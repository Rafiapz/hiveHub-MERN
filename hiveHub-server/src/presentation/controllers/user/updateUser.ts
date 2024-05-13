import { comparePassword } from "../../../_lib/bcrypt";
import { genereateToken } from "../../../_lib/jwt";
import { generateOtp } from "../../../_lib/otp";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { Request, Response, NextFunction } from 'express'


export const updateOtpController = (dependencies: IDependencies) => {

    const { useCases: { updateOneUserUseCase, createUserUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const email: string | undefined = req.query.email as string | undefined


            if (email === undefined) {
                throw new Error('Something went wrong')
            } else {

                const otpDetails = generateOtp(email)

                updateOneUserUseCase(dependencies).execute({ email: email }, { otp: otpDetails?.OTP, createdAt: otpDetails?.timestamp })
            }

            res.json({ status: 'ok', message: 'Successfully resent OTP' }).status(200)
        } catch (error: any) {
            console.log(error);

            res.json({ status: 'failed', message: error.message })
        }
    }
}