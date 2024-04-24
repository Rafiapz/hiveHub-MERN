import { Request, Response } from 'express'
import { IReportsDependencies } from '../../../application/interface/reports/IDependencies'

export const rejectReportController = (dependencies: IReportsDependencies) => {

    const { reportsUseCases: { rejectReportUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const reportId = req?.params?.id

            const updated = await rejectReportUseCase(dependencies).execute(reportId)

            res.status(200).json({ status: 'ok', data: updated })
        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}
