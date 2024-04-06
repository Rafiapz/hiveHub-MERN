
import { ReportsEntity } from "../../../domain/entities";
import { IReportsDependencies } from "../../interface/reports/IDependencies";

export const createReportUseCase = (dependencies: IReportsDependencies) => {

    const { reportsRepositories: { createReport } } = dependencies

    return {

        execute: async (data: ReportsEntity) => {

            try {

                return await createReport(data)

            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}