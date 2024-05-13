import { Request, Response } from 'express'
import { IPollsDependencies } from '../../../application/interface/polls/IDependencies'

export const voteController = (dependencies: IPollsDependencies) => {

    const { pollsUseCases: { votePollUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {



            const data = {
                pollId: req?.body?.pollId,
                option: req?.body?.option,
                userId: req?.body?.userId,
                optionId: req?.body?.optionId
            }

            const poll = await votePollUseCase(dependencies).execute(data)


            res.status(200).json({ status: 'ok', data: poll })


        } catch (error: any) {
            console.log(error);

            res.status(error?.status || 500).json({ message: error?.message })
        }
    }
}