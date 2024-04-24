import Reports from "../../models/reportsModel"

export const rejectReport = async (reportId: any) => {

    try {

        const report = await Reports.findByIdAndUpdate({ _id: reportId }, { $set: { status: 'Rejected' } }, { new: true })

        return report
    } catch (error: any) {
        throw new Error(error)
    }
}