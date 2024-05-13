import { Request, Response } from 'express'
import { IPollsDependencies } from '../../../application/interface/polls/IDependencies'

export const deletePollController = (dependencies: IPollsDependencies) => {

    const { pollsUseCases: { deletePollUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id: any = req?.query?.pollId


            const result = await deletePollUseCase(dependencies).execute(id)

            console.log(result);

            res.status(200).json({ status: 'ok', message: 'Deleted Succesfully' })


        } catch (error: any) {
            res.status(200).json({ status: 'ok', message: error?.message })
        }
    }
}