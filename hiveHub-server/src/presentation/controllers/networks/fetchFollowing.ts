import { INetworkDependencies } from "../../../application/interface/network/IDependencies";
import { Request, Response } from 'express'

export const fetchFollowingController = (dependencies: INetworkDependencies) => {

    const { networkUseCases: { findFollowingUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userId = (user as any)?.id;

            const following = await findFollowingUseCase(dependencies).execute(userId)

            res.status(200).json({ status: 'ok', data: following })


        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}