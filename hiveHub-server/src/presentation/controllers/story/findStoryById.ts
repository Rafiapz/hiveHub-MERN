
import { Request, Response } from 'express'
import { IStoryDependencies } from '../../../application/interface/story/IDependencies'

export const findStoryByIdController = (dependencies: IStoryDependencies) => {

    const { storyUseCases: { findStoryByIdUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.params?.userId

            const stories = await findStoryByIdUseCase(dependencies).execute(id)

            res.status(200).json({ status: 'ok', data: stories })

        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}