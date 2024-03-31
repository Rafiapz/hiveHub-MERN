import { INetworkDependencies } from "../../../application/interface/network/IDependencies";
import { Request, Response } from 'express'

export const fetchAllNetworksController = (dependencies: INetworkDependencies) => {

    const { connectionUseCases: { findAllNetworksUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {



            const user = req?.user
            const userId = (user as any)?.id;

            const allNetworks = await findAllNetworksUseCase(dependencies).execute(userId)

            res.status(200).json({ status: 'ok', data: allNetworks })


        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}