import { IReportsDependencies } from "../../../application/interface/reports/IDependencies";
import { Request, Response } from 'express'

export const fetchAllReportsController = (dependencies: IReportsDependencies) => {

    const { reportsUseCases: { findAllReportsUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const reports = await findAllReportsUseCase(dependencies).execute()

            res.status(200).json({ status: 'ok', data: reports })

        } catch (error: any) {
            console.log(error);

            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}