import { Request, Response } from 'express'
import { IPollsDependencies } from '../../../application/interface/polls/IDependencies'

export const fetchAllPollsController = (dependencies: IPollsDependencies) => {

    const { pollsUseCases: { fetchAllPollsUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {


            const polls = await fetchAllPollsUseCase(dependencies).execute()


            res.status(200).json({ status: 'ok', data: polls })



        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}
