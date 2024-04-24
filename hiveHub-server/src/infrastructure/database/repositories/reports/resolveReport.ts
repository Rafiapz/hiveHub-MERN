import { Posts } from "../../models"
import Likes from "../../models/likesModel"
import Reports from "../../models/reportsModel"

export const resolveReport = async (reportId: any, postId: any) => {

    try {

        const deleteResult = await Posts.deleteOne({ _id: postId })

        if (deleteResult.deletedCount === 1) {

            await Likes.deleteMany({ postId: postId })
            const report = await Reports.findOneAndUpdate({ _id: reportId }, { $set: { status: 'Resolved' } }, { new: true })

            return report
        }

        throw new Error('Something went wrong')

    } catch (error: any) {
        throw new Error(error)
    }
}