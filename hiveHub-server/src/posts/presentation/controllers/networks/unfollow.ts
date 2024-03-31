import { INetworkDependencies } from "../../../application/interface/network/IDependencies";
import { Request, Response } from 'express'


export const unfollowController = (dependencies: INetworkDependencies) => {

    const { connectionUseCases: { deleteOneUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.params.id

            const status = await deleteOneUseCase(dependencies).execute(id)

            if (!status) {
                throw new Error('Something went wrong')
            } else {

                if (status.deletedCount === 1) {
                    res.status(200).json({ status: 'ok', message: 'Success' })
                } else {
                    throw new Error('Unabl to unfollow')
                }

            }

        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}