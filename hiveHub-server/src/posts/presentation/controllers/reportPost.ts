import { IPostDependencies } from "../../application/interface/IDependencies";
import { Request, Response } from 'express'
import { ReportsEntity } from "../../domain/entities/reportsEntity";

export const reportPostController = (dependencies: IPostDependencies) => {

    const { postUseCases: { createReportUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {



            const user = req?.user
            const userId = (user as any)?.id;

            const data: ReportsEntity = {
                createdAt: new Date(),
                postId: req?.body?.postId,
                userId: userId,
                reason: req?.body?.reason,
            }


            const result = await createReportUseCase(dependencies).execute(data)

            if (!result) {
                throw new Error('Unable to report the post')
            } else {
                res.status(200).json({ status: 'ok', data: result })
            }

        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}