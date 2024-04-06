import { User } from '../../models'


export const findAllUsers = async (userId: any) => {

    try {

        const AllUsers = await User.find({ _id: { $ne: userId } })

        return AllUsers

    } catch (error: any) {
        throw new Error(error)
    }
}