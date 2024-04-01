
import { ReportsEntity } from "../../domain/entities/reportsEntity";
import { IPostDependencies } from "../interface/IDependencies";

export const createReportUseCase = (dependencies: IPostDependencies) => {

    const { postRepositories: { createReport } } = dependencies

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