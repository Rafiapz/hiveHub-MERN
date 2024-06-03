import { User } from '../../models'
import { UserEntity } from '../../../../domain/entities'
import cron from 'node-cron'

export const updateOne = async (query: { email: string }, data: any): Promise<UserEntity | null> => {

    try {

        const user = await User.findOneAndUpdate({ email: query.email }, data)

        return user


    } catch (error: any) {
        throw new Error(error.message)
    }
}


// const task = cron.schedule('0 */2 * * *', async () => {

//     try {

//         let sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 1);

//         const users = await User.find({
//             createdAt: { $lt: sevenDaysAgo }
//         })


//         users.forEach(async (ob: any) => {
//             await User.deleteOne({ _id: ob?._id })

//         })


//     } catch (error) {
//         console.log(error);

//     }

// });


// task.start();