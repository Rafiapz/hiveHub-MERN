import { INetworkDependencies } from "../../../application/interface/network/IDependencies";
import { Request, Response } from 'express'
import { NetworksEntity } from "../../../domain/entities";

export const coneectionRequestController = (dependencies: INetworkDependencies) => {

    const { connectionUseCases: { connectionRequestUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {


            const user = req?.user
            const sourceUserId = (user as any)?.id;
            const targetUserId: any = req?.params?.id

            const data: NetworksEntity = {
                sourceUserId: sourceUserId,
                targetUserId: targetUserId,
                status: 'following'
            }



            const createdData = await connectionRequestUseCase(dependencies).execute(data)

            if (createdData) {
                res.status(200).json({ status: 'ok', message: `You are now following ${createdData?.targetUserId?.fullName}`, data: { createdData } })
            } else {
                throw new Error('Unable to make request')
            }

        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'ok', message: error.message })
        }
    }
}   