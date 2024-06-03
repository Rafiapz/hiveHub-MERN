import { Request, Response } from 'express'
import { IStoryDependencies } from '../../../application/interface/story/IDependencies'

export const storySeenController = (dependencies: IStoryDependencies) => {

    const { storyUseCases: { updateStoryUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {


            const storyId = req?.body?.storyId
            const userId = req?.body?.userId

            await updateStoryUseCase(dependencies).execute(storyId, userId)

            res.status(200).json({ status: 'ok' })

        } catch (error: any) {
            res.status(error?.status || 500).json({ status: 'falied', message: error?.message })
        }
    }
}