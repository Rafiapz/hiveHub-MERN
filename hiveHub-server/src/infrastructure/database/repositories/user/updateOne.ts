import { User } from '../../models'
import { UserEntity } from '../../../../domain/entities'

export const updateOne = async (query: { email: string }, data: any): Promise<UserEntity | null> => {

    try {

        const user = await User.findOneAndUpdate({ email: query.email }, data)

        return user


    } catch (error: any) {
        throw new Error(error.message)
    }
}