import { IStoryDependencies } from "../../../application/interface/story/IDependencies";
import { Request, Response } from 'express'
import { StoryEntity } from "../../../domain/entities/storyEntity";
import { uploadToS3Bucket } from "../../../_lib/s3";

export const createStoryController = (dependencies: IStoryDependencies) => {

    const { storyUseCases: { createStoryUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const path = await uploadToS3Bucket(req.file) || ''

            const data: StoryEntity = {
                userId: req?.body?.userId,
                media: [path],
                description: req?.body?.description
            }

            const story = await createStoryUseCase(dependencies).execute(data)

            if (!story) {
                throw new Error('Failed to Post story')
            } else {
                res.status(200).json({ status: 'ok', data: story, message: 'Successfully posted your story' })
            }


        } catch (error: any) {
            console.log(error);
            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}