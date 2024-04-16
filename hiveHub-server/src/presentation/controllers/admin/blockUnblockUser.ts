import { IAdminDependencies } from "../../../application/interface/admin/IDependencies";
import { Request, Response } from 'express'

export const blockUnblockUser = (dependencies: IAdminDependencies) => {

    const { adminUseCases: { blockUnblockUserUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const userId = req?.body?.userId
            const toStatus: boolean = req?.body?.toStatus

            console.log(toStatus);


            const user = await blockUnblockUserUseCase(dependencies).execute(userId, toStatus)

            res.status(200).json({ status: 'ok', data: user })

        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}