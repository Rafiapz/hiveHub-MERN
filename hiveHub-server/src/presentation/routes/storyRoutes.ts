
import { Router } from 'express'
import { controllers } from '../controllers/story'
import { IAdminDependencies } from '../../application/interface/admin/IDependencies';
import { IStoryDependencies } from '../../application/interface/story/IDependencies';
import { currentUser } from '../middlewares/currentUser';
import { uploadSingleFile } from '../../_lib/multer';


export const storyRoutes = (dependencies: IStoryDependencies) => {

    const {
        createStory,
        findAllStories,
        deleteStory,
        findStoryByid,
        storySeen
    } = controllers(dependencies);

    const router = Router()

    router.route('/create-story/:type').post(currentUser, uploadSingleFile, createStory)

    router.route('/fetch-all-stories/:userId').get(currentUser, findAllStories)

    router.route('/delete-story/:id').delete(currentUser, deleteStory)

    router.route('/fetch-others-story/:userId').get(currentUser, findStoryByid)

    router.route('/story-seen').put(currentUser, storySeen)




    return router
}