import { Request, Response } from 'express'
import { IDependencies } from '../../application/interfaces/IDependencies'
import { generateResetPasswordToken, genereateToken, verifyToken } from '../../../_lib/jwt'
import { sendVerificationEmail } from '../../../_lib/otp'
import { passwordHashing } from '../../../_lib/bcrypt'

export const resetPasswordVerificationController = (dependencies: IDependencies) => {

    const { useCases: { findOneUserUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const email = req?.params?.email
            console.log(email);

            const user = await findOneUserUseCase(dependencies).execute({ email })

            if (!user) {
                throw new Error('Email id not found')
            } else {

                const token = generateResetPasswordToken({ id: user?._id })

                const sendEmail = await sendVerificationEmail(email, token)

                if (sendEmail.status === 'ok') {
                    res.status(200).json({ status: 'ok' })
                } else {
                    throw new Error('Unable to sent verification email')
                }
            }



        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}


export const changePasswordController = (dependencies: IDependencies) => {

    const { useCases: { updateUserByIdUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const { token, password } = req?.body

            const status = verifyToken(token)

            const userId = status.id

            const hashPsw = await passwordHashing(password)
            const user = await updateUserByIdUseCase(dependencies).execute(userId, { password: hashPsw })

            if (!user) {
                throw new Error('Something went wrong please try again later')
            } else {

                const userToken = genereateToken({ id: user?._id, email: user?.email })
                res.cookie('userToken', userToken, { maxAge: 1000 * 60 * 60, httpOnly: true })
                res.status(200).json({ status: 'ok', message: 'Password changed successfully', userData: user })
            }


        } catch (error: any) {

            res.json({ status: 'failed', message: error.message })

        }
    }
}