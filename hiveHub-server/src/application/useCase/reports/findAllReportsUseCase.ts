import { IReportsDependencies } from "../../interface/reports/IDependencies"

export const findAllReportsUseCase = (dependencies: IReportsDependencies) => {

    const { reportsRepositories: { findAllReports } } = dependencies

    return {
        execute: async () => {
            try {

                return await findAllReports()

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}