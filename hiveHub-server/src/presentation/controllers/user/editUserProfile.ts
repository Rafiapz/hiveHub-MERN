import { passwordHashing } from "../../../_lib/bcrypt";
import { generateResetPasswordToken } from "../../../_lib/jwt";
import { generateOtp } from "../../../_lib/otp";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { Request, Response } from 'express'
import { verifyUserUseCase } from "../../../application/useCase/user";

export const editUserProfile = (dependencies: IDependencies) => {

    const { useCases: { updateUserByIdUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {
            const user = req?.user
            const id = (user as any)?.id;
            let data: any = {}
            data = req?.body

            if (req?.query.coverPhoto) {
                data.coverPhoto = `http://localhost:7700/posts/${req?.file?.filename}`
            } else if (req?.query?.profilePhoto) {
                data.profilePhoto = `http://localhost:7700/posts/${req?.file?.filename}`
            }
            if (data?.password) {
                data.password = await passwordHashing(data.password)
            }
            if (data?.email) {
                const otpDetails = generateOtp(data?.email)
                if (!otpDetails) {
                    throw new Error('Unable to sent verification email')
                } else {
                    await updateUserByIdUseCase(dependencies).execute(id, { otp: otpDetails?.OTP })
                    res.status(200).json({ status: 'ok', message: 'Successfully sent OTP to new email' })
                    return
                }
            }

            const userData = await updateUserByIdUseCase(dependencies).execute(id, data)

            if (!userData) {
                throw new Error('Unable to update profile')
            }

            console.log(userData);


            res.status(200).json({ status: 'ok', data: userData, message: 'Profile updated' })

        } catch (error: any) {
            console.log(error);
            res.status(error.status || 400).json({ status: 'failed', message: error.message })
        }
    }
}

export const editUserEmailController = (dependencies: IDependencies) => {

    const { useCases: { updateUserByIdUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const id = (user as any)?.id;

            const verifyData = {
                email: req?.body?.oldEmail,
                otp: req?.body?.otp
            }

            const result = await verifyUserUseCase(dependencies).execute(verifyData)

            if (!result) {
                throw new Error('Invalid OTP')
            }

            const data = {
                email: req?.body?.newEmail
            }
            const userData = await updateUserByIdUseCase(dependencies).execute(id, data)

            if (!userData) {
                throw new Error('Unable to update profile')
            }

            res.status(200).json({ status: 'ok', message: 'Successfully update email', data: userData })

        } catch (error: any) {
            console.log(error);

            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }

}