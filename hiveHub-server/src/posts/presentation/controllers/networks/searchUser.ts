import { INetworkDependencies } from "../../../application/interface/network/IDependencies";
import { Request, Response } from 'express'


export const searchUserController = (dependencies: INetworkDependencies) => {

    const { connectionUseCases: { searchUserUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {



            const query = req?.query?.search

            if (typeof query === 'string') {

                const users = await searchUserUseCase(dependencies).execute(query)

                res.json({ status: 'ok', data: users, message: 'success' })

            } else {
                throw new Error('Somethig went wrong')
            }



        } catch (error: any) {
            res.json({ status: 'failed', message: error.message })
        }
    }
}