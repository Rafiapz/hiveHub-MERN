import { Request, Response } from 'express'
import { IPollsDependencies } from '../../../application/interface/polls/IDependencies'
import { PollsEntity } from '../../../domain/entities/pollsEntity'

export const createPollController = (dependencies: IPollsDependencies) => {

    const { pollsUseCases: { createPollUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {


            const option = JSON.parse(req?.body?.options)

            const options = option.map((ob: any, i: number) => {
                return {
                    option: ob,
                    votes: 0,
                    id: i
                }
            })


            const data: PollsEntity = {
                userId: req?.body?.userId,
                question: req?.body?.question,
                options: options,
            }

            const poll = await createPollUseCase(dependencies).execute(data)

            if (!poll) {
                throw new Error('Failed to create poll')
            } else {
                res.status(200).json({ status: 'ok', message: 'Successfully submitted poll', data: poll })
            }

        } catch (error: any) {
            console.log(error);

            res.status(error?.status || 500).json({ status: 'failed', message: error?.message })
        }
    }
}
