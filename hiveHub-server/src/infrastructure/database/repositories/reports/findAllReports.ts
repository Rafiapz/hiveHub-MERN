import Reports from "../../models/reportsModel"

export const findAllReports = async () => {

    try {

        const allReports = await Reports.find({}).populate('userId').populate('postId')

        return allReports

    } catch (error: any) {
        throw new Error(error)
    }
}