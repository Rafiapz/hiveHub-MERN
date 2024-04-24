import { IReportsDependencies } from "../../interface/reports/IDependencies";

export const resolveReportUseCase = (dependencies: IReportsDependencies) => {

    const { reportsRepositories: { resolveReport } } = dependencies

    return {

        execute: async (reportId: any, postId: any) => {

            try {

                return await resolveReport(reportId, postId)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}