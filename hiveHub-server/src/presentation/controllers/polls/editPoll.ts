import { Request, Response } from 'express'
import { IPollsDependencies } from '../../../application/interface/polls/IDependencies'
import { PollsEntity } from '../../../domain/entities/pollsEntity'

export const editPollController = (dependencies: IPollsDependencies) => {

    const { pollsUseCases: { updatePollUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const question = req?.body?.question
            const options = JSON.parse(req?.body?.options)
            const _id = req?.body?._id

            const data = {
                _id,
                question,
                options,
            }

            const result = await updatePollUseCase(dependencies).execute(data)

            res.status(200).json({ status: 'ok' })


        } catch (error: any) {
            console.log(error);

            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}