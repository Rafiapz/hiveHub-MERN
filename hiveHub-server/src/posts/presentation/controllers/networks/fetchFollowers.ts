import { INetworkDependencies } from "../../../application/interface/network/IDependencies";
import { Request, Response } from 'express'

export const fetchFollowersController = (dependencies: INetworkDependencies) => {

    const { connectionUseCases: { findFollowersUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const user = req?.user
            const userId = (user as any)?.id;

            const followers = await findFollowersUseCase(dependencies).execute(userId)

            res.status(200).json({ status: 'ok', data: followers })


        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}