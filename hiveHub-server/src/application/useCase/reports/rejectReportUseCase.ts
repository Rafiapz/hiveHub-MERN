import { IReportsDependencies } from "../../interface/reports/IDependencies";

export const rejectReportUseCase = (dependencies: IReportsDependencies) => {

    const { reportsRepositories: { rejectReport } } = dependencies

    return {

        execute: async (reportId: any) => {

            try {

                return await rejectReport(reportId)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}