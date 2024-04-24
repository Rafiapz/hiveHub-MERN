import { Request, Response } from 'express'
import { IReportsDependencies } from '../../../application/interface/reports/IDependencies'

export const resolveReportController = (dependencies: IReportsDependencies) => {

    const { reportsUseCases: { resolveReportUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const reportId = req?.params?.id;
            const postId = req?.query?.postId;

            const report = await resolveReportUseCase(dependencies).execute(reportId, postId)

            res.status(200).json({ status: 'ok', data: report })

        } catch (error: any) {
            console.log(error);
            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}