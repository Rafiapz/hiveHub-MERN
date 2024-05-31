import { getObjectSignedUrl } from "../../../_lib/s3"
import { IDependencies } from "../../../application/interface/user/IDependencies"
import { Request, Response } from 'express'

export const findAllUsersController = (dependencies: IDependencies) => {

    const { useCases: { findAllUsersUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userId = (user as any)?.id;

            const allUsers = await findAllUsersUseCase(dependencies).execute(userId)


            res.status(200).json({ status: 'ok', data: allUsers })

        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}