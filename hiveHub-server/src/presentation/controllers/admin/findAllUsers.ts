import { IAdminDependencies } from "../../../application/interface/admin/IDependencies";
import { Request, Response } from 'express'

export const findAllUsersController = (dependencies: IAdminDependencies) => {

    const { adminUseCases: { findAllUsersUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.params?.id

            const allUsers = await findAllUsersUseCase(dependencies).execute(id)


            res.status(200).json({ status: 'ok', data: allUsers })

        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }

    }
}