import { User } from '../../models'


export const verify = async (data: { email: string, otp: string }) => {


    try {

        const userData = await User.findOne({ email: data.email }, { otp: 1, createdAt: 1 })

        if (userData?.otp?.createdAt) {

            const currentTime = new Date().getTime()
            const createdAt = new Date(userData.otp.createdAt).getTime()
            const difference = currentTime - createdAt;
            if (difference > 2 * 60 * 1000) {
                throw new Error('Your otp has expired . Please request a new one')
            }

        } else {
            throw new Error('Something went wrong')
        }

        if (userData?.otp?.otp !== data.otp) {
            throw new Error('Incorrect otp')
        }

        const user = await User.findOneAndUpdate({ email: data.email, 'otp.otp': data.otp }, { isVerified: true, 'otp.otp': '' })


        if (!user) {
            throw new Error('User updation failed')
        }

        const status = await User.findOne({ email: data.email }, { isVerified: 1 })


        if (!status?.isVerified) {
            throw new Error('User not verified')
        }

        return user

    } catch (error: any) {


        throw new Error(error.message)
    }
}