import { IStoryDependencies } from "../../../application/interface/story/IDependencies";
import { Request, Response } from 'express'

export const deleteStoryController = (dependencies: IStoryDependencies) => {

    const { storyUseCases: { deleteStoryUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const id = req?.params?.id

            const result = await deleteStoryUseCase(dependencies).execute(id)


            res.status(200).json({ status: 'ok' })


        } catch (error: any) {
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}