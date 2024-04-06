import { User } from '../../models'
import { UserEntity } from '../../../../domain/entities'

export const findOne = async (data: { email: string }): Promise<UserEntity | null> => {

    try {

        const user = await User.findOne({ email: data.email })

        return user


    } catch (error: any) {
        throw new Error(error.message)
    }
}