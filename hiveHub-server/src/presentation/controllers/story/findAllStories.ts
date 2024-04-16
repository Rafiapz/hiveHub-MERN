import { IStoryDependencies } from "../../../application/interface/story/IDependencies";
import { Request, Response } from 'express'

export const findAllStoriesController = (dependencies: IStoryDependencies) => {

    const { storyUseCases: { findAllStoryUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const allStories = await findAllStoryUseCase(dependencies).execute()

            res.status(200).json({ status: 'ok', data: allStories })

        } catch (error: any) {
            res.status(error.status).json({ status: 'failed', message: error.message })
        }
    }
}