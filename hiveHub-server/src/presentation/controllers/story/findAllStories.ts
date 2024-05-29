import { getObjectSignedUrl } from "../../../_lib/s3";
import { IStoryDependencies } from "../../../application/interface/story/IDependencies";
import { Request, Response } from 'express'

export const findAllStoriesController = (dependencies: IStoryDependencies) => {

    const { storyUseCases: { findAllStoryUseCase } } = dependencies

    return async (req: Request, res: Response) => {

        try {

            const userId = req?.params?.userId

            const { allStories, myStories } = await findAllStoryUseCase(dependencies).execute(userId)

            myStories[0].media[0] = await getObjectSignedUrl(myStories[0].media[0])

            for (let story of allStories) {
                if (story?.media?.length) {
                    for (let i = 0; i < story?.media.length; i++) {
                        if (story?.media[i]) {
                            story.media[i] = await getObjectSignedUrl(story?.media[i]);
                        }
                    }
                }
            }


            res.status(200).json({ status: 'ok', data: { allStories, myStories } })

        } catch (error: any) {
            console.log(error);

            res.status(error.status || 500).json({ status: 'failed', message: error.message })
        }
    }
}